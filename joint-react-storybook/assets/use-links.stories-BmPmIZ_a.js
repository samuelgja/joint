import{j as p}from"./index-DwP6fAIG.js";import{a as L,D as m}from"./with-simple-data-BKTSf5MX.js";import{u as d}from"./use-links-DCf9N2Cg.js";import{m as f,a as c}from"./make-story-CJLFqcT8.js";import{g}from"./get-api-documentation-link-BQfISuZK.js";import{H as y}from"./hook-tester-DyRf6bUC.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./create-njWDpS2D.js";import"./theme-BZH0jGzG.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";/* empty css              */const i=g("useLinks"),J={title:"Hooks/useLinks",component:y,decorators:[L],parameters:f({apiURL:i,description:"`useLinks` is a hook that returns the links of the current graph. It supports selector functions to get specific properties of the links and re-renders the component only when selected properties are changed.",code:`import { useLinks } from '@joint/react'

function Component() {
  const links = useLinks();
  return <div>links are: {JSON.stringify(links)}</div>;
}`})},e=c({args:{useHook:d,hookArgs:[],render:n=>p.jsx(m,{data:n,name:"All Links"})},apiURL:i,code:`import { useLinks } from '@joint/react'

function Component() {
  const links = useLinks();
  return <div>links are: {JSON.stringify(links)}</div>;
}`,description:"Get all links."}),s=c({args:{useHook:d,hookArgs:[n=>n.map(u=>u.id)],render:n=>p.jsx(m,{data:n,name:"Link IDs"})},apiURL:i,code:`import { useLinks } from '@joint/react'

function Component() {
  const linkIds = useLinks((links) => links.map(link => link.id));
  return <div>link ids are: {JSON.stringify(linkIds)}</div>;
}`,description:"Get all link IDs."});var r,t,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`makeStory<Story>({
  args: {
    useHook: useLinks,
    hookArgs: [],
    render: result => <DataRenderer data={result} name="All Links" />
  },
  apiURL: API_URL,
  code: \`import { useLinks } from '@joint/react'

function Component() {
  const links = useLinks();
  return <div>links are: {JSON.stringify(links)}</div>;
}\`,
  description: 'Get all links.'
})`,...(o=(t=e.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var a,k,l;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`makeStory<Story>({
  args: {
    useHook: useLinks,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hookArgs: [(links: any) => links.map((link: any) => link.id)],
    render: result => <DataRenderer data={result} name="Link IDs" />
  },
  apiURL: API_URL,
  code: \`import { useLinks } from '@joint/react'

function Component() {
  const linkIds = useLinks((links) => links.map(link => link.id));
  return <div>link ids are: {JSON.stringify(linkIds)}</div>;
}\`,
  description: 'Get all link IDs.'
})`,...(l=(k=s.parameters)==null?void 0:k.docs)==null?void 0:l.source}}};const N=["GetAllLinks","GetLinkIds"];export{e as GetAllLinks,s as GetLinkIds,N as __namedExportsOrder,J as default};
