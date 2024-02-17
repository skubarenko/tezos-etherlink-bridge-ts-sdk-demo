import type { EtherlinkToken, TezosToken } from '@baking-bad/tezos-etherlink-bridge-sdk';

export interface TokenMetadata {
  readonly name: string;
  readonly ticker: string;
  readonly decimals: number;
  readonly iconUrl: string;
}

export type Token = (TezosToken | EtherlinkToken) & TokenMetadata;
