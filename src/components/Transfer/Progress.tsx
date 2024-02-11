import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Fragment, memo } from 'react';

import { BlockchainPure } from '../Blockchain';

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
          {(index > 0) && <div className={`flex-none h-2 w-2 rotate-45 ${segment.backgroundColorCssClass} ${segment.isPulse ? 'animate-progress' : ''}`}>
          </div>}
          <hr className={`w-full border-dotted border-t-2 ${segment.borderColorCssClass} ${segment.isPulse ? 'animate-progress' : ''}`} />
        </Fragment>
      )}
      {lastSegment && <ChevronRightIcon width={18} height={18} className={`flex-none -ml-2 ${lastSegment.textColorCssClass} ${lastSegment.isPulse ? 'animate-progress' : ''}`} />}
    </div>
    <BlockchainPure isTezos={!props.isDeposit} />
  </div>;
};

export const ProgressPure = memo(Progress);
