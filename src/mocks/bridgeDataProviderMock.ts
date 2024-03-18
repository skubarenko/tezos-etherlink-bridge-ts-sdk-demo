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
    tokenTransfer => bridgeUtils.getInitialOperation(tokenTransfer).hash,
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

  async getTokenTransfer(tokenTransferId: string): Promise<BridgeTokenTransfer | null> {
    const operationData = bridgeUtils.convertTokenTransferIdToOperationData(tokenTransferId);
    if (!operationData)
      return null;

    await wait(1000);

    return this.tokenTransfersStore.get(operationData[0]) || null;
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

  async getOperationTokenTransfers(operationHash: string): Promise<BridgeTokenTransfer[]>;
  async getOperationTokenTransfers(tokenTransfer: BridgeTokenTransfer): Promise<BridgeTokenTransfer[]>;
  async getOperationTokenTransfers(operationHashOrTokenTransfer: string | BridgeTokenTransfer): Promise<BridgeTokenTransfer[]>;
  async getOperationTokenTransfers(operationHashOrTokenTransfer: string | BridgeTokenTransfer): Promise<BridgeTokenTransfer[]> {
    const operationHash = typeof operationHashOrTokenTransfer === 'string'
      ? operationHashOrTokenTransfer
      : bridgeUtils.getInitialOperation(operationHashOrTokenTransfer).hash;

    await wait(1000);
    const operationTokenTransfer = this.tokenTransfersStore.get(operationHash);

    return operationTokenTransfer ? [operationTokenTransfer] : [];
  }

  subscribeToTokenTransfer(_tokenTransferId: string): void {
  }

  unsubscribeFromTokenTransfer(_tokenTransferId: string): void {
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

  subscribeToOperationTokenTransfers(operationHash: string): void;
  subscribeToOperationTokenTransfers(tokenTransfer: BridgeTokenTransfer): void;
  subscribeToOperationTokenTransfers(operationHashOrTokenTransfer: string | BridgeTokenTransfer): void;
  subscribeToOperationTokenTransfers(_operationHashOrTokenTransfer: string | BridgeTokenTransfer): void {
  }

  unsubscribeFromOperationTokenTransfers(operationHash: string): void;
  unsubscribeFromOperationTokenTransfers(tokenTransfer: BridgeTokenTransfer): void;
  unsubscribeFromOperationTokenTransfers(operationHashOrTokenTransfer: string | BridgeTokenTransfer): void;
  unsubscribeFromOperationTokenTransfers(_operationHashOrTokenTransfer: string | BridgeTokenTransfer): void {
  }

  unsubscribeFromAllSubscriptions(): void {
  }

  async getBalance(accountAddress: string, token: TezosToken | EtherlinkToken): Promise<AccountTokenBalance> {
    return {
      address: accountAddress,
      token,
      balance: 1_000_000n
    };
  }

  async getBalances(accountAddress: string): Promise<AccountTokenBalances>;
  async getBalances(accountAddress: string, tokens: ReadonlyArray<TezosToken | EtherlinkToken>): Promise<AccountTokenBalances>;
  async getBalances(accountAddress: string, offset: number, limit: number): Promise<AccountTokenBalances>;
  async getBalances(accountAddress: string, tokensOrOffset?: number | ReadonlyArray<TezosToken | EtherlinkToken> | undefined, limit?: number | undefined): Promise<AccountTokenBalances>;
  async getBalances(accountAddress: string, tokensOrOffset?: ReadonlyArray<TezosToken | EtherlinkToken> | number, _limit?: number): Promise<AccountTokenBalances> {
    const tokens = typeof tokensOrOffset === 'number' || !tokensOrOffset
      ? (await this.tokensProvider.getRegisteredTokenPairs()).flatMap(pair => [pair.tezos, pair.etherlink])
      : tokensOrOffset;

    return {
      address: accountAddress,
      tokenBalances: tokens.map(token => ({
        token,
        balance: 1_000_000n
      }))
    };
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
        counter: this.getTezosOperationCounter(),
        nonce: this.getTezosOperationNonce(),
        amount: sealedWithdrawal.etherlinkOperation.amount,
        token: tokenPair.tezos,
        timestamp: this.getOperationTimestamp()
      }
    });
  }

  private async runDepositCycle(pendingDeposit: PendingBridgeTokenDeposit) {
    await wait(10000);

    const tezosOperationCounter = this.getTezosOperationCounter();
    const tezosOperationNonce = this.getTezosOperationNonce();
    const transferId = bridgeUtils.convertOperationDataToTokenTransferId(pendingDeposit.tezosOperation.hash, tezosOperationCounter, tezosOperationNonce);

    this.updateTokenTransfer({
      ...pendingDeposit,
      id: transferId,
      status: BridgeTokenTransferStatus.Created,
      tezosOperation: {
        ...pendingDeposit.tezosOperation,
        blockId: 0,
        counter: tezosOperationCounter,
        nonce: tezosOperationNonce
      }
    });

    await wait(5000);

    const tokenPair = (await this.tokensProvider.getRegisteredTokenPair(pendingDeposit.tezosOperation.token))!;
    this.updateTokenTransfer({
      ...pendingDeposit,
      id: transferId,
      status: BridgeTokenTransferStatus.Finished,
      tezosOperation: {
        ...pendingDeposit.tezosOperation,
        blockId: 0,
        counter: tezosOperationCounter,
        nonce: tezosOperationNonce
      },
      etherlinkOperation: {
        blockId: 0,
        hash: this.getEtherlinkOperationHash(),
        amount: pendingDeposit.tezosOperation.amount,
        token: tokenPair.etherlink,
        timestamp: this.getOperationTimestamp(),
        logIndex: this.getEtherlinkOperationLogIndex()
      }
    });
  }

  private async runWithdrawalCycle(pendingWithdrawal: PendingBridgeTokenWithdrawal) {
    await wait(3000);

    const logIndex = this.getEtherlinkOperationLogIndex();
    const transferId = bridgeUtils.convertOperationDataToTokenTransferId(pendingWithdrawal.etherlinkOperation.hash, logIndex);
    const rollupData: FinishedBridgeTokenWithdrawal['rollupData'] = {
      outboxMessageLevel: 3006623,
      outboxMessageIndex: 0,
      commitment: 'src12...',
      proof: '0300...'
    };
    const etherlinkOperation: FinishedBridgeTokenWithdrawal['etherlinkOperation'] = {
      ...pendingWithdrawal.etherlinkOperation,
      blockId: 0,
      logIndex
    };
    this.updateTokenTransfer({
      ...pendingWithdrawal,
      id: transferId,
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
      id: transferId,
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

  private getTezosOperationCounter() {
    return Math.floor(Math.random() * 100_000) + 1;
  }

  private getTezosOperationNonce() {
    const value = Math.floor(Math.random() * 100) + 1;

    return value > 70 ? null : value;
  }

  private getEtherlinkOperationHash() {
    return `0x${this.generateBytesString(64)}`;
  }

  private getEtherlinkOperationLogIndex() {
    return Math.floor(Math.random() * 100) + 1;
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
