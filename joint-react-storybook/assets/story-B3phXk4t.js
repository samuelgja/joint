/* empty css              */import{j as r}from"./index-DwP6fAIG.js";import{G as E,c as g,L as I,C as k,P as x,j as y,e as N}from"./create-njWDpS2D.js";import{r as d}from"./index-B0WjJBI_.js";import{a as D,S as R}from"./theme-BZH0jGzG.js";import{M as b}from"./measured-node-BZZgBNj5.js";import{m as C}from"./make-story-CJLFqcT8.js";const M=g([{id:"1",label:"Node 1",x:100,y:0},{id:"2",label:"Node 2",x:100,y:200},{id:"3",label:"Node 3",x:280,y:100},{id:"4",label:"Node 4",x:0,y:100}]);class c extends I{defaults(){return k({type:"DashedLink",attrs:{line:{stroke:R,strokeWidth:2,strokeDasharray:"5,5",sourceMarker:{d:"M 10 -5 0 0 10 5 z"}}}},super.defaults)}}const L=60;function a(e,i){return`${e}-${i}`}function j({id:e,label:i,width:p,height:f}){const t=y(),u=d.useRef(null),h=t.getCell(e),l=N(()=>{const n=h.getBBox().inflate(L);return t.findElementsInArea(n).filter(s=>s.id!==e).map(s=>s.id)});return d.useEffect(()=>{for(const n of l){const o=a(e,n);if(t.getCell(o)||t.getCell(a(n,e)))continue;const s=new c({id:o,source:{id:e},target:{id:n}});t.addCell(s,{async:!1})}return()=>{var n;for(const o of l){const s=a(e,o);(n=t.getCell(s))==null||n.remove()}}},[l,t,e]),r.jsx("foreignObject",{width:p,height:f,children:r.jsx(b,{ref:u,children:r.jsx("div",{className:"node",children:i})})})}function A(){return r.jsx("div",{style:{display:"flex",flexDirection:"row",position:"relative"},children:r.jsx(x,{width:"100%",className:D,height:280,renderElement:j,defaultAnchor:{name:"perpendicular",args:{useModelGeometry:!0}}})})}function m(){return r.jsx(E,{initialElements:M,cellNamespace:{DashedLink:c},children:r.jsx(A,{})})}m.__docgenInfo={description:"",methods:[],displayName:"App"};const P=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
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
import { useEffect, useRef } from 'react';
import { shapes, util } from '@joint/core';
import { PAPER_CLASSNAME, SECONDARY } from 'storybook-config/theme';
import type { dia } from '../../../../../joint-core/types';

const initialElements = createElements([
  { id: '1', label: 'Node 1', x: 100, y: 0 },
  { id: '2', label: 'Node 2', x: 100, y: 200 },
  { id: '3', label: 'Node 3', x: 280, y: 100 },
  { id: '4', label: 'Node 4', x: 0, y: 100 },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

class DashedLink extends shapes.standard.Link {
  defaults() {
    return util.defaultsDeep(
      {
        type: 'DashedLink',
        attrs: {
          line: {
            stroke: SECONDARY,
            strokeWidth: 2,
            strokeDasharray: '5,5',
            sourceMarker: {
              d: 'M 10 -5 0 0 10 5 z',
            },
          },
        },
      },
      super.defaults
    );
  }
}

const PROXIMITY_THRESHOLD = 60;

function getLinkId(id: dia.Cell.ID | null, closeId: dia.Cell.ID | null) {
  return \`\${id}-\${closeId}\`;
}

function ResizableNode({ id, label, width, height }: Readonly<BaseElementWithData>) {
  const graph = useGraph();
  const nodeRef = useRef<HTMLDivElement>(null);
  const element = graph.getCell(id);

  const closeIds = useElements(() => {
    const area = element.getBBox().inflate(PROXIMITY_THRESHOLD);
    const proximityElements = graph
      .findElementsInArea(area)
      .filter((element_) => element_.id !== id);
    return proximityElements.map((element_) => element_.id);
  });

  useEffect(() => {
    for (const closeId of closeIds) {
      const linkId = getLinkId(id, closeId);
      // Check if the link or the reverse link already exists
      if (graph.getCell(linkId)) continue;
      if (graph.getCell(getLinkId(closeId, id))) continue;

      const link = new DashedLink({
        id: linkId,
        source: { id },
        target: { id: closeId },
      });
      graph.addCell(link, { async: false });
    }
    return () => {
      for (const closeId of closeIds) {
        const linkId = getLinkId(id, closeId);
        graph.getCell(linkId)?.remove();
      }
    };
  }, [closeIds, graph, id]);

  return (
    <foreignObject width={width} height={height}>
      <MeasuredNode ref={nodeRef}>
        <div className="node">{label}</div>
      </MeasuredNode>
    </foreignObject>
  );
}

function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <Paper
        width="100%"
        className={PAPER_CLASSNAME}
        height={280}
        renderElement={ResizableNode}
        defaultAnchor={{
          name: 'perpendicular',
          args: { useModelGeometry: true },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <GraphProvider initialElements={initialElements} cellNamespace={{ DashedLink }}>
      <Main />
    </GraphProvider>
  );
}
`,v={title:"Examples/Proximity link",component:m,parameters:C({code:P})},S={},B=Object.freeze(Object.defineProperty({__proto__:null,Default:S,default:v},Symbol.toStringTag,{value:"Module"}));export{P as C,S as D,B as S};
