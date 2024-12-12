import type { ERC20EtherlinkToken, FA12TezosToken, FA2TezosToken, NativeEtherlinkToken, NativeTezosToken } from '@baking-bad/tezos-etherlink-bridge-sdk';

import type { Token } from './models';
import youLogo from '@/public/icons/tokens/you.png';
import tzbtcLogo from '@/public/icons/tokens/tzbtc.png';
import usdtLogo from '@/public/icons/tokens/usdt.png';
import sirsLogo from '@/public/icons/tokens/sirs.png';
import xtzLogo from '@/public/icons/tokens/xtz.png';

export const tokenPairs = [
  {
    tezos: {
      type: 'native',
      name: 'Tezos',
      ticker: 'XTZ',
      decimals: 6,
      iconUrl: xtzLogo.src,
      ticketHelperContractAddress: 'KT1VEjeQfDBSfpDH5WeBM5LukHPGM2htYEh3',
    },
    etherlink: {
      type: 'native',
      name: 'Tezos',
      ticker: 'XTZ',
      decimals: 18,
      iconUrl: xtzLogo.src
    }
  },
  {
    tezos: {
      type: 'fa1.2',
      name: 'tzBTC',
      ticker: 'tzBTC',
      address: 'KT1HmyazXfKDbo8XjwtWPXcoyHcmNPDCvZyb',
      decimals: 8,
      iconUrl: tzbtcLogo.src,
      ticketerContractAddress: 'KT1H7if3gSZE1pZSK48W3NzGpKmbWyBxWDHe',
      ticketHelperContractAddress: 'KT1KUAaaRMeMS5TJJyGTQJANcpSR4egvHBUk',
    },
    etherlink: {
      type: 'erc20',
      name: 'tzBTC',
      ticker: 'tzBTC',
      address: '0x8e73aE3CF688Fbd8368c99520d26F9eF1B4d3BCa',
      decimals: 8,
      iconUrl: tzbtcLogo.src,
    },
  },
  {
    tezos: {
      type: 'fa1.2',
      name: 'Sirius',
      ticker: 'SIRS',
      address: 'KT1TCTpXXbpnWBZ8whqExokbKfUrUW3nAXDJ',
      decimals: 0,
      iconUrl: sirsLogo.src,
      ticketerContractAddress: 'KT1Cw8WZLp4XUPLrDWUjwwpShzCRqzRByyVh',
      ticketHelperContractAddress: 'KT1DSy9C2dBRDYPCHuBVaYYDQPjhprcSA9eL',
    },
    etherlink: {
      type: 'erc20',
      name: 'Sirius',
      ticker: 'SIRS',
      address: '0xbaA233e2f62f45e9D91Dacd3D6C6A57Bc2CBc575',
      decimals: 0,
      iconUrl: sirsLogo.src,
    },
  },
  {
    tezos: {
      type: 'fa2',
      name: 'Tether USD',
      ticker: 'USDt',
      address: 'KT1V2ak1MfNd3w4oyKD64ehYU7K4CrpUcDGR',
      tokenId: '0',
      decimals: 6,
      iconUrl: usdtLogo.src,
      ticketerContractAddress: 'KT1S6Nf9MnafAgSUWLKcsySPNFLUxxqSkQCw',
      ticketHelperContractAddress: 'KT1JLZe4qTa76y6Us2aDoRNUgZyssSDUr6F5',
    },
    etherlink: {
      type: 'erc20',
      name: 'Tether USD',
      ticker: 'USDt',
      address: '0xf68997eCC03751cb99B5B36712B213f11342452b',
      decimals: 6,
      iconUrl: usdtLogo.src,
    },
  },
  {
    tezos: {
      type: 'fa2',
      name: 'youves YOU Governance',
      ticker: 'YOU',
      address: 'KT1VyYTej9iHeAfpCKBEdpqiKaHAk4hUN7h8',
      tokenId: '0',
      decimals: 12,
      iconUrl: youLogo.src,
      ticketerContractAddress: 'KT1DjH84P98gKFptqiAevj1qoKqxrTaG1T7i',
      ticketHelperContractAddress: 'KT1HV4o5WnnJ6QEPWqck9Lk3vQakcUD89qc8',
    },
    etherlink: {
      type: 'erc20',
      name: 'YOU',
      ticker: 'YOU',
      address: '0x59118D19848bAca5C3Dd1603acfC99C4cbcCC3db',
      decimals: 12,
      iconUrl: youLogo.src,
    },
  }
] as const;

