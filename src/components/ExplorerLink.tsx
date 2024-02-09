import React from 'react';

import { ExternalLink } from './ExternalLink';
import { textUtils, blockchainUtils } from '@/utils';

interface ExplorerLinkProps {
  value: string;
  type: blockchainUtils.LinkType;
  explorer?: blockchainUtils.ExplorerType;
  displayShort?: boolean;
  className?: string;
}

export const ExplorerLink = (props: ExplorerLinkProps) => {
  const displayShort = props.displayShort ?? true;

  return <ExternalLink href={blockchainUtils.getExplorerUrl(props.value, props.type, props.explorer)} className="font-mono">
    <span>{displayShort ? textUtils.getShortText(props.value, 6, 4) : props.value}</span>
  </ExternalLink>;
};

export const ExplorerLinkPure = React.memo(ExplorerLink);
