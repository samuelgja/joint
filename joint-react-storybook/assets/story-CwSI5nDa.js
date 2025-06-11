/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{r as p}from"./index-B0WjJBI_.js";import{G as g,b as x,c as b,P as f}from"./create-njWDpS2D.js";import{P as y,a as k}from"./theme-BZH0jGzG.js";import{u as E}from"./use-update-element-CJV1FtPj.js";import{M as w}from"./measured-node-BZZgBNj5.js";import{m as N}from"./make-story-CJLFqcT8.js";const j=b([{id:"1",label:"Node 1",inputs:[],x:100,y:0},{id:"2",label:"Node 2",inputs:[],x:500,y:200}]),v=x([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:y}}}]);function P({id:s,children:n,width:a,height:o,inputs:d}){const m=p.useCallback(({element:i,size:t})=>{const l=10+t.width+10,r=50+t.height+10;i.size(l,r,{async:!1})},[]),c=E(s,"inputs"),h=()=>{c(i=>[...i,""])};return e.jsxs(e.Fragment,{children:[e.jsx("rect",{width:a,height:o,fill:"#121826",stroke:"#eee",strokeWidth:"2"}),e.jsx("text",{x:a/2,y:50/2,fontSize:20,textAnchor:"middle",fill:"#eee",dominantBaseline:"middle",children:`${n}`}),e.jsx("foreignObject",{x:10,y:50,width:a-2*10,height:o-50-10,children:e.jsx(w,{setSize:m,children:e.jsxs("div",{className:"absolute p-1 min-w-50",children:[e.jsx("button",{type:"button",onClick:h,className:"p-1 bg-rose-600 rounded-[4px] text-white hover:opacity-65 mb-3 w-full",children:"Add item"}),e.jsx("ul",{className:"list-none",children:d.map((i,t)=>e.jsxs("li",{children:[e.jsxs("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:["Item ",t+1]}),e.jsx("input",{type:"text",value:i,className:"block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:l=>{const r=[...d];r[t]=l.target.value,c(r)}})]},t))}),d.length===0&&e.jsx("div",{className:"text-gray-500 text-xs",children:"No items"})]})})})]})}function S(){const s=p.useCallback(n=>e.jsx(P,{...n,children:n.label}),[]);return e.jsx(f,{width:"100%",className:k,height:500,renderElement:s})}function u(){return e.jsx(g,{initialElements:j,initialLinks:v,children:e.jsx(S,{})})}u.__docgenInfo={description:"",methods:[],displayName:"App"};const A=`/* eslint-disable @eslint-react/no-array-index-key */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */

import '../index.css';
import { useCallback, type PropsWithChildren } from 'react';
import {
  createElements,
  createLinks,
  GraphProvider,
  MeasuredNode,
  Paper,
  useUpdateElement,
  type InferElement,
  type OnSetSize,
} from '@joint/react';
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';

type Data = {
  id: string;
  label: string;
  inputs: string[];
  x: number;
  y: number;
};
const initialElements = createElements<Data>([
  { id: '1', label: 'Node 1', inputs: [], x: 100, y: 0 },
  { id: '2', label: 'Node 2', inputs: [], x: 500, y: 200 },
]);
const initialEdges = createLinks([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    attrs: {
      line: {
        stroke: PRIMARY,
      },
    },
  },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

function ListElement({
  id,
  children,
  width,
  height,
  inputs,
}: PropsWithChildren<BaseElementWithData>) {
  const padding = 10;
  const headerHeight = 50;

  const setListSize: OnSetSize = useCallback(({ element, size }) => {
    const w = padding + size.width + padding;
    const h = headerHeight + size.height + padding;
    element.size(w, h, { async: false });
  }, []);

  const setInputs = useUpdateElement<BaseElementWithData, 'inputs'>(id, 'inputs');

  const addInput = () => {
    setInputs((previous) => {
      return [...previous, ''];
    });
  };

  return (
    <>
      <rect width={width} height={height} fill="#121826" stroke="#eee" strokeWidth="2"></rect>
      <text
        x={width / 2}
        y={headerHeight / 2}
        fontSize={20}
        textAnchor="middle"
        fill="#eee"
        dominantBaseline={'middle'}
      >
        {\`\${children}\`}
      </text>
      <foreignObject
        x={padding}
        y={headerHeight}
        width={width - 2 * padding}
        height={height - headerHeight - padding}
      >
        <MeasuredNode setSize={setListSize}>
          <div className="absolute p-1 min-w-50">
            <button
              type="button"
              onClick={addInput}
              className={'p-1 bg-rose-600 rounded-[4px] text-white hover:opacity-65 mb-3 w-full'}
            >
              Add item
            </button>
            <ul className={'list-none'}>
              {inputs.map((input, index) => (
                <li key={index}>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Item {index + 1}
                  </label>
                  <input
                    type="text"
                    value={input}
                    className={
                      'block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    }
                    onChange={(event) => {
                      const newInputs = [...inputs];
                      newInputs[index] = event.target.value;
                      setInputs(newInputs);
                    }}
                  />
                </li>
              ))}
            </ul>
            {inputs.length === 0 && <div className="text-gray-500 text-xs">No items</div>}
          </div>
        </MeasuredNode>
      </foreignObject>
    </>
  );
}
function Main() {
  const renderElement = useCallback((element: BaseElementWithData) => {
    return <ListElement {...element}>{element.label}</ListElement>;
  }, []);
  return (
    <Paper width="100%" className={PAPER_CLASSNAME} height={500} renderElement={renderElement} />
  );
}

export default function App() {
  return (
    <GraphProvider initialElements={initialElements} initialLinks={initialEdges}>
      <Main />
    </GraphProvider>
  );
}
`,I={title:"Examples/List node",component:u,parameters:N({code:A})},C={},G=Object.freeze(Object.defineProperty({__proto__:null,Default:C,default:I},Symbol.toStringTag,{value:"Module"}));export{A as C,C as D,G as S};
