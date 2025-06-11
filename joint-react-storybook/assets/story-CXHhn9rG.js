/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{P as n,a as r}from"./theme-BZH0jGzG.js";import{G as s,c as a,b as m,P as o,L as u,C as y}from"./create-njWDpS2D.js";import{r as l}from"./index-B0WjJBI_.js";import{H as d}from"./with-simple-data-BKTSf5MX.js";import{m as x,a as p}from"./make-story-CJLFqcT8.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";const L=a([{id:"1",label:"Node 1",x:100,y:0},{id:"2",label:"Node 2",x:100,y:200}]),N=m([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:n,strokeWidth:2,strokeDasharray:"5,5"}}}]);function P(){const t=l.useCallback(i=>e.jsx(d,{className:"node",children:i.label}),[]);return e.jsx("div",{style:{display:"flex",flexDirection:"row"},children:e.jsx(o,{width:"100%",className:r,height:280,renderElement:t})})}function c(t){return e.jsx(s,{...t,initialLinks:N,initialElements:L,children:e.jsx(P,{})})}c.__docgenInfo={description:"",methods:[],displayName:"App"};const b=a([{id:"1",label:"Node 1",x:100,y:0},{id:"2",label:"Node 2",x:100,y:200}]),M=m([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:n,class:"link"}}}]);function j(){const t=l.useCallback(i=>e.jsx(d,{className:"node",children:i.label}),[]);return e.jsx("div",{style:{display:"flex",flexDirection:"row"},children:e.jsx(o,{width:"100%",className:r,height:280,renderElement:t})})}function h(t){return e.jsx(s,{...t,initialLinks:M,initialElements:b,children:e.jsx(j,{})})}h.__docgenInfo={description:"",methods:[],displayName:"App"};const A=a([{id:"1",label:"Node 1",x:100,y:0},{id:"2",label:"Node 2",x:100,y:200}]);class f extends u{defaults(){return y(super.defaults,{type:"LinkModel",attrs:{line:{stroke:n,strokeWidth:10,strokeDasharray:"5,5"}}})}}function R(){const t=l.useCallback(i=>e.jsx(d,{className:"node",children:i.label}),[]);return e.jsx("div",{style:{display:"flex",flexDirection:"row"},children:e.jsx(o,{defaultLink:()=>new f,width:"100%",className:r,height:280,renderElement:t})})}function k(t){return e.jsx(s,{...t,initialLinks:[{source:"1",target:"2",type:"LinkModel",id:"1123"}],initialElements:A,cellNamespace:{LinkModel:f},children:e.jsx(R,{})})}k.__docgenInfo={description:"",methods:[],displayName:"App"};const E=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';
import {
  createElements,
  createLinks,
  GraphProvider,
  Paper,
  type GraphProps,
  type InferElement,
  type RenderElement,
} from '@joint/react';
import { useCallback } from 'react';
import { HTMLNode } from 'storybook-config/decorators/with-simple-data';

const initialElements = createElements([
  { id: '1', label: 'Node 1', x: 100, y: 0 },
  { id: '2', label: 'Node 2', x: 100, y: 200 },
]);
const initialEdges = createLinks([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    attrs: {
      line: {
        stroke: PRIMARY,
        strokeWidth: 2,
        strokeDasharray: '5,5',
      },
    },
  },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

function Main() {
  const renderElement: RenderElement<BaseElementWithData> = useCallback(
    (element) => <HTMLNode className="node">{element.label}</HTMLNode>,
    []
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={renderElement} />
    </div>
  );
}

export default function App(props: Readonly<GraphProps>) {
  return (
    <GraphProvider {...props} initialLinks={initialEdges} initialElements={initialElements}>
      <Main />
    </GraphProvider>
  );
}
`,C=`/* eslint-disable react-perf/jsx-no-new-array-as-prop */
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';
import { shapes, util } from '@joint/core';
import {
  createElements,
  GraphProvider,
  Paper,
  type GraphProps,
  type InferElement,
  type RenderElement,
} from '@joint/react';
import { useCallback } from 'react';
import { HTMLNode } from 'storybook-config/decorators/with-simple-data';

const initialElements = createElements([
  { id: '1', label: 'Node 1', x: 100, y: 0 },
  { id: '2', label: 'Node 2', x: 100, y: 200 },
]);

class LinkModel extends shapes.standard.Link {
  defaults() {
    return util.defaultsDeep(super.defaults, {
      type: 'LinkModel',
      attrs: {
        line: {
          stroke: PRIMARY,
          strokeWidth: 10,
          strokeDasharray: '5,5',
        },
      },
    });
  }
}

type BaseElementWithData = InferElement<typeof initialElements>;

function Main() {
  const renderElement: RenderElement<BaseElementWithData> = useCallback(
    (element) => <HTMLNode className="node">{element.label}</HTMLNode>,
    []
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper
        defaultLink={() => new LinkModel()}
        width="100%"
        className={PAPER_CLASSNAME}
        height={280}
        renderElement={renderElement}
      />
    </div>
  );
}

export default function App(props: Readonly<GraphProps>) {
  return (
    <GraphProvider
      {...props}
      initialLinks={[{ source: '1', target: '2', type: 'LinkModel', id: '1123' }]}
      initialElements={initialElements}
      cellNamespace={{ LinkModel }}
    >
      <Main />
    </GraphProvider>
  );
}
`,g=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */

import {
  createElements,
  createLinks,
  GraphProvider,
  Paper,
  type GraphProps,
  type InferElement,
  type RenderElement,
} from '@joint/react';
import { useCallback } from 'react';
import { HTMLNode } from 'storybook-config/decorators/with-simple-data';
import './code-with-create-links-classname.css';
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';

const initialElements = createElements([
  { id: '1', label: 'Node 1', x: 100, y: 0 },
  { id: '2', label: 'Node 2', x: 100, y: 200 },
]);
const initialEdges = createLinks([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    attrs: {
      line: {
        stroke: PRIMARY,
        class: 'link',
      },
    },
  },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

function Main() {
  const renderElement: RenderElement<BaseElementWithData> = useCallback(
    (element) => <HTMLNode className="node">{element.label}</HTMLNode>,
    []
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={renderElement} />
    </div>
  );
}

export default function App(props: Readonly<GraphProps>) {
  return (
    <GraphProvider {...props} initialLinks={initialEdges} initialElements={initialElements}>
      <Main />
    </GraphProvider>
  );
}
`,Y={title:"Examples/Custom link",component:c,parameters:x({apiURL:"https://resources.jointjs.com/tutorial/links",code:E,description:"Code with create links."})},B=p({code:E,description:"Code with create links.",component:c,apiURL:"https://resources.jointjs.com/tutorial/links"}),U=p({code:`${g}

css:
.link {
  stroke-dasharray: 5 5; /* dash length 10, gap 10 */
  stroke-dashoffset: 0;
  animation: dashmove 1s linear infinite;
}

@keyframes dashmove {
  to {
    stroke-dashoffset: -20; /* dash + gap length */
  }
}

  `,description:"Code with create links with class name.",component:h,apiURL:"https://resources.jointjs.com/tutorial/links"}),q=p({code:C,description:"Code with Dia links.",component:k,apiURL:"https://resources.jointjs.com/tutorial/links"});export{U as WithCreateLinkClassName,B as WithCreateLinks,q as WithDiaLinks,Y as default};
