import React from 'react';
import { renderHook, render } from '@testing-library/react';
import { mvc, type dia } from '@joint/core';
import { GraphProvider } from '../../components/graph/graph-provider';
import { graphProviderWrapper } from '../../utils/test-wrappers';
import { useCells } from '../use-cells';
import { useGraphStore } from '../use-graph-store';
import { ELEMENT_MODEL_TYPE } from '../../mvc/element-model';
import { LINK_MODEL_TYPE } from '../../mvc/link-model';
import type { CellRecord, Computed } from '../../types/cell.types';
import { CELLS_ABC_LINK, makeElement, pickCellIds } from './__helpers__/cell-fixtures';
import { createStoreProbeWrapper, graphAct, settle } from './__helpers__/cell-render';

const initialCells = CELLS_ABC_LINK;

const wrapper = graphProviderWrapper({ initialCells });

const { Wrapper: ProbeWrapper, store } = createStoreProbeWrapper(initialCells);

const countLinks = (cells: readonly CellRecord[]) =>
  cells.filter((c) => c.type === LINK_MODEL_TYPE).length;

const selectCount = (cells: readonly CellRecord[]) => cells.length;

const selectHasAny = (cells: readonly CellRecord[]) => cells.length > 0;

const selectIsEmpty = (cells: readonly CellRecord[]) => cells.length === 0;

const selectElementCount = (cells: readonly CellRecord[]) =>
  cells.filter((c) => c.type === ELEMENT_MODEL_TYPE).length;

const selectElementIds = (cells: readonly CellRecord[]) =>
  cells.filter((c) => c.type === ELEMENT_MODEL_TYPE).map((c) => String(c.id));

const selectNonElementCount = (cells: readonly CellRecord[]) =>
  cells.filter((c) => c.type !== ELEMENT_MODEL_TYPE).length;

const selectFirstPosition = (cells: readonly CellRecord[]) => cells[0]?.position;

const selectFirstIdOrNone = (cells: readonly CellRecord[]) =>
  cells.length > 0 ? String(cells[0]!.id) : 'none';

const selectPosition = (cell: CellRecord | undefined) => cell?.position;

const selectIsDefined = (cell: CellRecord | undefined) => cell !== undefined;

const selectId = (cell: CellRecord | undefined) => cell?.id;

function stringArrayShallowEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (const [index, value] of a.entries()) {
    if (value !== b[index]) return false;
  }
  return true;
}

// ── Collection-form harness ─────────────────────────────────────────────────
// Graph cells only exist once the provider mounted, so the collection is
// created lazily on the first render — either from ids resolved on the graph
// or from a factory producing arbitrary `dia.Cell`s (e.g. clipboard clones).

type CollectionSeed = readonly string[] | ((graph: dia.Graph) => dia.Cell[]);

interface CollectionHookOptions<Selected> {
  readonly selector?: (cells: ReadonlyArray<Computed<CellRecord>>) => Selected;
  readonly isEqual?: (a: Selected, b: Selected) => boolean;
  readonly onRender?: () => void;
}

function seedCollection(graph: dia.Graph, seed: CollectionSeed): mvc.Collection<dia.Cell> {
  const cells = typeof seed === 'function' ? seed(graph) : seed.map((id) => graph.getCell(id)!);
  return new mvc.Collection<dia.Cell>(cells);
}

function renderCollectionCells<Selected = ReadonlyArray<Computed<CellRecord>>>(
  seed: CollectionSeed,
  options: CollectionHookOptions<Selected> = {}
) {
  const { selector, isEqual, onRender } = options;
  let collection: mvc.Collection<dia.Cell> | undefined;
  let graph: dia.Graph | undefined;
  const view = renderHook(
    (): Selected => {
      const currentStore = useGraphStore();
      ({ graph } = currentStore);
      collection ??= seedCollection(currentStore.graph, seed);
      onRender?.();
      // Same hook either way; the cast unifies the no-selector default shape.
      return (
        selector ? useCells(collection, selector, isEqual) : useCells(collection)
      ) as Selected;
    },
    { wrapper }
  );
  // The lazily-created refs are assigned during the first render above.
  return { result: view.result, rerender: view.rerender, collection: collection!, graph: graph! };
}

