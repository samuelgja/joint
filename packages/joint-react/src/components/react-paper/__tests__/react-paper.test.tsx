/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { act, fireEvent, render } from '@testing-library/react';
import { createContext, useContext, type RefObject } from 'react';
import type { dia } from '@joint/core';
import { GraphProvider } from '../../graph/graph-provider';
import { ReactPaper, type ReactPaperProps } from '../react-paper';
import { useGraph } from '../../../hooks/use-graph';
import { useCellId } from '../../../hooks/use-cell-id';
import { linkRoutingOrthogonal } from '../../../presets/link-routing';
import type { CellRecord } from '../../../types/cell.types';

interface NodeData {
  readonly label: string;
}

const CELLS = [
  {
    id: 'a',
    type: 'element',
    position: { x: 0, y: 0 },
    size: { width: 100, height: 40 },
    data: { label: 'A' },
  },
  {
    id: 'b',
    type: 'element',
    position: { x: 300, y: 0 },
    size: { width: 100, height: 40 },
    data: { label: 'B' },
  },
  { id: 'l', type: 'link', source: { id: 'a' }, target: { id: 'b' } },
] as CellRecord[];

const PAPER_STYLE = { width: 800, height: 600 };

/** jsdom has no `PointerEvent`; this is the part of it a drag reads. */
class TestPointerEvent extends MouseEvent {
  readonly pointerId: number;
  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init);
    this.pointerId = init.pointerId ?? 0;
  }
}

beforeAll(() => {
  Object.defineProperty(globalThis, 'PointerEvent', {
    value: TestPointerEvent,
    configurable: true,
  });
});

/** Drains the store's microtask scheduler and the React work it queues. */
const flush = () =>
  act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

let graph: dia.Graph;
function CaptureGraph() {
  ({ graph } = useGraph());
  return null;
}

const renderCounts = new Map<string, number>();
function Node({ label }: Readonly<NodeData>) {
  renderCounts.set(label, (renderCounts.get(label) ?? 0) + 1);
  return <rect data-label={label} width={100} height={40} />;
}

async function renderPaper(
  props: Partial<ReactPaperProps> = {},
  cells: readonly CellRecord[] = CELLS
) {
  renderCounts.clear();
  const view = render(
    <GraphProvider initialCells={cells}>
      <CaptureGraph />
      <ReactPaper style={PAPER_STYLE} renderElement={Node} {...props} />
    </GraphProvider>
  );
  await flush();
  const { container } = view;
  return {
    ...view,
    cell: (id: string) => container.querySelector<SVGGElement>(`[model-id="${id}"]`),
    linkPath: (id: string) =>
      container.querySelector(`[model-id="${id}"] .jj-link-line`)?.getAttribute('d'),
  };
}

function getPaintOrder(container: HTMLElement) {
  return [...container.querySelectorAll('.joint-cells-layer > [model-id]')].map((node) =>
    node.getAttribute('model-id')
  );
}

function PressKeepingNode() {
  return (
    <rect data-handle onPointerDown={(event) => event.stopPropagation()} width={10} height={10} />
  );
}

function drag(node: Element, deltaX: number, deltaY: number) {
  fireEvent.pointerDown(node, { pointerId: 1, button: 0, clientX: 10, clientY: 10 });
  fireEvent.pointerMove(node, {
    pointerId: 1,
    buttons: 1,
    clientX: 10 + deltaX,
    clientY: 10 + deltaY,
  });
  fireEvent.pointerUp(node, { pointerId: 1, clientX: 10 + deltaX, clientY: 10 + deltaY });
}

