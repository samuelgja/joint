/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{r as s}from"./index-B0WjJBI_.js";import{G as d,b as c,c as m,P as o}from"./create-njWDpS2D.js";import{L as h,P as p,S as f,a}from"./theme-BZH0jGzG.js";import{M as E}from"./measured-node-BZZgBNj5.js";import{m as u}from"./make-story-CJLFqcT8.js";const x=m([{id:"1",label:"Node 1",color:p,x:100,y:10,width:100,height:50},{id:"2",label:"Node 2",color:f,x:100,y:200,width:100,height:50}]),g=c([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:h}}}]);function b(){const t=s.useCallback(({width:r,height:i,color:n})=>e.jsx("rect",{width:r,height:i,fill:n,rx:10,ry:10}),[]);return e.jsx("div",{className:"absolute bottom-4 right-6 w-[200px] h-[150px] border border-[#dde6ed] rounded-lg overflow-hidden",children:e.jsx(o,{interactive:!1,scale:.4,width:"100%",className:a,height:"100%",renderElement:t})})}function N({width:t,height:r,label:i,color:n}){return e.jsx("foreignObject",{width:t,height:r,children:e.jsx(E,{children:e.jsxs("div",{className:"flex flex-col items-center rounded-sm",style:{background:n},children:["Example",e.jsx("div",{children:i})]})})})}function v(){return e.jsxs("div",{className:"flex flex-row relative",children:[e.jsx(o,{width:"100%",className:a,height:280,renderElement:N}),e.jsx(b,{})]})}function l(){return e.jsx(d,{initialElements:x,initialLinks:g,children:e.jsx(v,{})})}l.__docgenInfo={description:"",methods:[],displayName:"App"};const M=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import '../index.css';
import { useCallback } from 'react';
import {
  createElements,
  createLinks,
  GraphProvider,
  MeasuredNode,
  Paper,
  type InferElement,
  type RenderElement,
} from '@joint/react';
import { PRIMARY, SECONDARY, LIGHT, PAPER_CLASSNAME } from 'storybook-config/theme';

const initialElements = createElements([
  { id: '1', label: 'Node 1', color: PRIMARY, x: 100, y: 10, width: 100, height: 50 },
  { id: '2', label: 'Node 2', color: SECONDARY, x: 100, y: 200, width: 100, height: 50 },
]);
const initialEdges = createLinks([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    attrs: {
      line: {
        stroke: LIGHT,
      },
    },
  },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

function MiniMap() {
  const renderElement: RenderElement<BaseElementWithData> = useCallback(
    ({ width, height, color }) => (
      <rect width={width} height={height} fill={color} rx={10} ry={10} />
    ),
    []
  );

  return (
    <div className="absolute bottom-4 right-6 w-[200px] h-[150px] border border-[#dde6ed] rounded-lg overflow-hidden">
      <Paper
        interactive={false}
        scale={0.4}
        width="100%"
        className={PAPER_CLASSNAME}
        height="100%"
        renderElement={renderElement}
      />
    </div>
  );
}

function RenderElement({ width, height, label, color }: Readonly<BaseElementWithData>) {
  return (
    <foreignObject width={width} height={height}>
      <MeasuredNode>
        <div className="flex flex-col items-center rounded-sm" style={{ background: color }}>
          Example
          <div>{label}</div>
        </div>
      </MeasuredNode>
    </foreignObject>
  );
}
function Main() {
  return (
    <div className="flex flex-row relative">
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={RenderElement} />
      <MiniMap />
    </div>
  );
}

export default function App() {
  return (
    <GraphProvider initialElements={initialElements} initialLinks={initialEdges}>
      <Main />
    </GraphProvider>
  );
}
`,j={title:"Examples/Minimap",component:l,parameters:u({code:M})},P={},C=Object.freeze(Object.defineProperty({__proto__:null,Default:P,default:j},Symbol.toStringTag,{value:"Module"}));export{M as C,P as D,C as S};
