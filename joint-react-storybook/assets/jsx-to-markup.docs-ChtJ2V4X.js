import{j as n}from"./index-DwP6fAIG.js";import{useMDXComponents as o}from"./index-DL7Mpk60.js";import{M as s,C as r}from"./index-D3TcvAYe.js";import{Default as l}from"./jsx-to-markup.stories-CIQHVEp5.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./iframe-DhzKC3lG.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";/* empty css              */import"./create-njWDpS2D.js";import"./theme-BZH0jGzG.js";import"./with-simple-data-BKTSf5MX.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";import"./make-story-CJLFqcT8.js";import"./get-api-documentation-link-BQfISuZK.js";function i(t){const e={a:"a",code:"code",h1:"h1",h2:"h2",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"Utils/JSX/JSX to Markup"}),`
`,n.jsx(e.h1,{id:"jsx-to-markup",children:n.jsx(e.code,{children:"jsx-to-markup"})}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"jsx-to-markup"})," utility allows you to define ",n.jsx(e.a,{href:"https://resources.jointjs.com/docs/jointjs/v4.0/joint.html",rel:"nofollow",children:"JointJS"})," element markup using JSX syntax, making it easier to create and maintain complex SVG or HTML structures for custom JointJS elements."]}),`
`,n.jsx(e.h2,{id:"what-does-it-do",children:"What does it do?"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Converts JSX elements (including fragments, custom components, and standard HTML/SVG tags) into JointJS's ",n.jsx(e.code,{children:"MarkupJSON"})," format."]}),`
`,n.jsxs(e.li,{children:["Supports attribute extraction, including special handling for ",n.jsx(e.code,{children:"joint-*"})," attributes."]}),`
`,n.jsxs(e.li,{children:["Allows you to use React-like composition for defining markup, but ",n.jsx(e.strong,{children:"does not"})," support dynamic React features (like hooks or state)."]}),`
`]}),`
`,n.jsx(e.h2,{id:"why-use-it",children:"Why use it?"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Readability:"})," Write markup in familiar JSX/TSX syntax instead of verbose JSON."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Maintainability:"})," Compose and reuse markup using functional components."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Integration:"})," Seamlessly integrates with JointJS's custom element definitions."]}),`
`]}),`
`,n.jsx(e.h2,{id:"example",children:"Example"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { dia } from '@joint/core';
import { jsx } from '@joint/react';

const CustomRect = dia.Element.define(
  'custom.Rect',
  {
    attrs: {
      body: { fill: '#007bff' },
      label: { text: 'JSX Markup' },
    },
    size: { width: 120, height: 50 },
  },
  {
    // Here we using the jsx function to define the markup
    markup: jsx(
      <g>
        <rect joint-selector="body" width="120" height="50" rx="10" ry="10" />
        <text joint-selector="label" x="60" y="25" textAnchor="middle" dominantBaseline="middle" />
      </g>
    ),
  }
);
`})}),`
`,n.jsx(r,{of:l}),`
`,n.jsx(e.h2,{id:"how-does-it-work",children:"How does it work?"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["The ",n.jsx(e.code,{children:"jsx"})," function takes a JSX element and recursively converts it into the ",n.jsx(e.code,{children:"MarkupJSON"})," format expected by JointJS."]}),`
`,n.jsxs(e.li,{children:["You can use fragments (",n.jsx(e.code,{children:"<>...</>"}),") and custom functional components for markup composition."]}),`
`,n.jsxs(e.li,{children:["Attributes prefixed with ",n.jsx(e.code,{children:"joint-"})," are extracted and attached as top-level properties in the markup object."]}),`
`]}),`
`,n.jsx(e.h2,{id:"limitations",children:"Limitations"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Only static markup is supported. Dynamic React features (hooks, state, context) are ",n.jsx(e.strong,{children:"not"})," supported."]}),`
`,n.jsx(e.li,{children:"Only functional components are supported for composition."}),`
`,n.jsx(e.li,{children:"All children must be valid JSX elements, strings, numbers, booleans, or null."}),`
`]}),`
`,n.jsx(e.h2,{id:"see-also",children:"See also"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://resources.jointjs.com/docs/jointjs/v4.0/joint.html#dia.Element.markup",rel:"nofollow",children:"JointJS Markup documentation"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://resources.jointjs.com/docs/jointjs/v4.0/joint.html#ui.Paper",rel:"nofollow",children:"JointJS React integration"})}),`
`]}),`
`,n.jsx(e.hr,{})]})}function X(t={}){const{wrapper:e}={...o(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(i,{...t})}):i(t)}export{X as default};
