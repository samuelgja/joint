import type { dia } from '@joint/core';
import { snapToGrid } from '@joint/core/g';
import {
  useCallback,
  useLayoutEffect,
  useRef,
  type ComponentType,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { CellIdContext } from '../../context';
import { useCells } from '../../hooks/use-cells';
import { useGraphStore } from '../../hooks/use-graph-store';
import type { CellId } from '../../types/cell.types';
import { swallowNextClick } from '../../utils/swallow-click';
import typedMemo from '../../utils/typed-react';

/** Pointer travel, in screen px, after which a press becomes a drag instead of a click. */
const DRAG_THRESHOLD = 5;

/** Form controls keep their native press behaviour (caret, dropdown) instead of dragging the element. */
const NATIVE_PRESS_TAG_NAMES = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

/** `PointerEvent.buttons` bit of the primary button. */
const PRIMARY_BUTTON = 1;

/**
 * Lets a touch drag move the element instead of scrolling the page, and keeps
 * a drag from selecting the text it passes over.
 */
const ELEMENT_STYLE: CSSProperties = {
  touchAction: 'none',
  userSelect: 'none',
  WebkitUserSelect: 'none',
};

/** The linear part of the screen transform the element is rendered under. */
interface ScreenScale {
  readonly a: number;
  readonly b: number;
  readonly c: number;
  readonly d: number;
}

const IDENTITY_SCALE: ScreenScale = { a: 1, b: 0, c: 0, d: 1 };

interface DragState {
  readonly pointerId: number;
  readonly clientX: number;
  readonly clientY: number;
  readonly position: dia.Point;
  readonly scale: ScreenScale;
  readonly isDragging: boolean;
}

/**
 * The SVG `transform` placing an element: its position, then its rotation
 * around its own centre.
 * @param element - The element model.
 * @returns The `transform` attribute value.
 */
function getElementTransform(element: dia.Element): string {
  const { x, y } = element.position();
  const angle = element.angle();
  if (angle === 0) return `translate(${x},${y})`;
  const { width, height } = element.size();
  return `translate(${x},${y}) rotate(${angle},${width / 2},${height / 2})`;
}

/**
 * Reads the linear part of the transform between the paper and the screen,
 * once per drag.
 * @param node - The element node; its cells layer is in paper coordinates.
 * @returns The scale, or the identity when it cannot be inverted.
 */
function getScreenScale(node: SVGGElement): ScreenScale {
  const matrix = node.closest<SVGGElement>('.joint-cells-layer')?.getScreenCTM?.();
  // A hidden or detached paper reports a singular matrix.
  if (!matrix || matrix.a * matrix.d - matrix.b * matrix.c === 0) return IDENTITY_SCALE;
  return matrix;
}

/** Props for {@link ReactPaperElement}. */
export interface ReactPaperElementProps {
  /** Id of the element to render. */
  readonly id: CellId;
  /** The element's `type`, mirrored on the node as `data-type`. */
  readonly type: string;
  /** Element renderer, invoked as a component with the element's `data` as props. */
  readonly renderElement: ComponentType<Record<string, unknown>>;
  /** Grid the element snaps to while dragged. */
  readonly gridSize: number;
  /** Whether the element can be moved with the pointer. */
  readonly isInteractive: boolean;
}

/**
 * One element of a `ReactPaper`: a `<g>` that follows the element's position
 * and angle without re-rendering, and renders the user content from `data`.
 * @param props - Element id and rendering options.
 * @returns The element node.
 * @internal
 */
function ReactPaperElementComponent(props: Readonly<ReactPaperElementProps>) {
  const { id, type, renderElement: RenderElement, gridSize, isInteractive } = props;
  const graphStore = useGraphStore();
  const { graph, measurement } = graphStore;
  const { cells } = graphStore.graphProjection;
  const nodeRef = useRef<SVGGElement>(null);
  const dragRef = useRef<DragState | null>(null);
  // Only `data` re-renders the content; geometry is applied to the node below.
  const data = useCells(id, (cell) => cell?.data);

  const element = graph.getCell(id);
  const transform = element?.isElement() ? getElementTransform(element) : undefined;

  useLayoutEffect(() => {
    const applyTransform = () => {
      const node = nodeRef.current;
      const cell = graph.getCell(id);
      if (!node || !cell?.isElement()) return;
      const nextTransform = getElementTransform(cell);
      if (node.getAttribute('transform') !== nextTransform) {
        node.setAttribute('transform', nextTransform);
      }
    };
    // The element may have moved between the render and this subscription.
    applyTransform();
    return cells.subscribeById(id, applyTransform);
  }, [cells, graph, id]);

  useLayoutEffect(() => {
    // After the content's own layout effects, so a `useMeasureElement` inside
    // it has registered already; an element without one settles right here.
    measurement.markRendered(id);
  }, [id, measurement]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<SVGGElement>) => {
      const cell = graph.getCell(id);
      const { target, currentTarget } = event;
      if (event.button !== 0 || !cell?.isElement()) return;
      if (target instanceof Element && NATIVE_PRESS_TAG_NAMES.has(target.tagName)) return;
      dragRef.current = {
        pointerId: event.pointerId,
        clientX: event.clientX,
        clientY: event.clientY,
        position: cell.position(),
        scale: getScreenScale(currentTarget),
        isDragging: false,
      };
    },
    [graph, id]
  );

  /**
   * Confirms a pending press as a drag and takes the pointer, so the moves keep
   * arriving wherever it goes. Not on press: capturing there would retarget the
   * click of a control inside the element.
   */
  const startDragging = useCallback((drag: DragState, node: SVGGElement) => {
    dragRef.current = { ...drag, isDragging: true };
    node.setPointerCapture?.(drag.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<SVGGElement>) => {
      const drag = dragRef.current;
      const cell = graph.getCell(id);
      if (drag === null || !cell?.isElement()) return;
      if (drag.pointerId !== event.pointerId) return;
      if ((event.buttons & PRIMARY_BUTTON) === 0) {
        // The release happened elsewhere (off the element, before it held the
        // pointer), so no `pointerup` got here: this is a hover, not a drag.
        dragRef.current = null;
        return;
      }
      const deltaX = event.clientX - drag.clientX;
      const deltaY = event.clientY - drag.clientY;
      if (!drag.isDragging) {
        if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) return;
        startDragging(drag, event.currentTarget);
      }
      // Screen delta → paper delta: the inverse of the screen transform's linear part.
      const { a, b, c, d } = drag.scale;
      const determinant = a * d - b * c;
      const x = drag.position.x + (d * deltaX - c * deltaY) / determinant;
      const y = drag.position.y + (a * deltaY - b * deltaX) / determinant;
      // `deep` moves the embedded cells along, inside one `translate` batch.
      cell.position(snapToGrid(x, gridSize), snapToGrid(y, gridSize), { deep: true });
    },
    [graph, gridSize, id, startDragging]
  );

  const onPointerLeave = useCallback(
    (event: ReactPointerEvent<SVGGElement>) => {
      const drag = dragRef.current;
      if (drag === null || drag.isDragging || drag.pointerId !== event.pointerId) return;
      // A quick flick leaves a small element before travelling the threshold;
      // leaving it with the button down is a drag all the same.
      if ((event.buttons & PRIMARY_BUTTON) === 0) dragRef.current = null;
      else startDragging(drag, event.currentTarget);
    },
    [startDragging]
  );

  const onPointerUp = useCallback((event: ReactPointerEvent<SVGGElement>) => {
    const drag = dragRef.current;
    if (drag === null) return;
    if (drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (!drag.isDragging) return;
    // The press and release share a target, so the browser would still click.
    swallowNextClick();
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  return (
    <g
      ref={nodeRef}
      className={`joint-cell joint-type-${type.replaceAll('.', '-')} joint-element`}
      model-id={id}
      data-type={type}
      transform={transform}
      style={isInteractive ? ELEMENT_STYLE : undefined}
      onPointerDown={isInteractive ? onPointerDown : undefined}
      onPointerMove={isInteractive ? onPointerMove : undefined}
      onPointerLeave={isInteractive ? onPointerLeave : undefined}
      onPointerUp={isInteractive ? onPointerUp : undefined}
      onPointerCancel={isInteractive ? onPointerUp : undefined}
    >
      <CellIdContext.Provider value={id}>
        <RenderElement {...(data ?? {})} />
      </CellIdContext.Provider>
    </g>
  );
}

/**
 * Memoised {@link ReactPaperElementComponent}: a paper re-render (a cell added
 * or removed) leaves every other element untouched.
 * @internal
 */
export const ReactPaperElement = typedMemo(ReactPaperElementComponent);
