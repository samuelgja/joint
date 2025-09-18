/* eslint-disable react-hooks/rules-of-hooks */
import { useDiagramStore } from './use-diagram-store';
import { useContext, useSyncExternalStore } from 'react';
import { DiagramViewContext } from '../context';

/**
 * Hook to access the current Diagram View context or a specific view by id from the Diagram Store.
 * If used outside of a Diagram View context, it will try to get the view from the store using the provided id.
 * @param id - Optional id of the view to retrieve from the store if not in a context.
 * @returns The current Diagram View context or the view with the specified id from the store, or null if not found.
 */
export function useDiagramView<Id extends string | undefined = undefined>(
  id?: Id
): DiagramViewContext | null {
  const ctx = useContext(DiagramViewContext);
  if (ctx) {
    return ctx;
  }
  // We can run it conditionally because the context is always defined when used
  const { subscribeToView, getView } = useDiagramStore();
  const viewConfig = useSyncExternalStore(
    (onStoreChange) => subscribeToView(id, onStoreChange),
    () => getView(id),
    () => getView(id)
  );
  return viewConfig || null;
}
