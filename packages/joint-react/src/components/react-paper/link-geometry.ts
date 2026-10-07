// Routing definitions name their function (`{ name: 'rightAngle' }`), so each
// of these namespaces is needed whole, as the lookup table it is.
import * as anchors from '@joint/core/anchors';
import * as connectionPoints from '@joint/core/connectionPoints';
import * as connectors from '@joint/core/connectors';
import * as routers from '@joint/core/routers';
import { Line, Path, Point, Rect } from '@joint/core/g';
import { V } from '@joint/core';
import type { dia } from '@joint/core';
import type { LinkRouting } from '../../presets/link-routing';
import { warnLinkToLinkEnd } from '../../utils/dev-warnings';

/** Decimal places link anchors and connection points are rounded to, as in `dia.LinkView`. */
const DECIMALS_ROUNDING = 2;

/**
 * What joint-core's anchors and connection points read from a magnet node.
 * A link end has no DOM node here: the element itself and its ports are
 * resolved from the model, so a magnet only has to answer which port it is.
 */
interface Magnet {
  readonly getAttribute: (name: string) => string | null;
}

/** The magnet standing for the element itself, `elementView.el` in joint-core. */
const ROOT_MAGNET: Magnet = { getAttribute: () => null };

/**
 * The part of `dia.ElementView` that joint-core's anchors, connection points
 * and routers use, answered from the element model instead of the DOM.
 */
class EndView {
  readonly el = ROOT_MAGNET;

  constructor(readonly model: dia.Element) {}

  isNodeConnection(): boolean {
    return false;
  }

  findAttribute(name: string, magnet: Magnet): string | null {
    return magnet.getAttribute(name);
  }

  getNodeBBox(magnet: Magnet): Rect {
    return this.getMagnetBBox(magnet, true);
  }

  getNodeUnrotatedBBox(magnet: Magnet): Rect {
    return this.getMagnetBBox(magnet, false);
  }

  private getMagnetBBox(magnet: Magnet, rotate: boolean): Rect {
    const { model } = this;
    const portId = magnet.getAttribute('port');
    if (portId === null || !model.hasPort(portId)) return model.getBBox({ rotate });
    if (rotate) return model.getPortBBox(portId, { rotate });
    return new Rect(model.getPortRelativeRect(portId)).offset(model.position());
  }
}

/**
 * Everything a link needs to resolve its path that does not belong to the link
 * itself: the graph, the default routing and the per-element views.
 * Create one per paper with {@link createLinkGeometryContext} and reuse it.
 */
export interface LinkGeometryContext {
  /** The part of `dia.Paper` that joint-core's routers and connectors use. */
  readonly paper: {
    readonly model: dia.Graph;
    readonly options: LinkRouting & {
      readonly gridSize: number;
      readonly anchorNamespace: typeof anchors;
      readonly connectionPointNamespace: typeof connectionPoints;
    };
    readonly findViewByModel: (id: dia.Cell.ID | undefined) => EndView | null;
  };
}

/**
 * Creates the routing context shared by every link of one paper.
 * @param graph - The graph the links live in.
 * @param routing - Default router, connector, anchor and connection point.
 * @param gridSize - The paper's grid size, read by the grid-based routers.
 * @returns The context to pass to {@link computeLinkPath}.
 */
export function createLinkGeometryContext(
  graph: dia.Graph,
  routing: LinkRouting,
  gridSize: number
): LinkGeometryContext {
  const views = new WeakMap<dia.Cell, EndView>();
  return {
    paper: {
      model: graph,
      options: {
        ...routing,
        gridSize,
        anchorNamespace: anchors,
        connectionPointNamespace: connectionPoints,
      },
      findViewByModel(id) {
        if (id === undefined) return null;
        const cell = graph.getCell(id);
        if (!cell) return null;
        if (!cell.isElement()) {
          // ponytail: a link end that is another link resolves to a plain point;
          // add link anchors when link-to-link connections are needed.
          warnLinkToLinkEnd(id);
          return null;
        }
        let view = views.get(cell);
        if (!view) {
          view = new EndView(cell);
          views.set(cell, view);
        }
        return view;
      },
    },
  };
}

