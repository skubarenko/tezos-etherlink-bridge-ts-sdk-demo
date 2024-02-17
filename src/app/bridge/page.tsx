'use client';

import { AbortedBeaconError } from '@airgap/beacon-core';
import {
  BridgeTokenTransferStatus,
  utils as bridgeUtils,
  type BridgeTokenTransfer,
  type SealedBridgeTokenWithdrawal,
} from '@baking-bad/tezos-etherlink-bridge-sdk';
import { useCallback, useEffect, useState } from 'react';

import { BridgePure } from './Bridge';
import { TransferError } from './TransferError';
import { BridgeTransfer } from '@/components/Transfer';
import { useAppContext, useEtherlinkAccount, useTezosAccount, useTokenTransfersStoreContext } from '@/hooks';
import type { Token } from '@/models';
import { tokenPairs } from '@/tokens';
import { getErrorMessage } from '@/utils';

const emptyBalancesMap = new Map<Token, string>();
const getActualTokenTransferStateValue = (newTokenTransfer: BridgeTokenTransfer) => (previousTokenTransfer: BridgeTokenTransfer | undefined) => {
  return previousTokenTransfer && bridgeUtils.getInitialOperationHash(previousTokenTransfer) === bridgeUtils.getInitialOperationHash(newTokenTransfer)
    ? newTokenTransfer
    : previousTokenTransfer;
};

export default function Bridge() {
  const [tokenBalances, setTokenBalances] = useState<ReadonlyMap<Token, string>>(emptyBalancesMap);
  const [lastTokenTransfer, setLastTokenTransfer] = useState<BridgeTokenTransfer>();
  const [lastError, setLastError] = useState<string>();
  const { connectionStatus: etherlinkConnectionStatus } = useEtherlinkAccount();
  const { connectionStatus: tezosConnectionStatus } = useTezosAccount();
  const app = useAppContext();
  const { dispatch: tokenTransfersStoreDispatch } = useTokenTransfersStoreContext();
  const tokenBridge = app?.tokenBridge;

  useEffect(() => {
    setTokenBalances(
      new Map<Token, string>()
        .set(tokenPairs[0]!.tezos, '1040.1043')
        .set(tokenPairs[0]!.etherlink, '40.493')
        .set(tokenPairs[1]!.tezos, '12570')
        .set(tokenPairs[1]!.etherlink, '0')
        .set(tokenPairs[2]!.tezos, '0')
        .set(tokenPairs[2]!.etherlink, '1093')
    );
  }, []);

  const handleTokenTransferUpdated = useCallback(
    (tokenTransfer: BridgeTokenTransfer) => {
      const initialOperationHash = bridgeUtils.getInitialOperationHash(tokenTransfer);
      console.log('Token Transfer Updated', initialOperationHash, tokenTransfer.kind, tokenTransfer.status);

      setLastTokenTransfer(getActualTokenTransferStateValue(tokenTransfer));
      if (tokenTransfer.status === BridgeTokenTransferStatus.Finished) {
        console.log(`Unsubscribe from the ${initialOperationHash} token transfer`);
        tokenBridge?.unsubscribeFromTokenTransfer(tokenTransfer);
      }
    },
    [tokenBridge]
  );

  useEffect(
    () => {
      if (!tokenBridge)
        return;

      tokenBridge.events.tokenTransferUpdated.addListener(handleTokenTransferUpdated);

      return () => {
        tokenBridge.events.tokenTransferUpdated.removeListener(handleTokenTransferUpdated);
      };
    },
    [tokenBridge, handleTokenTransferUpdated]
  );

  const handleDeposit = useCallback(
    async (amount: bigint, token: Token, receiverAddress?: string) => {
      if (!tokenBridge)
        return;

      try {
        setLastTokenTransfer(undefined);
        setLastError(undefined);

        if (token.type !== 'native' && token.type !== 'fa1.2' && token.type !== 'fa2')
          return;

        console.log('Deposit', amount, token, receiverAddress);

        const { tokenTransfer } = await tokenBridge.deposit(amount, token);
        setLastTokenTransfer(tokenTransfer);
        tokenTransfersStoreDispatch({ type: 'added', payload: tokenTransfer });
        tokenBridge.subscribeToTokenTransfer(tokenTransfer);
      }
      catch (error) {
        if (error instanceof AbortedBeaconError)
          return;

        setLastTokenTransfer(undefined);
        setLastError(getErrorMessage(error));
      }
    },
    [tokenBridge, tokenTransfersStoreDispatch]
  );

  const handleWithdraw = useCallback(
    async (amount: bigint, token: Token, receiverAddress?: string) => {
      if (!tokenBridge)
        return;

      try {
        setLastTokenTransfer(undefined);
        setLastError(undefined);

        if (token.type === 'native')
          throw new Error('Native Etherlink token withdrawal is not yet supported.');
        if (token.type !== 'erc20')
          return;

        console.log('Withdraw', amount, token, receiverAddress);

        const { tokenTransfer } = await tokenBridge.startWithdraw(amount, token);
        setLastTokenTransfer(tokenTransfer);
        tokenTransfersStoreDispatch({ type: 'added', payload: tokenTransfer });
        tokenBridge.subscribeToTokenTransfer(tokenTransfer);
      }
      catch (error) {
        setLastTokenTransfer(undefined);
        setLastError(getErrorMessage(error));
      }
    },
    [tokenBridge, tokenTransfersStoreDispatch]
  );

  const handleFinishWithdrawing = useCallback(
    async (sealedWithdrawal: SealedBridgeTokenWithdrawal) => {
      if (!tokenBridge)
        return;

      await tokenBridge.finishWithdraw(sealedWithdrawal);
    },
    [tokenBridge]
  );

  return <main className="flex flex-col justify-center items-center pt-6">
    <BridgePure isLoading={!!tokenBridge}
      tezosAccountConnectionStatus={tezosConnectionStatus}
      etherlinkAccountConnectionStatus={etherlinkConnectionStatus}
      onDeposit={handleDeposit}
      onWithdraw={handleWithdraw}
      tokenPairs={tokenPairs}
      tokenBalances={tokenBalances} />
    {lastError && <TransferError message={lastError} />}
    {lastTokenTransfer && <div className="w-full max-w-xl">
      <h2 className="text-2xl font-medium dark:text-gray-100">Last Transfer</h2>
      <BridgeTransfer bridgeTokenTransfer={lastTokenTransfer} onFinishWithdrawing={handleFinishWithdrawing} />
    </div>}
  </main>;
}
