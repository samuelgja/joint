import{u as l}from"./create-njWDpS2D.js";import{S as p}from"./with-simple-data-BKTSf5MX.js";import{H as u}from"./hook-tester-DyRf6bUC.js";import{m as f,a as d}from"./make-story-CJLFqcT8.js";import{g as h}from"./get-api-documentation-link-BQfISuZK.js";import"./index-DwP6fAIG.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./theme-BZH0jGzG.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";/* empty css              */const n=h("useElement"),H={title:"Hooks/useElement",component:u,decorators:[p],parameters:f({apiURL:n,description:"`useElement` is a hook that returns the element of the current cell. It is used to get the element of the current cell. It must be used inside `renderElement`\n    It also support selector function to get specific properties of the element (it re-render the component only when selected properties are changed)\n    ",code:`import { useElement } from '@joint/react'

function Component() {
  const element = useElement();
  return <div>element is: {element}</div>;
}`})},t=d({args:{useHook:l,hookArgs:[e=>e.id]},apiURL:n,code:`import { useElement } from '@joint/react'

function Component() {  
  const element = useElement();
  return <div>element id is: {element.id}</div>;
}`,description:"Get the id of the element."}),o=d({args:{useHook:l,hookArgs:[e=>({x:e.x,y:e.y})]},apiURL:n,code:`import { useElement } from '@joint/react'

function Component() {
  const element = useElement();
  return <div>element coordinates are: {element.x}, {element.y}</div>;
}`,description:"Get the coordinates of the element via selector function"});var r,m,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`makeStory<Story>({
  args: {
    useHook: useElement,
    hookArgs: [element => element.id]
  },
  apiURL: API_URL,
  code: \`import { useElement } from '@joint/react'

function Component() {  
  const element = useElement();
  return <div>element id is: {element.id}</div>;
}\`,
  description: 'Get the id of the element.'
})`,...(s=(m=t.parameters)==null?void 0:m.docs)==null?void 0:s.source}}};var i,a,c;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`makeStory<Story>({
  args: {
    useHook: useElement,
    hookArgs: [element => ({
      x: element.x,
      y: element.y
    })]
  },
  apiURL: API_URL,
  code: \`import { useElement } from '@joint/react'

function Component() {
  const element = useElement();
  return <div>element coordinates are: {element.x}, {element.y}</div>;
}\`,
  description: 'Get the coordinates of the element via selector function'
})`,...(c=(a=o.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const j=["WithId","WithCoordinates"];export{o as WithCoordinates,t as WithId,j as __namedExportsOrder,H as default};
