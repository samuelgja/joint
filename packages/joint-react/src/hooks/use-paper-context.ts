/* eslint-disable react-hooks/rules-of-hooks */
import { useGraphStore } from './use-graph-store';
import { useContext, useSyncExternalStore } from 'react';
import { PaperContext } from '../context';

/**
 * Hook to access the current GraphProvider View context or a specific view by id from the GraphProvider Store.
 * If used outside of a GraphProvider View context, it will try to get the view from the store using the provided id.
 * @param id - Optional id of the view to retrieve from the store if not in a context.
 * @returns The current GraphProvider View context or the view with the specified id from the store, or null if not found.
 */
export function usePaperContext<Id extends string | undefined = undefined>(
  id?: Id
): PaperContext | null {
  const ctx = useContext(PaperContext);
  if (ctx) {
    return ctx;
  }
  // We can run it conditionally because the context is always defined when used
  const { subscribeToView, getView } = useGraphStore();
  const viewConfig = useSyncExternalStore(
    (onStoreChange) => subscribeToView(id, onStoreChange),
    () => getView(id),
    () => getView(id)
  );
  return viewConfig || null;
}
