import '../index.css';
import {
  GraphProvider,
  Paper,
  HTMLBox,
  useGraph,
  usePaper,
  type CellRecord,
  type ElementRecord,
  type FitToContentOptions,
} from '@joint/react';
import { useCallback, useState } from 'react';
import { PAPER_CLASSNAME } from 'storybook-config/theme';

const BUTTON_CLASSNAME =
  'bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm';
const TOGGLE_CLASSNAME =
  'cursor-pointer border border-gray-300 dark:border-gray-600 rounded py-2 px-3 text-sm';
const TOGGLE_ACTIVE_CLASSNAME = `${TOGGLE_CLASSNAME} bg-blue-500 text-white border-blue-500`;
const PAPER_STYLE = { height: 450 };

interface ElementData {
  readonly label: string;
}

/** Deliberately wider than the paper, so an unfitted view clips the graph. */
const initialCells: ReadonlyArray<CellRecord<ElementData>> = [
  { id: '1', type: 'element', position: { x: 0, y: 0 }, data: { label: 'Start' } },
  { id: '2', type: 'element', position: { x: 320, y: 0 }, data: { label: 'Parse' } },
  { id: '3', type: 'element', position: { x: 640, y: 0 }, data: { label: 'Validate' } },
  { id: '4', type: 'element', position: { x: 960, y: 0 }, data: { label: 'Transform' } },
  { id: '5', type: 'element', position: { x: 160, y: 220 }, data: { label: 'Cache' } },
  { id: '6', type: 'element', position: { x: 480, y: 220 }, data: { label: 'Enrich' } },
  { id: '7', type: 'element', position: { x: 800, y: 220 }, data: { label: 'Reduce' } },
  { id: '8', type: 'element', position: { x: 1120, y: 220 }, data: { label: 'Persist' } },
  { id: '9', type: 'element', position: { x: 320, y: 440 }, data: { label: 'Notify' } },
  { id: '10', type: 'element', position: { x: 640, y: 440 }, data: { label: 'Report' } },
  { id: '11', type: 'element', position: { x: 960, y: 440 }, data: { label: 'Done' } },
  { id: 'e1', type: 'link', source: { id: '1' }, target: { id: '2' } },
  { id: 'e2', type: 'link', source: { id: '2' }, target: { id: '3' } },
  { id: 'e3', type: 'link', source: { id: '3' }, target: { id: '4' } },
  { id: 'e4', type: 'link', source: { id: '2' }, target: { id: '5' } },
  { id: 'e5', type: 'link', source: { id: '3' }, target: { id: '6' } },
  { id: 'e6', type: 'link', source: { id: '4' }, target: { id: '7' } },
  { id: 'e7', type: 'link', source: { id: '7' }, target: { id: '8' } },
  { id: 'e8', type: 'link', source: { id: '5' }, target: { id: '9' } },
  { id: 'e9', type: 'link', source: { id: '6' }, target: { id: '10' } },
  { id: 'e10', type: 'link', source: { id: '7' }, target: { id: '11' } },
];

/**
 * Module constants rather than inline literals, so switching preset does not
 * hand `<Paper>` a fresh object on every render.
 */
const PRESETS: ReadonlyArray<{ readonly name: string; readonly value: FitToContentOptions }> = [
  { name: 'refit: resize (default)', value: { padding: 24 } },
  { name: 'refit: once', value: { padding: 24, refit: 'once' } },
  { name: 'refit: always', value: { padding: 24, refit: 'always' } },
  { name: 'mode: resize', value: { mode: 'resize', padding: 24, allowNewOrigin: 'any' } },
];

interface PresetButtonProps {
  readonly name: string;
  readonly index: number;
  readonly isActive: boolean;
  readonly onSelect: (index: number) => void;
}

function PresetButton({ name, index, isActive, onSelect }: Readonly<PresetButtonProps>) {
  const onClick = useCallback(() => onSelect(index), [onSelect, index]);
  return (
    <button
      type="button"
      className={isActive ? TOGGLE_ACTIVE_CLASSNAME : TOGGLE_CLASSNAME}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

function FitButton() {
  const { fitToContent } = usePaper();
  const onFit = useCallback(() => fitToContent({ padding: 24 }), [fitToContent]);
  return (
    <button type="button" className={BUTTON_CLASSNAME} onClick={onFit}>
      Fit now
    </button>
  );
}

function Main() {
  const { setCell } = useGraph<ElementRecord<ElementData>>();
  const [presetIndex, setPresetIndex] = useState(0);

  const addFarElement = useCallback(() => {
    setCell({
      id: `far-${Date.now()}`,
      type: 'element',
      position: { x: 1600, y: 800 },
      data: { label: 'Far away' },
    });
  }, [setCell]);

  const renderElement = useCallback(
    (data: ElementData) => (
      <HTMLBox className="flex items-center justify-center">{data.label}</HTMLBox>
    ),
    []
  );

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-row flex-wrap items-center gap-2">
        {PRESETS.map((preset, index) => (
          <PresetButton
            key={preset.name}
            name={preset.name}
            index={index}
            isActive={index === presetIndex}
            onSelect={setPresetIndex}
          />
        ))}
        <button type="button" className={BUTTON_CLASSNAME} onClick={addFarElement}>
          Add far element
        </button>
      </div>
      <Paper
        style={PAPER_STYLE}
        className={PAPER_CLASSNAME}
        overflow
        fitToContent={PRESETS[presetIndex].value}
        renderElement={renderElement}
      >
        <div className="absolute right-3 bottom-3">
          <FitButton />
        </div>
      </Paper>
    </div>
  );
}

export default function App() {
  return (
    <GraphProvider initialCells={initialCells}>
      <Main />
    </GraphProvider>
  );
}
