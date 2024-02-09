// https://github.com/vercel/next.js/issues/53715
/* eslint-disable @next/next/no-img-element */
import { memo } from 'react';

import type { Token as TokenModel } from '@/models';
import { combineClassNames } from '@/utils';

interface TokenProps {
  token: TokenModel;
  iconSize?: number;
  showName?: boolean;
  className?: string;
  iconClassName?: string
}

export const Token = (props: TokenProps) => {
  const iconSize = props.iconSize || 32;
  const iconClassName = props.iconClassName || 'mr-2';

  return <span className={combineClassNames('inline-flex items-center justify-center text-nowrap', props.className)}>
    <img src={props.token.iconUrl} alt={props.token.name} width={iconSize} height={iconSize} className={combineClassNames('inline rounded-full', iconClassName)} />
    {props.showName
      ? <span className="inline-flex flex-col overflow-hidden">
        <span className="overflow-hidden overflow-ellipsis">{props.token.ticker}</span>
        <span className="text-sm overflow-hidden overflow-ellipsis">{props.token.name}</span>
      </span>
      : <span className="overflow-hidden overflow-ellipsis">{props.token.ticker}</span>
    }
  </span>;
};

export const TokenPure = memo(Token);
