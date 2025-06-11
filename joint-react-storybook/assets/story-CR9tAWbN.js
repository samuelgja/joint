import{j as e}from"./index-DwP6fAIG.js";/* empty css              */import{G as g,c as f,j as z,e as C,P as N}from"./create-njWDpS2D.js";import{r as d}from"./index-B0WjJBI_.js";import{u as L}from"./use-create-element-CQ_AbJYV.js";import{a as E,P as X}from"./theme-BZH0jGzG.js";import{M as x}from"./measured-node-BZZgBNj5.js";import{m as y}from"./make-story-CJLFqcT8.js";const G=f([{id:"1",label:"Node 1"},{id:"2",label:"Node 2"},{id:"3",label:"Node 3"},{id:"4",label:"Node 4"},{id:"5",label:"Node 5"},{id:"6",label:"Node 6"},{id:"7",label:"Node 7"},{id:"8",label:"Node 8"},{id:"9",label:"Node 9"}]),_="block w-15 mr-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";function W({width:a,height:r,label:n}){return e.jsx("foreignObject",{width:a,height:r,children:e.jsx(x,{children:e.jsx("div",{className:"node",children:n})})})}function I(){const a=d.useCallback(t=>e.jsx(W,{...t}),[]),r=z(),n=L(),[c,i]=d.useState(3),l=d.useCallback(({graph:t,gridXSize:s})=>{const h=Math.max(1,s),w=t.getElements();for(const[u,b]of w.entries()){const R=u%h,P=Math.floor(u/h),{width:j,height:A}=b.size(),M=R*(j+20),v=P*(A+20);b.position(M,v)}},[]),p=d.useCallback(t=>{l({...t,gridXSize:c})},[l,c]),m=C(t=>t.size);return e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"mb-8 flex flex-row items-center",children:[e.jsx("label",{className:"mr-2 text-sm font-medium text-gray-900 dark:text-white",children:"Number of elements per row:"}),e.jsx("input",{type:"number",className:_,placeholder:"Grid X Size",value:c,onChange:t=>{const s=Number(t.target.value);i(s),l({graph:r,gridXSize:s})},min:0}),e.jsx("button",{onClick:()=>{n({id:`${Math.random()}`,label:`Node ${m+1}`})},type:"button",className:"bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",children:"Add Node"})]}),e.jsx(N,{width:"100%",className:E,height:450,renderElement:a,onElementsSizeChange:p})]})}function S(){return e.jsx(g,{initialElements:G,children:e.jsx(I,{})})}S.__docgenInfo={description:"",methods:[],displayName:"App"};const o={type:"standard.Rectangle",width:100,height:50,attrs:{body:{fill:X},label:{text:"Rectangle1",fill:"white"}}},O=f([{id:"1",label:"Node 1",...o},{id:"2",label:"Node 2",...o},{id:"3",label:"Node 1",...o},{id:"4",label:"Node 2",...o},{id:"5",label:"Node 1",...o},{id:"6",label:"Node 2",...o},{id:"7",label:"Node 1",...o},{id:"8",label:"Node 2",...o},{id:"9",label:"Node 2",...o}]);function D({width:a,height:r,label:n}){return e.jsx("foreignObject",{width:a,height:r,children:e.jsx(x,{children:e.jsx("div",{className:"node",children:n})})})}const B=400;function $(){const a=d.useCallback(n=>e.jsx(D,{...n}),[]);function r({graph:n}){let i=0,l=0;const p=n.getElements();for(const m of p){const{width:t,height:s}=m.size();i+t>B&&(i=0,l+=s+20),m.position(i,l),i+=t+20}}return e.jsx(N,{width:"100%",className:E,height:280,renderElement:a,onElementsSizeReady:r})}function k(){return e.jsx(g,{initialElements:O,children:e.jsx($,{})})}k.__docgenInfo={description:"",methods:[],displayName:"App"};const T=`/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-shadow */
/* eslint-disable sonarjs/pseudo-random */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import '../index.css';
import {
  createElements,
  GraphProvider,
  MeasuredNode,
  Paper,
  useElements,
  useGraph,
  type InferElement,
  type OnLoadOptions,
  type RenderElement,
} from '@joint/react';
import { useCallback, useState } from 'react';
import type { dia } from '@joint/core';
import { useCreateElement } from '../../../hooks/use-create-element';
import { PAPER_CLASSNAME } from 'storybook-config/theme';

const initialElements = createElements([
  { id: '1', label: 'Node 1' },
  { id: '2', label: 'Node 2' },
  { id: '3', label: 'Node 3' },
  { id: '4', label: 'Node 4' },
  { id: '5', label: 'Node 5' },
  { id: '6', label: 'Node 6' },
  { id: '7', label: 'Node 7' },
  { id: '8', label: 'Node 8' },
  { id: '9', label: 'Node 9' },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

const INPUT_CLASSNAME =
  'block w-15 mr-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
function RenderedRect({ width, height, label }: BaseElementWithData) {
  return (
    <foreignObject width={width} height={height}>
      <MeasuredNode>
        <div className="node">{label}</div>
      </MeasuredNode>
    </foreignObject>
  );
}

function Main() {
  const renderElement: RenderElement<BaseElementWithData> = useCallback(
    (props) => <RenderedRect {...props} />,
    []
  );
  const graph = useGraph();
  const addElement = useCreateElement<BaseElementWithData>();

  // Number of elements per row
  const [gridXSize, setGridXSize] = useState(3);

  // Grid layout logic based on number of columns
  const makeLayoutWithGrid = useCallback(
    ({ graph, gridXSize }: { gridXSize: number; graph: dia.Graph }) => {
      const gap = 20;
      const cols = Math.max(1, gridXSize); // avoid divide by 0
      const elements = graph.getElements();

      for (const [index, element] of elements.entries()) {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const { width, height } = element.size();
        const x = col * (width + gap);
        const y = row * (height + gap);

        element.position(x, y);
      }
    },
    []
  );

  const makeLayout = useCallback(
    (options: OnLoadOptions) => {
      makeLayoutWithGrid({ ...options, gridXSize });
    },
    [makeLayoutWithGrid, gridXSize]
  );

  const elementsLength = useElements((items) => items.size);
  return (
    <div className="flex flex-col">
      <div className="mb-8 flex flex-row items-center">
        <label className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
          Number of elements per row:
        </label>
        <input
          type="number"
          className={INPUT_CLASSNAME}
          placeholder="Grid X Size"
          value={gridXSize}
          onChange={(event) => {
            const gridXSize = Number(event.target.value);
            setGridXSize(gridXSize);
            makeLayoutWithGrid({ graph, gridXSize });
          }}
          min={0}
        />

        <button
          onClick={() => {
            addElement({
              id: \`\${Math.random()}\`,
              label: \`Node \${elementsLength + 1}\`,
            });
          }}
          type="button"
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Node
        </button>
      </div>
      <Paper
        width="100%"
        className={PAPER_CLASSNAME}
        height={450}
        renderElement={renderElement}
        onElementsSizeChange={makeLayout}
      />
    </div>
  );
}

export default function App() {
  return (
    <GraphProvider initialElements={initialElements}>
      <Main />
    </GraphProvider>
  );
}
`,Y=`import '../index.css';
import {
  createElements,
  GraphProvider,
  MeasuredNode,
  Paper,
  type InferElement,
  type OnLoadOptions,
  type RenderElement,
} from '@joint/react';
import { useCallback } from 'react';
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';
const shape = {
  type: 'standard.Rectangle',
  width: 100,
  height: 50,
  attrs: {
    body: {
      fill: PRIMARY,
    },
    label: {
      text: 'Rectangle1',
      fill: 'white',
    },
  },
} as const;

const initialElements = createElements([
  {
    id: '1',
    label: 'Node 1',
    ...shape,
  },
  {
    id: '2',
    label: 'Node 2',
    ...shape,
  },
  {
    id: '3',
    label: 'Node 1',
    ...shape,
  },
  {
    id: '4',
    label: 'Node 2',
    ...shape,
  },
  {
    id: '5',
    label: 'Node 1',
    ...shape,
  },
  {
    id: '6',
    label: 'Node 2',
    ...shape,
  },
  {
    id: '7',
    label: 'Node 1',
    ...shape,
  },
  {
    id: '8',
    label: 'Node 2',
    ...shape,
  },
  {
    id: '9',
    label: 'Node 2',
    ...shape,
  },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

function RenderedRect({ width, height, label }: BaseElementWithData) {
  return (
    <foreignObject width={width} height={height}>
      <MeasuredNode>
        <div className="node">{label}</div>
      </MeasuredNode>
    </foreignObject>
  );
}

const PAPER_WIDTH = 400;
function Main() {
  const renderElement: RenderElement<BaseElementWithData> = useCallback(
    (props) => <RenderedRect {...props} />,
    []
  );

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function makeLayout({ graph }: OnLoadOptions) {
    const gap = 20;
    let currentX = 0;
    let currentY = 0;
    const elements = graph.getElements();
    for (const element of elements) {
      const { width, height } = element.size();
      if (currentX + width > PAPER_WIDTH) {
        currentX = 0;
        currentY += height + gap;
      }
      element.position(currentX, currentY);
      currentX += width + gap;
    }
  }
  return (
    <Paper
      width="100%"
      className={PAPER_CLASSNAME}
      height={280}
      renderElement={renderElement}
      onElementsSizeReady={makeLayout}
    />
  );
}

export default function App() {
  return (
    <GraphProvider initialElements={initialElements}>
      <Main />
    </GraphProvider>
  );
}
`,H={title:"Examples/Automatic layout",component:S,parameters:y({code:T})},U={},q={render:()=>e.jsx(k,{}),parameters:y({code:Y})},oe=Object.freeze(Object.defineProperty({__proto__:null,Default:U,WithBuildInShapes:q,default:H},Symbol.toStringTag,{value:"Module"}));export{T as C,U as D,oe as S,q as W,Y as a};
