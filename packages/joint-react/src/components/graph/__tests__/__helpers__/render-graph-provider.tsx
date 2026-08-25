import React, { useContext, useState } from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { GraphProvider } from '../../graph-provider';
import { GraphStoreContext } from '../../../../context';
import type { GraphStore } from '../../../../store';
import type { CellRecord } from '../../../../types/cell.types';

export type Cells = ReadonlyArray<CellRecord<Record<string, unknown>, Record<string, unknown>>>;

interface StoreHolder {
  store: GraphStore | undefined;
}

interface ControlledGraphHandle {
  readonly store: GraphStore;
  readonly setCells: (next: Cells) => void;
}

function StoreProbe({ holder }: { readonly holder: StoreHolder }) {
  const store = useContext(GraphStoreContext);
  if (store) holder.store = store;
  return null;
}

async function waitForStoreWithCellCount(
  holder: StoreHolder,
  expectedCellCount: number
): Promise<GraphStore> {
  await waitFor(() => expect(holder.store).toBeDefined());
  const store = holder.store as GraphStore;
  await waitFor(() =>
    expect(store.graphProjection.cells.getSnapshot().length).toBe(expectedCellCount)
  );
  return store;
}

/**
 * Renders a controlled `GraphProvider` (cells + onCellsChange backed by React
 * state), waits for the store to expose the initial cells, and returns the
 * captured store plus an act-wrapped setter to push new cell snapshots.
 */
export async function renderControlledGraphProvider(
  initialCells: Cells,
  expectedInitialCellCount: number
): Promise<ControlledGraphHandle> {
  const holder: StoreHolder = { store: undefined };
  let applyCells!: (next: Cells) => void;

  function ControlledApp() {
    const [cells, setCells] = useState<Cells>(initialCells);
    applyCells = setCells;
    return (
      <GraphProvider
        cells={cells}
        onCellsChange={setCells as React.Dispatch<React.SetStateAction<Cells>>}
      >
        <StoreProbe holder={holder} />
      </GraphProvider>
    );
  }

  render(<ControlledApp />);
  const store = await waitForStoreWithCellCount(holder, expectedInitialCellCount);
  return {
    store,
    setCells: (next: Cells) => act(() => applyCells(next)),
  };
}

/**
 * Renders an uncontrolled `GraphProvider` seeded with `initialCells`, waits for
 * the store to expose the expected cell count, and returns the captured store.
 */
export async function renderUncontrolledGraphProvider(
  initialCells: Cells,
  expectedCellCount: number
): Promise<GraphStore> {
  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- per-mount mutable capture target
  const holder: StoreHolder = { store: undefined };
  render(
    <GraphProvider initialCells={initialCells}>
      <StoreProbe holder={holder} />
    </GraphProvider>
  );
  return waitForStoreWithCellCount(holder, expectedCellCount);
}
