import type {
  NativeTezosToken, NativeEtherlinkToken,
  FA12TezosToken, FA2TezosToken, ERC20EtherlinkToken,
  TokenPair,
  Token
} from './models';
import ctezLogo from '@/public/icons/tokens/ctez.png';
import fxhashLogo from '@/public/icons/tokens/fxhash.png';
import xtzLogo from '@/public/icons/tokens/xtz.png';

export const nativeTezosToken: NativeTezosToken = {
  type: 'native',
  name: 'Tezos',
  ticker: 'XTZ',
  decimals: 6,
  iconUrl: xtzLogo.src
};

export const nativeEtherlinkToken: NativeEtherlinkToken = {
  type: 'native',
  name: 'Tezos',
  ticker: 'XTZ',
  decimals: 18,
  iconUrl: xtzLogo.src
};

const ctezTezosToken: FA12TezosToken = {
  type: 'fa1.2',
  name: 'Ctez',
  ticker: 'CTEZ',
  address: 'KT1GM2AnBAJWdzrChp3hTYFTSb6Dmh61peBP',
  decimals: 0,
  iconUrl: ctezLogo.src
};
const ctezEtherlinkToken: ERC20EtherlinkToken = {
  type: 'erc20',
  name: 'Ctez',
  ticker: 'CTEZ',
  address: '0xe448b46E3c9167961ae4bD498E8dFb78Ae97da8a',
  decimals: 0,
  iconUrl: ctezLogo.src
};

const fxhashTezosToken: FA2TezosToken = {
  type: 'fa2',
  name: 'fxhash, token: 42',
  ticker: 'FXHASH_42',
  address: 'KT1GemMPvp2bV8TUV1DzWTwdhT27TtMgJiTw',
  tokenId: '42',
  decimals: 0,
  iconUrl: fxhashLogo.src
};
const fxhashEtherlinkToken: ERC20EtherlinkToken = {
  type: 'erc20',
  name: 'fxhash, token: 42',
  ticker: 'FXHASH_42',
  address: '0xcB5d40c6B1bdf5Cd51b3801351b0A68D101a561b',
  decimals: 0,
  iconUrl: fxhashLogo.src
};

export const tokenPairInfos = [
  {
    tezos: {
      token: nativeTezosToken,
      ticketerContractAddress: 'KT1XsAj9z2DX2LLrq6bTRJBDubrME2auietW',
    },
    etherlink: {
      token: nativeEtherlinkToken
    }
  },
  {
    tezos: {
      token: ctezTezosToken,
      ticketerContractAddress: 'KT1PmYUomF3HDxsGWYQUCbLi2X8WvT7ZHv8o',
      tickerHelperContractAddress: 'KT1TZg9EwGHKbfWvsHGsqBjm3J5NhJBtHPKX'
    },
    etherlink: {
      token: ctezEtherlinkToken
    }
  },
  {
    tezos: {
      token: fxhashTezosToken,
      ticketerContractAddress: 'KT1GQEybCQffb6YJ5NH9GhPEeRyufrYP3amN',
      tickerHelperContractAddress: 'KT1LstLU529PtDUQHo2x8WybNXBzLXnF6Tkv'
    },
    etherlink: {
      token: fxhashEtherlinkToken
    }
  }
] as const;

export const tokenPairs: readonly TokenPair[] = tokenPairInfos
  .map(({ tezos, etherlink }) => ({ tezos: tezos.token, etherlink: etherlink.token }));

interface TokenInfo {
  type: Token['type'];
  address?: string;
  tokenId?: string;
}

type TokenByTokenInfoMap = {
  native?: {
    tezos?: NativeTezosToken,
    etherlink?: NativeEtherlinkToken
  },
  'fa1.2'?: {
    [address: string]: FA12TezosToken;
  }
  erc20?: {
    [address: string]: ERC20EtherlinkToken;
  }
  fa2?: {
    [address: string]: {
      [tokenId: string]: FA2TezosToken;
    }
  }
};

const tokenByTokenInfoMap: TokenByTokenInfoMap = {};

for (const tokenPairInfo of tokenPairInfos) {
  // Tezos Part
  if (tokenPairInfo.tezos.token.type === 'native') {
    if (!tokenByTokenInfoMap.native)
      tokenByTokenInfoMap.native = {};
    tokenByTokenInfoMap.native.tezos = tokenPairInfo.tezos.token;
  }
  else {
    if (!tokenByTokenInfoMap[tokenPairInfo.tezos.token.type])
      tokenByTokenInfoMap[tokenPairInfo.tezos.token.type] = {};

    if (tokenPairInfo.tezos.token.type === 'fa1.2') {
      tokenByTokenInfoMap[tokenPairInfo.tezos.token.type]![tokenPairInfo.tezos.token.address] = tokenPairInfo.tezos.token;
    }
    else {
      if (!tokenByTokenInfoMap[tokenPairInfo.tezos.token.type]![tokenPairInfo.tezos.token.address])
        tokenByTokenInfoMap[tokenPairInfo.tezos.token.type]![tokenPairInfo.tezos.token.address] = {};

      tokenByTokenInfoMap[tokenPairInfo.tezos.token.type]![tokenPairInfo.tezos.token.address]![tokenPairInfo.tezos.token.tokenId] = tokenPairInfo.tezos.token;
    }
  }

  // Etherlink
  if (tokenPairInfo.etherlink.token.type === 'native') {
    if (!tokenByTokenInfoMap.native)
      tokenByTokenInfoMap.native = {};
    tokenByTokenInfoMap.native.etherlink = tokenPairInfo.etherlink.token;
  }
  else {
    if (!tokenByTokenInfoMap[tokenPairInfo.etherlink.token.type])
      tokenByTokenInfoMap[tokenPairInfo.etherlink.token.type] = {};

    if (tokenPairInfo.etherlink.token.type === 'erc20') {
      tokenByTokenInfoMap[tokenPairInfo.etherlink.token.type]![tokenPairInfo.etherlink.token.address] = tokenPairInfo.etherlink.token;
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
