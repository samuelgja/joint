import type { dia } from '@joint/core';
import { useDiagramView } from './use-diagram-view';

/**
 * Return JointJS `dia.Paper` instance from the current `Diagram.View` context.
 * @see https://docs.jointjs.com/learn/quickstart/paper
 * @group Hooks
 * ```tsx
 * import { usePaper } from '@joint/react';
 * const paper = usePaper();
 * ```
 * @param id - Optional ID of the Diagram.View to get the paper from. If not provided, it will return the paper from the nearest Diagram.View context.
 * @returns - The jointjs paper instance.
 */
export function usePaper(id?: string): dia.Paper | undefined {
  const viewConfig = useDiagramView(id);
  return viewConfig?.paper;
}
