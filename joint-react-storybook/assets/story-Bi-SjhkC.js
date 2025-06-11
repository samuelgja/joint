import{j as t}from"./index-DwP6fAIG.js";import{G as I,c as E,P as x,M as P,N as T,O as R,L as k,I as A,V as N,v as w}from"./create-njWDpS2D.js";import{a as _,L as l,P as c,b as y}from"./theme-BZH0jGzG.js";import{T as S}from"./text-node-C4LoLeqy.js";import{a as O}from"./helpers-BazfYDoP.js";import{u as L}from"./use-links-DCf9N2Cg.js";import{M as D}from"./measured-node-BZZgBNj5.js";import{a}from"./index-C8NnexJa.js";import{R as M}from"./Button-B36ztity.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./use-children-ref-gx-xwHed.js";function u(e){return typeof e=="object"?e.id:e}const d=150,V=55,p=10,r=20,j=10,v=P.extend({tagName:"g",attributes:{"pointer-events":"none"},children(){const{radius:e=r/2}=this.options;return w(t.jsxs("circle",{fill:"none",r:e,stroke:l,strokeWidth:2,children:[t.jsx("animate",{attributeName:"r",from:"8",to:"20",dur:"1.5s",begin:"0s",repeatCount:"indefinite"}),t.jsx("animate",{attributeName:"opacity",from:"1",to:"0",dur:"1.5s",begin:"0s",repeatCount:"indefinite"})]}))},highlight(e,i){this.renderChildren();const o=e.getNodeBoundingRect(i),n=e.getNodeMatrix(i),s=N.transformRect(o,n).center();this.el.setAttribute("transform",`translate(${s.x}, ${s.y})`)}}),G=E([{id:"1",x:50,y:50,attrs:{root:{magnet:!1}}},{id:"2",x:350,y:50,attrs:{root:{magnet:!1}}},{id:"3",x:150,y:250,attrs:{root:{magnet:!1}}}]);function b({width:e,height:i,id:o}){const n=L(s=>s.map(m=>{const h=u(m.source),f=u(m.target);return h===o||f===o}).includes(!0));return t.jsxs(t.Fragment,{children:[t.jsx(D,{children:t.jsx("rect",{width:d,height:V,stroke:c,strokeWidth:2,strokeDasharray:n?"0":"5,5",fill:n?c:y,rx:p,ry:p})}),t.jsx(S,{fill:"white",x:e/2,y:i/2+4,textAnchor:"middle",fontSize:16,children:o}),t.jsx(a.Group,{id:"in",position:"top",x:d/2-r/2,y:-20/2,children:t.jsx(a.Item,{id:"port1",children:t.jsx("rect",{width:r,height:r,rx:r/2,ry:r/2,fill:l,strokeWidth:2})})}),t.jsx(a.Group,{id:"out",position:"bottom",x:d/2-r/2,dy:-20/2,children:t.jsx(a.Item,{id:"port2",children:t.jsx("rect",{width:r,height:r,rx:r/2,ry:r/2,fill:l,strokeWidth:2})})})]})}const C=new M({scale:1.5,style:{stroke:"#999"}}),H=new O({tools:[C]});function B(){return t.jsx(x,{defaultLink:()=>new k({attrs:{line:{stroke:l}}}),renderElement:b,className:_,sorting:R.sorting.APPROX,linkPinning:!1,validateConnection:(e,i,o,n)=>e===o||!i||!n?!1:n.getAttribute("port-group")==="in",onLinkMouseEnter:({linkView:e})=>e.addTools(H),onLinkMouseLeave:({linkView:e})=>e.removeTools(),markAvailable:!0,highlighting:{[A.Highlighting.MAGNET_AVAILABILITY]:{name:"pulse",options:{radius:r/2+4}}},highlighterNamespace:{...T,pulse:v},defaultRouter:{name:"rightAngle",args:{margin:j}},defaultConnector:{name:"straight",args:{cornerType:"line",cornerPreserveAspectRatio:!0}},snapLinks:{radius:25},validateMagnet:(e,i)=>i.getAttribute("magnet")!=="passive"})}function g(){return t.jsx(I,{initialElements:G,children:t.jsx(B,{})})}g.__docgenInfo={description:"",methods:[],displayName:"App"};const Z=`/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { dia, highlighters, linkTools, V } from '@joint/core';
import { shapes } from '@joint/core';
import { createElements, type InferElement } from '../../../utils/create';
import { PAPER_CLASSNAME, PRIMARY, LIGHT, BG } from 'storybook-config/theme';
import {
  getLinkId,
  GraphProvider,
  jsx,
  MeasuredNode,
  Paper,
  Port,
  TextNode,
  useLinks,
} from '@joint/react';

const NODE_WIDTH = 150;
const NODE_HEIGHT = 55;
const NODE_BORDER_RADIUS = 10;
const PORT_SIZE = 20;
const unit = 10;

const Pulse = dia.HighlighterView.extend({
  tagName: 'g',
  attributes: {
    'pointer-events': 'none',
  },
  children() {
    const { radius = PORT_SIZE / 2 } = this.options;

    return jsx(
      <circle fill="none" r={radius} stroke={LIGHT} strokeWidth={2}>
        <animate
          attributeName="r"
          from="8"
          to="20"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="1"
          to="0"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    );
  },

  highlight(elementView: dia.ElementView, node: SVGElement) {
    this.renderChildren();
    const nodeBBox = elementView.getNodeBoundingRect(node);
    const nodeMatrix = elementView.getNodeMatrix(node);
    const position = V.transformRect(nodeBBox, nodeMatrix).center();
    this.el.setAttribute('transform', \`translate(\${position.x}, \${position.y})\`);
  },
});
const elements = createElements([
  {
    id: '1',
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
    x: 350,
    y: 50,
    attrs: {
      root: {
        magnet: false,
      },
    },
  },
  {
    id: '3',
    x: 150,
    y: 250,
    attrs: {
      root: {
        magnet: false,
      },
    },
  },
]);

type Element = InferElement<typeof elements>;

function NodeElement({ width, height, id }: Element) {
  const isConnected = useLinks((links) =>
    links
      .map((link) => {
        const sourceId = getLinkId(link.source);
        const targetId = getLinkId(link.target);
        return sourceId === id || targetId === id;
      })
      .includes(true)
  );

  return (
    <>
      <MeasuredNode>
        <rect
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          stroke={PRIMARY}
          strokeWidth={2}
          strokeDasharray={isConnected ? '0' : '5,5'}
          fill={isConnected ? PRIMARY : BG}
          rx={NODE_BORDER_RADIUS}
          ry={NODE_BORDER_RADIUS}
        />
      </MeasuredNode>
      <TextNode fill="white" x={width / 2} y={height / 2 + 4} textAnchor="middle" fontSize={16}>
        {id}
      </TextNode>
      <Port.Group id="in" position="top" x={NODE_WIDTH / 2 - PORT_SIZE / 2} y={-PORT_SIZE / 2}>
        <Port.Item id="port1">
          <rect
            width={PORT_SIZE}
            height={PORT_SIZE}
            rx={PORT_SIZE / 2}
            ry={PORT_SIZE / 2}
            fill={LIGHT}
            strokeWidth={2}
          />
        </Port.Item>
      </Port.Group>
      <Port.Group id="out" position="bottom" x={NODE_WIDTH / 2 - PORT_SIZE / 2} dy={-PORT_SIZE / 2}>
        <Port.Item id="port2">
          <rect
            width={PORT_SIZE}
            height={PORT_SIZE}
            rx={PORT_SIZE / 2}
            ry={PORT_SIZE / 2}
            fill={LIGHT}
            strokeWidth={2}
          />
        </Port.Item>
      </Port.Group>
    </>
  );
}

const removeTool = new linkTools.Remove({
  scale: 1.5,
  style: { stroke: '#999' },
});
const toolsView = new dia.ToolsView({
  tools: [removeTool],
});

function Main() {
  return (
    <Paper
      defaultLink={() => new shapes.standard.Link({ attrs: { line: { stroke: LIGHT } } })}
      renderElement={NodeElement}
      className={PAPER_CLASSNAME}
      sorting={dia.Paper.sorting.APPROX}
      linkPinning={false}
      validateConnection={(cellViewS, magnetS, cellViewT, magnetT) => {
        if (cellViewS === cellViewT) return false;
        if (!magnetS || !magnetT) return false;
        // Prevent linking to output ports.
        return magnetT.getAttribute('port-group') === 'in';
      }}
      onLinkMouseEnter={({ linkView }) => linkView.addTools(toolsView)}
      onLinkMouseLeave={({ linkView }) => linkView.removeTools()}
      markAvailable
      highlighting={{
        [dia.CellView.Highlighting.MAGNET_AVAILABILITY]: {
          name: 'pulse',
          options: {
            radius: PORT_SIZE / 2 + 4,
          },
        },
      }}
      highlighterNamespace={{
        ...highlighters,
        pulse: Pulse,
      }}
      defaultRouter={{
        name: 'rightAngle',
        args: {
          margin: unit,
        },
      }}
      defaultConnector={{
        name: 'straight',
        args: { cornerType: 'line', cornerPreserveAspectRatio: true },
      }}
      snapLinks={{ radius: 25 }}
      validateMagnet={(_cellView, magnet) => {
        return magnet.getAttribute('magnet') !== 'passive';
      }}
    />
  );
}

export default function App() {
  return (
    <GraphProvider initialElements={elements}>
      <Main />
    </GraphProvider>
  );
}
`,re={title:"Demos/Pulsing Port",component:g,parameters:{docs:{description:{story:"Demo of pulsing port using SVG animations and CSS keyframes for ports."},source:{code:Z}}}},ie={};export{ie as Default,re as default};
