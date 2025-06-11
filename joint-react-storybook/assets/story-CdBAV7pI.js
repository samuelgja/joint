/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{G as l,b as d,c as h,P as m}from"./create-njWDpS2D.js";import{r as c}from"./index-B0WjJBI_.js";import{P as s,a as g,S as p}from"./theme-BZH0jGzG.js";import{H as f}from"./index-4CDyDOw8.js";import{m as x}from"./make-story-CJLFqcT8.js";const u=h([{id:"1",label:"Node 1",x:100,y:50,width:125,height:25},{id:"2",label:"Node 2",x:100,y:200,width:120,height:25}]),E=d([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:s}}}]);function A({height:t,width:i,label:a}){const[o,r]=c.useState(!1);return e.jsxs("g",{width:i,height:t,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),className:"node",children:[e.jsx(f.Mask,{isHidden:!o,padding:5,strokeWidth:2,stroke:p,children:e.jsx("rect",{rx:10,ry:10,width:i,height:t,fill:s})}),e.jsx("text",{x:i/2,y:t/2,textAnchor:"middle",dominantBaseline:"middle",fill:"#fff",children:a})]})}function y(){return e.jsx("div",{style:{display:"flex",flexDirection:"row"},children:e.jsx(m,{width:"100%",className:g,height:280,renderElement:A})})}function n(){return e.jsx(l,{initialElements:u,initialLinks:E,children:e.jsx(y,{})})}n.__docgenInfo={description:"",methods:[],displayName:"App"};const P=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import {
  createElements,
  createLinks,
  GraphProvider,
  Highlighter,
  Paper,
  type InferElement,
} from '@joint/react';
import '../index.css';
import { useState } from 'react';
import { PAPER_CLASSNAME, PRIMARY, SECONDARY } from 'storybook-config/theme';

const initialElements = createElements([
  {
    id: '1',
    label: 'Node 1',
    x: 100,
    y: 50,
    width: 125,
    height: 25,
  },
  {
    id: '2',
    label: 'Node 2',
    x: 100,
    y: 200,
    width: 120,
    height: 25,
  },
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

function RenderItemWithChildren({ height, width, label }: BaseElementWithData) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  return (
    <g
      width={width}
      height={height}
      onMouseEnter={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
      className="node"
    >
      <Highlighter.Mask isHidden={!isHighlighted} padding={5} strokeWidth={2} stroke={SECONDARY}>
        <rect rx={10} ry={10} width={width} height={height} fill={PRIMARY} />
      </Highlighter.Mask>
      <text x={width / 2} y={height / 2} textAnchor="middle" dominantBaseline="middle" fill="#fff">
        {label}
      </text>
    </g>
  );
}
function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper
        width="100%"
        className={PAPER_CLASSNAME}
        height={280}
        renderElement={RenderItemWithChildren}
      />
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
`,R={title:"Examples/Highlighter",component:n,parameters:x({code:P})},M={},I=Object.freeze(Object.defineProperty({__proto__:null,Default:M,default:R},Symbol.toStringTag,{value:"Module"}));export{P as C,M as D,I as S};
