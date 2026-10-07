import type { dia } from '@joint/core';
import {
  forwardRef,
  useId,
  useLayoutEffect,
  useMemo,
  useReducer,
  type CSSProperties,
  type ForwardedRef,
  type ReactNode,
} from 'react';
import { useCellIds } from '../../hooks/use-cell-ids';
import { useGraphStore } from '../../hooks/use-graph-store';
import { linkRoutingStraight, type LinkRouting } from '../../presets/link-routing';
import { defaultRenderElement } from '../paper/default-render-element';
import type { PaperTransform, RenderElement, RenderLink } from '../paper/paper.types';
import { createLinkGeometryContext } from './link-geometry';
import { ReactPaperElement } from './react-paper-element';
import { ReactPaperLink } from './react-paper-link';

const DEFAULT_GRID_SIZE = 10;
const MIN_GRID_SIZE = 1;
/** Radius of a grid dot; the pattern is shifted by it so the dots sit on the snap points. */
const GRID_DOT_RADIUS = 1;

/**
 * Half the side of the square the grid is painted on, in paper units.
 * ponytail: a finite rect inside the transformed layer follows pan and zoom
 * with no JavaScript; a viewport panned further than this shows no grid.
 */
const GRID_EXTENT = 100_000;

const DEFAULT_ROUTING = linkRoutingStraight();

const SVG_STYLE: CSSProperties = { display: 'block', width: '100%', height: '100%' };
const GRID_DOT_STYLE: CSSProperties = { fill: 'var(--jj-paper-grid-color)' };

/**
 * Props for {@link ReactPaper}.
 * @expand
 * @group Types
 */
export interface ReactPaperProps {
  /** CSS class added to the paper's host element. */
  readonly className?: string;
  /** Inline style of the paper's host element. Size the paper here. */
  readonly style?: CSSProperties;
  /** Content rendered over the diagram, inside the paper's host element. */
  readonly children?: ReactNode;
  /**
   * Renders each element's content from its `data`. Re-runs only when that
   * `data` changes: moving, resizing or rotating an element never re-renders it.
   * @default a box showing `data.label`
   */
  // The data type belongs to the caller's cells, as on `<Paper>`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly renderElement?: RenderElement<any>;
  /** Renders extra content inside each link's group, from the link's `data`. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly renderLink?: RenderLink<any>;
  /** Viewport transform: a CSS transform string or a `DOMMatrix`. */
  readonly transform?: PaperTransform;
  /**
   * Size of the grid elements snap to while dragged, in paper units.
   * @default 10
   */
  readonly gridSize?: number;
  /**
   * Whether to draw the grid.
   * @default true
   */
  readonly drawGrid?: boolean;
  /**
   * Whether elements can be moved with the pointer.
   * @default true
   */
  readonly interactive?: boolean;
  /**
   * Default router, connector, anchor and connection point of the links, as
   * returned by the `linkRouting*` presets.
   * @default linkRoutingStraight()
   */
  readonly linkRouting?: LinkRouting;
}

/**
 * Cells in paint order: by `z`, cells of an equal `z` in graph order.
 * @param graph - The graph the cells live in.
 * @param ids - Ids of the cells to render.
 * @returns The cell models, bottom-most first.
 */
function sortCellsByZ(graph: dia.Graph, ids: readonly dia.Cell.ID[]): dia.Cell[] {
  const cells: dia.Cell[] = [];
  for (const id of ids) {
    const cell = graph.getCell(id);
    if (cell) cells.push(cell);
  }
  // The sort is stable, so an equal `z` keeps the graph order.
  return cells.toSorted((a, b) => (a.get('z') ?? 0) - (b.get('z') ?? 0));
}

/**
 * Internal implementation behind the forwarded {@link ReactPaper}.
 * @param props - Paper props.
 * @param ref - Ref receiving the paper's host element.
 * @returns The paper host with the rendered diagram.
 */
