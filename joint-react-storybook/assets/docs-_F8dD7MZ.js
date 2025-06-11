import{j as e}from"./index-DwP6fAIG.js";import{useMDXComponents as l}from"./index-DL7Mpk60.js";import{M as a,C as i,a as r}from"./index-D3TcvAYe.js";import{S as d,a as c,H as h,b as p}from"./story-mrkWURiJ.js";import{a as s}from"./get-api-documentation-link-BQfISuZK.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./iframe-DhzKC3lG.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";/* empty css              */import"./theme-BZH0jGzG.js";import"./create-njWDpS2D.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";const m=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */

import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';
import {
  createElements,
  createLinks,
  GraphProvider,
  Paper,
  type GraphProps,
  type InferElement,
} from '@joint/react';

// define initial elements
const initialElements = createElements([
  { id: '1', color: PRIMARY, x: 100, y: 0, width: 100, height: 25 },
  { id: '2', color: PRIMARY, x: 100, y: 200, width: 100, height: 25 },
]);

// define initial edges
const initialEdges = createLinks([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'standard.Link', // if define type, it provide intellisense support
    attrs: {
      line: {
        stroke: PRIMARY,
        strokeWidth: 2,
      },
    },
  },
]);

// infer element type from the initial elements (this type can be used for later usage like RenderItem props)
type CustomElement = InferElement<typeof initialElements>;

function RenderItem({ width, height, color }: CustomElement) {
  return <rect rx={10} ry={10} width={width} height={height} fill={color} />;
}

function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={RenderItem} />
    </div>
  );
}

export default function App(props: Readonly<GraphProps>) {
  return (
    <GraphProvider {...props} initialLinks={initialEdges} initialElements={initialElements}>
      <Main />
    </GraphProvider>
  );
}
`,x=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */

import {
  createElements,
  createLinks,
  GraphProvider,
  MeasuredNode,
  Paper,
  type GraphProps,
  type InferElement,
} from '@joint/react';
import '../../examples/index.css';
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';
// define initial elements
const initialElements = createElements([
  { id: '1', label: 'Hello', x: 100, y: 0, width: 100, height: 25 },
  { id: '2', label: 'World', x: 100, y: 200, width: 100, height: 25 },
]);

// define initial edges
const initialEdges = createLinks([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'standard.Link', // if define type, it provide intellisense support
    attrs: {
      line: {
        stroke: PRIMARY,
        strokeWidth: 2,
      },
    },
  },
]);

// infer element type from the initial elements (this type can be used for later usage like RenderItem props)
type CustomElement = InferElement<typeof initialElements>;

function RenderItem({ label, width, height }: CustomElement) {
  return (
    <foreignObject width={width} height={height}>
      <MeasuredNode>
        <div className="node">{label}</div>
      </MeasuredNode>
    </foreignObject>
  );
}

function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={RenderItem} />
    </div>
  );
}

export default function App(props: Readonly<GraphProps>) {
  return (
    <GraphProvider {...props} initialLinks={initialEdges} initialElements={initialElements}>
      <Main />
    </GraphProvider>
  );
}
`,u=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { useCallback, useState } from 'react';
import {
  createElements,
  createLinks,
  GraphProvider,
  MeasuredNode,
  Paper,
  usePaper,
  type GraphProps,
  type InferElement,
} from '@joint/react';
import '../../examples/index.css';
import { BUTTON_CLASSNAME } from 'storybook-config/theme';
// Define initial elements
const initialElements = createElements([
  { id: '1', data: { label: 'Hello' }, x: 100, y: 0, width: 100, height: 25 },
  { id: '2', data: { label: 'World' }, x: 100, y: 200, width: 100, height: 25 },
]);

// Define initial edges
const initialEdges = createLinks([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'standard.Link', // If you define type, it provides intellisense support
    attrs: {
      line: {
        stroke: '#3498db', // Primary color
        strokeWidth: 2,
      },
    },
  },
]);

let zoomLevel = 1;