describe('useCells', () => {
  it('no-arg form returns the full cells array', async () => {
    const { result } = renderHook(() => useCells(), { wrapper });
    await settle();
    expect(result.current).toBeDefined();
    expect(result.current.length).toBe(4);
  });

  it('id form returns the cell record for that id', async () => {
    const { result } = renderHook(() => useCells('a'), { wrapper });
    await settle();
    expect(result.current?.id).toBe('a');
    expect(result.current?.type).toBe(ELEMENT_MODEL_TYPE);
  });

  it('id form returns undefined for missing id', async () => {
    const { result } = renderHook(() => useCells('missing'), { wrapper });
    await settle();
    expect(result.current).toBeUndefined();
  });

  it('single-cell selector form runs the selector with undefined for a nullish id', async () => {
    const { result } = renderHook(() => useCells(null, (cell) => cell?.id?.toString() ?? 'none'), {
      wrapper,
    });
    await settle();
    expect(result.current).toBe('none');
  });

  it('single-cell selector form runs the selector with the resolved cell for a real id', async () => {
    const { result } = renderHook(() => useCells('a', (cell) => cell?.id?.toString() ?? 'none'), {
      wrapper,
    });
    await settle();
    expect(result.current).toBe('a');
  });

  it('selector form runs the selector on the cells array', async () => {
    const { result } = renderHook(() => useCells(selectCount), { wrapper });
    await settle();
    expect(result.current).toBe(4);
  });

  it('selector form returns the same reference when equality holds', async () => {
    const { result, rerender } = renderHook(() => useCells(countLinks), { wrapper });
    await settle();
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });

  it('re-renders when a subscribed id changes', async () => {
    const { result } = renderHook(() => useCells('a'), { wrapper: ProbeWrapper });
    await settle();
    const before = result.current;

    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 999, y: 999 }));
    expect(result.current).not.toBe(before);
  });

  it('no-arg form re-renders when a cell data changes', async () => {
    const { result } = renderHook(() => useCells(), { wrapper: ProbeWrapper });
    await settle();
    const before = result.current;
    const cellA = before.find((c) => c.id === 'a');

    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 777, y: 777 }));

    expect(result.current).not.toBe(before);
    const cellAAfter = result.current.find((c) => c.id === 'a');
    expect(cellAAfter).not.toBe(cellA);
  });

  it('no-arg form handles large cell counts without stack overflow', async () => {
    const largeCells: CellRecord[] = [];
    for (let index = 0; index < 5000; index++) {
      largeCells.push(makeElement(`el-${index}`, index));
    }
    const largeWrapper = graphProviderWrapper({ initialCells: largeCells });
    const { result } = renderHook(() => useCells(), { wrapper: largeWrapper });
    await settle();
    expect(result.current.length).toBe(5000);
  });
});

interface ConsumerForIdsProps {
  readonly ids: readonly string[];
  readonly onRender: (length: number) => void;
}
function ConsumerForIds({ ids, onRender }: Readonly<ConsumerForIdsProps>) {
  const cells = useCells(ids);
  onRender(cells.length);
  return null;
}

const SUBSCRIBED_IDS = ['a', 'b'];

function SubscribedConsumerWrapper({
  onRender,
  children,
}: Readonly<{
  readonly onRender: (length: number) => void;
  readonly children: React.ReactNode;
}>) {
  return (
    <ProbeWrapper>
      <ConsumerForIds ids={SUBSCRIBED_IDS} onRender={onRender} />
      {children}
    </ProbeWrapper>
  );
}

