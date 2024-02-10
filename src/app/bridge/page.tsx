'use client';

import { useCallback, useEffect, useState } from 'react';

import { BridgePure } from './Bridge';
import { TransferError } from './TransferError';
import { BridgeTransfer } from '@/components/Transfer';
import { useAppContext, useEtherlinkAccount, useTezosAccount } from '@/hooks';
import {
  BridgeTokenTransferKind, BridgeTokenTransferStatus,
  type BridgeTokenTransfer,
  SealedBridgeTokenWithdrawal
} from '@/lib/bridgeOperations';
import type { Token } from '@/models';
import { tokenPairs } from '@/tokens';
import { getErrorMessage, wait } from '@/utils';

const emptyBalancesMap = new Map<Token, string>();

export default function Bridge() {
  const [tokenBalances, setTokenBalances] = useState<ReadonlyMap<Token, string>>(emptyBalancesMap);
  const [lastTokenTransfer, setLastTokenTransfer] = useState<BridgeTokenTransfer>();
  const [lastError, setLastError] = useState<string>();
  const { connectionStatus: etherlinkConnectionStatus } = useEtherlinkAccount();
  const { connectionStatus: tezosConnectionStatus } = useTezosAccount();
  const app = useAppContext();

  useEffect(() => {
    setTokenBalances(
      new Map<Token, string>()
        .set(tokenPairs[0]!.tezos, '10.1043')
        .set(tokenPairs[0]!.etherlink, '1')
        .set(tokenPairs[1]!.tezos, '143')
        .set(tokenPairs[1]!.etherlink, '245')
        .set(tokenPairs[2]!.tezos, '0')
    );
  }, []);

  const handleDeposit = useCallback(
    async (amount: bigint, token: Token, receiverAddress?: string) => {
      try {
        setLastTokenTransfer(undefined);
        setLastError(undefined);

        if (token.type !== 'native' && token.type !== 'fa1.2' && token.type !== 'fa2')
          return;

        console.log('Deposit', amount, token, receiverAddress);
        await wait(1000);
        setLastTokenTransfer({
          kind: BridgeTokenTransferKind.Deposit,
          status: BridgeTokenTransferStatus.Pending,
          source: 'tz1M6VFkpALGXYoP5CvobR3z1pYu7KvirpMF',
          receiver: '0x4A1819c83A78C948db50f80fED82721Dd0401c9b',
          tezosOperation: {
            amount,
            token,
            hash: 'oorJbgPbd3gkWVKuQ8hgqBFyAeGBMqKYddNWy1wuDjHHTYP6u4u',
            timestamp: 'February-07-2024, 18:51:37'
          }
        });
        await wait(4000);
        setLastTokenTransfer({
          kind: BridgeTokenTransferKind.Deposit,
          status: BridgeTokenTransferStatus.Created,
          source: 'tz1M6VFkpALGXYoP5CvobR3z1pYu7KvirpMF',
          receiver: '0x4A1819c83A78C948db50f80fED82721Dd0401c9b',
          tezosOperation: {
            blockId: 3006619,
            fee: 0n,
            amount,
            token,
            hash: 'oorJbgPbd3gkWVKuQ8hgqBFyAeGBMqKYddNWy1wuDjHHTYP6u4u',
            timestamp: 'February-07-2024, 18:51:37'
          }
        });
        wait(5000)
          .then(() => {
            setLastTokenTransfer({
              kind: BridgeTokenTransferKind.Deposit,
              status: BridgeTokenTransferStatus.Finished,
              source: 'tz1M6VFkpALGXYoP5CvobR3z1pYu7KvirpMF',
              receiver: '0x4A1819c83A78C948db50f80fED82721Dd0401c9b',
              tezosOperation: {
                blockId: 3006619,
                fee: 0n,
                amount,
                token,
                hash: 'oorJbgPbd3gkWVKuQ8hgqBFyAeGBMqKYddNWy1wuDjHHTYP6u4u',
                timestamp: 'February-07-2024, 18:51:37'
              },
              etherlinkOperation: {
                blockId: 89975,
                fee: 0n,
                amount,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                token: token as any,
                hash: '0xda23bad90d9110010f934d06ad86cb4b09a1f327d4af0ea910ebe0d24c6db33e',
                timestamp: 'February-07-2024, 18:51:49'
              }
            });
          });

        console.log('Deposited');
      }
      catch (error) {
        setLastTokenTransfer(undefined);
        setLastError(getErrorMessage(error));
      }
    },
    []
  );

  const handleWithdraw = useCallback(
    async (amount: bigint, token: Token, receiverAddress?: string) => {
      try {
        setLastTokenTransfer(undefined);
        setLastError(undefined);

        if (token.type !== 'native' && token.type !== 'erc20')
          return;

        console.log('Withdrawal', amount, token, receiverAddress);
        await wait(1000);

        setLastTokenTransfer({
          kind: BridgeTokenTransferKind.Withdrawal,
          status: BridgeTokenTransferStatus.Pending,
          source: '0x4A1819c83A78C948db50f80fED82721Dd0401c9b',
          receiver: 'tz1M6VFkpALGXYoP5CvobR3z1pYu7KvirpMF',
          etherlinkOperation: {
            amount,
            token,
            hash: '0x59774fe72538e0ddd041d41318ae1c09394b692a6387f079af808d5cf4159eb4',
            timestamp: 'February-07-2024, 18:52:01'
          }
        });

        await wait(4000);

        setLastTokenTransfer({
          kind: BridgeTokenTransferKind.Withdrawal,
          status: BridgeTokenTransferStatus.Created,
          source: '0x4A1819c83A78C948db50f80fED82721Dd0401c9b',
          receiver: 'tz1M6VFkpALGXYoP5CvobR3z1pYu7KvirpMF',
          etherlinkOperation: {
            blockId: 89979,
            fee: 0n,
            amount,
            token,
            hash: '0x59774fe72538e0ddd041d41318ae1c09394b692a6387f079af808d5cf4159eb4',
            timestamp: 'February-07-2024, 18:52:01'
          },
          rollupData: {
            outboxMessageLevel: 3006623,
            outboxMessageIndex: 0,
          }
        });
        wait(5000)
          .then(() => {
            setLastTokenTransfer({
              kind: BridgeTokenTransferKind.Withdrawal,
              status: BridgeTokenTransferStatus.Sealed,
              source: '0x4A1819c83A78C948db50f80fED82721Dd0401c9b',
              receiver: 'tz1M6VFkpALGXYoP5CvobR3z1pYu7KvirpMF',
              etherlinkOperation: {
                blockId: 89979,
                fee: 0n,
                amount,
                token,
                hash: '0x59774fe72538e0ddd041d41318ae1c09394b692a6387f079af808d5cf4159eb4',
                timestamp: 'February-07-2024, 18:52:01'
              },
              rollupData: {
                outboxMessageLevel: 3006623,
                outboxMessageIndex: 0,
                commitment: 'src12',
                proof: '0300'
              }
            });
          });
      }
      catch (error) {
        setLastTokenTransfer(undefined);
        setLastError(getErrorMessage(error));
      }
    },
    []
  );

  const handleFinishWithdrawing = useCallback(
    async (sealedWithdrawal: SealedBridgeTokenWithdrawal) => {
      await wait(3000);
      setLastTokenTransfer({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...sealedWithdrawal as any,
        status: BridgeTokenTransferStatus.Finished,
        tezosOperation: {
          amount: sealedWithdrawal.etherlinkOperation.amount,
          blockId: 3006674,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          token: sealedWithdrawal.etherlinkOperation.token as any,
          fee: 0n,
          hash: 'ooKZ2ADEagd3fKVA5bMXcd4mWaALCiWYsr2xxACUqvZou2y3pnM',
          timestamp: 'February-07-2024, 19:45:31'
        }
      });
    },
    []
  );

  return <main className="flex flex-col justify-center items-center pt-6">
    <BridgePure isLoading={!!app}
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
