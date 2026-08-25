import { dia } from '@joint/core';
import { DEFAULT_CELL_NAMESPACE } from '../../graph-store';
import { ELEMENT_MODEL_TYPE } from '../../../mvc/element-model';
import { LINK_MODEL_TYPE } from '../../../mvc/link-model';

/** Creates a graph wired with the default React cell namespace. */
export function createTestGraph(): dia.Graph {
  return new dia.Graph({}, { cellNamespace: DEFAULT_CELL_NAMESPACE });
}

/** Flushes pending microtasks so scheduled/commit callbacks execute. */
export const flushMicrotasks = () => new Promise<void>((resolve) => queueMicrotask(resolve));

/** Adds a React element cell to the graph. */
export function addElement(
  graph: dia.Graph,
  id: string,
  x = 10,
  y = 20,
  width = 100,
  height = 50
): void {
  graph.addCell({ id, type: ELEMENT_MODEL_TYPE, position: { x, y }, size: { width, height } });
}

/** Adds a React link cell connecting `source` to `target`. */
export function addLink(graph: dia.Graph, id: string, source: string, target: string): void {
  graph.addCell({
    id,
    type: LINK_MODEL_TYPE,
    source: { id: source },
    target: { id: target },
  });
}

/** Adds elements `a` and `b` plus React link `l1` between them in a single batch. */
export function addLinkedElementTriple(graph: dia.Graph): void {
  graph.addCells([
    {
      id: 'a',
      type: ELEMENT_MODEL_TYPE,
      position: { x: 0, y: 0 },
      size: { width: 10, height: 10 },
    },
    {
      id: 'b',
      type: ELEMENT_MODEL_TYPE,
      position: { x: 50, y: 0 },
      size: { width: 10, height: 10 },
    },
    {
      id: 'l1',
      type: LINK_MODEL_TYPE,
      source: { id: 'a' },
      target: { id: 'b' },
    },
  ]);
}

/**
 * Seeds elements `a` and `b` plus a `standard.Link` `l1` between them.
 * Returns the link instance so tests can stub its view lookup.
 */
export function seedElementPairWithLink(graph: dia.Graph): dia.Link {
  graph.addCell({
    id: 'a',
    type: ELEMENT_MODEL_TYPE,
    position: { x: 0, y: 0 },
    size: { width: 10, height: 10 },
  });
  graph.addCell({
    id: 'b',
    type: ELEMENT_MODEL_TYPE,
    position: { x: 50, y: 0 },
    size: { width: 10, height: 10 },
  });
  const link = new dia.Link({
    id: 'l1',
    type: 'standard.Link',
    source: { id: 'a' },
    target: { id: 'b' },
  });
  graph.addCell(link);
  return link;
}
