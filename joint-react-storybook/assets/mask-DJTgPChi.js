import{j as g}from"./index-DwP6fAIG.js";import{r}from"./index-B0WjJBI_.js";import{C as u}from"./custom-CNnXkfQ2.js";import{m as f}from"./create-njWDpS2D.js";const k={stroke:"#4666E5",strokeWidth:3,strokeLinejoin:"round",fill:"none"};function y(o,i){const{layer:n,children:a,padding:t,isHidden:d,...s}=o,l=r.useMemo(()=>{const e={layer:n,attrs:{...k,...s}};return t!==void 0&&(e.padding=t),e},[n,t,s]),m=r.useCallback((e,p,c,h)=>f.add(e,p,c,h),[]);return g.jsx(u,{options:l,ref:i,onCreateHighlighter:m,isHidden:d,children:a})}const R=r.forwardRef(y);R.__docgenInfo={description:`Mask highlighter component.
Adds a stroke around an arbitrary cell view's SVG node.
@see https://docs.jointjs.com/api/highlighters/#mask
@group Components
@example
\`\`\`tsx
import { Highlighter } from '@joint/react'
return <Highlighter.Mask />
\`\`\``,methods:[],displayName:"Mask",props:{layer:{required:!1,tsType:{name:"string"},description:"The layer on which the mask will be rendered."},selector:{required:!1,tsType:{name:"string"},description:"A CSS selector string for targeting elements."},children:{required:!1,tsType:{name:"union",raw:"React.ReactNode | null | false",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"null"},{name:"literal",value:"false"}]},description:"Child elements to render inside the mask."},padding:{required:!1,tsType:{name:"number"},description:"The space between the stroke and the element"},isHidden:{required:!1,tsType:{name:"boolean"},description:"If the highlighter is disabled or not."}},composes:["PropsWithChildren"]};export{R as M};
