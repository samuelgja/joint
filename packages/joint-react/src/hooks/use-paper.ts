import type { dia } from '@joint/core';
import { usePaperContext } from './use-paper-context';

/**
 * Return JointJS `dia.Paper` instance from the current `Paper` context.
 * @see https://docs.jointjs.com/learn/quickstart/paper
 * @group Hooks
 * ```tsx
 * import { usePaper } from '@joint/react';
 * const paper = usePaper();
 * ```
 * @param id - Optional ID of the Paper to get the paper from. If not provided, it will return the paper from the nearest Paper context.
 * @returns - The jointjs paper instance.
 */
export function usePaper(id?: string): dia.Paper | undefined {
  const viewConfig = usePaperContext(id);
  return viewConfig?.paper;
}
