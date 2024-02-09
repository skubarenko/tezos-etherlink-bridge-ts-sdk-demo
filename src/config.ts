export const config = {
  appName: 'Tez2Eth',
  isTestnet: true,
  tezos: {
    networkName: 'Nairobinet'
  },
  etherlink: {
    networkName: 'Etherlink Testnet'
  },
  bridgeSmartRollupNodeBaseUrl: 'https://etherlink-rollup-nairobi.dipdup.net'
} as const;
