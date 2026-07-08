import { simpleScheduler } from '../utils/scheduler';
import { isStrictEqual } from '../utils/selector-utils';
import type { CellId, AnyCellRecord } from '../types/cell.types';

/**
 * Update payload for array-shaped state, replace or transform-from-previous.
 * `Input` defaults to `T` (same type for read and write). Override it to
 * widen the write side, e.g. `ArrayUpdate<Record, Record | dia.Cell>`.
 */
export type ArrayUpdate<T, Input = T> =
  | readonly Input[]
  | ((previous: readonly T[]) => readonly Input[]);

/**
 * A batch of container changes applied in one shot by {@link Container.batchSet}.
 *
 * Mirrors the incremental-change shape delivered to `onIncrementalCellsChange`,
 * so the graph projection can build a single change set and feed it to both the
 * container and the incremental callback. All three collections are keyed by
 * cell id; the same id never appears in more than one of them.
 */
export interface ContainerChangeSet<Cell extends AnyCellRecord> {
  /** Cells new to the container, in insertion order (appended to the snapshot). */
  readonly added: ReadonlyMap<CellId, Cell>;
  /** Cells already in the container whose record reference changed (patched in place). */
  readonly changed: ReadonlyMap<CellId, Cell>;
  /** Ids of cells to drop from the container. */
  readonly removed: ReadonlySet<CellId>;
}

/** Read-only view of a cell container, supports reads, lookups, and subscriptions. */
export interface ReadonlyContainer<Cell extends AnyCellRecord> {
  /**
   * The current immutable snapshot array. The reference is stable between
   * commits and changes only when {@link Container.batchSet} applies a
   * non-empty change set, so it doubles as a `useSyncExternalStore` token.
   */
  getSnapshot: () => readonly Cell[];
  get: (id: CellId) => Cell | undefined;
  has: (id: CellId) => boolean;
  /** Subscribe to changes of a single cell by id (the fast per-cell path). */
  subscribeById: (id: CellId, listener: () => void) => () => void;
  /** Subscribe to every commit (the snapshot reference changed). */
  subscribe: (listener: () => void) => () => void;
}

/** Mutable cell container, extends {@link ReadonlyContainer} with the batch writer. */
export interface Container<Cell extends AnyCellRecord> extends ReadonlyContainer<Cell> {
  batchSet: (changeSet: ContainerChangeSet<Cell>) => void;
}

/**
 * Wraps a container to expose only read and subscribe operations.
 * @param container - the mutable container to expose read-only.
 */
export function asReadonlyContainer<Cell extends AnyCellRecord>(
  container: Container<Cell>
): ReadonlyContainer<Cell> {
  return {
    get: container.get,
    has: container.has,
    getSnapshot: container.getSnapshot,
    subscribeById: container.subscribeById,
    subscribe: container.subscribe,
  };
}

/**
 * Patch one slot of the next snapshot: overwrite in place when the id is known,
 * otherwise append and record its index. Shared by the changed/added passes.
 */
function patchSlot<Cell extends AnyCellRecord>(
  next: Cell[],
  indexById: Map<CellId, number>,
  id: CellId,
  record: Cell
): void {
  const index = indexById.get(id);
  if (index === undefined) {
    indexById.set(id, next.length);
    next.push(record);
  } else {
    next[index] = record;
  }
}

/**
 * Rebuild the snapshot without the removed ids in one filter pass, refreshing
 * the index map (a removal shifts every later index, so the map is rebuilt).
 * Changed/added slots are applied by the caller afterwards, uniformly with the
 * no-removals path.
 */
function dropRemoved<Cell extends AnyCellRecord>(
  items: readonly Cell[],
  removed: ReadonlySet<CellId>,
  indexById: Map<CellId, number>
): Cell[] {
  const next: Cell[] = [];
  indexById.clear();
  for (const item of items) {
    const id = item.id as CellId;
    if (removed.has(id)) continue;
    indexById.set(id, next.length);
    next.push(item);
  }
  return next;
}

/**
 * Creates a keyed container backed by an **immutable snapshot array**.
 *
 * The snapshot (`items`) is never mutated in place: every {@link Container.batchSet}
 * produces a new array and swaps it in, so `getSnapshot()` is a stable
 * reference that consumers can hand straight to React state without copying.
 * An `indexById` map keeps `get(id)` at O(1).
 *
 * `batchSet` rebuilds the snapshot once per commit: a native `slice()` (or a
 * single filter pass when removals are present) plus an index-patch of only the
 * changed/added slots — O(n + change-set), one array copy for the whole batch.
 * Applying each change with `Array.prototype.with`/`toSpliced` instead would be
 * O(k·n) for a scattered change set (k separate full copies) — measured up to
 * ~65× slower at k=100; see the immutable-batch bench. Notification is
 * O(change-set), never O(n): only the touched ids' listeners fire, then the
 * all-listeners once.
 */
