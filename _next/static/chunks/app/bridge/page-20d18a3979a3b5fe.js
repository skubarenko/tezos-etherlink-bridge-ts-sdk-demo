(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{45306:function(e,t,n){Promise.resolve().then(n.bind(n,94873))},94873:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return D}});var a,o,s=n(3827),r=n(56842),l=n(64090),i=n(45681),c=n(62710),d=n(24370),u=n(73983);(a=o||(o={}))[a.None=0]="None",a[a.Loading=1]="Loading",a[a.TokenTransferring=2]="TokenTransferring",a[a.TezosAccountNotConnected=3]="TezosAccountNotConnected",a[a.EtherlinkAccountNotConnected=4]="EtherlinkAccountNotConnected",a[a.EtherlinkAccountInvalidNetwork=5]="EtherlinkAccountInvalidNetwork",a[a.ZeroAmount=6]="ZeroAmount",a[a.NoTokens=7]="NoTokens",a[a.ZeroTokenBalance=8]="ZeroTokenBalance",a[a.ZeroNativeTokenBalance=9]="ZeroNativeTokenBalance",a[a.NotEnough=10]="NotEnough",a[a.UnknownError=100]="UnknownError";let k="dark:text-gray-100 disabled:dark:bg-blue-700 opacity-70",m="dark:text-gray-100 disabled:dark:bg-red-700 opacity-70",h={0:"cursor-pointer dark:text-gray-100 dark:bg-blue-700 dark:hover:bg-blue-800",1:k,2:k,3:k,4:k,5:k,6:k,7:k,8:m,9:m,10:m,100:m},x={0:["Deposit","Withdraw"],1:"Loading...",2:"Transferring...",3:"Please connect Tezos account",4:"Please connect Etherlink account",5:"Please switch to ".concat(u.v.etherlink.network.displayName),6:"Enter amount",7:["Select token to deposit","Select token to withdraw"],8:"You have 0 tokens",9:["You have 0 XTZ in Tezos","You have 0 XTZ in Etherlink"],10:"Not enough",100:"Unknown Error"},f=(e,t)=>{let n=x[e];return"string"==typeof n?n:n[+!t]},g=(0,l.memo)(e=>{let t=f(e.disallowedState,e.isDeposit),n=0!==e.disallowedState;return(0,s.jsx)("button",{className:"mt-2 h-12 rounded-lg select-none ".concat(h[e.disallowedState]),disabled:n,onClick:e.onClick,children:(0,s.jsxs)("span",{className:"flex justify-center items-center",children:[(1===e.disallowedState||2===e.disallowedState)&&(0,s.jsx)(d.x,{className:"animate-spin h-5 w-5 mr-2 text-white"}),(0,s.jsx)("span",{children:t})]})})});var p=n(66212),T=n(2388),w=n(30433),v=n(35809);let b=(0,l.memo)(e=>{let t=e.tokenBalances.get(e.token)||"0";return(0,s.jsxs)(p.R.Option,{value:e.token,className:"flex w-full justify-between items-center px-2 py-2 text-nowrap first:rounded-t-lg last:rounded-b-lg hover:cursor-pointer dark:hover:bg-slate-800",children:[(0,s.jsx)(v.L,{token:e.token,showName:!0}),(0,s.jsx)("span",{className:"ml-2 text-left overflow-hidden overflow-ellipsis",children:t})]})}),N=()=>(0,s.jsxs)("div",{className:"flex w-full items-center px-4 py-2.5 font-medium rounded-lg text-gray-100 bg-slate-700 hover:cursor-not-allowed hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-800",children:[(0,s.jsx)("span",{className:"text-nowrap select-none",children:"No Tokens"}),(0,s.jsx)(w.Z,{className:"h-5 w-5 ml-2 -mr-1","aria-hidden":"true"})]}),j=(0,l.memo)(e=>e.tokens.length&&e.currentToken?(0,s.jsxs)(p.R,{as:"div",value:e.currentToken,onChange:e.onTokenSelected,className:"relative inline-block text-left",children:[(0,s.jsxs)(p.R.Button,{className:"inline-flex justify-center items-center pl-2 pr-4 py-2 font-medium rounded-lg dark:text-gray-100 dark:bg-slate-700 dark:hover:bg-slate-800",children:[(0,s.jsx)(v.L,{className:"max-w-44 pl-2",token:e.currentToken}),(0,s.jsx)(w.Z,{className:"h-5 w-5 ml-2 -mr-1","aria-hidden":"true"})]}),(0,s.jsx)(T.u,{as:l.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:(0,s.jsx)(p.R.Options,{className:"absolute right-0 w-max mt-2 min-w-72 max-w-72 sm:max-w-96 origin-top-right rounded-lg border border-solid dark:bg-slate-700 dark:border-slate-500",children:e.tokens.map(t=>(0,s.jsx)(b,{token:t,tokenBalances:e.tokenBalances},t.ticker))})})]}):(0,s.jsx)(N,{}));var y=n(48707);let S=(0,l.memo)(e=>(0,s.jsxs)("div",{className:"flex flex-col w-full my-4 dark:text-gray-100",children:[(0,s.jsxs)("div",{className:"flex justify-between pr-4 mb-4",children:[(0,s.jsx)("span",{className:"font-medium text-slate-600 dark:text-slate-500",children:e.title}),(0,s.jsx)(y.f,{isTezos:e.isTezos})]}),(0,s.jsxs)("div",{className:"flex flex-col items-end px-4 py-2 rounded-lg border-solid dark:bg-slate-600",children:[(0,s.jsx)("div",{className:"flex w-full justify-between items-center mb-2",children:e.children}),(0,s.jsxs)("div",{className:"text-sm text-gray-300 max-w-full overflow-hidden overflow-ellipsis",children:["Balance: ",e.balance]})]})]}));var A=n(89521);let C=(0,l.memo)(e=>{let[t,n]=(0,l.useState)(""),a=e.currentToken?e.currentToken.decimals:0,o=e.currentToken&&e.tokenBalances.get(e.currentToken)||"0",r=e.onAmountChanged,i=(0,l.useCallback)(e=>{try{let t=A.S9.truncateTokensAmountToDecimals(e.target.value,a);n(t),r(t)}catch(e){}},[r,a]),c=(0,l.useCallback)(e=>{"0"===e.target.value&&(n(""),r(""))},[r]);return(0,s.jsx)(S,{title:"Transfer From",isTezos:e.isTezos,balance:o,children:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("input",{className:"w-full py-2 pr-3 bg-transparent text-2xl focus:outline-none",value:t,step:10**-a,type:"number",placeholder:"0.00",onChange:i,onBlur:c}),(0,s.jsx)("div",{className:"flex-none text-right",children:(0,s.jsx)(j,{tokens:e.blockchainTokens,currentToken:e.currentToken,tokenBalances:e.tokenBalances,onTokenSelected:e.onTokenSelected})})]})})}),B=(0,l.memo)(e=>{let t=e.targetToken&&e.tokenBalances.get(e.targetToken)||"0";return(0,s.jsx)(S,{title:"Transfer To",isTezos:e.isTezos,balance:t,children:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{className:"py-2 text-2xl w-full overflow-ellipsis overflow-hidden whitespace-nowrap",children:e.amount}),(0,s.jsx)("div",{className:"flex-none  text-right",children:e.targetToken?(0,s.jsx)(v.L,{className:"max-w-44 pl-2",token:e.targetToken}):(0,s.jsx)("span",{className:"text-nowrap select-none",children:"No Tokens"})})]})})});var E=n(24668),z=n(6143);let P=(e,t,n)=>{if(!e||t.startsWith("-"))return Promise.resolve();let a=A.S9.convertTokensAmountToRawAmount(t,e.decimals);return a?n(a,e):Promise.resolve()},Z=(0,l.memo)(e=>{let[t,n]=(0,l.useState)(!0),a=t?"tezos":"etherlink",r=t?"etherlink":"tezos",d=(0,l.useMemo)(()=>e.tokenPairs.map(e=>e[a]),[a,e.tokenPairs]),[k,m]=(0,l.useState)(d[0]||null),[h,x]=(0,l.useState)("0"),f=(0,l.useMemo)(()=>{var t;return(null===(t=e.tokenPairs.find(e=>e[a]===k))||void 0===t?void 0:t[r])||null},[k,a,r,e.tokenPairs]),[p,T]=(0,l.useState)(!1),[w,v]=(0,l.useState)(o.Loading);(0,l.useEffect)(()=>{if(e.isLoading&&v(o.Loading),p)v(o.TokenTransferring);else if(e.tezosAccountConnectionStatus===E.Z.NotConnected)v(o.TezosAccountNotConnected);else if(e.etherlinkAccountConnectionStatus===E.R.NotConnected)v(o.EtherlinkAccountNotConnected);else if(e.etherlinkAccountConnectionStatus===E.R.SwitchNetwork)v(o.EtherlinkAccountInvalidNetwork);else if(k){let n=A.S9.convertTokensAmountToRawAmount(h,k.decimals);if(n){let a=A.S9.convertTokensAmountToRawAmount(e.tokenBalances.get(k)||"",k.decimals),s=t?z.OB:z.c3;a?A.S9.convertTokensAmountToRawAmount(e.tokenBalances.get(s)||"",s.decimals)?n>a?v(o.NotEnough):v(o.None):v(o.ZeroNativeTokenBalance):v(o.ZeroTokenBalance)}else v(o.ZeroAmount)}else v(o.NoTokens)},[k,h,t,p,e.etherlinkAccountConnectionStatus,e.isLoading,e.tezosAccountConnectionStatus,e.tokenBalances]);let b=e.onDeposit,N=e.onWithdraw,j=(0,l.useCallback)(()=>{T(!0),P(k,h,b).catch(A.Bi).finally(()=>T(!1))},[k,h,b]),y=(0,l.useCallback)(()=>{T(!0),P(k,h,N).catch(A.Bi).finally(()=>T(!1))},[k,h,N]),S=(0,l.useCallback)(()=>{n(e=>!e),m(f)},[f]);return(0,s.jsxs)("div",{className:"flex flex-col w-full max-w-xl m-4 p-4 rounded-xl overflow-hidden dark:bg-slate-800",children:[(0,s.jsxs)("h2",{className:"text-2xl font-medium dark:text-gray-100",children:["Bridge",u.v.isTestnet&&(0,s.jsxs)("span",{className:"ml-3 px-3 py-1 rounded-xl text-lg dark:text-orange-100 dark:bg-orange-700",children:[(0,s.jsx)(c.Z,{className:"inline h-6 w-6 -mt-1 -ml-1 mr-1"}),"Testnet"]})]}),(0,s.jsx)(C,{isTezos:t,currentToken:k,blockchainTokens:d,tokenBalances:e.tokenBalances,onTokenSelected:m,onAmountChanged:x}),(0,s.jsx)("button",{className:"flex self-center items-center justify-center w-12 h-12 rounded-lg dark:text-gray-100 dark:bg-slate-600 dark:hover:bg-slate-700",onClick:S,children:(0,s.jsx)(i.Z,{className:"h-7 w-7"})}),(0,s.jsx)(B,{isTezos:!t,amount:h||"0",targetToken:f,tokenBalances:e.tokenBalances}),(0,s.jsx)(g,{isDeposit:t,disallowedState:w,onClick:t?j:y})]})}),L=e=>(0,s.jsxs)("div",{className:"w-full max-w-xl p-4 my-4 rounded-xl overflow-hidden dark:text-red-100 dark:bg-red-900",children:[(0,s.jsx)("h3",{className:"text-xl font-medium mb-2",children:"Error"}),e.message]});var R=n(59074),W=n(85021);let F=e=>t=>t&&r.P6.getInitialOperationHash(t)===r.P6.getInitialOperationHash(e)?e:t,O=new Map,U=async(e,t,n)=>{let a=await Promise.all([t&&e.data.getBalances(t,z.TV),n&&e.data.getBalances(n,z.TV)]),o=new Map,s=!0;for(let e of a)e&&e.tokenBalances.forEach(e=>{let t=(0,z.uk)(e.token,s);t&&o.set(t,A.S9.convertTokensRawAmountToAmount(e.balance,t.decimals))}),s=!1;return o};function D(){let[e,t]=(0,l.useState)(O),[n,a]=(0,l.useState)(),[o,i]=(0,l.useState)(),{connectionStatus:c,address:d}=(0,W.EP)(),{connectionStatus:u,address:k}=(0,W.Mw)(),m=(0,W.bp)(),{dispatch:h}=(0,W.SH)(),x=null==m?void 0:m.tokenBridge;(0,l.useEffect)(()=>{x&&U(x,k,d).then(e=>t(e))},[d,k,x]),(0,W.LI)(()=>{(n||o)&&window.scrollTo(0,document.body.scrollHeight)},[n,o]);let f=(0,l.useCallback)(e=>{let n=r.P6.getInitialOperationHash(e);console.log("Token Transfer Updated",n,e.kind,e.status),a(F(e)),x&&U(x,k,d).then(e=>t(e)),e.status===r.hj.Finished&&(console.log("Unsubscribe from the ".concat(n," token transfer")),null==x||x.stream.unsubscribeFromTokenTransfer(e))},[x,d,k]);(0,l.useEffect)(()=>{if(x)return x.addEventListener("tokenTransferUpdated",f),()=>{x.removeEventListener("tokenTransferUpdated",f)}},[x,f]);let g=(0,l.useCallback)(async(e,t,n)=>{if(x)try{if(a(void 0),i(void 0),"native"!==t.type&&"fa1.2"!==t.type&&"fa2"!==t.type)return;console.log("Deposit",e,t,n);let{tokenTransfer:o}=await x.deposit(e,t);a(o),h({type:"added-or-updated",payload:o}),x.stream.subscribeToTokenTransfer(o)}catch(e){if(A.el.isUserAbortedWalletError(e))return;a(void 0),i((0,A.e$)(e))}},[x,h]),p=(0,l.useCallback)(async(e,t,n)=>{if(x)try{if(a(void 0),i(void 0),"native"===t.type)throw Error("Native Etherlink token withdrawal is not yet supported.");if("erc20"!==t.type)return;console.log("Withdraw",e,t,n);let{tokenTransfer:o}=await x.startWithdraw(e,t);a(o),h({type:"added-or-updated",payload:o}),x.stream.subscribeToTokenTransfer(o)}catch(e){if(A.el.isUserAbortedWalletError(e))return;a(void 0),i((0,A.e$)(e))}},[x,h]),T=(0,l.useCallback)(async e=>{if(!x)return;let t=await x.finishWithdraw(e);await t.finishWithdrawOperation.confirmation()},[x]);return(0,s.jsxs)("main",{className:"flex flex-col justify-center items-center md:mt-6",children:[(0,s.jsx)(Z,{isLoading:!!x,tezosAccountConnectionStatus:u,etherlinkAccountConnectionStatus:c,onDeposit:g,onWithdraw:p,tokenPairs:z.bX,tokenBalances:e}),o&&(0,s.jsx)(L,{message:o}),n&&(0,s.jsx)(R.Gv,{bridgeTokenTransfer:n,onFinishWithdrawing:T})]})}}},function(e){e.O(0,[283,663,579,212,326,43,544,74,971,69,744],function(){return e(e.s=45306)}),_N_E=e.O()}]);