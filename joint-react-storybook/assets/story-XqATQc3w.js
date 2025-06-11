/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{G as a,b as o,c as s,e as f,P as d,j as v,d as k}from"./create-njWDpS2D.js";import{P as l,a as c,L as p}from"./theme-BZH0jGzG.js";import{M as g}from"./measured-node-BZZgBNj5.js";import{u as m}from"./use-update-element-CJV1FtPj.js";import{H as j}from"./with-simple-data-BKTSf5MX.js";import{m as u}from"./make-story-CJLFqcT8.js";const N=s([{id:"1",label:"Node 1",color:"#ffffff",x:100,y:0},{id:"2",label:"Node 2",color:"#ffffff",x:100,y:200}]),P=o([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:l}}}]);function R({id:n,label:t}){const r=m(n,"label");return e.jsx("input",{className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",style:{padding:5,marginTop:4},value:t,onChange:i=>r(i.target.value)})}function A({label:n,width:t,height:r}){return e.jsx("foreignObject",{width:t,height:r,children:e.jsx(g,{children:e.jsx("div",{className:"node",children:n})})})}function w(){const n=f();return e.jsxs("div",{style:{display:"flex",flexDirection:"row"},children:[e.jsx(d,{width:"100%",className:c,height:280,renderElement:A}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:n.map(t=>e.jsx(R,{...t},t.id))})]})}function h(){return e.jsx(a,{initialElements:N,initialLinks:P,children:e.jsx(w,{})})}h.__docgenInfo={description:"",methods:[],displayName:"App"};const C=s([{id:"1",label:"Node 1",color:l,x:100,y:0},{id:"2",label:"Node 2",color:l,x:100,y:200}]),M=o([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:p}}}]);function I({color:n,id:t}){const r=m(t,"color");return e.jsx(j,{style:{backgroundColor:n,display:"flex",alignItems:"center",justifyContent:"center"},className:"node",children:e.jsx("input",{className:"nodrag",type:"color",onChange:i=>{r(i.target.value)},defaultValue:n})})}function L(){return e.jsx("div",{style:{display:"flex",flexDirection:"row"},children:e.jsx(d,{width:"100%",className:c,height:280,renderElement:I})})}function x(){return e.jsx(a,{initialElements:C,initialLinks:M,children:e.jsx(L,{})})}x.__docgenInfo={description:"",methods:[],displayName:"WithColor"};const D=s([{id:"1",color:l,x:100,y:0,width:130,height:35},{id:"2",color:l,x:100,y:200,width:130,height:35}]),W=o([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:p}}}]);function G({id:n,color:t}){const r=m(n,"color");return e.jsx("input",{className:"nodrag",type:"color",value:t,onChange:i=>r(i.target.value)})}function S({color:n,width:t,height:r}){return e.jsx("rect",{rx:10,ry:10,className:"node",width:t,height:r,fill:n})}function _(){const n=f();return e.jsxs("div",{style:{display:"flex",flexDirection:"row"},children:[e.jsx(d,{width:"100%",className:c,height:280,renderElement:S}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:n.map(t=>e.jsx(G,{...t},t.id))})]})}function b(){return e.jsx(a,{initialElements:D,initialLinks:W,children:e.jsx(_,{})})}b.__docgenInfo={description:"",methods:[],displayName:"App"};const B=s([{id:"1",label:"Node 1",color:"#ffffff",x:40,y:70},{id:"2",label:"Node 2",color:"#ffffff",x:170,y:120},{id:"3",label:"Node 2",color:"#ffffff",x:30,y:180}]),T=o([{id:"e1-1",source:"1",target:"2",attrs:{line:{stroke:l}}}]);function $({id:n,label:t}){const r=m(n,"label");return e.jsx("input",{style:{padding:5,marginTop:4},value:t,onChange:i=>r(i.target.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"})}function Y({label:n,width:t,height:r}){const i=v(),y=k();return e.jsx("foreignObject",{width:t,height:r,children:e.jsx(g,{children:e.jsx("div",{className:"node flex flex-1 justify-center items-center w-30",children:e.jsxs("div",{className:"flex flex-1 justify-center items-center py-2 flex-col mx-4",children:[e.jsx("span",{className:"mb-1 text-sm",children:n}),e.jsx("button",{onClick:()=>{i.getCell(y).remove()},type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"Remove"})]})})})})}function H(){const n=f();return e.jsxs("div",{style:{display:"flex",flexDirection:"row"},children:[e.jsx(d,{width:"100%",className:c,clickThreshold:10,interactive:{linkMove:!1},defaultRouter:{name:"rightAngle",args:{margin:40}},defaultConnector:{name:"straight",args:{cornerType:"line",cornerPreserveAspectRatio:!0}},defaultConnectionPoint:{name:"boundary",args:{offset:10,extrapolate:!0}},height:380,renderElement:Y}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:n.map(t=>e.jsx($,{...t},t.id))})]})}function E(){return e.jsx(a,{initialElements:B,initialLinks:T,children:e.jsx(H,{})})}E.__docgenInfo={description:"",methods:[],displayName:"App"};const U=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import {
  createElements,
  createLinks,
  GraphProvider,
  MeasuredNode,
  Paper,
  useElements,
  useUpdateElement,
  type InferElement,
} from '@joint/react';
import '../index.css';
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';

const initialElements = createElements([
  { id: '1', label: 'Node 1', color: '#ffffff', x: 100, y: 0 },
  { id: '2', label: 'Node 2', color: '#ffffff', x: 100, y: 200 },
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

function ElementInput({ id, label }: BaseElementWithData) {
  const setLabel = useUpdateElement<BaseElementWithData>(id, 'label');
  return (
    <input
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      style={{ padding: 5, marginTop: 4 }}
      value={label}
      onChange={(event) => setLabel(event.target.value)}
    />
  );
}

function RenderElement({ label, width, height }: BaseElementWithData) {
  return (
    <foreignObject width={width} height={height}>
      <MeasuredNode>
        <div className="node">{label}</div>
      </MeasuredNode>
    </foreignObject>
  );
}

function Main() {
  const elements = useElements<BaseElementWithData>();
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={RenderElement} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {elements.map((item) => {
          return <ElementInput key={item.id} {...item} />;
        })}
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
`,O=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import {
  createElements,
  createLinks,
  GraphProvider,
  Paper,
  useUpdateElement,
  type InferElement,
} from '@joint/react';
import '../index.css';
import { PRIMARY, LIGHT, PAPER_CLASSNAME } from 'storybook-config/theme';
import { HTMLNode } from 'storybook-config/decorators/with-simple-data';

const initialElements = createElements([
  { id: '1', label: 'Node 1', color: PRIMARY, x: 100, y: 0 },
  { id: '2', label: 'Node 2', color: PRIMARY, x: 100, y: 200 },
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

function RenderElement({ color, id }: BaseElementWithData) {
  const setColor = useUpdateElement<BaseElementWithData>(id, 'color');
  return (
    <HTMLNode
      style={{
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="node"
    >
      <input
        className="nodrag"
        type="color"
        onChange={(event) => {
          setColor(event.target.value);
        }}
        defaultValue={color}
      />
    </HTMLNode>
  );
}
function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={RenderElement} />
    </div>
  );
}

export default function WithColor() {
  return (
    <GraphProvider initialElements={initialElements} initialLinks={initialEdges}>
      <Main />
    </GraphProvider>
  );
}
`,V=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import {
  createElements,
  createLinks,
  GraphProvider,
  Paper,
  useElements,
  useUpdateElement,
  type InferElement,
} from '@joint/react';
import '../index.css';
import { LIGHT, PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';

const initialElements = createElements([
  { id: '1', color: PRIMARY, x: 100, y: 0, width: 130, height: 35 },
  { id: '2', color: PRIMARY, x: 100, y: 200, width: 130, height: 35 },
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

function ElementInput({ id, color }: BaseElementWithData) {
  const setColor = useUpdateElement<BaseElementWithData>(id, 'color');
  return (
    <input
      className="nodrag"
      type="color"
      value={color}
      onChange={(event) => setColor(event.target.value)}
    />
  );
}

function RenderElement({ color, width, height }: BaseElementWithData) {
  return <rect rx={10} ry={10} className="node" width={width} height={height} fill={color} />;
}

function Main() {
  const elements = useElements<BaseElementWithData>();
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={RenderElement} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {elements.map((item) => {
          return <ElementInput key={item.id} {...item} />;
        })}
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
`,z=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import {
  createElements,
  createLinks,
  GraphProvider,
  MeasuredNode,
  Paper,
  useCellId,
  useElements,
  useGraph,
  useUpdateElement,
  type InferElement,
} from '@joint/react';
import '../index.css';
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';

const initialElements = createElements([
  { id: '1', label: 'Node 1', color: '#ffffff', x: 40, y: 70 },
  { id: '2', label: 'Node 2', color: '#ffffff', x: 170, y: 120 },
  { id: '3', label: 'Node 2', color: '#ffffff', x: 30, y: 180 },
]);
const initialEdges = createLinks([
  {
    id: 'e1-1',
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

function ElementInput({ id, label }: BaseElementWithData) {
  const setLabel = useUpdateElement<BaseElementWithData>(id, 'label');
  return (
    <input
      style={{ padding: 5, marginTop: 4 }}
      value={label}
      onChange={(event) => setLabel(event.target.value)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  );
}

function RenderElement({ label, width, height }: BaseElementWithData) {
  const graph = useGraph();
  const id = useCellId();
  return (
    <foreignObject width={width} height={height}>
      <MeasuredNode>
        <div className="node flex flex-1 justify-center items-center w-30">
          <div className="flex flex-1 justify-center items-center py-2 flex-col mx-4">
            <span className="mb-1 text-sm">{label}</span>
            <button
              onClick={() => {
                graph.getCell(id).remove();
              }}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Remove
            </button>
          </div>
        </div>
      </MeasuredNode>
    </foreignObject>
  );
}

function Main() {
  const elements = useElements<BaseElementWithData>();
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper
        width="100%"
        className={PAPER_CLASSNAME}
        clickThreshold={10}
        interactive={{ linkMove: false }}
        defaultRouter={{ name: 'rightAngle', args: { margin: 40 } }}
        defaultConnector={{
          name: 'straight',
          args: { cornerType: 'line', cornerPreserveAspectRatio: true },
        }}
        defaultConnectionPoint={{
          name: 'boundary',
          args: {
            offset: 10,
            extrapolate: true,
          },
        }}
        height={380}
        renderElement={RenderElement}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {elements.map((item) => {
          return <ElementInput key={item.id} {...item} />;
        })}
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
`,q={title:"Examples/Update",component:h,parameters:u({code:U})},F={},J={render:x,parameters:u({code:O})},K={render:b,parameters:u({code:V})},Q={render:E,parameters:u({code:z})},ae=Object.freeze(Object.defineProperty({__proto__:null,Default:F,WithColorPicker:J,WithNodeRemove:Q,WithSVG:K,default:q},Symbol.toStringTag,{value:"Module"}));export{U as C,F as D,ae as S,J as W,O as a,K as b,V as c,Q as d,z as e};
