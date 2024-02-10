import {
  BridgeTokenTransferKind, BridgeTokenTransferStatus,
  type SealedBridgeTokenWithdrawal, type BridgeTokenTransfer, type FinishedBridgeTokenDeposit
} from '@baking-bad/tezos-etherlink-bridge-sdk';
import { useCallback, useEffect, useState } from 'react';

import { Transfer, TransferStatus } from './Transfer';
import { findTokenByInfo } from '@/tokens';
import { getErrorMessage } from '@/utils';

interface BridgeTransferProps {
  bridgeTokenTransfer: BridgeTokenTransfer;
  onFinishWithdrawing: (sealedWithdrawal: SealedBridgeTokenWithdrawal) => Promise<void>;
}

const statusesMap = {
  [BridgeTokenTransferStatus.Pending]: TransferStatus.Pending,
  [BridgeTokenTransferStatus.Created]: TransferStatus.Created,
  [BridgeTokenTransferStatus.Sealed]: TransferStatus.Sealed,
  [BridgeTokenTransferStatus.Finished]: TransferStatus.Finished,
  [BridgeTokenTransferStatus.Failed]: TransferStatus.Failed,
} as const;

export const BridgeTransfer = ({ bridgeTokenTransfer, onFinishWithdrawing }: BridgeTransferProps) => {
  const isDeposit = bridgeTokenTransfer.kind === BridgeTokenTransferKind.Deposit;
  const initialOperation = isDeposit ? bridgeTokenTransfer.tezosOperation : bridgeTokenTransfer.etherlinkOperation;
  const [currentError, setCurrentError] = useState<string>();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const tezosOperation: FinishedBridgeTokenDeposit['tezosOperation'] | undefined = (bridgeTokenTransfer as any).tezosOperation;
  const etherlinkOperation: FinishedBridgeTokenDeposit['etherlinkOperation'] | undefined = (bridgeTokenTransfer as any).etherlinkOperation;
  const rollupData = bridgeTokenTransfer.status === BridgeTokenTransferStatus.Sealed ? bridgeTokenTransfer.rollupData : undefined;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useEffect(() => setCurrentError(undefined), [bridgeTokenTransfer.status]);

  const handleFinishWithdrawing = useCallback(
    () => {
      setCurrentError(undefined);
      return bridgeTokenTransfer.status === BridgeTokenTransferStatus.Sealed
        ? onFinishWithdrawing(bridgeTokenTransfer)
          .catch(error => setCurrentError(getErrorMessage(error)))
        : Promise.resolve();
    },
    [bridgeTokenTransfer, onFinishWithdrawing]
  );

  return <Transfer isDeposit={isDeposit}
    amount={initialOperation.amount}
    token={findTokenByInfo(initialOperation.token, isDeposit)}
    status={statusesMap[bridgeTokenTransfer.status]}
    tezosOperationHash={tezosOperation?.hash}
    tezosOperationTimestamp={tezosOperation?.timestamp}
    etherlinkOperationHash={etherlinkOperation?.hash}
    etherlinkOperationTimestamp={etherlinkOperation?.timestamp}
    rollupData={rollupData}
    error={currentError}
    onFinishWithdrawing={handleFinishWithdrawing}
  />;
};
