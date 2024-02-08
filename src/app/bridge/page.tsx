'use client';

import { useCallback, useEffect, useState } from 'react';

import { BridgePure } from './Bridge';
import type { Token } from '@/models';
import { tokenPairs } from '@/tokens';

const emptyBalancesMap = new Map<Token, string>();
const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export default function Bridge() {
  const [tokenBalances, setTokenBalances] = useState<ReadonlyMap<Token, string>>(emptyBalancesMap);

  useEffect(() => {
    setTokenBalances(
      new Map<Token, string>()
        .set(tokenPairs[0]!.tezos, '10.1043')
        .set(tokenPairs[0]!.etherlink, '0')
        .set(tokenPairs[1]!.tezos, '143')
        .set(tokenPairs[1]!.etherlink, '245')
        .set(tokenPairs[2]!.tezos, '0')
    );
  }, []);

  const handleDeposit = useCallback(
    async (amount: bigint, token: Token, receiverAddress?: string) => {
      console.log('Deposit', amount, token, receiverAddress);
      await wait(5000);
      console.log('Deposited');
    },
    []
  );

  const handleWithdraw = useCallback(
    async (amount: bigint, token: Token, receiverAddress?: string) => {
      console.log('Withdrawal', amount, token, receiverAddress);
      await wait(1000);
    },
    []
  );

  return <main className="flex justify-center items-center pt-6">
    <BridgePure
      isLoading={typeof window === 'undefined'}
      isEtherlinkAccountConnected={true}
      isTezosAccountConnected={true}
      onDeposit={handleDeposit}
      onWithdraw={handleWithdraw}
      tokenPairs={tokenPairs}
      tokenBalances={tokenBalances} />
  </main>;
}
