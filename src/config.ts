const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');
const tezosNetworkName = 'ghostnet';

export const config = {
  isTestnet: true,
  isMock: false,
  app: {
    name: 'Tez2Eth',
    description: '',
    url: appUrl
  },
  bridge: {
    smartRollupAddress: 'sr18wx6ezkeRjt1SZSeZ2UQzQN3Uc3YLMLqg',
    smartRollupNodeBaseUrl: 'https://ghostnet-smart.tzkt.io/'
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
      chainId: 128123,
      nativeCurrency: {
        name: 'XTZ',
        symbol: 'XTZ',
        decimals: 18
      },
      rpcUrl: 'https://node.ghostnet.etherlink.com',
      blockExplorerUrl: 'https://testnet.explorer.etherlink.com'
    },
  },
  providers: {
    dipDup: {
      baseUrl: 'https://etherlink-ghostnet.dipdup.net',
      webSocketApiBaseUrl: 'wss://etherlink-ghostnet.dipdup.net'
    },
    tzKT: {
      baseUrl: `https://api.${tezosNetworkName}.tzkt.io`,
    }
  },
  walletConnectProjectId: '734c08921b9f4f202d6b63a45fb0d800',
} as const;
