import { memo } from 'react';

import { TransferPure } from './Transfer';
import { TokenPure } from '@/components/Token';
import { Token } from '@/models';

interface TransferToProps {
  isTezos: boolean;
  amount: string;
  targetToken: Token | null;
  tokenBalances: ReadonlyMap<Token, string>;
}

export const TransferTo = (props: TransferToProps) => {
  const currentTokenBalance = (props.targetToken && props.tokenBalances.get(props.targetToken)) || '0';

  return <TransferPure title="Transfer To" isTezos={props.isTezos} balance={currentTokenBalance}>
    <>
      <span className="py-2 text-2xl w-full overflow-ellipsis overflow-hidden whitespace-nowrap">{props.amount}</span>
      <div className="flex-none  text-right">
        {props.targetToken
          ? <TokenPure className="max-w-44 pl-2" token={props.targetToken} />
          : <span className="text-nowrap select-none">No Tokens</span>}
      </div>
    </>
  </TransferPure>;
};

export const TransferToPure = memo(TransferTo);
