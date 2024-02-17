export const config = {
  appName: 'Tez2Eth',
  isTestnet: true,
  isMock: false,
  tezos: {
    networkName: 'Oxfordnet',
    rpcUrl: 'https://rpc.tzkt.io/oxfordnet',
    tzktApiBaseUrl: 'https://api.oxfordnet.tzkt.io',
    smartRollupAddress: 'sr1T4XVcVtBRzYy52edVTdgup9Kip4Wrmn97',
  },
  etherlink: {
    networkName: 'Etherlink Testnet',
    rpcUrl: 'https://etherlink.dipdup.net',
    network: {
      chainId: '0x539',
      chainName: 'Etherlink Testnet',
      nativeCurrency: {
        name: 'XTZ',
        symbol: 'XTZ',
        decimals: 18
      },
      rpcUrls: [
        'https://etherlink.dipdup.net'
      ],
      blockExplorerUrls: [
        'https://blockscout.dipdup.net/'
      ]
    }
  },
  dipDup: {
    baseUrl: 'https://etherlink-bridge-indexer.dipdup.net',
    webSocketApiBaseUrl: 'wss://etherlink-bridge-indexer.dipdup.net'
  },
  bridgeSmartRollupNodeBaseUrl: 'https://etherlink-rollup-oxford.dipdup.net'
} as const;
