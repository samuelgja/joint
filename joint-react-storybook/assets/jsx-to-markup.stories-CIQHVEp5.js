import{j as t}from"./index-DwP6fAIG.js";/* empty css              */import{G as s,E as a,P as m,v as n}from"./create-njWDpS2D.js";import{a as l,P as c}from"./theme-BZH0jGzG.js";import{a as d}from"./with-simple-data-BKTSf5MX.js";import{m as p}from"./make-story-CJLFqcT8.js";import{g as f}from"./get-api-documentation-link-BQfISuZK.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";const h=f("jsx"),x=a.define("CustomRect",{attrs:{body:{fill:c,stroke:"#333",strokeWidth:2},label:{text:"JSX Markup",fill:"#fff",fontSize:14,fontWeight:"bold"}},size:{width:120,height:50}},{markup:n(t.jsxs("g",{children:[t.jsx("rect",{"joint-selector":"body",width:"120",height:"50",rx:"10",ry:"10"}),t.jsx("text",{"joint-selector":"label",x:"60",y:"25",textAnchor:"middle",dominantBaseline:"middle"})]}))}),u=[{type:"CustomRect",id:"rect1",x:80,y:80}];function j(){return t.jsx(s,{cellNamespace:{CustomRect:x},initialElements:u,initialLinks:[],children:t.jsx(m,{width:320,height:220,className:l})})}const L={title:"Utils/JSX",component:j,decorators:[d],parameters:p({apiURL:h,code:`import { dia } from '@joint/core';
import { jsx } from '@joint/react';

const CustomRect = dia.Element.define(
  'custom.Rect',
  {
    attrs: {
      body: { fill: '#007bff' },
      label: { text: 'JSX Markup' },
    },
    size: { width: 120, height: 50 },
  },
  {
    markup: jsx(
      <g>
        <rect joint-selector="body" width="120" height="50" rx="10" ry="10" />
        <text
          joint-selector="label"
          x="60"
          y="25"
          textAnchor="middle"
          dominantBaseline="middle"
        />
      </g>
    ),
  }
);`,description:"\nThis story demonstrates how to use the `jsx` utility to define JointJS markup for a custom element.\n    "})},e={args:{}};var o,r,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {}
}`,...(i=(r=e.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const D=["Default"];export{e as Default,D as __namedExportsOrder,L as default};