export const nativeTezosToken: Omit<typeof tokenPairs[0]['tezos'], 'ticketHelperContractAddress'> = tokenPairs[0].tezos;
export const nativeEtherlinkToken: typeof tokenPairs[0]['etherlink'] = tokenPairs[0].etherlink;

export const tokens = tokenPairs.reduce<Token[]>(
  (result, tokenPair) => {
    result.push(tokenPair.tezos);
    result.push(tokenPair.etherlink);

    return result;
  },
  []
);

interface TokenInfo {
  type: Token['type'];
  address?: string;
  tokenId?: string;
}

type TokenByTokenInfoMap = {
  native?: {
    tezos?: NativeTezosToken & Token,
    etherlink?: NativeEtherlinkToken & Token
  },
  'fa1.2'?: {
    [address: string]: FA12TezosToken & Token;
  }
  erc20?: {
    [address: string]: ERC20EtherlinkToken & Token;
  }
  fa2?: {
    [address: string]: {
      [tokenId: string]: FA2TezosToken & Token;
    }
  }
};

const tokenByTokenInfoMap: TokenByTokenInfoMap = {};

for (const tokenPair of tokenPairs) {
  // Tezos Part
  if (tokenPair.tezos.type === 'native') {
    if (!tokenByTokenInfoMap.native)
      tokenByTokenInfoMap.native = {};
    tokenByTokenInfoMap.native.tezos = tokenPair.tezos;
  }
  else {
    if (!tokenByTokenInfoMap[tokenPair.tezos.type])
      tokenByTokenInfoMap[tokenPair.tezos.type] = {};

    if (tokenPair.tezos.type === 'fa1.2') {
      tokenByTokenInfoMap[tokenPair.tezos.type]![tokenPair.tezos.address] = tokenPair.tezos;
    }
    else {
      if (!tokenByTokenInfoMap[tokenPair.tezos.type]![tokenPair.tezos.address])
        tokenByTokenInfoMap[tokenPair.tezos.type]![tokenPair.tezos.address] = {};

      tokenByTokenInfoMap[tokenPair.tezos.type]![tokenPair.tezos.address]![tokenPair.tezos.tokenId] = tokenPair.tezos;
    }
  }

  // Etherlink
  if (tokenPair.etherlink.type === 'native') {
    if (!tokenByTokenInfoMap.native)
      tokenByTokenInfoMap.native = {};
    tokenByTokenInfoMap.native.etherlink = tokenPair.etherlink;
  }
  else {
    if (!tokenByTokenInfoMap[tokenPair.etherlink.type])
      tokenByTokenInfoMap[tokenPair.etherlink.type] = {};

    if (tokenPair.etherlink.type === 'erc20') {
      tokenByTokenInfoMap[tokenPair.etherlink.type]![tokenPair.etherlink.address] = tokenPair.etherlink;
    }
  }
}

export const findTokenByInfo = (tokenInfo: TokenInfo, isTezos?: boolean): Token | undefined => {
  const token = tokenInfo.type === 'native'
    ? (isTezos ? tokenByTokenInfoMap[tokenInfo.type]?.tezos : tokenByTokenInfoMap[tokenInfo.type]?.etherlink)
    : tokenInfo.address
      ? tokenInfo.type === 'fa1.2' || tokenInfo.type === 'erc20'
        ? tokenByTokenInfoMap[tokenInfo.type]?.[tokenInfo.address]
        : tokenInfo.type === 'fa2' && tokenInfo.tokenId
          ? tokenByTokenInfoMap[tokenInfo.type]?.[tokenInfo.address]?.[tokenInfo.tokenId]
          : undefined
      : undefined;

  return token;
};
