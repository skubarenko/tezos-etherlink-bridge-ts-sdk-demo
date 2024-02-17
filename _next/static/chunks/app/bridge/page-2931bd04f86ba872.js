(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{45306:function(e,t,n){Promise.resolve().then(n.bind(n,94873))},94873:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return M}});var a,o,s=n(3827),l=n(24227),r=n(56842),i=n(64090),c=n(45681),d=n(62710),u=n(24370),k=n(73983);(a=o||(o={}))[a.None=0]="None",a[a.Loading=1]="Loading",a[a.TokenTransferring=2]="TokenTransferring",a[a.TezosAccountNotConnected=3]="TezosAccountNotConnected",a[a.EtherlinkWalletNotInstalled=4]="EtherlinkWalletNotInstalled",a[a.EtherlinkAccountNotConnected=5]="EtherlinkAccountNotConnected",a[a.EtherlinkAccountInvalidNetwork=6]="EtherlinkAccountInvalidNetwork",a[a.ZeroAmount=7]="ZeroAmount",a[a.NoTokens=8]="NoTokens",a[a.ZeroTokenBalance=9]="ZeroTokenBalance",a[a.ZeroNativeTokenBalance=10]="ZeroNativeTokenBalance",a[a.NotEnough=11]="NotEnough",a[a.UnknownError=100]="UnknownError";let m="dark:text-gray-100 disabled:dark:bg-blue-700 opacity-70",h="dark:text-gray-100 disabled:dark:bg-red-700 opacity-70",x={0:"cursor-pointer dark:text-gray-100 dark:bg-blue-700 dark:hover:bg-blue-800",1:m,2:m,3:m,4:m,5:m,6:m,7:m,8:m,9:h,10:h,11:h,100:h},f={0:["Deposit","Withdraw"],1:"Loading...",2:"Transferring...",3:"Please connect Tezos account",4:"Please install MetaMask wallet",5:"Please connect Etherlink account",6:"Please switch to ".concat(k.v.etherlink.networkName),7:"Enter amount",8:["Select token to deposit","Select token to withdraw"],9:"You have 0 tokens",10:["You have 0 XTZ in Tezos","You have 0 XTZ in Etherlink"],11:"Not enough",100:"Unknown Error"},g=(e,t)=>{let n=f[e];return"string"==typeof n?n:n[+!t]},p=(0,i.memo)(e=>{let t=g(e.disallowedState,e.isDeposit),n=0!==e.disallowedState;return(0,s.jsx)("button",{className:"mt-2 h-12 rounded-lg select-none ".concat(x[e.disallowedState]),disabled:n,onClick:e.onClick,children:(0,s.jsxs)("span",{className:"flex justify-center items-center",children:[(1===e.disallowedState||2===e.disallowedState)&&(0,s.jsx)(u.x,{className:"animate-spin h-5 w-5 mr-2 text-white"}),(0,s.jsx)("span",{children:t})]})})});var T=n(66212),w=n(2388),v=n(30433),N=n(35809);let b=(0,i.memo)(e=>{let t=e.tokenBalances.get(e.token)||"0";return(0,s.jsxs)(T.R.Option,{value:e.token,className:"flex w-full justify-between items-center px-2 py-2 text-nowrap first:rounded-t-lg last:rounded-b-lg hover:cursor-pointer dark:hover:bg-slate-800",children:[(0,s.jsx)(N.L,{className:"width",token:e.token,showName:!0}),(0,s.jsx)("span",{className:"text-left overflow-hidden overflow-ellipsis",children:t})]})}),j=()=>(0,s.jsxs)("div",{className:"flex w-full items-center px-4 py-2.5 font-medium rounded-lg text-gray-100 bg-slate-700 hover:cursor-not-allowed hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-800",children:[(0,s.jsx)("span",{className:"text-nowrap select-none",children:"No Tokens"}),(0,s.jsx)(v.Z,{className:"h-5 w-5 ml-2 -mr-1","aria-hidden":"true"})]}),y=(0,i.memo)(e=>e.tokens.length&&e.currentToken?(0,s.jsxs)(T.R,{as:"div",value:e.currentToken,onChange:e.onTokenSelected,className:"relative inline-block text-left",children:[(0,s.jsxs)(T.R.Button,{className:"inline-flex justify-center items-center pl-2 pr-4 py-2 font-medium rounded-lg dark:text-gray-100 dark:bg-slate-700 dark:hover:bg-slate-800",children:[(0,s.jsx)(N.L,{className:"max-w-44 pl-2",token:e.currentToken}),(0,s.jsx)(v.Z,{className:"h-5 w-5 ml-2 -mr-1","aria-hidden":"true"})]}),(0,s.jsx)(w.u,{as:i.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:(0,s.jsx)(T.R.Options,{className:"absolute right-0 w-96 max-w-96 mt-2 origin-top-right rounded-lg border border-solid dark:bg-slate-700 dark:border-slate-500",children:e.tokens.map(t=>(0,s.jsx)(b,{token:t,tokenBalances:e.tokenBalances},t.ticker))})})]}):(0,s.jsx)(j,{}));var S=n(48707);let C=(0,i.memo)(e=>(0,s.jsxs)("div",{className:"flex flex-col w-full my-4 dark:text-gray-100",children:[(0,s.jsxs)("div",{className:"flex justify-between pr-4 mb-4",children:[(0,s.jsx)("span",{className:"font-medium text-slate-600 dark:text-slate-500",children:e.title}),(0,s.jsx)(S.f,{isTezos:e.isTezos})]}),(0,s.jsxs)("div",{className:"flex flex-col items-end px-4 py-2 rounded-lg border-solid dark:bg-slate-600",children:[(0,s.jsx)("div",{className:"flex w-full justify-between items-center mb-2",children:e.children}),(0,s.jsxs)("div",{className:"text-sm text-gray-300",children:["Balance: ",e.balance]})]})]}));var A=n(93349);let B=(0,i.memo)(e=>{let[t,n]=(0,i.useState)(""),a=e.currentToken?e.currentToken.decimals:0,o=e.currentToken&&e.tokenBalances.get(e.currentToken)||"0",l=e.onAmountChanged,r=(0,i.useCallback)(e=>{try{let t=A.S9.truncateTokensAmountToDecimals(e.target.value,a);n(t),l(t)}catch(e){}},[l,a]),c=(0,i.useCallback)(e=>{"0"===e.target.value&&(n(""),l(""))},[l]);return(0,s.jsx)(C,{title:"Transfer From",isTezos:e.isTezos,balance:o,children:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("input",{className:"w-full py-2 pr-3 bg-transparent text-2xl focus:outline-none",value:t,step:10**-a,type:"number",placeholder:"0.00",onChange:r,onBlur:c}),(0,s.jsx)("div",{className:"flex-none text-right",children:(0,s.jsx)(y,{tokens:e.blockchainTokens,currentToken:e.currentToken,tokenBalances:e.tokenBalances,onTokenSelected:e.onTokenSelected})})]})})}),E=(0,i.memo)(e=>{let t=e.targetToken&&e.tokenBalances.get(e.targetToken)||"0";return(0,s.jsx)(C,{title:"Transfer To",isTezos:e.isTezos,balance:t,children:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{className:"py-2 text-2xl w-full overflow-ellipsis overflow-hidden whitespace-nowrap",children:e.amount}),(0,s.jsx)("div",{className:"flex-none  text-right",children:e.targetToken?(0,s.jsx)(N.L,{className:"max-w-44 pl-2",token:e.targetToken}):(0,s.jsx)("span",{className:"text-nowrap select-none",children:"No Tokens"})})]})})});var z=n(24668),P=n(6143);let Z=(e,t,n)=>{if(!e||t.startsWith("-"))return Promise.resolve();let a=A.S9.convertTokensAmountToRawAmount(t,e.decimals);return a?n(a,e):Promise.resolve()},L=(0,i.memo)(e=>{let[t,n]=(0,i.useState)(!0),a=t?"tezos":"etherlink",l=t?"etherlink":"tezos",r=(0,i.useMemo)(()=>e.tokenPairs.map(e=>e[a]),[a,e.tokenPairs]),[u,m]=(0,i.useState)(r[0]||null),[h,x]=(0,i.useState)("0"),f=(0,i.useMemo)(()=>{var t;return(null===(t=e.tokenPairs.find(e=>e[a]===u))||void 0===t?void 0:t[l])||null},[u,a,l,e.tokenPairs]),[g,T]=(0,i.useState)(!1),[w,v]=(0,i.useState)(o.Loading);(0,i.useEffect)(()=>{if(e.isLoading&&v(o.Loading),g)v(o.TokenTransferring);else if(e.tezosAccountConnectionStatus===z.Z.NotConnected)v(o.TezosAccountNotConnected);else if(e.etherlinkAccountConnectionStatus===z.R.NotInstalled)v(o.EtherlinkWalletNotInstalled);else if(e.etherlinkAccountConnectionStatus===z.R.NotConnected)v(o.EtherlinkAccountNotConnected);else if(e.etherlinkAccountConnectionStatus===z.R.SwitchNetwork)v(o.EtherlinkAccountInvalidNetwork);else if(u){let n=A.S9.convertTokensAmountToRawAmount(h,u.decimals);if(n){let a=A.S9.convertTokensAmountToRawAmount(e.tokenBalances.get(u)||"",u.decimals),s=t?P.OB:P.c3;a?A.S9.convertTokensAmountToRawAmount(e.tokenBalances.get(s)||"",s.decimals)?n>a?v(o.NotEnough):v(o.None):v(o.ZeroNativeTokenBalance):v(o.ZeroTokenBalance)}else v(o.ZeroAmount)}else v(o.NoTokens)},[u,h,t,g,e.etherlinkAccountConnectionStatus,e.isLoading,e.tezosAccountConnectionStatus,e.tokenBalances]);let N=e.onDeposit,b=e.onWithdraw,j=(0,i.useCallback)(()=>{T(!0),Z(u,h,N).catch(A.Bi).finally(()=>T(!1))},[u,h,N]),y=(0,i.useCallback)(()=>{T(!0),Z(u,h,b).catch(A.Bi).finally(()=>T(!1))},[u,h,b]),S=(0,i.useCallback)(()=>{n(e=>!e),m(f)},[f]);return(0,s.jsxs)("div",{className:"flex flex-col w-full max-w-xl m-4 p-4 rounded-xl overflow-hidden dark:bg-slate-800",children:[(0,s.jsxs)("h2",{className:"text-2xl font-medium dark:text-gray-100",children:["Bridge",k.v.isTestnet&&(0,s.jsxs)("span",{className:"ml-3 px-3 py-1 rounded-xl text-lg dark:text-orange-100 dark:bg-orange-700",children:[(0,s.jsx)(d.Z,{className:"inline h-6 w-6 -mt-1 -ml-1 mr-1"}),"Testnet"]})]}),(0,s.jsx)(B,{isTezos:t,currentToken:u,blockchainTokens:r,tokenBalances:e.tokenBalances,onTokenSelected:m,onAmountChanged:x}),(0,s.jsx)("button",{className:"flex self-center items-center justify-center w-12 h-12 rounded-lg dark:text-gray-100 dark:bg-slate-600 dark:hover:bg-slate-700",onClick:S,children:(0,s.jsx)(c.Z,{className:"h-7 w-7"})}),(0,s.jsx)(E,{isTezos:!t,amount:h||"0",targetToken:f,tokenBalances:e.tokenBalances}),(0,s.jsx)(p,{isDeposit:t,disallowedState:w,onClick:t?j:y})]})}),R=e=>(0,s.jsxs)("div",{className:"w-full max-w-xl p-4 my-4 rounded-xl overflow-hidden dark:text-red-100 dark:bg-red-900",children:[(0,s.jsx)("h3",{className:"text-xl font-medium mb-2",children:"Error"}),e.message]});var W=n(87167),I=n(85021);let F=e=>t=>t&&r.P6.getInitialOperationHash(t)===r.P6.getInitialOperationHash(e)?e:t,O=new Map,D=async(e,t,n)=>{let a=await Promise.all([t&&e.data.getBalances(t,P.TV),n&&e.data.getBalances(n,P.TV)]),o=new Map,s=!0;for(let e of a)e&&e.tokenBalances.forEach(e=>{let t=(0,P.uk)(e.token,s);t&&o.set(t,A.S9.convertTokensRawAmountToAmount(e.balance,t.decimals))}),s=!1;return o};function M(){let[e,t]=(0,i.useState)(O),[n,a]=(0,i.useState)(),[o,c]=(0,i.useState)(),{connectionStatus:d,address:u}=(0,I.EP)(),{connectionStatus:k,address:m}=(0,I.Mw)(),h=(0,I.bp)(),{dispatch:x}=(0,I.SH)(),f=null==h?void 0:h.tokenBridge;(0,i.useEffect)(()=>{f&&D(f,m,u).then(e=>t(e))},[u,m,f]);let g=(0,i.useCallback)(e=>{let n=r.P6.getInitialOperationHash(e);console.log("Token Transfer Updated",n,e.kind,e.status),a(F(e)),f&&D(f,m,u).then(e=>t(e)),e.status===r.hj.Finished&&(console.log("Unsubscribe from the ".concat(n," token transfer")),null==f||f.stream.unsubscribeFromTokenTransfer(e))},[f,u,m]);(0,i.useEffect)(()=>{if(f)return f.addEventListener("tokenTransferUpdated",g),()=>{f.removeEventListener("tokenTransferUpdated",g)}},[f,g]);let p=(0,i.useCallback)(async(e,t,n)=>{if(f)try{if(a(void 0),c(void 0),"native"!==t.type&&"fa1.2"!==t.type&&"fa2"!==t.type)return;console.log("Deposit",e,t,n);let{tokenTransfer:o}=await f.deposit(e,t);a(o),x({type:"added-or-updated",payload:o}),f.stream.subscribeToTokenTransfer(o)}catch(e){if(e instanceof l.Rd)return;a(void 0),c((0,A.e$)(e))}},[f,x]),T=(0,i.useCallback)(async(e,t,n)=>{if(f)try{if(a(void 0),c(void 0),"native"===t.type)throw Error("Native Etherlink token withdrawal is not yet supported.");if("erc20"!==t.type)return;console.log("Withdraw",e,t,n);let{tokenTransfer:o}=await f.startWithdraw(e,t);a(o),x({type:"added-or-updated",payload:o}),f.stream.subscribeToTokenTransfer(o)}catch(e){a(void 0),c((0,A.e$)(e))}},[f,x]),w=(0,i.useCallback)(async e=>{if(!f)return;let t=await f.finishWithdraw(e);await t.finishWithdrawOperation.confirmation()},[f]);return(0,s.jsxs)("main",{className:"flex flex-col justify-center items-center pt-6",children:[(0,s.jsx)(L,{isLoading:!!f,tezosAccountConnectionStatus:k,etherlinkAccountConnectionStatus:d,onDeposit:p,onWithdraw:T,tokenPairs:P.bX,tokenBalances:e}),o&&(0,s.jsx)(R,{message:o}),n&&(0,s.jsxs)("div",{className:"w-full max-w-xl",children:[(0,s.jsx)("h2",{className:"text-2xl font-medium dark:text-gray-100",children:"Last Transfer"}),(0,s.jsx)(W.Gv,{bridgeTokenTransfer:n,onFinishWithdrawing:w})]})]})}}},function(e){e.O(0,[283,660,227,326,291,181,129,971,69,744],function(){return e(e.s=45306)}),_N_E=e.O()}]);