/**
 * The part of `dia.LinkView` that joint-core's anchors, connection points,
 * routers and connectors use while a link path is resolved.
 */
class LinkGeometry {
  sourceAnchor = new Point();
  targetAnchor = new Point();
  sourcePoint = new Point();
  targetPoint = new Point();
  route: Point[] = [];
  /** Per-computation cache that routing presets store marker lengths in. */
  readonly metrics: Record<string, number> = {};
  readonly options: { readonly perpendicular?: boolean } = {};
  readonly paper: LinkGeometryContext['paper'];

  constructor(
    readonly model: dia.Link,
    context: LinkGeometryContext
  ) {
    this.paper = context.paper;
  }

  get sourceView(): EndView | null {
    return this.paper.findViewByModel(this.model.source().id);
  }

  get targetView(): EndView | null {
    return this.paper.findViewByModel(this.model.target().id);
  }

  get sourceMagnet(): Magnet | null {
    return this.getPortMagnet('source');
  }

  get targetMagnet(): Magnet | null {
    return this.getPortMagnet('target');
  }

  get sourceBBox(): Rect {
    return this.getEndBBox('source');
  }

  get targetBBox(): Rect {
    return this.getEndBBox('target');
  }

  /**
   * The `source` or `target` definition of the link.
   * @param endType - Which end.
   * @returns The end definition.
   */
  getEnd(endType: dia.LinkEnd): dia.Link.EndJSON {
    return endType === 'source' ? this.model.source() : this.model.target();
  }

  getEndView(endType: dia.LinkEnd): EndView | null {
    return endType === 'source' ? this.sourceView : this.targetView;
  }

  getEndAnchor(endType: dia.LinkEnd): Point {
    return new Point(endType === 'source' ? this.sourceAnchor : this.targetAnchor);
  }

  getEndConnectionPoint(endType: dia.LinkEnd): Point {
    return new Point(endType === 'source' ? this.sourcePoint : this.targetPoint);
  }

  getEndMagnet(endType: dia.LinkEnd): Magnet | null {
    const view = this.getEndView(endType);
    if (!view) return null;
    return this.getPortMagnet(endType) ?? view.el;
  }

  private getPortMagnet(endType: dia.LinkEnd): Magnet | null {
    const { port } = this.getEnd(endType);
    if (port === undefined || !this.getEndView(endType)) return null;
    return { getAttribute: (name) => (name === 'port' ? port : null) };
  }

  private getEndBBox(endType: dia.LinkEnd): Rect {
    const view = this.getEndView(endType);
    if (!view) {
      const { x, y } = this.getEnd(endType);
      return new Rect(x, y);
    }
    return view.getNodeBBox(this.getPortMagnet(endType) ?? view.el);
  }
}

// joint-core types its anchors, connection points, routers and connectors
// against `dia.LinkView` / `dia.ElementView`. `LinkGeometry` and `EndView`
// implement the members those functions read, so the signatures below describe
// the same functions the way this module calls them.
type AnchorFunction = (
  this: LinkGeometry,
  view: EndView,
  magnet: Magnet,
  ref: Point,
  args: object,
  endType: dia.LinkEnd,
  link: LinkGeometry
) => Point | undefined;

type ConnectionPointFunction = (
  this: LinkGeometry,
  line: Line,
  view: EndView,
  magnet: Magnet,
  args: object,
  endType: dia.LinkEnd,
  link: LinkGeometry
) => Point | undefined;

type RouterFunction = (
  this: LinkGeometry,
  vertices: readonly dia.Point[],
  args: object,
  link: LinkGeometry
) => readonly dia.Point[] | undefined;

type ConnectorFunction = (
  this: LinkGeometry,
  sourcePoint: Point,
  targetPoint: Point,
  route: readonly Point[],
  args: object,
  link: LinkGeometry
) => Path | string;

