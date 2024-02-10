export const config = {
  appName: 'Tez2Eth',
  isTestnet: true,
  tezos: {
    networkName: 'Nairobinet',
    rpcUrl: 'https://rpc.tzkt.io/nairobinet'
  },
  etherlink: {
    networkName: 'Etherlink Testnet',
    network: {
      chaiId: 1337n,
      chainName: 'Etherlink Testnet',
      nativeCurrency: {
        name: 'XTZ',
        currency: 'XTZ',
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
  bridgeSmartRollupNodeBaseUrl: 'https://etherlink-rollup-nairobi.dipdup.net'
} as const;
