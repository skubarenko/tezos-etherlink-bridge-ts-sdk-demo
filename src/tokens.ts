import type { ERC20EtherlinkToken, FA12TezosToken, FA2TezosToken, NativeEtherlinkToken, NativeTezosToken } from '@baking-bad/tezos-etherlink-bridge-sdk';

import type { Token } from './models';
import ctezLogo from '@/public/icons/tokens/ctez.png';
import fxhashLogo from '@/public/icons/tokens/fxhash.png';
import xtzLogo from '@/public/icons/tokens/xtz.png';

export const tokenPairs = [
  {
    tezos: {
      type: 'native',
      name: 'Tezos',
      ticker: 'XTZ',
      decimals: 6,
      iconUrl: xtzLogo.src,
      ticketHelperContractAddress: 'KT1DWVsu4Jtu2ficZ1qtNheGPunm5YVniegT',
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
      name: 'Ctez',
      ticker: 'CTEZ',
      address: 'KT1LpdETWYvPWCQTR2FEW6jE6dVqJqxYjdeW',
      decimals: 0,
      iconUrl: ctezLogo.src,
      ticketerContractAddress: 'KT1RvSp4yDKUABqWmv3pKGE9fA6iCGy7bqGh',
      ticketHelperContractAddress: 'KT1DHLWJorW9WB6ztkx1XcoaJKWXeTu9yoR1'
    },
    etherlink: {
      type: 'erc20',
      name: 'Ctez',
      ticker: 'CTEZ',
      address: '0x87dcBf128677ba36E79D47dAf4eb4e51610e0150',
      decimals: 0,
      iconUrl: ctezLogo.src,
    }
  },
  {
    tezos: {
      type: 'fa2',
      name: 'fxhash, token: 42',
      ticker: 'FXHASH_42',
      address: 'KT195Eb8T524v5VJ99ZzH2wpnPfQ2wJfMi6h',
      tokenId: '42',
      decimals: 0,
      iconUrl: fxhashLogo.src,
      ticketerContractAddress: 'KT1VybveLaWhpQHKph28WcGwSy1ud22KSEan',
      ticketHelperContractAddress: 'KT1DNtHLr9T9zksZjZvQwgtx5XJwrW9wzETB'
    },
    etherlink: {
      type: 'erc20',
      name: 'fxhash, token: 42',
      ticker: 'FXHASH_42',
      address: '0xcB5d40c6B1bdf5Cd51b3801351b0A68D101a561b',
      decimals: 0,
      iconUrl: fxhashLogo.src
    }
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