function Controls() {
  const paper = usePaper();
  return (
    <div className="flex flex-row">
      <button
        type="button"
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        onClick={() => {
          const center = paper.getArea().center();
          zoomLevel = Math.min(3, zoomLevel + 0.2);
          paper.scaleUniformAtPoint(zoomLevel, center);
        }}
        className={BUTTON_CLASSNAME}
      >
        Zoom in
      </button>
      <button
        type="button"
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        onClick={() => {
          const center = paper.getArea().center();
          zoomLevel = Math.max(0.2, zoomLevel - 0.2);
          paper.scaleUniformAtPoint(zoomLevel, center);
        }}
        className={\`\${BUTTON_CLASSNAME} ml-2\`}
      >
        Zoom out
      </button>
    </div>
  );
}
function Main() {
  const [isHTMLEnabled, setHTMLEnabled] = useState(true);

  // Infer element type from the initial elements
  type CustomElement = InferElement<typeof initialElements>;

  const renderItem = useCallback(
    ({ data: { label }, width, height }: CustomElement) => {
      if (isHTMLEnabled) {
        return (
          <MeasuredNode>
            <div className="node">
              <div>{label}</div>
            </div>
          </MeasuredNode>
        );
      }
      return <rect rx={10} ry={10} width={width} height={height} fill="blue" />;
    },
    [isHTMLEnabled]
  );

  return (
    <Paper useHTMLOverlay={isHTMLEnabled} width={400} height={400} renderElement={renderItem}>
      <Controls />
      <button
        type="button"
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        onClick={() => {
          setHTMLEnabled((previous) => !previous);
        }}
        className={\`\${BUTTON_CLASSNAME} mt-2\`}
      >
        is HTML Overlay enabled: {isHTMLEnabled ? 'true' : 'false'}
      </button>
    </Paper>
  );
}

export default function App(props: Readonly<GraphProps>) {
  return (
    <GraphProvider {...props} initialLinks={initialEdges} initialElements={initialElements}>
      <Main />
    </GraphProvider>
  );
}
`;function o(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d}),`
`,e.jsx(n.h1,{id:"get-started-with-jointreact",children:"Get Started with @joint/react"}),`
`,e.jsxs(n.p,{children:["Welcome! This guide will help you get started with the new ",e.jsx(n.code,{children:"@joint/react"})," library, which brings the power of ",e.jsx(n.a,{href:"https://www.jointjs.com/",rel:"nofollow",children:"JointJS"})," to React. We'll walk through the core concepts step by step, with live examples and code blocks."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"1-what-is-jointreact",children:"1. What is @joint/react?"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@joint/react"})," is a React-first API for building interactive diagrams, powered by ",e.jsx(n.a,{href:"https://www.jointjs.com/",rel:"nofollow",children:"JointJS"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JointJS"})," is a diagramming library for creating flowcharts, BPMN, ER diagrams, and more."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@joint/react"})," wraps JointJS concepts in idiomatic React components and hooks."]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"2-core-concepts",children:"2. Core Concepts"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Element (Node):"})," A visual item in your diagram (e.g., a rectangle, circle, or custom shape)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Link (Edge):"})," A connection between two elements."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Graph:"})," The data model holding all elements and links."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Paper:"})," The UI component that renders the graph."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"GraphProvider:"})," React context provider for managing the graph state."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Ports:"})," Named connection points on elements for precise linking."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MeasuredNode:"})," Utility for auto-sizing nodes based on their content."]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"3-creating-elements-and-links",children:"3. Creating Elements and Links"}),`
`,e.jsx(n.h3,{id:"a-elements-nodes",children:"a. Elements (Nodes)"}),`
`,e.jsx(n.p,{children:"You can create elements with or without a custom type. The type is inferred automatically, but you can also specify it for type safety."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Inferred type
const elements = createElements([
  { id: '1', label: 'Node 1', x: 100, y: 0, width: 100, height: 25 },
  { id: '2', label: 'Node 2', x: 100, y: 200, width: 100, height: 25 },
]);

// Here we can use the inferred type
type ElementType = InferElement<typeof elements>;

// With custom type
interface MyNode extends GraphElement {
  label: string;
  color: string;
}
const customElements = createElements<MyNode>([
  { id: 'a', label: 'A', color: 'red', x: 0, y: 0, width: 80, height: 40 },
]);
`})}),`
`,e.jsx(n.h3,{id:"b-links-edges",children:"b. Links (Edges)"}),`
`,e.jsxs(n.p,{children:["Links connect elements by their ",e.jsx(n.code,{children:"id"}),". You can use simple strings or objects (for advanced features like ports)."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Simple link by id
const links = createLinks([{ id: 'l1', source: '1', target: '2' }]);

// Link with port (advanced)
const linksWithPorts = createLinks([
  { id: 'l2', source: { id: '1', port: 'out' }, target: { id: '2', port: 'in' } }
]);
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"4-setting-up-the-graph-context",children:"4. Setting Up the Graph Context"}),`
`,e.jsxs(n.p,{children:["Wrap your app (or diagram) with ",s("GraphProvider"),". This provides the graph context to all child components."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"initialElements:"})," Initial elements to load."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"initialLinks:"})," Initial links to load."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<GraphProvider initialElements={elements} initialLinks={links}>
  {/* Your diagram components */}
</GraphProvider>
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You can also use ",e.jsx(n.code,{children:"initialElements"})," and ",e.jsx(n.code,{children:"initialLinks"})," directly on the ",s("Paper","variables")," component for simple cases without need to use the GraphProvider."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Paper initialElements={elements} initialLinks={links}>
  {/* Your diagram components */}
</Paper>
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"5-rendering-the-diagram-with-paper",children:"5. Rendering the Diagram with Paper"}),`
`,e.jsxs(n.p,{children:["The ",s("Paper","variables")," component renders your graph. It is the main UI component."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"renderElement:"})," Function to render each node."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"elementSelector:"})," (Optional) Selects which elements to render."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Events:"})," Handle user interactions (e.g., onLinkMouseEnter)."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// MyNode is a custom type
function RenderItem({ width, height, label }: MyNode) {
  return <rect width={width} height={height} fill="lightblue"><title>{label}</title></rect>;
}

