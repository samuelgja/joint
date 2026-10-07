/* eslint-disable no-console */
/**
 * Mount cost of a paper rendering N elements (and N-1 links) through
 * `renderElement`, the path every diagram pays on first paint. Measured end to
 * end (render → every element's content is in the document), then unmounted,
 * for both renderers:
 * - `<Paper>`: JointJS creates the cell views, React portals content into them;
 * - `<ReactPaper>`: React renders every cell itself.
 */
import { describe, test, expect } from '@jest/globals';
import { act, render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { GraphProvider, Paper } from '../src/components';
import { ReactPaper } from '../src/components/react-paper/react-paper';
import { ELEMENT_MODEL_TYPE } from '../src/mvc/element-model';
import { LINK_MODEL_TYPE } from '../src/mvc/link-model';
import type { CellRecord } from '../src/types/cell.types';

const SIZES = [100, 1000] as const;
const RUNS = 7;
const PAPER_STYLE = { width: 800, height: 600 } as const;
const MAX_SETTLE_ROUNDS = 200;

function createCells(size: number): CellRecord[] {
  const cells: CellRecord[] = [];
  for (let index = 0; index < size; index++) {
    cells.push({
      id: `e${index}`,
      type: ELEMENT_MODEL_TYPE,
      position: { x: (index % 40) * 20, y: Math.floor(index / 40) * 20 },
      size: { width: 10, height: 10 },
      data: { label: `n${index}` },
    } as CellRecord);
  }
  for (let index = 1; index < size; index++) {
    cells.push({
      id: `l${index}`,
      type: LINK_MODEL_TYPE,
      source: { id: `e${index - 1}` },
      target: { id: `e${index}` },
    } as CellRecord);
  }
  return cells;
}

function RenderElement({ label }: Readonly<{ label?: string }>) {
  return <rect data-bench-node={label} width={10} height={10} />;
}

interface PaperLikeOptions {
  readonly style: typeof PAPER_STYLE;
  readonly renderElement: typeof RenderElement;
}

const RENDERERS: ReadonlyArray<readonly [string, ComponentType<PaperLikeOptions>]> = [
  ['Paper', Paper],
  ['ReactPaper', ReactPaper],
];

async function mountOnce(
  PaperLike: ComponentType<PaperLikeOptions>,
  cells: CellRecord[],
  size: number
): Promise<number> {
  const start = performance.now();
  const view = render(
    <GraphProvider initialCells={cells}>
      <PaperLike style={PAPER_STYLE} renderElement={RenderElement} />
    </GraphProvider>
  );
  let rounds = 0;
  while (
    view.container.querySelectorAll('.joint-element [data-bench-node]').length < size &&
    rounds < MAX_SETTLE_ROUNDS
  ) {
    rounds++;
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
  const elapsed = performance.now() - start;
  expect(view.container.querySelectorAll('.joint-element [data-bench-node]').length).toBe(size);
  view.unmount();
  return elapsed;
}

describe('paper-mount: render N elements through renderElement', () => {
  for (const [name, PaperLike] of RENDERERS) {
    for (const size of SIZES) {
      test(`${name} n=${size}`, async () => {
        const cells = createCells(size);
        await mountOnce(PaperLike, cells, size); // warm-up (JIT, module init)
        const samples: number[] = [];
        for (let run = 0; run < RUNS; run++) {
          samples.push(await mountOnce(PaperLike, cells, size));
        }
        samples.sort((a, b) => a - b);
        const median = samples[Math.floor(samples.length / 2)];
        console.log(
          `  paper-mount/${name}/n=${size}: median ${median.toFixed(1)}ms (min ${samples[0].toFixed(1)}ms, max ${samples.at(-1)?.toFixed(1)}ms)`
        );
      }, 300_000);
    }
  }
});
