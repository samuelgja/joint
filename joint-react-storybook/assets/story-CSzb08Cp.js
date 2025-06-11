/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{G as h,b as P,c as E,e as x,P as b,y as R}from"./create-njWDpS2D.js";import{r as l}from"./index-B0WjJBI_.js";import{P as y,a as j}from"./theme-BZH0jGzG.js";import{u as N}from"./use-update-element-CJV1FtPj.js";import{M}from"./measured-node-BZZgBNj5.js";import{m as k}from"./make-story-CJLFqcT8.js";const C=E([{id:"1",label:"Node 1",x:20,y:100},{id:"2",label:"Node 2",x:200,y:100}]),L=P([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:y}}}]);function w({label:i,id:o,width:a,height:m}){const s=R(),d=N(o,"angle"),r=l.useCallback(t=>{const n=s.model,f=s.clientToLocalPoint(t.clientX,t.clientY),c=n.getCell(o).getBBox().center(),v=c.angleBetween(f,c.clone().offset(0,-1));d(Math.round(v))},[o,s,d]),u=l.useCallback(t=>{t.stopPropagation(),t.preventDefault();const n=t.currentTarget;n&&(n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",r))},[r]),g=l.useCallback(t=>{const n=t.currentTarget;n&&(n.removeEventListener("pointermove",r),n.releasePointerCapture(t.pointerId))},[r]);return e.jsx("foreignObject",{width:a,height:m,overflow:"visible",children:e.jsx(M,{children:e.jsxs("div",{className:"node",children:[e.jsx("div",{className:"rotatable-node__handle",onPointerDown:u,onPointerUp:g}),i]})})})}function D(){const i=x(o=>o.map(({angle:a})=>`${a.toString().padStart(3,"0")} deg`));return e.jsxs("div",{style:{display:"flex",flexDirection:"row",position:"relative"},children:[e.jsx(b,{width:"100%",className:j,height:280,renderElement:w}),e.jsxs("div",{children:[e.jsx("u",{children:"angle"}),i.map((o,a)=>e.jsxs("div",{style:{marginLeft:10},children:[a+1,". ",o]},`${a}-${o}`))]})]})}function p(){return e.jsx(h,{initialElements:C,initialLinks:L,children:e.jsx(D,{})})}p.__docgenInfo={description:"",methods:[],displayName:"App"};const A=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import {
  createElements,
  createLinks,
  GraphProvider,
  MeasuredNode,
  Paper,
  useElements,
  usePaper,
  useUpdateElement,
  type InferElement,
} from '@joint/react';
import '../index.css';
import { useCallback } from 'react';
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';

const initialElements = createElements([
  { id: '1', label: 'Node 1', x: 20, y: 100 },
  { id: '2', label: 'Node 2', x: 200, y: 100 },
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

function RotatableNode({ label, id, width, height }: Readonly<BaseElementWithData>) {
  const paper = usePaper();
  const setRotation = useUpdateElement(id, 'angle');

  const dragHandle = useCallback(
    (event: PointerEvent) => {
      const graph = paper.model;
      const point = paper.clientToLocalPoint(event.clientX, event.clientY);
      const center = graph.getCell(id).getBBox().center();
      const deg = center.angleBetween(point, center.clone().offset(0, -1));
      setRotation(Math.round(deg));
    },
    [id, paper, setRotation]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.stopPropagation();
      event.preventDefault();
      const node = event.currentTarget as HTMLDivElement;
      if (!node) {
        return;
      }
      node.setPointerCapture(event.pointerId);
      node.addEventListener('pointermove', dragHandle);
    },
    [dragHandle]
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      const node = event.currentTarget as HTMLDivElement;
      if (!node) {
        return;
      }
      node.removeEventListener('pointermove', dragHandle);
      node.releasePointerCapture(event.pointerId);
    },
    [dragHandle]
  );

  return (
    <foreignObject width={width} height={height} overflow="visible">
      <MeasuredNode>
        <div className="node">
          <div
            className="rotatable-node__handle"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          />
          {label}
        </div>
      </MeasuredNode>
    </foreignObject>
  );
}

function Main() {
  const elementRotation = useElements((items) =>
    items.map(({ angle }) => \`\${angle.toString().padStart(3, '0')} deg\`)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={RotatableNode} />
      <div>
        <u>angle</u>
        {elementRotation.map((rotation, index) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key
          <div key={\`\${index}-\${rotation}\`} style={{ marginLeft: 10 }}>
            {index + 1}. {rotation}
          </div>
        ))}
      </div>
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
`,S={title:"Examples/Rotatable node",component:p,parameters:k({code:A})},_={},Y=Object.freeze(Object.defineProperty({__proto__:null,Default:_,default:S},Symbol.toStringTag,{value:"Module"}));export{A as C,_ as D,Y as S};
