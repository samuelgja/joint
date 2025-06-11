import{j as e}from"./index-DwP6fAIG.js";import{S as W}from"./with-simple-data-BKTSf5MX.js";import{m as v,a as s}from"./make-story-CJLFqcT8.js";import{g as D}from"./get-api-documentation-link-BQfISuZK.js";import{T as U}from"./text-node-C4LoLeqy.js";import{P as k}from"./theme-BZH0jGzG.js";import{M}from"./measured-node-BZZgBNj5.js";import{u as T}from"./create-njWDpS2D.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./use-children-ref-gx-xwHed.js";const t=D("TextNode");function y(z){const{width:H,height:L}=T();return e.jsxs(e.Fragment,{children:[e.jsx("rect",{width:H,height:L,fill:k,rx:10,ry:10}),e.jsx(M,{setSize:({element:S,size:n})=>{S.set("size",{width:n.width+20,height:n.height+20})},children:e.jsx("g",{transform:"translate(10, 10)",children:e.jsx(z,{})})})]})}const Y={title:"Components/TextNode",component:U,decorators:[y,W],parameters:v({apiURL:t,code:`
    import { TextNode } from '@joint/react'
    <TextNode
      fill="white"
      width={19}
      textWrap
      >
      Hello world
    </TextNode>
    `})},r=s({args:{children:"Hello world",fill:"white",width:19},apiURL:t,name:"Measured div with exact size",description:"Div with exact size."}),i=s({args:{children:"Hello world Hello world",fill:"white",width:100,textWrap:!0},apiURL:t,name:"Measured div with exact size",description:"Div with exact size."}),o=s({args:{children:"Hello world Hello world",fill:"white",textWrap:!0},apiURL:t,name:"Measured div with exact size",description:"Div with exact size."}),a=s({args:{children:"Hello world Hello world Hello world",fill:"white",width:100,textWrap:{ellipsis:!0,maxLineCount:1}},apiURL:t,name:"Measured div with exact size",description:"Div with exact size."});var l,d,c;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`makeStory<Story>({
  args: {
    children: 'Hello world',
    fill: 'white',
    width: 19
  },
  apiURL: API_URL,
  name: 'Measured div with exact size',
  description: 'Div with exact size.'
})`,...(c=(d=r.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var m,p,h;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`makeStory<Story>({
  args: {
    children: 'Hello world Hello world',
    fill: 'white',
    width: 100,
    textWrap: true
  },
  apiURL: API_URL,
  name: 'Measured div with exact size',
  description: 'Div with exact size.'
})`,...(h=(p=i.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var w,x,u;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`makeStory<Story>({
  args: {
    children: 'Hello world Hello world',
    fill: 'white',
    textWrap: true
  },
  apiURL: API_URL,
  name: 'Measured div with exact size',
  description: 'Div with exact size.'
})`,...(u=(x=o.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};var f,g,R;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`makeStory<Story>({
  args: {
    children: 'Hello world Hello world Hello world',
    fill: 'white',
    width: 100,
    textWrap: {
      ellipsis: true,
      maxLineCount: 1
    }
  },
  apiURL: API_URL,
  name: 'Measured div with exact size',
  description: 'Div with exact size.'
})`,...(R=(g=a.parameters)==null?void 0:g.docs)==null?void 0:R.source}}};const b=["Default","WithBreakText","WithBreakTextWithoutDefinedWith","WithEllipsis"];export{r as Default,i as WithBreakText,o as WithBreakTextWithoutDefinedWith,a as WithEllipsis,b as __namedExportsOrder,Y as default};
