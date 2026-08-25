import { waitFor } from '@testing-library/react';
import { ELEMENT_MODEL_TYPE } from '../../../mvc/element-model';
import { LINK_MODEL_TYPE } from '../../../mvc/link-model';
import {
  renderControlledGraphProvider,
  renderUncontrolledGraphProvider,
  type Cells,
} from './__helpers__/render-graph-provider';

function sizedElementCell(id: string, x: number, y: number): Cells[number] {
  return {
    id,
    type: ELEMENT_MODEL_TYPE,
    position: { x, y },
    size: { width: 10, height: 10 },
  } as Cells[number];
}

describe('GraphProvider controlled / uncontrolled', () => {
  it('controlled: pushing a new cells array replaces the graph state', async () => {
    const { store, setCells } = await renderControlledGraphProvider(
      [sizedElementCell('e1', 0, 0)],
      1
    );

    setCells([
      sizedElementCell('e1', 0, 0),
      sizedElementCell('e2', 50, 50),
      {
        id: 'l1',
        type: LINK_MODEL_TYPE,
        source: { id: 'e1' },
        target: { id: 'e2' },
      } as Cells[number],
    ]);

    await waitFor(() => expect(store.graphProjection.cells.getSnapshot().length).toBe(3));
    expect(store.graphProjection.cells.has('l1')).toBe(true);
  });

  it('uncontrolled: initialCells seed the graph but subsequent state does not re-sync from React', async () => {
    await renderUncontrolledGraphProvider(
      [sizedElementCell('e1', 0, 0), sizedElementCell('e2', 50, 50)],
      2
    );
  });
});
