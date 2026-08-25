/* eslint-disable prefer-destructuring */

/* eslint-disable @typescript-eslint/no-require-imports */
import type { dia } from '@joint/core';
import type { CellId } from '../../types/cell.types';
import type { GraphStoreObserver } from '../create-elements-size-observer';
import { MockResizeObserver } from './__helpers__/mock-resize-observer';

// Replace global ResizeObserver with the mock before the module under test loads.
MockResizeObserver.install();

/** Additive transform stub: grows both dimensions by `delta`. */
const createAdditiveTransform = (delta: number) =>
  jest.fn(({ width, height }: { width: number; height: number }) => ({
    width: width + delta,
    height: height + delta,
  }));

describe('createElementsSizeObserver', () => {
  let observer: GraphStoreObserver;
  let mockOnBatchUpdate: jest.Mock;
  let mockGetCellTransform: jest.Mock;
  let mockGetElements: jest.Mock;
  let mockElements: Map<string, { size: { width: number; height: number }; position: { x: number; y: number } }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let createElementsSizeObserver: any;

  beforeEach(() => {
    // Reset modules and reimport to ensure the mock is used
    jest.resetModules();
    // Re-install the mock after reset to ensure it's used
    MockResizeObserver.install();

    // jest.resetModules() requires synchronous re-import; using `require` is the only
    // option here. ESM `import()` is async and does not bypass module cache the same way.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    createElementsSizeObserver = require('../create-elements-size-observer').createElementsSizeObserver;

    mockElements = new Map([
      ['element-1', { size: { width: 1, height: 1 }, position: { x: 0, y: 0 } }],
      ['element-2', { size: { width: 1, height: 1 }, position: { x: 0, y: 0 } }],
    ]);

    mockOnBatchUpdate = jest.fn();
    mockGetCellTransform = jest.fn((id: CellId) => ({
      width: 1,
      height: 1,
      x: 0,
      y: 0,
      angle: 0,
      element: { id } as dia.Element,
    }));
    mockGetElements = jest.fn(() => mockElements);

    observer = createElementsSizeObserver({
      onBatchUpdate: mockOnBatchUpdate,
      getCellTransform: mockGetCellTransform,
      getElements: mockGetElements,
    });
  });

  afterEach(() => {
    observer.clean();
  });

  /** Registers a fresh div under `element-1` and returns it with the live mock observer. */
  function addObservedElement() {
    const element = document.createElement('div');
    observer.add({ id: 'element-1', node: element });
    const resizeObserver = MockResizeObserver.getLastInstance()!;
    return { element, resizeObserver };
  }

  describe('add', () => {
    it('should register element with ResizeObserver', () => {
      const element = document.createElement('div');

      observer.add({ id: 'element-1', node: element });

      expect(observer.has('element-1')).toBe(true);
    });

    it('should return cleanup function that unregisters element', () => {
      const element = document.createElement('div');

      const cleanup = observer.add({ id: 'element-1', node: element });
      expect(observer.has('element-1')).toBe(true);

      cleanup();
      expect(observer.has('element-1')).toBe(false);
    });

    it('should handle multiple elements', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');

      observer.add({ id: 'element-1', node: element1 });
      observer.add({ id: 'element-2', node: element2 });

      expect(observer.has('element-1')).toBe(true);
      expect(observer.has('element-2')).toBe(true);
    });

    it('should process ResizeObserver callback when element is added', () => {
      // Trigger resize via ResizeObserver (simulates browser behavior)
      const { element, resizeObserver } = addObservedElement();
      resizeObserver.triggerResize(element, 100, 50);

      expect(mockOnBatchUpdate).toHaveBeenCalledTimes(1);

      const updateCall = mockOnBatchUpdate.mock.calls[0][0];
      expect(updateCall['element-1']).toBeDefined();
      expect(updateCall['element-1'].width).toBe(100);
      expect(updateCall['element-1'].height).toBe(50);
    });

    it('should handle multiple elements with ResizeObserver', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');

      observer.add({ id: 'element-1', node: element1 });
      observer.add({ id: 'element-2', node: element2 });

      // Trigger resize for both elements
      const resizeObserver = MockResizeObserver.getLastInstance();
      resizeObserver?.triggerResize(element1, 100, 50);
      resizeObserver?.triggerResize(element2, 200, 100);

      expect(mockOnBatchUpdate).toHaveBeenCalledTimes(2);
    });
  });

  describe('ResizeObserver callback', () => {
    it('should process size changes from ResizeObserver', () => {
      const { element, resizeObserver } = addObservedElement();

      // Trigger initial resize
      resizeObserver.triggerResize(element, 100, 50);
      expect(mockOnBatchUpdate).toHaveBeenCalledTimes(1);

      // Trigger resize to a different size
      resizeObserver.triggerResize(element, 200, 100);

      // Should be called again for the resize
      expect(mockOnBatchUpdate).toHaveBeenCalledTimes(2);
    });

    it('should not update if size has not changed significantly', () => {
      const { element, resizeObserver } = addObservedElement();

      // Trigger initial resize
      resizeObserver.triggerResize(element, 100, 50);
      expect(mockOnBatchUpdate).toHaveBeenCalledTimes(1);
      mockOnBatchUpdate.mockClear();

      // Trigger resize with same size (within epsilon of 0.5)
      resizeObserver.triggerResize(element, 100.1, 50.1);

      // Should not trigger update because change is within epsilon
      expect(mockOnBatchUpdate).not.toHaveBeenCalled();
    });

    it('should use transform function when provided', () => {
      const element = document.createElement('div');
      const transform = createAdditiveTransform(20);

      observer.add({ id: 'element-1', node: element, transform });

      const resizeObserver = MockResizeObserver.getLastInstance();
      resizeObserver?.triggerResize(element, 100, 50);

      expect(transform).toHaveBeenCalled();

      const updateCall = mockOnBatchUpdate.mock.calls[0][0];
      expect(updateCall['element-1'].width).toBe(120); // 100 + 20
      expect(updateCall['element-1'].height).toBe(70); // 50 + 20
    });
  });

  describe('stack behavior', () => {
    it('should allow multiple registrations for the same cell ID', () => {
      const nodeA = document.createElement('div');
      const nodeB = document.createElement('div');

      observer.add({ id: 'element-1', node: nodeA });
      observer.add({ id: 'element-1', node: nodeB });

      expect(observer.has('element-1')).toBe(true);
    });

    it('should only observe the active (latest) node via ResizeObserver', () => {
      const nodeA = document.createElement('div');
      const nodeB = document.createElement('div');

      observer.add({ id: 'element-1', node: nodeA });
      observer.add({ id: 'element-1', node: nodeB });

      const resizeObserver = MockResizeObserver.getLastInstance()!;

      // nodeA should be unobserved (deactivated when nodeB was added)
      expect(resizeObserver.isObserving(nodeA)).toBe(false);
      // nodeB should be observed (active)
      expect(resizeObserver.isObserving(nodeB)).toBe(true);
    });

    it('should process resize only from the active node', () => {
      const nodeA = document.createElement('div');
      const nodeB = document.createElement('div');

      observer.add({ id: 'element-1', node: nodeA });
      observer.add({ id: 'element-1', node: nodeB });

      const resizeObserver = MockResizeObserver.getLastInstance()!;

      // Trigger resize on the active node (nodeB)
      resizeObserver.triggerResize(nodeB, 200, 100);
      expect(mockOnBatchUpdate).toHaveBeenCalledTimes(1);

      const updateCall = mockOnBatchUpdate.mock.calls[0][0];
      expect(updateCall['element-1'].width).toBe(200);
      expect(updateCall['element-1'].height).toBe(100);
    });

    it('should fall back to previous node when active node is removed', () => {
      const nodeA = document.createElement('div');
      const nodeB = document.createElement('div');

      observer.add({ id: 'element-1', node: nodeA });
      const cleanupB = observer.add({ id: 'element-1', node: nodeB });

      const resizeObserver = MockResizeObserver.getLastInstance()!;

      // Remove the active node (nodeB)
      cleanupB();

      // nodeA should be re-activated
      expect(resizeObserver.isObserving(nodeA)).toBe(true);
      expect(resizeObserver.isObserving(nodeB)).toBe(false);
      expect(observer.has('element-1')).toBe(true);

      // Trigger resize on the re-activated nodeA
      resizeObserver.triggerResize(nodeA, 150, 75);
      expect(mockOnBatchUpdate).toHaveBeenCalledTimes(1);

      const updateCall = mockOnBatchUpdate.mock.calls[0][0];
      expect(updateCall['element-1'].width).toBe(150);
      expect(updateCall['element-1'].height).toBe(75);
    });

    it('should remove non-active node without affecting active observation', () => {
      const nodeA = document.createElement('div');
      const nodeB = document.createElement('div');

      const cleanupA = observer.add({ id: 'element-1', node: nodeA });
      observer.add({ id: 'element-1', node: nodeB });

      const resizeObserver = MockResizeObserver.getLastInstance()!;

      // Remove the non-active node (nodeA)
      cleanupA();

      // nodeB should still be active
      expect(resizeObserver.isObserving(nodeB)).toBe(true);
      expect(observer.has('element-1')).toBe(true);

      // Trigger resize on nodeB — should still work
      resizeObserver.triggerResize(nodeB, 300, 150);
      expect(mockOnBatchUpdate).toHaveBeenCalledTimes(1);
    });

    it('should handle removing all entries one by one (3-deep stack)', () => {
      const nodeA = document.createElement('div');
      const nodeB = document.createElement('div');
      const nodeC = document.createElement('div');

      observer.add({ id: 'element-1', node: nodeA });
      observer.add({ id: 'element-1', node: nodeB });
      const cleanupC = observer.add({ id: 'element-1', node: nodeC });

      const resizeObserver = MockResizeObserver.getLastInstance()!;

      // Remove C (active) → B becomes active
      cleanupC();
      expect(resizeObserver.isObserving(nodeC)).toBe(false);
      expect(resizeObserver.isObserving(nodeB)).toBe(true);
      expect(observer.has('element-1')).toBe(true);
    });

    it('should fully remove cell ID after all stack entries are cleaned up', () => {
      const nodeA = document.createElement('div');
      const nodeB = document.createElement('div');

      const cleanupA = observer.add({ id: 'element-1', node: nodeA });
      const cleanupB = observer.add({ id: 'element-1', node: nodeB });

      cleanupB();
      expect(observer.has('element-1')).toBe(true);

      cleanupA();
      expect(observer.has('element-1')).toBe(false);
    });

    it('should use the active node transform function, not a previous one', () => {
      const nodeA = document.createElement('div');
      const nodeB = document.createElement('div');
      const transformA = createAdditiveTransform(10);
      const transformB = createAdditiveTransform(50);

      observer.add({ id: 'element-1', node: nodeA, transform: transformA });
      observer.add({ id: 'element-1', node: nodeB, transform: transformB });

      const resizeObserver = MockResizeObserver.getLastInstance()!;
      resizeObserver.triggerResize(nodeB, 100, 50);

      expect(transformA).not.toHaveBeenCalled();
      expect(transformB).toHaveBeenCalled();

      const updateCall = mockOnBatchUpdate.mock.calls[0][0];
      expect(updateCall['element-1'].width).toBe(150); // 100 + 50
      expect(updateCall['element-1'].height).toBe(100); // 50 + 50
    });

    it('should use the previous transform after active node is removed', () => {
      const nodeA = document.createElement('div');
      const nodeB = document.createElement('div');
      const transformA = createAdditiveTransform(10);
      const transformB = createAdditiveTransform(50);

      observer.add({ id: 'element-1', node: nodeA, transform: transformA });
      const cleanupB = observer.add({ id: 'element-1', node: nodeB, transform: transformB });

      // Remove B, A becomes active with its own transform
      cleanupB();

      const resizeObserver = MockResizeObserver.getLastInstance()!;
      resizeObserver.triggerResize(nodeA, 100, 50);

      expect(transformA).toHaveBeenCalled();

      const updateCall = mockOnBatchUpdate.mock.calls[0][0];
      expect(updateCall['element-1'].width).toBe(110); // 100 + 10
      expect(updateCall['element-1'].height).toBe(60); // 50 + 10
    });

    it('cleanup should be idempotent', () => {
      const nodeA = document.createElement('div');

      const cleanup = observer.add({ id: 'element-1', node: nodeA });

      cleanup();
      expect(observer.has('element-1')).toBe(false);

      // Second cleanup call should not throw or cause side effects
      cleanup();
      expect(observer.has('element-1')).toBe(false);
    });

    it('should handle interleaved add/remove across different cell IDs', () => {
      const node1A = document.createElement('div');
      const node1B = document.createElement('div');
      const node2A = document.createElement('div');

      const cleanup1A = observer.add({ id: 'element-1', node: node1A });
      observer.add({ id: 'element-2', node: node2A });
      observer.add({ id: 'element-1', node: node1B });

      const resizeObserver = MockResizeObserver.getLastInstance()!;

      // element-1 active is node1B, element-2 active is node2A
      expect(resizeObserver.isObserving(node1B)).toBe(true);
      expect(resizeObserver.isObserving(node2A)).toBe(true);
      expect(resizeObserver.isObserving(node1A)).toBe(false);

      // Remove non-active node from element-1
      cleanup1A();
      expect(resizeObserver.isObserving(node1B)).toBe(true);
      expect(observer.has('element-1')).toBe(true);
      expect(observer.has('element-2')).toBe(true);
    });
  });

  describe('clean', () => {
    it('should remove all observed elements', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');

      observer.add({ id: 'element-1', node: element1 });
      observer.add({ id: 'element-2', node: element2 });

      expect(observer.has('element-1')).toBe(true);
      expect(observer.has('element-2')).toBe(true);

      observer.clean();

      expect(observer.has('element-1')).toBe(false);
      expect(observer.has('element-2')).toBe(false);
    });

    it('should clean all stacks including multi-entry stacks', () => {
      const nodeA = document.createElement('div');
      const nodeB = document.createElement('div');
      const nodeC = document.createElement('div');

      observer.add({ id: 'element-1', node: nodeA });
      observer.add({ id: 'element-1', node: nodeB });
      observer.add({ id: 'element-2', node: nodeC });

      observer.clean();

      expect(observer.has('element-1')).toBe(false);
      expect(observer.has('element-2')).toBe(false);
    });
  });

  describe('has', () => {
    it('should return true for registered elements', () => {
      const element = document.createElement('div');
      observer.add({ id: 'element-1', node: element });

      expect(observer.has('element-1')).toBe(true);
    });

    it('should return false for unregistered elements', () => {
      expect(observer.has('non-existent')).toBe(false);
    });
  });

  describe('processSizeChange branches', () => {
    it('skips when elements map does not contain the cell id', () => {
      mockElements.clear(); // ← getElements() returns an empty map
      const { element, resizeObserver } = addObservedElement();
      resizeObserver.triggerResize(element, 100, 50);
      expect(mockOnBatchUpdate).not.toHaveBeenCalled();
    });

    it('skips when cell transform already matches the measured size (within epsilon)', () => {
      mockGetCellTransform.mockImplementation((id: CellId) => ({
        width: 100,
        height: 50,
        x: 0,
        y: 0,
        angle: 0,
        element: { id } as dia.Element,
      }));
      const { element, resizeObserver } = addObservedElement();
      resizeObserver.triggerResize(element, 100, 50);
      expect(mockOnBatchUpdate).not.toHaveBeenCalled();
    });
  });

  describe('ResizeObserver entry edge cases', () => {
    it('skips entries with no borderBoxSize', () => {
      const { element, resizeObserver } = addObservedElement();

      // Construct an entry with empty borderBoxSize manually
      resizeObserver.triggerEntry({
        target: element,
        contentRect: {} as DOMRectReadOnly,
        borderBoxSize: [],
        contentBoxSize: [],
        devicePixelContentBoxSize: [],
      } as ResizeObserverEntry);

      expect(mockOnBatchUpdate).not.toHaveBeenCalled();
    });

    it('skips entries with zero size (e.g. display:none)', () => {
      const { element, resizeObserver } = addObservedElement();

      resizeObserver.triggerResize(element, 0, 0);
      expect(mockOnBatchUpdate).not.toHaveBeenCalled();
    });

    it('skips entries whose target is not currently observed', () => {
      const { resizeObserver } = addObservedElement();
      const otherNode = document.createElement('div');

      resizeObserver.triggerEntry({
        target: otherNode,
        contentRect: {} as DOMRectReadOnly,
        borderBoxSize: [{ inlineSize: 100, blockSize: 50 }],
        contentBoxSize: [{ inlineSize: 100, blockSize: 50 }],
        devicePixelContentBoxSize: [{ inlineSize: 100, blockSize: 50 }],
      } as ResizeObserverEntry);
      expect(mockOnBatchUpdate).not.toHaveBeenCalled();
    });
  });
});
