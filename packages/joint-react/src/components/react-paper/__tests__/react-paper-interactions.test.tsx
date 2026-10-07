import { act, fireEvent, render } from '@testing-library/react';
import type { dia } from '@joint/core';
import { GraphProvider } from '../../graph/graph-provider';
import { ReactPaper, type ReactPaperProps } from '../react-paper';
import { useGraph } from '../../../hooks/use-graph';
import type { CellRecord } from '../../../types/cell.types';

const PAPER_STYLE = { width: 800, height: 600 };

const CELLS: readonly CellRecord[] = [
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
  {
    id: 'c',
    type: 'element',
    position: { x: 0, y: 300 },
    size: { width: 100, height: 40 },
    data: { label: 'C' },
  },
  { id: 'ab', type: 'link', source: { id: 'a' }, target: { id: 'b' }, data: { name: 'ab' } },
  { id: 'bc', type: 'link', source: { id: 'b' }, target: { id: 'c' }, data: { name: 'bc' } },
];

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

const flush = () =>
  act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

let graph: dia.Graph;
function CaptureGraph() {
  ({ graph } = useGraph());
  return null;
}

function getElement(id: dia.Cell.ID): dia.Element {
  const cell = graph.getCell(id);
  if (!cell.isElement()) throw new Error(`Expected "${String(id)}" to be an element.`);
  return cell;
}

function Node() {
  return (
    <>
      <rect data-body width={100} height={40} />
      <foreignObject>
        <input data-input />
      </foreignObject>
    </>
  );
}

const linkRenders = new Map<string, number>();
function LinkContent({ name }: Readonly<{ name: string }>) {
  linkRenders.set(name, (linkRenders.get(name) ?? 0) + 1);
  return <title>{name}</title>;
}

async function renderPaper(props: Partial<ReactPaperProps> = {}, cells = CELLS) {
  linkRenders.clear();
  const view = render(
    <GraphProvider initialCells={cells}>
      <CaptureGraph />
      <ReactPaper style={PAPER_STYLE} renderElement={Node} renderLink={LinkContent} {...props} />
    </GraphProvider>
  );
  await flush();
  const cell = (id: dia.Cell.ID) => {
    const node = view.container.querySelector<SVGGElement>(`[model-id="${String(id)}"]`);
    if (!node) throw new Error(`No node for "${String(id)}".`);
    return node;
  };
  return { ...view, cell };
}

function withLink(link: Record<string, unknown>): readonly CellRecord[] {
  return [
    CELLS[0],
    CELLS[1],
    {
      id: 'ab',
      type: 'link',
      source: { id: 'a' },
      target: { id: 'b' },
      data: { name: 'ab' },
      ...link,
    },
  ];
}

const INLINE_ROUTER = { name: 'normal' } as const;
const createInlineRouting = () => ({ defaultRouter: INLINE_ROUTER });

function getLabelTransforms(link: Element) {
  return [...link.querySelectorAll('.jj-link-label')].map((label) =>
    label.getAttribute('transform')
  );
}

const press = (node: Element, pointerId = 1, button = 0) =>
  fireEvent.pointerDown(node, { pointerId, button, clientX: 100, clientY: 100 });
const moveTo = (node: Element, clientX: number, clientY: number, pointerId = 1, buttons = 1) =>
  fireEvent.pointerMove(node, { pointerId, buttons, clientX, clientY });
const release = (node: Element, pointerId = 1) =>
  fireEvent.pointerUp(node, { pointerId, clientX: 0, clientY: 0 });

