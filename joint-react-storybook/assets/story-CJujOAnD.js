import{j as e}from"./index-DwP6fAIG.js";import{L as f,a as g}from"./theme-BZH0jGzG.js";import{G as T,b as j,c as S,T as C,P as b,L as P,O as I,d as w,j as M,y as R,e as A}from"./create-njWDpS2D.js";import{r as p}from"./index-B0WjJBI_.js";import{b as u}from"./with-simple-data-BKTSf5MX.js";import{u as L}from"./use-update-element-CJV1FtPj.js";import{u as O}from"./use-links-DCf9N2Cg.js";import{H as y}from"./index-4CDyDOw8.js";import{a as x}from"./index-C8NnexJa.js";import{M as _}from"./measured-node-BZZgBNj5.js";import{a as V}from"./helpers-BazfYDoP.js";import{R as H}from"./Button-B36ztity.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./mask-DJTgPChi.js";import"./custom-CNnXkfQ2.js";import"./use-children-ref-gx-xwHed.js";import"./opacity-BIjguiiq.js";import"./stroke-CxK-R5f1.js";const h="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm flex items-center",v={defaultRouter:{name:"rightAngle",args:{margin:25}},defaultConnector:{name:"straight",args:{cornerType:"line",cornerPreserveAspectRatio:!0}},snapLinks:{radius:25},validateMagnet:(l,n)=>n.getAttribute("magnet")!=="passive",sorting:I.sorting.APPROX,linkPinning:!1,onLinkMouseEnter:({linkView:l})=>l.addTools(J),onLinkMouseLeave:({linkView:l})=>l.removeTools()},G=S([{id:"1",x:50,y:110,elementType:"alert",title:"This is error element",description:"This is longer text, it can be any message provided by the user",inputText:"Node Text"},{id:"2",x:550,y:110,elementType:"info",title:"This is info element",description:"This is longer text, it can be any message provided by the user",inputText:""},{id:"3",x:50,y:370,elementType:"table",columnNames:["Column 1","Column 2","Column 3"],rows:[["Row 1","Row 2","Row 3"],["Row 4","Row 5","Row 6"],["Row 7","Row 8","Row 9"]],inputText:"",width:400,height:200,attrs:{root:{magnet:!1}}}]),N=j([{id:"link2",source:{id:"3",port:"out-3-0"},target:{id:"1"},attrs:{line:{stroke:f,class:"link",strokeWidth:2,strokeDasharray:"5,5",targetMarker:{d:"M 0 0 L 8 4 L 8 -4 Z"}}}}]);function D({elementType:l,title:n,description:i,inputText:t,width:d,height:m,isSelected:a}){let s,r;switch(l){case"alert":{s=e.jsx("i",{className:"fa-solid fa-triangle-exclamation text-rose-500 text-3xl mt-2"}),r=e.jsx("span",{className:"text-rose-500 font-bold",children:n});break}default:{s=e.jsx("i",{className:"fa-solid fa-circle-info text-3xl mt-2"}),r=e.jsx("span",{className:"font-bold",children:n});break}}const o=w(),c=L(o,"inputText");return e.jsx(y.Stroke,{padding:10,rx:5,ry:5,strokeWidth:3,stroke:f,isHidden:!a,children:e.jsx("foreignObject",{width:d,height:m,overflow:"visible",children:e.jsx(_,{children:e.jsx("div",{className:"flex flex-row border-1 border-solid border-white/20 text-white rounded-lg p-4 min-w-[250px] min-h-[100px] bg-gray-900 shadow-sm",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex flex-row gap-2 items-start",children:[e.jsx("div",{className:"text-2xl",children:s}),e.jsxs("div",{className:"text-lg ml-2",children:[r,e.jsx("div",{className:"text-sm mt-1",children:i})]})]}),e.jsx("div",{className:"border-1 border-dashed border-rose-white mt-2 opacity-10"}),e.jsx("input",{type:"text",value:t,className:"w-full border-1 border-solid border-rose-white rounded-lg p-2 mt-3",placeholder:"Type here...",onChange:({target:{value:E}})=>{c(E)}})]})})})})})}const B=45,W=65;function $({columnNames:l,rows:n,width:i,height:t,isSelected:d}){const m=w();return e.jsxs(e.Fragment,{children:[e.jsx(y.Stroke,{padding:25,rx:5,ry:5,strokeWidth:3,stroke:f,isHidden:!d,children:e.jsx("foreignObject",{width:i,height:t,overflow:"visible",children:e.jsx("div",{style:{width:i,height:t},className:"flex flex-col border-1 border-solid border-white/20 text-white rounded-lg p-4 w-full h-full bg-gray-900 shadow-sm",children:e.jsxs("table",{className:"w-full",children:[e.jsx("thead",{children:e.jsx("tr",{children:l.map(a=>e.jsx("th",{className:"text-left p-2",children:a},a))})}),e.jsx("tbody",{children:n.map((a,s)=>e.jsx("tr",{children:a.map((r,o)=>e.jsx("td",{className:"p-2 border-t border-white/20 border-dashed",children:r},o))},s))})]})})})}),e.jsx(x.Group,{position:"right",id:"out",dx:-10,children:n.map((a,s)=>e.jsx(x.Item,{id:`out-${m}-${s}`,y:s*B+W,children:e.jsx("foreignObject",{width:20,height:20,overflow:"visible",children:e.jsx("div",{className:"flex flex-col items-center justify-center bg-white rounded-full w-5 h-5",children:e.jsx("i",{className:"fa-solid fa-arrow-right text-black text-sm"})})})},s))})]})}function U(){const l=p.useCallback(({width:i,height:t})=>e.jsx("rect",{width:i,height:t,fill:"white",rx:10,ry:10}),[]),n=p.useCallback(({paper:i})=>{const{model:t}=i;i.transformToFitContent({contentArea:t.getCellsBBox(t.getElements())??void 0,verticalAlign:"middle",horizontalAlign:"middle",padding:20})},[]);return e.jsx("div",{className:"absolute bg-black bottom-6 right-6 w-[200px] h-[150px] border border-[#dde6ed] rounded-lg overflow-hidden",children:e.jsx(b,{...v,interactive:!1,width:"100%",className:g,height:"100%",renderElement:l,onElementsSizeReady:n,onRenderDone:n})})}const z=new H({scale:1.5,style:{stroke:"#999"}}),J=new V({tools:[z]});function F(l){const{onToggleMinimap:n,isMinimapVisible:i,selectedId:t,setSelectedId:d,setShowElementsInfo:m,showElementsInfo:a}=l,s=M(),r=R();return e.jsxs("div",{className:"flex flex-row absolute top-2 left-2 z-10 bg-gray-900  rounded-lg p-2 shadow-md gap-2",children:[e.jsxs("button",{type:"button",className:h,onClick:()=>{n(!i)},children:[i?e.jsx("i",{className:"fa-solid fa-eye"}):e.jsx("i",{className:"fa-solid fa-eye-slash"}),e.jsx("span",{className:"ml-2",children:"Toggle Minimap"})]}),e.jsxs("button",{type:"button",className:`${h} ${t?"":"opacity-20 cursor-not-allowed"}`,disabled:!t,onClick:()=>{if(!t)return;const o=s.getCell(t);if(!o||!o.isElement())return;const c=o.clone();c.translate(20,20),s.addCell(c),d(c.id)},children:[e.jsx("i",{className:"fa-solid fa-clone"}),e.jsx("span",{className:"ml-2",children:"Duplicate"})]}),e.jsxs("button",{type:"button",className:`${h} ${t?"":"opacity-20 cursor-not-allowed"}`,disabled:!t,onClick:()=>{if(!t)return;const o=s.getCell(t);o&&o.isElement()&&(o.remove(),d(null))},children:[e.jsx("i",{className:"fa-solid fa-trash"}),e.jsx("span",{className:"ml-2",children:"Remove selected element"})]}),e.jsxs("button",{type:"button",className:h,onClick:()=>{r.transformToFitContent({verticalAlign:"middle",horizontalAlign:"middle",padding:20})},children:[e.jsx("i",{className:"fa-solid fa-undo"}),e.jsx("span",{className:"ml-2",children:"Zoom to fit"})]}),e.jsxs("button",{type:"button",className:h,onClick:()=>{m(!a)},children:[a?e.jsx("i",{className:"fa-solid fa-eye-slash"}):e.jsx("i",{className:"fa-solid fa-eye"}),e.jsx("span",{className:"ml-2",children:"Toggle info"})]})]})}function Z(){const l=A(),n=O();return e.jsxs("div",{className:"flex flex-col gap-2 mt-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"text-white text-sm",children:"Elements"}),e.jsx(u,{data:JSON.stringify(l,null,2)})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"text-white text-sm",children:"Links"}),e.jsx(u,{data:JSON.stringify(n,null,2)})]})]})}function X(){const[l,n]=p.useState(!1),[i,t]=p.useState(null),[d,m]=p.useState(!1),a=p.useCallback(s=>{const{elementType:r,id:o}=s,c=o===i;switch(r){case"alert":case"info":return e.jsx(D,{...s,isSelected:c});case"table":return e.jsx($,{...s,isSelected:c})}},[i]);return e.jsxs("div",{className:"flex flex-col relative",children:[e.jsxs("div",{className:"flex flex-col relative",children:[e.jsxs(C,{children:[e.jsx(F,{onToggleMinimap:n,isMinimapVisible:l,selectedId:i,setSelectedId:t,showElementsInfo:d,setShowElementsInfo:m}),e.jsx(b,{...v,defaultLink:new P(N[0]),renderElement:a,className:g,onCellPointerClick:({cellView:s})=>{const r=s.model;t(r.id??null)},onLinkPointerClick:()=>{t(null)},onBlankPointerClick:()=>{t(null)},width:"100%"})]}),l&&e.jsx(U,{})]}),d&&e.jsx(Z,{})]})}function k(){return e.jsx(T,{initialElements:G,initialLinks:N,children:e.jsx(X,{})})}k.__docgenInfo={description:"",methods:[],displayName:"App"};const q=`/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-shadow */
/* eslint-disable @eslint-react/no-array-index-key */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { dia, linkTools, shapes } from '@joint/core';
import { PAPER_CLASSNAME, LIGHT } from 'storybook-config/theme';
import './index.css';
import {
  createElements,
  createLinks,
  GraphProvider,
  Highlighter,
  MeasuredNode,
  Paper,
  Port,
  useCellId,
  useElements,
  useGraph,
  useLinks,
  usePaper,
  useUpdateElement,
  type GraphElement,
  type PaperProps,
  type RenderElement,
} from '@joint/react';
import { useCallback, useState } from 'react';
import { ShowJson } from 'storybook-config/decorators/with-simple-data';
import { PaperProvider } from '../../../components/paper-provider/paper-provider';

// Define types for the elements
interface ElementBase extends GraphElement {
  readonly elementType: 'alert' | 'info' | 'table';
}

interface MessageElement extends ElementBase {
  readonly elementType: 'alert' | 'info';
  readonly title: string;
  readonly description: string;
  readonly inputText: string;
}

interface TableElement extends ElementBase {
  readonly elementType: 'table';
  readonly columnNames: string[];
  readonly rows: string[][];
}

type Element = MessageElement | TableElement;

type ElementWithSelected<T> = { readonly isSelected: boolean } & T;

const BUTTON_CLASSNAME =
  'bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm flex items-center';

// Define static properties for the paper - used by minimap and main paper
const PAPER_PROPS: PaperProps<Element> = {
  defaultRouter: {
    name: 'rightAngle',
    args: {
      margin: 25,
    },
  },
  defaultConnector: {
    name: 'straight',
    args: { cornerType: 'line', cornerPreserveAspectRatio: true },
  },
  snapLinks: { radius: 25 },
  validateMagnet: (_cellView, magnet) => {
    return magnet.getAttribute('magnet') !== 'passive';
  },
  sorting: dia.Paper.sorting.APPROX,
  linkPinning: false,
  onLinkMouseEnter: ({ linkView }) => linkView.addTools(toolsView),
  onLinkMouseLeave: ({ linkView }) => linkView.removeTools(),
};

// Create initial elements and links with typing support
const elements = createElements<Element>([
  {
    id: '1',
    x: 50,
    y: 110,
    elementType: 'alert',
    title: 'This is error element',
    description: 'This is longer text, it can be any message provided by the user',
    inputText: 'Node Text',
  },
  {
    id: '2',
    x: 550,
    y: 110,
    elementType: 'info',
    title: 'This is info element',
    description: 'This is longer text, it can be any message provided by the user',
    inputText: '',
  },
  {
    id: '3',
    x: 50,
    y: 370,
    elementType: 'table',
    columnNames: ['Column 1', 'Column 2', 'Column 3'],
    rows: [
      ['Row 1', 'Row 2', 'Row 3'],
      ['Row 4', 'Row 5', 'Row 6'],
      ['Row 7', 'Row 8', 'Row 9'],
    ],
    inputText: '',
    width: 400,
    height: 200,
    attrs: {
      root: {
        magnet: false,
      },
    },
  },
]);

// Create initial links from table element port to another element
const links = createLinks([
  {
    id: 'link2',
    source: { id: '3', port: 'out-3-0' }, // Port from table element
    target: { id: '1' },
    attrs: {
      line: {
        stroke: LIGHT,
        class: 'link',
        strokeWidth: 2,
        strokeDasharray: '5,5',
        targetMarker: {
          d: \`M 0 0 L 8 4 L 8 -4 Z\`, // Larger arrowhead
        },
      },
    },
  },
]);

// Define the message component
function MessageComponent({
  elementType,
  title,
  description,
  inputText,
  width,
  height,
  isSelected,
}: ElementWithSelected<MessageElement>) {
  let iconContent;
  let titleText;
  switch (elementType) {
    case 'alert': {
      iconContent = (
        <i className="fa-solid fa-triangle-exclamation text-rose-500 text-3xl mt-2"></i>
      );
      titleText = <span className="text-rose-500 font-bold">{title}</span>;
      break;
    }
    default: {
      iconContent = <i className="fa-solid fa-circle-info text-3xl mt-2"></i>;
      titleText = <span className="font-bold">{title}</span>;
      break;
    }
  }
  const id = useCellId();
  const setMessage = useUpdateElement<MessageElement>(id, 'inputText');
  return (
    <Highlighter.Stroke
      padding={10}
      rx={5}
      ry={5}
      strokeWidth={3}
      stroke={LIGHT}
      isHidden={!isSelected}
    >
      <foreignObject width={width} height={height} overflow="visible">
        <MeasuredNode>
          <div className="flex flex-row border-1 border-solid border-white/20 text-white rounded-lg p-4 min-w-[250px] min-h-[100px] bg-gray-900 shadow-sm">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-start">
                <div className="text-2xl">{iconContent}</div>
                <div className="text-lg ml-2">
                  {titleText}
                  <div className="text-sm mt-1">{description}</div>
                </div>
              </div>
              {/* Divider */}
              <div className="border-1 border-dashed border-rose-white mt-2 opacity-10" />
              <input
                type="text"
                value={inputText}
                className="w-full border-1 border-solid border-rose-white rounded-lg p-2 mt-3"
                placeholder="Type here..."
                onChange={({ target: { value } }) => {
                  setMessage(value);
                }}
              />
            </div>
          </div>
        </MeasuredNode>
      </foreignObject>
    </Highlighter.Stroke>
  );
}

const ROW_HEIGHT = 45;
const ROW_START = 65;
// Define the table element
function TableElement({
  columnNames,
  rows,
  width,
  height,
  isSelected,
}: ElementWithSelected<TableElement>) {
  const cellId = useCellId();
  return (
    <>
      <Highlighter.Stroke
        padding={25}
        rx={5}
        ry={5}
        strokeWidth={3}
        stroke={LIGHT}
        isHidden={!isSelected}
      >
        <foreignObject width={width} height={height} overflow="visible">
          <div
            style={{ width, height }}
            className="flex flex-col border-1 border-solid border-white/20 text-white rounded-lg p-4 w-full h-full bg-gray-900 shadow-sm"
          >
            <table className="w-full">
              <thead>
                <tr>
                  {columnNames.map((name) => (
                    <th key={name} className="text-left p-2">
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="p-2 border-t border-white/20 border-dashed">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </foreignObject>
      </Highlighter.Stroke>
      <Port.Group position="right" id="out" dx={-10}>
        {rows.map((_, index) => (
          <Port.Item key={index} id={\`out-\${cellId}-\${index}\`} y={index * ROW_HEIGHT + ROW_START}>
            <foreignObject width={20} height={20} overflow="visible">
              <div className="flex flex-col items-center justify-center bg-white rounded-full w-5 h-5">
                <i className="fa-solid fa-arrow-right text-black text-sm"></i>
              </div>
            </foreignObject>
          </Port.Item>
        ))}
      </Port.Group>
    </>
  );
}

// Minimap component
function MiniMap() {
  const renderElement: RenderElement<Element> = useCallback(
    ({ width, height }) => <rect width={width} height={height} fill={'white'} rx={10} ry={10} />,
    []
  );
  // On change, the minimap will be resized to fit the content automatically
  const onElementReady = useCallback(({ paper }: { paper: dia.Paper }) => {
    const { model: graph } = paper;
    paper.transformToFitContent({
      contentArea: graph.getCellsBBox(graph.getElements()) ?? undefined,
      verticalAlign: 'middle',
      horizontalAlign: 'middle',
      padding: 20,
    });
  }, []);

  return (
    <div className="absolute bg-black bottom-6 right-6 w-[200px] h-[150px] border border-[#dde6ed] rounded-lg overflow-hidden">
      <Paper
        {...PAPER_PROPS}
        interactive={false}
        width={'100%'}
        className={PAPER_CLASSNAME}
        height={'100%'}
        renderElement={renderElement}
        onElementsSizeReady={onElementReady}
        onRenderDone={onElementReady}
      />
    </div>
  );
}

// Define the remove tool for the link
const removeTool = new linkTools.Remove({
  scale: 1.5,
  style: { stroke: '#999' },
});

// Define the tools view for the link - so we can remove the link when hovered
const toolsView = new dia.ToolsView({
  tools: [removeTool],
});

interface ToolbarProps {
  readonly onToggleMinimap: (visible: boolean) => void;
  readonly isMinimapVisible: boolean;
  readonly selectedId: dia.Cell.ID | null;
  readonly setSelectedId: (id: dia.Cell.ID | null) => void;
  readonly showElementsInfo: boolean;
  readonly setShowElementsInfo: (show: boolean) => void;
}
// Toolbar component with some actions
function ToolBar(props: ToolbarProps) {
  const {
    onToggleMinimap,
    isMinimapVisible,
    selectedId,
    setSelectedId,
    setShowElementsInfo,
    showElementsInfo,
  } = props;
  const graph = useGraph();
  const paper = usePaper();
  return (
    <div className="flex flex-row absolute top-2 left-2 z-10 bg-gray-900  rounded-lg p-2 shadow-md gap-2">
      <button
        type="button"
        className={BUTTON_CLASSNAME}
        onClick={() => {
          onToggleMinimap(!isMinimapVisible);
        }}
      >
        {isMinimapVisible ? (
          <i className="fa-solid fa-eye"></i>
        ) : (
          <i className="fa-solid fa-eye-slash"></i>
        )}
        <span className="ml-2">Toggle Minimap</span>
      </button>
      <button
        type="button"
        className={\`\${BUTTON_CLASSNAME} \${selectedId ? '' : 'opacity-20 cursor-not-allowed'}\`}
        disabled={!selectedId}
        onClick={() => {
          if (!selectedId) {
            return;
          }
          const cell = graph.getCell(selectedId);
          if (!cell) {
            return;
          }
          if (!cell.isElement()) {
            return;
          }
          const clone = cell.clone();
          clone.translate(20, 20);
          graph.addCell(clone);
          setSelectedId(clone.id);
        }}
      >
        <i className="fa-solid fa-clone"></i>
        <span className="ml-2">Duplicate</span>
      </button>
      <button
        type="button"
        className={\`\${BUTTON_CLASSNAME} \${selectedId ? '' : 'opacity-20 cursor-not-allowed'}\`}
        disabled={!selectedId}
        onClick={() => {
          if (!selectedId) {
            return;
          }
          const cell = graph.getCell(selectedId);
          if (!cell) {
            return;
          }
          if (!cell.isElement()) {
            return;
          }
          cell.remove();
          setSelectedId(null);
        }}
      >
        <i className="fa-solid fa-trash"></i>
        <span className="ml-2">Remove selected element</span>
      </button>
      <button
        type="button"
        className={BUTTON_CLASSNAME}
        onClick={() => {
          paper.transformToFitContent({
            verticalAlign: 'middle',
            horizontalAlign: 'middle',
            padding: 20,
          });
        }}
      >
        <i className="fa-solid fa-undo"></i>
        <span className="ml-2">Zoom to fit</span>
      </button>
      <button
        type="button"
        className={BUTTON_CLASSNAME}
        onClick={() => {
          setShowElementsInfo(!showElementsInfo);
        }}
      >
        {showElementsInfo ? (
          <i className="fa-solid fa-eye-slash"></i>
        ) : (
          <i className="fa-solid fa-eye"></i>
        )}
        <span className="ml-2">Toggle info</span>
      </button>
    </div>
  );
}

// Show elements and links info
function ElementsInfo() {
  const elements = useElements();
  const links = useLinks();
  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex flex-col gap-2">
        <div className="text-white text-sm">Elements</div>
        <ShowJson data={JSON.stringify(elements, null, 2)} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-white text-sm">Links</div>
        <ShowJson data={JSON.stringify(links, null, 2)} />
      </div>
    </div>
  );
}

// Define main paper component and render elements
function Main() {
  const [isMinimapVisible, setIsMinimapVisible] = useState(false);
  const [selectedElement, setSelectedElement] = useState<dia.Cell.ID | null>(null);
  const [showElementsInfo, setShowElementsInfo] = useState(false);

  const renderElement = useCallback(
    (element: Element) => {
      const { elementType, id } = element;

      const isSelected = id === selectedElement;
      switch (elementType) {
        case 'alert':
        case 'info': {
          return <MessageComponent {...element} isSelected={isSelected} />;
        }
        case 'table': {
          return <TableElement {...element} isSelected={isSelected} />;
        }
      }
    },
    [selectedElement]
  );
  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col relative">
        <PaperProvider>
          <ToolBar
            onToggleMinimap={setIsMinimapVisible}
            isMinimapVisible={isMinimapVisible}
            selectedId={selectedElement}
            setSelectedId={setSelectedElement}
            showElementsInfo={showElementsInfo}
            setShowElementsInfo={setShowElementsInfo}
          />
          <Paper
            {...PAPER_PROPS}
            defaultLink={new shapes.standard.Link(links[0])}
            renderElement={renderElement}
            className={PAPER_CLASSNAME}
            onCellPointerClick={({ cellView }) => {
              const cell = cellView.model;
              setSelectedElement(cell.id ?? null);
            }}
            onLinkPointerClick={() => {
              setSelectedElement(null);
            }}
            onBlankPointerClick={() => {
              setSelectedElement(null);
            }}
            width="100%"
          />
        </PaperProvider>
        {isMinimapVisible && <MiniMap />}
      </div>
      {showElementsInfo && <ElementsInfo />}
    </div>
  );
}

export default function App() {
  return (
    <GraphProvider initialElements={elements} initialLinks={links}>
      <Main />
    </GraphProvider>
  );
}
`,K=`.link {
  stroke-dasharray: 5 5; /* dash length 10, gap 10 */
  stroke-dashoffset: 0;
  animation: dashmove 1s linear infinite;
}

@keyframes dashmove {
  to {
    stroke-dashoffset: -20; /* dash + gap length */
  }
}
`,ge={title:"Demos/Introduction demo",component:k,parameters:{docs:{description:{story:"Demo of jointjs with react using custom nodes"},source:{code:`${q} 
 <style>
${K}</style>`}}}},be={};export{be as Default,ge as default};
