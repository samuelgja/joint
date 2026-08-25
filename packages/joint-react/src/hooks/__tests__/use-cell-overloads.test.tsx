import { renderHook } from '@testing-library/react';
import { graphProviderWrapper } from '../../utils/test-wrappers';
import { useCell } from '../use-cell';
import { useCells } from '../use-cells';
import { CELLS_AB, flushMicrotasks } from './__helpers__/cell-fixtures';
import { createStoreProbeWrapper, renderInCellContext } from './__helpers__/cell-render';

const wrapper = graphProviderWrapper({ initialCells: CELLS_AB });

describe('useCell overload branches (lines 77, 82)', () => {
  it('forwards a custom isEqual on the (selector, isEqual) overload (line 77)', () => {
    // (selector, isEqual?) overload — argument1 = function, argument2 = function.
    // Picks up the `isEqual = argument2` branch.
    const isEqual = jest.fn((a: string, b: string) => a === b);
    let captured: unknown;
    function Probe() {
      captured = useCell((cell) => String(cell.id), isEqual);
      return null;
    }
    renderInCellContext(CELLS_AB, 'a', <Probe />);
    expect(captured).toBe('a');
  });

  it('forwards a custom isEqual on the (id, selector, isEqual) overload (line 82)', () => {
    const isEqual = jest.fn((a: string, b: string) => a === b);
    const { result } = renderHook(
      () => useCell('a', (cell) => String(cell.id), isEqual),
      { wrapper }
    );
    expect(result.current).toBe('a');
  });
});

describe('useCells arrayAwareEqual fallback (line 75)', () => {
  it('selector returning a non-array falls through to Object.is on commit', async () => {
    // arrayAwareEqual(a, b): both arrays → shallow compare; otherwise → Object.is.
    // A `cells.length` selector returns a number — Object.is(number, number) runs.
    const { Wrapper, store } = createStoreProbeWrapper(CELLS_AB);
    const { result } = renderHook(() => useCells((cells) => cells.length), {
      wrapper: Wrapper,
    });
    // Force a commit by mutating an existing cell. Length stays the same;
    // Object.is(2, 2) === true → cached value held — exercises line 75.
    store.current!.graph.getCell('a')?.set('position', { x: 10, y: 20 });
    await flushMicrotasks();
    expect(result.current).toBe(2);
  });
});
