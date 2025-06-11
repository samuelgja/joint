import{j as c}from"./index-DwP6fAIG.js";import{Q as A,S as k,f as M,G as S,b as T,c as I,P as L,M as E}from"./create-njWDpS2D.js";import{P as x,a as O,S as C}from"./theme-BZH0jGzG.js";import{r as y}from"./index-B0WjJBI_.js";import{H as R}from"./index-4CDyDOw8.js";import{T as j,b as z,s as F,a as V}from"./helpers-BazfYDoP.js";import{M as P}from"./measured-node-BZZgBNj5.js";const b=j.extend({tagName:"g",type:null,children:[{tagName:"circle",selector:"anchor",attributes:{cursor:"pointer"}},{tagName:"rect",selector:"area",attributes:{"pointer-events":"none",fill:"none",stroke:"#33334F","stroke-dasharray":"2,4",rx:5,ry:5}}],events:{mousedown:"onPointerDown",touchstart:"onPointerDown",dblclick:"onPointerDblClick",dbltap:"onPointerDblClick"},documentEvents:{mousemove:"onPointerMove",touchmove:"onPointerMove",mouseup:"onPointerUp",touchend:"onPointerUp",touchcancel:"onPointerUp"},options:{snap:F,anchor:z,scale:null,resetAnchor:!0,customAnchorAttributes:{"stroke-width":4,stroke:"#33334F",fill:"#FFFFFF",r:5},defaultAnchorAttributes:{"stroke-width":2,stroke:"#FFFFFF",fill:"#33334F",r:6},areaPadding:6,snapRadius:10,restrictArea:!0,redundancyRemoval:!0},onRender:function(){this.renderChildren(),this.toggleArea(!1),this.update()},update:function(){var e=this.type,t=this.relatedView,o=t.getEndView(e);return o?(this.updateAnchor(),this.updateArea(),this.el.style.display=""):this.el.style.display="none",this},updateAnchor:function(){var e=this.childNodes;if(!e)return;var t=e.anchor;if(!t)return;var o=this.relatedView,i=this.type,a=o.getEndAnchor(i),s=this.options,l=o.model.prop([i,"anchor"]);let n=`translate(${a.x},${a.y})`;s.scale&&(n+=` scale(${s.scale})`),t.setAttribute("transform",n);var r=l?s.customAnchorAttributes:s.defaultAnchorAttributes;for(var d in r)t.setAttribute(d,r[d])},updateArea:function(){var e=this.childNodes;if(e){var t=e.area;if(t){var o=this.relatedView,i=this.type,a=o.getEndView(i),s=a.model,l=o.getEndMagnet(i),n=this.options.areaPadding;isFinite(n)||(n=0);var r,d,h;a.isNodeConnection(l)?(r=a.getNodeBBox(l),d=0,h=r.center()):(r=a.getNodeUnrotatedBBox(l),d=s.angle(),h=r.center(),d&&h.rotate(s.getCenter(),-d)),r.inflate(n),t.setAttribute("x",-r.width/2),t.setAttribute("y",-r.height/2),t.setAttribute("width",r.width),t.setAttribute("height",r.height),t.setAttribute("transform","translate("+h.x+","+h.y+") rotate("+d+")")}}},toggleArea:function(e){var t=this.childNodes;if(t){var o=t.area;o&&(o.style.display=e?"":"none")}},onPointerDown:function(e){this.guard(e)||(e.stopPropagation(),e.preventDefault(),this.paper.undelegateEvents(),this.delegateDocumentEvents(),this.focus(),this.toggleArea(this.options.restrictArea),this.relatedView.model.startBatch("anchor-move",{ui:!0,tool:this.cid}))},resetAnchor:function(e){var t=this.type,o=this.relatedView.model;e?o.prop([t,"anchor"],e,{rewrite:!0,ui:!0,tool:this.cid}):o.removeProp([t,"anchor"],{ui:!0,tool:this.cid})},onPointerMove:function(e){var t=this.relatedView,o=this.type,i=t.getEndView(o),a=i.model,s=t.getEndMagnet(o),l=k(e),n=this.paper.clientToLocalPoint(l.clientX,l.clientY),r=this.options.snap;if(typeof r=="function"&&(n=r.call(t,n,i,s,o,t,this),n=new M(n)),this.options.restrictArea)if(i.isNodeConnection(s)){var d=i.getClosestPoint(n);d&&(n=d)}else{var h=i.getNodeUnrotatedBBox(s),g=a.angle(),f=a.getCenter(),u=n.clone().rotate(f,g);h.containsPoint(u)||(n=h.pointNearestToPoint(u).rotate(f,-g))}var w,v=this.options.anchor;typeof v=="function"&&(w=v.call(t,n,i,s,o,t)),this.resetAnchor(w),this.update()},onPointerUp:function(e){const t=k(e);this.paper.delegateEvents(),this.undelegateDocumentEvents(),this.blur(),this.toggleArea(!1);var o=this.relatedView;this.options.redundancyRemoval&&o.removeRedundantLinearVertices({ui:!0,tool:this.cid}),o.checkMouseleave(t),o.model.stopBatch("anchor-move",{ui:!0,tool:this.cid})},onPointerDblClick:function(){var e=this.options.resetAnchor;e!==!1&&(e===!0&&(e=null),this.resetAnchor(A(e)),this.update())}}),D=b.extend({name:"source-anchor",type:"source"}),_=b.extend({name:"target-anchor",type:"target"}),m=4,$=I([{id:"start",label:"Start",nodeType:"start",cx:50,cy:40},{id:"addToCart",label:"Add to Cart",nodeType:"step",cx:200,cy:40},{id:"checkoutItems",label:"Checkout Items",nodeType:"step",cx:350,cy:40},{id:"addShippingInfo",label:"Add Shipping Info",nodeType:"step",cx:500,cy:40},{id:"addPaymentInfo",label:"Add Payment Info",nodeType:"step",cx:500,cy:140},{id:"validPayment",label:"Valid Payment?",nodeType:"decision",cx:500,cy:250},{id:"presentErrorMessage",label:"Present Error Message",nodeType:"step",cx:750,cy:350},{id:"sendOrder",label:"Send Order to Warehouse",nodeType:"step",cx:200,cy:250},{id:"packOrder",label:"Pack Order",nodeType:"step",cx:40,cy:350},{id:"qualityCheck",label:"Quality Check?",nodeType:"decision",cx:200,cy:460},{id:"shipItems",label:"Ship Items to Customer",nodeType:"step",cx:500,cy:460}]),p={z:2,attrs:{line:{class:"link",stroke:x,strokeWidth:2,targetMarker:{d:"M 0 0 L 8 4 L 8 -4 Z"}}},defaultLabel:{attrs:{line:{class:"jj-flow-line",targetMarker:{class:"jj-flow-arrowhead",d:`M 0 0 L ${2*m} ${m} L ${2*m} -${m} Z`}},outline:{class:"jj-flow-outline",connection:!0}},markup:[{tagName:"path",selector:"labelBody"},{tagName:"text",selector:"labelText"}]}},B=T([{...p,id:"flow1",source:"start",target:"addToCart"},{...p,id:"flow2",source:"addToCart",target:"checkoutItems"},{...p,id:"flow3",source:"checkoutItems",target:"addShippingInfo"},{...p,id:"flow4",source:"addShippingInfo",target:"addPaymentInfo"},{...p,id:"flow5",source:"addPaymentInfo",target:"validPayment"},{...p,id:"flow6",source:"validPayment",target:"presentErrorMessage",label:"No"},{...p,id:"flow7",source:"presentErrorMessage",target:"addPaymentInfo"},{...p,id:"flow8",source:"validPayment",target:"sendOrder",label:"Yes"},{...p,id:"flow9",source:"sendOrder",target:"packOrder"},{...p,id:"flow10",source:"packOrder",target:"qualityCheck"},{...p,id:"flow11",source:"qualityCheck",target:"shipItems",label:"Ok"},{...p,id:"flow12",source:"qualityCheck",target:"sendOrder",label:"Not Ok"}]);function H({label:e,width:t,cx:o,cy:i,onMouseEnter:a,onMouseLeave:s},l){const n=t,r=n/2,d=20,h=({element:g,size:f})=>{const u=Math.max(f.width,f.height)+2*d;g.set({size:{width:u,height:u},position:{x:o-u/2,y:i-u/2}})};return c.jsxs(c.Fragment,{children:[c.jsx("polygon",{onMouseEnter:a,onMouseLeave:s,ref:l,points:`${r},0 ${n},${r} ${r},${n} 0,${r}`,fill:"transparent",stroke:x,strokeWidth:"2"}),c.jsx(P,{setSize:h,children:c.jsx("text",{onMouseEnter:a,onMouseLeave:s,x:r,y:r,textAnchor:"middle",dominantBaseline:"middle",fontSize:"10",fill:"white",children:e})})]})}function G({label:e,width:t,height:o,cx:i,cy:a,onMouseEnter:s,onMouseLeave:l},n){const d=({element:h,size:g})=>{const f=g.width+40,u=g.height+2*20;h.set({size:{width:f,height:u},position:{x:i-f/2,y:a-u/2}})};return!t||!o?null:c.jsxs(c.Fragment,{children:[c.jsx("rect",{onMouseEnter:s,onMouseLeave:l,ref:n,width:t,height:o,fill:"transparent",stroke:"red",strokeWidth:"2",strokeLinejoin:"bevel",rx:m,ry:m}),c.jsx(P,{setSize:d,children:c.jsx("text",{onMouseEnter:s,onMouseLeave:l,x:t/2,y:o/2,textAnchor:"middle",dominantBaseline:"middle",fontSize:"10",fill:"white",children:e})})]})}const K=y.forwardRef(H),W=y.forwardRef(G);function Y(e){const{nodeType:t}=e,[o,i]=y.useState(!1),a=t==="decision"?c.jsx(K,{...e,onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1)}):c.jsx(W,{...e,onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1)});return c.jsx(R.Mask,{isHidden:!o,stroke:C,padding:2,strokeWidth:2,children:a})}function q(){return c.jsx(L,{onLinkMouseEnter:({linkView:e,paper:t})=>{t.removeTools(),E.removeAll(t);const o=(a,s)=>{const l=s.model.getBBox(),n=l.pointNearestToPoint(a),r=l.center(),d=10;return Math.abs(n.x-r.x)<d&&(n.x=r.x),Math.abs(n.y-r.y)<d&&(n.y=r.y),n},i=new V({tools:[new _({snap:o,resetAnchor:!0}),new D({snap:o,resetAnchor:!0})]});i.el.classList.add("jj-flow-tools"),e.addTools(i)},onLinkMouseLeave:({linkView:e})=>{e.removeTools()},gridSize:5,height:600,onElementsSizeReady:({paper:e})=>{e.transformToFitContent({padding:40,useModelGeometry:!0,verticalAlign:"middle",horizontalAlign:"middle"})},width:"100%",className:O,renderElement:Y,interactive:{linkMove:!1},defaultConnectionPoint:{name:"anchor",args:{offset:m*2,extrapolate:!0,useModelGeometry:!0}},defaultAnchor:{name:"midSide",args:{useModelGeometry:!0}},defaultRouter:{name:"rightAngle",args:{margin:m*7}},defaultConnector:{name:"straight",args:{cornerType:"line",cornerPreserveAspectRatio:!0}}})}function N(){return c.jsx(S,{initialElements:$,initialLinks:B,children:c.jsx(q,{})})}N.__docgenInfo={description:"",methods:[],displayName:"App"};const U=`/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import './index.css';
import type { GraphLink, OnSetSize } from '@joint/react';
import {
  createElements,
  createLinks,
  GraphProvider,
  Highlighter,
  MeasuredNode,
  Paper,
  type InferElement,
} from '@joint/react';
import { PAPER_CLASSNAME, PRIMARY, SECONDARY } from 'storybook-config/theme';
import { dia, linkTools } from '@joint/core';
import { forwardRef, useState, type FC } from 'react';

const unit = 4;

type NodeElement = {
  id: string;
  label: string;
  nodeType: 'start' | 'step' | 'decision';
  cx: number;
  cy: number;
};

const flowchartNodes = createElements<NodeElement>([
  { id: 'start', label: 'Start', nodeType: 'start', cx: 50, cy: 40 },
  {
    id: 'addToCart',
    label: 'Add to Cart',
    nodeType: 'step',
    cx: 200,
    cy: 40,
  },
  {
    id: 'checkoutItems',
    label: 'Checkout Items',
    nodeType: 'step',
    cx: 350,
    cy: 40,
  },
  {
    id: 'addShippingInfo',
    label: 'Add Shipping Info',
    nodeType: 'step',
    cx: 500,
    cy: 40,
  },
  {
    id: 'addPaymentInfo',
    label: 'Add Payment Info',
    nodeType: 'step',
    cx: 500,
    cy: 140,
  },
  {
    id: 'validPayment',
    label: 'Valid Payment?',
    nodeType: 'decision',
    cx: 500,
    cy: 250,
  },
  {
    id: 'presentErrorMessage',
    label: 'Present Error Message',
    nodeType: 'step',
    cx: 750,
    cy: 350,
  },
  {
    id: 'sendOrder',
    label: 'Send Order to Warehouse',
    nodeType: 'step',
    cx: 200,
    cy: 250,
  },
  {
    id: 'packOrder',
    label: 'Pack Order',
    nodeType: 'step',
    cx: 40,
    cy: 350,
  },
  {
    id: 'qualityCheck',
    label: 'Quality Check?',
    nodeType: 'decision',
    cx: 200,
    cy: 460,
  },
  {
    id: 'shipItems',
    label: 'Ship Items to Customer',
    nodeType: 'step',
    cx: 500,
    cy: 460,
  },
]);
const LINK_OPTIONS: Partial<GraphLink> = {
  z: 2,
  attrs: {
    line: {
      class: 'link',
      stroke: PRIMARY,
      strokeWidth: 2,
      targetMarker: {
        d: \`M 0 0 L 8 4 L 8 -4 Z\`, // Larger arrowhead
      },
    },
  },

  defaultLabel: {
    attrs: {
      line: {
        class: 'jj-flow-line',
        targetMarker: {
          class: 'jj-flow-arrowhead',
          d: \`M 0 0 L \${2 * unit} \${unit} L \${2 * unit} -\${unit} Z\`,
        },
      },
      // The \`outline\` path is added to the \`standard.Link\` below in \`markup\`\`
      // We want to keep the \`wrapper\` path to do its original job,
      // which is the hit testing
      outline: {
        class: 'jj-flow-outline',
        connection: true,
      },
    },
    markup: [
      {
        tagName: 'path',
        selector: 'labelBody',
      },
      {
        tagName: 'text',
        selector: 'labelText',
      },
    ],
  },
};
const flowchartLinks = createLinks([
  { ...LINK_OPTIONS, id: 'flow1', source: 'start', target: 'addToCart' },
  { ...LINK_OPTIONS, id: 'flow2', source: 'addToCart', target: 'checkoutItems' },
  { ...LINK_OPTIONS, id: 'flow3', source: 'checkoutItems', target: 'addShippingInfo' },
  { ...LINK_OPTIONS, id: 'flow4', source: 'addShippingInfo', target: 'addPaymentInfo' },
  { ...LINK_OPTIONS, id: 'flow5', source: 'addPaymentInfo', target: 'validPayment' },
  {
    ...LINK_OPTIONS,
    id: 'flow6',
    source: 'validPayment',
    target: 'presentErrorMessage',
    label: 'No',
  },
  {
    ...LINK_OPTIONS,
    id: 'flow7',
    source: 'presentErrorMessage',
    target: 'addPaymentInfo',
  },
  {
    ...LINK_OPTIONS,
    id: 'flow8',
    source: 'validPayment',
    target: 'sendOrder',
    label: 'Yes',
  },
  { ...LINK_OPTIONS, id: 'flow9', source: 'sendOrder', target: 'packOrder' },
  { ...LINK_OPTIONS, id: 'flow10', source: 'packOrder', target: 'qualityCheck' },
  {
    ...LINK_OPTIONS,
    id: 'flow11',
    source: 'qualityCheck',
    target: 'shipItems',
    label: 'Ok',
  },
  {
    ...LINK_OPTIONS,
    id: 'flow12',
    source: 'qualityCheck',
    target: 'sendOrder',
    label: 'Not Ok',
  },
]);

interface PropsWithClick {
  readonly onMouseEnter?: () => void;
  readonly onMouseLeave?: () => void;
  readonly isToolActive?: boolean;
}
type FlowchartNodeProps = InferElement<typeof flowchartNodes> & PropsWithClick;

function DecisionNodeRaw(
  { label, width, cx, cy, onMouseEnter, onMouseLeave }: FlowchartNodeProps,
  ref: React.ForwardedRef<SVGPolygonElement>
) {
  // If we define custom size, not defined in initial nodes, we have to use measure node
  const size = width;
  const half = size / 2;
  const padding = 20;

  const setSize: OnSetSize = ({ element, size }) => {
    const dimension = Math.max(size.width, size.height) + 2 * padding;
    element.set({
      size: { width: dimension, height: dimension },
      position: { x: cx - dimension / 2, y: cy - dimension / 2 },
    });
  };

  return (
    <>
      <polygon
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
        points={\`\${half},0 \${size},\${half} \${half},\${size} 0,\${half}\`}
        fill="transparent"
        stroke={PRIMARY}
        strokeWidth="2"
      />

      <MeasuredNode setSize={setSize}>
        <text
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          x={half}
          y={half}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill={'white'}
        >
          {label}
        </text>
      </MeasuredNode>
    </>
  );
}

function StepNodeRaw(
  { label, width, height, cx, cy, onMouseEnter, onMouseLeave }: FlowchartNodeProps,
  ref: React.ForwardedRef<SVGRectElement>
) {
  const padding = 20;

  const setSize: OnSetSize = ({ element, size }) => {
    const w = size.width + 2 * padding;
    const h = size.height + 2 * padding;
    element.set({
      size: { width: w, height: h },
      position: { x: cx - w / 2, y: cy - h / 2 },
    });
  };

  // discuss
  if (!width || !height) {
    return null;
  }

  return (
    <>
      <rect
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
        width={width}
        height={height}
        fill="transparent"
        stroke="red"
        strokeWidth="2"
        strokeLinejoin="bevel"
        rx={unit}
        ry={unit}
      />
      <MeasuredNode setSize={setSize}>
        <text
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill={'white'}
        >
          {label}
        </text>
      </MeasuredNode>
    </>
  );
}
// We need to forward ref, so highlighter can access the element
const DecisionNode: FC<FlowchartNodeProps> = forwardRef(DecisionNodeRaw as never);
const StepNode: FC<FlowchartNodeProps> = forwardRef(StepNodeRaw as never);

// Custom render function that maps the node type to a CSS class for styling
function RenderFlowchartNode(props: FlowchartNodeProps) {
  const { nodeType } = props;

  const [isHighlighted, setIsHighlighted] = useState(false);
  const content =
    nodeType === 'decision' ? (
      <DecisionNode
        {...props}
        onMouseEnter={() => setIsHighlighted(true)}
        onMouseLeave={() => setIsHighlighted(false)}
      />
    ) : (
      <StepNode
        {...props}
        onMouseEnter={() => setIsHighlighted(true)}
        onMouseLeave={() => setIsHighlighted(false)}
      />
    );
  return (
    <Highlighter.Mask isHidden={!isHighlighted} stroke={SECONDARY} padding={2} strokeWidth={2}>
      {content}
    </Highlighter.Mask>
  );
}

// Create link tools

function Main() {
  return (
    <Paper
      onLinkMouseEnter={({ linkView, paper }) => {
        paper.removeTools();
        dia.HighlighterView.removeAll(paper);
        const snapAnchor: linkTools.AnchorCallback<dia.Point> = (
          coords: dia.Point,
          endView: dia.CellView
        ) => {
          const bbox = endView.model.getBBox();
          // Find the closest point on the bbox border.
          const point = bbox.pointNearestToPoint(coords);
          const center = bbox.center();
          // Snap the point to the center of the bbox if it's close enough.
          const snapRadius = 10;
          if (Math.abs(point.x - center.x) < snapRadius) {
            point.x = center.x;
          }
          if (Math.abs(point.y - center.y) < snapRadius) {
            point.y = center.y;
          }
          return point;
        };
        const toolsView = new dia.ToolsView({
          tools: [
            new linkTools.TargetAnchor({
              snap: snapAnchor,
              resetAnchor: true,
            }),
            new linkTools.SourceAnchor({
              snap: snapAnchor,
              resetAnchor: true,
            }),
          ],
        });
        toolsView.el.classList.add('jj-flow-tools');
        linkView.addTools(toolsView);
      }}
      onLinkMouseLeave={({ linkView }) => {
        linkView.removeTools();
      }}
      gridSize={5}
      height={600}
      onElementsSizeReady={({ paper }) => {
        paper.transformToFitContent({
          padding: 40,
          useModelGeometry: true,
          verticalAlign: 'middle',
          horizontalAlign: 'middle',
        });
      }}
      width="100%"
      className={PAPER_CLASSNAME}
      renderElement={RenderFlowchartNode}
      interactive={{ linkMove: false }}
      defaultConnectionPoint={{
        name: 'anchor',
        args: {
          offset: unit * 2,
          extrapolate: true,
          useModelGeometry: true,
        },
      }}
      defaultAnchor={{
        name: 'midSide',
        args: {
          useModelGeometry: true,
        },
      }}
      defaultRouter={{
        name: 'rightAngle',
        args: {
          margin: unit * 7,
        },
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
    <GraphProvider initialElements={flowchartNodes} initialLinks={flowchartLinks}>
      <Main />
    </GraphProvider>
  );
}
`,Z={title:"Demos/Flowchart",component:N,parameters:{docs:{description:{story:"Demo of flowchart"},source:{code:U}}}},Q={},ie=Object.freeze(Object.defineProperty({__proto__:null,Default:Q,default:Z},Symbol.toStringTag,{value:"Module"}));export{U as C,Q as D,ie as S};
