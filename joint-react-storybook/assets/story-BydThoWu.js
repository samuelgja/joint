/* empty css              */import{j as r}from"./index-DwP6fAIG.js";import{D as x,S as u,f as p,V as E,U as P,G as y,b as V,c as b,P as L,v as R}from"./create-njWDpS2D.js";import{r as A}from"./index-B0WjJBI_.js";import{P as c,a as D,S as f,b as g}from"./theme-BZH0jGzG.js";import{T as k,g as M,a as j}from"./helpers-BazfYDoP.js";import{B as N}from"./Button-B36ztity.js";import{m as C}from"./make-story-CJLFqcT8.js";var v=x.extend({tagName:"circle",svgElement:!0,className:"marker-vertex",events:{mousedown:"onPointerDown",touchstart:"onPointerDown",dblclick:"onDoubleClick",dbltap:"onDoubleClick"},documentEvents:{mousemove:"onPointerMove",touchmove:"onPointerMove",mouseup:"onPointerUp",touchend:"onPointerUp",touchcancel:"onPointerUp"},attributes:{r:6,fill:"#33334F",stroke:"#FFFFFF","stroke-width":2,cursor:"move"},position:function(e,t){const{vel:n,options:i}=this,{scale:s}=i;let o=E.createSVGMatrix().translate(e,t);s&&(o=o.scale(s)),n.transform(o,{absolute:!0})},onPointerDown:function(e){this.options.guard(e)||(e.stopPropagation(),e.preventDefault(),this.options.paper.undelegateEvents(),this.delegateDocumentEvents(null,e.data),this.trigger("will-change",this,e))},onPointerMove:function(e){this.trigger("changing",this,e)},onDoubleClick:function(e){this.trigger("remove",this,e)},onPointerUp:function(e){this.trigger("changed",this,e),this.undelegateDocumentEvents(),this.options.paper.delegateEvents()}});const m=k.extend({name:"vertices",options:{handleClass:v,snapRadius:20,redundancyRemoval:!0,vertexAdding:!0,stopPropagation:!0,scale:null},children:[{tagName:"path",selector:"connection",className:"joint-vertices-path",attributes:{fill:"none",stroke:"transparent","stroke-width":10,cursor:"cell"}}],handles:null,interactiveLinkNode:null,events:{"mousedown .joint-vertices-path":"onPathPointerDown","touchstart .joint-vertices-path":"onPathPointerDown"},linkEvents:{mousedown:"onLinkPointerDown",touchstart:"onLinkPointerDown"},onRender:function(){const{vertexAdding:e}=this.options;if(e){const{interactiveLinkNode:t=null}=e;t?this.delegateLinkEvents(t):(this.renderChildren(),this.updatePath())}return this.resetHandles(),this.renderHandles(),this},delegateLinkEvents:function(e){this.undelegateLinkEvents();const t=this.relatedView.findNode(e);if(!t){console.warn(`Interactive link node "${e}" not found.`);return}t.classList.add("joint-vertices-path"),this.interactiveLinkNode=t,this.delegateElementEvents(t,this.linkEvents)},undelegateLinkEvents:function(){const e=this.interactiveLinkNode;e&&(this.undelegateElementEvents(e),e.classList.remove("joint-vertices-path"),this.interactiveLinkNode=null)},update:function(){var e=this.relatedView,t=e.model.vertices();return t.length===this.handles.length?this.updateHandles():(this.resetHandles(),this.renderHandles()),this.options.vertexAdding&&this.updatePath(),this},resetHandles:function(){var e=this.handles;if(this.handles=[],this.stopListening(),!!Array.isArray(e))for(var t=0,n=e.length;t<n;t++)e[t].remove()},renderHandles:function(){for(var e=this.relatedView,t=e.model.vertices(),n=0,i=t.length;n<i;n++){var s=t[n],o=new this.options.handleClass({index:n,paper:this.paper,scale:this.options.scale,guard:a=>this.guard(a)});o.render(),o.position(s.x,s.y),this.simulateRelatedView(o.el),o.vel.appendTo(this.el),this.handles.push(o),this.startHandleListening(o)}},updateHandles:function(){for(var e=this.relatedView,t=e.model.vertices(),n=0,i=t.length;n<i;n++){var s=t[n],o=this.handles[n];if(!o)return;o.position(s.x,s.y)}},updatePath:function(){if(this.interactiveLinkNode)return;const e=this.childNodes.connection;e&&e.setAttribute("d",this.relatedView.getSerializedConnection())},startHandleListening:function(e){const{vertexRemoving:t=!0,vertexMoving:n=!0}=this.options;n&&(this.listenTo(e,"will-change",this.onHandleWillChange),this.listenTo(e,"changing",this.onHandleChanging),this.listenTo(e,"changed",this.onHandleChanged)),t&&this.listenTo(e,"remove",this.onHandleRemove)},getNeighborPoints:function(e){var t=this.relatedView,n=t.model.vertices(),i=e>0?n[e-1]:t.sourceAnchor,s=e<n.length-1?n[e+1]:t.targetAnchor;return{prev:new p(i),next:new p(s)}},onHandleWillChange:function(e,t){this.focus();const{relatedView:n,options:i}=this;n.model.startBatch("vertex-move",{ui:!0,tool:this.cid}),i.stopPropagation||n.notifyPointerdown(...n.paper.getPointerArgs(t))},onHandleChanging:function(e,t){const{options:n,relatedView:i}=this;var s=e.options.index,[o,a,d]=i.paper.getPointerArgs(t),l={x:a,y:d};this.snapVertex(l,s),i.model.vertex(s,l,{ui:!0,tool:this.cid}),e.position(l.x,l.y),n.stopPropagation||i.notifyPointermove(o,a,d)},onHandleChanged:function(e,t){const{options:n,relatedView:i}=this;n.vertexAdding&&this.updatePath(),n.redundancyRemoval&&i.removeRedundantLinearVertices({ui:!0,tool:this.cid})&&this.render(),this.blur(),i.model.stopBatch("vertex-move",{ui:!0,tool:this.cid}),this.eventData(t).vertexAdded&&i.model.stopBatch("vertex-add",{ui:!0,tool:this.cid});const[s,o,a]=i.paper.getPointerArgs(t);n.stopPropagation||i.notifyPointerup(s,o,a),i.checkMouseleave(s)},snapVertex:function(e,t){var n=this.options.snapRadius;if(n>0){var i=this.getNeighborPoints(t),s=i.prev,o=i.next;Math.abs(e.x-s.x)<n?e.x=s.x:Math.abs(e.x-o.x)<n&&(e.x=o.x),Math.abs(e.y-s.y)<n?e.y=i.prev.y:Math.abs(e.y-o.y)<n&&(e.y=o.y)}},onHandleRemove:function(e,t){var n=e.options.index,i=this.relatedView;i.model.removeVertex(n,{ui:!0}),this.options.vertexAdding&&this.updatePath(),i.checkMouseleave(u(t))},onPathPointerDown:function(e){if(!this.guard(e)){e.stopPropagation(),e.preventDefault();var t=u(e),n=this.paper.snapToGrid(t.clientX,t.clientY).toJSON(),i=this.relatedView;i.model.startBatch("vertex-add",{ui:!0,tool:this.cid});var s=i.getVertexIndex(n.x,n.y);this.snapVertex(n,s),i.model.insertVertex(s,n,{ui:!0,tool:this.cid}),this.update();var o=this.handles[s];this.eventData(t,{vertexAdded:!0}),o.onPointerDown(t)}},onLinkPointerDown:function(e){this.relatedView.preventDefaultInteraction(e),this.onPathPointerDown(e)},onRemove:function(){this.resetHandles(),this.undelegateLinkEvents()}},{VertexHandle:v}),T=k.extend({name:"boundary",tagName:"rect",options:{padding:10,useModelGeometry:!1},attributes:{fill:"none",stroke:"#33334F","stroke-width":.5,"stroke-dasharray":"5, 5","pointer-events":"none"},onRender:function(){this.update()},update:function(){const{relatedView:e,options:t,vel:n}=this,{useModelGeometry:i,rotate:s}=t,o=P(t.padding);let a=M(e,i).moveAndExpand({x:-o.left,y:-o.top,width:o.left+o.right,height:o.top+o.bottom});var d=e.model;if(d.isElement()){var l=d.angle();if(l)if(s){var h=d.getCenter();n.rotate(l,h.x,h.y,{absolute:!0})}else a=a.bbox(l)}return n.attr(a.toJSON()),this}}),H=V([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:c,strokeDasharray:"5 5"}}}]),B=b([{id:"1",label:"Node 1",x:100,y:10,width:120,height:30},{id:"2",label:"Node 2",x:100,y:200,width:120,height:30}]),S=new m({handleClass:m.VertexHandle.extend({style:{fill:g,stroke:f,strokeWidth:2}})}),G=new T({style:{stroke:"#999"}}),I=new N({markup:R(r.jsxs(r.Fragment,{children:[r.jsx("circle",{r:"8",fill:g,stroke:c,strokeWidth:"2",cursor:"pointer"}),r.jsx("path",{d:"M -5 0 L 5 0 M 0 -5 L 0 5",fill:"none",stroke:f,strokeWidth:"2",pointerEvents:"none"})]})),distance:20,action:()=>{alert("Info button clicked")}}),W=new j({tools:[G,S,I]});function _({width:e,height:t}){return r.jsx("rect",{rx:5,ry:5,width:e,height:t,stroke:c,strokeWidth:"2",fill:"transparent"})}function Y(){const e=A.useCallback(t=>r.jsx(_,{...t}),[]);return r.jsxs("div",{style:{display:"flex",flexDirection:"row",position:"relative"},children:[r.jsx(L,{width:"100%",className:D,height:280,renderElement:e,onLinkMouseEnter:({linkView:t})=>t.addTools(W),onLinkMouseLeave:({linkView:t})=>t.removeTools()}),r.jsx("div",{style:{position:"absolute",top:0,right:0}})]})}function w(){return r.jsx(y,{initialElements:B,initialLinks:H,children:r.jsx(Y,{})})}w.__docgenInfo={description:"",methods:[],displayName:"App"};const F=`/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { dia, linkTools } from '@joint/core';
import '../index.css';
import {
  createElements,
  createLinks,
  GraphProvider,
  Paper,
  jsx,
  type InferElement,
  type RenderElement,
} from '@joint/react';
import { useCallback } from 'react';
import { PRIMARY, BG, SECONDARY, PAPER_CLASSNAME } from 'storybook-config/theme';

const initialEdges = createLinks([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    attrs: {
      line: {
        stroke: PRIMARY,
        strokeDasharray: '5 5',
      },
    },
  },
]);

const initialElements = createElements([
  { id: '1', label: 'Node 1', x: 100, y: 10, width: 120, height: 30 },
  { id: '2', label: 'Node 2', x: 100, y: 200, width: 120, height: 30 },
]);

// 1) creating link tools
const verticesTool = new linkTools.Vertices({
  handleClass: linkTools.Vertices.VertexHandle.extend({
    style: {
      fill: BG,
      stroke: SECONDARY,
      strokeWidth: 2,
    },
  }),
});

const boundaryTool = new linkTools.Boundary({
  style: { stroke: '#999' },
});
// 2) create custom link tool

const infoButton = new linkTools.Button({
  // using jsx utility by joint-jsx, convert jsx to markup
  markup: jsx(
    <>
      <circle r="8" fill={BG} stroke={PRIMARY} strokeWidth="2" cursor="pointer" />
      <path
        d="M -5 0 L 5 0 M 0 -5 L 0 5"
        fill="none"
        stroke={SECONDARY}
        strokeWidth="2"
        pointerEvents="none"
      />
    </>
  ),
  distance: 20,
  action: () => {
    alert('Info button clicked');
  },
});

// 3) creating a tools view
const toolsView = new dia.ToolsView({
  tools: [boundaryTool, verticesTool, infoButton],
});

type BaseElementWithData = InferElement<typeof initialElements>;

function RectElement({ width, height }: BaseElementWithData) {
  return (
    <rect
      rx={5}
      ry={5}
      width={width}
      height={height}
      stroke={PRIMARY}
      strokeWidth="2"
      fill="transparent"
    />
  );
}

function Main() {
  const renderElement: RenderElement<BaseElementWithData> = useCallback(
    (props) => <RectElement {...props} />,
    []
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <Paper
        width="100%"
        className={PAPER_CLASSNAME}
        height={280}
        renderElement={renderElement}
        // add listeners when show and hide tools
        onLinkMouseEnter={({ linkView }) => linkView.addTools(toolsView)}
        onLinkMouseLeave={({ linkView }) => linkView.removeTools()}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      ></div>
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
`,O={title:"Examples/Link tools",component:w,parameters:C({code:F})},z={},ee=Object.freeze(Object.defineProperty({__proto__:null,Default:z,default:O},Symbol.toStringTag,{value:"Module"}));export{F as C,z as D,ee as S};