function ReactPaperBase(props: Readonly<ReactPaperProps>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    className,
    style,
    children,
    renderElement = defaultRenderElement,
    renderLink,
    transform,
    gridSize: requestedGridSize = DEFAULT_GRID_SIZE,
    drawGrid = true,
    interactive = true,
    linkRouting,
  } = props;
  const { graph } = useGraphStore();
  // A grid of 0 means no snapping, which a 1-unit grid is.
  const gridSize = Math.max(MIN_GRID_SIZE, requestedGridSize);
  const ids = useCellIds();
  const gridId = useId();
  // Bumped when a cell's `z` changes, the only time the paint order does.
  const [zVersion, bumpZVersion] = useReducer((version: number) => version + 1, 0);

  useLayoutEffect(() => {
    graph.on('change:z', bumpZVersion);
    return () => {
      graph.off('change:z', bumpZVersion);
    };
  }, [graph]);

  // Resolved member by member: an `undefined` member keeps its default, and a
  // `linkRouting` object created inline does not re-route every link.
  const defaultRouter = linkRouting?.defaultRouter ?? DEFAULT_ROUTING.defaultRouter;
  const defaultConnector = linkRouting?.defaultConnector ?? DEFAULT_ROUTING.defaultConnector;
  const defaultAnchor = linkRouting?.defaultAnchor ?? DEFAULT_ROUTING.defaultAnchor;
  const defaultConnectionPoint =
    linkRouting?.defaultConnectionPoint ?? DEFAULT_ROUTING.defaultConnectionPoint;
  const geometry = useMemo(
    () =>
      createLinkGeometryContext(
        graph,
        { defaultRouter, defaultConnector, defaultAnchor, defaultConnectionPoint },
        gridSize
      ),
    [defaultAnchor, defaultConnectionPoint, defaultConnector, defaultRouter, graph, gridSize]
  );

  const cells = useMemo(
    () =>
      sortCellsByZ(graph, ids).map((cell) => {
        const { id } = cell;
        const type: string = cell.get('type');
        return cell.isLink() ? (
          <ReactPaperLink
            key={id}
            id={id}
            type={type}
            renderLink={renderLink}
            geometry={geometry}
          />
        ) : (
          <ReactPaperElement
            key={id}
            id={id}
            type={type}
            renderElement={renderElement}
            gridSize={gridSize}
            isInteractive={interactive}
          />
        );
      }),
    // `zVersion` is the signal to re-sort; the sort reads `z` from the models.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [geometry, graph, gridSize, ids, interactive, renderElement, renderLink, zVersion]
  );

  const layersStyle = useMemo<CSSProperties | undefined>(
    () =>
      transform === undefined
        ? undefined
        : { transform: String(transform), transformOrigin: '0 0' },
    [transform]
  );

  return (
    <div ref={ref} className={className ? `jj-paper ${className}` : 'jj-paper'} style={style}>
      <svg style={SVG_STYLE}>
        {drawGrid && (
          <defs>
            <pattern
              id={gridId}
              x={-GRID_DOT_RADIUS}
              y={-GRID_DOT_RADIUS}
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={GRID_DOT_RADIUS}
                cy={GRID_DOT_RADIUS}
                r={GRID_DOT_RADIUS}
                style={GRID_DOT_STYLE}
              />
            </pattern>
          </defs>
        )}
        <g className="joint-layers" style={layersStyle}>
          {drawGrid && (
            <rect
              x={-GRID_EXTENT}
              y={-GRID_EXTENT}
              width={2 * GRID_EXTENT}
              height={2 * GRID_EXTENT}
              fill={`url(#${gridId})`}
              pointerEvents="none"
            />
          )}
          <g className="joint-cells-layer">{cells}</g>
        </g>
      </svg>
      {children}
    </div>
  );
}

/**
 * A diagram canvas rendered by React alone: every element and link is a plain
 * React-rendered SVG node, with no portals and no JointJS view layer. It reads
 * the same graph as `<Paper>` (mount it inside a `<GraphProvider>`) and resolves
 * link paths with JointJS core's routers, connectors, anchors and connection
 * points.
 *
 * React events work on your content as anywhere else in React: put `onClick` on
 * what you render, and stop an element drag with `event.stopPropagation()` in
 * an `onPointerDown`.
 * @experimental A proof of concept. It renders and moves elements and draws
 * links (routing, markers, labels); link creation, ports rendering,
 * highlighters, tools and viewport culling are not implemented yet.
 * @example
 * ```tsx
 * import { GraphProvider, ReactPaper, type CellRecord } from '@joint/react';
 *
 * const initialCells: readonly CellRecord[] = [
 *   { id: 'a', type: 'element', position: { x: 40, y: 40 }, size: { width: 120, height: 40 }, data: { label: 'Hello' } },
 *   { id: 'b', type: 'element', position: { x: 280, y: 180 }, size: { width: 120, height: 40 }, data: { label: 'World' } },
 *   { id: 'a-b', type: 'link', source: { id: 'a' }, target: { id: 'b' } },
 * ];
 *
 * function Diagram() {
 *   return (
 *     <GraphProvider initialCells={initialCells}>
 *       <ReactPaper style={{ width: '100%', height: 600 }} />
 *     </GraphProvider>
 *   );
 * }
 * ```
 * @group Components
 */
export const ReactPaper = forwardRef(ReactPaperBase);
