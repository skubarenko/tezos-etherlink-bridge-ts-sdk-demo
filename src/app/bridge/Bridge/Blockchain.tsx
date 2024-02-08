// https://github.com/vercel/next.js/issues/53715
/* eslint-disable @next/next/no-img-element */

import { memo } from 'react';

import { TezosLogo } from '@/components/icons';

import etherlinkLogo from '@/public/icons/etherlinkLogo.webp';

interface BlockchainProps {
  isTezos: boolean
}

export const Blockchain = (props: BlockchainProps) => {
  return props.isTezos
    ? <span>
      <TezosLogo className="inline w-6 h-6 p-1 mr-1 bg-white rounded-full" />
      <span>Tezos</span>
    </span>
    : <span>
      <img src={etherlinkLogo.src} alt="Etherlink Logo" className="inline w-6 h-6 mr-1 rounded-full" />
      <span>Etherlink</span>
    </span>;
};

export const BlockchainPure = memo(Blockchain);
