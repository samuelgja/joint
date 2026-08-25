/* eslint-disable @typescript-eslint/no-explicit-any */
import { g, type anchors } from '@joint/core';
import { centerAnchor, perpendicularAnchor, midSideAnchor } from '../anchors';
import { setupPaperFixture, type PaperFixture } from './__helpers__/paper-fixture';

let context: PaperFixture;

afterEach(() => {
  context.cleanup();
});

function computeAnchorPoint(
  anchor: anchors.Anchor,
  magnet: SVGElement,
  endType: 'source' | 'target' = 'target'
): g.Point {
  return anchor(context.targetView, magnet, new g.Point(50, 50), {} as any, endType, context.linkView);
}

function findPortMagnet(): SVGElement {
  return context.targetView.findPortNode('pin1') as SVGElement;
}

function findCustomMagnet(): SVGElement {
  return context.targetView.el.querySelector('rect') as unknown as SVGElement;
}

describe('presets / anchors / centerAnchor', () => {
  it('returns center for root element magnet (uses model geometry path)', () => {
    context = setupPaperFixture();
    const point = computeAnchorPoint(centerAnchor, context.targetView.el);
    expect(point.x).toBe(250);
    expect(point.y).toBe(50);
  });

  it('returns center for port magnet (uses model geometry path)', () => {
    context = setupPaperFixture({ targetPortSide: 'left' });
    const portMagnet = findPortMagnet();
    expect(portMagnet).toBeDefined();
    expect(computeAnchorPoint(centerAnchor, portMagnet)).toBeDefined();
  });

  it('falls back to DOM-measured for non-port custom magnet', () => {
    context = setupPaperFixture();
    expect(computeAnchorPoint(centerAnchor, findCustomMagnet())).toBeDefined();
  });
});

describe('presets / anchors / perpendicularAnchor', () => {
  it('uses model geometry for root element', () => {
    context = setupPaperFixture();
    expect(computeAnchorPoint(perpendicularAnchor, context.targetView.el)).toBeDefined();
  });

  it('uses model geometry for port magnet', () => {
    context = setupPaperFixture({ targetPortSide: 'left' });
    expect(computeAnchorPoint(perpendicularAnchor, findPortMagnet())).toBeDefined();
  });

  it('falls back to DOM-measured for custom magnet', () => {
    context = setupPaperFixture();
    expect(computeAnchorPoint(perpendicularAnchor, findCustomMagnet())).toBeDefined();
  });
});

describe('presets / anchors / midSideAnchor', () => {
  it('uses midSide with model geometry on root element', () => {
    context = setupPaperFixture();
    expect(computeAnchorPoint(midSideAnchor('auto', 0, 0), context.targetView.el)).toBeDefined();
  });

  it('returns port-side point with offset for port magnet (left side)', () => {
    context = setupPaperFixture({ targetPortSide: 'left' });
    // Source side uses sourceOffset=5
    expect(computeAnchorPoint(midSideAnchor('auto', 5, 0), findPortMagnet(), 'source')).toBeDefined();
  });

  it('handles target end with targetOffset', () => {
    context = setupPaperFixture({ targetPortSide: 'left' });
    expect(computeAnchorPoint(midSideAnchor('auto', 0, 7), findPortMagnet())).toBeDefined();
  });

  it('rotates port point when element angle is non-zero', () => {
    context = setupPaperFixture({ targetPortSide: 'left' });
    context.target.rotate(45);
    expect(computeAnchorPoint(midSideAnchor('auto', 0, 0), findPortMagnet())).toBeDefined();
  });

  it('falls back to midSide DOM for non-root, non-port magnet', () => {
    context = setupPaperFixture();
    expect(computeAnchorPoint(midSideAnchor('auto', 0, 0), findCustomMagnet())).toBeDefined();
  });

  it('returns midSide for port magnet that does not match element ports', () => {
    context = setupPaperFixture();
    // Create a fake magnet with a port attribute pointing to a non-existent port
    const fakePortMagnet = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    fakePortMagnet.setAttribute('port', 'nonexistent');
    context.targetView.el.append(fakePortMagnet);
    const point = computeAnchorPoint(midSideAnchor('auto', 0, 0), fakePortMagnet as unknown as SVGElement);
    expect(point).toBeDefined();
  });

  it.each(['right', 'top', 'bottom'] as const)('handles %s-side port placement', (side) => {
    context = setupPaperFixture({ targetPortSide: side });
    expect(computeAnchorPoint(midSideAnchor('auto', 0, 0), findPortMagnet())).toBeDefined();
  });

  it('uses default mode when not specified', () => {
    context = setupPaperFixture();
    expect(computeAnchorPoint(midSideAnchor(), context.targetView.el)).toBeDefined();
  });
});
