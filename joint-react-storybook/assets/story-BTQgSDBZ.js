/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{G as m,c,P as p,j as f,e as h}from"./create-njWDpS2D.js";import{r as u}from"./index-B0WjJBI_.js";import{a as E}from"./theme-BZH0jGzG.js";import{M as x}from"./measured-node-BZZgBNj5.js";import{m as N}from"./make-story-CJLFqcT8.js";const b=c([{id:"1",label:"Node 1",x:100,y:0},{id:"2",label:"Node 2",x:100,y:200},{id:"3",label:"Node 3",x:200,y:100},{id:"4",label:"Node 4",x:0,y:100}]);function y({id:r,label:i,width:o,height:s}){const l=u.useRef(null),n=f(),a=n.getCell(r),d=h(()=>n.findElementsUnderElement(a).length>0);return e.jsx("foreignObject",{width:o,height:s,children:e.jsx(x,{children:e.jsx("div",{ref:l,className:`node ${d?"intersected":""}`,children:i})})})}function g(){return e.jsx("div",{style:{display:"flex",flexDirection:"row",position:"relative"},children:e.jsx(p,{width:"100%",className:E,height:280,renderElement:y})})}function t(){return e.jsx(m,{initialElements:b,children:e.jsx(g,{})})}t.__docgenInfo={description:"",methods:[],displayName:"App"};const j=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import {
  createElements,
  GraphProvider,
  MeasuredNode,
  Paper,
  useElements,
  useGraph,
  type InferElement,
} from '@joint/react';
import '../index.css';
import { useRef } from 'react';
import type { dia } from '@joint/core';
import { PAPER_CLASSNAME } from 'storybook-config/theme';

const initialElements = createElements([
  { id: '1', label: 'Node 1', x: 100, y: 0 },
  { id: '2', label: 'Node 2', x: 100, y: 200 },
  { id: '3', label: 'Node 3', x: 200, y: 100 },
  { id: '4', label: 'Node 4', x: 0, y: 100 },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

function ResizableNode({ id, label, width, height }: Readonly<BaseElementWithData>) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const graph = useGraph();
  const element = graph.getCell(id) as dia.Element;

  const isIntersected = useElements(() => {
    return graph.findElementsUnderElement(element).length > 0;
  });

  return (
    <foreignObject width={width} height={height}>
      <MeasuredNode>
        <div ref={nodeRef} className={\`node \${isIntersected ? 'intersected' : ''}\`}>
          {label}
        </div>
      </MeasuredNode>
    </foreignObject>
  );
}

function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={ResizableNode} />
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
`,P={title:"Examples/Intersection",component:t,parameters:N({code:j})},R={},G=Object.freeze(Object.defineProperty({__proto__:null,Default:R,default:P},Symbol.toStringTag,{value:"Module"}));export{j as C,R as D,G as S};
