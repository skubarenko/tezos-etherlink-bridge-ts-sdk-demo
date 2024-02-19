const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');
const tezosNetworkName = 'oxfordnet';

export const config = {
  isTestnet: true,
  isMock: false,
  app: {
    name: 'Tez2Eth',
    description: '',
    url: appUrl
  },
  bridge: {
    smartRollupAddress: 'sr1T4XVcVtBRzYy52edVTdgup9Kip4Wrmn97',
    smartRollupNodeBaseUrl: 'https://etherlink-rollup-oxford.dipdup.net'
  },
  tezos: {
    network: {
      name: tezosNetworkName,
      displayName: tezosNetworkName[0].toLocaleUpperCase() + tezosNetworkName.slice(1),
      rpcUrl: `https://rpc.tzkt.io/${tezosNetworkName}`
    }
  },
  etherlink: {
    network: {
      name: 'Etherlink Testnet',
      displayName: 'Etherlink Testnet',
      chainId: 1337, // '0x539',
      nativeCurrency: {
        name: 'XTZ',
        symbol: 'XTZ',
        decimals: 18
      },
      rpcUrl: 'https://etherlink.dipdup.net',
      blockExplorerUrl: 'https://blockscout.dipdup.net'
    },
  },
  providers: {
    dipDup: {
      baseUrl: 'https://etherlink-bridge-indexer.dipdup.net',
      webSocketApiBaseUrl: 'wss://etherlink-bridge-indexer.dipdup.net'
    },
    tzKT: {
      baseUrl: `https://api.${tezosNetworkName}.tzkt.io`,
    }
  },
  walletConnectProjectId: '734c08921b9f4f202d6b63a45fb0d800',
} as const;
