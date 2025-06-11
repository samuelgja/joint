/* empty css              */import{j as e}from"./index-DwP6fAIG.js";import{L as l,a as d,P as c,T as m}from"./theme-BZH0jGzG.js";import{G as p,b as h,c as x,P as f}from"./create-njWDpS2D.js";import{r as u}from"./index-B0WjJBI_.js";import{M as E}from"./measured-node-BZZgBNj5.js";import{m as g}from"./make-story-CJLFqcT8.js";const R=h([{id:"e1-2",source:"1",target:"2",attrs:{line:{stroke:l}}}]),y=x([{id:"1",label:"Node 1",x:100,y:0},{id:"2",label:"Node 2",x:100,y:200}]);function b({width:t,height:i,label:r}){return e.jsxs(e.Fragment,{children:[e.jsx("rect",{rx:5,ry:5,width:t,height:i,fill:c}),e.jsx(E,{setSize:({element:o,size:{width:s,height:a}})=>{o.size(s+20,a+20)},children:e.jsx("text",{x:t/2,y:i/2,textAnchor:"middle",dominantBaseline:"middle",fill:m,fontSize:14,fontWeight:"bold",children:r})})]})}function M(){const t=u.useCallback(i=>e.jsx(b,{...i}),[]);return e.jsxs("div",{style:{display:"flex",flexDirection:"row",position:"relative"},children:[e.jsx(f,{width:"100%",className:d,height:280,renderElement:t}),e.jsx("div",{style:{position:"absolute",top:0,right:0}})]})}function n(){return e.jsx(p,{initialElements:y,initialLinks:R,children:e.jsx(M,{})})}n.__docgenInfo={description:"",methods:[],displayName:"App"};const P=`/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { LIGHT, PAPER_CLASSNAME, PRIMARY, TEXT } from 'storybook-config/theme';
import '../index.css';
import {
  createElements,
  createLinks,
  GraphProvider,
  MeasuredNode,
  Paper,
  type InferElement,
  type RenderElement,
} from '@joint/react';
import { useCallback } from 'react';

const initialEdges = createLinks([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    attrs: {
      line: {
        stroke: LIGHT,
      },
    },
  },
]);

const initialElements = createElements([
  { id: '1', label: 'Node 1', x: 100, y: 0 },
  { id: '2', label: 'Node 2', x: 100, y: 200 },
]);

type BaseElementWithData = InferElement<typeof initialElements>;

function RenderedRect({ width, height, label }: BaseElementWithData) {
  const textMargin = 20;
  const cornerRadius = 5;
  return (
    <>
      <rect rx={cornerRadius} ry={cornerRadius} width={width} height={height} fill={PRIMARY} />
      <MeasuredNode
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop, no-shadow, @typescript-eslint/no-shadow
        setSize={({ element, size: { width, height } }) => {
          element.size(width + textMargin, height + textMargin);
        }}
      >
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={TEXT}
          fontSize={14}
          fontWeight="bold"
        >
          {label}
        </text>
      </MeasuredNode>
    </>
  );
}

function Main() {
  const renderElement: RenderElement<BaseElementWithData> = useCallback(
    (props) => <RenderedRect {...props} />,
    []
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <Paper width="100%" className={PAPER_CLASSNAME} height={280} renderElement={renderElement} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      ></div>
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
`,j={title:"Examples/SVG node",component:n,parameters:g({code:P})},A={},I=Object.freeze(Object.defineProperty({__proto__:null,Default:A,default:j},Symbol.toStringTag,{value:"Module"}));export{P as C,A as D,I as S};
