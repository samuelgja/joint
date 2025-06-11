import{j as e}from"./index-DwP6fAIG.js";import{m as c,a as p}from"./make-story-CJLFqcT8.js";import{g as d}from"./get-api-documentation-link-BQfISuZK.js";/* empty css              */import{G as l,b as h,c as u,P as g,u as f}from"./create-njWDpS2D.js";import{a as x,P}from"./theme-BZH0jGzG.js";import{a as j}from"./index-C8NnexJa.js";import{M as I}from"./measured-node-BZZgBNj5.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./use-children-ref-gx-xwHed.js";const y=u([{id:"1",x:100,y:20,width:100,height:50,attrs:{root:{magnet:!1}}},{id:"2",x:200,y:250,width:100,height:50,attrs:{root:{magnet:!1}}}]),R=h([{id:"link-1",source:{id:"1",port:"port-one"},target:{id:"2",port:"port-one"},attrs:{line:{stroke:P}}}]),n=d("Port/variables/Item","namespaces");function k(r){const{width:o,height:m}=f();return e.jsxs(e.Fragment,{children:[e.jsx(r,{}),e.jsx("foreignObject",{width:o,height:m,children:e.jsx(I,{children:e.jsx("div",{className:"node flex flex-col",children:"Test"})})})]})}function b(r){const o=()=>k(r);return e.jsx(l,{initialElements:y,initialLinks:R,children:e.jsx(g,{className:x,width:"100%",height:350,renderElement:o})})}const G={title:"Components/Port/Item",component:j.Item,decorators:[b],parameters:c({apiURL:n,code:`
      import { Port } from '@joint/react';
      <Port.Item id="port-one" x={0} y={0}>
        <foreignObject  />
      </Port.Item>
    `,description:"Port item is a component that represents a port in the graph. It is used to connect elements in the graph. Its appended outside the node elements, so when using positions, you can use group component for that `<Port.Group />`"})},t=p({args:{children:e.jsx("foreignObject",{width:20,height:20,children:e.jsx("div",{className:"size-5 bg-sky-200 rounded-full"})}),id:"port-one",x:0,y:0},apiURL:n,name:"Basic port"});var s,i,a;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`makeStory<Story>({
  args: {
    children: <foreignObject width={20} height={20}>
        <div className="size-5 bg-sky-200 rounded-full" />
      </foreignObject>,
    id: 'port-one',
    x: 0,
    y: 0
  },
  apiURL: API_URL,
  name: 'Basic port'
})`,...(a=(i=t.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const z=["Default"];export{t as Default,z as __namedExportsOrder,G as default};
