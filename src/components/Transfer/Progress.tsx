// https://github.com/vercel/next.js/issues/53715
/* eslint-disable @next/next/no-img-element */
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Fragment, memo } from 'react';

import { BlockchainPure } from '../Blockchain';
import { TezosLogo } from '../icons';
import etherlinkLogo from '@/public/icons/etherlinkLogo.webp';

export interface ProgressSegment {
  readonly backgroundColorCssClass: `${'dark:bg' | 'bg'}-${string}`
  readonly borderColorCssClass: `${'dark:border' | 'border'}-${string}`
  readonly textColorCssClass: `${'dark:text' | 'text'}-${string}`
  readonly isPulse: boolean;
}

interface ProgressProps {
  isDeposit: boolean;
  segments: readonly ProgressSegment[];
}

export const Progress = (props: ProgressProps) => {
  const lastSegment = props.segments[props.segments.length - 1];

  return <div className="flex justify-between items-center">
    <BlockchainPure isTezos={props.isDeposit} />
    <div className="flex-grow flex justify-between items-center ml-2">
      {props.segments.map(
        (segment, index) => <Fragment key={index}>
          {(index > 0) && <div className={`flex-none h-2 w-2 rotate-45 ${segment.backgroundColorCssClass} ${segment.isPulse ? 'animate-pulse' : ''}`}>
          </div>}
          <hr className={`w-full border-dotted border-t-2 ${segment.borderColorCssClass} ${segment.isPulse ? 'animate-pulse' : ''}`} />
        </Fragment>
      )}
      {lastSegment && <ChevronRightIcon className={`flex-none h-5 w-5 -ml-2 ${lastSegment.textColorCssClass} ${lastSegment.isPulse ? 'animate-pulse' : ''}`} />}
    </div>
    <BlockchainPure isTezos={!props.isDeposit} />
  </div>;
};

export const ProgressPure = memo(Progress);
