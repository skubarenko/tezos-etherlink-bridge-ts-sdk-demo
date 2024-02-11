import {
  EventEmitter,
  BridgeTokenTransferKind,
  BridgeTokenTransferStatus,
  utils as bridgeUtils,

  type AccountTokenBalanceInfo,
  type BalancesBridgeDataProvider,
  type BridgeTokenTransfer,
  type EtherlinkToken,
  type TezosToken,
  type TransfersBridgeDataProvider,
  type PendingBridgeTokenDeposit,
  type PendingBridgeTokenWithdrawal,
  type ToEventEmitter,
  type TokensBridgeDataProvider,
  type FinishedBridgeTokenWithdrawal,
  type SealedBridgeTokenWithdrawal,
} from '@baking-bad/tezos-etherlink-bridge-sdk';
import { b58cencode, prefix } from '@taquito/utils';

import { PersistentDataStore } from './persistentDataStore';
import { wait } from '@/utils';

const operationFieldNames = ['tezosOperation', 'etherlinkOperation'];
const bigIntFieldNames = ['amount', 'fee'];

export class BridgeDataProviderMock implements TransfersBridgeDataProvider, BalancesBridgeDataProvider, Disposable {
  private readonly defaultLoadDataLimit = 100;

  private tokenTransfersStore = new PersistentDataStore<BridgeTokenTransfer>(
    'mock.transfers',
    tokenTransfer => bridgeUtils.getInitialOperationHash(tokenTransfer),
    (key, value) => {
      if (!key)
        return value;

      const transfer = JSON.parse(value);

      for (const operationName of operationFieldNames) {
        if (transfer[operationName]) {
          for (const bigIntFieldName of bigIntFieldNames) {
            if (transfer[operationName][bigIntFieldName]) {
              transfer[operationName][bigIntFieldName] = BigInt(transfer[operationName][bigIntFieldName]);
            }
          }
        }
      }

      return transfer;
    },
    (_key, value) => {
      return typeof value === 'bigint'
        ? value.toString(10)
        : value;
    }
  );

  readonly events: TransfersBridgeDataProvider['events'] = {
    tokenTransferCreated: new EventEmitter(),
    tokenTransferUpdated: new EventEmitter()
  };

