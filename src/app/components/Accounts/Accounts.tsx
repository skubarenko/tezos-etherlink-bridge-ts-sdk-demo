'use client';

import { memo } from 'react';

import { EtherlinkAccount } from './EtherlinkAccount';
import { TezosAccount } from './TezosAccount';

export const Accounts = () => {
  return <>
    <TezosAccount />
    <EtherlinkAccount />
  </>;
};

export const AccountsPure = memo(Accounts);
