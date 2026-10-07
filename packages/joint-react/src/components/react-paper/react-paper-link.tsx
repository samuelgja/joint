import type { dia } from '@joint/core';
import type { Line, Path } from '@joint/core/g';
import {
  createElement,
  useCallback,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from 'react';
import { CellIdContext } from '../../context';
import { useCells } from '../../hooks/use-cells';
import { useGraphStore } from '../../hooks/use-graph-store';
import type { CellId } from '../../types/cell.types';
import { isNumber, isRecord, isString } from '../../utils/is';
import typedMemo from '../../utils/typed-react';
import { computeLinkPath, type LinkGeometryContext } from './link-geometry';

/** Where a label sits when it has no `position`, as in `dia.Link`. */
const DEFAULT_LABEL_DISTANCE = 0.5;

/**
 * JointJS attributes that are instructions for `dia.LinkView` or fields of a
 * marker definition rather than SVG attributes, so they never reach the DOM.
 */
const NON_SVG_ATTRIBUTES = new Set([
  'connection',
  'sourceMarker',
  'targetMarker',
  'vertexMarker',
  'type',
  'id',
]);

const EMPTY_DATA: Readonly<Record<string, unknown>> = Object.freeze({});

/**
 * Turns a JointJS attribute bag into React SVG props: `class` becomes
 * `className`, kebab-case names become camelCase, and JointJS-only
 * instructions and nested definitions are dropped.
 * @param attributes - JointJS attributes of one selector.
 * @returns The props to spread on the SVG node.
 */
function toSVGProps(attributes: object | undefined): Record<string, unknown> {
  const props: Record<string, unknown> = {};
  if (!attributes) return props;
  for (const [name, value] of Object.entries(attributes)) {
    if (NON_SVG_ATTRIBUTES.has(name)) continue;
    if (name === 'class') props.className = value;
    else if (name === 'style') props.style = value;
    else if (isString(value) || isNumber(value)) {
      props[name.replaceAll(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())] = value;
    }
  }
  return props;
}

/**
 * Renders static JointJS JSON markup as React nodes.
 * @param markup - The markup to render.
 * @returns One React node per markup node.
 */
function renderMarkup(markup: dia.MarkupJSON): ReactNode[] {
  return markup.map((node, index) => {
    if (isString(node)) return node;
    const { tagName, attributes, className, style, textContent, children } = node;
    const props = { ...toSVGProps(attributes), className, style, key: index };
    return createElement(tagName, props, textContent ?? (children && renderMarkup(children)));
  });
}

interface MarkerProps {
  readonly marker: dia.SVGMarkerJSON | null | undefined;
  /** Tangent of the path at the marked end, pointing along the path. */
  readonly tangent: Line | null;
  /** A target marker is drawn mirrored, as `dia.LinkView` does. */
  readonly isTarget?: boolean;
  /** The line's stroke, which a marker takes as its stroke and fill unless it sets its own. */
  readonly color: unknown;
}

/**
 * A link end marker, drawn at the path end and rotated along it.
 * @param props - The marker definition and where the path ends.
 * @returns The marker group, or `null` when the end has no marker.
 */
function Marker(props: Readonly<MarkerProps>) {
  const { marker, tangent, isTarget = false, color } = props;
  if (!marker || !tangent) return null;
  const { x, y } = tangent.start;
  const angle = tangent.angle() + (isTarget ? 180 : 0);
  const transform = `translate(${x},${y}) rotate(${angle})`;
  const inherited = isString(color) ? { stroke: color, fill: color } : undefined;
  if ('markup' in marker) {
    const { markup, attrs: attributes } = marker;
    return (
      <g transform={transform} {...inherited} {...toSVGProps(attributes)}>
        {isString(markup) ? null : renderMarkup(markup)}
      </g>
    );
  }
  return (
    <g transform={transform} {...inherited}>
      {createElement(marker.type ?? 'path', toSVGProps(marker))}
    </g>
  );
}

/**
 * Where a label sits on the path. Port of
 * `dia.LinkView._getLabelTransformationMatrix()` without the `keepGradient` args.
 * @param path - The link path.
 * @param pathLength - Length of the path.
 * @param position - The label's `position`.
 * @returns The label `transform` attribute value.
 */
function getLabelTransform(
  path: Path,
  pathLength: number,
  position: dia.Link.Label['position']
): string {
  const {
    distance = DEFAULT_LABEL_DISTANCE,
    offset,
    angle = 0,
  }: dia.Link.LabelPosition = isNumber(position) ? { distance: position } : (position ?? {});
  const isDistanceRelative = distance > 0 && distance <= 1;
  const tangent = path.tangentAtLength(isDistanceRelative ? distance * pathLength : distance);
  let point = tangent ? tangent.start.clone() : path.start?.clone();
  if (!point) return '';
  if (isNumber(offset) && offset !== 0 && tangent) {
    const normal = tangent.clone();
    normal.rotate(tangent.start, -90);
    normal.setLength(offset);
    point = normal.end;
  } else if (isRecord(offset)) {
    point.offset(isNumber(offset.x) ? offset.x : 0, isNumber(offset.y) ? offset.y : 0);
  }
  return `translate(${point.x},${point.y}) rotate(${angle})`;
}

/**
 * The text of a label, read from the conventional `label` / `text` selectors.
 * @param label - The link label.
 * @returns The text to display.
 */
function getLabelText(label: dia.Link.Label): ReactNode {
  const { attrs: attributes = {} } = label;
  const text: unknown = attributes.label?.text ?? attributes.text?.text;
  return isString(text) || isNumber(text) ? text : null;
}

/**
 * The id of the cell a link end is attached to.
 * @param end - A link record's `source` or `target`.
 * @returns The cell id, or `undefined` for a free point.
 */
function getEndId(end: unknown): CellId | undefined {
  if (!isRecord(end)) return undefined;
  const { id } = end;
  return isString(id) || isNumber(id) ? id : undefined;
}

/** The store records a link path was last resolved from. */
interface LinkPathInputs {
  readonly link: unknown;
  readonly source: unknown;
  readonly target: unknown;
  readonly version: number;
}

const INITIAL_INPUTS: LinkPathInputs = {
  link: undefined,
  source: undefined,
  target: undefined,
  version: 0,
};

/** Props for {@link ReactPaperLink}. */
export interface ReactPaperLinkProps {
  /** Id of the link to render. */
  readonly id: CellId;
  /** The link's `type`, mirrored on the node as `data-type`. */
  readonly type: string;
  /** Optional link renderer, invoked as a component with the link's `data` as props. */
  readonly renderLink?: ComponentType<Record<string, unknown>>;
  /** The paper's routing context. */
  readonly geometry: LinkGeometryContext;
}

/**
 * One link of a `ReactPaper`: the path joint-core resolves from the models,
 * drawn as a wide pointer `wrapper` and the visible `line`, with its markers,
 * labels and the optional user content.
 * @param props - Link id and rendering options.
 * @returns The link node.
 * @internal
 */
function ReactPaperLinkComponent(props: Readonly<ReactPaperLinkProps>) {
  const { id, type, renderLink: RenderLink, geometry } = props;
  const { graph, graphProjection } = useGraphStore();
  const { cells } = graphProjection;
  // The whole record: a link re-renders on its own changes, never on an element move.
  const record = useCells(id, (cell) => cell);
  const sourceId = record && 'source' in record ? getEndId(record.source) : undefined;
  const targetId = record && 'target' in record ? getEndId(record.target) : undefined;

  // The path depends on the link and on both of its end elements. Their
  // records are immutable, so three identities tell whether it is stale; the
  // version derived from them is all React has to compare. Reading the store
  // (rather than counting notifications) also covers a change that lands
  // between this render and the subscription.
  const inputsRef = useRef<LinkPathInputs>(INITIAL_INPUTS);
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const unsubscribes = [cells.subscribeById(id, onStoreChange)];
      if (sourceId !== undefined) unsubscribes.push(cells.subscribeById(sourceId, onStoreChange));
      if (targetId !== undefined) unsubscribes.push(cells.subscribeById(targetId, onStoreChange));
      return () => {
        for (const unsubscribe of unsubscribes) unsubscribe();
      };
    },
    [cells, id, sourceId, targetId]
  );
  const getVersion = useCallback(() => {
    const link = cells.get(id);
    const source = sourceId === undefined ? undefined : cells.get(sourceId);
    const target = targetId === undefined ? undefined : cells.get(targetId);
    const inputs = inputsRef.current;
    if (inputs.link !== link || inputs.source !== source || inputs.target !== target) {
      inputsRef.current = { link, source, target, version: inputs.version + 1 };
    }
    return inputsRef.current.version;
  }, [cells, id, sourceId, targetId]);
  const version = useSyncExternalStore(subscribe, getVersion, getVersion);

  const path = useMemo(() => {
    const cell = graph.getCell(id);
    return cell?.isLink() ? computeLinkPath(cell, geometry) : null;
    // `version` is the signal to resolve again; the path reads the models.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geometry, graph, id, version]);

  const link = graph.getCell(id);
  if (!path || !link?.isLink()) return null;
  const d = path.serialize();
  const { line, wrapper }: dia.Cell.Selectors = link.attr() ?? {};
  const data = isRecord(record?.data) ? record.data : EMPTY_DATA;
  const { sourceMarker, targetMarker } = line ?? {};
  const labels = link.labels();
  // Measured once for all labels: a curve is subdivided to find its length.
  const pathLength = labels.length > 0 ? path.length() : 0;

  return (
    <g
      className={`joint-cell joint-type-${type.replaceAll('.', '-')} joint-link`}
      model-id={id}
      data-type={type}
    >
      <path
        className="jj-link-wrapper"
        fill="none"
        cursor="pointer"
        {...toSVGProps(wrapper)}
        d={d}
      />
      <path className="jj-link-line" fill="none" pointerEvents="none" {...toSVGProps(line)} d={d} />
      <Marker
        marker={sourceMarker}
        tangent={sourceMarker ? path.tangentAt(0) : null}
        color={line?.stroke}
      />
      <Marker
        marker={targetMarker}
        tangent={targetMarker ? path.tangentAt(1) : null}
        color={line?.stroke}
        isTarget
      />
      {labels.map((label, index) => (
        <text
          // Labels have no identity of their own; their order is their key.
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={index}
          className="jj-link-label"
          textAnchor="middle"
          dominantBaseline="central"
          pointerEvents="none"
          transform={getLabelTransform(path, pathLength, label.position)}
        >
          {getLabelText(label)}
        </text>
      ))}
      {RenderLink && (
        <CellIdContext.Provider value={id}>
          <RenderLink {...data} />
        </CellIdContext.Provider>
      )}
    </g>
  );
}

/**
 * Memoised {@link ReactPaperLinkComponent}: a paper re-render (a cell added or
 * removed) leaves every other link untouched.
 * @internal
 */
export const ReactPaperLink = typedMemo(ReactPaperLinkComponent);