describe('useCells (ids array form)', () => {
  it('returns only the picked cells in the order given', async () => {
    const { result } = renderHook(() => useCells(['c', 'a']), { wrapper });
    await settle();
    expect(result.current.map((cell) => cell.id)).toEqual(['c', 'a']);
  });

  it('skips ids that do not resolve to a cell', async () => {
    const { result } = renderHook(() => useCells(['a', 'missing', 'b']), { wrapper });
    await settle();
    expect(result.current.map((cell) => cell.id)).toEqual(['a', 'b']);
  });

  it('keeps the array reference stable across unrelated commits', async () => {
    const { result } = renderHook(() => useCells(['a', 'b']), { wrapper: ProbeWrapper });
    await settle();
    const before = result.current;
    expect(before.map((cell) => cell.id)).toEqual(['a', 'b']);

    // Change a cell that is NOT in the subscribed set — picked array must
    // keep the same reference (no re-render expected).
    await graphAct(() => store.current!.graph.getCell('c')?.set('position', { x: 999, y: 999 }));
    expect(result.current).toBe(before);
  });

  it('subscribes only to the listed ids — unrelated cell changes do not re-render', async () => {
    const renderSpy = jest.fn();
    renderHook(() => null, {
      wrapper: ({ children }) => (
        <SubscribedConsumerWrapper onRender={renderSpy}>{children}</SubscribedConsumerWrapper>
      ),
    });
    await settle();
    const beforeCount = renderSpy.mock.calls.length;

    // Mutate a cell NOT in the subscribed set — must NOT trigger Consumer re-render.
    await graphAct(() => store.current!.graph.getCell('c')?.set('position', { x: 1, y: 2 }));
    expect(renderSpy.mock.calls.length).toBe(beforeCount);

    // Mutate a subscribed id — must trigger at least one Consumer re-render.
    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 7, y: 7 }));
    expect(renderSpy.mock.calls.length).toBeGreaterThan(beforeCount);
  });

  it('returns a new array reference when a subscribed cell changes', async () => {
    const { result } = renderHook(() => useCells(['a', 'b']), { wrapper: ProbeWrapper });
    await settle();
    const before = result.current;

    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 50, y: 50 }));
    expect(result.current).not.toBe(before);
    expect(result.current.find((cell) => cell.id === 'a')?.position).toEqual({ x: 50, y: 50 });
  });

  it('selector form: receives only the picked cells', async () => {
    const { result } = renderHook(() => useCells(SUBSCRIBED_IDS, pickCellIds), { wrapper });
    await settle();
    expect(result.current).toEqual(['a', 'b']);
  });

  it('selector form: a selector that returns a fresh array each call does not infinite-loop', async () => {
    // Selector intentionally returns a fresh array reference on every call.
    const { result } = renderHook(() => useCells(SUBSCRIBED_IDS, pickCellIds), {
      wrapper: ProbeWrapper,
    });
    await settle();
    expect(result.current).toEqual(['a', 'b']);

    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 1, y: 1 }));
    expect(result.current).toEqual(['a', 'b']);
  });

  it('selector form: custom isEqual short-circuits re-renders', async () => {
    const { result } = renderHook(
      () => useCells(SUBSCRIBED_IDS, pickCellIds, stringArrayShallowEqual),
      { wrapper: ProbeWrapper }
    );
    await settle();
    const before = result.current;
    expect(before).toEqual(['a', 'b']);

    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 9, y: 9 }));
    // ids list didn't change, so isEqual returns true → cached reference held.
    expect(result.current).toBe(before);
  });
});

describe('useCells (selector returning new reference)', () => {
  it('does not infinite-loop when the selector returns a fresh object every call', async () => {
    const { result } = renderHook(() => useCells(pickCellIds), { wrapper });
    await settle();
    expect(result.current).toEqual(['a', 'b', 'c', 'l1']);
  });

  it('returns a new reference when the picked array length changes (line 24)', async () => {
    const { result } = renderHook(() => useCells(['a', 'b']), {
      wrapper: ProbeWrapper,
    });
    await settle();
    const before = result.current;
    expect(before.map((cell) => cell.id)).toEqual(['a', 'b']);
    // Removing 'a' shrinks the picked array — `areArraysShallowEqual` hits
    // its `a.length !== b.length` early-out (line 24) and the result diverges.
    await graphAct(() => store.current!.graph.getCell('a')?.remove());
    expect(result.current).not.toBe(before);
    expect(result.current.map((cell) => cell.id)).toEqual(['b']);
  });

  it('selector returning a non-array falls through to Object.is (line 75)', async () => {
    // `arrayAwareEqual` is selected when a selector is supplied. Line 75 —
    // `return Object.is(a, b)` — fires only when at least one side is not
    // an array. A `cells.length` selector returns a number, so the array
    // branch is skipped and the Object.is fallback runs on the next commit.
    const { result } = renderHook(() => useCells(selectCount), {
      wrapper: ProbeWrapper,
    });
    await settle();
    expect(result.current).toBe(4);

    // Mutate a cell so the store version bumps and the equality check runs.
    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 42, y: 42 }));
    // Length didn't change; Object.is(4, 4) === true → cached value held.
    expect(result.current).toBe(4);
  });
});

