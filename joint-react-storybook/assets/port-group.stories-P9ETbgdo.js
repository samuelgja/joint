import{j as e}from"./index-DwP6fAIG.js";import{m,a as c}from"./make-story-CJLFqcT8.js";import{g as d}from"./get-api-documentation-link-BQfISuZK.js";/* empty css              */import{G as h,b as l,c as g,P as u,u as f}from"./create-njWDpS2D.js";import{a as P,P as x}from"./theme-BZH0jGzG.js";import{P as j,a as b}from"./index-C8NnexJa.js";import{M as I}from"./measured-node-BZZgBNj5.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./use-children-ref-gx-xwHed.js";const R=g([{id:"1",x:100,y:20,width:100,height:50},{id:"2",x:200,y:250,width:100,height:50}]),k=l([{id:"e1-2",target:{id:"2",port:"port-one"},source:{id:"1",port:"port-one"},attrs:{line:{stroke:x}}}]),n=d("Port/variables/Group","namespaces");function y(r){const{width:o,height:p}=f();return e.jsx("foreignObject",{width:o,height:p,children:e.jsx(I,{children:e.jsxs("div",{className:"node flex flex-col",children:["Test",e.jsx(r,{})]})})})}function L(r){const o=()=>y(r);return e.jsx(h,{initialElements:R,initialLinks:k,children:e.jsx(u,{className:P,width:"100%",height:350,renderElement:o,linkPinning:!1})})}const z={title:"Components/Port/Group",component:j,decorators:[L],parameters:m({apiURL:n,code:`
        import { Port } from '@joint/react';

        <Port.Group
          id="group-one"
          angle={0}
          compensateRotation={false}
          dx={0}>
            <Port.Item id="port-one" x={0} y={0}>
                <rect width={10} height={10} fill="red" />
            </Port.Item>
        </Port.Group>
    `,description:"Port Group is a container for ports. It can be used to group ports together and apply transformations to them. The group can be positioned using the position prop, which can be either 'absolute' or 'relative'."})},t=c({args:{children:e.jsx(b.Item,{id:"port-1",children:e.jsx("foreignObject",{width:20,height:20,children:e.jsx("div",{className:"size-5 bg-sky-200"})})}),id:"group-one",position:"right",angle:0,height:1},apiURL:n,name:"Default group"});var i,s,a;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`makeStory<Story>({
  args: {
    children: <Port.Item id="port-1">
        <foreignObject width={20} height={20}>
          <div className="size-5 bg-sky-200" />
        </foreignObject>
      </Port.Item>,
    id: 'group-one',
    position: 'right',
    angle: 0,
    height: 1
  },
  apiURL: API_URL,
  name: 'Default group'
})`,...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const C=["Default"];export{t as Default,C as __namedExportsOrder,z as default};
