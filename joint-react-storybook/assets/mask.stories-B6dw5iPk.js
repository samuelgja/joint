import{j as i}from"./index-DwP6fAIG.js";import{S}from"./with-simple-data-BKTSf5MX.js";import{M as w}from"./mask-DJTgPChi.js";import{S as s,P as x}from"./theme-BZH0jGzG.js";import{m as H,a as o}from"./make-story-CJLFqcT8.js";import{g as L}from"./get-api-documentation-link-BQfISuZK.js";import{r as y}from"./index-B0WjJBI_.js";import{u as b}from"./create-njWDpS2D.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";import"./custom-CNnXkfQ2.js";const h=L("Highlighter/variables/Mask","namespaces"),V={title:"Components/Highlighter/Mask",component:w,decorators:[S],parameters:H({description:`
Mask is a component that creates a mask around the children. It is used to highlight the children.
    `,apiURL:h,code:`import { Highlighter } from '@joint/react'
<Highlighter.Mask>
  <rect rx={10} ry={10} width={100} height={50} fill={"blue"} />
</Highlighter.Mask>
    `})};function A(D,u){const{width:f,height:M}=b();return i.jsx("rect",{ref:u,rx:10,ry:10,width:f,height:M,fill:x})}const a=y.forwardRef(A),e=o({args:{stroke:s,children:i.jsx(a,{})},apiURL:h,description:"Default mask highlighter with rectangle children.",code:`<Highlighter.Mask>
  <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />
</Highlighter.Mask>`}),r=o({args:{padding:10,stroke:s,children:i.jsx(a,{})},apiURL:h,description:"Mask highlighter with padding.",code:`<Highlighter.Mask padding={10}>
  <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />
</Highlighter.Mask>`}),t=o({args:{padding:10,stroke:s,strokeWidth:5,strokeLinejoin:"bevel",children:i.jsx(a,{})},apiURL:h,description:"Mask highlighter with SVG Element props.",code:`<Highlighter.Mask padding={10} stroke={SECONDARY} strokeWidth={5} strokeLinejoin="bevel">
  <rect rx={10} ry={10}  width={width} height={height}fill={"blue"} />
</Highlighter.Mask>`});var n,d,g;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`makeStory<Story>({
  args: {
    stroke: SECONDARY,
    children: <RectRender />
  },
  apiURL: API_URL,
  description: 'Default mask highlighter with rectangle children.',
  code: \`<Highlighter.Mask>
  <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />
</Highlighter.Mask>\`
})`,...(g=(d=e.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var l,c,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`makeStory<Story>({
  args: {
    padding: 10,
    stroke: SECONDARY,
    children: <RectRender />
  },
  apiURL: API_URL,
  description: 'Mask highlighter with padding.',
  code: \`<Highlighter.Mask padding={10}>
  <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />
</Highlighter.Mask>\`
})`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,k,R;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`makeStory<Story>({
  args: {
    padding: 10,
    stroke: SECONDARY,
    strokeWidth: 5,
    strokeLinejoin: 'bevel',
    children: <RectRender />
  },
  apiURL: API_URL,
  description: 'Mask highlighter with SVG Element props.',
  code: \`<Highlighter.Mask padding={10} stroke={SECONDARY} strokeWidth={5} strokeLinejoin="bevel">
  <rect rx={10} ry={10}  width={width} height={height}fill={"blue"} />
</Highlighter.Mask>\`
})`,...(R=(k=t.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};const q=["Default","WithPadding","WithSVGProps"];export{e as Default,r as WithPadding,t as WithSVGProps,q as __namedExportsOrder,V as default};
