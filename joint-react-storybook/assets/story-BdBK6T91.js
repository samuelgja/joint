import{j as e}from"./index-DwP6fAIG.js";import{G as x,b,c as g,P as h,B as y}from"./create-njWDpS2D.js";import{r as c}from"./index-B0WjJBI_.js";import{H as v}from"./with-simple-data-BKTSf5MX.js";import{a as l}from"./index-C8NnexJa.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./theme-BZH0jGzG.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";const k=g([{id:"1",title:"User Action",description:"Transfer funds",nodeType:"user-action",x:50,y:50,attrs:{root:{magnet:!1}}},{id:"2",title:"Entity",description:"Transfer funds",nodeType:"entity",x:120,y:200,attrs:{root:{magnet:!1}}},{id:"3",title:"User Action",description:"Get account balance",nodeType:"user-action",attrs:{root:{magnet:!1}},x:190,y:350}]),w=b([{id:"link1",source:{id:"1",port:"1"},target:{id:"2",port:"in"}},{id:"link2",source:{id:"2",port:"1"},target:{id:"3",port:"in"}},{id:"link3",source:{id:"3",port:"2"},target:{id:"1",port:"in"}}]);function P({id:t,label:r,onRemove:o,x:i}){const s=c.useCallback(a=>{a.stopPropagation(),o(t)},[t,o]);return e.jsx(l.Item,{x:10+i,id:t,children:e.jsx("foreignObject",{width:100,height:20,className:"w-20 h-6 overflow-visible",children:e.jsxs("div",{className:"w-full h-full bg-black rounded-full flex flex-row items-center justify-center px-1 shadow-xl",children:[e.jsx("div",{className:"flex flex-1 text-white text-xs ml-2",children:r}),e.jsx("button",{onClick:s,type:"button",className:`cursor-pointer size-4 min-w-4 rounded-full bg-white flex items-center justify-center
            hover:opacity-65 transition-opacity duration-200 ease-in-out`,children:e.jsx("i",{className:"fa-solid fa-xmark text-black text-xs group-hover:text-red-500"})})]})})})}function j({title:t,description:r,nodeType:o}){let i;switch(o){case"user-action":{i="fas fa-user";break}case"entity":{i="fas fa-building";break}case"confirm":{i="fas fa-check";break}case"message":{i="fas fa-comment";break}default:{i="fas fa-question";break}}const[s,a]=c.useState([{id:"1",label:"Port 1"},{id:"2",label:"Port 2"}]),u=15,f=c.useCallback(n=>{a(d=>d.filter(m=>m.id!==n))},[a]);return e.jsxs(v,{style:{width:s.length*85+55,minWidth:250},className:"cursor-move text-white w-75 bg-white rounded-lg shadow-lg text-black px-4 py-2 flex flex-col border border-gray-100",children:[e.jsxs("div",{className:"flex flex-1 flex-row items-center px-2 py-2  mb-2",children:[e.jsx("i",{className:`fas fa-${i} text-black`}),e.jsxs("div",{className:"flex flex-col flex-1 ml-4",children:[e.jsx("div",{className:"text-black",children:t}),e.jsx("div",{className:"text-black text-sm",children:r})]})]}),e.jsx(l.Group,{id:"port-in-group",position:"top",x:10,dy:-15/2,children:e.jsx(l.Item,{id:"in",children:e.jsx("foreignObject",{width:u,height:u,overflow:"visible",children:e.jsx("div",{className:"bg-white w-full h-full border-2 border-black rounded-full opacity-50"})})})}),e.jsx(l.Group,{id:"port-out-group",position:"bottom",x:10,dy:-15,children:s.map((n,d)=>e.jsx(P,{x:d*85,id:n.id,label:n.label,onRemove:f},n.id))}),e.jsx("button",{onClick:()=>{a(n=>[...n,{id:y(),label:`Port ${s.length+1}`}])},type:"button",className:`cursor-pointer size-5 rounded-full bg-black flex items-center justify-center absolute right-2 -bottom-2
            hover:opacity-65 transition-opacity duration-200 ease-in-out
            disabled:opacity-50 disabled:cursor-not-allowed
            `,children:e.jsx("i",{className:"fa-solid fa-plus text-white text-xs group-hover:text-red-500"})})]})}function N(){return e.jsx(h,{className:"bg-gray-100",gridSize:5,height:670,width:900,renderElement:j,clickThreshold:10,magnetThreshold:"onleave",interactive:{linkMove:!1},linkPinning:!1,snapLinks:{radius:10},validateMagnet:(t,r)=>r.getAttribute("magnet")!=="passive",validateConnection:(t,r,o,i)=>t===o||t.model.isLink()||o.model.isLink()||t.findAttribute("port-group",r)==="port-in-group"?!1:o.findAttribute("port-group",i)!=="port-out-group",defaultConnectionPoint:{name:"boundary",args:{offset:0,extrapolate:!1}},defaultRouter:{name:"rightAngle",args:{margin:20}},defaultConnector:{name:"straight",args:{cornerType:"line",cornerPreserveAspectRatio:!0}}})}function p(){return e.jsx(x,{initialElements:k,initialLinks:w,children:e.jsx(N,{})})}p.__docgenInfo={description:"",methods:[],displayName:"App"};const T=`/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
// We have pre-loaded tailwind css
import {
  createElements,
  createLinks,
  GraphProvider,
  Paper,
  Port,
  type InferElement,
} from '@joint/react';
import type { dia } from '@joint/core';
import { util } from '@joint/core';
import { useCallback, useState } from 'react';
import { HTMLNode } from 'storybook-config/decorators/with-simple-data';

type Data = {
  id: string;
  title: string;
  description: string;
  nodeType: 'user-action' | 'entity' | 'confirm' | 'message';
  x: number;
  y: number;
};

const nodes = createElements<Data>([
  {
    id: '1',

    title: 'User Action',
    description: 'Transfer funds',
    nodeType: 'user-action',

    x: 50,
    y: 50,
    attrs: {
      root: {
        magnet: false,
      },
    },
  },
  {
    id: '2',

    title: 'Entity',
    description: 'Transfer funds',
    nodeType: 'entity',

    x: 120,
    y: 200,
    attrs: {
      root: {
        magnet: false,
      },
    },
  },
  {
    id: '3',

    title: 'User Action',
    description: 'Get account balance',
    nodeType: 'user-action',

    attrs: {
      root: {
        magnet: false,
      },
    },
    x: 190,
    y: 350,
  },
]);
const links = createLinks([
  {
    id: 'link1',
    source: { id: '1', port: '1' },
    target: { id: '2', port: 'in' },
  },
  {
    id: 'link2',
    source: { id: '2', port: '1' },
    target: { id: '3', port: 'in' },
  },
  {
    id: 'link3',
    source: { id: '3', port: '2' },
    target: { id: '1', port: 'in' },
  },
]);

type NodeType = InferElement<typeof nodes>;

interface PortProps {
  id: string;
  label?: string;
  onRemove: (id: dia.Cell.ID) => void;
  x: number;
}
function PortItem({ id, label, onRemove, x }: Readonly<PortProps>) {
  const onRemovePress = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onRemove(id);
    },
    [id, onRemove]
  );
  return (
    <Port.Item x={10 + x} id={id}>
      <foreignObject width={100} height={20} className="w-20 h-6 overflow-visible">
        <div className="w-full h-full bg-black rounded-full flex flex-row items-center justify-center px-1 shadow-xl">
          <div className="flex flex-1 text-white text-xs ml-2">{label}</div>
          <button
            onClick={onRemovePress}
            type="button"
            className="cursor-pointer size-4 min-w-4 rounded-full bg-white flex items-center justify-center
            hover:opacity-65 transition-opacity duration-200 ease-in-out"
          >
            <i className="fa-solid fa-xmark text-black text-xs group-hover:text-red-500"></i>
          </button>
        </div>
      </foreignObject>
    </Port.Item>
  );
}
function RenderElement({ title, description, nodeType }: NodeType) {
  let icon: string;
  switch (nodeType) {
    case 'user-action': {
      icon = 'fas fa-user';
      break;
    }
    case 'entity': {
      icon = 'fas fa-building';
      break;
    }
    case 'confirm': {
      icon = 'fas fa-check';
      break;
    }
    case 'message': {
      icon = 'fas fa-comment';
      break;
    }
    default: {
      icon = 'fas fa-question';
      break;
    }
  }

  const [ports, setPorts] = useState([
    { id: '1', label: 'Port 1' },
    { id: '2', label: 'Port 2' },
  ]);

  const PORT_IN_SIZE = 15;

  const onRemove = useCallback(
    (id: dia.Cell.ID) => {
      setPorts((previous) => previous.filter((port) => port.id !== id));
    },
    [setPorts]
  );
  return (
    <HTMLNode
      style={{
        width: ports.length * 85 + 55,
        minWidth: 250,
      }}
      className="cursor-move text-white w-75 bg-white rounded-lg shadow-lg text-black px-4 py-2 flex flex-col border border-gray-100"
    >
      <div className="flex flex-1 flex-row items-center px-2 py-2  mb-2">
        <i className={\`fas fa-\${icon} text-black\`}></i>
        <div className="flex flex-col flex-1 ml-4">
          <div className="text-black">{title}</div>
          <div className="text-black text-sm">{description}</div>
        </div>
      </div>
      <Port.Group id="port-in-group" position="top" x={10} dy={-PORT_IN_SIZE / 2}>
        <Port.Item id="in">
          <foreignObject width={PORT_IN_SIZE} height={PORT_IN_SIZE} overflow="visible">
            <div className="bg-white w-full h-full border-2 border-black rounded-full opacity-50" />
          </foreignObject>
        </Port.Item>
      </Port.Group>
      <Port.Group id="port-out-group" position="bottom" x={10} dy={-15}>
        {ports.map((port, index) => (
          <PortItem
            x={index * 85}
            key={port.id}
            id={port.id}
            label={port.label}
            onRemove={onRemove}
          />
        ))}
      </Port.Group>
      <button
        onClick={() => {
          setPorts((previous) => [
            ...previous,
            {
              id: util.uuid(),
              label: \`Port \${ports.length + 1}\`,
            },
          ]);
        }}
        type="button"
        className="cursor-pointer size-5 rounded-full bg-black flex items-center justify-center absolute right-2 -bottom-2
            hover:opacity-65 transition-opacity duration-200 ease-in-out
            disabled:opacity-50 disabled:cursor-not-allowed
            "
      >
        <i className="fa-solid fa-plus text-white text-xs group-hover:text-red-500"></i>
      </button>
    </HTMLNode>
  );
}

function Main() {
  return (
    <Paper
      className="bg-gray-100"
      gridSize={5}
      height={670}
      width={900}
      renderElement={RenderElement}
      clickThreshold={10}
      magnetThreshold={'onleave'}
      interactive={{ linkMove: false }}
      linkPinning={false}
      snapLinks={{ radius: 10 }}
      validateMagnet={(_cellView, magnet) => {
        return magnet.getAttribute('magnet') !== 'passive';
      }}
      validateConnection={(cellViewS, magnetS, cellViewT, magnetT) => {
        if (cellViewS === cellViewT) return false;
        if (cellViewS.model.isLink() || cellViewT.model.isLink()) return false;
        if (cellViewS.findAttribute('port-group', magnetS) === 'port-in-group') return false;
        return cellViewT.findAttribute('port-group', magnetT) !== 'port-out-group';
      }}
      defaultConnectionPoint={{
        name: 'boundary',
        args: {
          offset: 0,
          extrapolate: false,
        },
      }}
      defaultRouter={{
        name: 'rightAngle',
        args: { margin: 20 },
      }}
      defaultConnector={{
        name: 'straight',
        args: { cornerType: 'line', cornerPreserveAspectRatio: true },
      }}
    />
  );
}

export default function App() {
  return (
    <GraphProvider initialElements={nodes} initialLinks={links}>
      <Main />
    </GraphProvider>
  );
}
`,O={title:"Demos/User Flow",component:p,parameters:{docs:{description:{story:"Demo of User Flow with tailwind"},source:{code:T}}}},D={};export{D as Default,O as default};
