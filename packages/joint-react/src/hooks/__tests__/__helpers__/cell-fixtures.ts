import { ELEMENT_MODEL_TYPE } from '../../../mvc/element-model';
import { LINK_MODEL_TYPE } from '../../../mvc/link-model';
import type { CellRecord } from '../../../types/cell.types';

/**
 * Builds an element record fixture (10×10 at `{ x, y: 0 }`).
 * @param id - element id
 * @param x - horizontal position
 * @param data - optional user data payload
 * @returns element cell record
 */
export const makeElement = (id: string, x = 0, data?: Record<string, unknown>): CellRecord =>
  ({
    id,
    type: ELEMENT_MODEL_TYPE,
    position: { x, y: 0 },
    size: { width: 10, height: 10 },
    ...(data === undefined ? {} : { data }),
  }) as CellRecord;

/**
 * Builds a link record fixture between two element ids.
 * @param id - link id
 * @param source - source element id
 * @param target - target element id
 * @param data - optional user data payload
 * @returns link cell record
 */
export const makeLink = (
  id: string,
  source: string,
  target: string,
  data?: Record<string, unknown>
): CellRecord =>
  ({
    id,
    type: LINK_MODEL_TYPE,
    source: { id: source },
    target: { id: target },
    ...(data === undefined ? {} : { data }),
  }) as CellRecord;

/** Elements `a` (x 0) and `b` (x 50). */
export const CELLS_AB: readonly CellRecord[] = [makeElement('a'), makeElement('b', 50)];

/** Elements `a`, `b` plus link `l1` (a → b). */
export const CELLS_AB_LINK: readonly CellRecord[] = [...CELLS_AB, makeLink('l1', 'a', 'b')];

/** Elements `a`, `b` and `c` (x 100). */
export const CELLS_ABC: readonly CellRecord[] = [...CELLS_AB, makeElement('c', 100)];

/** Elements `a`, `b`, `c` plus link `l1` (a → b). */
export const CELLS_ABC_LINK: readonly CellRecord[] = [...CELLS_ABC, makeLink('l1', 'a', 'b')];

/** Elements `a` and `b` carrying `data.label` payloads (`hi` / `lo`). */
export const LABELED_CELLS_AB: readonly CellRecord[] = [
  makeElement('a', 0, { label: 'hi' }),
  makeElement('b', 50, { label: 'lo' }),
];

/** Labeled elements plus link `l1` (a → b) carrying `data.kind`. */
export const LABELED_CELLS_AB_LINK: readonly CellRecord[] = [
  ...LABELED_CELLS_AB,
  makeLink('l1', 'a', 'b', { kind: 'k' }),
];

/**
 * Resolves after pending graph-store commit microtasks have run.
 * @returns promise resolved on the next microtask
 */
export const flushMicrotasks = (): Promise<void> => {
  return new Promise<void>((resolve) => queueMicrotask(resolve));
};

/**
 * Maps cells to their string ids (common `useCells` selector in tests).
 * @param cells - cell records to map
 * @returns array of string ids
 */
export const pickCellIds = (cells: readonly CellRecord[]): string[] =>
  cells.map((cell) => String(cell.id));