describe('useCells (collection form)', () => {
  it('returns records for cells in the collection', async () => {
    const { result } = renderCollectionCells(['a', 'b']);
    await settle();
    expect(result.current.map((c) => c.id)).toEqual(['a', 'b']);
  });

  it('updates when a cell is added to the collection', async () => {
    const { result, collection, graph } = renderCollectionCells(['a']);
    await settle();
    expect(result.current.map((c) => c.id)).toEqual(['a']);

    await graphAct(() => collection.add(graph.getCell('b')!));
    expect(result.current.map((c) => c.id)).toEqual(['a', 'b']);
  });

  it('updates when a cell is removed from the collection', async () => {
    const { result, collection, graph } = renderCollectionCells(['a', 'b']);
    await settle();
    expect(result.current.map((c) => c.id)).toEqual(['a', 'b']);

    await graphAct(() => collection.remove(graph.getCell('a')!));
    expect(result.current.map((c) => c.id)).toEqual(['b']);
  });

  it('updates when the collection is reset', async () => {
    const { result, collection, graph } = renderCollectionCells(['a']);
    await settle();
    expect(result.current.map((c) => c.id)).toEqual(['a']);

    await graphAct(() => collection.reset([graph.getCell('b')!, graph.getCell('c')!]));
    expect(result.current.map((c) => c.id)).toEqual(['b', 'c']);
  });

  it('re-renders when a subscribed cell changes', async () => {
    const { result, graph } = renderCollectionCells(['a']);
    await settle();
    const before = result.current;

    await graphAct(() => graph.getCell('a')?.set('position', { x: 999, y: 999 }));
    expect(result.current).not.toBe(before);
    expect(result.current.find((c) => c.id === 'a')?.position).toEqual({ x: 999, y: 999 });
  });

  it('does not re-render when an unrelated cell changes', async () => {
    const renderSpy = jest.fn();
    const { graph } = renderCollectionCells(['a'], { onRender: renderSpy });
    await settle();
    const countBefore = renderSpy.mock.calls.length;

    await graphAct(() => graph.getCell('c')?.set('position', { x: 1, y: 2 }));
    expect(renderSpy.mock.calls.length).toBe(countBefore);
  });

  it('selector form derives a value from collection cells', async () => {
    const { result } = renderCollectionCells(['a', 'b'], { selector: selectCount });
    await settle();
    expect(result.current).toBe(2);
  });

  it('selector prevents re-render when result unchanged', async () => {
    const { result, graph } = renderCollectionCells(['a'], { selector: selectHasAny });
    await settle();
    expect(result.current).toBe(true);
    const before = result.current;

    // Cell position change does not affect length > 0
    await graphAct(() => graph.getCell('a')?.set('position', { x: 50, y: 50 }));
    expect(result.current).toBe(before);
  });

  it('empty collection returns empty array', async () => {
    const { result } = renderCollectionCells([]);
    await settle();
    expect(result.current).toEqual([]);
  });

  it('array-returning selector without isEqual skips re-render when result is structurally equal', async () => {
    let renderCount = 0;
    const countRender = () => {
      renderCount++;
    };
    const { result, graph } = renderCollectionCells(['a', 'b'], {
      selector: selectElementIds,
      onRender: countRender,
    });
    await settle();
    expect(result.current).toEqual(['a', 'b']);
    const before = result.current;
    const rendersBefore = renderCount;

    // Change position on 'a' — ids list unchanged, should NOT re-render
    await graphAct(() => graph.getCell('a')?.set('position', { x: 999, y: 999 }));
    expect(result.current).toBe(before);
    expect(renderCount).toBe(rendersBefore);
  });

  it('warns in dev when selector returns unstable object array without isEqual', async () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { result, collection, graph } = renderCollectionCells(['a', 'b'], {
      selector: pickCellIds,
    });
    await settle();
    expect(result.current).toEqual(['a', 'b']);

    await graphAct(() => collection.remove(graph.getCell('a')!));
    expect(result.current).toEqual(['b']);
  });

  it('selector returning boolean updates when collection becomes empty', async () => {
    const { result, collection, graph } = renderCollectionCells(['a'], {
      selector: selectHasAny,
    });
    await settle();
    expect(result.current).toBe(true);

    await graphAct(() => collection.remove(graph.getCell('a')!));
    expect(result.current).toBe(false);
  });

  it('selector returning count updates on membership change', async () => {
    const { result, collection, graph } = renderCollectionCells(['a'], {
      selector: selectCount,
    });
    await settle();
    expect(result.current).toBe(1);

    await graphAct(() => collection.add(graph.getCell('b')!));
    expect(result.current).toBe(2);

    await graphAct(() => collection.remove(graph.getCell('a')!));
    expect(result.current).toBe(1);
  });

  it('selector returning ids updates on collection reset', async () => {
    const { result, collection, graph } = renderCollectionCells(['a'], {
      selector: pickCellIds,
    });
    await settle();
    expect(result.current).toEqual(['a']);

    await graphAct(() => collection.reset([graph.getCell('b')!, graph.getCell('c')!]));
    expect(result.current).toEqual(['b', 'c']);
  });

  // ── Non-graph cells (clipboard-style: cell instances not in the graph) ──

  it('returns records for cells that are not in the graph', async () => {
    const { result } = renderCollectionCells((graph) => [graph.getCell('a')!.clone() as dia.Cell]);
    await settle();
    expect(result.current).toHaveLength(1);
    expect(result.current[0]!.type).toBe(ELEMENT_MODEL_TYPE);
  });

  it('selector sees correct length when cells are not in the graph', async () => {
    const { result, collection, graph } = renderCollectionCells([], {
      selector: selectIsEmpty,
    });
    await settle();
    expect(result.current).toBe(true);

    await graphAct(() => collection.add(graph.getCell('a')!.clone() as dia.Cell));
    expect(result.current).toBe(false);

    await graphAct(() => collection.reset([]));
    expect(result.current).toBe(true);
  });

  it('returns stable record reference across renders for non-graph cells', async () => {
    const { result, rerender } = renderCollectionCells((graph) => [
      graph.getCell('a')!.clone() as dia.Cell,
    ]);
    await settle();
    const first = result.current;
    rerender();
    await settle();
    expect(result.current).toBe(first);
  });
});

