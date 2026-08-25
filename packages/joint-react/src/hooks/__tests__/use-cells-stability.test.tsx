import { renderHook } from '@testing-library/react';
import { graphProviderWrapper } from '../../utils/test-wrappers';
import { useCells } from '../use-cells';
import { ELEMENT_MODEL_TYPE } from '../../mvc/element-model';
import type { CellRecord } from '../../types/cell.types';
import { CELLS_ABC_LINK } from './__helpers__/cell-fixtures';
import { settle } from './__helpers__/cell-render';

const wrapper = graphProviderWrapper({ initialCells: CELLS_ABC_LINK });

// Module-scoped selectors so render iterations re-use the same function
// reference (closer to a real call site).
const idSelector = (cells: readonly CellRecord[]) => cells.map((cell) => cell.id);
const elementFilterSelector = (cells: readonly CellRecord[]) =>
  cells.filter((cell) => cell.type === ELEMENT_MODEL_TYPE);

async function expectStableSelectorReference(selector: (cells: readonly CellRecord[]) => unknown) {
  const { result, rerender } = renderHook(() => useCells(selector), { wrapper });
  await settle();
  const firstSnapshot = result.current;
  rerender();
  await settle();
  expect(result.current).toBe(firstSnapshot);
}

describe('useCells selector reference stability', () => {
  it('returns a stable array reference across renders when a map selector output is unchanged', async () => {
    await expectStableSelectorReference(idSelector);
  });

  it('returns a stable array reference across renders when a filter selector output is unchanged', async () => {
    await expectStableSelectorReference(elementFilterSelector);
  });
});
