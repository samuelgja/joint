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
 * @returns - The jointjs paper instance.
 */
export function usePaper(): dia.Paper | undefined {
  const viewConfig = useDiagramView();
  return viewConfig?.paper;
}