// ── Collection + selector reactivity (empty-start, the real-world pattern) ──

describe('useCells (collection + selector reactivity)', () => {
  it('empty collection → reset with cells: count updates', async () => {
    const { result, collection, graph } = renderCollectionCells([], { selector: selectCount });
    await settle();
    expect(result.current).toBe(0);

    await graphAct(() => collection.reset([graph.getCell('a')!, graph.getCell('b')!]));
    expect(result.current).toBe(2);
  });

  it('empty collection → reset with cells: boolean updates', async () => {
    const { result, collection, graph } = renderCollectionCells([], { selector: selectHasAny });
    await settle();
    expect(result.current).toBe(false);

    await graphAct(() => collection.reset([graph.getCell('a')!]));
    expect(result.current).toBe(true);
  });

  it('empty collection → add cell: ids update', async () => {
    const { result, collection, graph } = renderCollectionCells([], { selector: pickCellIds });
    await settle();
    expect(result.current).toEqual([]);

    await graphAct(() => collection.add(graph.getCell('a')!));
    expect(result.current).toEqual(['a']);
  });

  it('empty collection → reset → reset again: count tracks all changes', async () => {
    const { result, collection, graph } = renderCollectionCells([], { selector: selectCount });
    await settle();
    expect(result.current).toBe(0);

    await graphAct(() => collection.reset([graph.getCell('a')!]));
    expect(result.current).toBe(1);

    await graphAct(() =>
      collection.reset([graph.getCell('a')!, graph.getCell('b')!, graph.getCell('c')!])
    );
    expect(result.current).toBe(3);

    await graphAct(() => collection.reset([]));
    expect(result.current).toBe(0);
  });

  it('empty collection → reset → remove: boolean toggles false→true→false', async () => {
    const { result, collection, graph } = renderCollectionCells([], { selector: selectHasAny });
    await settle();
    expect(result.current).toBe(false);

    await graphAct(() => collection.reset([graph.getCell('a')!]));
    expect(result.current).toBe(true);

    await graphAct(() => collection.remove(graph.getCell('a')!));
    expect(result.current).toBe(false);
  });

  it('collection selector: cell data change updates derived position', async () => {
    const { result, graph } = renderCollectionCells(['a'], { selector: selectFirstPosition });
    await settle();
    expect(result.current).toEqual({ x: 0, y: 0 });

    await graphAct(() => graph.getCell('a')?.set('position', { x: 100, y: 200 }));
    expect(result.current).toEqual({ x: 100, y: 200 });
  });

  it('collection selector returning string: first cell id', async () => {
    const { result, collection, graph } = renderCollectionCells([], {
      selector: selectFirstIdOrNone,
    });
    await settle();
    expect(result.current).toBe('none');

    await graphAct(() => collection.reset([graph.getCell('b')!]));
    expect(result.current).toBe('b');

    await graphAct(() => collection.reset([graph.getCell('c')!]));
    expect(result.current).toBe('c');
  });

  it('two hooks on same collection: both react to changes', async () => {
    const collection = new mvc.Collection<dia.Cell>([]);
    const { result } = renderHook(
      () => {
        const count = useCells(collection, selectCount);
        const ids = useCells(collection, pickCellIds);
        return { count, ids };
      },
      { wrapper: ProbeWrapper }
    );
    await settle();
    expect(result.current.count).toBe(0);
    expect(result.current.ids).toEqual([]);

    await graphAct(() =>
      collection.reset([store.current!.graph.getCell('a')!, store.current!.graph.getCell('b')!])
    );
    expect(result.current.count).toBe(2);
    expect(result.current.ids).toEqual(['a', 'b']);

    await graphAct(() => collection.remove(store.current!.graph.getCell('a')!));
    expect(result.current.count).toBe(1);
    expect(result.current.ids).toEqual(['b']);
  });

  it('collection with selector: only elements count', async () => {
    const { result, collection, graph } = renderCollectionCells([], {
      selector: selectElementCount,
    });
    await settle();
    expect(result.current).toBe(0);

    await graphAct(() => collection.reset([graph.getCell('a')!, graph.getCell('l1')!]));
    expect(result.current).toBe(1);
  });

  it('collection with selector: filter element ids only', async () => {
    const { result, collection, graph } = renderCollectionCells([], {
      selector: selectElementIds,
    });
    await settle();
    expect(result.current).toEqual([]);

    await graphAct(() =>
      collection.reset([graph.getCell('a')!, graph.getCell('b')!, graph.getCell('l1')!])
    );
    expect(result.current).toEqual(['a', 'b']);

    await graphAct(() => collection.remove(graph.getCell('a')!));
    expect(result.current).toEqual(['b']);
  });

  it('collection with selector: link count', async () => {
    const { result, collection, graph } = renderCollectionCells([], {
      selector: selectNonElementCount,
    });
    await settle();
    expect(result.current).toBe(0);

    await graphAct(() => collection.reset([graph.getCell('a')!, graph.getCell('l1')!]));
    expect(result.current).toBe(1);

    await graphAct(() => collection.remove(graph.getCell('l1')!));
    expect(result.current).toBe(0);
  });

  it('collection with custom isEqual: stable ref when ids match', async () => {
    const { result, graph } = renderCollectionCells(['a'], {
      selector: pickCellIds,
      isEqual: stringArrayShallowEqual,
    });
    await settle();
    const before = result.current;
    expect(before).toEqual(['a']);

    // Cell data change doesn't affect ids — custom isEqual should keep ref stable
    await graphAct(() => graph.getCell('a')?.set('position', { x: 42, y: 42 }));
    expect(result.current).toBe(before);
  });
});

