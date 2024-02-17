import {
  EventEmitter,
  BridgeTokenTransferKind,
  BridgeTokenTransferStatus,
  utils as bridgeUtils,

  type AccountTokenBalance,
  type AccountTokenBalances,
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
  async getTokenTransfers(offset?: number, limit?: number): Promise<BridgeTokenTransfer[]>;
  async getTokenTransfers(offset?: number, limit?: number): Promise<BridgeTokenTransfer[]> {
    return this.getTokenTransfersInternal(null, offset, limit);
  }

  async getAccountTokenTransfers(accountAddress: string): Promise<BridgeTokenTransfer[]>;
  async getAccountTokenTransfers(accountAddresses: readonly string[]): Promise<BridgeTokenTransfer[]>;
  async getAccountTokenTransfers(accountAddress: string, offset: number, limit: number): Promise<BridgeTokenTransfer[]>;
  async getAccountTokenTransfers(accountAddresses: readonly string[], offset: number, limit: number): Promise<BridgeTokenTransfer[]>;
  async getAccountTokenTransfers(accountAddressOfAddresses: string | readonly string[], offset?: number, limit?: number): Promise<BridgeTokenTransfer[]>;
  async getAccountTokenTransfers(
    accountAddressOfAddresses: string | readonly string[],
    offset?: number,
    limit?: number
  ): Promise<BridgeTokenTransfer[]> {
    return this.getTokenTransfersInternal(accountAddressOfAddresses, offset, limit);
  }

  subscribeToTokenTransfer(operationHash: string): void;
  subscribeToTokenTransfer(tokenTransfer: BridgeTokenTransfer): void;
  subscribeToTokenTransfer(operationHashOrTokenTransfer: string | BridgeTokenTransfer): void;
  subscribeToTokenTransfer(_operationHashOrTokenTransfer: unknown): void {
  }

  unsubscribeFromTokenTransfer(operationHash: string): void;
  unsubscribeFromTokenTransfer(tokenTransfer: BridgeTokenTransfer): void;
  unsubscribeFromTokenTransfer(operationHashOrTokenTransfer: string | BridgeTokenTransfer): void;
  unsubscribeFromTokenTransfer(_operationHashOrTokenTransfer: unknown): void {
  }

  subscribeToTokenTransfers(): void {
  }

  unsubscribeFromTokenTransfers(): void {
  }

  subscribeToAccountTokenTransfers(accountAddress: string): void;
  subscribeToAccountTokenTransfers(accountAddresses: readonly string[]): void;
  subscribeToAccountTokenTransfers(accountAddressOrAddresses?: string | readonly string[] | undefined): void;
  subscribeToAccountTokenTransfers(_accountAddressOrAddresses?: unknown): void {
  }

  unsubscribeFromAccountTokenTransfers(accountAddress: string): void;
  unsubscribeFromAccountTokenTransfers(accountAddresses: readonly string[]): void;
  unsubscribeFromAccountTokenTransfers(accountAddressOrAddresses?: string | readonly string[] | undefined): void;
  unsubscribeFromAccountTokenTransfers(_accountAddressOrAddresses?: unknown): void {
  }

  unsubscribeFromAllSubscriptions(): void {
  }

  getBalance(_accountAddress: string, _token: TezosToken | EtherlinkToken): Promise<AccountTokenBalance> {
    throw new Error('Method not implemented.');
  }

  getBalances(accountAddress: string): Promise<AccountTokenBalances>;
  getBalances(accountAddress: string, tokens: ReadonlyArray<TezosToken | EtherlinkToken>): Promise<AccountTokenBalances>;
  getBalances(accountAddress: string, offset: number, limit: number): Promise<AccountTokenBalances>;
  getBalances(accountAddress: string, tokensOrOffset?: number | ReadonlyArray<TezosToken | EtherlinkToken> | undefined, limit?: number | undefined): Promise<AccountTokenBalances>;
  getBalances(_accountAddress: unknown, _tokensOrOffset?: unknown, _limit?: unknown): Promise<AccountTokenBalances> {
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
        token: tokenPair.tezos,
        fee: 0n,
        timestamp: this.getOperationTimestamp()
      }
    });
  }

  private async runDepositCycle(pendingDeposit: PendingBridgeTokenDeposit) {
    await wait(10000);

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
        token: tokenPair.etherlink,
        fee: 0n,
        timestamp: this.getOperationTimestamp()
      }
    });
  }

  private async runWithdrawalCycle(pendingWithdrawal: PendingBridgeTokenWithdrawal) {
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

  private async getTokenTransfersInternal(
    addressOrAddresses: string | readonly string[] | undefined | null,
    offset: number | undefined | null,
    limit: number | undefined | null
  ): Promise<BridgeTokenTransfer[]> {
    offset = offset && offset > 0 ? offset : 0;
    limit = limit && limit > 0 ? limit : this.defaultLoadDataLimit;

    const tokenTransfers: BridgeTokenTransfer[] = [];
    for (const tokenTransfer of this.tokenTransfersStore.values()) {
      if (!addressOrAddresses || (typeof addressOrAddresses === 'string'
        ? bridgeUtils.isBridgeTokenTransferOwner(tokenTransfer, addressOrAddresses)
        : addressOrAddresses.some(address => bridgeUtils.isBridgeTokenTransferOwner(tokenTransfer, address))
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

    await wait(1000);

    return tokenTransfers;
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
