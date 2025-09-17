import type { dia } from '@joint/core';
import { useDiagramView } from './use-diagram-view';

/**
 * Return jointjs paper instance from the paper context.
 * @see https://docs.jointjs.com/learn/quickstart/paper
 * @group Hooks
 * ```tsx
 * import { usePaper } from '@joint/react';
 * const paper = usePaper();
 * ```
 * @returns - The jointjs paper instance.
 * @throws - If the hook is not used inside the paper context.
 */
export function usePaper(): dia.Paper | undefined {
  const viewConfig = useDiagramView();
  return viewConfig?.paper;
}