/**
 * Routing functions that reach into `dia.Paper` and other link views for more
 * than a link's own geometry, which a paper without views cannot give them.
 */
const UNSUPPORTED_ROUTING = new Set(['jumpover']);

/** A named routing definition, as joint-core accepts it next to the function itself. */
interface NamedRouting {
  readonly name: string;
  readonly args?: object;
}

/**
 * Type guard for the routing functions looked up by name or passed in by the
 * application. joint-core calls them with a link view; here they are called
 * with the `LinkGeometry` standing in for it.
 * @param value - The definition or the looked-up value.
 * @returns Whether the value is callable.
 */
function isRoutingFunction<RoutingFunction>(value: unknown): value is RoutingFunction {
  return typeof value === 'function';
}

/**
 * Resolves a routing definition to its function and arguments, the way
 * `dia.LinkView` does for anchors, connection points, routers and connectors.
 * @param kind - What is resolved, for the error message.
 * @param definition - The function, or its name with arguments.
 * @param namespace - The joint-core namespace named definitions are looked up in.
 * @returns The function to call and the arguments to call it with.
 */
function resolveRouting<RoutingFunction>(
  kind: string,
  definition: NamedRouting | object | null | undefined,
  namespace: Readonly<Record<string, unknown>>
): { readonly call: RoutingFunction; readonly args: object } {
  if (!definition) throw new Error(`ReactPaper: ${kind} required.`);
  if (isRoutingFunction<RoutingFunction>(definition)) return { call: definition, args: {} };
  const { name, args = {} }: Partial<NamedRouting> = definition;
  if (name !== undefined && UNSUPPORTED_ROUTING.has(name)) {
    throw new Error(
      `ReactPaper: the "${name}" ${kind} needs the JointJS view layer; use <Paper> for it.`
    );
  }
  const call = name === undefined ? undefined : namespace[name];
  if (!isRoutingFunction<RoutingFunction>(call)) {
    throw new Error(`ReactPaper: unknown ${kind} "${String(name)}".`);
  }
  return { call, args };
}

function resolveAnchor(link: LinkGeometry, endType: dia.LinkEnd, view: EndView, ref: Point): Point {
  const { call, args } = resolveRouting<AnchorFunction>(
    'anchor',
    link.getEnd(endType).anchor ?? link.paper.options.defaultAnchor,
    anchors
  );
  const magnet = link.getEndMagnet(endType) ?? view.el;
  const anchor = call.call(link, view, magnet, ref, args, endType, link);
  return anchor ? anchor.round(DECIMALS_ROUNDING) : new Point();
}

/**
 * Resolves both anchors, the first end against the far end and the second
 * against the first anchor. Port of `dia.LinkView.findAnchorsOrdered()`.
 * @param link - The link geometry being resolved; receives both anchors.
 * @param vertices - The link's vertices.
 */
function findAnchors(link: LinkGeometry, vertices: readonly dia.Point[]): void {
  const { model } = link;
  const isReversed = !!model.target().priority && !model.source().priority;
  const firstEndType: dia.LinkEnd = isReversed ? 'target' : 'source';
  const secondEndType: dia.LinkEnd = isReversed ? 'source' : 'target';
  const firstVertex = isReversed ? vertices.at(-1) : vertices[0];
  const secondVertex = isReversed ? vertices[0] : vertices.at(-1);
  const firstView = link.getEndView(firstEndType);
  const secondView = link.getEndView(secondEndType);
  const secondDefinition = link.getEnd(secondEndType);

  let firstAnchor = new Point(link.getEnd(firstEndType));
  if (firstView) {
    let ref = new Point(secondDefinition);
    if (firstVertex) {
      ref = new Point(firstVertex);
    } else if (secondView) {
      // `dia.LinkView` passes the far magnet here and joint-core resolves it to
      // its centre (`linkAnchors.resolveRef`); a magnet has no node to resolve.
      ref = secondView.getNodeBBox(link.getEndMagnet(secondEndType) ?? secondView.el).center();
    }
    firstAnchor = resolveAnchor(link, firstEndType, firstView, ref);
  }

  const secondAnchor = secondView
    ? resolveAnchor(link, secondEndType, secondView, new Point(secondVertex ?? firstAnchor))
    : new Point(secondDefinition);

  link.sourceAnchor = isReversed ? secondAnchor : firstAnchor;
  link.targetAnchor = isReversed ? firstAnchor : secondAnchor;
}

