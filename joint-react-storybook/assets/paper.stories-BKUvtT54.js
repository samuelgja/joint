import{j as s}from"./index-DwP6fAIG.js";import{P as re,v as ie}from"./create-njWDpS2D.js";import{a as le}from"./with-simple-data-BKTSf5MX.js";import{v as ae}from"./v4-CtRu48qb.js";import{a as c,P as Z}from"./theme-BZH0jGzG.js";import{m as se}from"./make-story-CJLFqcT8.js";import{g as ce}from"./get-api-documentation-link-BQfISuZK.js";import{M as me}from"./measured-node-BZZgBNj5.js";import{a as ue}from"./helpers-BazfYDoP.js";import{B as Ee}from"./Button-B36ztity.js";import"./index-B0WjJBI_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CwPCC0ZT.js";import"./use-children-ref-gx-xwHed.js";const{addons:Me}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:Ce}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:D}=__STORYBOOK_MODULE_GLOBAL__;var ke=Object.defineProperty,de=(n,o)=>{for(var t in o)ke(n,t,{get:o[t],enumerable:!0})},pe="storybook/actions",Pe=`${pe}/action-event`,ge={depth:10,clearOnStoryChange:!0,limit:50},ee=(n,o)=>{let t=Object.getPrototypeOf(n);return!t||o(t)?t:ee(t,o)},he=n=>!!(typeof n=="object"&&n&&ee(n,o=>/^Synthetic(?:Base)?Event$/.test(o.constructor.name))&&typeof n.persist=="function"),Le=n=>{if(he(n)){let o=Object.create(n.constructor.prototype,Object.getOwnPropertyDescriptors(n));o.persist();let t=Object.getOwnPropertyDescriptor(o,"view"),r=t==null?void 0:t.value;return typeof r=="object"&&(r==null?void 0:r.constructor.name)==="Window"&&Object.defineProperty(o,"view",{...t,value:Object.create(r.constructor.prototype)}),o}return n},ve=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?ae():Date.now().toString(36)+Math.random().toString(36).substring(2);function e(n,o={}){let t={...ge,...o},r=function(...l){var O,_;if(o.implicit){let R=(O="__STORYBOOK_PREVIEW__"in D?D.__STORYBOOK_PREVIEW__:void 0)==null?void 0:O.storyRenders.find(E=>E.phase==="playing"||E.phase==="rendering");if(R){let E=!((_=globalThis==null?void 0:globalThis.FEATURES)!=null&&_.disallowImplicitActionsInRenderV8),S=new Ce({phase:R.phase,name:n,deprecated:E});if(E)console.warn(S);else throw S}}let i=Me.getChannel(),a=ve(),u=5,L=l.map(Le),oe=l.length>1?L:L[0],te={id:a,count:0,data:{name:n,args:oe},options:{...t,maxDepth:u+(t.depth||3),allowFunction:t.allowFunction||!1}};i.emit(Pe,te)};return r.isAction=!0,r.implicit=o.implicit,r}const{definePreview:Ge}=__STORYBOOK_MODULE_PREVIEW_API__,{global:v}=__STORYBOOK_MODULE_GLOBAL__;var Oe={};de(Oe,{argsEnhancers:()=>Se,loaders:()=>fe});var ne=(n,o)=>typeof o[n]>"u"&&!(n in o),_e=n=>{let{initialArgs:o,argTypes:t,id:r,parameters:{actions:l}}=n;if(!l||l.disable||!l.argTypesRegex||!t)return{};let i=new RegExp(l.argTypesRegex);return Object.entries(t).filter(([a])=>!!i.test(a)).reduce((a,[u,L])=>(ne(u,o)&&(a[u]=e(u,{implicit:!0,id:r})),a),{})},Re=n=>{let{initialArgs:o,argTypes:t,parameters:{actions:r}}=n;return r!=null&&r.disable||!t?{}:Object.entries(t).filter(([l,i])=>!!i.action).reduce((l,[i,a])=>(ne(i,o)&&(l[i]=e(typeof a.action=="string"?a.action:i)),l),{})},Se=[Re,_e],f=!1,De=n=>{let{parameters:{actions:o}}=n;if(!(o!=null&&o.disable)&&!f&&"__STORYBOOK_TEST_ON_MOCK_CALL__"in v&&typeof v.__STORYBOOK_TEST_ON_MOCK_CALL__=="function"){let t=v.__STORYBOOK_TEST_ON_MOCK_CALL__;t((r,l)=>{let i=r.getMockName();i!=="spy"&&(!/^next\/.*::/.test(i)||["next/router::useRouter()","next/navigation::useRouter()","next/navigation::redirect","next/cache::","next/headers::cookies().set","next/headers::cookies().delete","next/headers::headers().set","next/headers::headers().delete"].some(a=>i.startsWith(a)))&&e(i)(l)}),f=!0}},fe=[De];const we=ce("Paper","variables"),$e={title:"Components/Paper",component:re,decorators:[le],parameters:se({description:`
Paper is a component that renders graph elements. It is used to display and interact with graph elements.
    `,apiURL:we,code:`import { Paper } from '@joint/react'
<Paper renderElement={() => <rect rx={10} ry={10} width={100} height={50} fill={"blue"} />} />
    `})};function Be({width:n,height:o}){return s.jsx("rect",{rx:10,ry:10,width:n,height:o,fill:Z})}function m({width:n,height:o}){return s.jsx("foreignObject",{width:n,height:o,children:s.jsx(me,{children:s.jsx("div",{style:{width:n,height:o,boxShadow:"0 0 10px rgba(0,0,0,0.5)",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:Z,borderRadius:10},children:"Hello"})})})}const M={args:{renderElement:Be,width:"100%",className:c}},C={args:{renderElement:m,width:"100%",className:c}},k={args:{drawGrid:!0,gridSize:10,renderElement:m,width:"100%",className:c}},d={args:{scale:.7,renderElement:m,width:"100%",className:c}},p={args:{renderElement:m,width:"100%",className:c}},P={args:{renderElement:m,onLinkMouseEnter:e("onLinkMouseenter"),onCellMouseEnter:e("onCellMouseEnter"),onBlankContextMenu:e("onBlankContextmenu"),onBlankMouseEnter:e("onBlankMouseEnter"),onBlankMouseLeave:e("onBlankMouseLeave"),onBlankPointerMove:e("onBlankPointerMove"),onBlankPointerUp:e("onBlankPointerUp"),onBlankPointerDown:e("onBlankPointerDown"),onBlankPointerClick:e("onBlankPointerClick"),onBlankMouseOut:e("onBlankMouseOut"),onBlankMouseOver:e("onBlankMouseOver"),onBlankMouseWheel:e("onBlankMouseWheel"),onBlankPointerDblClick:e("onBlankPointerDblClick"),onCellContextMenu:e("onCellContextMenu"),onCellHighlight:e("onCellHighlight"),onCellHighlightInvalid:e("onCellHighlightInvalid"),onCellUnhighlight:e("onCellUnhighlight"),onCellMouseLeave:e("onCellMouseLeave"),onCellMouseOut:e("onCellMouseOut"),onCellMouseOver:e("onCellMouseOver"),onCellMouseWheel:e("onCellMouseWheel"),onCellPointerClick:e("onCellPointerClick"),onCellPointerDblClick:e("onCellPointerDblClick"),onCellPointerDown:e("onCellPointerDown"),onCellPointerMove:e("onCellPointerMove"),onCellPointerUp:e("onCellPointerUp"),onCustomEvent:e("onCustomEvent"),onElementContextMenu:e("onElementContextMenu"),onElementMagnetContextMenu:e("onElementMagnetContextMenu"),onElementMagnetPointerClick:e("onElementMagnetPointerClick"),onElementMagnetPointerDblClick:e("onElementMagnetPointerDblClick"),onElementMouseEnter:e("onElementMouseEnter"),onElementMouseLeave:e("onElementMouseLeave"),onElementMouseOut:e("onElementMouseOut"),onElementMouseOver:e("onElementMouseOver"),onElementMouseWheel:e("onElementMouseWheel"),onElementPointerClick:e("onElementPointerClick"),onElementPointerDblClick:e("onElementPointerDblClick"),onElementPointerDown:e("onElementPointerDown"),onElementPointerMove:e("onElementPointerMove"),onElementPointerUp:e("onElementPointerUp"),onElementsSizeChange:e("onElementsSizeChange"),onLinkContextMenu:e("onLinkContextMenu"),onElementsSizeReady:e("onElementsSizeReady"),onLinkConnect:e("onLinkConnect"),onLinkDisconnect:e("onLinkDisconnect"),onLinkMouseLeave:e("onLinkMouseLeave"),onLinkMouseOut:e("onLinkMouseOut"),onLinkMouseOver:e("onLinkMouseOver"),onLinkMouseWheel:e("onLinkMouseWheel"),onLinkPointerClick:e("onLinkPointerClick"),onLinkPointerDblClick:e("onLinkPointerDblClick"),onLinkPointerDown:e("onLinkPointerDown"),onLinkPointerMove:e("onLinkPointerMove"),onLinkPointerUp:e("onLinkPointerUp"),onLinkSnapConnect:e("onLinkSnapConnect"),onLinkSnapDisconnect:e("onLinkSnapDisconnect"),onPan:e("onPan"),onPaperMouseEnter:e("onPaperMouseEnter"),onPaperMouseLeave:e("onPaperMouseLeave"),onPinch:e("onPinch"),onRenderDone:e("onRenderDone"),onResize:e("onResize"),onScale:e("onScale"),onTransform:e("onTransform"),onTranslate:e("onTranslate"),width:"100%",className:c}},xe=new Ee({markup:ie(s.jsxs(s.Fragment,{children:[s.jsx("circle",{r:7,fill:"#001DFF",cursor:"pointer"}),s.jsx("path",{d:"M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4",fill:"none",stroke:"#FFFFFF",strokeWidth:2,pointerEvents:"none"})]})),distance:60,offset:0}),Ae=new ue({tools:[xe]}),g={args:{renderElement:m,onLinkMouseEnter:({linkView:n})=>{n.addTools(Ae)},onLinkMouseLeave:({linkView:n})=>{n.removeTools()},width:"100%",className:c}},h={args:{renderElement:m,onElementPointerClick:({paper:n})=>{n.trigger("MyCustomEventOnClick",{message:"Hello from custom event!"})},onCustomEvent:({args:n,eventName:o})=>{e("onCustomEvent")(`Custom event triggered: ${o} with args: ${JSON.stringify(n)}`)},width:"100%",className:c}};var w,B,x;M.parameters={...M.parameters,docs:{...(w=M.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    renderElement: RenderRectElement as never,
    width: '100%',
    className: PAPER_CLASSNAME
  }
}`,...(x=(B=M.parameters)==null?void 0:B.docs)==null?void 0:x.source}}};var A,T,b;C.parameters={...C.parameters,docs:{...(A=C.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    renderElement: RenderHTMLElement as never,
    width: '100%',
    className: PAPER_CLASSNAME
  }
}`,...(b=(T=C.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var y,W,N;k.parameters={...k.parameters,docs:{...(y=k.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    drawGrid: true,
    gridSize: 10,
    renderElement: RenderHTMLElement as never,
    width: '100%',
    className: PAPER_CLASSNAME
  }
}`,...(N=(W=k.parameters)==null?void 0:W.docs)==null?void 0:N.source}}};var U,j,I;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    scale: 0.7,
    renderElement: RenderHTMLElement as never,
    width: '100%',
    className: PAPER_CLASSNAME
  }
}`,...(I=(j=d.parameters)==null?void 0:j.docs)==null?void 0:I.source}}};var H,z,F;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    renderElement: RenderHTMLElement as never,
    width: '100%',
    className: PAPER_CLASSNAME
  }
}`,...(F=(z=p.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var V,K,Y;P.parameters={...P.parameters,docs:{...(V=P.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    renderElement: RenderHTMLElement as never,
    onLinkMouseEnter: action('onLinkMouseenter'),
    onCellMouseEnter: action('onCellMouseEnter'),
    onBlankContextMenu: action('onBlankContextmenu'),
    onBlankMouseEnter: action('onBlankMouseEnter'),
    onBlankMouseLeave: action('onBlankMouseLeave'),
    onBlankPointerMove: action('onBlankPointerMove'),
    onBlankPointerUp: action('onBlankPointerUp'),
    onBlankPointerDown: action('onBlankPointerDown'),
    onBlankPointerClick: action('onBlankPointerClick'),
    onBlankMouseOut: action('onBlankMouseOut'),
    onBlankMouseOver: action('onBlankMouseOver'),
    onBlankMouseWheel: action('onBlankMouseWheel'),
    onBlankPointerDblClick: action('onBlankPointerDblClick'),
    onCellContextMenu: action('onCellContextMenu'),
    onCellHighlight: action('onCellHighlight'),
    onCellHighlightInvalid: action('onCellHighlightInvalid'),
    onCellUnhighlight: action('onCellUnhighlight'),
    onCellMouseLeave: action('onCellMouseLeave'),
    onCellMouseOut: action('onCellMouseOut'),
    onCellMouseOver: action('onCellMouseOver'),
    onCellMouseWheel: action('onCellMouseWheel'),
    onCellPointerClick: action('onCellPointerClick'),
    onCellPointerDblClick: action('onCellPointerDblClick'),
    onCellPointerDown: action('onCellPointerDown'),
    onCellPointerMove: action('onCellPointerMove'),
    onCellPointerUp: action('onCellPointerUp'),
    onCustomEvent: action('onCustomEvent'),
    onElementContextMenu: action('onElementContextMenu'),
    onElementMagnetContextMenu: action('onElementMagnetContextMenu'),
    onElementMagnetPointerClick: action('onElementMagnetPointerClick'),
    onElementMagnetPointerDblClick: action('onElementMagnetPointerDblClick'),
    onElementMouseEnter: action('onElementMouseEnter'),
    onElementMouseLeave: action('onElementMouseLeave'),
    onElementMouseOut: action('onElementMouseOut'),
    onElementMouseOver: action('onElementMouseOver'),
    onElementMouseWheel: action('onElementMouseWheel'),
    onElementPointerClick: action('onElementPointerClick'),
    onElementPointerDblClick: action('onElementPointerDblClick'),
    onElementPointerDown: action('onElementPointerDown'),
    onElementPointerMove: action('onElementPointerMove'),
    onElementPointerUp: action('onElementPointerUp'),
    onElementsSizeChange: action('onElementsSizeChange'),
    onLinkContextMenu: action('onLinkContextMenu'),
    onElementsSizeReady: action('onElementsSizeReady'),
    onLinkConnect: action('onLinkConnect'),
    onLinkDisconnect: action('onLinkDisconnect'),
    onLinkMouseLeave: action('onLinkMouseLeave'),
    onLinkMouseOut: action('onLinkMouseOut'),
    onLinkMouseOver: action('onLinkMouseOver'),
    onLinkMouseWheel: action('onLinkMouseWheel'),
    onLinkPointerClick: action('onLinkPointerClick'),
    onLinkPointerDblClick: action('onLinkPointerDblClick'),
    onLinkPointerDown: action('onLinkPointerDown'),
    onLinkPointerMove: action('onLinkPointerMove'),
    onLinkPointerUp: action('onLinkPointerUp'),
    onLinkSnapConnect: action('onLinkSnapConnect'),
    onLinkSnapDisconnect: action('onLinkSnapDisconnect'),
    onPan: action('onPan'),
    onPaperMouseEnter: action('onPaperMouseEnter'),
    onPaperMouseLeave: action('onPaperMouseLeave'),
    onPinch: action('onPinch'),
    onRenderDone: action('onRenderDone'),
    onResize: action('onResize'),
    onScale: action('onScale'),
    onTransform: action('onTransform'),
    onTranslate: action('onTranslate'),
    width: '100%',
    className: PAPER_CLASSNAME
  }
}`,...(Y=(K=P.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};var G,$,J;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    renderElement: RenderHTMLElement as never,
    onLinkMouseEnter: ({
      linkView
    }) => {
      linkView.addTools(toolsView);
    },
    onLinkMouseLeave: ({
      linkView
    }) => {
      linkView.removeTools();
    },
    width: '100%',
    className: PAPER_CLASSNAME
  }
}`,...(J=($=g.parameters)==null?void 0:$.docs)==null?void 0:J.source}}};var q,Q,X;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    renderElement: RenderHTMLElement as never,
    onElementPointerClick: ({
      paper
    }) => {
      paper.trigger('MyCustomEventOnClick', {
        message: 'Hello from custom event!'
      });
    },
    onCustomEvent: ({
      args,
      eventName
    }) => {
      action('onCustomEvent')(\`Custom event triggered: \${eventName} with args: \${JSON.stringify(args)}\`);
    },
    width: '100%',
    className: PAPER_CLASSNAME
  }
}`,...(X=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};const Je=["WithRectElement","WithHTMLElement","WithGrid","WithScaleDown","WithAutoFitContent","WithEvent","WithLinkTools","WithCustomEvent"];export{p as WithAutoFitContent,h as WithCustomEvent,P as WithEvent,k as WithGrid,C as WithHTMLElement,g as WithLinkTools,M as WithRectElement,d as WithScaleDown,Je as __namedExportsOrder,$e as default};
