'use client';

import {
  utils as bridgeUtils,
  BridgeTokenTransferStatus,
  type BridgeTokenTransfer,
  type SealedBridgeTokenWithdrawal,
} from '@baking-bad/tezos-etherlink-bridge-sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { BridgeTransfer } from '@/components/Transfer';
import { SpinIcon } from '@/components/icons';
import { useAppContext, useEtherlinkAccount, useTezosAccount, useTokenTransfersStoreContext } from '@/hooks';

const setTokenTransfersActionState = (updatedTokenTransfer: BridgeTokenTransfer) => (tokenTransfers: readonly BridgeTokenTransfer[]): readonly BridgeTokenTransfer[] => {
  const updatedTokenTransferOperation = bridgeUtils.getInitialOperation(updatedTokenTransfer);

  if (tokenTransfers[0]) {
    const lastTokenTransferOperation = bridgeUtils.getInitialOperation(tokenTransfers[0]);

    const startSliceIndex = lastTokenTransferOperation.hash === updatedTokenTransferOperation.hash
      ? 1
      : lastTokenTransferOperation.timestamp.localeCompare(updatedTokenTransferOperation.timestamp) < 1
        ? 0
        : -1;

    if (startSliceIndex > -1) {
      const updatedTokenTransfers = tokenTransfers.slice(startSliceIndex);
      updatedTokenTransfers.unshift(updatedTokenTransfer);

      return updatedTokenTransfers;
    }
  }

  if (tokenTransfers[tokenTransfers.length - 1]) {
    const firstTokenTransferOperation = bridgeUtils.getInitialOperation(tokenTransfers[tokenTransfers.length - 1]);

    if (firstTokenTransferOperation.hash === updatedTokenTransferOperation.hash) {
      const updatedTokenTransfers = tokenTransfers.slice(0, tokenTransfers.length - 1);
      updatedTokenTransfers.push(updatedTokenTransfer);

      return updatedTokenTransfers;
    }

    if (firstTokenTransferOperation.timestamp.localeCompare(updatedTokenTransferOperation.timestamp) === 1)
      return tokenTransfers;
  }

  let isUpdated = false;
  const updatedTokenTransfers = [];
  for (const tokenTransfer of tokenTransfers) {
    const tokenTransferOperation = bridgeUtils.getInitialOperation(tokenTransfer);
    if (updatedTokenTransferOperation.hash === tokenTransferOperation.hash) {
      isUpdated = true;
      updatedTokenTransfers.push(updatedTokenTransfer);
    } else
      updatedTokenTransfers.push(tokenTransfer);
  }

  return isUpdated ? updatedTokenTransfers : tokenTransfers;
};

export default function Transfers() {
  const app = useAppContext();
  const tokenBridge = app?.tokenBridge;
  const { tokenTransfers: tokenTransfersMap, dispatch: tokenTransfersDispatch } = useTokenTransfersStoreContext();
  const { address: tezosAccount } = useTezosAccount();
  const { address: etherlinkAccount } = useEtherlinkAccount();
  const [isTransfersLoading, setIsTransfersLoading] = useState(true);
  const tokenTransfers = useMemo(
    () => [...tokenTransfersMap.values()].sort((tokenTransferA, tokenTransferB) => {
      const initialOperationA = bridgeUtils.getInitialOperation(tokenTransferA);
      const initialOperationB = bridgeUtils.getInitialOperation(tokenTransferB);

      return initialOperationB.timestamp.localeCompare(initialOperationA.timestamp);
    }),
    [tokenTransfersMap]
  );

  const handleTokenTransferUpdated = useCallback(
    (tokenTransfer: BridgeTokenTransfer) => {
      const initialOperationHash = bridgeUtils.getInitialOperationHash(tokenTransfer);
      console.log('Token Transfer Updated', initialOperationHash, tokenTransfer.kind, tokenTransfer.status);

      tokenTransfersDispatch({ type: 'updated', payload: tokenTransfer });

      if (tokenTransfer.status === BridgeTokenTransferStatus.Finished) {
        console.log(`Unsubscribe from the ${initialOperationHash} token transfer`);
        tokenBridge?.unsubscribeFromTokenTransfer(tokenTransfer);
      }
    },
    [tokenBridge, tokenTransfersDispatch]
  );

  useEffect(
    () => {
      if (!tokenBridge || !(tezosAccount || etherlinkAccount))
        return;

      const accounts = tezosAccount && etherlinkAccount
        ? [tezosAccount, etherlinkAccount]
        : (tezosAccount || etherlinkAccount);

      const loadTokenTransfers = async () => {
        const tokenTransfers = await tokenBridge.data.getTokenTransfers(accounts);
        tokenTransfersDispatch({ type: 'loaded', payload: tokenTransfers });
        setIsTransfersLoading(false);
      };

      tokenBridge.events.tokenTransferUpdated.addListener(handleTokenTransferUpdated);
      setIsTransfersLoading(true);
      loadTokenTransfers();

      return () => {
        tokenBridge.events.tokenTransferUpdated.removeListener(handleTokenTransferUpdated);
      };
    },
    [tokenBridge, tezosAccount, etherlinkAccount, tokenTransfersDispatch, handleTokenTransferUpdated]
  );

  const handleFinishWithdrawing = useCallback(
    async (sealedWithdrawal: SealedBridgeTokenWithdrawal) => {
      if (!tokenBridge)
        return;

      await tokenBridge.finishWithdraw(sealedWithdrawal);
    },
    [tokenBridge]
  );

  return <main className="flex flex-col items-center pt-6">
    {isTransfersLoading || !tokenTransfers.length
      ? <div className="flex items-center text-lg mt-10">
        {isTransfersLoading
          ? <>
            <SpinIcon className="animate-spin h-5 w-5 mr-2 text-white" />
            <span>Loading transfers...</span>
          </>
          : <span>No transfers</span>
        }
      </div>
      : tokenTransfers.map(tokenTransfer => <BridgeTransfer key={bridgeUtils.getInitialOperationHash(tokenTransfer)}
        bridgeTokenTransfer={tokenTransfer} onFinishWithdrawing={handleFinishWithdrawing}
      />)}
  </main>;
}
