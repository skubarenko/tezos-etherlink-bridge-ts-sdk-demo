'use client';

import {
  BridgeTokenTransferStatus,
  utils as bridgeUtils,
  type BridgeTokenTransfer,
  type SealedBridgeTokenWithdrawal,
} from '@baking-bad/tezos-etherlink-bridge-sdk';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useTokenTransfersStore } from './tokenTransfersStore';
import { BridgeTransfer } from '@/components/Transfer';
import { SpinIcon } from '@/components/icons';
import { useAppContext, useEtherlinkAccount, useTezosAccount, useLocalTokenTransfersStoreContext } from '@/hooks';

const enum TokenTransfersLoadingState {
  Ready = 0,
  Loading = 1,
  AllTransfersLoaded = 2
}

const tokenTransfersLimit = 25;
const scrollThreshold = 5;

export default function Transfers() {
  const app = useAppContext();
  const tokenBridge = app?.tokenBridge;
  const { localTokenTransfers, dispatch: dispatchToLocalTokenTransfersStore } = useLocalTokenTransfersStoreContext();
  const [tokenTransfers, dispatchToTokenTransfersStore] = useTokenTransfersStore();
  const { address: tezosAccount } = useTezosAccount();
  const { address: etherlinkAccount } = useEtherlinkAccount();
  const [isTransfersLoading, setIsTransfersLoading] = useState(true);
  const loadingState = useRef(TokenTransfersLoadingState.Ready);
  const offsetRef = useRef(tokenTransfers.length);

  const handleTokenTransferCreated = useCallback(
    (tokenTransfer: BridgeTokenTransfer) => {
      const initialOperationHash = bridgeUtils.getInitialOperationHash(tokenTransfer);
      console.log('Token Transfer Created', initialOperationHash, tokenTransfer.kind, tokenTransfer.status);

      dispatchToTokenTransfersStore({ type: 'added', payload: tokenTransfer });
      dispatchToLocalTokenTransfersStore({ type: 'deleted', payload: tokenTransfer });
    },
    [dispatchToTokenTransfersStore, dispatchToLocalTokenTransfersStore]
  );

  const handleTokenTransferUpdated = useCallback(
    (tokenTransfer: BridgeTokenTransfer) => {
      const initialOperationHash = bridgeUtils.getInitialOperationHash(tokenTransfer);
      console.log('Token Transfer Updated', initialOperationHash, tokenTransfer.kind, tokenTransfer.status);

      dispatchToTokenTransfersStore({ type: 'added-or-updated', payload: tokenTransfer });
      dispatchToLocalTokenTransfersStore({ type: 'deleted', payload: tokenTransfer });
    },
    [dispatchToTokenTransfersStore, dispatchToLocalTokenTransfersStore]
  );

  useEffect(() => {
    dispatchToTokenTransfersStore({ type: 'loaded', payload: [...localTokenTransfers.values()] });
  }, [localTokenTransfers, dispatchToTokenTransfersStore]);

  useEffect(() => {
    offsetRef.current = tokenTransfers.length - localTokenTransfers.size;
  }, [tokenTransfers.length, localTokenTransfers.size]);

  useEffect(() => {
    offsetRef.current = 0;
  }, [tezosAccount, etherlinkAccount]);

  useEffect(
    () => {
      if (!tokenBridge || !(tezosAccount || etherlinkAccount)) {
        setIsTransfersLoading(false);
        dispatchToTokenTransfersStore({ type: 'cleared' });
        return;
      }

      const accounts = tezosAccount && etherlinkAccount
        ? [tezosAccount, etherlinkAccount]
        : (tezosAccount || etherlinkAccount!);

      const loadTokenTransfers = async () => {
        if (loadingState.current !== TokenTransfersLoadingState.Ready)
          return;

        setIsTransfersLoading(true);
        loadingState.current = TokenTransfersLoadingState.Loading;
        const tokenTransfers = await tokenBridge.data.getAccountTokenTransfers(accounts, { offset: offsetRef.current, limit: tokenTransfersLimit });
        dispatchToTokenTransfersStore({ type: 'loaded', payload: tokenTransfers });
        setIsTransfersLoading(false);
        loadingState.current = tokenTransfers.length ? TokenTransfersLoadingState.Ready : TokenTransfersLoadingState.AllTransfersLoaded;
      };

      const handleScrollWindow = () => {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - scrollThreshold) {
          loadTokenTransfers();
        }
      };

      tokenBridge.addEventListener('tokenTransferCreated', handleTokenTransferCreated);
      tokenBridge.addEventListener('tokenTransferUpdated', handleTokenTransferUpdated);
      loadTokenTransfers();
      tokenBridge.stream.subscribeToAccountTokenTransfers(accounts);

      typeof window !== 'undefined' && window.addEventListener('scroll', handleScrollWindow);

      return () => {
        tokenBridge.removeEventListener('tokenTransferCreated', handleTokenTransferCreated);
        tokenBridge.removeEventListener('tokenTransferUpdated', handleTokenTransferUpdated);
        tokenBridge.stream.unsubscribeFromAllSubscriptions();
        dispatchToTokenTransfersStore({ type: 'cleared' });

        typeof window !== 'undefined' && window.removeEventListener('scroll', handleScrollWindow);
      };
    },
    [tokenBridge, tezosAccount, etherlinkAccount, handleTokenTransferCreated, handleTokenTransferUpdated, dispatchToTokenTransfersStore]
  );

  const handleFinishWithdrawing = useCallback(
    async (sealedWithdrawal: SealedBridgeTokenWithdrawal) => {
      if (!tokenBridge)
        return;

      const result = await tokenBridge.finishWithdraw(sealedWithdrawal);
      await tokenBridge.waitForStatus(result.tokenTransfer, BridgeTokenTransferStatus.Finished);
    },
    [tokenBridge]
  );

  return <main className="flex flex-col items-center md:mt-6">
    <>
      {tokenTransfers.length
        ? tokenTransfers.map(tokenTransfer => <BridgeTransfer key={bridgeUtils.getInitialOperationHash(tokenTransfer)}
          bridgeTokenTransfer={tokenTransfer} onFinishWithdrawing={handleFinishWithdrawing}
        />)
        : !isTransfersLoading && <span>No transfers</span>
      }
      {isTransfersLoading &&
        (!tokenTransfers.length
          ? <div className="flex items-center text-lg mt-10">
            <SpinIcon className="animate-spin h-5 w-5 mr-2 text-white" />
            <span>Loading transfers...</span>
          </div>
          : <SpinIcon className="animate-spin h-5 w-5 mb-4 text-white" />
        )}
    </>
  </main>;
}
