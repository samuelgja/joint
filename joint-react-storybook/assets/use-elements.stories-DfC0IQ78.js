import{j as e}from"./index-DwP6fAIG.js";import{a as z,D as o}from"./with-simple-data-BKTSf5MX.js";import{H as D}from"./hook-tester-DyRf6bUC.js";import{e as i,P as m}from"./create-njWDpS2D.js";import{a,P as l}from"./theme-BZH0jGzG.js";import{m as G,a as d}from"./make-story-CJLFqcT8.js";import{g as H}from"./get-api-documentation-link-BQfISuZK.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";/* empty css              */const r=H("useElements"),Z={title:"Hooks/useElements",component:D,decorators:[z],parameters:G({apiURL:r,description:"`useElements` is a hook that returns the elements of the current graph. It supports selector functions to get specific properties of the elements and re-renders the component only when selected properties are changed.",code:`import { useElements } from '@joint/react'

function Component() {
  const elements = useElements();
  return <div>elements are: {JSON.stringify(elements)}</div>;
}`})},c=d({args:{useHook:i,hookArgs:[],render:s=>e.jsxs("div",{children:[e.jsx(m,{width:"100%",className:a,renderElement:({width:t,height:n})=>e.jsx("rect",{width:t,height:n,fill:l})}),e.jsx(o,{data:s,name:"All Elements"})]})},apiURL:r,code:`import { useElements } from '@joint/react'

function Component() {
  const elements = useElements();
  return <div>elements are: {JSON.stringify(elements)}</div>;
}`,description:"Get all elements."}),p=d({args:{useHook:i,hookArgs:[s=>s.map(t=>t.id)],render:s=>e.jsxs("span",{children:[e.jsx(m,{width:"100%",className:a,renderElement:({width:t,height:n})=>e.jsx("rect",{width:t,height:n,fill:l})}),e.jsx(o,{data:s,name:"Element IDs"})]})},apiURL:r,code:`import { useElements } from '@joint/react'

function Component() {
  const elementIds = useElements((elements) => elements.map((element) => element.id));
  return <div>element ids are: {JSON.stringify(elementIds)}</div>;
}`,description:"Get the ids of the elements."}),u=d({args:{useHook:i,hookArgs:[s=>s.size],render:s=>e.jsxs("div",{children:[e.jsx(m,{width:"100%",className:a,renderElement:({width:t,height:n})=>e.jsx("rect",{width:t,height:n,fill:l})}),e.jsx(o,{data:s,name:"Size of Elements"})]})},apiURL:r,code:`import { useElements } from '@joint/react'

function Component() {
  const size = useElements((elements) => elements.size);
  return <div>size of elements is: {JSON.stringify(size)}</div>;
}`,description:"Get the size of the elements."}),h=d({args:{useHook:i,hookArgs:[s=>s.map(t=>({x:t.x,y:t.y}))],render:s=>e.jsxs("div",{children:[e.jsx(m,{width:"100%",className:a,renderElement:({width:t,height:n})=>e.jsx("rect",{width:t,height:n,fill:l})}),e.jsx(o,{data:s,name:"Position"})]})},apiURL:r,code:`import { useElements } from '@joint/react'

function Component() {
  const positions = useElements((elements) =>
    elements.map((element) => ({ x: element.x, y: element.y }))
  );
  return <div>positions are: {JSON.stringify(positions)}</div>;
}`,description:"Get the positions of the elements."}),f=d({args:{useHook:i,hookArgs:[s=>s.map(t=>({x:t.x,y:t.y})),(s,t)=>!0],render:s=>e.jsxs("div",{children:[e.jsx(m,{width:"100%",className:a,renderElement:({width:t,height:n})=>e.jsx("rect",{width:t,height:n,fill:l})}),e.jsx(o,{data:s,name:"Position"})]})},apiURL:r,code:`import { useElements } from '@joint/react'

function Component() {
  const positions = useElements(
    (elements) => elements.map((element) => ({ x: element.x, y: element.y })),
    (_previous, _next) => true
  );
  return <div>positions are: {JSON.stringify(positions)}</div>;
}`,description:"Get the positions of the elements but do not re-render because of custom compare function."}),E=d({args:{useHook:i,hookArgs:[s=>s.map(t=>({id:t.id,data:t.data,other:"something"}))],render:s=>e.jsxs("div",{children:[e.jsx(m,{width:"100%",className:a,renderElement:({width:t,height:n})=>e.jsx("rect",{width:t,height:n,fill:l})}),e.jsx(o,{data:s,name:"Element with new data"})]})},apiURL:r,code:`import { useElements } from '@joint/react'

function Component() {
  const elements = useElements((elements) =>
    elements.map((element) => ({ id: element.id, data: element.data, other: 'something' }))
  );
  return <div>elements with new data are: {JSON.stringify(elements)}</div>;
}`,description:"Get the elements with additional data."});var g,R,S;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`makeStory<Story>({
  args: {
    useHook: useElements,
    hookArgs: [],
    render: result => <div>
        <Paper width="100%" className={PAPER_CLASSNAME} renderElement={({
        width,
        height
      }) => {
        return <rect width={width} height={height} fill={PRIMARY} />;
      }} />
        <DataRenderer data={result} name="All Elements" />
      </div>
  },
  apiURL: API_URL,
  code: \`import { useElements } from '@joint/react'

function Component() {
  const elements = useElements();
  return <div>elements are: {JSON.stringify(elements)}</div>;
}\`,
  description: 'Get all elements.'
})`,...(S=(R=c.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var A,x,P;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`makeStory<Story>({
  args: {
    useHook: useElements,
    hookArgs: [elements => elements.map(element => element.id)],
    render: result => <span>
        <Paper width="100%" className={PAPER_CLASSNAME} renderElement={({
        width,
        height
      }) => {
        return <rect width={width} height={height} fill={PRIMARY} />;
      }} />
        <DataRenderer data={result} name="Element IDs" />
      </span>
  },
  apiURL: API_URL,
  code: \`import { useElements } from '@joint/react'

function Component() {
  const elementIds = useElements((elements) => elements.map((element) => element.id));
  return <div>element ids are: {JSON.stringify(elementIds)}</div>;
}\`,
  description: 'Get the ids of the elements.'
})`,...(P=(x=p.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var v,y,w;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`makeStory<Story>({
  args: {
    useHook: useElements,
    hookArgs: [elements => elements.size],
    render: result => <div>
        <Paper width="100%" className={PAPER_CLASSNAME} renderElement={({
        width,
        height
      }) => {
        return <rect width={width} height={height} fill={PRIMARY} />;
      }} />
        <DataRenderer data={result} name="Size of Elements" />
      </div>
  },
  apiURL: API_URL,
  code: \`import { useElements } from '@joint/react'

function Component() {
  const size = useElements((elements) => elements.size);
  return <div>size of elements is: {JSON.stringify(size)}</div>;
}\`,
  description: 'Get the size of the elements.'
})`,...(w=(y=u.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var j,k,N;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`makeStory<Story>({
  args: {
    useHook: useElements,
    hookArgs: [elements => elements.map(element => ({
      x: element.x,
      y: element.y
    }))],
    render: result => <div>
        <Paper width="100%" className={PAPER_CLASSNAME} renderElement={({
        width,
        height
      }) => {
        return <rect width={width} height={height} fill={PRIMARY} />;
      }} />
        <DataRenderer data={result} name="Position" />
      </div>
  },
  apiURL: API_URL,
  code: \`import { useElements } from '@joint/react'

function Component() {
  const positions = useElements((elements) =>
    elements.map((element) => ({ x: element.x, y: element.y }))
  );
  return <div>positions are: {JSON.stringify(positions)}</div>;
}\`,
  description: 'Get the positions of the elements.'
})`,...(N=(k=h.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var L,I,_;f.parameters={...f.parameters,docs:{...(L=f.parameters)==null?void 0:L.docs,source:{originalSource:`makeStory<Story>({
  args: {
    useHook: useElements,
    hookArgs: [elements => elements.map(element => ({
      x: element.x,
      y: element.y
    })), (_previous, _next) => true],
    render: result => <div>
        <Paper width="100%" className={PAPER_CLASSNAME} renderElement={({
        width,
        height
      }) => {
        return <rect width={width} height={height} fill={PRIMARY} />;
      }} />
        <DataRenderer data={result} name="Position" />
      </div>
  },
  apiURL: API_URL,
  code: \`import { useElements } from '@joint/react'

function Component() {
  const positions = useElements(
    (elements) => elements.map((element) => ({ x: element.x, y: element.y })),
    (_previous, _next) => true
  );
  return <div>positions are: {JSON.stringify(positions)}</div>;
}\`,
  description: 'Get the positions of the elements but do not re-render because of custom compare function.'
})`,...(_=(I=f.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};var C,J,U;E.parameters={...E.parameters,docs:{...(C=E.parameters)==null?void 0:C.docs,source:{originalSource:`makeStory<Story>({
  args: {
    useHook: useElements,
    hookArgs: [elements => elements.map(element => ({
      id: element.id,
      data: element.data,
      other: 'something'
    }))],
    render: result => <div>
        <Paper width="100%" className={PAPER_CLASSNAME} renderElement={({
        width,
        height
      }) => {
        return <rect width={width} height={height} fill={PRIMARY} />;
      }} />
        <DataRenderer data={result} name="Element with new data" />
      </div>
  },
  apiURL: API_URL,
  code: \`import { useElements } from '@joint/react'

function Component() {
  const elements = useElements((elements) =>
    elements.map((element) => ({ id: element.id, data: element.data, other: 'something' }))
  );
  return <div>elements with new data are: {JSON.stringify(elements)}</div>;
}\`,
  description: 'Get the elements with additional data.'
})`,...(U=(J=E.parameters)==null?void 0:J.docs)==null?void 0:U.source}}};const $=["Default","WithSelectedJustIds","WithGetJustSize","WithJustPosition","WithJustPositionButNotReRenderBecauseCompareFN","WithAdditionalData"];export{c as Default,E as WithAdditionalData,u as WithGetJustSize,h as WithJustPosition,f as WithJustPositionButNotReRenderBecauseCompareFN,p as WithSelectedJustIds,$ as __namedExportsOrder,Z as default};
