import{j as a}from"./index-DwP6fAIG.js";import{S as p}from"./with-simple-data-BKTSf5MX.js";import{O as l}from"./opacity-BIjguiiq.js";import{P as s}from"./theme-BZH0jGzG.js";import{m,a as g}from"./make-story-CJLFqcT8.js";import{g as d}from"./get-api-documentation-link-BQfISuZK.js";import{r as f}from"./index-B0WjJBI_.js";import{u}from"./create-njWDpS2D.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";import"./custom-CNnXkfQ2.js";const o=d("Highlighter/variables/Opacity","namespaces"),A={title:"Components/Highlighter/Opacity",component:l,decorators:[p],parameters:m({description:`
Opacity is a component that changes the opacity of the children. It is used to highlight the children.
    `,apiURL:o,code:`import { Highlighter } from '@joint/react'
<Highlighter.Opacity>
  <rect rx={10} ry={10} width={100} height={50} fill={"blue"} />
</Highlighter.Opacity>
    `})};function y(O,c){const{width:h,height:n}=u();return a.jsx("rect",{ref:c,rx:10,ry:10,width:h,height:n,fill:s})}const R=f.forwardRef(y),t=g({args:{alphaValue:.5,children:a.jsx(R,{})},apiURL:o,description:"Default opacity highlighter with rectangle children.",code:`<Highlighter.Opacity alphaValue={0.5}>
  <rect rx={10} ry={10} width={100} height={50} fill={"blue"} />
</Highlighter.Opacity>`});var e,r,i;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`makeStory<Story>({
  args: {
    alphaValue: 0.5,
    children: <RectRender />
  },
  apiURL: API_URL,
  description: 'Default opacity highlighter with rectangle children.',
  code: \`<Highlighter.Opacity alphaValue={0.5}>
  <rect rx={10} ry={10} width={100} height={50} fill={"blue"} />
</Highlighter.Opacity>\`
})`,...(i=(r=t.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const E=["Default"];export{t as Default,E as __namedExportsOrder,A as default};
