import{j as s}from"./index-DwP6fAIG.js";import{S as R}from"./with-simple-data-BKTSf5MX.js";import{C as y}from"./custom-CNnXkfQ2.js";import{P as I}from"./theme-BZH0jGzG.js";import{m as H,a as g}from"./make-story-CJLFqcT8.js";import{g as b}from"./get-api-documentation-link-BQfISuZK.js";import{r as V}from"./index-B0WjJBI_.js";import{o as x,m as A,s as S,u as W}from"./create-njWDpS2D.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";const l=b("Highlighter/variables/Custom","namespaces"),B={title:"Components/Highlighter/Custom",component:y,decorators:[R],parameters:H({description:"\nCustom is a component that allows you to use a custom highlighter. You must provide the `onAdd` which must return jointjs highlighter.\n    ",apiURL:l,code:`import { Highlighter } from '@joint/react'
<Highlighter.Custom
  onAdd={...}
  options={{ ... }}
>
  <rect rx={10} ry={10} width={100} height={50} fill={"blue"} />
</Highlighter.Custom>
    `})};function L(r,t){const{width:e,height:i}=W();return s.jsx("rect",{ref:t,rx:10,ry:10,width:e,height:i,fill:I})}const a=V.forwardRef(L),o=g({args:{onCreateHighlighter:(r,t,e,i)=>x.add(r,t,e,i),options:{alphaValue:.2},children:s.jsx(a,{})},apiURL:l,description:"Custom highlighter using the built-in stroke highlighter with custom options.",code:`<Highlighter.Custom
    onAdd={(cellView, element, highlighterId, options) => {
        return highlighters.opacity.add(cellView, element, highlighterId, options);
    }}
    options={{ alphaValue: 0.2 }}
  >
    <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />
  </Highlighter.Custom>`}),h=g({args:{onCreateHighlighter:(r,t,e,i)=>A.add(r,t,e,i),options:{mask:{fill:"red",stroke:"black",strokeWidth:2}},children:s.jsx(a,{})},apiURL:l,description:"Custom highlighter using the built-in mask highlighter with custom options.",code:`<Highlighter.Custom
    onAdd={(cellView, element, highlighterId, options) => {
        return highlighters.mask.add(cellView, element, highlighterId, options);
    }
    options={{ mask: { fill: 'red', stroke: 'black', strokeWidth: 2 } }}
  >
    <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />
  </Highlighter.Custom>`}),n=g({args:{onCreateHighlighter:(r,t,e,i)=>S.add(r,t,e,i),options:{stroke:{stroke:"red",strokeWidth:2,fill:"blue",fillOpacity:.5}},children:s.jsx(a,{})},apiURL:l,description:"Custom highlighter using the built-in stroke highlighter with custom options.",code:`<Highlighter.Custom
    onAdd={(cellView, element, highlighterId, options) => {
        return highlighters.stroke.add(cellView, element, highlighterId, options);
    }
    options={{ stroke: { stroke: 'red', strokeWidth: 2, fill: 'blue', fillOpacity: 0.5 } }}
  >
    <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />
  </Highlighter.Custom>`});var d,m,c;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`makeStory<Story>({
  args: {
    onCreateHighlighter: (cellView, element, highlighterId, options) => {
      return highlighters.opacity.add(cellView, element, highlighterId, options);
    },
    options: {
      alphaValue: 0.2
    },
    children: <RectRender />
  },
  apiURL: API_URL,
  description: 'Custom highlighter using the built-in stroke highlighter with custom options.',
  code: \`<Highlighter.Custom
    onAdd={(cellView, element, highlighterId, options) => {
        return highlighters.opacity.add(cellView, element, highlighterId, options);
    }}
    options={{ alphaValue: 0.2 }}
  >
    <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />
  </Highlighter.Custom>\`
})`,...(c=(m=o.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var p,u,k;h.parameters={...h.parameters,docs:{...(p=h.parameters)==null?void 0:p.docs,source:{originalSource:`makeStory<Story>({
  args: {
    onCreateHighlighter: (cellView, element, highlighterId, options) => {
      return highlighters.mask.add(cellView, element, highlighterId, options);
    },
    options: {
      mask: {
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2
      }
    },
    children: <RectRender />
  },
  apiURL: API_URL,
  description: 'Custom highlighter using the built-in mask highlighter with custom options.',
  code: \`<Highlighter.Custom
    onAdd={(cellView, element, highlighterId, options) => {
        return highlighters.mask.add(cellView, element, highlighterId, options);
    }
    options={{ mask: { fill: 'red', stroke: 'black', strokeWidth: 2 } }}
  >
    <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />
  </Highlighter.Custom>\`
})`,...(k=(u=h.parameters)==null?void 0:u.docs)==null?void 0:k.source}}};var w,C,f;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`makeStory<Story>({
  args: {
    onCreateHighlighter: (cellView, element, highlighterId, options) => {
      return highlighters.stroke.add(cellView, element, highlighterId, options);
    },
    options: {
      stroke: {
        stroke: 'red',
        strokeWidth: 2,
        fill: 'blue',
        fillOpacity: 0.5
      }
    },
    children: <RectRender />
  },
  apiURL: API_URL,
  description: 'Custom highlighter using the built-in stroke highlighter with custom options.',
  code: \`<Highlighter.Custom
    onAdd={(cellView, element, highlighterId, options) => {
        return highlighters.stroke.add(cellView, element, highlighterId, options);
    }
    options={{ stroke: { stroke: 'red', strokeWidth: 2, fill: 'blue', fillOpacity: 0.5 } }}
  >
    <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />
  </Highlighter.Custom>\`
})`,...(f=(C=n.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};const F=["CustomWithOpacity","CustomWithMask","CustomWithStroke"];export{h as CustomWithMask,o as CustomWithOpacity,n as CustomWithStroke,F as __namedExportsOrder,B as default};