describe('ReactPaper interactions', () => {
  describe('dragging', () => {
    it('follows the pointer across several moves from the press position', async () => {
      const { cell } = await renderPaper();
      const node = cell('a');
      press(node);
      moveTo(node, 130, 100);
      expect(getElement('a').position()).toEqual({ x: 30, y: 0 });
      moveTo(node, 160, 150);
      expect(getElement('a').position()).toEqual({ x: 60, y: 50 });
      // Back near the start: the delta is absolute, so the element returns.
      moveTo(node, 100, 110);
      expect(getElement('a').position()).toEqual({ x: 0, y: 10 });
      release(node);
    });

    it('snaps to the paper grid size', async () => {
      const { cell } = await renderPaper({ gridSize: 25 });
      const node = cell('a');
      press(node);
      moveTo(node, 138, 161);
      expect(getElement('a').position()).toEqual({ x: 50, y: 50 });
      release(node);
    });

    it('converts the screen delta through the viewport scale', async () => {
      const { cell } = await renderPaper();
      const node = cell('a');
      const layer = node.closest<SVGGElement>('.joint-cells-layer');
      if (!layer) throw new Error('No cells layer.');
      // The paper is zoomed in twice: 80 screen px are 40 paper units.
      const matrix = layer.getScreenCTM();
      if (!matrix) throw new Error('No screen matrix.');
      const zoomed = Object.assign(Object.create(matrix), { a: 2, b: 0, c: 0, d: 2 });
      jest.spyOn(layer, 'getScreenCTM').mockReturnValue(zoomed);
      press(node);
      moveTo(node, 180, 140);
      expect(getElement('a').position()).toEqual({ x: 40, y: 20 });
      release(node);
    });

    it('moves embedded cells along with their parent', async () => {
      const { cell } = await renderPaper();
      act(() => {
        getElement('a').embed(getElement('c'));
      });
      const node = cell('a');
      press(node);
      moveTo(node, 150, 120);
      release(node);
      await flush();
      expect(getElement('a').position()).toEqual({ x: 50, y: 20 });
      expect(getElement('c').position()).toEqual({ x: 50, y: 320 });
      expect(cell('c').getAttribute('transform')).toBe('translate(50,320)');
    });

    it('stops following once the pointer is released or cancelled', async () => {
      const { cell } = await renderPaper();
      const node = cell('a');
      press(node);
      moveTo(node, 150, 100);
      release(node);
      moveTo(node, 300, 300);
      expect(getElement('a').position()).toEqual({ x: 50, y: 0 });

      press(node);
      moveTo(node, 120, 100);
      fireEvent.pointerCancel(node, { pointerId: 1 });
      moveTo(node, 300, 300);
      expect(getElement('a').position()).toEqual({ x: 70, y: 0 });
    });

    it('forgets a press whose release it never saw, instead of following a hover', async () => {
      const { cell } = await renderPaper();
      const node = cell('a');
      // Pressed, moved less than the threshold, then released off the element:
      // no `pointerup` reaches it.
      press(node);
      moveTo(node, 102, 100);
      // The pointer comes back with no button down.
      moveTo(node, 160, 130, 1, 0);
      moveTo(node, 200, 200, 1, 1);
      expect(getElement('a').position()).toEqual({ x: 0, y: 0 });
    });

    it('starts the drag when the pointer leaves the element before the threshold', async () => {
      const { cell } = await renderPaper();
      const node = cell('a');
      const capture = jest.fn();
      node.setPointerCapture = capture;
      press(node);
      fireEvent.pointerLeave(node, { pointerId: 1, buttons: 1, clientX: 103, clientY: 100 });
      expect(capture).toHaveBeenCalledWith(1);
      moveTo(node, 150, 100);
      expect(getElement('a').position()).toEqual({ x: 50, y: 0 });
      release(node);
    });

    it('drops a pending press when the pointer leaves with no button down', async () => {
      const { cell } = await renderPaper();
      const node = cell('a');
      press(node);
      fireEvent.pointerLeave(node, { pointerId: 1, buttons: 0 });
      moveTo(node, 200, 200);
      expect(getElement('a').position()).toEqual({ x: 0, y: 0 });
    });

    it('does not resume a drag that was interrupted by turning interaction off', async () => {
      const { cell, rerender } = await renderPaper();
      const node = cell('a');
      press(node);
      moveTo(node, 130, 100);
      const paper = (interactive: boolean) => (
        <GraphProvider initialCells={CELLS}>
          <CaptureGraph />
          <ReactPaper
            style={PAPER_STYLE}
            renderElement={Node}
            renderLink={LinkContent}
            interactive={interactive}
          />
        </GraphProvider>
      );
      rerender(paper(false));
      release(node);
      rerender(paper(true));
      // The release was not seen; the next hover must not move the element.
      moveTo(node, 300, 300, 1, 0);
      expect(getElement('a').position()).toEqual({ x: 30, y: 0 });
    });

    it('moves freely when the grid size is 0', async () => {
      const { cell } = await renderPaper({ gridSize: 0 });
      const node = cell('a');
      press(node);
      moveTo(node, 137, 161);
      expect(getElement('a').position()).toEqual({ x: 37, y: 61 });
      release(node);
    });

    it('ignores other pointers during a drag', async () => {
      const { cell } = await renderPaper();
      const node = cell('a');
      press(node, 1);
      moveTo(node, 400, 400, 2);
      release(node, 2);
      expect(getElement('a').position()).toEqual({ x: 0, y: 0 });
      moveTo(node, 140, 100, 1);
      expect(getElement('a').position()).toEqual({ x: 40, y: 0 });
      release(node, 1);
    });

    it('starts only from the primary button', async () => {
      const { cell } = await renderPaper();
      const node = cell('a');
      press(node, 1, 2);
      moveTo(node, 200, 200);
      expect(getElement('a').position()).toEqual({ x: 0, y: 0 });
    });

    it('leaves a press on a form control to the control', async () => {
      const { cell } = await renderPaper();
      const input = cell('a').querySelector('[data-input]');
      if (!input) throw new Error('No input.');
      press(input);
      moveTo(cell('a'), 200, 200);
      expect(getElement('a').position()).toEqual({ x: 0, y: 0 });
    });

    it('drags an element with a numeric id', async () => {
      const cells: readonly CellRecord[] = [
        {
          id: 7,
          type: 'element',
          position: { x: 0, y: 0 },
          size: { width: 10, height: 10 },
          data: {},
        },
      ];
      const { cell } = await renderPaper({}, cells);
      press(cell(7));
      moveTo(cell(7), 120, 130);
      release(cell(7));
      expect(getElement(7).position()).toEqual({ x: 20, y: 30 });
    });
  });

  describe('link updates', () => {
    it('re-resolves only the links attached to a moved element', async () => {
      const { cell } = await renderPaper();
      const pathOf = (id: string) => cell(id).querySelector('.jj-link-line')?.getAttribute('d');
      const before = { ab: pathOf('ab'), bc: pathOf('bc') };
      const rendersBefore = new Map(linkRenders);
      act(() => {
        getElement('a').position(0, 100);
      });
      await flush();
      expect(pathOf('ab')).not.toBe(before.ab);
      expect(pathOf('bc')).toBe(before.bc);
      // The link's own content reads `data` only: a new path does not re-run it for `bc`.
      expect(linkRenders.get('bc')).toBe(rendersBefore.get('bc'));
    });

    it('re-attaches to a new end element', async () => {
      const { cell } = await renderPaper();
      const pathOf = () => cell('ab').querySelector('.jj-link-line')?.getAttribute('d');
      act(() => {
        const link = graph.getCell('ab');
        if (link.isLink()) link.target({ id: 'c' });
      });
      await flush();
      const attached = pathOf();
      // The link now follows `c`, and no longer `b`.
      act(() => {
        getElement('b').position(500, 500);
      });
      await flush();
      expect(pathOf()).toBe(attached);
      act(() => {
        getElement('c').position(200, 300);
      });
      await flush();
      expect(pathOf()).not.toBe(attached);
    });

    it('follows an element that is resized', async () => {
      const { cell } = await renderPaper();
      const pathOf = () => cell('ab').querySelector('.jj-link-line')?.getAttribute('d');
      expect(pathOf()).toBe('M 100 20 L 300 20');
      act(() => {
        getElement('a').resize(200, 40);
      });
      await flush();
      expect(pathOf()).toBe('M 200 20 L 300 20');
    });

    it('positions labels along the path and re-positions them when it changes', async () => {
      const cells: readonly CellRecord[] = [
        CELLS[0],
        CELLS[1],
        {
          id: 'ab',
          type: 'link',
          source: { id: 'a' },
          target: { id: 'b' },
          labels: [
            { attrs: { text: { text: 'middle' } } },
            { attrs: { text: { text: 'near source' } }, position: { distance: 20, offset: 10 } },
            {
              attrs: { text: { text: 'shifted' } },
              position: { distance: 0.5, offset: { x: 5, y: -7 } },
            },
          ],
          data: { name: 'ab' },
        },
      ];
      const { cell } = await renderPaper({}, cells);
      const transforms = () => getLabelTransforms(cell('ab'));
      expect(transforms()).toEqual([
        'translate(200,20) rotate(0)',
        'translate(120,30) rotate(0)',
        'translate(205,13) rotate(0)',
      ]);
      act(() => {
        getElement('b').position(500, 0);
      });
      await flush();
      expect(transforms()[0]).toBe('translate(300,20) rotate(0)');
    });

    it('draws a simple marker definition as its shape', async () => {
      const cells: readonly CellRecord[] = [
        CELLS[0],
        CELLS[1],
        {
          id: 'ab',
          type: 'link',
          source: { id: 'a' },
          target: { id: 'b' },
          attrs: {
            line: { connection: true, sourceMarker: { type: 'circle', r: 4, fill: 'red' } },
          },
          data: { name: 'ab' },
        },
      ];
      const { cell } = await renderPaper({}, cells);
      const marker = cell('ab').querySelector('circle');
      expect(marker?.getAttribute('r')).toBe('4');
      expect(marker?.getAttribute('fill')).toBe('red');
      expect(marker?.parentElement?.getAttribute('transform')).toBe('translate(100,20) rotate(0)');
    });
  });

  describe('routing edge cases', () => {
    it('gives a raw marker the stroke of its line', async () => {
      const { cell } = await renderPaper(
        {},
        withLink({
          attrs: {
            line: {
              connection: true,
              stroke: 'red',
              targetMarker: { type: 'path', d: 'M 0 0 L 6 3' },
            },
          },
        })
      );
      const marker = cell('ab').querySelector('path[d="M 0 0 L 6 3"]')?.parentElement;
      expect(marker?.getAttribute('stroke')).toBe('red');
      expect(marker?.getAttribute('fill')).toBe('red');
    });

    it('accepts path data of any flavour from a custom connector', async () => {
      const { cell } = await renderPaper({
        linkRouting: { defaultConnector: () => 'M 0 0 Q 10 10 20 0 l 5 5' },
      });
      const d = cell('ab').querySelector('.jj-link-line')?.getAttribute('d');
      expect(d?.startsWith('M 0 0 C ')).toBe(true);
    });

    it('keeps the default for a routing member passed as undefined', async () => {
      const { cell } = await renderPaper({ linkRouting: { defaultRouter: undefined } });
      expect(cell('ab').querySelector('.jj-link-line')?.getAttribute('d')).toBe(
        'M 100 20 L 300 20'
      );
    });

    it('explains that the jumpover connector needs the view layer', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      await expect(renderPaper({}, withLink({ connector: { name: 'jumpover' } }))).rejects.toThrow(
        'the "jumpover" connector needs the JointJS view layer'
      );
      consoleError.mockRestore();
    });

    it('does not re-route the links for a linkRouting object created inline', async () => {
      const { cell, rerender } = await renderPaper({
        linkRouting: { defaultRouter: { name: 'normal' } },
      });
      const paper = () => (
        <GraphProvider initialCells={CELLS}>
          <CaptureGraph />
          <ReactPaper
            style={PAPER_STYLE}
            renderElement={Node}
            renderLink={LinkContent}
            linkRouting={createInlineRouting()}
          />
        </GraphProvider>
      );
      rerender(paper());
      await flush();
      const rendersBefore = new Map(linkRenders);
      const nodeBefore = cell('ab');
      rerender(paper());
      await flush();
      expect(linkRenders).toEqual(rendersBefore);
      expect(cell('ab')).toBe(nodeBefore);
    });
  });

  describe('lifecycle', () => {
    it('renders a graph reset and keeps working afterwards', async () => {
      const { cell, container } = await renderPaper();
      act(() => {
        graph.resetCells([
          { id: 'x', type: 'element', position: { x: 10, y: 10 }, size: { width: 20, height: 20 } },
        ]);
      });
      await flush();
      expect(container.querySelectorAll('.joint-cells-layer > [model-id]')).toHaveLength(1);
      act(() => {
        getElement('x').position(40, 50);
      });
      await flush();
      expect(cell('x').getAttribute('transform')).toBe('translate(40,50)');
    });

    it('removes its graph listener on unmount', async () => {
      const { unmount } = await renderPaper();
      const off = jest.spyOn(graph, 'off');
      unmount();
      expect(off).toHaveBeenCalledWith('change:z', expect.any(Function));
      off.mockRestore();
    });

    it('mirrors the cell type on the node, dots replaced for the class name', async () => {
      const cells: readonly CellRecord[] = [
        {
          id: 'r',
          type: 'standard.Rectangle',
          position: { x: 0, y: 0 },
          size: { width: 10, height: 10 },
        },
      ] as unknown as CellRecord[];
      const { cell } = await renderPaper({}, cells);
      expect(cell('r').getAttribute('class')).toBe(
        'joint-cell joint-type-standard-Rectangle joint-element'
      );
      expect(cell('r').dataset.type).toBe('standard.Rectangle');
    });
  });
});
