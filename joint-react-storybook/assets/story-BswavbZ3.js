/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{r as m}from"./index-B0WjJBI_.js";import{G as f,b as x,c as u,P as E}from"./create-njWDpS2D.js";import{P as W,a as b}from"./theme-BZH0jGzG.js";import{M as w}from"./measured-node-BZZgBNj5.js";import{m as j}from"./make-story-CJLFqcT8.js";const y=u([{id:"1",label:"Node 1",x:100,y:0},{id:"2",label:"Node 2 with longer text",x:250,y:150}]),P=x([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:W}}}]);function S({children:i,width:t,height:a}){const r=a-20,s=`https://placehold.co/50x${r}`,d=t-2*10-50-10,l=a-2*10,h=({element:p,size:o})=>{const c=70+o.width+10,g=10+Math.max(o.height,50)+10;p.size(c,g)};return e.jsxs(e.Fragment,{children:[e.jsx("rect",{width:t,height:a,fill:"#333",stroke:"#eee",strokeWidth:"2"}),e.jsx("image",{href:s,x:10,y:10,width:50,height:r}),e.jsx("foreignObject",{x:70,y:10,width:d,height:l,children:e.jsx(w,{setSize:h,children:e.jsx("div",{style:{position:"absolute",color:"#eee",maxWidth:"100px",overflow:"hidden",overflowWrap:"break-word"},children:i})})})]})}function k(){const i=m.useCallback(t=>e.jsx(S,{...t,children:t.label}),[]);return e.jsx(E,{width:"100%",className:b,height:280,renderElement:i})}function n(){return e.jsx(f,{initialElements:y,initialLinks:P,children:e.jsx(k,{})})}n.__docgenInfo={description:"",methods:[],displayName:"App"};const C=`/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import '../index.css';
import { useCallback, type PropsWithChildren } from 'react';
import {
  createElements,
  createLinks,
  GraphProvider,
  MeasuredNode,
  Paper,
  type InferElement,
  type OnSetSize,
  type RenderElement,
} from '@joint/react';
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';

const initialElements = createElements([
  { id: '1', label: 'Node 1', x: 100, y: 0 },
  { id: '2', label: 'Node 2 with longer text', x: 250, y: 150 },
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

function Card({ children, width, height }: PropsWithChildren<BaseElementWithData>) {
  const gap = 10;
  const imageWidth = 50;
  const imageHeight = height - 2 * gap;
  const iconURL = \`https://placehold.co/\${imageWidth}x\${imageHeight}\`;
  const foWidth = width - 2 * gap - imageWidth - gap;
  const foHeight = height - 2 * gap;

  const setCardSize: OnSetSize = ({ element, size }) => {
    const w = gap + imageWidth + gap + size.width + gap;
    const h = gap + Math.max(size.height, imageWidth) + gap;
    element.size(w, h);
  };

  return (
    <>
      <rect width={width} height={height} fill="#333" stroke="#eee" strokeWidth="2"></rect>
      <image href={iconURL} x={gap} y={gap} width={imageWidth} height={imageHeight} />
      <foreignObject x={gap + imageWidth + gap} y={gap} width={foWidth} height={foHeight}>
        <MeasuredNode setSize={setCardSize}>
          <div
            style={{
              position: 'absolute',
              color: '#eee',
              maxWidth: '100px',
              overflow: 'hidden',
              overflowWrap: 'break-word',
            }}
          >
            {children}
          </div>
        </MeasuredNode>
      </foreignObject>
    </>
  );
}
function Main() {
  const renderElement: RenderElement<BaseElementWithData> = useCallback((element) => {
    return <Card {...element}>{element.label}</Card>;
  }, []);
  return (
    <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={renderElement} />
  );
}

export default function App() {
  return (
    <GraphProvider initialElements={initialElements} initialLinks={initialEdges}>
      <Main />
    </GraphProvider>
  );
}
`,M={title:"Examples/Card",component:n,parameters:j({code:C})},R={},I=Object.freeze(Object.defineProperty({__proto__:null,Default:R,default:M},Symbol.toStringTag,{value:"Module"}));export{C,R as D,I as S};
