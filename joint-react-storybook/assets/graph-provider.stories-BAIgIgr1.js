import{j as e}from"./index-DwP6fAIG.js";import{G as I,c as g,a as b,R as M,b as z,P as H}from"./create-njWDpS2D.js";import{P as i,B as Y,a as X}from"./theme-BZH0jGzG.js";import{m as B,a as o}from"./make-story-CJLFqcT8.js";import{g as O}from"./get-api-documentation-link-BQfISuZK.js";import{H as D}from"./with-simple-data-BKTSf5MX.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./measured-node-BZZgBNj5.js";import"./use-children-ref-gx-xwHed.js";const a=O("GraphProvider"),se={title:"Components/GraphProvider",component:I,parameters:B({description:`
GraphProvider is a component that provides a graph context to its children. It is used to manage and render graph elements.
    `,apiURL:a,code:`import { GraphProvider } from '@joint/react'
<GraphProvider>
  <Paper renderElement={({width, height}) => <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />} />
</GraphProvider>
    `})},_={padding:10,backgroundColor:i,borderRadius:10,width:80},u=g([{id:1,width:100,height:50,x:20,y:200,color:i},{id:2,width:100,height:50,x:200,y:200,color:i}]),V=g([{id:1,x:20,y:200,color:i},{id:2,x:200,y:200,color:i}]),T=z([{id:"1-1",source:2,target:1,attrs:{line:{stroke:i}}}]);function F({color:r,width:n,height:t}){return e.jsx("rect",{rx:10,ry:10,className:"node",width:n,height:t,fill:r})}function l(r){const{renderElement:n=F}=r;return e.jsx(H,{className:X,renderElement:n,width:"100%"})}const s=o({args:{initialElements:u,children:e.jsx(l,{})},apiURL:a,description:"Default graph provider with rectangle children."}),d=o({args:{initialElements:u,children:e.jsx(l,{}),graph:new b({},{cellNamespace:{ReactElement:M}})},apiURL:a,description:"Graph provider with external graph.",code:`import { GraphProvider } from '@joint/react'
import { dia } from '@joint/core';
import { Paper } from '../paper/paper';
import { ReactElement } from '@joint/react/src/core/react-element';
const graph = new dia.Graph({}, { cellNamespace: { ReactElement } });
<GraphProvider graph={graph}>
  <Paper renderElement={({width, height}) => <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />} />
</GraphProvider>
  `}),p=o({args:{initialLinks:T,initialElements:u,children:e.jsx(l,{})},apiURL:a,description:"Graph provider with links."}),h=o({args:{initialLinks:T,initialElements:V,children:e.jsx(l,{renderElement:()=>e.jsx(D,{style:_,children:"Hello world!"})})},apiURL:a,description:"Graph provider without size defined in elements."}),f=new b({},{cellNamespace:{ReactElement:M}});function $(r){return g(Array.from({length:r},(n,t)=>({id:`node-${t}`,width:100,height:50,x:Math.random()*500,y:Math.random()*500,color:"magenta"})))}const m=o({args:{graph:f,initialElements:$(20),children:e.jsxs(e.Fragment,{children:[e.jsx("button",{className:Y,onClick:()=>{const r=f.getCells(),n=500;let t=0,E=0,c=0;for(const[q,w]of r.entries())c+100>n&&(t=0,E+=85,c=0),w.isElement()&&(w.position(t,E),t+=100,c+=100)},children:"Make layout"}),e.jsx(l,{renderElement:()=>e.jsx(D,{style:_,children:"Hello world!"})})]})},apiURL:a,description:"Graph provider with external graph and layout.",code:`import { GraphProvider } from '@joint/react'
import { dia } from '@joint/core';
import { Paper } from '../paper/paper';
import { ReactElement } from '@joint/react/src/core/react-element';
import { DirectedGraph } from '@joint/layout-directed-graph';
const graph = new dia.Graph({}, { cellNamespace: { ReactElement } });
const elements = generateRandomElements(20);
<GraphProvider graph={graph} initialElements={elements}>
  <button
    onClick={() => {
      DirectedGraph.layout(graph, {
        setLinkVertices: true,
        marginX: 2,
        marginY: 2,
        align: 'DR',
      });
    }
  >
    Make layout
  </button>
  <Paper renderElement={({ width, height }) => <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />} />
</GraphProvider>
  `});var P,G,y;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`makeStory<Story>({
  args: {
    initialElements: initialElementsWithSize,
    children: <PaperChildren />
  },
  apiURL: API_URL,
  description: 'Default graph provider with rectangle children.'
})`,...(y=(G=s.parameters)==null?void 0:G.docs)==null?void 0:y.source}}};var R,L,x;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`makeStory<Story>({
  args: {
    initialElements: initialElementsWithSize,
    children: <PaperChildren />,
    graph: new dia.Graph({}, {
      cellNamespace: {
        ReactElement
      }
    })
  },
  apiURL: API_URL,
  description: 'Graph provider with external graph.',
  code: \`import { GraphProvider } from '@joint/react'
import { dia } from '@joint/core';
import { Paper } from '../paper/paper';
import { ReactElement } from '@joint/react/src/core/react-element';
const graph = new dia.Graph({}, { cellNamespace: { ReactElement } });
<GraphProvider graph={graph}>
  <Paper renderElement={({width, height}) => <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />} />
</GraphProvider>
  \`
})`,...(x=(L=d.parameters)==null?void 0:L.docs)==null?void 0:x.source}}};var S,v,W;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`makeStory<Story>({
  args: {
    initialLinks,
    initialElements: initialElementsWithSize,
    children: <PaperChildren />
  },
  apiURL: API_URL,
  description: 'Graph provider with links.'
})`,...(W=(v=p.parameters)==null?void 0:v.docs)==null?void 0:W.source}}};var j,k,U;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`makeStory<Story>({
  args: {
    initialLinks,
    initialElements: initialElementsWithoutSize,
    children: <PaperChildren renderElement={() => <HTMLNode style={STYLE}>Hello world!</HTMLNode>} />
  },
  apiURL: API_URL,
  description: 'Graph provider without size defined in elements.'
})`,...(U=(k=h.parameters)==null?void 0:k.docs)==null?void 0:U.source}}};var N,A,C;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`makeStory<Story>({
  args: {
    graph,
    initialElements: generateRandomElements(20),
    children: <>
        <button className={BUTTON_CLASSNAME} onClick={() => {
        const elements = graph.getCells(); // Get all elements in the graph
        const rowWidth = 500; // Define the maximum width of each row
        let currentX = 0;
        let currentY = 0;
        let rowWidthUsed = 0;
        for (const [_, element] of elements.entries()) {
          const elementWidth = 100; // Set width for the element (you can use element.getBBox().width if dynamic)
          if (rowWidthUsed + elementWidth > rowWidth) {
            // Move to the next row
            currentX = 0;
            currentY += 85; // Add some vertical space between rows
            rowWidthUsed = 0;
          }
          if (!element.isElement()) {
            continue;
          }

          // Set the new position for the element
          element.position(currentX, currentY);

          // Update the current X and row width used
          currentX += elementWidth;
          rowWidthUsed += elementWidth;
        }
      }}>
          Make layout
        </button>
        <PaperChildren renderElement={() => <HTMLNode style={STYLE}>Hello world!</HTMLNode>} />
      </>
  },
  apiURL: API_URL,
  description: 'Graph provider with external graph and layout.',
  code: \`import { GraphProvider } from '@joint/react'
import { dia } from '@joint/core';
import { Paper } from '../paper/paper';
import { ReactElement } from '@joint/react/src/core/react-element';
import { DirectedGraph } from '@joint/layout-directed-graph';
const graph = new dia.Graph({}, { cellNamespace: { ReactElement } });
const elements = generateRandomElements(20);
<GraphProvider graph={graph} initialElements={elements}>
  <button
    onClick={() => {
      DirectedGraph.layout(graph, {
        setLinkVertices: true,
        marginX: 2,
        marginY: 2,
        align: 'DR',
      });
    }
  >
    Make layout
  </button>
  <Paper renderElement={({ width, height }) => <rect rx={10} ry={10} width={width} height={height} fill={"blue"} />} />
</GraphProvider>
  \`
})`,...(C=(A=m.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};const de=["Default","WithExternalGraph","WithLink","WithoutSizeDefinedInElements","WithExternalGraphAndLayout"];export{s as Default,d as WithExternalGraph,m as WithExternalGraphAndLayout,p as WithLink,h as WithoutSizeDefinedInElements,de as __namedExportsOrder,se as default};
