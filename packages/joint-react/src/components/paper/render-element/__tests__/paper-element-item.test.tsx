import { render, waitFor } from '@testing-library/react';
import { useContext, type ComponentType, type ReactNode } from 'react';
import { GraphProvider } from '../../../graph/graph-provider';
import { Paper } from '../../paper';
import { SVGElementItem, HTMLElementItem, ElementHitArea } from '../paper-element-item';
import { CellIdContext, GraphStoreContext, PaperStoreContext } from '../../../../context';
import { ELEMENT_MODEL_TYPE } from '../../../../mvc/element-model';
import type { CellRecord, CellId } from '../../../../types/cell.types';

const RenderEmpty: ComponentType<Record<string, unknown>> = () => <span data-testid="render-empty" />;
const renderRectangle = () => <rect />;
const PAPER_STYLE = { width: 100, height: 100 } as const;

const CELLS: readonly CellRecord[] = [
  {
    id: 'one',
    type: ELEMENT_MODEL_TYPE,
    position: { x: 5, y: 7 },
    size: { width: 30, height: 40 },
    data: { label: 'one' },
  } as CellRecord,
];

interface CapturedStores {
  graphStore: React.ContextType<typeof GraphStoreContext>;
  paperStore: React.ContextType<typeof PaperStoreContext>;
}

/**
 * Captures the live graph + paper store from inside a Paper, so the harness
 * can re-mount SVG / HTML element items with `portalElement={null}` for the
 * defensive guard branches.
 */
function StoreCapture({ target }: { readonly target: CapturedStores }) {
  const graphStore = useContext(GraphStoreContext);
  const paperStore = useContext(PaperStoreContext);
  if (graphStore && paperStore) {
    target.graphStore = graphStore;
    target.paperStore = paperStore;
  }
  return null;
}

/** Renders a GraphProvider + Paper and resolves once both stores are captured. */
async function renderPaperAndCaptureStores(useHTMLOverlay = false) {
  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- per-mount mutable capture target
  const captured: CapturedStores = { graphStore: null, paperStore: null };
  const { rerender, container } = render(
    <GraphProvider initialCells={CELLS}>
      <Paper style={PAPER_STYLE} useHTMLOverlay={useHTMLOverlay} renderElement={renderRectangle}>
        <StoreCapture target={captured} />
      </Paper>
    </GraphProvider>
  );
  await waitFor(() => {
    expect(captured.graphStore).not.toBeNull();
    expect(captured.paperStore).not.toBeNull();
  });
  return { captured, rerender, container };
}

interface CellContextsProps {
  captured: CapturedStores;
  cellId: CellId;
  children: ReactNode;
}

/** Standalone mount target: the captured stores plus a cell id, as contexts. */
function CellContexts({ captured, cellId, children }: Readonly<CellContextsProps>) {
  return (
    <GraphStoreContext.Provider value={captured.graphStore}>
      <PaperStoreContext.Provider value={captured.paperStore}>
        <CellIdContext.Provider value={cellId}>{children}</CellIdContext.Provider>
      </PaperStoreContext.Provider>
    </GraphStoreContext.Provider>
  );
}

describe('paper-element-item exports', () => {
  it('SVGElementItem returns null when portalElement is null', async () => {
    const { captured, rerender, container } = await renderPaperAndCaptureStores();
    rerender(
      <CellContexts captured={captured} cellId={'one' as CellId}>
        <SVGElementItem renderElement={RenderEmpty} portalElement={null} areElementsMeasured />
      </CellContexts>
    );
    expect(container.querySelector('[data-testid="render-empty"]')).toBeNull();
  });

  it('HTMLElementItem returns null when portalElement is null', async () => {
    const { captured, rerender, container } = await renderPaperAndCaptureStores(true);
    rerender(
      <CellContexts captured={captured} cellId={'one' as CellId}>
        <HTMLElementItem renderElement={RenderEmpty} portalElement={null} areElementsMeasured />
      </CellContexts>
    );
    expect(container.querySelector('[data-testid="render-empty"]')).toBeNull();
  });

  it('HTMLElementItem renders a placeholder wrapper when the cell is missing from the store', async () => {
    const { captured, rerender, container } = await renderPaperAndCaptureStores(true);

    const portalTarget = document.createElement('div');
    document.body.append(portalTarget);

    rerender(
      <CellContexts captured={captured} cellId={'missing-cell-id' as CellId}>
        <HTMLElementItem renderElement={RenderEmpty} portalElement={portalTarget} areElementsMeasured />
      </CellContexts>
    );

    // Placeholder wrapper should still be created with id and zero geometry.
    const wrapper = portalTarget.querySelector('div[model-id="missing-cell-id"]') as HTMLDivElement | null;
    expect(wrapper).toBeTruthy();
    expect(wrapper?.style.width).toBe('0px');
    expect(wrapper?.style.height).toBe('0px');
    expect(wrapper?.style.transform).toContain('translate(0px, 0px)');
    portalTarget.remove();
    container.remove();
  });

  it('ElementHitArea renders a transparent rectangle sized to the cell', async () => {
    const { captured, rerender, container } = await renderPaperAndCaptureStores();

    rerender(
      <svg>
        <CellContexts captured={captured} cellId={'one' as CellId}>
          <ElementHitArea />
        </CellContexts>
      </svg>
    );

    const rect = container.querySelector('rect[fill="transparent"]') as SVGRectElement | null;
    expect(rect).toBeTruthy();
    expect(rect?.getAttribute('width')).toBe('30');
    expect(rect?.getAttribute('height')).toBe('40');
  });
});
