import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

import { ExternalLink } from './ExternalLink';
import { combineClassNames } from '@/utils';

export const enum LinkType {
  Address = 0,
  Operation = 1
}

export const enum ExplorerType {
  TzKT = 0,
  BCD = 1,
  Blockscout = 2
}

interface ExplorerLinkProps {
  value: string;
  type: LinkType;
  explorer?: ExplorerType;
  displayShort?: boolean;
  className?: string;
}

const getUrl = (value: string, type: LinkType, explorer?: ExplorerType): string => {
  explorer = explorer ?? (value.startsWith('0x') ? ExplorerType.Blockscout : ExplorerType.TzKT);

  switch (explorer) {
    case ExplorerType.TzKT:
      return `https://nairobinet.tzkt.io/${value}`;
    case ExplorerType.BCD:
      return `https://better-call.dev/nairobinet/${value}`;
    case ExplorerType.Blockscout:
      return `https://blockscout.dipdup.net/${type === LinkType.Address ? 'address' : 'tx'}/${value}`;
  }
};

const getShortValue = (value: string): string => {
  return `${value.substring(0, 6)}..${value.substring(value.length - 5)}`;
};

export const ExplorerLink = (props: ExplorerLinkProps) => {
  const displayShort = props.displayShort ?? true;

  return <ExternalLink href={getUrl(props.value, props.type, props.explorer)} className="font-mono">
    <span>{displayShort ? getShortValue(props.value) : props.value}</span>
  </ExternalLink>;
};

export const ExplorerLinkPure = React.memo(ExplorerLink);
