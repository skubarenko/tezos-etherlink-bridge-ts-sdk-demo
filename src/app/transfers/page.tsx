'use client';

import {
  BridgeTokenTransferStatus,
  utils as bridgeUtils,
  type BridgeTokenTransfer,
  type SealedBridgeTokenWithdrawal,
} from '@baking-bad/tezos-etherlink-bridge-sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { BridgeTransfer } from '@/components/Transfer';
import { SpinIcon } from '@/components/icons';
import { useAppContext, useEtherlinkAccount, useTezosAccount, useTokenTransfersStoreContext } from '@/hooks';

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

  const handleTokenTransferCreatedOrUpdated = useCallback(
    (tokenTransfer: BridgeTokenTransfer) => {
      const initialOperationHash = bridgeUtils.getInitialOperationHash(tokenTransfer);
      console.log('Token Transfer Created or Updated', initialOperationHash, tokenTransfer.kind, tokenTransfer.status);

      tokenTransfersDispatch({ type: 'added-or-updated', payload: tokenTransfer });
    },
    [tokenTransfersDispatch]
  );

  useEffect(
    () => {
      if (!tokenBridge || !(tezosAccount || etherlinkAccount)) {
        setIsTransfersLoading(false);
        tokenTransfersDispatch({ type: 'cleared' });
        return;
      }

      const accounts = tezosAccount && etherlinkAccount
        ? [tezosAccount, etherlinkAccount]
        : (tezosAccount || etherlinkAccount!);

      const loadTokenTransfers = async () => {
        const tokenTransfers = await tokenBridge.data.getAccountTokenTransfers(accounts);
        tokenTransfersDispatch({ type: 'loaded', payload: tokenTransfers });
        setIsTransfersLoading(false);
      };

      tokenBridge.addEventListener('tokenTransferCreated', handleTokenTransferCreatedOrUpdated);
      tokenBridge.addEventListener('tokenTransferUpdated', handleTokenTransferCreatedOrUpdated);
      setIsTransfersLoading(true);
      loadTokenTransfers();
      tokenBridge.stream.subscribeToAccountTokenTransfers(accounts);

      return () => {
        tokenBridge.removeEventListener('tokenTransferCreated', handleTokenTransferCreatedOrUpdated);
        tokenBridge.removeEventListener('tokenTransferUpdated', handleTokenTransferCreatedOrUpdated);
        tokenBridge.stream.unsubscribeFromAllSubscriptions();
      };
    },
    [tokenBridge, tezosAccount, etherlinkAccount, tokenTransfersDispatch, handleTokenTransferCreatedOrUpdated]
  );

  const handleFinishWithdrawing = useCallback(
    async (sealedWithdrawal: SealedBridgeTokenWithdrawal) => {
      if (!tokenBridge)
        return;

      const result = await tokenBridge.finishWithdraw(sealedWithdrawal);
      await result.finishWithdrawOperation.confirmation();
    },
    [tokenBridge]
  );

  return <main className="flex flex-col items-center md:mt-6">
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
