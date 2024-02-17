(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[85],{35883:function(){},46601:function(){},89214:function(){},69951:function(){},52361:function(){},94616:function(){},96534:function(e,t,r){"use strict";r.r(t),r.d(t,{App:function(){return v}});var s=r(1937),i=r(56842),n=r(12573),o=r(19497),a=r(89077),l=r(73983);class d{get isMetaMask(){return this.provider.isMetaMask}getCurrentChainId(){return this.provider.request({method:"eth_chainId",params:[]})}async getCurrentConnectedAccount(){try{let e=await this.provider.request({method:"eth_accounts"});return this.getAccountToConnect(e)}catch(e){console.error(e)}}async connectWallet(){try{let e=await this.provider.request({method:"eth_requestAccounts"});return this.getAccountToConnect(e)}catch(e){if((null==e?void 0:e.code)===4001)return;console.error(e)}}async switchNetwork(){try{let e=await this.provider.request({method:"wallet_switchEthereumChain",params:[{chainId:this.chainId}]});console.log(e)}catch(t){let e=null==t?void 0:t.code;if(4001===e)return;if(4002!==e)return this.addNetwork();console.error(t)}}async addNetwork(){try{await this.provider.request({method:"wallet_addEthereumChain",params:[l.v.etherlink.network]})}catch(e){if((null==e?void 0:e.code)===4001)return;console.error(e)}}async disconnectWallet(){}getAccountToConnect(e){return e&&e[0]&&a.P6Y.toChecksumAddress(e[0])}addEventListener(e,t){this.provider.on(e,t)}removeEventListener(e,t){this.provider.removeListener(e,t)}constructor(e){this.provider=e,this.chainId=l.v.etherlink.network.chainId}}var h=r(75410);class c{async sign(e,t){let r=await this.wallet.sign(e,t),s=(0,h.sA)(r,h.O4.edsig);return{sig:r,prefixSig:r,bytes:e,sbytes:e+(0,h.Cw)(s)}}publicKey(){return this.wallet.getPK()}publicKeyHash(){return this.wallet.getPKH()}secretKey(){throw Error("Method not implemented.")}constructor(e){this.wallet=e}}class u extends i.wy{async deposit(e,t,r,s){let i=await this.getTezosConnectedAddress(),n="string"==typeof r?r:await this.getEtherlinkConnectedAddress();return{tokenTransfer:await this.options.bridgeDataProviders.transfers.deposit(e,t,i,n)}}async startWithdraw(e,t,r){let s=await this.getEtherlinkConnectedAddress(),i="string"==typeof r?r:await this.getTezosConnectedAddress();return{tokenTransfer:await this.options.bridgeDataProviders.transfers.startWithdraw(e,t,s,i)}}async finishWithdraw(e){return this.options.bridgeDataProviders.transfers.finishWithdraw(e)}constructor(e){super(e),this.options=e}}class p{entries(){return this.store.entries}values(){return this.store.values()}keys(){return this.store.keys()}get(e){return this.store.get(e)}save(e){this.store.set(this.keyGetter(e),e),this.saveStore()}find(e){for(let[t,r]of this.store)if(e(r,t))return[t,r]}loadStore(){let e=new Map,t=localStorage.getItem(this.storeName+".data");if(t)try{let r=JSON.parse(t,this.deserializer);if(Array.isArray(r))for(let t of r)e.set(this.keyGetter(t),t)}catch(e){console.warn(e)}return e}saveStore(){let e=[];for(let t of this.store.values()){let r=JSON.stringify(t,this.serializer);e.push(r)}try{let t=JSON.stringify(e);localStorage.setItem(this.storeName+".data",t)}catch(e){}}constructor(e,t,r,s,i){this.storeName=e,this.keyGetter=t,this.deserializer=r,this.serializer=s,this.store=i||this.loadStore()}}var k=r(93349);let f=["tezosOperation","etherlinkOperation"],g=["amount","fee"];class T{async getTokenTransfer(e){let t="string"==typeof e?e:i.P6.getInitialOperationHash(e);return await (0,k.Dc)(1e3),this.tokenTransfersStore.get(t)||null}async getTokenTransfers(e,t){return this.getTokenTransfersInternal(null,e,t)}async getAccountTokenTransfers(e,t,r){return this.getTokenTransfersInternal(e,t,r)}subscribeToTokenTransfer(e){}unsubscribeFromTokenTransfer(e){}subscribeToTokenTransfers(){}unsubscribeFromTokenTransfers(){}subscribeToAccountTokenTransfers(e){}unsubscribeFromAccountTokenTransfers(e){}unsubscribeFromAllSubscriptions(){}getBalance(e,t){throw Error("Method not implemented.")}getBalances(e,t,r){throw Error("Method not implemented.")}async deposit(e,t,r,s){await (0,k.Dc)(1e3);let n={kind:i.gu.Deposit,status:i.hj.Pending,source:r,receiver:s,tezosOperation:{amount:e,token:t,hash:this.getTezosOperationHash(),timestamp:new Date().toLocaleString()}};return this.runDepositCycle(n),n}async startWithdraw(e,t,r,s){await (0,k.Dc)(1e3);let n={kind:i.gu.Withdrawal,status:i.hj.Pending,source:r,receiver:s,etherlinkOperation:{amount:e,token:t,hash:this.getEtherlinkOperationHash(),timestamp:this.getOperationTimestamp()}};return this.runWithdrawalCycle(n),n}async finishWithdraw(e){await (0,k.Dc)(3e3);let t=await this.tokensProvider.getRegisteredTokenPair(e.etherlinkOperation.token);this.updateTokenTransfer({...e,status:i.hj.Finished,tezosOperation:{blockId:0,hash:this.getTezosOperationHash(),amount:e.etherlinkOperation.amount,token:t.tezos,fee:0n,timestamp:this.getOperationTimestamp()}})}async runDepositCycle(e){await (0,k.Dc)(1e4),this.updateTokenTransfer({...e,status:i.hj.Created,tezosOperation:{...e.tezosOperation,blockId:0,fee:0n}}),await (0,k.Dc)(5e3);let t=await this.tokensProvider.getRegisteredTokenPair(e.tezosOperation.token);this.updateTokenTransfer({...e,status:i.hj.Finished,tezosOperation:{...e.tezosOperation,blockId:0,fee:0n},etherlinkOperation:{blockId:0,hash:this.getEtherlinkOperationHash(),amount:e.tezosOperation.amount,token:t.etherlink,fee:0n,timestamp:this.getOperationTimestamp()}})}async runWithdrawalCycle(e){await (0,k.Dc)(3e3);let t={outboxMessageLevel:3006623,outboxMessageIndex:0,commitment:"src12...",proof:"0300..."},r={...e.etherlinkOperation,blockId:0,fee:0n};this.updateTokenTransfer({...e,status:i.hj.Created,etherlinkOperation:r,rollupData:{outboxMessageLevel:t.outboxMessageLevel,outboxMessageIndex:t.outboxMessageIndex}}),await (0,k.Dc)(5e3),this.updateTokenTransfer({...e,status:i.hj.Sealed,etherlinkOperation:r,rollupData:t})}async getTokenTransfersInternal(e,t,r){t=t&&t>0?t:0,r=r&&r>0?r:this.defaultLoadDataLimit;let s=[];for(let t of this.tokenTransfersStore.values())(!e||("string"==typeof e?i.P6.isBridgeTokenTransferOwner(t,e):e.some(e=>i.P6.isBridgeTokenTransferOwner(t,e))))&&s.push(t);return s.sort((e,t)=>{let r=i.P6.getInitialOperation(e);return i.P6.getInitialOperation(t).timestamp.localeCompare(r.timestamp)}),s.slice(t,t+r),await (0,k.Dc)(1e3),s}updateTokenTransfer(e){this.tokenTransfersStore.save(e),this.events.tokenTransferUpdated.emit(e)}getTezosOperationHash(){return(0,h.kM)(this.generateBytesString(64),h.O4.o)}getEtherlinkOperationHash(){return"0x".concat(this.generateBytesString(64))}getOperationTimestamp(){return new Date().toLocaleString()}generateBytesString(e){return[...Array(e)].map(()=>Math.floor(16*Math.random()).toString(16)).join("")}[Symbol.dispose](){}constructor(e){this.tokensProvider=e,this.defaultLoadDataLimit=100,this.tokenTransfersStore=new p("mock.transfers",e=>i.P6.getInitialOperationHash(e),(e,t)=>{if(!e)return t;let r=JSON.parse(t);for(let e of f)if(r[e])for(let t of g)r[e][t]&&(r[e][t]=BigInt(r[e][t]));return r},(e,t)=>"bigint"==typeof t?t.toString(10):t),this.events={tokenTransferCreated:new i.vp,tokenTransferUpdated:new i.vp},window.bridgeDataProviderMock=this}}var m=r(6143);class v{get etherlinkWallet(){return this._etherlinkWallet}async start(){if(!this.etherlinkWallet){let e=await this.loadMetaMaskEthereumProvider(3e3);e&&(this._etherlinkWallet=new d(e))}}loadMetaMaskEthereumProvider(e){return new Promise((t,r)=>{try{window.addEventListener("ethereum#initialized",()=>{t(window.ethereum)},{once:!0}),setTimeout(()=>{t(void 0)},e)}catch(e){r(e)}})}createTokenBridgeMock(){let e=new i.xh(m.bX),t=new T(e);return new u({tezos:{toolkit:this.tezosToolkit,bridgeOptions:{rollupAddress:l.v.tezos.smartRollupAddress}},etherlink:{toolkit:this.etherlinkToolkit,bridgeOptions:{kernelAddress:i.gt,withdrawPrecompileAddress:i.$z}},bridgeDataProviders:{tokens:e,transfers:t,balances:t}})}constructor(){let e=window.ethereum;this.etherlinkToolkit=new a.ZPm(e),this._etherlinkWallet=e?new d(e):null,this.tezosToolkit=new o.$N(l.v.tezos.rpcUrl),this.beaconWallet=new n.kx({name:l.v.appName,network:{type:s.td.CUSTOM,rpcUrl:l.v.tezos.rpcUrl},featuredWallets:["temple","atomex","metamask","trust"],colorMode:s.UX.DARK}),this.tezosWalletSigner=new c(this.beaconWallet),this.tezosToolkit.setWalletProvider(this.beaconWallet),this.tezosToolkit.setSignerProvider(this.tezosWalletSigner),this.beaconTezosWallet=this.beaconWallet.client,this.tokenBridge=l.v.isMock?this.createTokenBridgeMock():(0,i.uF)({logging:{logLevel:i.in.Debug},tokenPairs:m.bX,dipDup:{baseUrl:l.v.dipDup.baseUrl,webSocketApiBaseUrl:l.v.dipDup.webSocketApiBaseUrl},tzKTApiBaseUrl:l.v.tezos.tzktApiBaseUrl,etherlinkRpcUrl:l.v.etherlink.rpcUrl,tezos:{toolkit:this.tezosToolkit,rollupAddress:l.v.tezos.smartRollupAddress},etherlink:{toolkit:this.etherlinkToolkit}})}}},6143:function(e,t,r){"use strict";r.d(t,{uk:function(){return c},c3:function(){return l},OB:function(){return a},bX:function(){return o},TV:function(){return d}});var s={src:"/_next/static/media/ctez.76dc7655.png"},i={src:"/_next/static/media/fxhash.adc967f1.png"},n={src:"/_next/static/media/xtz.5d1f6ae4.png"};let o=[{tezos:{type:"native",name:"Tezos",ticker:"XTZ",decimals:6,iconUrl:n.src,ticketHelperContractAddress:"KT1DWVsu4Jtu2ficZ1qtNheGPunm5YVniegT"},etherlink:{type:"native",name:"Tezos",ticker:"XTZ",decimals:18,iconUrl:n.src}},{tezos:{type:"fa1.2",name:"Ctez",ticker:"CTEZ",address:"KT1LpdETWYvPWCQTR2FEW6jE6dVqJqxYjdeW",decimals:0,iconUrl:s.src,ticketerContractAddress:"KT1RvSp4yDKUABqWmv3pKGE9fA6iCGy7bqGh",ticketHelperContractAddress:"KT1DHLWJorW9WB6ztkx1XcoaJKWXeTu9yoR1"},etherlink:{type:"erc20",name:"Ctez",ticker:"CTEZ",address:"0x87dcBf128677ba36E79D47dAf4eb4e51610e0150",decimals:0,iconUrl:s.src}},{tezos:{type:"fa2",name:"fxhash, token: 42",ticker:"FXHASH_42",address:"KT195Eb8T524v5VJ99ZzH2wpnPfQ2wJfMi6h",tokenId:"42",decimals:0,iconUrl:i.src,ticketerContractAddress:"KT1VybveLaWhpQHKph28WcGwSy1ud22KSEan",ticketHelperContractAddress:"KT1DNtHLr9T9zksZjZvQwgtx5XJwrW9wzETB"},etherlink:{type:"erc20",name:"fxhash, token: 42",ticker:"FXHASH_42",address:"0xcB5d40c6B1bdf5Cd51b3801351b0A68D101a561b",decimals:0,iconUrl:i.src}}],a=o[0].tezos,l=o[0].etherlink,d=o.reduce((e,t)=>(e.push(t.tezos),e.push(t.etherlink),e),[]),h={};for(let e of o)"native"===e.tezos.type?(h.native||(h.native={}),h.native.tezos=e.tezos):(h[e.tezos.type]||(h[e.tezos.type]={}),"fa1.2"===e.tezos.type?h[e.tezos.type][e.tezos.address]=e.tezos:(h[e.tezos.type][e.tezos.address]||(h[e.tezos.type][e.tezos.address]={}),h[e.tezos.type][e.tezos.address][e.tezos.tokenId]=e.tezos)),"native"===e.etherlink.type?(h.native||(h.native={}),h.native.etherlink=e.etherlink):(h[e.etherlink.type]||(h[e.etherlink.type]={}),"erc20"===e.etherlink.type&&(h[e.etherlink.type][e.etherlink.address]=e.etherlink));let c=(e,t)=>{var r,s,i,n,o;return"native"===e.type?t?null===(r=h[e.type])||void 0===r?void 0:r.tezos:null===(s=h[e.type])||void 0===s?void 0:s.etherlink:e.address?"fa1.2"===e.type||"erc20"===e.type?null===(i=h[e.type])||void 0===i?void 0:i[e.address]:"fa2"===e.type&&e.tokenId?null===(o=h[e.type])||void 0===o?void 0:null===(n=o[e.address])||void 0===n?void 0:n[e.tokenId]:void 0:void 0}}}]);