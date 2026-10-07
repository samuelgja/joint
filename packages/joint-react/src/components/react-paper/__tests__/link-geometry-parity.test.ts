import { dia } from '@joint/core';
import { computeLinkPath, createLinkGeometryContext } from '../link-geometry';
import { PaperView } from '../../../mvc/paper';
import {
  linkRoutingOrthogonal,
  linkRoutingSmooth,
  linkRoutingStraight,
  type LinkRouting,
} from '../../../presets/link-routing';
import { getTestGraph } from '../../../utils/test-wrappers';

// The pure-React paper resolves link paths from the models; `<Paper>` resolves
// them through `dia.LinkView`. Both must draw the same link, so every scenario
// here is resolved both ways and compared.
//
// jsdom has no layout, so a real view cannot measure its nodes. The reference
// paper is therefore given what a browser reports for a box-shaped element and
// its ports: the bounding boxes of the model.

const GRID_SIZE = 10;

const PORTS = {
  groups: {
    side: { position: { name: 'absolute' }, size: { width: 10, height: 10 } },
  },
  items: [
    { id: 'out', group: 'side', args: { x: 100, y: 20 } },
    { id: 'in', group: 'side', args: { x: 0, y: 20 } },
  ],
};

const ROUTINGS: ReadonlyArray<readonly [string, LinkRouting]> = [
  ['straight', linkRoutingStraight()],
  ['straight, perpendicular', linkRoutingStraight({ perpendicular: true })],
  ['straight, offsets', linkRoutingStraight({ sourceOffset: 5, targetOffset: 8 })],
  ['orthogonal', linkRoutingOrthogonal()],
  ['orthogonal, always routed', linkRoutingOrthogonal({ straightWhenDisconnected: false })],
  ['smooth', linkRoutingSmooth()],
];

interface Scenario {
  readonly name: string;
  readonly target: dia.Point;
  readonly angle?: number;
  readonly link: Record<string, unknown>;
}

const CONNECTED = { source: { id: 'a' }, target: { id: 'b' } };

const MARKER_MARKUP = [{ tagName: 'path', attributes: { d: 'M 0 -3 L -6 0 L 0 3 z' } }];

const SCENARIOS: readonly Scenario[] = [
  { name: 'side by side', target: { x: 300, y: 0 }, link: CONNECTED },
  { name: 'diagonal', target: { x: 300, y: 220 }, link: CONNECTED },
  { name: 'stacked', target: { x: 0, y: 300 }, link: CONNECTED },
  { name: 'behind', target: { x: -400, y: -150 }, link: CONNECTED },
  { name: 'rotated source', target: { x: 300, y: 220 }, angle: 30, link: CONNECTED },
  {
    name: 'through vertices',
    target: { x: 300, y: 220 },
    link: {
      ...CONNECTED,
      vertices: [
        { x: 160, y: 300 },
        { x: 260, y: 40 },
      ],
    },
  },
  {
    name: 'port to port',
    target: { x: 300, y: 220 },
    link: { source: { id: 'a', port: 'out' }, target: { id: 'b', port: 'in' } },
  },
  {
    name: 'port to element',
    target: { x: 300, y: 220 },
    link: { source: { id: 'a', port: 'out' }, target: { id: 'b' } },
  },
  {
    name: 'to a free point',
    target: { x: 300, y: 220 },
    link: { source: { id: 'a' }, target: { x: 500, y: 90 } },
  },
  {
    name: 'between free points',
    target: { x: 300, y: 220 },
    link: { source: { x: 5, y: 9 }, target: { x: 500, y: 90 } },
  },
  {
    name: 'explicit end anchors',
    target: { x: 300, y: 220 },
    link: {
      source: { id: 'a', anchor: { name: 'bottom' } },
      target: { id: 'b', anchor: { name: 'topLeft' }, connectionPoint: { name: 'anchor' } },
    },
  },
  {
    name: 'own router and connector',
    target: { x: 300, y: 220 },
    link: { ...CONNECTED, router: { name: 'orthogonal' }, connector: { name: 'rounded' } },
  },
  {
    name: 'markers pull the ends back',
    target: { x: 300, y: 220 },
    link: {
      ...CONNECTED,
      attrs: {
        line: {
          connection: true,
          sourceMarker: { markup: MARKER_MARKUP, length: 6 },
          targetMarker: { markup: MARKER_MARKUP, length: 9 },
        },
      },
    },
  },
];

function createGraph(scenario: Scenario): dia.Graph {
  const graph = getTestGraph();
  graph.addCells([
    {
      id: 'a',
      type: 'element',
      position: { x: 0, y: 0 },
      size: { width: 100, height: 40 },
      angle: scenario.angle ?? 0,
      ports: PORTS,
    },
    {
      id: 'b',
      type: 'element',
      position: scenario.target,
      size: { width: 100, height: 40 },
      ports: PORTS,
    },
    { id: 'link', type: 'link', ...scenario.link },
  ]);
  return graph;
}

/** The path `dia.LinkView` draws for the link, on a real paper. */
function resolveWithLinkView(graph: dia.Graph, routing: LinkRouting): string {
  const paper = new PaperView({ model: graph, gridSize: GRID_SIZE, ...routing });
  document.body.append(paper.el);
  paper.unfreeze();
  paper.updateViews();
  const linkView = paper.requireView<dia.LinkView>('link');
  const d = linkView.getConnection().serialize();
  paper.remove();
  return d;
}

function resolveWithModels(graph: dia.Graph, routing: LinkRouting): string {
  const link = graph.getCell('link');
  if (!link.isLink()) throw new Error('Expected a link.');
  return computeLinkPath(link, createLinkGeometryContext(graph, routing, GRID_SIZE)).serialize();
}

function getModelBBox(view: dia.ElementView, magnet: SVGElement, rotate: boolean) {
  const { model } = view;
  const portId = view.findAttribute('port', magnet);
  if (portId === null || !model.hasPort(portId)) return model.getBBox({ rotate });
  return rotate
    ? model.getPortBBox(portId, { rotate })
    : model.getPortBBox(portId, { rotate: false });
}

describe('link geometry parity with dia.LinkView', () => {
  beforeAll(() => {
    jest.spyOn(dia.ElementView.prototype, 'getNodeBBox').mockImplementation(function (
      this: dia.ElementView,
      magnet: SVGElement
    ) {
      return getModelBBox(this, magnet, true);
    });
    jest.spyOn(dia.ElementView.prototype, 'getNodeUnrotatedBBox').mockImplementation(function (
      this: dia.ElementView,
      magnet: SVGElement
    ) {
      return getModelBBox(this, magnet, false);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe.each(ROUTINGS)('%s routing', (_routingName, routing) => {
    it.each(SCENARIOS.map((scenario) => [scenario.name, scenario] as const))(
      '%s',
      (_name, scenario) => {
        const graph = createGraph(scenario);
        const expected = resolveWithLinkView(graph, routing);
        expect(expected).not.toContain('NaN');
        expect(resolveWithModels(graph, routing)).toBe(expected);
      }
    );
  });
});
