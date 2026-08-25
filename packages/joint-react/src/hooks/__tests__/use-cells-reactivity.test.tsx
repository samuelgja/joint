/* eslint-disable sonarjs/no-nested-functions */
import { renderHook } from '@testing-library/react';
import { mvc, type dia } from '@joint/core';
import { useCells } from '../use-cells';
import type { CellId } from '../../types/cell.types';
import { CELLS_ABC, makeElement, pickCellIds as ids } from './__helpers__/cell-fixtures';
import { createStoreProbeWrapper, graphAct, settle } from './__helpers__/cell-render';

const { Wrapper, store } = createStoreProbeWrapper(CELLS_ABC);

const makeCollection = () => new mvc.Collection<dia.Cell>();

describe('useCells (ids array form) — graph membership reactivity', () => {
  it('picks up a subscribed id that did not exist at subscribe time', async () => {
    // Subscribe to 'x' before it exists. The per-id subscription must fire when
    // the matching cell is later added to the graph.
    const { result } = renderHook(() => useCells(['a', 'x']), { wrapper: Wrapper });
    await settle();
    expect(ids(result.current)).toEqual(['a']);

    await graphAct(() => store.current!.graph.addCell(makeElement('x', 200)));
    expect(ids(result.current)).toEqual(['a', 'x']);
  });

  it('drops a subscribed id when its cell is removed from the graph', async () => {
    const { result } = renderHook(() => useCells(['a', 'b']), { wrapper: Wrapper });
    await settle();
    expect(ids(result.current)).toEqual(['a', 'b']);

    await graphAct(() => store.current!.graph.getCell('b')?.remove());
    expect(ids(result.current)).toEqual(['a']);
  });

  it('reacts to remove → re-add of the same subscribed id', async () => {
    const { result } = renderHook(() => useCells(['a', 'b']), { wrapper: Wrapper });
    await settle();

    await graphAct(() => store.current!.graph.getCell('b')?.remove());
    expect(ids(result.current)).toEqual(['a']);

    await graphAct(() => store.current!.graph.addCell(makeElement('b', 50)));
    expect(ids(result.current)).toEqual(['a', 'b']);
  });

  it('re-subscribes when the ids array prop itself gains an id', async () => {
    const { result, rerender } = renderHook(({ list }: { list: readonly CellId[] }) => useCells(list), {
      wrapper: Wrapper,
      initialProps: { list: ['a', 'b'] as readonly CellId[] },
    });
    await settle();
    expect(ids(result.current)).toEqual(['a', 'b']);

    // Caller adds 'c' to the tracked id list.
    rerender({ list: ['a', 'b', 'c'] });
    await settle();
    expect(ids(result.current)).toEqual(['a', 'b', 'c']);

    // A change to the newly-tracked 'c' must now trigger an update.
    await graphAct(() => store.current!.graph.getCell('c')?.set('position', { x: 777, y: 0 }));
    expect(result.current.find((cell) => cell.id === 'c')?.position).toEqual({ x: 777, y: 0 });
  });

  it('stops reacting to an id removed from the ids array prop', async () => {
    const renderSpy = jest.fn();
    const { rerender } = renderHook(
      ({ list }: { list: readonly CellId[] }) => {
        renderSpy();
        return useCells(list);
      },
      { wrapper: Wrapper, initialProps: { list: ['a', 'b'] as readonly CellId[] } }
    );
    await settle();

    // Drop 'b' from the tracked list.
    rerender({ list: ['a'] });
    await settle();
    const baseline = renderSpy.mock.calls.length;

    // Mutating the no-longer-tracked 'b' must not re-render.
    await graphAct(() => store.current!.graph.getCell('b')?.set('position', { x: 1, y: 1 }));
    expect(renderSpy.mock.calls.length).toBe(baseline);
  });
});

describe('useCells (single id form) — graph membership reactivity', () => {
  it('resolves a single id that is added after subscribe time', async () => {
    const { result } = renderHook(() => useCells('z'), { wrapper: Wrapper });
    await settle();
    expect(result.current).toBeUndefined();

    await graphAct(() => store.current!.graph.addCell(makeElement('z', 300)));
    expect(result.current?.id).toBe('z');
  });

  it('becomes undefined when the tracked id is removed', async () => {
    const { result } = renderHook(() => useCells('a'), { wrapper: Wrapper });
    await settle();
    expect(result.current?.id).toBe('a');

    await graphAct(() => store.current!.graph.getCell('a')?.remove());
    expect(result.current).toBeUndefined();
  });
});

describe('useCells (collection form) — interleaved membership reactivity', () => {
  it('tracks add then remove of the same id', async () => {
    const collection = makeCollection();
    const { result } = renderHook(() => useCells(collection, ids), { wrapper: Wrapper });
    await settle();
    expect(result.current).toEqual([]);

    await graphAct(() => collection.add(store.current!.graph.getCell('a')));
    expect(result.current).toEqual(['a']);

    await graphAct(() => collection.remove(store.current!.graph.getCell('a')));
    expect(result.current).toEqual([]);
  });

  it('tracks multiple adds and a single remove without losing the rest', async () => {
    const collection = makeCollection();
    const { result } = renderHook(() => useCells(collection, ids), { wrapper: Wrapper });
    await settle();

    await graphAct(() => {
      collection.add(store.current!.graph.getCell('a'));
      collection.add(store.current!.graph.getCell('b'));
      collection.add(store.current!.graph.getCell('c'));
    });
    expect(result.current).toEqual(['a', 'b', 'c']);

    await graphAct(() => collection.remove(store.current!.graph.getCell('b')));
    expect(result.current).toEqual(['a', 'c']);
  });

  it('no-selector array form reflects add and remove', async () => {
    const collection = makeCollection();
    const { result } = renderHook(() => useCells(collection), { wrapper: Wrapper });
    await settle();
    expect(result.current).toHaveLength(0);

    await graphAct(() => {
      collection.add(store.current!.graph.getCell('a'));
      collection.add(store.current!.graph.getCell('b'));
    });
    expect(ids(result.current)).toEqual(['a', 'b']);

    await graphAct(() => collection.remove(store.current!.graph.getCell('a')));
    expect(ids(result.current)).toEqual(['b']);
  });

  it('reacts to a cell change after it was re-added to the collection', async () => {
    const collection = makeCollection();
    const { result } = renderHook(
      () => useCells(collection, (cells) => cells.map((cell) => cell.position?.x ?? -1)),
      { wrapper: Wrapper }
    );
    await settle();

    await graphAct(() => collection.add(store.current!.graph.getCell('a')));
    await graphAct(() => collection.remove(store.current!.graph.getCell('a')));
    await graphAct(() => collection.add(store.current!.graph.getCell('a')));

    await graphAct(() => store.current!.graph.getCell('a')?.set('position', { x: 42, y: 0 }));
    expect(result.current).toEqual([42]);
  });
});