/**
 * Port of `dia.LinkView.findRoute()`.
 * @param link - The link geometry being resolved, with its anchors set.
 * @param vertices - The link's vertices.
 * @returns The route points between the two anchors.
 */
function findRoute(link: LinkGeometry, vertices: readonly dia.Point[]): Point[] {
  const definition = link.model.router() ?? link.paper.options.defaultRouter;
  // No router at all means the vertices are the route, as in `dia.LinkView`.
  if (!definition) return vertices.map((point) => new Point(point));
  const { call, args } = resolveRouting<RouterFunction>('router', definition, routers);
  const route = call.call(link, vertices, args, link) ?? vertices;
  return route.map((point) => new Point(point));
}

/**
 * Port of `dia.LinkView.getConnectionPoint()` for one link end.
 * @param link - The link geometry being resolved.
 * @param endType - Which end.
 * @param anchor - The end's anchor.
 * @param ref - The point the last path segment arrives from.
 * @returns Where the path meets the end.
 */
function findConnectionPoint(
  link: LinkGeometry,
  endType: dia.LinkEnd,
  anchor: Point,
  ref: Point
): Point {
  const view = link.getEndView(endType);
  if (!view) return anchor;
  const { call, args } = resolveRouting<ConnectionPointFunction>(
    'connection point',
    link.getEnd(endType).connectionPoint ?? link.paper.options.defaultConnectionPoint,
    connectionPoints
  );
  const magnet = link.getEndMagnet(endType) ?? view.el;
  const connectionPoint = call.call(link, new Line(ref, anchor), view, magnet, args, endType, link);
  return connectionPoint ? connectionPoint.round(DECIMALS_ROUNDING) : anchor;
}

/**
 * Port of `dia.LinkView.findPath()`.
 * @param link - The link geometry, with its route and connection points set.
 * @returns The link path.
 */
function findPath(link: LinkGeometry): Path {
  const { call, args } = resolveRouting<ConnectorFunction>(
    'connector',
    link.model.connector() ?? link.paper.options.defaultConnector,
    connectors
  );
  const path = call.call(
    link,
    link.sourcePoint.clone(),
    link.targetPoint.clone(),
    link.route,
    // Ask the connector for a `g.Path` instead of serialized path data.
    { ...args, raw: true },
    link
  );
  // A connector without `raw` support answers with path data of any flavour.
  return typeof path === 'string' ? new Path(V.normalizePathData(path)) : path;
}

/**
 * Resolves a link's path the way `dia.LinkView` does (anchors, route,
 * connection points, connector), from the models alone: no views, no DOM.
 * @param link - The link to resolve.
 * @param context - The paper's routing context.
 * @returns The link path in paper coordinates.
 */
export function computeLinkPath(link: dia.Link, context: LinkGeometryContext): Path {
  const geometry = new LinkGeometry(link, context);
  const vertices = link.vertices();
  findAnchors(geometry, vertices);
  geometry.route = findRoute(geometry, vertices);
  const { route, sourceAnchor, targetAnchor } = geometry;
  geometry.sourcePoint = findConnectionPoint(
    geometry,
    'source',
    sourceAnchor,
    route[0] ?? targetAnchor
  );
  geometry.targetPoint = findConnectionPoint(
    geometry,
    'target',
    targetAnchor,
    route.at(-1) ?? sourceAnchor
  );
  return findPath(geometry);
}
