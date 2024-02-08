interface TokenBase {
  readonly type: string;
  readonly name: string;
  readonly ticker: string;
  readonly decimals: number;
  readonly iconUrl: string;
}

export interface NativeTezosToken extends TokenBase {
  readonly type: 'native';
}

export interface FA12TezosToken extends TokenBase {
  readonly type: 'fa1.2';
  readonly address: string;
}

export interface FA2TezosToken extends TokenBase {
  readonly type: 'fa2';
  readonly address: string;
  readonly tokenId: string;
}

export type NonNativeTezosToken =
  | FA12TezosToken
  | FA2TezosToken;

export type TezosToken = NativeTezosToken | NonNativeTezosToken;

export interface NativeEtherlinkToken extends TokenBase {
  readonly type: 'native';
}

export interface ERC20EtherlinkToken extends TokenBase {
  readonly type: 'erc20';
  readonly address: string;
}

export type NonNativeEtherlinkToken = ERC20EtherlinkToken;

export type EtherlinkToken = NativeEtherlinkToken | NonNativeEtherlinkToken;

export type Token = TezosToken | EtherlinkToken;
