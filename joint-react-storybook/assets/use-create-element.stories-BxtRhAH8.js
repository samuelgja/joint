import{j as e}from"./index-DwP6fAIG.js";import{u as s}from"./use-create-element-CQ_AbJYV.js";import{m,a as l}from"./make-story-CJLFqcT8.js";import{g as c}from"./get-api-documentation-link-BQfISuZK.js";import{a as u,H as p}from"./with-simple-data-BKTSf5MX.js";/* empty css              */import{a as E,B as f}from"./theme-BZH0jGzG.js";import{P as h}from"./create-njWDpS2D.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";const i=c("useCreateElement"),y={title:"Hooks/useCreateElement",component:n,decorators:[u],render:()=>{const o=s();return e.jsxs("div",{className:"flex flex-row",children:[e.jsx("div",{style:{width:"100%",height:450},children:e.jsx(h,{className:E,width:"100%",height:450,renderElement:n,linkPinning:!1})}),e.jsx("div",{children:e.jsx("button",{type:"button",className:f,onClick:()=>o({id:"10",label:"New node added",color:"red",x:300,y:100}),children:"Add Node"})})]})},parameters:m({apiURL:i,description:"`useCreateElement` is a hook to add elements to the graph. It returns a function to add an element. It must be used inside the GraphProvider.",code:`import { useCreateElement } from '@joint/react'

function Component() {
  const addElement = useCreateElement();
  return <button onClick={() => addElement({ id: '1', label: 'Node 1' })}>Add Element</button>;
}`})};function n({label:o}){return e.jsx(p,{className:"node",children:o})}const t=l({args:{},apiURL:i,code:`import { useCreateElement } from '@joint/react'

function Hook() {
  const addElement = useCreateElement();

  return (
    <div>
      <button onClick={() => addElement({ id: '1', label: 'Node 1' })}>
        Add Node 1
      </button>
      <button onClick={() => addElement({ id: '2', label: 'Node 2' })}>
        Add Node 2
      </button>
    </div>
  );
}`,description:"Add elements to the graph."});var r,d,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`makeStory<Story>({
  args: {},
  apiURL: API_URL,
  code: \`import { useCreateElement } from '@joint/react'

function Hook() {
  const addElement = useCreateElement();

  return (
    <div>
      <button onClick={() => addElement({ id: '1', label: 'Node 1' })}>
        Add Node 1
      </button>
      <button onClick={() => addElement({ id: '2', label: 'Node 2' })}>
        Add Node 2
      </button>
    </div>
  );
}\`,
  description: 'Add elements to the graph.'
})`,...(a=(d=t.parameters)==null?void 0:d.docs)==null?void 0:a.source}}};const H=["Default"];export{t as Default,H as __namedExportsOrder,y as default};