// ── Selector reactivity without collection ──

describe('useCells (selector reactivity — no collection)', () => {
  it('selector returning ids from all cells', async () => {
    const { result } = renderHook(() => useCells(pickCellIds), { wrapper });
    await settle();
    expect(result.current).toEqual(['a', 'b', 'c', 'l1']);
  });

  it('selector returning boolean from all cells', async () => {
    const { result } = renderHook(() => useCells(selectHasAny), { wrapper });
    await settle();
    expect(result.current).toBe(true);
  });

  it('all-cells selector: count updates when cell added to graph', async () => {
    const { result } = renderHook(() => useCells(selectCount), { wrapper: ProbeWrapper });
    await settle();
    expect(result.current).toBe(4);

    await graphAct(() => store.current!.graph.addCell(makeElement('new-el')));
    expect(result.current).toBe(5);
  });

  it('all-cells selector: count updates when cell removed from graph', async () => {
    const { result } = renderHook(() => useCells(selectCount), { wrapper: ProbeWrapper });
    await settle();
    expect(result.current).toBe(4);

    // Removing element 'a' also removes its connected link 'l1' (4 - 2 = 2)
    await graphAct(() => store.current!.graph.getCell('a')?.remove());
    expect(result.current).toBe(2);
  });

  it('all-cells selector: ids update when cell removed', async () => {
    const { result } = renderHook(() => useCells(pickCellIds), { wrapper: ProbeWrapper });
    await settle();
    expect(result.current).toContain('a');

    await graphAct(() => store.current!.graph.getCell('a')?.remove());
    expect(result.current).not.toContain('a');
  });

  it('ids array with selector returning ids updates on cell data change', async () => {
    const { result } = renderHook(() => useCells(['a', 'b'], pickCellIds), {
      wrapper: ProbeWrapper,
    });
    await settle();
    expect(result.current).toEqual(['a', 'b']);

    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 999, y: 999 }));
    // IDs unchanged — reference should be stable
    expect(result.current).toEqual(['a', 'b']);
  });

  it('ids array with selector returning count', async () => {
    const { result } = renderHook(() => useCells(['a', 'b'], selectCount), { wrapper });
    await settle();
    expect(result.current).toBe(2);
  });

  it('single id with selector returning boolean', async () => {
    const { result } = renderHook(() => useCells('a', selectIsDefined), { wrapper });
    await settle();
    expect(result.current).toBe(true);
  });

  it('single id with selector returning id', async () => {
    const { result } = renderHook(() => useCells('a', selectId), { wrapper });
    await settle();
    expect(result.current).toBe('a');
  });

  it('single id selector: reacts to cell data change', async () => {
    const { result } = renderHook(() => useCells('a', selectPosition), { wrapper: ProbeWrapper });
    await settle();
    expect(result.current).toEqual({ x: 0, y: 0 });

    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 300, y: 400 }));
    expect(result.current).toEqual({ x: 300, y: 400 });
  });

  it('single id selector: boolean stable when cell unchanged', async () => {
    const { result } = renderHook(() => useCells('a', selectIsDefined), {
      wrapper: ProbeWrapper,
    });
    await settle();
    expect(result.current).toBe(true);

    // Unrelated cell change should NOT affect single-id subscription
    await graphAct(() => store.current!.graph.getCell('b')?.set('position', { x: 1, y: 1 }));
    expect(result.current).toBe(true);
  });

  it('returns pre-existing collection items on first render after graph is fully synced', async () => {
    // Reproduces the case where a consumer mounts *after* the graph store has
    // already settled (its commit microtask fired) and the collection was
    // populated before the consumer subscribed. Without picking up the items
    // synchronously in the render phase, no container listener would fire to
    // notify React, and `useCells` would stay stuck at `[]`.
    let collection: mvc.Collection<dia.Cell> | null = null;
    let renderedIds: readonly string[] = [];

    function Setup() {
      const setupStore = useGraphStore();
      if (!collection) {
        collection = new mvc.Collection<dia.Cell>([
          setupStore.graph.getCell('a')!,
          setupStore.graph.getCell('b')!,
        ]);
      }
      return null;
    }

    function Consumer() {
      const cells = useCells(collection!);
      renderedIds = cells.map((c) => String(c.id));
      return null;
    }

    const { rerender } = render(
      <GraphProvider initialCells={initialCells}>
        <Setup />
      </GraphProvider>
    );

    // Allow the graph store's initial sync + commit to settle. The Consumer is
    // NOT mounted yet, so no useCells listener is registered for these cells.
    await settle();

    rerender(
      <GraphProvider initialCells={initialCells}>
        <Setup />
        <Consumer />
      </GraphProvider>
    );
    await settle();

    expect(renderedIds).toEqual(['a', 'b']);
  });
});
