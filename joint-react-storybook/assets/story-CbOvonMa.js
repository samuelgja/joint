import{j as o}from"./index-DwP6fAIG.js";import{useMDXComponents as l}from"./index-DL7Mpk60.js";import{M as s,C as a,a as e}from"./index-D3TcvAYe.js";import{S as c,D as i,C as d}from"./story-C0qDp5-k.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./iframe-DhzKC3lG.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";import"./create-njWDpS2D.js";import"./theme-BZH0jGzG.js";import"./index-4CDyDOw8.js";import"./mask-DJTgPChi.js";import"./custom-CNnXkfQ2.js";import"./use-children-ref-gx-xwHed.js";import"./opacity-BIjguiiq.js";import"./stroke-CxK-R5f1.js";import"./helpers-BazfYDoP.js";import"./measured-node-BZZgBNj5.js";const j=`:root {
  /* JointJS Palette */
  --jj-color1: #ed2637;
  --jj-color2: #131e29;
  --jj-color3: #dde6ed;
  --jj-color4: #f6f740;
  --jj-color5: #0075f2;
  --jj-color6: #1a2938;
  --jj-color7: #cad8e3;

  /* Dark Theme */
  --step-stroke-color: var(--jj-color1);
  --step-fill-color: var(--jj-color2);
  --step-text-color: var(--jj-color3);
  --decision-stroke-color: var(--jj-color3);
  --decision-fill-color: var(--jj-color2);
  --decision-text-color: var(--jj-color3);
  --start-stroke-color: var(--jj-color1);
  --start-fill-color: var(--jj-color2);
  --start-text-color: var(--jj-color1);
  --flow-stroke-color: var(--jj-color1);
  --flow-label-stroke-color: var(--jj-color2);
  --flow-label-fill-color: var(--jj-color1);
  --flow-label-text-color: var(--jj-color3);
  --flow-selection-color: var(--jj-color6);
  --frame-color: var(--jj-color4);
  --background-color: var(--jj-color2);
  --switch-color: var(--jj-color3);
  --switch-background-color: var(--jj-color1);
  --logo-color: var(--jj-color3);
}

.flowchart-node {
  font-family: 'PPFraktionSans', sans-serif;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  padding: 8px;
  box-sizing: border-box;
  cursor: move;
  border: 2px solid #ed2637;
  color: #dde6ed;
}

.flowchart-node:hover {
  background-color: #ff9505;
  border: 2px solid #ff9505;
  color: var(--step-text-color);
}
/* Start node styling (mimics .jj-start-body & .jj-start-text) */
.flowchart-start {
  border-radius: 25px;
}

/* Step node styling (mimics .jj-step-body & .jj-step-text) */
.flowchart-step {
  border-radius: 5px;
}
.jj-flow-outline {
  stroke: var(--background-color);
  stroke-width: 1px;
}

.jj-flow-tools circle {
  stroke: var(--frame-color);
  fill: var(--background-color);
  stroke-width: 2;
}

.jj-flow-tools rect {
  stroke: var(--frame-color);
}

.link {
  stroke-dasharray: 5 5; /* dash length 10, gap 10 */
  stroke-dashoffset: 0;
  animation: dashmove 1s linear infinite;
}

@keyframes dashmove {
  to {
    stroke-dashoffset: -20; /* dash + gap length */
  }
}
`;function t(n){const r={h2:"h2",h3:"h3",p:"p",...l(),...n.components};return o.jsxs(o.Fragment,{children:[o.jsx(s,{of:c}),`
`,o.jsx(r.h2,{id:"flowchart-demo",children:"Flowchart Demo"}),`
`,o.jsx(r.p,{children:"This is a demonstration of a flowchart created using the JointJS library. The flowchart showcases various nodes and connections, styled and rendered interactively."}),`
`,o.jsx(r.h3,{id:"preview",children:"Preview"}),`
`,o.jsx(r.p,{children:"Below is a live preview of the flowchart. You can interact with it to see how the nodes and links behave."}),`
`,o.jsx(a,{of:i}),`
`,o.jsx(r.h3,{id:"code-example",children:"Code Example"}),`
`,o.jsx(r.p,{children:"Here is the complete code used to create the flowchart. You can use this as a reference to build your own flowcharts."}),`
`,o.jsx(e,{children:`\`\`\`tsx
${d}
\`\`\``}),`
`,o.jsx(r.h3,{id:"css-styling",children:"CSS Styling"}),`
`,o.jsx(r.p,{children:"The following CSS styles are applied to the flowchart. These styles define the appearance of the nodes, links, and other elements."}),`
`,o.jsx(e,{children:`\`\`\`css
${j}
\`\`\``})]})}function E(n={}){const{wrapper:r}={...l(),...n.components};return r?o.jsx(r,{...n,children:o.jsx(t,{...n})}):t(n)}const F=[];export{F as __namedExportsOrder,E as default};
