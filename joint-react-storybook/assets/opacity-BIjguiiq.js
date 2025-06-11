import{j as m}from"./index-DwP6fAIG.js";import{r as e}from"./index-B0WjJBI_.js";import{C as l}from"./custom-CNnXkfQ2.js";import{o as u}from"./create-njWDpS2D.js";function g(r,i){const{children:n,alphaValue:t=1,isHidden:a}=r,s=e.useMemo(()=>({alphaValue:t}),[t]),p=e.useCallback((o,c,d,h)=>u.add(o,c,d,h),[]);return m.jsx(l,{options:s,ref:i,onCreateHighlighter:p,isHidden:a,children:n})}const f=e.forwardRef(g);f.__docgenInfo={description:`Opacity highlighter component.
Changes the opacity of an arbitrary cell view's SVG node.
@see https://docs.jointjs.com/api/highlighters/#opacity
@group Components
@example
\`\`\`tsx
import { Highlighter } from '@joint/react'
return <Highlighter.Opacity />
\`\`\``,methods:[],displayName:"Opacity",props:{alphaValue:{required:!0,tsType:{name:"number"},description:`Opacity value between 0-1
@default 1`},isHidden:{required:!1,tsType:{name:"boolean"},description:"If the highlighter is disabled or not."}},composes:["PropsWithChildren"]};export{f as O};
