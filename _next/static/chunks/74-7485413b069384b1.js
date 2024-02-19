"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[74],{35809:function(e,s,t){t.d(s,{L:function(){return n}});var r=t(3827),a=t(64090),l=t(89521);let n=(0,a.memo)(e=>{let s=e.iconSize||32,t=e.iconClassName||"mr-2";return(0,r.jsxs)("span",{className:(0,l.Nn)("inline-flex items-center justify-center text-nowrap",e.className),children:[(0,r.jsx)("img",{src:e.token.iconUrl,alt:e.token.name,width:s,height:s,className:(0,l.Nn)("inline rounded-full",t)}),e.showName?(0,r.jsxs)("span",{className:"inline-flex flex-col overflow-hidden",children:[(0,r.jsx)("span",{className:"overflow-hidden overflow-ellipsis",children:e.token.ticker}),(0,r.jsx)("span",{className:"text-sm overflow-hidden overflow-ellipsis",children:e.token.name})]}):(0,r.jsx)("span",{className:"overflow-hidden overflow-ellipsis",children:e.token.ticker})]})})},59074:function(e,s,t){t.d(s,{Gv:function(){return F}});var r,a,l=t(3827),n=t(64090),i=t(39643),o=t(48707);let d=(0,n.memo)(e=>{let s=e.segments[e.segments.length-1];return(0,l.jsxs)("div",{className:"flex justify-between items-center",children:[(0,l.jsx)(o.f,{isTezos:e.isDeposit}),(0,l.jsxs)("div",{className:"flex-grow flex justify-between items-center ml-2",children:[e.segments.map((e,s)=>(0,l.jsxs)(n.Fragment,{children:[s>0&&(0,l.jsx)("div",{className:"flex-none h-2 w-2 rotate-45 ".concat(e.backgroundColorCssClass," ").concat(e.isPulse?"animate-progress":"")}),(0,l.jsx)("hr",{className:"w-full border-dotted border-t-2 ".concat(e.borderColorCssClass," ").concat(e.isPulse?"animate-progress":"")})]},s)),s&&(0,l.jsx)(i.Z,{width:18,height:18,className:"flex-none -ml-2 ".concat(s.textColorCssClass," ").concat(s.isPulse?"animate-progress":"")})]}),(0,l.jsx)(o.f,{isTezos:!e.isDeposit})]})});var c=t(91705),m=t(89521);let h=e=>{let{showArrowIcon:s,...t}=e;return(0,l.jsxs)("a",{...t,target:"_blank",rel:"noreferrer",className:"".concat((0,m.Nn)("flex items-center dark:text-violet-300 dark:hover:text-violet-400",t.className)),children:[t.children,(null==s||s)&&(0,l.jsx)(c.Z,{className:"inline h-4 w-4 ml-1 -mb-0.5"})]})};var p=t(73983);let u=e=>{if(!e.rollupData||!e.rollupData.commitment||!e.rollupData.proof)return null;let s="".concat(p.v.bridge.smartRollupNodeBaseUrl,"/global/block/head/helpers/proofs/outbox/").concat(e.rollupData.outboxMessageLevel,"/messages?index=").concat(e.rollupData.outboxMessageIndex);return(0,l.jsx)(h,{href:s,children:"Rollup Data"})},x=e=>(0,l.jsxs)("div",{className:"mt-4 -mb-4 -mx-4 pt-4 pl-4 pb-2 rounded-b-xl overflow-hidden dark:text-red-100 dark:bg-red-900",children:[(0,l.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Error, please try again"}),e.message]});var k=t(20703);let v=e=>"https://services.tzkt.io/v1/avatars/"+e,f=(0,n.memo)(e=>{let s=e.width||24,t=e.height||24;return(0,l.jsx)(k.default,{width:s,height:t,className:"inline w-6 h-6 mr-0.5 rounded-full",src:v(e.address),alt:"Avatar of the ".concat(e.address," address")})}),C=n.memo(e=>{var s;let t=null===(s=e.displayShort)||void 0===s||s,r=e.displayShortFirstPart||6,a=e.displayShortLastPart||4;return(0,l.jsx)(h,{href:m.Yz.getExplorerUrl(e.value,e.type,e.explorer),className:"font-mono",children:(0,l.jsx)("span",{children:t?m.sG.getShortText(e.value,r,a):e.value})})});var g=t(35809),j=t(24370),b=t(59588);(r=a||(a={}))[r.Pending=0]="Pending",r[r.Created=1]="Created",r[r.Sealed=2]="Sealed",r[r.Finished=3]="Finished",r[r.Failed=4]="Failed";let y={backgroundColorCssClass:"dark:bg-cyan-500",borderColorCssClass:"dark:border-cyan-500",textColorCssClass:"dark:text-cyan-500",isPulse:!0},z={backgroundColorCssClass:"dark:bg-green-600",borderColorCssClass:"dark:border-green-600",textColorCssClass:"dark:text-green-600",isPulse:!1},w={backgroundColorCssClass:"dark:bg-red-600",borderColorCssClass:"dark:border-red-600",textColorCssClass:"dark:text-red-600",isPulse:!1},N=(e,s)=>{let t=4===s?w:void 0,r=[t||(0===s?y:z)];return e||r.push(t||(s<2?y:z)),r.push(t||(s<3?y:z)),r},T={0:{title:"Pending",backgroundColorCssClass:"dark:bg-cyan-700"},1:{title:"Created",backgroundColorCssClass:"dark:bg-cyan-700"},2:{title:"Sealed",backgroundColorCssClass:"dark:bg-cyan-700"},3:{title:"Completed",backgroundColorCssClass:"dark:bg-green-700"},4:{title:"Failed",backgroundColorCssClass:"dark:bg-red-800"}},S=e=>{let s,t,r,a;let[i,o]=(0,n.useState)(!1),c=(0,n.useMemo)(()=>N(e.isDeposit,e.status),[e.isDeposit,e.status]),p=e.onFinishWithdrawing,k=(0,n.useCallback)(()=>{o(!0),p().catch(m.Bi).finally(()=>o(!1))},[p]);return e.isDeposit?(s=e.tezosOperationHash,t=e.etherlinkOperationHash,r=e.tezosOperationTimestamp,a=e.etherlinkOperationTimestamp):(s=e.etherlinkOperationHash,t=e.tezosOperationHash,r=e.etherlinkOperationTimestamp,a=e.tezosOperationTimestamp),(0,l.jsxs)("div",{className:"flex flex-col w-full max-w-xl p-4 my-4 rounded-xl overflow-hidden dark:text-gray-100 dark:bg-slate-800",children:[(0,l.jsxs)("div",{className:"flex justify-between items-center text-lg",children:[(0,l.jsx)("div",{className:"flex items-center",children:e.token&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("span",{className:"mr-1.5",children:m.S9.convertTokensRawAmountToAmount(e.amount,e.token.decimals)}),"native"!==e.token.type?(0,l.jsx)(h,{href:m.Yz.getTokenExplorerUrl(e.token),showArrowIcon:!1,children:(0,l.jsx)(g.L,{token:e.token,iconSize:17,iconClassName:"mr-0.5 -mt-0.5"})}):(0,l.jsx)(g.L,{token:e.token,iconSize:17,iconClassName:"mr-0.5 -mt-0.5"})]})}),(0,l.jsx)("div",{className:"-mt-4 -mr-4 pt-4 pr-2 pb-2 pl-2 w-32 rounded-bl-xl text-center ".concat(T[e.status].backgroundColorCssClass),children:T[e.status].title})]}),(0,l.jsx)("div",{className:"mt-6",children:(0,l.jsx)(d,{isDeposit:e.isDeposit,segments:c})}),(0,l.jsxs)("div",{className:"flex justify-between items-center mt-2",children:[(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)(f,{address:e.sourceAddress}),(0,l.jsx)(C,{type:b.LinkType.Address,value:e.sourceAddress})]}),(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)(f,{address:e.receiverAddress}),(0,l.jsx)(C,{type:b.LinkType.Address,value:e.receiverAddress})]})]}),(0,l.jsxs)("div",{className:"flex justify-between items-center mt-4",children:[s&&(0,l.jsx)(C,{type:b.LinkType.Operation,value:s,displayShortFirstPart:8,displayShortLastPart:5}),t?(0,l.jsx)(C,{type:b.LinkType.Operation,value:t,displayShortFirstPart:8,displayShortLastPart:5}):(0,l.jsx)(u,{rollupData:e.rollupData})]}),(0,l.jsxs)("div",{className:"flex justify-between items-center mt-1 text-xs",children:[r&&(0,l.jsx)("span",{children:new Date(r).toLocaleString()}),a&&(0,l.jsx)("span",{children:new Date(a).toLocaleString()})]}),2===e.status&&(0,l.jsx)("div",{className:"flex justify-center items-center",children:(0,l.jsx)("button",{className:"w-full mt-4 h-12 rounded-lg select-none cursor-pointer  dark:bg-blue-700 dark:hover:bg-blue-800 disabled:cursor-default disabled:opacity-70",onClick:k,disabled:i,children:(0,l.jsxs)("span",{className:"flex justify-center items-center",children:[i&&(0,l.jsx)(j.x,{className:"animate-spin h-5 w-5 mr-2 text-white"}),(0,l.jsx)("span",{children:"Complete Withdraw"})]})})}),e.error&&(0,l.jsx)(x,{message:e.error})]})};var D=t(56842),A=t(6143);let P={[D.hj.Pending]:a.Pending,[D.hj.Created]:a.Created,[D.hj.Sealed]:a.Sealed,[D.hj.Finished]:a.Finished,[D.hj.Failed]:a.Failed},F=e=>{let{bridgeTokenTransfer:s,onFinishWithdrawing:t}=e,r=s.kind===D.gu.Deposit,a=r?s.tezosOperation:s.etherlinkOperation,[i,o]=(0,n.useState)(),d=s.tezosOperation,c=s.etherlinkOperation,h=s.status===D.hj.Sealed?s.rollupData:void 0;(0,n.useEffect)(()=>o(void 0),[s.status]);let p=(0,n.useCallback)(()=>(o(void 0),s.status===D.hj.Sealed?t(s).catch(e=>{m.el.isUserAbortedWalletError(e)||o((0,m.e$)(e))}):Promise.resolve()),[s,t]);return(0,l.jsx)(S,{isDeposit:r,amount:a.amount,token:(0,A.uk)(a.token,r),status:P[s.status],sourceAddress:s.source,receiverAddress:s.receiver,tezosOperationHash:null==d?void 0:d.hash,tezosOperationTimestamp:null==d?void 0:d.timestamp,etherlinkOperationHash:null==c?void 0:c.hash,etherlinkOperationTimestamp:null==c?void 0:c.timestamp,rollupData:h,error:i,onFinishWithdrawing:p})}},6143:function(e,s,t){t.d(s,{uk:function(){return m},c3:function(){return o},OB:function(){return i},bX:function(){return n},TV:function(){return d}});var r={src:"/_next/static/media/ctez.76dc7655.png"},a={src:"/_next/static/media/fxhash.adc967f1.png"},l={src:"/_next/static/media/xtz.5d1f6ae4.png"};let n=[{tezos:{type:"native",name:"Tezos",ticker:"XTZ",decimals:6,iconUrl:l.src,ticketHelperContractAddress:"KT1DWVsu4Jtu2ficZ1qtNheGPunm5YVniegT"},etherlink:{type:"native",name:"Tezos",ticker:"XTZ",decimals:18,iconUrl:l.src}},{tezos:{type:"fa1.2",name:"Ctez",ticker:"CTEZ",address:"KT1LpdETWYvPWCQTR2FEW6jE6dVqJqxYjdeW",decimals:0,iconUrl:r.src,ticketerContractAddress:"KT1RvSp4yDKUABqWmv3pKGE9fA6iCGy7bqGh",ticketHelperContractAddress:"KT1DHLWJorW9WB6ztkx1XcoaJKWXeTu9yoR1"},etherlink:{type:"erc20",name:"Ctez",ticker:"CTEZ",address:"0x87dcBf128677ba36E79D47dAf4eb4e51610e0150",decimals:0,iconUrl:r.src}},{tezos:{type:"fa2",name:"fxhash, token: 42",ticker:"FXHASH_42",address:"KT195Eb8T524v5VJ99ZzH2wpnPfQ2wJfMi6h",tokenId:"42",decimals:0,iconUrl:a.src,ticketerContractAddress:"KT1VybveLaWhpQHKph28WcGwSy1ud22KSEan",ticketHelperContractAddress:"KT1DNtHLr9T9zksZjZvQwgtx5XJwrW9wzETB"},etherlink:{type:"erc20",name:"fxhash, token: 42",ticker:"FXHASH_42",address:"0xcB5d40c6B1bdf5Cd51b3801351b0A68D101a561b",decimals:0,iconUrl:a.src}}],i=n[0].tezos,o=n[0].etherlink,d=n.reduce((e,s)=>(e.push(s.tezos),e.push(s.etherlink),e),[]),c={};for(let e of n)"native"===e.tezos.type?(c.native||(c.native={}),c.native.tezos=e.tezos):(c[e.tezos.type]||(c[e.tezos.type]={}),"fa1.2"===e.tezos.type?c[e.tezos.type][e.tezos.address]=e.tezos:(c[e.tezos.type][e.tezos.address]||(c[e.tezos.type][e.tezos.address]={}),c[e.tezos.type][e.tezos.address][e.tezos.tokenId]=e.tezos)),"native"===e.etherlink.type?(c.native||(c.native={}),c.native.etherlink=e.etherlink):(c[e.etherlink.type]||(c[e.etherlink.type]={}),"erc20"===e.etherlink.type&&(c[e.etherlink.type][e.etherlink.address]=e.etherlink));let m=(e,s)=>{var t,r,a,l,n;return"native"===e.type?s?null===(t=c[e.type])||void 0===t?void 0:t.tezos:null===(r=c[e.type])||void 0===r?void 0:r.etherlink:e.address?"fa1.2"===e.type||"erc20"===e.type?null===(a=c[e.type])||void 0===a?void 0:a[e.address]:"fa2"===e.type&&e.tokenId?null===(n=c[e.type])||void 0===n?void 0:null===(l=n[e.address])||void 0===l?void 0:l[e.tokenId]:void 0:void 0}}}]);