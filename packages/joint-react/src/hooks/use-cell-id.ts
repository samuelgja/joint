import type { dia } from '@joint/core';
import { useContext } from 'react';
import { CellIdContext } from '../context';

/**
 * Returns the current cell id within `Diagram.View` element rendering.
 * Use this only inside the `renderElement` function.
 * @returns The current cell id.
 * @throws If called outside the view context.
 * @group hooks
 * @example
 * ```ts
 * const cellId = useCellId();
 * ```
 */
export function useCellId(): dia.Cell.ID {
  const id = useContext(CellIdContext);
  if (id === undefined) {
    throw new Error('useCellId must be used inside Diagram.View renderElement');
  }
  return id;
}