  constructor(private readonly tokensProvider: TokensBridgeDataProvider) {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).bridgeDataProviderMock = this;
    }
  }

  async getTokenTransfer(operationHash: string): Promise<BridgeTokenTransfer | null>;
  async getTokenTransfer(tokenTransfer: BridgeTokenTransfer): Promise<BridgeTokenTransfer | null>;
  async getTokenTransfer(operationHashOrTokenTransfer: string | BridgeTokenTransfer): Promise<BridgeTokenTransfer | null>;
  async getTokenTransfer(operationHashOrTokenTransfer: string | BridgeTokenTransfer): Promise<BridgeTokenTransfer | null> {
    const operationHash = typeof operationHashOrTokenTransfer === 'string'
      ? operationHashOrTokenTransfer
      : bridgeUtils.getInitialOperationHash(operationHashOrTokenTransfer);

    await wait(1000);

    return this.tokenTransfersStore.get(operationHash) || null;
  }

  async getTokenTransfers(): Promise<BridgeTokenTransfer[]>;
  async getTokenTransfers(offset: number, limit: number): Promise<BridgeTokenTransfer[]>;
  async getTokenTransfers(accountAddress: string): Promise<BridgeTokenTransfer[]>;
  async getTokenTransfers(accountAddresses: readonly string[]): Promise<BridgeTokenTransfer[]>;
  async getTokenTransfers(accountAddress: string, offset: number, limit: number): Promise<BridgeTokenTransfer[]>;
  async getTokenTransfers(accountAddresses: readonly string[], offset: number, limit: number): Promise<BridgeTokenTransfer[]>;
  async getTokenTransfers(
    offsetOrAccountAddressOfAddresses?: number | string | readonly string[],
    _offsetOrLimit?: number,
    limitParameter?: number
  ): Promise<BridgeTokenTransfer[]> {
    let accountAddresses: string | readonly string[] | undefined;
    let offset: number | undefined;
    let limit: number | undefined;

    if (offsetOrAccountAddressOfAddresses !== undefined) {
      if (typeof offsetOrAccountAddressOfAddresses === 'number') {
        offset = offsetOrAccountAddressOfAddresses;
        limit = _offsetOrLimit;
      }
      else {
        accountAddresses = offsetOrAccountAddressOfAddresses;
        offset = _offsetOrLimit;
        limit = limitParameter;
      }
    }

    offset = offset && offset > 0 ? offset : 0;
    limit = limit && limit > 0 ? limit : this.defaultLoadDataLimit;

    const tokenTransfers: BridgeTokenTransfer[] = [];
    for (const tokenTransfer of this.tokenTransfersStore.values()) {
      if (!accountAddresses || (typeof accountAddresses === 'string'
        ? bridgeUtils.isBridgeTokenTransferOwner(tokenTransfer, accountAddresses)
        : accountAddresses.some(address => bridgeUtils.isBridgeTokenTransferOwner(tokenTransfer, address))
      )) {
        tokenTransfers.push(tokenTransfer);
      }
    }

    tokenTransfers.sort((tokenTransferA, tokenTransferB) => {
      const initialOperationA = bridgeUtils.getInitialOperation(tokenTransferA);
      const initialOperationB = bridgeUtils.getInitialOperation(tokenTransferB);

      return initialOperationB.timestamp.localeCompare(initialOperationA.timestamp);
    });
    tokenTransfers.slice(offset, offset + limit);

    // await wait(1000);

    return tokenTransfers;
  }

  subscribeToTokenTransfer(operationHash: string): void;
  subscribeToTokenTransfer(tokenTransfer: BridgeTokenTransfer): void;
  subscribeToTokenTransfer(operationHashOrTokenTransfer: string | BridgeTokenTransfer): void;
  subscribeToTokenTransfer(operationHashOrTokenTransfer: unknown): void {
  }

  unsubscribeFromTokenTransfer(operationHash: string): void;
  unsubscribeFromTokenTransfer(tokenTransfer: BridgeTokenTransfer): void;
  unsubscribeFromTokenTransfer(operationHashOrTokenTransfer: string | BridgeTokenTransfer): void;
  unsubscribeFromTokenTransfer(operationHashOrTokenTransfer: unknown): void {
  }

  subscribeToTokenTransfers(): void;
  subscribeToTokenTransfers(accountAddress: string): void;
  subscribeToTokenTransfers(accountAddresses: readonly string[]): void;
  subscribeToTokenTransfers(accountAddressOrAddresses?: string | readonly string[] | undefined): void;
  subscribeToTokenTransfers(accountAddressOrAddresses?: unknown): void {
  }

  unsubscribeFromTokenTransfers(): void;
  unsubscribeFromTokenTransfers(accountAddress: string): void;
  unsubscribeFromTokenTransfers(accountAddresses: readonly string[]): void;
  unsubscribeFromTokenTransfers(accountAddressOrAddresses?: string | readonly string[] | undefined): void;
  unsubscribeFromTokenTransfers(accountAddressOrAddresses?: unknown): void {
  }

  unsubscribeFromAllTokenTransfers(): void {
  }

  getBalance(accountAddress: string, token: TezosToken | EtherlinkToken): Promise<AccountTokenBalanceInfo> {
    throw new Error('Method not implemented.');
  }

  getBalances(accountAddress: string): Promise<AccountTokenBalanceInfo>;
  getBalances(accountAddress: string, tokens: ReadonlyArray<TezosToken | EtherlinkToken>): Promise<AccountTokenBalanceInfo>;
  getBalances(accountAddress: string, offset: number, limit: number): Promise<AccountTokenBalanceInfo>;
  getBalances(accountAddress: string, tokensOrOffset?: number | ReadonlyArray<TezosToken | EtherlinkToken> | undefined, limit?: number | undefined): Promise<AccountTokenBalanceInfo>;
  getBalances(accountAddress: unknown, tokensOrOffset?: unknown, limit?: unknown): Promise<AccountTokenBalanceInfo> {
    throw new Error('Method not implemented.');
  }

  async deposit(amount: bigint, token: TezosToken, source: string, receiver: string): Promise<PendingBridgeTokenDeposit> {
    await wait(1000);

    const pendingDeposit: PendingBridgeTokenDeposit = {
      kind: BridgeTokenTransferKind.Deposit,
      status: BridgeTokenTransferStatus.Pending,
      source,
      receiver,
      tezosOperation: {
        amount,
        token,
        hash: this.getTezosOperationHash(),
        timestamp: new Date().toLocaleString()
      }
    };

    this.runDepositCycle(pendingDeposit);

    return pendingDeposit;
  }

  async startWithdraw(amount: bigint, token: EtherlinkToken, source: string, receiver: string): Promise<PendingBridgeTokenWithdrawal> {
    await wait(1000);

    const pendingWithdrawal: PendingBridgeTokenWithdrawal = {
      kind: BridgeTokenTransferKind.Withdrawal,
      status: BridgeTokenTransferStatus.Pending,
      source,
      receiver,
      etherlinkOperation: {
        amount,
        token,
        hash: this.getEtherlinkOperationHash(),
        timestamp: this.getOperationTimestamp()
      }
    };

    this.runWithdrawalCycle(pendingWithdrawal);

    return pendingWithdrawal;
  }

  async finishWithdraw(sealedWithdrawal: SealedBridgeTokenWithdrawal) {
    await wait(3000);

    const tokenPair = (await this.tokensProvider.getRegisteredTokenPair(sealedWithdrawal.etherlinkOperation.token))!;
    this.updateTokenTransfer({
      ...sealedWithdrawal,
      status: BridgeTokenTransferStatus.Finished,
      tezosOperation: {
        blockId: 0,
        hash: this.getTezosOperationHash(),
        amount: sealedWithdrawal.etherlinkOperation.amount,
        token: tokenPair.tezos.token,
        fee: 0n,
        timestamp: this.getOperationTimestamp()
      }
    });
  }

  private async runDepositCycle(pendingDeposit: PendingBridgeTokenDeposit) {
    this.updateTokenTransfer(pendingDeposit);

    await wait(5000);

    this.updateTokenTransfer({
      ...pendingDeposit,
      status: BridgeTokenTransferStatus.Created,
      tezosOperation: {
        ...pendingDeposit.tezosOperation,
        blockId: 0,
        fee: 0n
      }
    });

    await wait(5000);

    const tokenPair = (await this.tokensProvider.getRegisteredTokenPair(pendingDeposit.tezosOperation.token))!;
    this.updateTokenTransfer({
      ...pendingDeposit,
      status: BridgeTokenTransferStatus.Finished,
      tezosOperation: {
        ...pendingDeposit.tezosOperation,
        blockId: 0,
        fee: 0n
      },
      etherlinkOperation: {
        blockId: 0,
        hash: this.getEtherlinkOperationHash(),
        amount: pendingDeposit.tezosOperation.amount,
        token: tokenPair.etherlink.token,
        fee: 0n,
        timestamp: this.getOperationTimestamp()
      }
    });
  }

  private async runWithdrawalCycle(pendingWithdrawal: PendingBridgeTokenWithdrawal) {
    this.updateTokenTransfer(pendingWithdrawal);

    await wait(3000);

    const rollupData: FinishedBridgeTokenWithdrawal['rollupData'] = {
      outboxMessageLevel: 3006623,
      outboxMessageIndex: 0,
      commitment: 'src12...',
      proof: '0300...'
    };
    const etherlinkOperation: FinishedBridgeTokenWithdrawal['etherlinkOperation'] = {
      ...pendingWithdrawal.etherlinkOperation,
      blockId: 0,
      fee: 0n
    };
    this.updateTokenTransfer({
      ...pendingWithdrawal,
      status: BridgeTokenTransferStatus.Created,
      etherlinkOperation,
      rollupData: {
        outboxMessageLevel: rollupData.outboxMessageLevel,
        outboxMessageIndex: rollupData.outboxMessageIndex,
      }
    });

    await wait(5000);
    this.updateTokenTransfer({
      ...pendingWithdrawal,
      status: BridgeTokenTransferStatus.Sealed,
      etherlinkOperation,
      rollupData
    });
  }

  private updateTokenTransfer(tokenTransfer: BridgeTokenTransfer) {
    this.tokenTransfersStore.save(tokenTransfer);

    (this.events.tokenTransferUpdated as ToEventEmitter<BridgeDataProviderMock['events']['tokenTransferUpdated']>).emit(
      tokenTransfer
    );
  }

  private getTezosOperationHash() {
    return b58cencode(this.generateBytesString(64), prefix.o);
  }

  private getEtherlinkOperationHash() {
    return `0x${this.generateBytesString(64)}`;
  }

  private getOperationTimestamp() {
    return new Date().toLocaleString();
  }

  private generateBytesString(length: number) {
    return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  }

  [Symbol.dispose](): void {
  }
}