describe('ReactPaper', () => {
  describe('rendering', () => {
    it('renders every element as a React child of its own cell node', async () => {
      const { cell, container } = await renderPaper();
      expect(cell('a')?.querySelector('[data-label="A"]')).not.toBeNull();
      expect(cell('b')?.querySelector('[data-label="B"]')).not.toBeNull();
      expect(cell('a')?.getAttribute('class')).toBe('joint-cell joint-type-element joint-element');
      expect(cell('a')?.dataset.type).toBe('element');
      expect(container.querySelector('.jj-paper svg .joint-cells-layer')).not.toBeNull();
    });

    it('keeps the React tree intact: context reaches the content without a portal', async () => {
      const ThemeContext = createContext('light');
      const ThemedNode = () => <text data-theme={useContext(ThemeContext)}>{useCellId()}</text>;
      const { container } = render(
        <ThemeContext.Provider value="dark">
          <GraphProvider initialCells={CELLS}>
            <ReactPaper renderElement={ThemedNode} />
          </GraphProvider>
        </ThemeContext.Provider>
      );
      await flush();
      const text = container.querySelector<SVGTextElement>('[model-id="a"] text');
      expect(text?.dataset.theme).toBe('dark');
      expect(text?.textContent).toBe('a');
    });

    it('renders the default label box when no renderElement is given', async () => {
      const { cell } = await renderPaper({ renderElement: undefined });
      expect(cell('a')?.textContent).toBe('A');
    });

    it('places an element by its position and rotates it around its centre', async () => {
      const { cell } = await renderPaper();
      expect(cell('b')?.getAttribute('transform')).toBe('translate(300,0)');
      act(() => {
        (graph.getCell('b') as dia.Element).rotate(90);
      });
      await flush();
      expect(cell('b')?.getAttribute('transform')).toBe('translate(300,0) rotate(90,50,20)');
    });

    it('forwards the ref to the host and renders children inside it', async () => {
      const ref: RefObject<HTMLDivElement | null> = { current: null };
      const { container } = await renderPaper({
        ref,
        className: 'custom',
        children: <button type="button">overlay</button>,
      } as Partial<ReactPaperProps>);
      expect(ref.current).toBe(container.querySelector('.jj-paper.custom'));
      expect(ref.current?.querySelector('button')?.textContent).toBe('overlay');
    });

    it('applies the viewport transform and draws the grid on request', async () => {
      const { container, rerender } = await renderPaper({ transform: 'scale(2)' });
      const layers = container.querySelector<SVGGElement>('.joint-layers');
      expect(layers?.style.transform).toBe('scale(2)');
      expect(container.querySelector('pattern')?.getAttribute('width')).toBe('10');
      rerender(
        <GraphProvider initialCells={CELLS}>
          <ReactPaper renderElement={Node} drawGrid={false} />
        </GraphProvider>
      );
      expect(container.querySelector('pattern')).toBeNull();
    });
  });

  describe('updates', () => {
    it('adds and removes cells with the graph', async () => {
      const { cell } = await renderPaper();
      act(() => {
        graph.addCell({
          id: 'c',
          type: 'element',
          position: { x: 0, y: 200 },
          data: { label: 'C' },
        });
        graph.getCell('b').remove();
      });
      await flush();
      expect(cell('c')?.querySelector('[data-label="C"]')).not.toBeNull();
      expect(cell('b')).toBeNull();
      // The link lost its target element with it.
      expect(cell('l')).toBeNull();
    });

    it('moves an element without re-rendering any content', async () => {
      const { cell } = await renderPaper();
      const rendersBefore = new Map(renderCounts);
      act(() => {
        (graph.getCell('a') as dia.Element).position(50, 60);
      });
      await flush();
      expect(cell('a')?.getAttribute('transform')).toBe('translate(50,60)');
      expect(renderCounts).toEqual(rendersBefore);
    });

    it('re-renders only the element whose data changed', async () => {
      const { cell } = await renderPaper();
      const rendersOfB = renderCounts.get('B');
      act(() => {
        graph.getCell('a').set('data', { label: 'A2' });
      });
      await flush();
      expect(cell('a')?.querySelector('[data-label="A2"]')).not.toBeNull();
      expect(renderCounts.get('B')).toBe(rendersOfB);
    });

    it('paints cells in z order and re-orders them when z changes', async () => {
      const { container } = await renderPaper();
      const order = () => getPaintOrder(container);
      expect(order()).toEqual(['a', 'b', 'l']);
      act(() => {
        graph.getCell('a').toFront();
      });
      await flush();
      expect(order()).toEqual(['b', 'l', 'a']);
    });
  });

  describe('links', () => {
    it('resolves the path with joint-core routing, from the models alone', async () => {
      const { linkPath, cell } = await renderPaper();
      expect(linkPath('l')).toBe('M 100 20 L 300 20');
      expect(cell('l')?.querySelector('.jj-link-wrapper')?.getAttribute('d')).toBe(
        'M 100 20 L 300 20'
      );
    });

    it('follows its end elements', async () => {
      const { linkPath } = await renderPaper();
      act(() => {
        (graph.getCell('b') as dia.Element).position(300, 100);
      });
      await flush();
      expect(linkPath('l')).not.toBe('M 100 20 L 300 20');
      expect(linkPath('l')?.startsWith('M 100 ')).toBe(true);
    });

    it('routes through vertices and re-routes when they change', async () => {
      const { linkPath } = await renderPaper();
      act(() => {
        (graph.getCell('l') as dia.Link).vertices([{ x: 200, y: 200 }]);
      });
      await flush();
      expect(linkPath('l')).toContain('L 200 200');
    });

    it('uses the routing preset passed as linkRouting', async () => {
      const cells = [
        CELLS[0],
        { ...CELLS[1], position: { x: 300, y: 200 } },
        CELLS[2],
      ] as CellRecord[];
      const straight = await renderPaper({}, cells);
      const straightPath = straight.linkPath('l');
      straight.unmount();
      const orthogonal = await renderPaper({ linkRouting: linkRoutingOrthogonal() }, cells);
      expect(orthogonal.linkPath('l')).not.toBe(straightPath);
    });

    it('connects to a port and to a free point', async () => {
      const cells = [
        {
          ...CELLS[0],
          portMap: { out: { cx: 100, cy: 20 } },
        },
        { id: 'l', type: 'link', source: { id: 'a', port: 'out' }, target: { x: 400, y: 20 } },
      ] as CellRecord[];
      const { linkPath } = await renderPaper({}, cells);
      expect(linkPath('l')?.endsWith('L 400 20')).toBe(true);
    });

    it('draws the markers, the labels and the renderLink content', async () => {
      const cells = [
        CELLS[0],
        CELLS[1],
        {
          ...CELLS[2],
          style: { color: 'red', targetMarker: 'arrow' },
          labelMap: { name: { text: 'flows' } },
          data: { kind: 'flow' },
        },
      ] as CellRecord[];
      const { cell } = await renderPaper(
        { renderLink: (data: { kind: string }) => <circle data-kind={data.kind} r={2} /> },
        cells
      );
      const link = cell('l');
      expect(link?.querySelector<SVGPathElement>('.jj-link-line')?.style.stroke).toBe('red');
      // The target marker is mirrored to point at the target.
      expect(link?.querySelector('g[transform*="rotate(180)"] path')).not.toBeNull();
      expect(link?.querySelector('.jj-link-label')?.textContent).toBe('flows');
      expect(link?.querySelector('[data-kind="flow"]')).not.toBeNull();
    });
  });

  describe('dragging', () => {
    it('moves the element by the pointer delta, snapped to the grid', async () => {
      const { cell, linkPath } = await renderPaper();
      drag(cell('a') as Element, 43, 21);
      await flush();
      expect((graph.getCell('a') as dia.Element).position()).toEqual({ x: 40, y: 20 });
      expect(cell('a')?.getAttribute('transform')).toBe('translate(40,20)');
      expect(linkPath('l')?.startsWith('M 140 ')).toBe(true);
    });

    it('treats a press that barely moves as a click, not a drag', async () => {
      const { cell } = await renderPaper();
      drag(cell('a') as Element, 2, 2);
      await flush();
      expect((graph.getCell('a') as dia.Element).position()).toEqual({ x: 0, y: 0 });
    });

    it('does not move elements when not interactive', async () => {
      const { cell } = await renderPaper({ interactive: false });
      drag(cell('a') as Element, 50, 50);
      await flush();
      expect((graph.getCell('a') as dia.Element).position()).toEqual({ x: 0, y: 0 });
    });

    it('lets content keep a press with stopPropagation, as plain React events do', async () => {
      const { container } = await renderPaper({
        renderElement: PressKeepingNode,
      });
      const handle = container.querySelector('[model-id="a"] [data-handle]') as Element;
      fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientX: 10, clientY: 10 });
      fireEvent.pointerMove(container.querySelector('[model-id="a"]') as Element, {
        pointerId: 1,
        buttons: 1,
        clientX: 60,
        clientY: 60,
      });
      await flush();
      expect((graph.getCell('a') as dia.Element).position()).toEqual({ x: 0, y: 0 });
    });

    it('swallows the click that ends a drag, but not a plain click', async () => {
      const onClick = jest.fn();
      const { cell } = await renderPaper({
        renderElement: () => <rect data-button onClick={onClick} width={10} height={10} />,
      });
      const button = cell('a')?.querySelector('[data-button]') as Element;
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
      drag(button, 50, 0);
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
      await flush();
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });
});
