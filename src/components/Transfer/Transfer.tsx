import { memo, useCallback, useMemo, useState } from 'react';

import { ProgressPure, ProgressSegment } from './Progress';
import { RollupDataLink, type RollupData } from './RollupDataLink';
import { TransferError } from './TransferError';
import { ExplorerLinkPure } from '../ExplorerLink';
import { ExternalLink } from '../ExternalLink';
import { TokenPure } from '../Token';
import { SpinIcon } from '../icons';
import type { Token } from '@/models';
import { blockchainUtils, emptyFunction, tokenUtils } from '@/utils';
import { LinkType } from '@/utils/blockchainUtils';

export const enum TransferStatus {
  Pending = 0,
  Created = 1,
  Sealed = 2,
  Finished = 3,
  Failed = 4
}

const inProgressSegment: ProgressSegment = {
  backgroundColorCssClass: 'dark:bg-cyan-500',
  borderColorCssClass: 'dark:border-cyan-500',
  textColorCssClass: 'dark:text-cyan-500',
  isPulse: true
};
const completedSegment: ProgressSegment = {
  backgroundColorCssClass: 'dark:bg-green-600',
  borderColorCssClass: 'dark:border-green-600',
  textColorCssClass: 'dark:text-green-600',
  isPulse: false
};
const failSegment: ProgressSegment = {
  backgroundColorCssClass: 'dark:bg-red-600',
  borderColorCssClass: 'dark:border-red-600',
  textColorCssClass: 'dark:text-red-600',
  isPulse: false
};

const getProgressSegments = (isDeposit: boolean, status: TransferStatus): readonly ProgressSegment[] => {
  const currentFailSegment = status === TransferStatus.Failed ? failSegment : undefined;

  const segments: ProgressSegment[] = [
    currentFailSegment || (status === TransferStatus.Pending ? inProgressSegment : completedSegment),
  ];
  if (!isDeposit)
    segments.push(currentFailSegment || (status < TransferStatus.Sealed ? inProgressSegment : completedSegment));

  segments.push(currentFailSegment || (status < TransferStatus.Finished ? inProgressSegment : completedSegment));

  return segments;
};

const statusDataMap = {
  [TransferStatus.Pending]: {
    title: 'Pending',
    backgroundColorCssClass: 'dark:bg-cyan-700'
  },
  [TransferStatus.Created]: {
    title: 'Created',
    backgroundColorCssClass: 'dark:bg-cyan-700'
  },
  [TransferStatus.Sealed]: {
    title: 'Sealed',
    backgroundColorCssClass: 'dark:bg-cyan-700'
  },
  [TransferStatus.Finished]: {
    title: 'Completed',
    backgroundColorCssClass: 'dark:bg-green-700'
  },
  [TransferStatus.Failed]: {
    title: 'Failed',
    backgroundColorCssClass: 'dark:bg-red-800'
  },
} as const;

interface TransferProps {
  isDeposit: boolean;
  amount: bigint;
  token: Token | null | undefined;
  status: TransferStatus;
  tezosOperationHash?: string;
  tezosOperationTimestamp?: string;
  etherlinkOperationHash?: string;
  etherlinkOperationTimestamp?: string;
  rollupData?: RollupData;
  error?: string;

  onFinishWithdrawing: () => Promise<void>;
}

export const Transfer = (props: TransferProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const segments = useMemo(
    () => getProgressSegments(props.isDeposit, props.status),
    [props.isDeposit, props.status]
  );

  const onFinishWithdrawing = props.onFinishWithdrawing;
  const handleFinishWithdrawing = useCallback(
    () => {
      setIsLoading(true);
      onFinishWithdrawing()
        .catch(emptyFunction)
        .finally(() => setIsLoading(false));
    },
    [onFinishWithdrawing]
  );

  let firstOperationHash, lastOperationHash, firstOperationTimestamp, lastOperationTimestamp: string | undefined;
  if (props.isDeposit) {
    firstOperationHash = props.tezosOperationHash;
    lastOperationHash = props.etherlinkOperationHash;
    firstOperationTimestamp = props.tezosOperationTimestamp;
    lastOperationTimestamp = props.etherlinkOperationTimestamp;
  }
  else {
    firstOperationHash = props.etherlinkOperationHash;
    lastOperationHash = props.tezosOperationHash;
    firstOperationTimestamp = props.etherlinkOperationTimestamp;
    lastOperationTimestamp = props.tezosOperationTimestamp;
  }

  return <div className="flex flex-col w-full max-w-xl p-4 my-4 rounded-xl overflow-hidden
  dark:text-gray-100 dark:bg-slate-800"
  >
    <div className="flex justify-between items-center text-lg">
      <div className="flex items-center">
        {props.token && <>
          <span className="mr-1.5">{tokenUtils.convertTokensRawAmountToAmount(props.amount, props.token.decimals)}</span>
          {props.token.type !== 'native'
            ? <ExternalLink href={blockchainUtils.getTokenExplorerUrl(props.token)} showArrowIcon={false}>
              <TokenPure token={props.token} iconSize={17} iconClassName="mr-0.5 -mt-0.5" />
            </ExternalLink>
            : <TokenPure token={props.token} iconSize={17} iconClassName="mr-0.5 -mt-0.5" />
          }
        </>}
      </div>
      <div className={`-mt-4 -mr-4 pt-4 pr-2 pb-2 pl-2 w-32 rounded-bl-xl text-center ${statusDataMap[props.status].backgroundColorCssClass}`}>
        {statusDataMap[props.status].title}
      </div>
    </div>
    <div className="mt-6">
      <ProgressPure isDeposit={props.isDeposit} segments={segments} />
    </div>
    <div className="flex justify-between items-center mt-4">
      {firstOperationHash && <ExplorerLinkPure type={LinkType.Operation} value={firstOperationHash} />}
      {lastOperationHash
        ? <ExplorerLinkPure type={LinkType.Operation} value={lastOperationHash} />
        : <RollupDataLink rollupData={props.rollupData} />
      }
    </div>
    <div className="flex justify-between items-center mt-1 text-xs">
      {firstOperationTimestamp && <span>{firstOperationTimestamp}</span>}
      {lastOperationTimestamp && <span>{lastOperationTimestamp}</span>}
    </div>
    {props.status === TransferStatus.Sealed && <div className="flex justify-center items-center">
      <button className="w-full mt-4 h-12 rounded-lg select-none cursor-pointer 
        dark:bg-blue-700 dark:hover:bg-blue-800 disabled:cursor-default disabled:opacity-70"
        onClick={handleFinishWithdrawing} disabled={isLoading}>
        <span className="flex justify-center items-center">
          {isLoading && <SpinIcon className="animate-spin h-5 w-5 mr-2 text-white" />}
          <span>Complete Withdraw</span>
        </span>
      </button>
    </div>}
    {props.error && <TransferError message={props.error} />}
  </div>;
};

export const TransferPure = memo(Transfer);
