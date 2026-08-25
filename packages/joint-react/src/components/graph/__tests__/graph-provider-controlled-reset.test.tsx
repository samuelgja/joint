import { act, waitFor } from '@testing-library/react';
import { ELEMENT_MODEL_TYPE } from '../../../mvc/element-model';
import { LINK_MODEL_TYPE } from '../../../mvc/link-model';
import {
  renderControlledGraphProvider,
  type Cells,
} from './__helpers__/render-graph-provider';

function labeledElementCell(id: string, x: number, y: number, label: string): Cells[number] {
  return {
    id,
    type: ELEMENT_MODEL_TYPE,
    position: { x, y },
    data: { label },
  } as Cells[number];
}

const INITIAL_CELLS: Cells = [
  labeledElementCell('a', 60, 60, 'A'),
  labeledElementCell('b', 240, 60, 'B'),
  {
    id: 'a-b',
    type: LINK_MODEL_TYPE,
    source: { id: 'a' },
    target: { id: 'b' },
  } as Cells[number],
];

describe('controlled GraphProvider: reset preserves measured size', () => {
  it('does not collapse element size to 0x0 when reset cells omit size', async () => {
    const { store, setCells } = await renderControlledGraphProvider(INITIAL_CELLS, 3);

    const elementA = store.graph.getCell('a');
    expect(elementA?.isElement()).toBe(true);
    act(() => {
      (elementA as { set: (key: string, value: unknown) => void }).set('size', {
        width: 100,
        height: 40,
      });
    });

    expect((elementA as { size: () => { width: number; height: number } }).size()).toEqual({
      width: 100,
      height: 40,
    });

    setCells([...INITIAL_CELLS, labeledElementCell('task-1', 140, 200, 'Task 1')]);
    await waitFor(() => expect(store.graphProjection.cells.getSnapshot().length).toBe(4));

    setCells(INITIAL_CELLS);
    await waitFor(() => expect(store.graphProjection.cells.getSnapshot().length).toBe(3));
    expect(store.graph.getCell('task-1')).toBeUndefined();

    const sizeAfterReset = (
      elementA as { size: () => { width: number; height: number } }
    ).size();
    expect(sizeAfterReset).toEqual({ width: 100, height: 40 });
  });

  it('removes every cell that disappears from the controlled snapshot in a single update', async () => {
    const { store, setCells } = await renderControlledGraphProvider(
      [
        ...INITIAL_CELLS,
        labeledElementCell('task-1', 140, 200, 'Task 1'),
        labeledElementCell('task-2', 220, 200, 'Task 2'),
      ],
      5
    );

    setCells(INITIAL_CELLS);
    await waitFor(() => expect(store.graph.getCell('task-1')).toBeUndefined());
    await waitFor(() => expect(store.graph.getCell('task-2')).toBeUndefined());
    expect(store.graphProjection.cells.getSnapshot().length).toBe(3);
    expect(store.graphProjection.cells.has('task-1')).toBe(false);
    expect(store.graphProjection.cells.has('task-2')).toBe(false);
  });
});
