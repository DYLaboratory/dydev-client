"use strict";(self.webpackChunkdydev_client=self.webpackChunkdydev_client||[]).push([[508],{5508:(n,t,o)=>{o.r(t),o.d(t,{default:()=>T});var i=o(5043),a=o(8903),e=o(6446),r=o(5865),s=o(9252),d=o(2518),c=o(6992),l=o(9367),g=o(7963),h=o(8587),u=o(8168),x=o(6803),m=o(5879),A=o(8606),v=o(4535),f=o(2876),p=o(4221),I=o(1637),y=o(2018),j=o(2400);function w(n){return(0,j.Ay)("MuiLoadingButton",n)}const L=(0,o(7056).A)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]);var b=o(579);const P=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],S=(0,v.Ay)(d.A,{shouldForwardProp:n=>(n=>"ownerState"!==n&&"theme"!==n&&"sx"!==n&&"as"!==n&&"classes"!==n)(n)||"classes"===n,name:"MuiLoadingButton",slot:"Root",overridesResolver:(n,t)=>[t.root,t.startIconLoadingStart&&{["& .".concat(L.startIconLoadingStart)]:t.startIconLoadingStart},t.endIconLoadingEnd&&{["& .".concat(L.endIconLoadingEnd)]:t.endIconLoadingEnd}]})((n=>{let{ownerState:t,theme:o}=n;return(0,u.A)({["& .".concat(L.startIconLoadingStart,", & .").concat(L.endIconLoadingEnd)]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0}},"center"===t.loadingPosition&&{transition:o.transitions.create(["background-color","box-shadow","border-color"],{duration:o.transitions.duration.short}),["&.".concat(L.loading)]:{color:"transparent"}},"start"===t.loadingPosition&&t.fullWidth&&{["& .".concat(L.startIconLoadingStart,", & .").concat(L.endIconLoadingEnd)]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0,marginRight:-8}},"end"===t.loadingPosition&&t.fullWidth&&{["& .".concat(L.startIconLoadingStart,", & .").concat(L.endIconLoadingEnd)]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0,marginLeft:-8}})})),k=(0,v.Ay)("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(n,t)=>{const{ownerState:o}=n;return[t.loadingIndicator,t["loadingIndicator".concat((0,x.A)(o.loadingPosition))]]}})((n=>{let{theme:t,ownerState:o}=n;return(0,u.A)({position:"absolute",visibility:"visible",display:"flex"},"start"===o.loadingPosition&&("outlined"===o.variant||"contained"===o.variant)&&{left:"small"===o.size?10:14},"start"===o.loadingPosition&&"text"===o.variant&&{left:6},"center"===o.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(t.vars||t).palette.action.disabled},"end"===o.loadingPosition&&("outlined"===o.variant||"contained"===o.variant)&&{right:"small"===o.size?10:14},"end"===o.loadingPosition&&"text"===o.variant&&{right:6},"start"===o.loadingPosition&&o.fullWidth&&{position:"relative",left:-10},"end"===o.loadingPosition&&o.fullWidth&&{position:"relative",right:-10})})),R=i.forwardRef((function(n,t){const o=i.useContext(p.A),a=(0,y.A)(o,n),e=(0,f.A)({props:a,name:"MuiLoadingButton"}),{children:r,disabled:s=!1,id:d,loading:c=!1,loadingIndicator:l,loadingPosition:g="center",variant:v="text"}=e,j=(0,h.A)(e,P),L=(0,m.A)(d),R=null!=l?l:(0,b.jsx)(I.A,{"aria-labelledby":L,color:"inherit",size:16}),W=(0,u.A)({},e,{disabled:s,loading:c,loadingIndicator:R,loadingPosition:g,variant:v}),C=(n=>{const{loading:t,loadingPosition:o,classes:i}=n,a={root:["root",t&&"loading"],startIcon:[t&&"startIconLoading".concat((0,x.A)(o))],endIcon:[t&&"endIconLoading".concat((0,x.A)(o))],loadingIndicator:["loadingIndicator",t&&"loadingIndicator".concat((0,x.A)(o))]},e=(0,A.A)(a,w,i);return(0,u.A)({},i,e)})(W),E=c?(0,b.jsx)(k,{className:C.loadingIndicator,ownerState:W,children:R}):null;return(0,b.jsxs)(S,(0,u.A)({disabled:s||c,id:L,ref:t},j,{variant:v,classes:C,ownerState:W,children:["end"===W.loadingPosition?r:E,"end"===W.loadingPosition?E:r]}))})),W=(0,v.Ay)(a.Ay)((n=>{let{theme:t}=n;return"\n    background: ".concat(t.colors.gradients.black1,";\n")})),C=(0,v.Ay)(e.A)((()=>"\n    height: 100%;\n    display: flex;\n    flex: 1;\n    overflow: auto;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n")),E=(0,v.Ay)(r.A)((n=>{let{theme:t}=n;return"\n      color: ".concat(t.colors.alpha.white[100],";\n")})),M=(0,v.Ay)(r.A)((n=>{let{theme:t}=n;return"\n      color: ".concat(t.colors.alpha.white[70],";\n")}));const T=function(){const[n,t]=(0,i.useState)(!1);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(l.mg,{children:(0,b.jsx)("title",{children:"Status - 500"})}),(0,b.jsx)(C,{children:(0,b.jsxs)(a.Ay,{container:!0,sx:{height:"100%"},alignItems:"stretch",spacing:0,children:[(0,b.jsx)(a.Ay,{xs:12,md:6,alignItems:"center",display:"flex",justifyContent:"center",item:!0,children:(0,b.jsx)(s.A,{maxWidth:"sm",children:(0,b.jsxs)(e.A,{textAlign:"center",children:[(0,b.jsx)("img",{alt:"500",height:260,src:"/static/images/status/500.svg"}),(0,b.jsx)(r.A,{variant:"h2",sx:{my:2},children:"There was an error, please try again later"}),(0,b.jsx)(r.A,{variant:"h4",color:"text.secondary",fontWeight:"normal",sx:{mb:4},children:"The server encountered an internal error and was not able to complete your request"}),(0,b.jsx)(R,{onClick:function(){t(!0)},loading:n,variant:"outlined",color:"primary",startIcon:(0,b.jsx)(g.A,{}),children:"Refresh view"}),(0,b.jsx)(d.A,{href:"/overview",variant:"contained",sx:{ml:1},children:"Go back"})]})})}),(0,b.jsx)(c.A,{mdDown:!0,children:(0,b.jsx)(W,{xs:12,md:6,alignItems:"center",display:"flex",justifyContent:"center",item:!0,children:(0,b.jsx)(s.A,{maxWidth:"sm",children:(0,b.jsxs)(e.A,{textAlign:"center",children:[(0,b.jsx)(E,{variant:"h1",sx:{my:2},children:"Tokyo Free White React Typescript Admin Dashboard"}),(0,b.jsx)(M,{variant:"h4",fontWeight:"normal",sx:{mb:4},children:"High performance React template built with lots of powerful Material-UI components across multiple product niches for fast & perfect apps development processes."}),(0,b.jsx)(d.A,{href:"/overview",size:"large",variant:"contained",children:"Overview"})]})})})})]})})]})}},7963:(n,t,o)=>{var i=o(4994);t.A=void 0;var a=i(o(39)),e=o(579);t.A=(0,a.default)((0,e.jsx)("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"}),"RefreshTwoTone")}}]);
//# sourceMappingURL=508.8f11fdf8.chunk.js.map