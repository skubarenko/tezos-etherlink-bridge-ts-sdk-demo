import { config } from '@/config';
import { FA2TezosToken, Token } from '@/models';

export const enum LinkType {
  Address = 0,
  Operation = 1,
  Token = 2
}

export const enum ExplorerType {
  TzKT = 0,
  BCD = 1,
  Blockscout = 2
}

const tezosNetworkName = config.tezos.networkName.toLowerCase();
const explorerBaseUrls = {
  [ExplorerType.TzKT]: `https://${tezosNetworkName}.tzkt.io`,
  [ExplorerType.BCD]: `https://better-call.dev/${tezosNetworkName}`,
  [ExplorerType.Blockscout]: 'https://blockscout.dipdup.net',
};

export const getExplorerUrl = (value: string, type: LinkType, explorer?: ExplorerType): string => {
  explorer = explorer ?? (value.startsWith('0x') ? ExplorerType.Blockscout : ExplorerType.TzKT);

  const explorerBaseUrl = explorerBaseUrls[explorer];
  return explorer === ExplorerType.Blockscout
    ? `${explorerBaseUrl}/${type === LinkType.Address ? 'address' : 'tx'}/${value}`
    : `${explorerBaseUrl}/${value}`;
};

export const getTokenExplorerUrl = (nonNativeToken: Exclude<Token, { type: 'native' }>, explorer?: ExplorerType): string => {
  explorer = explorer ?? (nonNativeToken.address.startsWith('0x') ? ExplorerType.Blockscout : ExplorerType.TzKT);

  const explorerBaseUrl = explorerBaseUrls[explorer];
  switch (explorer) {
    case ExplorerType.TzKT:
      return `${explorerBaseUrl}/${nonNativeToken.address}/tokens/${(nonNativeToken as FA2TezosToken).tokenId || '0'}`;
    case ExplorerType.Blockscout:
      return `${explorerBaseUrl}/token/${nonNativeToken.address}`;
    case ExplorerType.BCD:
      return `${explorerBaseUrl}/${nonNativeToken.address}`;
  }
};
