function createEntry(target: Element, width: number, height: number): ResizeObserverEntry {
  return {
    target,
    contentRect: {
      width,
      height,
      top: 0,
      left: 0,
      bottom: height,
      right: width,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    },
    borderBoxSize: [{ inlineSize: width, blockSize: height }],
    contentBoxSize: [{ inlineSize: width, blockSize: height }],
    devicePixelContentBoxSize: [{ inlineSize: width, blockSize: height }],
  } as ResizeObserverEntry;
}

/**
 * Deterministic ResizeObserver replacement for JSDOM: records every created
 * instance and lets tests fire resize callbacks manually via `triggerResize`.
 */
export class MockResizeObserver {
  static readonly instances: MockResizeObserver[] = [];
  readonly callback: ResizeObserverCallback;
  private observedElements = new Map<Element, ResizeObserverEntry>();

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    MockResizeObserver.instances.push(this);
  }

  observe(target: Element) {
    this.observedElements.set(target, createEntry(target, 100, 50));
  }

  unobserve(target: Element) {
    this.observedElements.delete(target);
  }

  disconnect() {
    this.observedElements.clear();
  }

  /** Simulates a browser resize notification for `target`. */
  triggerResize(target: Element, width: number, height: number) {
    const entry = createEntry(target, width, height);
    this.observedElements.set(target, entry);
    this.callback([entry], this as unknown as ResizeObserver);
  }

  /** Fires the observer callback with a hand-crafted entry (edge-case tests). */
  triggerEntry(entry: ResizeObserverEntry) {
    this.callback([entry], this as unknown as ResizeObserver);
  }

  isObserving(target: Element): boolean {
    return this.observedElements.has(target);
  }

  static getLastInstance(): MockResizeObserver | undefined {
    return MockResizeObserver.instances.at(-1);
  }

  /** Clears recorded instances and installs the mock as the global ResizeObserver. */
  static install() {
    MockResizeObserver.instances.length = 0;
    globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
  }
}
