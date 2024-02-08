import { memo } from 'react';

import { BlockchainPure } from './Blockchain';

interface TransferProps {
  title: string;
  isTezos: boolean;
  balance: string;
  children: React.ReactNode;
}

export const Transfer = (props: TransferProps) => {
  return <div className="flex flex-col w-full my-4 dark:text-gray-100">
    <div className="flex justify-between pr-4 mb-4">
      <span className="font-medium text-slate-600 dark:text-slate-500">{props.title}</span>
      <BlockchainPure isTezos={props.isTezos} />
    </div>
    <div className="flex flex-col items-end px-4 py-2 rounded-lg border-solid dark:bg-slate-600">
      <div className="flex w-full justify-between items-center mb-2">
        {props.children}
      </div>
      <div className="text-sm text-gray-300">Balance: {props.balance}</div>
    </div>
  </div>;
};

export const TransferPure = memo(Transfer);