export function createContainer<Cell extends AnyCellRecord>(): Container<Cell> {
  let items: readonly Cell[] = [];
  const indexById = new Map<CellId, number>();
  const listeners = new Map<CellId, Set<() => void>>();
  const allListeners = new Set<() => void>();

  /** Fire the per-id listeners registered for `id` (no-op when none). */
  function fireId(id: CellId): void {
    const listenersForId = listeners.get(id);
    if (!listenersForId) return;
    for (const listener of listenersForId) listener();
  }

  return {
    getSnapshot(): readonly Cell[] {
      return items;
    },
    get(id: CellId): Cell | undefined {
      const index = indexById.get(id);
      return index === undefined ? undefined : items[index];
    },
    has(id: CellId): boolean {
      return indexById.has(id);
    },
    batchSet({ added, changed, removed }: ContainerChangeSet<Cell>): void {
      if (changed.size === 0 && added.size === 0 && removed.size === 0) return;
      // Slice is faster than [...spread]
      // eslint-disable-next-line unicorn/prefer-spread
      const next = removed.size > 0 ? dropRemoved(items, removed, indexById) : items.slice();
      // Apply changed then added through the same `patchSlot`: a known id
      // overwrites its slot in place, an unknown id is appended. Keeping both
      // rebuild paths symmetric here avoids the two diverging on edge cases.
      for (const [id, record] of changed) patchSlot(next, indexById, id, record);
      for (const [id, record] of added) patchSlot(next, indexById, id, record);
      items = next;

      // Wake only the touched ids' subscribers, then the all-subscribers once.
      // The buckets are disjoint (an id lands in exactly one), so no dedup.
      for (const id of changed.keys()) fireId(id);
      for (const id of added.keys()) fireId(id);
      for (const id of removed) fireId(id);
      for (const listener of allListeners) listener();
    },
    subscribeById(id: CellId, listener: () => void) {
      let listenersForId = listeners.get(id);
      if (!listenersForId) {
        listenersForId = new Set();
        listeners.set(id, listenersForId);
      }
      listenersForId.add(listener);
      return () => {
        listenersForId?.delete(listener);
        // Guard the map delete against a re-subscribe replacing this id's Set
        // between the first and a repeated unsubscribe call.
        if (listenersForId?.size === 0 && listeners.get(id) === listenersForId) {
          listeners.delete(id);
        }
      };
    },
    subscribe(listener: () => void) {
      allListeners.add(listener);
      return () => {
        allListeners.delete(listener);
      };
    },
  };
}

/** Updater for atom values — always receives the current value (never undefined). */
type AtomUpdate<T> = ((previous: T) => T) | T;

/** Return type of {@link createAtom}. */
export interface Atom<T> {
  /** Get the current value. */
  readonly get: () => T;
  /** Alias for `get`, compatible with `useSyncExternalStore`. */
  readonly getSnapshot: () => T;
  /** Update the value. Accepts a new value or an updater function. Pass `sync` to notify synchronously. */
  readonly set: (update: AtomUpdate<T>, sync?: boolean) => void;
  /** Alias for `set`, matches the old `createState` API during migration. */
  readonly setState: (update: AtomUpdate<T>, sync?: boolean) => void;
  /** Subscribe to value changes. Returns an unsubscribe function. */
  readonly subscribe: (listener: () => void) => () => void;
  /** Remove all listeners. */
  readonly clean: () => void;
}

/**
 * Creates a simple atomic value container with get/set/subscribe.
 * Items are immutable, the container replaces the value on each update.
 * @param initialValue - The initial value of the atom.
 */
export function createAtom<T>(initialValue: T): Atom<T> {
  let value = initialValue;
  const listeners = new Set<() => void>();

  /**
   * Returns the current atom value.
   */
  function get(): T {
    return value;
  }

  /**
   * Notifies every registered listener of a value change.
   */
  function notifyListeners(): void {
    for (const listener of listeners) {
      listener();
    }
  }

  /**
   * Updates the atom value and notifies listeners if the value changed.
   *
   * By default notifications are batched onto a microtask so cascading updates
   * coalesce into a single React render — and so a write that happens DURING
   * render (e.g. a feature registering itself in `useCreateFeature`'s render
   * path) does not synchronously setState another component. Pass `sync` to
   * notify synchronously — required when the update happens inside an
   * effect/commit and a `useSyncExternalStore` subscriber must observe it
   * deterministically (a deferred notify can be dropped across StrictMode's
   * unmount→remount churn). Never call with `sync` during React's render phase.
   * @param update - New value or a previous-state updater.
   * @param sync - Notify synchronously instead of on a microtask.
   */
  function set(update: AtomUpdate<T>, sync = false): void {
    const newValue = typeof update === 'function' ? (update as (previous: T) => T)(value) : update;
    if (isStrictEqual(value, newValue)) {
      return;
    }
    value = newValue;
    if (sync) {
      notifyListeners();
      return;
    }
    simpleScheduler(notifyListeners);
  }

  /**
   * Registers a listener that is called when the atom value changes.
   * @param listener
   */
  function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  /**
   * Removes all registered listeners.
   */
  function clean(): void {
    listeners.clear();
  }

  return { get, getSnapshot: get, set, setState: set, subscribe, clean };
}
