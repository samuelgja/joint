/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{G as a,j as l,P as d,c}from"./create-njWDpS2D.js";import{r as p}from"./index-B0WjJBI_.js";import{a as m,P as h}from"./theme-BZH0jGzG.js";import{M as f}from"./measured-node-BZZgBNj5.js";import{m as u}from"./make-story-CJLFqcT8.js";c([{id:"1",label:"hello",color:h,x:100,y:10,width:100,height:50}]);function E(t){const{width:o,height:n,label:i,color:s}=t;return e.jsx("foreignObject",{width:o,height:n,children:e.jsx(f,{children:e.jsxs("div",{className:"flex flex-col items-center rounded-sm",style:{background:s},children:["Example",e.jsx("div",{children:i})]})})})}function x(){const t=l();return p.useEffect(()=>{t.fromJSON({cells:[{id:1,type:"standard.Rectangle",position:{x:100,y:100},size:{width:100,height:100}}]})},[t]),e.jsx(d,{width:"100%",className:m,height:280,renderElement:E})}function r(){return e.jsx(a,{children:e.jsx(x,{})})}r.__docgenInfo={description:"",methods:[],displayName:"App"};const g=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import '../index.css';

import {
  createElements,
  GraphProvider,
  MeasuredNode,
  Paper,
  useGraph,
  type InferElement,
  type RenderElement,
} from '@joint/react';
import { useEffect } from 'react';
import { PAPER_CLASSNAME, PRIMARY } from 'storybook-config/theme';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialElements = createElements([
  { id: '1', label: 'hello', color: PRIMARY, x: 100, y: 10, width: 100, height: 50 },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

function RenderElement(props: Readonly<BaseElementWithData>) {
  const { width, height, label, color } = props;
  return (
    <foreignObject width={width} height={height}>
      <MeasuredNode>
        <div className="flex flex-col items-center rounded-sm" style={{ background: color }}>
          Example
          <div>{label}</div>
        </div>
      </MeasuredNode>
    </foreignObject>
  );
}
function Main() {
  const graph = useGraph();
  useEffect(() => {
    graph.fromJSON({
      cells: [
        {
          id: 1,
          type: 'standard.Rectangle',
          position: {
            x: 100,
            y: 100,
          },
          size: {
            width: 100,
            height: 100,
          },
        },
      ],
    });
  }, [graph]);
  return (
    <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={RenderElement} />
  );
}

export default function App() {
  return (
    <GraphProvider>
      <Main />
    </GraphProvider>
  );
}
`,y={title:"Examples/Json",component:r,parameters:u({code:g})},P={},S=Object.freeze(Object.defineProperty({__proto__:null,Default:P,default:y},Symbol.toStringTag,{value:"Module"}));export{g as C,P as D,S};
