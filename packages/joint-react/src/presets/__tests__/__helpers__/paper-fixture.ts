import { dia, shapes } from '@joint/core';

/** A rendered paper with two elements, a link between them, their views and a DOM cleanup. */
export interface PaperFixture {
  paper: dia.Paper;
  graph: dia.Graph;
  source: dia.Element;
  target: dia.Element;
  link: dia.Link;
  sourceView: dia.ElementView;
  targetView: dia.ElementView;
  linkView: dia.LinkView;
  cleanup: () => void;
}

interface PaperFixtureOptions {
  /** Adds a single `pin1` port to the target element, positioned on the given side. */
  targetPortSide?: 'left' | 'right' | 'top' | 'bottom';
  /** Extra paper constructor options (e.g. a custom `linkView` class). */
  paperOptions?: dia.Paper.Options;
}

/**
 * Builds a synchronous paper with a source rectangle at (0, 0), a target
 * rectangle at (200, 0) and a link connecting them. Call `cleanup` in a
 * `finally` block (or `afterEach`) to remove the paper and its container.
 */
export function setupPaperFixture(options: PaperFixtureOptions = {}): PaperFixture {
  const { targetPortSide, paperOptions } = options;

  const container = document.createElement('div');
  document.body.append(container);

  const graph = new dia.Graph({}, { cellNamespace: shapes });
  const paper = new dia.Paper({
    el: container,
    model: graph,
    cellViewNamespace: shapes,
    width: 800,
    height: 600,
    async: false,
    frozen: false,
    ...paperOptions,
  });

  const source = new shapes.standard.Rectangle({
    position: { x: 0, y: 0 },
    size: { width: 100, height: 100 },
  });

  const target = new shapes.standard.Rectangle({
    position: { x: 200, y: 0 },
    size: { width: 100, height: 100 },
    ...(targetPortSide
      ? {
          ports: {
            groups: { in: { position: targetPortSide } },
            items: [{ id: 'pin1', group: 'in' }],
          },
        }
      : {}),
  });

  const link = new shapes.standard.Link({
    source: { id: source.id },
    target: { id: target.id },
  });
  graph.addCells([source, target, link]);

  return {
    paper,
    graph,
    source,
    target,
    link,
    sourceView: paper.findViewByModel(source) as dia.ElementView,
    targetView: paper.findViewByModel(target) as dia.ElementView,
    linkView: paper.findViewByModel(link) as dia.LinkView,
    cleanup: () => {
      paper.remove();
      container.remove();
    },
  };
}
