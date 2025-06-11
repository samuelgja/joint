import{j as t}from"./index-DwP6fAIG.js";import{R as l,H as a}from"./with-simple-data-BKTSf5MX.js";import{u as d}from"./use-update-element-CJV1FtPj.js";import{m as M,a as u}from"./make-story-CJLFqcT8.js";import{g as P}from"./get-api-documentation-link-BQfISuZK.js";/* empty css              */import{B as r}from"./theme-BZH0jGzG.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./create-njWDpS2D.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";const s=P("useUpdateElement"),Y={title:"Hooks/useUpdateElement",component:b,render:()=>t.jsx(l,{renderElement:b}),parameters:M({apiURL:s,description:"`useUpdateElement` is a hook to set element attributes. It returns a function to set the element attribute. It must be used inside the GraphProvider.\n    ",code:`import { useUpdateElement } from '@joint/react'

function Component() {
  const setPosition = useUpdateElement('element-id', 'position');
  return <button onClick={() => setPosition({ x: 100, y: 100 })}>Set Position</button>;
}`})};function b({label:o,id:i}){const n=d(i,"label");return t.jsxs(a,{className:"node",children:[t.jsx("button",{className:r,onClick:()=>n("Hello"),children:"Set label"}),"label: ",o]})}const m=u({args:{label:"default",color:"red",id:"default-id"},apiURL:s,code:`import { useUpdateElement } from '@joint/react'


  function Hook({  label , id }: SimpleElement) {
    const setLabel = useUpdateElement(id, 'label');
  
    return (
      <HTMLNode className="node">
        <button onClick={() => setLabel("Hello")>Set label</button>
        label: {label}
      </HTMLNode>
    );
  }`,description:"Set new data for the element."});function C({label:o,id:i}){const n=d(i,"position");return t.jsxs(a,{className:"node",children:[t.jsx("button",{className:r,onClick:()=>n(e=>e===void 0?{x:0,y:0}:{x:e.x+10,y:e.y+10}),children:"Set position"}),"label: ",o]})}const c=u({component:()=>t.jsx(l,{renderElement:C}),apiURL:s,code:`import { useUpdateElement } from '@joint/react'

  function HookSetPosition({ label, id }: SimpleElement) {
    const set = useUpdateElement(id, 'position');
  
    return (
      <HTMLNode className="node">
        <button
          onClick={() =>
            set((previous) => {
              if (previous === undefined) {
                return { x: 0, y: 0 };
              }
              return { x: previous.x + 10, y: previous.y + 10 };
            })
          }
        >
          Set position
        </button>
        label: {label}
      </HTMLNode>
    );
  }
  `,description:"Set the position of the element."});function w({label:o,id:i}){const n=d(i,"size");return t.jsxs(a,{className:"node",children:[t.jsx("button",{className:r,onClick:()=>n(e=>e===void 0?{width:0,height:0}:{width:e.width+10,height:e.height+10}),children:"Set size"}),"label: ",o]})}const p=u({component:()=>t.jsx(l,{renderElement:w}),apiURL:s,code:`import { useUpdateElement } from '@joint/react'

function HookSetSize({  label, id }: SimpleElement) {
  const set = useUpdateElement(id, 'size');

  return (
    <HTMLNode className="node">
      <button
        onClick={() =>
          set((previous) => {
            if (previous === undefined) {
              return { width: 0, height: 0 };
            }
            return { width: previous.width + 10, height: previous.height + 10 };
          })
        }
      >
        Set size
      </button>
      label: {label}
    </HTMLNode>
  );
}`,description:"Set the size of the element."});function z({label:o,id:i}){const n=d(i,"angle");return t.jsxs(a,{className:"node",children:[t.jsx("button",{className:r,onClick:()=>n(e=>e===void 0?0:e+45),children:"Set Angle"}),"label: ",o]})}const S=u({component:()=>t.jsx(l,{renderElement:z}),apiURL:s,code:`function HookSetAngle({  label, id }: SimpleElement) {
  const set = useUpdateElement(id, 'angle');

  return (
    <HTMLNode className="node">
      <button
        onClick={() =>
          set((previous) => {
            if (previous === undefined) {
              return 0;
            }
            return previous + 45;
          })
        }
      >
        Set Angle
      </button>
      label: {label}
    </HTMLNode>
  );
}`,description:"Set the angle of the element."});function I({label:o,id:i}){const n=d(i);return t.jsxs(a,{className:"node",children:[t.jsx("button",{className:r,onClick:()=>n("position",e=>e===void 0?{x:0,y:0}:{x:e.x+10,y:e.y+10}),children:"Set Position"}),t.jsx("button",{className:r,onClick:()=>n("size",e=>e===void 0?{width:0,height:0}:{width:e.width+10,height:e.height+10}),children:"Set Size"}),"label: ",o]})}const h=u({apiURL:s,component:()=>t.jsx(l,{renderElement:I}),code:`import { useUpdateElement } from '@joint/react'

function HookSetAny({  label , id }: SimpleElement) {
  const set = useUpdateElement(id);

  return (
    <HTMLNode className="node">
      <button
        onClick={() =>
          set('position', (previous) => {
            if (previous === undefined) {
              return { x: 0, y: 0 };
            }
            return { x: previous.x + 10, y: previous.y + 10 };
          })
        }
      >
        Set Position
      </button>
      <button
        onClick={() =>
          set('size', (previous) => {
            if (previous === undefined) {
              return { width: 0, height: 0 };
            }
            return { width: previous.width + 10, height: previous.height + 10 };
          })
        }
      >
        Set Size
      </button>
      label: {label}
    </HTMLNode>
  );
}`,description:"Set the markup of the element."});var f,k,E;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`makeStory<Story>({
  args: {
    label: 'default',
    color: 'red',
    id: 'default-id'
  },
  apiURL: API_URL,
  code: \`import { useUpdateElement } from '@joint/react'


  function Hook({  label , id }: SimpleElement) {
    const setLabel = useUpdateElement(id, 'label');
  
    return (
      <HTMLNode className="node">
        <button onClick={() => setLabel("Hello")>Set label</button>
        label: {label}
      </HTMLNode>
    );
  }\`,
  description: 'Set new data for the element.'
})`,...(E=(k=m.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var H,L,N;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`makeStory<Story>({
  component: () => <RenderItemDecorator renderElement={HookSetPosition} />,
  apiURL: API_URL,
  code: \`import { useUpdateElement } from '@joint/react'

  function HookSetPosition({ label, id }: SimpleElement) {
    const set = useUpdateElement(id, 'position');
  
    return (
      <HTMLNode className="node">
        <button
          onClick={() =>
            set((previous) => {
              if (previous === undefined) {
                return { x: 0, y: 0 };
              }
              return { x: previous.x + 10, y: previous.y + 10 };
            })
          }
        >
          Set position
        </button>
        label: {label}
      </HTMLNode>
    );
  }
  \`,
  description: 'Set the position of the element.'
})`,...(N=(L=c.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var U,g,x;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`makeStory<Story>({
  component: () => <RenderItemDecorator renderElement={HookSetSize} />,
  apiURL: API_URL,
  code: \`import { useUpdateElement } from '@joint/react'

function HookSetSize({  label, id }: SimpleElement) {
  const set = useUpdateElement(id, 'size');

  return (
    <HTMLNode className="node">
      <button
        onClick={() =>
          set((previous) => {
            if (previous === undefined) {
              return { width: 0, height: 0 };
            }
            return { width: previous.width + 10, height: previous.height + 10 };
          })
        }
      >
        Set size
      </button>
      label: {label}
    </HTMLNode>
  );
}\`,
  description: 'Set the size of the element.'
})`,...(x=(g=p.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var y,v,j;S.parameters={...S.parameters,docs:{...(y=S.parameters)==null?void 0:y.docs,source:{originalSource:`makeStory<Story>({
  component: () => <RenderItemDecorator renderElement={HookSetAngle} />,
  apiURL: API_URL,
  code: \`function HookSetAngle({  label, id }: SimpleElement) {
  const set = useUpdateElement(id, 'angle');

  return (
    <HTMLNode className="node">
      <button
        onClick={() =>
          set((previous) => {
            if (previous === undefined) {
              return 0;
            }
            return previous + 45;
          })
        }
      >
        Set Angle
      </button>
      label: {label}
    </HTMLNode>
  );
}\`,
  description: 'Set the angle of the element.'
})`,...(j=(v=S.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var R,A,T;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`makeStory<Story>({
  apiURL: API_URL,
  component: () => <RenderItemDecorator renderElement={HookSetAny} />,
  code: \`import { useUpdateElement } from '@joint/react'

function HookSetAny({  label , id }: SimpleElement) {
  const set = useUpdateElement(id);

  return (
    <HTMLNode className="node">
      <button
        onClick={() =>
          set('position', (previous) => {
            if (previous === undefined) {
              return { x: 0, y: 0 };
            }
            return { x: previous.x + 10, y: previous.y + 10 };
          })
        }
      >
        Set Position
      </button>
      <button
        onClick={() =>
          set('size', (previous) => {
            if (previous === undefined) {
              return { width: 0, height: 0 };
            }
            return { width: previous.width + 10, height: previous.height + 10 };
          })
        }
      >
        Set Size
      </button>
      label: {label}
    </HTMLNode>
  );
}\`,
  description: 'Set the markup of the element.'
})`,...(T=(A=h.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};const Z=["Default","SetPosition","SetSize","SetAngle","SetAnyProperty"];export{m as Default,S as SetAngle,h as SetAnyProperty,c as SetPosition,p as SetSize,Z as __namedExportsOrder,Y as default};