<Paper width="100%" height={300} renderElement={RenderItem} />
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"6-using-html-in-nodes",children:"6. Using HTML in Nodes"}),`
`,e.jsxs(n.p,{children:["By default, nodes are rendered as SVG. To use HTML, wrap your content in a ",e.jsx(n.code,{children:"foreignObject"})," or use the ",e.jsx(n.code,{children:"useHTMLOverlay"})," prop."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`function RenderHTMLNode({ label, width, height }) {
  return (
    <foreignObject width={width} height={height}>
      <MeasuredNode>
        <div className="node">{label}</div>
      </MeasuredNode>
    </foreignObject>
  );
}
`})}),`
`,e.jsxs(n.p,{children:["Or, with ",e.jsx(n.code,{children:"useHTMLOverlay"})," (renders HTML outside SVG, no ",e.jsx(n.code,{children:"foreignObject"})," needed):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Paper useHTMLOverlay renderElement={RenderHTMLNode} />
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"7-live-examples",children:"7. Live Examples"}),`
`,e.jsx(n.h3,{id:"svg-node-example",children:"SVG Node Example"}),`
`,e.jsx(i,{of:c}),`
`,e.jsx(r,{children:`\`\`\`tsx
${m}
\`\`\``}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"html-node-example",children:"HTML Node Example"}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(r,{children:`\`\`\`tsx
${x}
\`\`\``}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"html-overlay-example",children:"HTML Overlay Example"}),`
`,e.jsx(i,{of:p}),`
`,e.jsx(r,{children:`\`\`\`tsx
${u}
\`\`\``}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"8-advanced-ports-events-and-customization",children:"8. Advanced: Ports, Events, and Customization"}),`
`,e.jsx(n.h3,{id:"a-ports",children:"a. Ports"}),`
`,e.jsx(n.p,{children:"Ports allow you to define named connection points on elements for links."}),`
`,e.jsxs(n.p,{children:["We can also define it in declerative way, using the ",e.jsx(n.code,{children:"ports"})," components."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`function RenderNodeWithPorts({ label, width, height }) {
  return (
    <>
    <MeasuredNode>
      <rect width={width} height={height} fill="lightblue">
        <title>{label}</title>
      </rect>
    </MeasuredNode>
    <Port.Group id="ports" position="top">
      <Port id="in" >
        <circle r={5} fill="red" />
      </Port>
      <Port id="out">
        <circle r={5} fill="green" />
      </Port>
    </Port.Group>
    <>
  );
}
`})}),`
`,e.jsx(n.h3,{id:"b-events",children:"b. Events"}),`
`,e.jsxs(n.p,{children:["Handle user interactions with events like ",e.jsx(n.code,{children:"onLinkMouseEnter"}),", ",e.jsx(n.code,{children:"onElementsSizeReady"}),", etc."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Paper
  onLinkMouseEnter={({ linkView, paper }) => {
    // Add custom link tools or highlighters
  }}
  onElementsSizeReady={({ paper }) => {
    // Fit content to view
    paper.transformToFitContent({ padding: 40 });
  }}
  // ...other props
/>
`})}),`
`,e.jsx(n.h3,{id:"c-customizing-link-behavior",children:"c. Customizing Link Behavior"}),`
`,e.jsxs(n.p,{children:["You can change how links behave and look by setting props like ",e.jsx(n.code,{children:"defaultRouter"}),", ",e.jsx(n.code,{children:"defaultConnector"}),", ",e.jsx(n.code,{children:"defaultAnchor"}),", etc."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Paper
  defaultRouter={{ name: 'rightAngle', args: { margin: 28 } }}
  defaultConnector={{ name: 'straight' }}
  // ...other props
/>
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"9-key-terms",children:"9. Key Terms"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"GraphProvider:"})," React context for graph data."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Paper:"})," Renders the graph visually."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Element:"})," Node in the graph."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Link:"})," Edge between nodes."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Port:"})," Named connection point on an element."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MeasuredNode:"})," Auto-measures and updates node size."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useHTMLOverlay:"})," Renders HTML nodes outside SVG for full HTML support."]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"10-more-resources",children:"10. More Resources"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/clientIO/joint-plus/tree/main/packages/joint-react",rel:"nofollow",children:"@joint/react API Reference"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://docs.jointjs.com/",rel:"nofollow",children:"JointJS Documentation"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.p,{children:"Happy diagramming! 🚀"})]})}function C(t={}){const{wrapper:n}={...l(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{C as default};
