/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TokenBridge,
  type TokenBridgeOptions, type TezosToken, type EtherlinkToken, type SealedBridgeTokenWithdrawal,
  type TaquitoWalletTezosBridgeBlockchainService, type EthersEtherlinkBridgeBlockchainService,
} from '@baking-bad/tezos-etherlink-bridge-sdk';

import type { BridgeDataProviderMock } from './bridgeDataProviderMock';

interface TokenBridgeMockOptions extends TokenBridgeOptions<TaquitoWalletTezosBridgeBlockchainService, EthersEtherlinkBridgeBlockchainService> {
  bridgeDataProviders: TokenBridgeOptions['bridgeDataProviders'] & {
    balances: BridgeDataProviderMock,
    transfers: BridgeDataProviderMock
  }
}

export class TokenBridgeMock extends TokenBridge<TaquitoWalletTezosBridgeBlockchainService, EthersEtherlinkBridgeBlockchainService> {
  constructor(readonly options: TokenBridgeMockOptions) {
    super(options);
  }

  async deposit(amount: bigint, token: TezosToken, etherlinkReceiverAddressOrOptions?: any, _options?: any): Promise<any> {
    const source = await this.getTezosSignerAddress();
    const receiver = typeof etherlinkReceiverAddressOrOptions === 'string'
      ? etherlinkReceiverAddressOrOptions
      : await this.getEtherlinkSignerAddress();

    if (!source)
      throw new Error('The Tezos signer address is unavailable');
    if (!receiver)
      throw new Error('The Etherlink receiver address is undefined');

    const tokenTransfer = await this.options.bridgeDataProviders.transfers.deposit(amount, token, source, receiver);
    return {
      tokenTransfer
    };
  }

  async startWithdraw(amount: bigint, token: EtherlinkToken, tezosReceiverAddress?: string): Promise<any> {
    const source = await this.getEtherlinkSignerAddress();
    const receiver = typeof tezosReceiverAddress === 'string'
      ? tezosReceiverAddress
      : await this.getTezosSignerAddress();

    if (!source)
      throw new Error('The Etherlink signer address is unavailable');
    if (!receiver)
      throw new Error('The Tezos receiver address is undefined');

    const tokenTransfer = await this.options.bridgeDataProviders.transfers.startWithdraw(amount, token, source, receiver);
    return {
      tokenTransfer
    };
  }

  async finishWithdraw(sealedBridgeTokenWithdrawal: SealedBridgeTokenWithdrawal): Promise<any> {
    return this.options.bridgeDataProviders.transfers.finishWithdraw(sealedBridgeTokenWithdrawal);
  }
}
