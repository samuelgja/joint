import{j as e}from"./index-DwP6fAIG.js";import{S as R}from"./with-simple-data-BKTSf5MX.js";import{M as y}from"./measured-node-BZZgBNj5.js";import{u as f}from"./create-njWDpS2D.js";import{P as h}from"./theme-BZH0jGzG.js";import{m as b,a}from"./make-story-CJLFqcT8.js";import{g as S}from"./get-api-documentation-link-BQfISuZK.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./use-children-ref-gx-xwHed.js";const n=S("MeasuredNode","variables");function M(x){const{width:w,height:v}=f();return e.jsx("foreignObject",{overflow:"visible",width:w,height:v,children:e.jsx(x,{})})}const T={title:"Components/MeasuredNode",component:y,decorators:[M,R],parameters:b({apiURL:n,code:`import { MeasuredNode } from '@joint/react'
// This will automatically measure component size and update the parent node size
<MeasuredNode>
  <div style={{ width: 100, height: 50 }}>Content</div>
</MeasuredNode>
    `,description:"\nMeasured node component automatically detects the size of its `children` and updates the graph element (node) width and height automatically when elements resize.\nIt must be used inside `renderElement` context. \n    "})},t=a({args:{children:e.jsx("div",{style:{width:100,height:50,backgroundColor:h,borderRadius:10}})},apiURL:n,name:"Measured div with exact size",description:"Div with exact size."}),i=a({args:{children:e.jsx("div",{style:{padding:10,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",backgroundColor:h,borderRadius:10},children:"Hello world!"})},apiURL:n,name:"Measured div with padding and text",description:"Div with padding and text content."}),r=a({args:{children:e.jsx("div",{className:"flex items-center justify-center text-center bg-primary rounded-lg p-2 bg-red-500",children:"Hello world!"})},apiURL:n,name:"Tailwind sizing",description:"Div with tailwind classes."});var o,d,s;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`makeStory<Story>({
  args: {
    children: <div style={{
      width: 100,
      height: 50,
      backgroundColor: PRIMARY,
      borderRadius: 10
    }} />
  },
  apiURL: API_URL,
  name: 'Measured div with exact size',
  description: 'Div with exact size.'
})`,...(s=(d=t.parameters)==null?void 0:d.docs)==null?void 0:s.source}}};var c,l,m;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`makeStory<Story>({
  args: {
    children: <div style={{
      padding: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: PRIMARY,
      borderRadius: 10
    }}>
        Hello world!
      </div>
  },
  apiURL: API_URL,
  name: 'Measured div with padding and text',
  description: 'Div with padding and text content.'
})`,...(m=(l=i.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,u,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`makeStory<Story>({
  args: {
    children: <div className="flex items-center justify-center text-center bg-primary rounded-lg p-2 bg-red-500">
        Hello world!
      </div>
  },
  apiURL: API_URL,
  name: 'Tailwind sizing',
  description: 'Div with tailwind classes.'
})`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const E=["DivWithExactSize","DivWithPaddingAndText","TailwindSizing"];export{t as DivWithExactSize,i as DivWithPaddingAndText,r as TailwindSizing,E as __namedExportsOrder,T as default};
