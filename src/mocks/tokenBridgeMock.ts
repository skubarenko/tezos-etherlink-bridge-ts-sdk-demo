/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TokenBridge,
  type TezosToken, type TokenBridgeOptions, type NonNativeEtherlinkToken, type SealedBridgeTokenWithdrawal
} from '@baking-bad/tezos-etherlink-bridge-sdk';

import type { BridgeDataProviderMock } from './bridgeDataProviderMock';

interface TokenBridgeMockOptions extends TokenBridgeOptions {
  bridgeDataProviders: TokenBridgeOptions['bridgeDataProviders'] & {
    balances: BridgeDataProviderMock,
    transfers: BridgeDataProviderMock
  }
}

export class TokenBridgeMock extends TokenBridge {
  constructor(readonly options: TokenBridgeMockOptions) {
    super(options);
  }

  async deposit(amount: bigint, token: TezosToken, etherlinkReceiverAddressOrOptions?: any, _options?: any): Promise<any> {
    const source = await this.getTezosConnectedAddress();
    const receiver = typeof etherlinkReceiverAddressOrOptions === 'string'
      ? etherlinkReceiverAddressOrOptions
      : await this.getEtherlinkConnectedAddress();

    const tokenTransfer = await this.options.bridgeDataProviders.transfers.deposit(amount, token, source, receiver);
    return {
      tokenTransfer
    };
  }

  async startWithdraw(amount: bigint, token: NonNativeEtherlinkToken, tezosReceiverAddress?: string): Promise<any> {
    const source = await this.getEtherlinkConnectedAddress();
    const receiver = typeof tezosReceiverAddress === 'string'
      ? tezosReceiverAddress
      : await this.getTezosConnectedAddress();

    const tokenTransfer = await this.options.bridgeDataProviders.transfers.startWithdraw(amount, token, source, receiver);
    return {
      tokenTransfer
    };
  }

  async finishWithdraw(sealedBridgeTokenWithdrawal: SealedBridgeTokenWithdrawal): Promise<any> {
    return this.options.bridgeDataProviders.transfers.finishWithdraw(sealedBridgeTokenWithdrawal);
  }
}
