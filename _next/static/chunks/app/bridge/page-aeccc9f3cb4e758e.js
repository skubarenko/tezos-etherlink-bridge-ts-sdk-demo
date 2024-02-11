(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{35883:function(){},52361:function(){},94616:function(){},45306:function(e,t,s){Promise.resolve().then(s.bind(s,94873))},94873:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return I}});var n,a,o=s(3827),l=s(24227),r=s(54333),i=s(64090),c=s(45681),d=s(62710),u=s(24370),m=s(73983);(n=a||(a={}))[n.None=0]="None",n[n.Loading=1]="Loading",n[n.TokenTransferring=2]="TokenTransferring",n[n.TezosAccountNotConnected=3]="TezosAccountNotConnected",n[n.EtherlinkWalletNotInstalled=4]="EtherlinkWalletNotInstalled",n[n.EtherlinkAccountNotConnected=5]="EtherlinkAccountNotConnected",n[n.EtherlinkAccountInvalidNetwork=6]="EtherlinkAccountInvalidNetwork",n[n.ZeroAmount=7]="ZeroAmount",n[n.NoTokens=8]="NoTokens",n[n.ZeroTokenBalance=9]="ZeroTokenBalance",n[n.ZeroNativeTokenBalance=10]="ZeroNativeTokenBalance",n[n.NotEnough=11]="NotEnough",n[n.UnknownError=100]="UnknownError";let h="dark:text-gray-100 disabled:dark:bg-blue-700 opacity-70",k="dark:text-gray-100 disabled:dark:bg-red-700 opacity-70",x={0:"cursor-pointer dark:text-gray-100 dark:bg-blue-700 dark:hover:bg-blue-800",1:h,2:h,3:h,4:h,5:h,6:h,7:h,8:h,9:k,10:k,11:k,100:k},p={0:["Deposit","Withdraw"],1:"Loading...",2:"Transferring...",3:"Please connect Tezos account",4:"Please install MetaMask wallet",5:"Please connect Etherlink account",6:"Please switch to ".concat(m.v.etherlink.networkName),7:"Enter amount",8:["Select token to deposit","Select token to withdraw"],9:"You have 0 tokens",10:["You have 0 XTZ in Tezos","You have 0 XTZ in Etherlink"],11:"Not enough",100:"Unknown Error"},f=(e,t)=>{let s=p[e];return"string"==typeof s?s:s[+!t]},g=(0,i.memo)(e=>{let t=f(e.disallowedState,e.isDeposit),s=0!==e.disallowedState;return(0,o.jsx)("button",{className:"mt-2 h-12 rounded-lg select-none ".concat(x[e.disallowedState]),disabled:s,onClick:e.onClick,children:(0,o.jsxs)("span",{className:"flex justify-center items-center",children:[(1===e.disallowedState||2===e.disallowedState)&&(0,o.jsx)(u.x,{className:"animate-spin h-5 w-5 mr-2 text-white"}),(0,o.jsx)("span",{children:t})]})})});var b=s(66212),v=s(2388),j=s(30433),w=s(35809);let N=(0,i.memo)(e=>{let t=e.tokenBalances.get(e.token)||"0";return(0,o.jsxs)(b.R.Option,{value:e.token,className:"flex w-full justify-between items-center px-2 py-2 text-nowrap first:rounded-t-lg last:rounded-b-lg hover:cursor-pointer dark:hover:bg-slate-800",children:[(0,o.jsx)(w.L,{className:"width",token:e.token,showName:!0}),(0,o.jsx)("span",{className:"text-left overflow-hidden overflow-ellipsis",children:t})]})}),C=()=>(0,o.jsxs)("div",{className:"flex w-full items-center px-4 py-2.5 font-medium rounded-lg text-gray-100 bg-slate-700 hover:cursor-not-allowed hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-800",children:[(0,o.jsx)("span",{className:"text-nowrap select-none",children:"No Tokens"}),(0,o.jsx)(j.Z,{className:"h-5 w-5 ml-2 -mr-1","aria-hidden":"true"})]}),T=(0,i.memo)(e=>e.tokens.length&&e.currentToken?(0,o.jsxs)(b.R,{as:"div",value:e.currentToken,onChange:e.onTokenSelected,className:"relative inline-block text-left",children:[(0,o.jsxs)(b.R.Button,{className:"inline-flex justify-center items-center pl-2 pr-4 py-2 font-medium rounded-lg dark:text-gray-100 dark:bg-slate-700 dark:hover:bg-slate-800",children:[(0,o.jsx)(w.L,{className:"max-w-44 pl-2",token:e.currentToken}),(0,o.jsx)(j.Z,{className:"h-5 w-5 ml-2 -mr-1","aria-hidden":"true"})]}),(0,o.jsx)(v.u,{as:i.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:(0,o.jsx)(b.R.Options,{className:"absolute right-0 w-96 max-w-96 mt-2 origin-top-right rounded-lg border border-solid dark:bg-slate-700 dark:border-slate-500",children:e.tokens.map(t=>(0,o.jsx)(N,{token:t,tokenBalances:e.tokenBalances},t.ticker))})})]}):(0,o.jsx)(C,{}));var y=s(48707);let S=(0,i.memo)(e=>(0,o.jsxs)("div",{className:"flex flex-col w-full my-4 dark:text-gray-100",children:[(0,o.jsxs)("div",{className:"flex justify-between pr-4 mb-4",children:[(0,o.jsx)("span",{className:"font-medium text-slate-600 dark:text-slate-500",children:e.title}),(0,o.jsx)(y.f,{isTezos:e.isTezos})]}),(0,o.jsxs)("div",{className:"flex flex-col items-end px-4 py-2 rounded-lg border-solid dark:bg-slate-600",children:[(0,o.jsx)("div",{className:"flex w-full justify-between items-center mb-2",children:e.children}),(0,o.jsxs)("div",{className:"text-sm text-gray-300",children:["Balance: ",e.balance]})]})]}));var z=s(93349);let A=(0,i.memo)(e=>{let[t,s]=(0,i.useState)(""),n=e.currentToken?e.currentToken.decimals:0,a=e.currentToken&&e.tokenBalances.get(e.currentToken)||"0",l=e.onAmountChanged,r=(0,i.useCallback)(e=>{try{let t=z.S9.truncateTokensAmountToDecimals(e.target.value,n);s(t),l(t)}catch(e){}},[l,n]),c=(0,i.useCallback)(e=>{"0"===e.target.value&&(s(""),l(""))},[l]);return(0,o.jsx)(S,{title:"Transfer From",isTezos:e.isTezos,balance:a,children:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("input",{className:"w-full py-2 pr-3 bg-transparent text-2xl focus:outline-none",value:t,step:10**-n,type:"number",placeholder:"0.00",onChange:r,onBlur:c}),(0,o.jsx)("div",{className:"flex-none text-right",children:(0,o.jsx)(T,{tokens:e.blockchainTokens,currentToken:e.currentToken,tokenBalances:e.tokenBalances,onTokenSelected:e.onTokenSelected})})]})})}),E=(0,i.memo)(e=>{let t=e.targetToken&&e.tokenBalances.get(e.targetToken)||"0";return(0,o.jsx)(S,{title:"Transfer To",isTezos:e.isTezos,balance:t,children:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{className:"py-2 text-2xl w-full overflow-ellipsis overflow-hidden whitespace-nowrap",children:e.amount}),(0,o.jsx)("div",{className:"flex-none  text-right",children:e.targetToken?(0,o.jsx)(w.L,{className:"max-w-44 pl-2",token:e.targetToken}):(0,o.jsx)("span",{className:"text-nowrap select-none",children:"No Tokens"})})]})})});var B=s(24668),P=s(6143);let D=(e,t,s)=>{if(!e||t.startsWith("-"))return Promise.resolve();let n=z.S9.convertTokensAmountToRawAmount(t,e.decimals);return n?s(n,e):Promise.resolve()},O=(0,i.memo)(e=>{let[t,s]=(0,i.useState)(!0),n=t?"tezos":"etherlink",l=t?"etherlink":"tezos",r=(0,i.useMemo)(()=>e.tokenPairs.map(e=>e[n]),[n,e.tokenPairs]),[u,h]=(0,i.useState)(r[0]||null),[k,x]=(0,i.useState)("0"),p=(0,i.useMemo)(()=>{var t;return(null===(t=e.tokenPairs.find(e=>e[n]===u))||void 0===t?void 0:t[l])||null},[u,n,l,e.tokenPairs]),[f,b]=(0,i.useState)(!1),[v,j]=(0,i.useState)(a.Loading);(0,i.useEffect)(()=>{if(e.isLoading&&j(a.Loading),f)j(a.TokenTransferring);else if(e.tezosAccountConnectionStatus===B.Z.NotConnected)j(a.TezosAccountNotConnected);else if(e.etherlinkAccountConnectionStatus===B.R.NotInstalled)j(a.EtherlinkWalletNotInstalled);else if(e.etherlinkAccountConnectionStatus===B.R.NotConnected)j(a.EtherlinkAccountNotConnected);else if(e.etherlinkAccountConnectionStatus===B.R.SwitchNetwork)j(a.EtherlinkAccountInvalidNetwork);else if(u){let s=z.S9.convertTokensAmountToRawAmount(k,u.decimals);if(s){let n=z.S9.convertTokensAmountToRawAmount(e.tokenBalances.get(u)||"",u.decimals),o=t?P.OB:P.c3;n?z.S9.convertTokensAmountToRawAmount(e.tokenBalances.get(o)||"",o.decimals)?s>n?j(a.NotEnough):j(a.None):j(a.ZeroNativeTokenBalance):j(a.ZeroTokenBalance)}else j(a.ZeroAmount)}else j(a.NoTokens)},[u,k,t,f,e.etherlinkAccountConnectionStatus,e.isLoading,e.tezosAccountConnectionStatus,e.tokenBalances]);let w=e.onDeposit,N=e.onWithdraw,C=(0,i.useCallback)(()=>{b(!0),D(u,k,w).catch(z.Bi).finally(()=>b(!1))},[u,k,w]),T=(0,i.useCallback)(()=>{b(!0),D(u,k,N).catch(z.Bi).finally(()=>b(!1))},[u,k,N]),y=(0,i.useCallback)(()=>{s(e=>!e),h(p)},[p]);return(0,o.jsxs)("div",{className:"flex flex-col w-full max-w-xl m-4 p-4 rounded-xl overflow-hidden dark:bg-slate-800",children:[(0,o.jsxs)("h2",{className:"text-2xl font-medium dark:text-gray-100",children:["Bridge",m.v.isTestnet&&(0,o.jsxs)("span",{className:"ml-3 px-3 py-1 rounded-xl text-lg dark:text-orange-100 dark:bg-orange-700",children:[(0,o.jsx)(d.Z,{className:"inline h-6 w-6 -mt-1 -ml-1 mr-1"}),"Testnet"]})]}),(0,o.jsx)(A,{isTezos:t,currentToken:u,blockchainTokens:r,tokenBalances:e.tokenBalances,onTokenSelected:h,onAmountChanged:x}),(0,o.jsx)("button",{className:"flex self-center items-center justify-center w-12 h-12 rounded-lg dark:text-gray-100 dark:bg-slate-600 dark:hover:bg-slate-700",onClick:y,children:(0,o.jsx)(c.Z,{className:"h-7 w-7"})}),(0,o.jsx)(E,{isTezos:!t,amount:k||"0",targetToken:p,tokenBalances:e.tokenBalances}),(0,o.jsx)(g,{isDeposit:t,disallowedState:v,onClick:t?C:T})]})}),F=e=>(0,o.jsxs)("div",{className:"w-full max-w-xl p-4 my-4 rounded-xl overflow-hidden dark:text-red-100 dark:bg-red-900",children:[(0,o.jsx)("h3",{className:"text-xl font-medium mb-2",children:"Error"}),e.message]});var L=s(87167),Z=s(85021);let R=new Map,W=e=>t=>t&&r.P6.getInitialOperationHash(t)!==r.P6.getInitialOperationHash(e)?t:e;function I(){let[e,t]=(0,i.useState)(R),[s,n]=(0,i.useState)(),[a,c]=(0,i.useState)(),{connectionStatus:d}=(0,Z.EP)(),{connectionStatus:u}=(0,Z.Mw)(),m=(0,Z.bp)(),h=null==m?void 0:m.tokenBridge;(0,i.useEffect)(()=>{t(new Map().set(P.bX[0].tezos,"10.1043").set(P.bX[0].etherlink,"1").set(P.bX[1].tezos,"143").set(P.bX[1].etherlink,"245").set(P.bX[2].tezos,"0"))},[]);let k=(0,i.useCallback)(e=>{let t=r.P6.getInitialOperationHash(e);console.log("Token Transfer Updated",t,e.kind,e.status),n(W(e)),e.status===r.hj.Finished&&(console.log("Unsubscribe from the ".concat(t," token transfer")),null==h||h.unsubscribeFromTokenTransfer(e))},[h]);(0,i.useEffect)(()=>{if(h)return h.events.tokenTransferUpdated.addListener(k),()=>{h.events.tokenTransferUpdated.removeListener(k)}},[h,k]);let x=(0,i.useCallback)(async(e,t,s)=>{if(h)try{if(n(void 0),c(void 0),"native"!==t.type&&"fa1.2"!==t.type&&"fa2"!==t.type)return;console.log("Deposit",e,t,s);let{tokenTransfer:a}=await h.deposit(e,t);n(W(a)),h.subscribeToTokenTransfer(a)}catch(e){if(e instanceof l.Rd)return;n(void 0),c((0,z.e$)(e))}},[h]),p=(0,i.useCallback)(async(e,t,s)=>{if(h)try{if(n(void 0),c(void 0),"native"===t.type)throw Error("Native Etherlink token withdrawal is not yet supported.");if("erc20"!==t.type)return;console.log("Withdraw",e,t,s);let{tokenTransfer:a}=await h.startWithdraw(e,t);n(W(a)),h.subscribeToTokenTransfer(a)}catch(e){n(void 0),c((0,z.e$)(e))}},[h]),f=(0,i.useCallback)(async e=>{h&&await h.finishWithdraw(e)},[h]);return(0,o.jsxs)("main",{className:"flex flex-col justify-center items-center pt-6",children:[(0,o.jsx)(O,{isLoading:!!h,tezosAccountConnectionStatus:u,etherlinkAccountConnectionStatus:d,onDeposit:x,onWithdraw:p,tokenPairs:P.bX,tokenBalances:e}),a&&(0,o.jsx)(F,{message:a}),s&&(0,o.jsxs)("div",{className:"w-full max-w-xl",children:[(0,o.jsx)("h2",{className:"text-2xl font-medium dark:text-gray-100",children:"Last Transfer"}),(0,o.jsx)(L.Gv,{bridgeTokenTransfer:s,onFinishWithdrawing:f})]})]})}},35809:function(e,t,s){"use strict";s.d(t,{L:function(){return l}});var n=s(3827),a=s(64090),o=s(93349);let l=(0,a.memo)(e=>{let t=e.iconSize||32,s=e.iconClassName||"mr-2";return(0,n.jsxs)("span",{className:(0,o.Nn)("inline-flex items-center justify-center text-nowrap",e.className),children:[(0,n.jsx)("img",{src:e.token.iconUrl,alt:e.token.name,width:t,height:t,className:(0,o.Nn)("inline rounded-full",s)}),e.showName?(0,n.jsxs)("span",{className:"inline-flex flex-col overflow-hidden",children:[(0,n.jsx)("span",{className:"overflow-hidden overflow-ellipsis",children:e.token.ticker}),(0,n.jsx)("span",{className:"text-sm overflow-hidden overflow-ellipsis",children:e.token.name})]}):(0,n.jsx)("span",{className:"overflow-hidden overflow-ellipsis",children:e.token.ticker})]})})},87167:function(e,t,s){"use strict";s.d(t,{Gv:function(){return A}});var n,a,o=s(3827),l=s(64090),r=s(39643),i=s(48707);let c=(0,l.memo)(e=>{let t=e.segments[e.segments.length-1];return(0,o.jsxs)("div",{className:"flex justify-between items-center",children:[(0,o.jsx)(i.f,{isTezos:e.isDeposit}),(0,o.jsxs)("div",{className:"flex-grow flex justify-between items-center ml-2",children:[e.segments.map((e,t)=>(0,o.jsxs)(l.Fragment,{children:[t>0&&(0,o.jsx)("div",{className:"flex-none h-2 w-2 rotate-45 ".concat(e.backgroundColorCssClass," ").concat(e.isPulse?"animate-progress":"")}),(0,o.jsx)("hr",{className:"w-full border-dotted border-t-2 ".concat(e.borderColorCssClass," ").concat(e.isPulse?"animate-progress":"")})]},t)),t&&(0,o.jsx)(r.Z,{width:18,height:18,className:"flex-none -ml-2 ".concat(t.textColorCssClass," ").concat(t.isPulse?"animate-progress":"")})]}),(0,o.jsx)(i.f,{isTezos:!e.isDeposit})]})});var d=s(91705),u=s(93349);let m=e=>{let{showArrowIcon:t,...s}=e;return(0,o.jsxs)("a",{...s,target:"_blank",rel:"noreferrer",className:"".concat((0,u.Nn)("flex items-center dark:text-violet-300 dark:hover:text-violet-400",s.className)),children:[s.children,(null==t||t)&&(0,o.jsx)(d.Z,{className:"inline h-4 w-4 ml-1 -mb-0.5"})]})};var h=s(73983);let k=e=>{if(!e.rollupData||!e.rollupData.commitment||!e.rollupData.proof)return null;let t="".concat(h.v.bridgeSmartRollupNodeBaseUrl,"/global/block/head/helpers/proofs/outbox/").concat(e.rollupData.outboxMessageLevel,"/messages?index=").concat(e.rollupData.outboxMessageIndex);return(0,o.jsx)(m,{href:t,children:"Rollup Data"})},x=e=>(0,o.jsxs)("div",{className:"mt-4 -mb-4 -mx-4 pt-4 pl-4 pb-2 rounded-b-xl overflow-hidden dark:text-red-100 dark:bg-red-900",children:[(0,o.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Error, please try again"}),e.message]}),p=l.memo(e=>{var t;let s=null===(t=e.displayShort)||void 0===t||t;return(0,o.jsx)(m,{href:u.Yz.getExplorerUrl(e.value,e.type,e.explorer),className:"font-mono",children:(0,o.jsx)("span",{children:s?u.sG.getShortText(e.value,6,4):e.value})})});var f=s(35809),g=s(24370),b=s(59588);(n=a||(a={}))[n.Pending=0]="Pending",n[n.Created=1]="Created",n[n.Sealed=2]="Sealed",n[n.Finished=3]="Finished",n[n.Failed=4]="Failed";let v={backgroundColorCssClass:"dark:bg-cyan-500",borderColorCssClass:"dark:border-cyan-500",textColorCssClass:"dark:text-cyan-500",isPulse:!0},j={backgroundColorCssClass:"dark:bg-green-600",borderColorCssClass:"dark:border-green-600",textColorCssClass:"dark:text-green-600",isPulse:!1},w={backgroundColorCssClass:"dark:bg-red-600",borderColorCssClass:"dark:border-red-600",textColorCssClass:"dark:text-red-600",isPulse:!1},N=(e,t)=>{let s=4===t?w:void 0,n=[s||(0===t?v:j)];return e||n.push(s||(t<2?v:j)),n.push(s||(t<3?v:j)),n},C={0:{title:"Pending",backgroundColorCssClass:"dark:bg-cyan-700"},1:{title:"Created",backgroundColorCssClass:"dark:bg-cyan-700"},2:{title:"Sealed",backgroundColorCssClass:"dark:bg-cyan-700"},3:{title:"Completed",backgroundColorCssClass:"dark:bg-green-700"},4:{title:"Failed",backgroundColorCssClass:"dark:bg-red-800"}},T=e=>{let t,s,n,a;let[r,i]=(0,l.useState)(!1),d=(0,l.useMemo)(()=>N(e.isDeposit,e.status),[e.isDeposit,e.status]),h=e.onFinishWithdrawing,v=(0,l.useCallback)(()=>{i(!0),h().catch(u.Bi).finally(()=>i(!1))},[h]);return e.isDeposit?(t=e.tezosOperationHash,s=e.etherlinkOperationHash,n=e.tezosOperationTimestamp,a=e.etherlinkOperationTimestamp):(t=e.etherlinkOperationHash,s=e.tezosOperationHash,n=e.etherlinkOperationTimestamp,a=e.tezosOperationTimestamp),(0,o.jsxs)("div",{className:"flex flex-col w-full max-w-xl p-4 my-4 rounded-xl overflow-hidden dark:text-gray-100 dark:bg-slate-800",children:[(0,o.jsxs)("div",{className:"flex justify-between items-center text-lg",children:[(0,o.jsx)("div",{className:"flex items-center",children:e.token&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{className:"mr-1.5",children:u.S9.convertTokensRawAmountToAmount(e.amount,e.token.decimals)}),"native"!==e.token.type?(0,o.jsx)(m,{href:u.Yz.getTokenExplorerUrl(e.token),showArrowIcon:!1,children:(0,o.jsx)(f.L,{token:e.token,iconSize:17,iconClassName:"mr-0.5 -mt-0.5"})}):(0,o.jsx)(f.L,{token:e.token,iconSize:17,iconClassName:"mr-0.5 -mt-0.5"})]})}),(0,o.jsx)("div",{className:"-mt-4 -mr-4 pt-4 pr-2 pb-2 pl-2 w-32 rounded-bl-xl text-center ".concat(C[e.status].backgroundColorCssClass),children:C[e.status].title})]}),(0,o.jsx)("div",{className:"mt-6",children:(0,o.jsx)(c,{isDeposit:e.isDeposit,segments:d})}),(0,o.jsxs)("div",{className:"flex justify-between items-center mt-4",children:[t&&(0,o.jsx)(p,{type:b.LinkType.Operation,value:t}),s?(0,o.jsx)(p,{type:b.LinkType.Operation,value:s}):(0,o.jsx)(k,{rollupData:e.rollupData})]}),(0,o.jsxs)("div",{className:"flex justify-between items-center mt-1 text-xs",children:[n&&(0,o.jsx)("span",{children:n}),a&&(0,o.jsx)("span",{children:a})]}),2===e.status&&(0,o.jsx)("div",{className:"flex justify-center items-center",children:(0,o.jsx)("button",{className:"w-full mt-4 h-12 rounded-lg select-none cursor-pointer  dark:bg-blue-700 dark:hover:bg-blue-800 disabled:cursor-default disabled:opacity-70",onClick:v,disabled:r,children:(0,o.jsxs)("span",{className:"flex justify-center items-center",children:[r&&(0,o.jsx)(g.x,{className:"animate-spin h-5 w-5 mr-2 text-white"}),(0,o.jsx)("span",{children:"Complete Withdraw"})]})})}),e.error&&(0,o.jsx)(x,{message:e.error})]})};var y=s(54333),S=s(6143);let z={[y.hj.Pending]:a.Pending,[y.hj.Created]:a.Created,[y.hj.Sealed]:a.Sealed,[y.hj.Finished]:a.Finished,[y.hj.Failed]:a.Failed},A=e=>{let{bridgeTokenTransfer:t,onFinishWithdrawing:s}=e,n=t.kind===y.gu.Deposit,a=n?t.tezosOperation:t.etherlinkOperation,[r,i]=(0,l.useState)(),c=t.tezosOperation,d=t.etherlinkOperation,m=t.status===y.hj.Sealed?t.rollupData:void 0;(0,l.useEffect)(()=>i(void 0),[t.status]);let h=(0,l.useCallback)(()=>(i(void 0),t.status===y.hj.Sealed?s(t).catch(e=>i((0,u.e$)(e))):Promise.resolve()),[t,s]);return(0,o.jsx)(T,{isDeposit:n,amount:a.amount,token:(0,S.uk)(a.token,n),status:z[t.status],tezosOperationHash:null==c?void 0:c.hash,tezosOperationTimestamp:null==c?void 0:c.timestamp,etherlinkOperationHash:null==d?void 0:d.hash,etherlinkOperationTimestamp:null==d?void 0:d.timestamp,rollupData:m,error:r,onFinishWithdrawing:h})}}},function(e){e.O(0,[844,283,868,227,465,291,442,102,971,69,744],function(){return e(e.s=45306)}),_N_E=e.O()}]);