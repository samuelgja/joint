/* eslint-disable react-perf/jsx-no-new-function-as-prop -- render-count test harness; inline props are the point, not a production concern */
/**
 * Real-case correctness + performance-contract tests for the lazy Map-backed
 * cells container. Performance is asserted OBSERVABLY via render counts (which
 * are deterministic), not via timing: the whole point of the refactor is that a
 * drag re-renders O(1) components, not O(n), and does no id-list work.
 */
import React from 'react';
import { render, act } from '@testing-library/react';
import { useCells } from '../use-cells';
import { useCellIds } from '../use-cell-ids';
import type { CellId, CellRecord } from '../../types/cell.types';
import { flushMicrotasks, makeElement, makeLink } from './__helpers__/cell-fixtures';
import { createStoreProbeWrapper, graphAct, type GraphStoreHandle } from './__helpers__/cell-render';

/** Re-renders (and counts) only when its own cell's position changes. */
function CellPositionProbe({ id, onRender }: { readonly id: string; readonly onRender: () => void }) {
  useCells(id, (cell) => (cell as CellRecord | undefined)?.position?.x ?? -1);
  onRender();
  return null;
}

/** Re-renders (and counts) only when the id SET changes (add/remove). */
function IdListProbe({ onRender }: { readonly onRender: () => void }) {
  useCellIds();
  onRender();
  return null;
}

/** Mounts a GraphProvider (with a store probe) and settles the initial commit. */
async function mountGraph(
  cells: readonly CellRecord[],
  children?: React.ReactNode
): Promise<{ current: GraphStoreHandle | undefined }> {
  const { Wrapper, store } = createStoreProbeWrapper(cells);
  await act(async () => {
    render(<Wrapper>{children}</Wrapper>);
    await flushMicrotasks();
  });
  return store;
}

describe('cells container — real-case fine-grained render behaviour (O(1) drag)', () => {
  it('dragging one cell re-renders ONLY that cell — not siblings, not the id list', async () => {
    const renders = { a: 0, b: 0, c: 0, list: 0 };
    const store = await mountGraph(
      [makeElement('a', 0), makeElement('b', 50), makeElement('c', 100)],
      <>
        <CellPositionProbe id="a" onRender={() => (renders.a += 1)} />
        <CellPositionProbe id="b" onRender={() => (renders.b += 1)} />
        <CellPositionProbe id="c" onRender={() => (renders.c += 1)} />
        <IdListProbe onRender={() => (renders.list += 1)} />
      </>
    );
    const base = { ...renders };

    // A drag: change only cell 'a'.
    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 999, y: 0 }));

    expect(renders.a).toBeGreaterThan(base.a); // the dragged cell re-rendered
    expect(renders.b).toBe(base.b); // sibling did NOT (per-id subscription)
    expect(renders.c).toBe(base.c); // sibling did NOT
    expect(renders.list).toBe(base.list); // id list did NOT (data-only → getIds stable)
  });

  it('a data-only drag does no id-list re-render even across many frames', async () => {
    const renders = { list: 0 };
    const store = await mountGraph(
      [makeElement('a', 0), makeElement('b', 50)],
      <IdListProbe onRender={() => (renders.list += 1)} />
    );
    const base = renders.list;

    for (let frame = 1; frame <= 10; frame++) {
      await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: frame, y: 0 }));
    }
    // 10 drag frames → zero id-list re-renders (the O(1) property).
    expect(renders.list).toBe(base);
  });

  it('adding a cell re-renders the id list but NOT the existing per-id subscribers', async () => {
    const renders = { a: 0, list: 0 };
    const store = await mountGraph(
      [makeElement('a', 0)],
      <>
        <CellPositionProbe id="a" onRender={() => (renders.a += 1)} />
        <IdListProbe onRender={() => (renders.list += 1)} />
      </>
    );
    const base = { ...renders };

    await graphAct(() => store.current!.graph.addCell(makeElement('d', 200)));

    expect(renders.list).toBeGreaterThan(base.list); // structural change → id list re-renders
    expect(renders.a).toBe(base.a); // unaffected cell did NOT re-render
  });
});

describe('cells container — real-graph correctness (getIds/getSnapshot never tear)', () => {
  it('a new link swept in by a moved element (changed bucket) still appears in getIds', async () => {
    const store = await mountGraph([makeElement('a', 0), makeElement('b', 100)]);

    // Move an element AND add a link connecting it in the SAME tick — this routes
    // the new link through the `changed` bucket (connected-links sweep) rather
    // than `added`. getIds() must not go stale relative to getSnapshot().
    await graphAct(() => {
      store.current!.graph.getCell('a')?.set('position', { x: 5, y: 5 });
      store.current!.graph.addCell(makeLink('l1', 'a', 'b'));
    });

    const container = store.current!.graphProjection.cells;
    const ids = container.getIds();
    const snapshotIds = container.getSnapshot().map((cell) => cell.id as CellId);
    expect(ids).toContain('l1'); // the fixed bug: getIds must include the new link
    expect(snapshotIds).toContain('l1');
    // The two views agree — no tearing.
    expect(new Set(ids)).toEqual(new Set(snapshotIds));
    expect(container.has('l1')).toBe(true);
  });

  it('whole-list consumers within one commit share the same snapshot reference', async () => {
    const store = await mountGraph([makeElement('a', 0), makeElement('b', 100)]);
    const container = store.current!.graphProjection.cells;
    // Two independent reads after the same commit return the identical array.
    expect(container.getSnapshot()).toBe(container.getSnapshot());
  });
});
