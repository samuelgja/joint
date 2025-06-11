import{j as e}from"./index-DwP6fAIG.js";import{useMDXComponents as t}from"./index-DL7Mpk60.js";import{M as o}from"./index-D3TcvAYe.js";import{a as i,b as d}from"./get-api-documentation-link-BQfISuZK.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./iframe-DhzKC3lG.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function r(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"introduction-to-jointreact",children:"Introduction to @joint/react"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"@joint/react"})," is a React wrapper for ",e.jsx(n.a,{href:"https://www.jointjs.com/",rel:"nofollow",children:"JointJS"}),", designed to make creating and managing interactive diagrams and graphs in React applications simple and intuitive. It provides React components, hooks, and utilities to efficiently manage nodes, links, and user interactions."]}),`
`,e.jsx(n.h2,{id:"-core-components",children:"📌 Core Components"}),`
`,e.jsxs(n.h3,{id:"1-",children:["1. ",i("GraphProvider")]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"GraphProvider"})," component manages a shared ",e.jsx(n.a,{href:"https://docs.jointjs.com/api/dia/Graph/",rel:"nofollow",children:"JointJS Graph instance"})," to handle the state of your diagram. Wrap it around any components that interact with the graph."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { GraphProvider } from '@joint/react';

<GraphProvider>
  {/* Components like Paper for rendering nodes and edges */}
</GraphProvider>
`})}),`
`,e.jsxs(n.h3,{id:"2-",children:["2. ",i("Paper","variables")]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Paper"})," component wraps ",e.jsx(n.a,{href:"https://docs.jointjs.com/learn/quickstart/paper/",rel:"nofollow",children:"JointJS Paper"})," to render nodes and links. Use the ",d("Paper","renderElement")," prop to define how nodes are displayed."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Paper } from '@joint/react';

const renderElement = (element) => (
  <rect width={element.size().width} height={element.size().height} fill="cyan" />
);

<Paper width={800} height={600} renderElement={renderElement} />
`})}),`
`,e.jsxs(n.h3,{id:"3-embedding-html-in-svg-nodes",children:["3. ",e.jsx(n.strong,{children:"Embedding HTML in SVG Nodes"})]}),`
`,e.jsxs(n.p,{children:["While JointJS primarily uses SVG, you can embed HTML content inside nodes using SVG's ",e.jsx(n.code,{children:"<foreignObject>"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const renderElement = ({ width, height }) => (
  <foreignObject width={width} height={height}>
    <div style={{ background: 'lightgray' }}>
      HTML Content here
    </div>
  </foreignObject>
);
`})}),`
`,e.jsx(n.h2,{id:"️-core-hooks-and-utilities",children:"🛠️ Core Hooks and Utilities"}),`
`,e.jsx(n.h3,{id:"-accessing-elements",children:"🔹 Accessing Elements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[i("useElements"),": Retrieve all diagram elements (requires ",e.jsx(n.code,{children:"GraphProvider"})," context)."]}),`
`,e.jsxs(n.li,{children:[i("useElement"),": Retrieve individual element data, typically used within ",e.jsx(n.code,{children:"renderElement"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"-modifying-elements",children:"🔹 Modifying Elements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[i("useUpdateElement"),": Update existing elements in the diagram."]}),`
`]}),`
`,e.jsx(n.h3,{id:"-graph-and-paper-instances",children:"🔹 Graph and Paper Instances"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[i("useGraph"),": Access the JointJS ",e.jsx(n.a,{href:"https://docs.jointjs.com/api/dia/Graph/",rel:"nofollow",children:"Graph instance"})," directly."]}),`
`,e.jsxs(n.li,{children:[i("usePaper"),": Access the JointJS ",e.jsx(n.a,{href:"https://docs.jointjs.com/learn/quickstart/paper/",rel:"nofollow",children:"Paper instance"})," directly."]}),`
`]}),`
`,e.jsx(n.h3,{id:"-creating-nodes-and-links",children:"🔹 Creating Nodes and Links"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[i("createElements"),": Utility for creating nodes."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { createElements } from '@joint/react';

const initialElements = createElements([
  { id: '1', type: 'rect', x: 10, y: 10, width: 100, height: 100 },
]);
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[i("createLinks"),": Utility for creating links between nodes."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { createLinks } from '@joint/react';

const initialLinks = createLinks([
  { source: '1', target: '2', id: '1-2' },
]);
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"how-it-works",children:"How It Works"}),`
`,e.jsxs(n.p,{children:["Under the hood, ",e.jsx(n.strong,{children:"@joint/react"})," listens to changes in the ",e.jsx(n.code,{children:"dia.Graph"}),", which acts as the single source of truth. When you update the graph—such as adding or modifying cells—the React components automatically observe and react to these changes, keeping the UI in sync."]}),`
`,e.jsxs(n.p,{children:["Hooks like ",e.jsx(n.code,{children:"useUpdateElement"})," provide a convenient way to update the graph, but you can also directly access the graph using ",e.jsx(n.code,{children:"useGraph()"})," and call methods like ",e.jsx(n.code,{children:"graph.setCells()"}),"."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"known-issues",children:"Known Issues"}),`
`,e.jsxs(n.h3,{id:"avoid-certain-css-properties-in-foreignobject",children:["Avoid Certain CSS Properties in ",e.jsx(n.code,{children:"<foreignObject>"})]}),`
`,e.jsxs(n.p,{children:["Some CSS properties can cause rendering issues in Safari when used inside an SVG ",e.jsx(n.code,{children:"<foreignObject>"}),". To ensure compatibility, avoid the following properties:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"position"})," (other than ",e.jsx(n.code,{children:"static"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"-webkit-transform-style"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"-webkit-backface-visibility"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"transition"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"transform"})}),`
`]}),`
`,e.jsx(n.h3,{id:"recommended-workaround",children:"Recommended Workaround"}),`
`,e.jsx(n.p,{children:"If you need to use HTML inside an SVG with cross-browser support:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use minimal CSS inside ",e.jsx(n.code,{children:"<foreignObject>"}),"."]}),`
`,e.jsx(n.li,{children:"Stick to static positioning and avoid CSS transforms."}),`
`,e.jsx(n.li,{children:"Consider overlaying HTML outside the SVG using absolute positioning."}),`
`]}),`
`,e.jsx(n.h3,{id:"flickering",children:"Flickering"}),`
`,e.jsx(n.p,{children:"React's asynchronous rendering can cause flickering when dynamically adding ports or resizing elements. We are aware of this issue and are working on a fix."}),`
`,e.jsx(n.h3,{id:"controlled-mode",children:"Controlled Mode"}),`
`,e.jsxs(n.p,{children:["Currently, ",e.jsx(n.strong,{children:"@joint/react"})," uses ",e.jsx(n.code,{children:"useSyncExternalStore"})," to listen to graph changes. The graph is the source of truth, so ",e.jsx(n.code,{children:"initialElements"})," and ",e.jsx(n.code,{children:"initialLinks"})," are only used during initialization. To modify the state, update the graph directly using hooks like ",e.jsx(n.code,{children:"useGraph"}),", ",e.jsx(n.code,{children:"useUpdateElement"}),", or ",e.jsx(n.code,{children:"useCreateElement"}),". A fully controlled mode is under development."]})]})}function f(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{f as default};
