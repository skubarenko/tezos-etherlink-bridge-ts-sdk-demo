(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[892],{62968:function(e,t,s){Promise.resolve().then(s.bind(s,71216))},71216:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return c}});var r=s(3827),a=s(54333),n=s(64090),l=s(87167),i=s(24370),o=s(85021);let d=e=>t=>{let s=a.P6.getInitialOperation(e);if(t[0]){let r=a.P6.getInitialOperation(t[0]),n=r.hash===s.hash?1:1>r.timestamp.localeCompare(s.timestamp)?0:-1;if(n>-1){let s=t.slice(n);return s.unshift(e),s}}if(t[t.length-1]){let r=a.P6.getInitialOperation(t[t.length-1]);if(r.hash===s.hash){let s=t.slice(0,t.length-1);return s.push(e),s}if(1===r.timestamp.localeCompare(s.timestamp))return t}let r=!1,n=[];for(let l of t){let t=a.P6.getInitialOperation(l);s.hash===t.hash?(r=!0,n.push(e)):n.push(l)}return r?n:t};function c(){let e=(0,o.bp)(),t=null==e?void 0:e.tokenBridge,[s,c]=(0,n.useState)([]),[u,m]=(0,n.useState)(!1),{address:h}=(0,o.Mw)(),{address:p}=(0,o.EP)(),f=(0,n.useCallback)(e=>{let s=a.P6.getInitialOperationHash(e);console.log("Token Transfer Updated",s,e.kind,e.status),c(d(e)),e.status===a.hj.Finished&&(console.log("Unsubscribe from the ".concat(s," token transfer")),null==t||t.unsubscribeFromTokenTransfer(e))},[t]);(0,n.useEffect)(()=>{if(!t||!(h||p))return;let e=h&&p?[h,p]:h||p,s=async()=>{c(await t.data.getTokenTransfers(e)),m(!1)};return t.events.tokenTransferUpdated.addListener(f),m(!0),s(),()=>{t.events.tokenTransferUpdated.removeListener(f)}},[t,f,h,p]);let x=(0,n.useCallback)(async e=>{t&&await t.finishWithdraw(e)},[t]);return(0,r.jsx)("main",{className:"flex flex-col items-center pt-6",children:u||!s.length?(0,r.jsx)("div",{className:"flex items-center text-lg mt-10",children:u?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.x,{className:"animate-spin h-5 w-5 mr-2 text-white"}),(0,r.jsx)("span",{children:"Loading transfers..."})]}):(0,r.jsx)("span",{children:"No transfers"})}):s.map(e=>(0,r.jsx)(l.Gv,{bridgeTokenTransfer:e,onFinishWithdrawing:x},a.P6.getInitialOperationHash(e)))})}},35809:function(e,t,s){"use strict";s.d(t,{L:function(){return l}});var r=s(3827),a=s(64090),n=s(93349);let l=(0,a.memo)(e=>{let t=e.iconSize||32,s=e.iconClassName||"mr-2";return(0,r.jsxs)("span",{className:(0,n.Nn)("inline-flex items-center justify-center text-nowrap",e.className),children:[(0,r.jsx)("img",{src:e.token.iconUrl,alt:e.token.name,width:t,height:t,className:(0,n.Nn)("inline rounded-full",s)}),e.showName?(0,r.jsxs)("span",{className:"inline-flex flex-col overflow-hidden",children:[(0,r.jsx)("span",{className:"overflow-hidden overflow-ellipsis",children:e.token.ticker}),(0,r.jsx)("span",{className:"text-sm overflow-hidden overflow-ellipsis",children:e.token.name})]}):(0,r.jsx)("span",{className:"overflow-hidden overflow-ellipsis",children:e.token.ticker})]})})},87167:function(e,t,s){"use strict";s.d(t,{Gv:function(){return D}});var r,a,n=s(3827),l=s(64090),i=s(39643),o=s(48707);let d=(0,l.memo)(e=>{let t=e.segments[e.segments.length-1];return(0,n.jsxs)("div",{className:"flex justify-between items-center",children:[(0,n.jsx)(o.f,{isTezos:e.isDeposit}),(0,n.jsxs)("div",{className:"flex-grow flex justify-between items-center ml-2",children:[e.segments.map((e,t)=>(0,n.jsxs)(l.Fragment,{children:[t>0&&(0,n.jsx)("div",{className:"flex-none h-2 w-2 rotate-45 ".concat(e.backgroundColorCssClass," ").concat(e.isPulse?"animate-progress":"")}),(0,n.jsx)("hr",{className:"w-full border-dotted border-t-2 ".concat(e.borderColorCssClass," ").concat(e.isPulse?"animate-progress":"")})]},t)),t&&(0,n.jsx)(i.Z,{width:18,height:18,className:"flex-none -ml-2 ".concat(t.textColorCssClass," ").concat(t.isPulse?"animate-progress":"")})]}),(0,n.jsx)(o.f,{isTezos:!e.isDeposit})]})});var c=s(91705),u=s(93349);let m=e=>{let{showArrowIcon:t,...s}=e;return(0,n.jsxs)("a",{...s,target:"_blank",rel:"noreferrer",className:"".concat((0,u.Nn)("flex items-center dark:text-violet-300 dark:hover:text-violet-400",s.className)),children:[s.children,(null==t||t)&&(0,n.jsx)(c.Z,{className:"inline h-4 w-4 ml-1 -mb-0.5"})]})};var h=s(73983);let p=e=>{if(!e.rollupData||!e.rollupData.commitment||!e.rollupData.proof)return null;let t="".concat(h.v.bridgeSmartRollupNodeBaseUrl,"/global/block/head/helpers/proofs/outbox/").concat(e.rollupData.outboxMessageLevel,"/messages?index=").concat(e.rollupData.outboxMessageIndex);return(0,n.jsx)(m,{href:t,children:"Rollup Data"})},f=e=>(0,n.jsxs)("div",{className:"mt-4 -mb-4 -mx-4 pt-4 pl-4 pb-2 rounded-b-xl overflow-hidden dark:text-red-100 dark:bg-red-900",children:[(0,n.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Error, please try again"}),e.message]}),x=l.memo(e=>{var t;let s=null===(t=e.displayShort)||void 0===t||t;return(0,n.jsx)(m,{href:u.Yz.getExplorerUrl(e.value,e.type,e.explorer),className:"font-mono",children:(0,n.jsx)("span",{children:s?u.sG.getShortText(e.value,6,4):e.value})})});var g=s(35809),k=s(24370),b=s(59588);(r=a||(a={}))[r.Pending=0]="Pending",r[r.Created=1]="Created",r[r.Sealed=2]="Sealed",r[r.Finished=3]="Finished",r[r.Failed=4]="Failed";let C={backgroundColorCssClass:"dark:bg-cyan-500",borderColorCssClass:"dark:border-cyan-500",textColorCssClass:"dark:text-cyan-500",isPulse:!0},j={backgroundColorCssClass:"dark:bg-green-600",borderColorCssClass:"dark:border-green-600",textColorCssClass:"dark:text-green-600",isPulse:!1},v={backgroundColorCssClass:"dark:bg-red-600",borderColorCssClass:"dark:border-red-600",textColorCssClass:"dark:text-red-600",isPulse:!1},w=(e,t)=>{let s=4===t?v:void 0,r=[s||(0===t?C:j)];return e||r.push(s||(t<2?C:j)),r.push(s||(t<3?C:j)),r},N={0:{title:"Pending",backgroundColorCssClass:"dark:bg-cyan-700"},1:{title:"Created",backgroundColorCssClass:"dark:bg-cyan-700"},2:{title:"Sealed",backgroundColorCssClass:"dark:bg-cyan-700"},3:{title:"Completed",backgroundColorCssClass:"dark:bg-green-700"},4:{title:"Failed",backgroundColorCssClass:"dark:bg-red-800"}},y=e=>{let t,s,r,a;let[i,o]=(0,l.useState)(!1),c=(0,l.useMemo)(()=>w(e.isDeposit,e.status),[e.isDeposit,e.status]),h=e.onFinishWithdrawing,C=(0,l.useCallback)(()=>{o(!0),h().catch(u.Bi).finally(()=>o(!1))},[h]);return e.isDeposit?(t=e.tezosOperationHash,s=e.etherlinkOperationHash,r=e.tezosOperationTimestamp,a=e.etherlinkOperationTimestamp):(t=e.etherlinkOperationHash,s=e.tezosOperationHash,r=e.etherlinkOperationTimestamp,a=e.tezosOperationTimestamp),(0,n.jsxs)("div",{className:"flex flex-col w-full max-w-xl p-4 my-4 rounded-xl overflow-hidden dark:text-gray-100 dark:bg-slate-800",children:[(0,n.jsxs)("div",{className:"flex justify-between items-center text-lg",children:[(0,n.jsx)("div",{className:"flex items-center",children:e.token&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{className:"mr-1.5",children:u.S9.convertTokensRawAmountToAmount(e.amount,e.token.decimals)}),"native"!==e.token.type?(0,n.jsx)(m,{href:u.Yz.getTokenExplorerUrl(e.token),showArrowIcon:!1,children:(0,n.jsx)(g.L,{token:e.token,iconSize:17,iconClassName:"mr-0.5 -mt-0.5"})}):(0,n.jsx)(g.L,{token:e.token,iconSize:17,iconClassName:"mr-0.5 -mt-0.5"})]})}),(0,n.jsx)("div",{className:"-mt-4 -mr-4 pt-4 pr-2 pb-2 pl-2 w-32 rounded-bl-xl text-center ".concat(N[e.status].backgroundColorCssClass),children:N[e.status].title})]}),(0,n.jsx)("div",{className:"mt-6",children:(0,n.jsx)(d,{isDeposit:e.isDeposit,segments:c})}),(0,n.jsxs)("div",{className:"flex justify-between items-center mt-4",children:[t&&(0,n.jsx)(x,{type:b.LinkType.Operation,value:t}),s?(0,n.jsx)(x,{type:b.LinkType.Operation,value:s}):(0,n.jsx)(p,{rollupData:e.rollupData})]}),(0,n.jsxs)("div",{className:"flex justify-between items-center mt-1 text-xs",children:[r&&(0,n.jsx)("span",{children:r}),a&&(0,n.jsx)("span",{children:a})]}),2===e.status&&(0,n.jsx)("div",{className:"flex justify-center items-center",children:(0,n.jsx)("button",{className:"w-full mt-4 h-12 rounded-lg select-none cursor-pointer  dark:bg-blue-700 dark:hover:bg-blue-800 disabled:cursor-default disabled:opacity-70",onClick:C,disabled:i,children:(0,n.jsxs)("span",{className:"flex justify-center items-center",children:[i&&(0,n.jsx)(k.x,{className:"animate-spin h-5 w-5 mr-2 text-white"}),(0,n.jsx)("span",{children:"Complete Withdraw"})]})})}),e.error&&(0,n.jsx)(f,{message:e.error})]})};var O=s(54333),T=s(6143);let P={[O.hj.Pending]:a.Pending,[O.hj.Created]:a.Created,[O.hj.Sealed]:a.Sealed,[O.hj.Finished]:a.Finished,[O.hj.Failed]:a.Failed},D=e=>{let{bridgeTokenTransfer:t,onFinishWithdrawing:s}=e,r=t.kind===O.gu.Deposit,a=r?t.tezosOperation:t.etherlinkOperation,[i,o]=(0,l.useState)(),d=t.tezosOperation,c=t.etherlinkOperation,m=t.status===O.hj.Sealed?t.rollupData:void 0;(0,l.useEffect)(()=>o(void 0),[t.status]);let h=(0,l.useCallback)(()=>(o(void 0),t.status===O.hj.Sealed?s(t).catch(e=>o((0,u.e$)(e))):Promise.resolve()),[t,s]);return(0,n.jsx)(y,{isDeposit:r,amount:a.amount,token:(0,T.uk)(a.token,r),status:P[t.status],tezosOperationHash:null==d?void 0:d.hash,tezosOperationTimestamp:null==d?void 0:d.timestamp,etherlinkOperationHash:null==c?void 0:c.hash,etherlinkOperationTimestamp:null==c?void 0:c.timestamp,rollupData:m,error:i,onFinishWithdrawing:h})}},91705:function(e,t,s){"use strict";var r=s(64090);let a=r.forwardRef(function(e,t){let{title:s,titleId:a,...n}=e;return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":a},n),s?r.createElement("title",{id:a},s):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"}))});t.Z=a},39643:function(e,t,s){"use strict";var r=s(64090);let a=r.forwardRef(function(e,t){let{title:s,titleId:a,...n}=e;return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":a},n),s?r.createElement("title",{id:a},s):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m8.25 4.5 7.5 7.5-7.5 7.5"}))});t.Z=a},75504:function(e,t,s){"use strict";t.Z=function(){for(var e,t,s=0,r="",a=arguments.length;s<a;s++)(e=arguments[s])&&(t=function e(t){var s,r,a="";if("string"==typeof t||"number"==typeof t)a+=t;else if("object"==typeof t){if(Array.isArray(t)){var n=t.length;for(s=0;s<n;s++)t[s]&&(r=e(t[s]))&&(a&&(a+=" "),a+=r)}else for(r in t)t[r]&&(a&&(a+=" "),a+=r)}return a}(e))&&(r&&(r+=" "),r+=t);return r}}},function(e){e.O(0,[844,283,868,442,102,971,69,744],function(){return e(e.s=62968)}),_N_E=e.O()}]);