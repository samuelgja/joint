import React from 'react';
import { act, render } from '@testing-library/react';
import { GraphProvider } from '../../../components/graph/graph-provider';
import { CellIdContext } from '../../../context';
import { useGraphStore } from '../../use-graph-store';
import type { CellRecord } from '../../../types/cell.types';
import { flushMicrotasks } from './cell-fixtures';

/** Graph store handle captured by {@link createStoreProbeWrapper}. */
export type GraphStoreHandle = ReturnType<typeof useGraphStore>;

/**
 * Flushes pending graph-store commit microtasks inside React `act`.
 * @returns promise resolved once the commit settled
 */
export function settle(): Promise<void> {
  return act(async () => {
    await flushMicrotasks();
  });
}

/**
 * Runs a graph/collection mutation inside `act` and flushes the resulting commit.
 * @param mutate - synchronous mutation to apply
 * @returns promise resolved once the commit settled
 */
export function graphAct(mutate: () => void): Promise<void> {
  return act(async () => {
    mutate();
    await flushMicrotasks();
  });
}

/**
 * Creates a `GraphProvider` wrapper that also mounts a probe capturing the
 * graph store, so tests can mutate the graph directly.
 * @param initialCells - cells the provider starts with
 * @returns the wrapper component plus a ref-style handle to the captured store
 */
export function createStoreProbeWrapper(initialCells: readonly CellRecord[]): {
  Wrapper: React.JSXElementConstructor<{ readonly children: React.ReactNode }>;
  store: { current: GraphStoreHandle | undefined };
} {
  const store: { current: GraphStoreHandle | undefined } = { current: undefined };
  function StoreProbe() {
    store.current = useGraphStore();
    return null;
  }
  function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <GraphProvider initialCells={initialCells}>
        <StoreProbe />
        {children}
      </GraphProvider>
    );
  }
  return { Wrapper, store };
}

/**
 * Renders children inside `GraphProvider` scoped to a `CellIdContext` id.
 * @param initialCells - cells the provider starts with
 * @param cellId - id provided through `CellIdContext`
 * @param children - node rendered inside the contexts
 * @returns the testing-library render result
 */
export function renderInCellContext(
  initialCells: readonly CellRecord[],
  cellId: string,
  children: React.ReactNode
): ReturnType<typeof render> {
  return render(
    <GraphProvider initialCells={initialCells}>
      <CellIdContext.Provider value={cellId}>{children}</CellIdContext.Provider>
    </GraphProvider>
  );
}
