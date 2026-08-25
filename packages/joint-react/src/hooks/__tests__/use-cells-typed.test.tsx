import { renderHook } from '@testing-library/react';
import { graphProviderWrapper } from '../../utils/test-wrappers';
import { useCells } from '../use-cells';
import { LABELED_CELLS_AB } from './__helpers__/cell-fixtures';
import { settle } from './__helpers__/cell-render';
import type { MyElement } from './__helpers__/cell-type-fixtures';

const wrapper = graphProviderWrapper({ initialCells: LABELED_CELLS_AB });

const pickLabels = (cells: readonly MyElement[]): string[] => cells.map((cell) => cell.data.label);

describe('useCells — record-shaped generics', () => {
  it('explicit Cell generic narrows array element type', async () => {
    const { result } = renderHook(() => useCells<MyElement>(), { wrapper });
    await settle();
    expect(result.current).toHaveLength(2);
    expect(result.current[0].data.label).toBe('hi');
    expect(result.current[1].data.label).toBe('lo');
  });

  it('selector annotated returns mapped values', async () => {
    const { result } = renderHook(() => useCells(pickLabels), { wrapper });
    await settle();
    expect(result.current).toEqual(['hi', 'lo']);
  });

  it('untyped selector defaults Cell to Computed<CellRecord>', async () => {
    const { result } = renderHook(() => useCells((cells) => cells.length), { wrapper });
    await settle();
    expect(result.current).toBe(2);
  });

  it('id form returns Cell | undefined', async () => {
    const { result } = renderHook(() => useCells<MyElement>('a'), { wrapper });
    await settle();
    expect(result.current?.data.label).toBe('hi');
  });
});
