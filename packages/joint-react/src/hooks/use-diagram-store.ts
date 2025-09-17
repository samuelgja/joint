import { useContext } from 'react';
import { DiagramContext, type StoreContext } from '../context/diagram-context';
import type { dia } from '@joint/core';

/**
 * Custom hook to use a JointJS `Diagram` graph store.
 * It must be used inside the `DiagramProvider`.
 * @group Hooks
 * @internal
 * @returns The JointJS diagram store.
 * @throws An error if the hook is used outside of a DiagramProvider.
 */
export function useDiagramStore<Graph extends dia.Graph = dia.Graph>(): StoreContext<Graph> {
  const store = useContext(DiagramContext);
  if (!store) {
    throw new Error('useDiagramStore must be used within a DiagramProvider');
  }
  return store as StoreContext<Graph>;
}
