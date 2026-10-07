import type { dia } from '@joint/core';
import { Point } from '@joint/core/g';
import { computeLinkPath, createLinkGeometryContext } from '../link-geometry';
import {
  linkRoutingOrthogonal,
  linkRoutingSmooth,
  linkRoutingStraight,
  type LinkRouting,
} from '../../../presets/link-routing';
import { getTestGraph } from '../../../utils/test-wrappers';

const GRID_SIZE = 10;

let graph: dia.Graph;

function addElement(id: string, x: number, y: number, extra: Record<string, unknown> = {}) {
  graph.addCell({
    id,
    type: 'element',
    position: { x, y },
    size: { width: 100, height: 40 },
    ...extra,
  });
}

function addLink(attributes: Record<string, unknown>): dia.Link {
  graph.addCell({ id: 'link', type: 'link', ...attributes });
  const link = graph.getCell('link');
  if (!link.isLink()) throw new Error('Expected a link.');
  return link;
}

function resolve(link: dia.Link, routing: LinkRouting = linkRoutingStraight()): string {
  return computeLinkPath(link, createLinkGeometryContext(graph, routing, GRID_SIZE)).serialize();
}

describe('computeLinkPath', () => {
  beforeEach(() => {
    graph = getTestGraph();
    addElement('a', 0, 0);
    addElement('b', 300, 0);
  });

  describe('ends', () => {
    it('connects two elements boundary to boundary', () => {
      expect(resolve(addLink({ source: { id: 'a' }, target: { id: 'b' } }))).toBe(
        'M 100 20 L 300 20'
      );
    });

    it('connects free points as they are', () => {
      expect(resolve(addLink({ source: { x: 10, y: 10 }, target: { x: 50, y: 70 } }))).toBe(
        'M 10 10 L 50 70'
      );
    });

    it('connects an element to a free point', () => {
      expect(resolve(addLink({ source: { id: 'a' }, target: { x: 50, y: 240 } }))).toBe(
        'M 50 40 L 50 240'
      );
    });

    it('treats an end whose element is missing as a free point at the origin', () => {
      expect(resolve(addLink({ source: { id: 'gone' }, target: { id: 'b' } }))).toBe(
        'M 0 0 L 300 17.14'
      );
    });

    it('anchors a port end on the port, not on the element centre', () => {
      graph.getCell('a').set('ports', {
        groups: { out: { position: { name: 'absolute' }, size: { width: 10, height: 10 } } },
        items: [{ id: 'p', group: 'out', args: { x: 100, y: 0 } }],
      });
      const d = resolve(addLink({ source: { id: 'a', port: 'p' }, target: { x: 400, y: 0 } }));
      // The path leaves from around the port at (100, 0), not from the centre row y = 20.
      const [, x, y] = /^M (\S+) (\S+)/.exec(d) ?? [];
      expect(Number(x)).toBeGreaterThanOrEqual(100);
      expect(Number(y)).toBeLessThan(10);
    });

    it('resolves the boundary of a rotated element', () => {
      const element = graph.getCell('a');
      if (!element.isElement()) throw new Error('Expected an element.');
      element.rotate(90);
      // Rotated by 90°, the 100x40 box spans x 30..70 around its centre (50, 20).
      expect(resolve(addLink({ source: { id: 'a' }, target: { id: 'b' } }))).toBe(
        'M 70 20 L 300 20'
      );
    });

    it('draws a link-to-link end as a free point and warns once in development', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      graph.addCell({ id: 'other', type: 'link', source: { id: 'a' }, target: { id: 'b' } });
      const link = addLink({ source: { id: 'other' }, target: { id: 'b' } });
      expect(resolve(link).startsWith('M 0 0 ')).toBe(true);
      resolve(link);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('Link-to-link connections are not supported');
      warn.mockRestore();
    });

    it('resolves the target first when only the target has priority', () => {
      const withPriority = resolve(
        addLink({ source: { id: 'a' }, target: { id: 'b', priority: true } })
      );
      expect(withPriority).toBe('M 100 20 L 300 20');
    });
  });

  describe('route', () => {
    it('passes through the vertices in order', () => {
      const link = addLink({
        source: { id: 'a' },
        target: { id: 'b' },
        vertices: [
          { x: 150, y: 200 },
          { x: 250, y: 200 },
        ],
      });
      expect(resolve(link)).toContain('L 150 200 L 250 200');
    });

    it('aims each end at its nearest vertex', () => {
      const link = addLink({
        source: { id: 'a' },
        target: { id: 'b' },
        vertices: [{ x: 50, y: 300 }],
      });
      // Straight below the source centre, so the path leaves through the bottom edge.
      expect(resolve(link).startsWith('M 50 40 L 50 300')).toBe(true);
    });

    it('prefers the router and connector set on the link over the defaults', () => {
      const link = addLink({
        source: { id: 'a' },
        target: { id: 'b' },
        router: { name: 'orthogonal' },
        connector: { name: 'rounded' },
        vertices: [{ x: 200, y: 200 }],
      });
      const straight = resolve(link);
      link.unset('router');
      link.unset('connector');
      expect(resolve(link)).not.toBe(straight);
    });

    it('accepts routing functions as well as named definitions', () => {
      const link = addLink({ source: { id: 'a' }, target: { id: 'b' } });
      const routing: LinkRouting = {
        ...linkRoutingStraight(),
        defaultRouter: () => [new Point(200, 100)],
      };
      expect(resolve(link, routing)).toContain('L 200 100');
    });

    it.each([
      ['straight', linkRoutingStraight()],
      ['orthogonal', linkRoutingOrthogonal()],
      ['smooth', linkRoutingSmooth()],
    ])('resolves a path with the %s routing preset', (_name, routing) => {
      const element = graph.getCell('b');
      if (!element.isElement()) throw new Error('Expected an element.');
      element.position(300, 200);
      const d = resolve(addLink({ source: { id: 'a' }, target: { id: 'b' } }), routing);
      expect(d.startsWith('M ')).toBe(true);
      expect(d).not.toContain('NaN');
    });
  });

  describe('invalid routing', () => {
    it.each([
      ['router', { router: { name: 'nope' } }, 'unknown router "nope"'],
      ['connector', { connector: { name: 'nope' } }, 'unknown connector "nope"'],
      ['anchor', { source: { id: 'a', anchor: { name: 'nope' } } }, 'unknown anchor "nope"'],
      [
        'connection point',
        { source: { id: 'a', connectionPoint: { name: 'nope' } } },
        'unknown connection point "nope"',
      ],
    ])('throws on an unknown %s', (_kind, attributes, message) => {
      const link = addLink({ source: { id: 'a' }, target: { id: 'b' }, ...attributes });
      expect(() => resolve(link)).toThrow(message);
    });

    it('throws when a default is missing altogether', () => {
      const link = addLink({ source: { id: 'a' }, target: { id: 'b' } });
      expect(() => resolve(link, {})).toThrow('ReactPaper: anchor required.');
    });
  });
});
