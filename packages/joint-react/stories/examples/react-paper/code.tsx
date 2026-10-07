import { useCallback, useState } from 'react';
import {
  GraphProvider,
  ReactPaper,
  linkRoutingOrthogonal,
  useCell,
  useCellId,
  useGraph,
  type CellRecord,
} from '@joint/react';

interface NodeData {
  readonly label: string;
  readonly clicks: number;
}

const NODE_WIDTH = 140;
const NODE_HEIGHT = 48;
const PAPER_STYLE = { width: '100%', height: 400 } as const;
const LINK_ROUTING = linkRoutingOrthogonal();
const ARROW = { color: '#ed2637', targetMarker: 'arrow' } as const;
const NODE_SIZE = { width: NODE_WIDTH, height: NODE_HEIGHT };

const initialCells: ReadonlyArray<CellRecord<NodeData>> = [
  { id: 'start', type: 'element', position: { x: 40, y: 40 }, size: NODE_SIZE, data: { label: 'Start', clicks: 0 } },
  { id: 'review', type: 'element', position: { x: 300, y: 160 }, size: NODE_SIZE, data: { label: 'Review', clicks: 0 } },
  { id: 'done', type: 'element', position: { x: 560, y: 280 }, size: NODE_SIZE, data: { label: 'Done', clicks: 0 } },
  { id: 'start-review', type: 'link', source: { id: 'start' }, target: { id: 'review' }, style: ARROW },
  {
    id: 'review-done',
    type: 'link',
    source: { id: 'review' },
    target: { id: 'done' },
    style: ARROW,
    labelMap: { status: { text: 'approved' } },
  },
];

// A plain React component: its `onClick` is an ordinary React event, and a
// drag that starts on the button moves the node without clicking it.
function Node({ label, clicks }: Readonly<NodeData>) {
  const id = useCellId();
  const { graph } = useGraph();
  const isRotated = useCell((cell) => cell.angle !== 0);
  const countClick = useCallback(() => {
    graph.getCell(id)?.prop('data/clicks', clicks + 1);
  }, [clicks, graph, id]);

  return (
    <>
      <rect
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        rx={8}
        fill="#151b22"
        stroke={isRotated ? '#ff9505' : '#ed2637'}
        strokeWidth={2}
      />
      <text x={16} y={NODE_HEIGHT / 2} fill="#ffffff" dominantBaseline="central" pointerEvents="none">
        {label}
      </text>
      <foreignObject x={NODE_WIDTH - 52} y={10} width={44} height={28}>
        <button type="button" onClick={countClick}>
          {clicks}
        </button>
      </foreignObject>
    </>
  );
}

export default function App() {
  const [zoom, setZoom] = useState(1);
  const zoomIn = useCallback(() => setZoom((value) => Math.min(2, value + 0.25)), []);
  const zoomOut = useCallback(() => setZoom((value) => Math.max(0.5, value - 0.25)), []);

  return (
    <GraphProvider initialCells={initialCells}>
      <ReactPaper
        style={PAPER_STYLE}
        renderElement={Node}
        linkRouting={LINK_ROUTING}
        transform={`scale(${zoom})`}
      >
        <div>
          <button type="button" onClick={zoomOut}>
            −
          </button>
          <button type="button" onClick={zoomIn}>
            +
          </button>
        </div>
      </ReactPaper>
    </GraphProvider>
  );
}
