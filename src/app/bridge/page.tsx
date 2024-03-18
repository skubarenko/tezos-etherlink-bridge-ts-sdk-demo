'use client';

import {
  BridgeTokenTransferStatus,
  utils as bridgeUtils,
  type TokenBridge,
  type BridgeTokenTransfer,
  type SealedBridgeTokenWithdrawal,
} from '@baking-bad/tezos-etherlink-bridge-sdk';
import { useCallback, useEffect, useState } from 'react';

import { BridgePure } from './Bridge';
import { TransferError } from './TransferError';
import { BridgeTransfer } from '@/components/Transfer';
import { useAppContext, useEtherlinkAccount, useIsomorphicLayoutEffect, useTezosAccount, useLocalTokenTransfersStoreContext } from '@/hooks';
import type { Token } from '@/models';
import { findTokenByInfo, tokenPairs, tokens } from '@/tokens';
import { getErrorMessage, tokenUtils, walletUtils } from '@/utils';

const getActualTokenTransferStateValue = (newTokenTransfer: BridgeTokenTransfer) => (previousTokenTransfer: BridgeTokenTransfer | undefined) => {
  return previousTokenTransfer && bridgeUtils.getInitialOperation(previousTokenTransfer).hash === bridgeUtils.getInitialOperation(newTokenTransfer).hash
    ? newTokenTransfer
    : previousTokenTransfer;
};

const emptyBalancesMap = new Map<Token, string>();
const loadBalances = async (
  tokenBridge: TokenBridge,
  tezosAccountAddress: string | undefined,
  etherlinkAccountAddress: string | undefined
): Promise<ReadonlyMap<Token, string>> => {
  const tezosAndEtherlinkAccountBalances = await Promise.all([
    tezosAccountAddress && tokenBridge.data.getBalances(tezosAccountAddress, tokens),
    etherlinkAccountAddress && tokenBridge.data.getBalances(etherlinkAccountAddress, tokens)
  ]);

  const newBalancesMap = new Map<Token, string>();
  let isTezos = true;
  for (const accountBalances of tezosAndEtherlinkAccountBalances) {
    if (accountBalances)
      accountBalances.tokenBalances.forEach(balanceInfo => {
        const token = findTokenByInfo(balanceInfo.token, isTezos);
        if (token)
          newBalancesMap.set(token, tokenUtils.convertTokensRawAmountToAmount(balanceInfo.balance, token.decimals));
      });

    isTezos = false;
  }

  return newBalancesMap;
};

export default function Bridge() {
  const [tokenBalances, setTokenBalances] = useState<ReadonlyMap<Token, string>>(emptyBalancesMap);
  const [lastTokenTransfer, setLastTokenTransfer] = useState<BridgeTokenTransfer>();
  const [lastError, setLastError] = useState<string>();
  const { connectionStatus: etherlinkConnectionStatus, address: etherlinkAccountAddress } = useEtherlinkAccount();
  const { connectionStatus: tezosConnectionStatus, address: tezosAccountAddress } = useTezosAccount();
  const app = useAppContext();
  const { dispatch: tokenTransfersStoreDispatch } = useLocalTokenTransfersStoreContext();
  const tokenBridge = app?.tokenBridge;

  useEffect(
    () => {
      if (!tokenBridge)
        return;

      loadBalances(tokenBridge, tezosAccountAddress, etherlinkAccountAddress)
        .then(tokenBalances => setTokenBalances(tokenBalances));
    },
    [etherlinkAccountAddress, tezosAccountAddress, tokenBridge]
  );

  useIsomorphicLayoutEffect(
    () => {
      if (!lastTokenTransfer && !lastError)
        return;

      window.scrollTo(0, document.body.scrollHeight);
    },
    [lastTokenTransfer, lastError]
  );

  const handleTokenTransferUpdated = useCallback(
    (tokenTransfer: BridgeTokenTransfer) => {
      const initialOperationHash = bridgeUtils.getInitialOperation(tokenTransfer).hash;
      console.log('Token Transfer Updated', initialOperationHash, tokenTransfer.kind, tokenTransfer.status);

      setLastTokenTransfer(getActualTokenTransferStateValue(tokenTransfer));
      if (tokenBridge) {
        loadBalances(tokenBridge, tezosAccountAddress, etherlinkAccountAddress)
          .then(tokenBalances => setTokenBalances(tokenBalances));
      }

      if (tokenTransfer.status === BridgeTokenTransferStatus.Finished) {
        console.log(`Unsubscribe from the ${initialOperationHash} token transfer`);
        tokenBridge?.stream.unsubscribeFromOperationTokenTransfers(tokenTransfer);
      }
    },
    [tokenBridge, etherlinkAccountAddress, tezosAccountAddress]
  );

  useEffect(
    () => {
      if (!tokenBridge)
        return;

      tokenBridge.addEventListener('tokenTransferUpdated', handleTokenTransferUpdated);

      return () => {
        tokenBridge.removeEventListener('tokenTransferUpdated', handleTokenTransferUpdated);
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
        tokenBridge.stream.subscribeToOperationTokenTransfers(tokenTransfer);
      }
      catch (error) {
        if (walletUtils.isUserAbortedWalletError(error))
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
        tokenBridge.stream.subscribeToOperationTokenTransfers(tokenTransfer);
      }
      catch (error) {
        if (walletUtils.isUserAbortedWalletError(error))
          return;

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

      const result = await tokenBridge.finishWithdraw(sealedWithdrawal);
      await tokenBridge.waitForStatus(result.tokenTransfer, BridgeTokenTransferStatus.Finished);
    },
    [tokenBridge]
  );

  return <main className="flex flex-col justify-center items-center md:mt-6">
    <BridgePure isLoading={!!tokenBridge}
      tezosAccountConnectionStatus={tezosConnectionStatus}
      etherlinkAccountConnectionStatus={etherlinkConnectionStatus}
      onDeposit={handleDeposit}
      onWithdraw={handleWithdraw}
      tokenPairs={tokenPairs}
      tokenBalances={tokenBalances} />
    {lastError && <TransferError message={lastError} />}
    {lastTokenTransfer && <BridgeTransfer bridgeTokenTransfer={lastTokenTransfer} onFinishWithdrawing={handleFinishWithdrawing} />}
  </main>;
}
