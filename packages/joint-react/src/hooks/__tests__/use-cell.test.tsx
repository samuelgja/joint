import { render, renderHook } from '@testing-library/react';
import { GraphProvider } from '../../components/graph/graph-provider';
import { graphProviderWrapper } from '../../utils/test-wrappers';
import { useCell } from '../use-cell';
import { ELEMENT_MODEL_TYPE } from '../../mvc/element-model';
import type { CellRecord } from '../../types/cell.types';
import { CELLS_AB_LINK } from './__helpers__/cell-fixtures';
import {
  createStoreProbeWrapper,
  graphAct,
  renderInCellContext,
  settle,
} from './__helpers__/cell-render';

const wrapper = graphProviderWrapper({ initialCells: CELLS_AB_LINK });

function ReadCell({
  onRead,
}: {
  readonly onRead: (cell: CellRecord | undefined) => void;
}) {
  const cell = useCell();
  onRead(cell);
  return null;
}

const NOOP_READ: (cell: CellRecord | undefined) => void = () => {};

interface CaptureState {
  cell: CellRecord | undefined;
}
const captureState: CaptureState = { cell: undefined };
function captureCell(cell: CellRecord | undefined) {
  captureState.cell = cell;
}
function resetCapturedCell() {
  captureState.cell = undefined;
}

describe('useCell', () => {
  it('throws when used outside CellIdContext', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <GraphProvider initialCells={CELLS_AB_LINK}>
          <ReadCell onRead={NOOP_READ} />
        </GraphProvider>
      )
    ).toThrow();
    spy.mockRestore();
  });

  it('returns the cell record when wrapped in CellIdContext', () => {
    resetCapturedCell();
    renderInCellContext(CELLS_AB_LINK, 'a', <ReadCell onRead={captureCell} />);
    expect(captureState.cell?.id).toBe('a');
    expect(captureState.cell?.type).toBe(ELEMENT_MODEL_TYPE);
  });

  it('throws when the id is missing from the store', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      renderInCellContext(CELLS_AB_LINK, 'does-not-exist', <ReadCell onRead={NOOP_READ} />)
    ).toThrow();
    spy.mockRestore();
  });
});

describe('useCell (id argument form)', () => {
  it('returns the cell record for an explicit id without needing context', async () => {
    const { result } = renderHook(() => useCell('a'), { wrapper });
    await settle();
    expect(result.current?.id).toBe('a');
  });

  it('selector form returns the selected slice', async () => {
    const { result } = renderHook(() => useCell('a', (cell) => cell.id), {
      wrapper,
    });
    await settle();
    expect(result.current).toBe('a');
  });

  it('throws when the explicit id does not resolve to a cell', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCell('missing'), { wrapper })).toThrow();
    spy.mockRestore();
  });

  it('subscribes only to the requested id — unrelated cells do not re-render', async () => {
    const renderSpy = jest.fn();
    const { Wrapper, store } = createStoreProbeWrapper(CELLS_AB_LINK);
    function Consumer() {
      const cell = useCell('a');
      renderSpy(cell?.id);
      return null;
    }
    render(
      <Wrapper>
        <Consumer />
      </Wrapper>
    );
    await settle();
    const before = renderSpy.mock.calls.length;
    await graphAct(() => store.current!.graph.getCell('b')?.set('position', { x: 99, y: 99 }));
    expect(renderSpy.mock.calls.length).toBe(before);
  });

  it('selector form does not infinite-loop when returning a fresh reference', async () => {
    const { result } = renderHook(
      () =>
        useCell('a', (cell) => ({
          id: cell.id,
        })),
      { wrapper }
    );
    await settle();
    expect(result.current).toEqual({ id: 'a' });
  });
});

describe('useCell (context form with selector)', () => {
  it('selector receives the current cell from CellIdContext', () => {
    let captured: unknown;
    function Probe() {
      captured = useCell((cell) => cell.id);
      return null;
    }
    renderInCellContext(CELLS_AB_LINK, 'a', <Probe />);
    expect(captured).toBe('a');
  });
});
