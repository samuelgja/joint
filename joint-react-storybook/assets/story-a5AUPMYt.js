/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{G as p,b as u,c as g,e as x,P as b}from"./create-njWDpS2D.js";import{r as d}from"./index-B0WjJBI_.js";import{P as E,a as v}from"./theme-BZH0jGzG.js";import{M as R}from"./measured-node-BZZgBNj5.js";import{m as w}from"./make-story-CJLFqcT8.js";const y=g([{id:"1",label:"Node 1",x:100,y:0},{id:"2",label:"Node 2",x:100,y:200}]),M=u([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:E}}}]);function N({width:s,height:t,label:i}){const n=d.useRef(null),h=d.useCallback(r=>{const a=n.current;if(!a)return;const o=a.getBoundingClientRect(),l=20,m=r.clientX-o.left,f=r.clientY-o.top;o.width-m<l&&o.height-f<l&&r.stopPropagation()},[]);return e.jsx("foreignObject",{width:s,height:t,overflow:"visible",children:e.jsx(R,{ref:n,children:e.jsx("div",{className:"resizable-node",onMouseDown:h,children:i})})})}function P(){const s=x(t=>t.map(({width:i,height:n})=>`${i} x ${n}`));return e.jsxs("div",{style:{display:"flex",flexDirection:"row",position:"relative"},children:[e.jsx(b,{width:"100%",className:v,height:280,renderElement:N}),e.jsxs("div",{children:[e.jsx("u",{children:"width & height"}),s.map((t,i)=>e.jsxs("div",{className:"text",style:{marginLeft:10},children:[i+1,". ",t]},`${i}-${t}`))]})]})}function c(){return e.jsx(p,{initialElements:y,initialLinks:M,children:e.jsx(P,{})})}c.__docgenInfo={description:"",methods:[],displayName:"App"};const j=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import {
  createElements,
  createLinks,
  GraphProvider,
  MeasuredNode,
  Paper,
  useElements,
  type InferElement,
} from '@joint/react';
import '../index.css';
import { useCallback, useRef } from 'react';
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';

const initialElements = createElements([
  { id: '1', label: 'Node 1', x: 100, y: 0 },
  { id: '2', label: 'Node 2', x: 100, y: 200 },
]);

const initialEdges = createLinks([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    attrs: {
      line: {
        stroke: PRIMARY,
      },
    },
  },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

function ResizableNode({ width, height, label }: Readonly<BaseElementWithData>) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    const node = nodeRef.current;
    if (!node) return;

    // Get the node’s bounding rectangle
    const rect = node.getBoundingClientRect();
    const threshold = 20; // pixels from the bottom-right corner considered as resize area

    // Calculate how far from the left/top the click was
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    // If the click is within the bottom-right "resize" zone,
    // stop propagation so that JointJS doesn't start dragging the node.
    if (rect.width - offsetX < threshold && rect.height - offsetY < threshold) {
      event.stopPropagation();
    }
  }, []);

  return (
    <foreignObject width={width} height={height} overflow="visible">
      <MeasuredNode ref={nodeRef}>
        <div
          className="resizable-node"
          onMouseDown={handleMouseDown} // prevent drag events from propagating
        >
          {label}
        </div>
      </MeasuredNode>
    </foreignObject>
  );
}

function Main() {
  const elementsSize = useElements((items) =>
    items.map(({ width, height }) => \`\${width} x \${height}\`)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={ResizableNode} />
      <div>
        <u>width & height</u>
        {elementsSize.map((size, index) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key
          <div className="text" key={\`\${index}-\${size}\`} style={{ marginLeft: 10 }}>
            {index + 1}. {size}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GraphProvider initialElements={initialElements} initialLinks={initialEdges}>
      <Main />
    </GraphProvider>
  );
}
`,k={title:"Examples/Resizable node",component:c,parameters:w({code:j})},z={},$=Object.freeze(Object.defineProperty({__proto__:null,Default:z,default:k},Symbol.toStringTag,{value:"Module"}));export{j as C,z as D,$ as S};
