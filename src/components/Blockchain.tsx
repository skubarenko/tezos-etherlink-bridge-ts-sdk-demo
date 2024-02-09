// https://github.com/vercel/next.js/issues/53715
/* eslint-disable @next/next/no-img-element */

import { memo } from 'react';

import { TezosLogo } from '@/components/icons';
import etherlinkLogo from '@/public/icons/etherlinkLogo.webp';

interface BlockchainProps {
  isTezos: boolean;
  name?: string | null;
}

export const Blockchain = (props: BlockchainProps) => {
  const name = props.name === undefined
    ? props.isTezos ? 'Tezos' : 'Etherlink'
    : props.name;

  return <span className="flex items-center">
    {props.isTezos
      ? <TezosLogo className="inline w-6 h-6 p-1 mr-1 bg-white rounded-full" />
      : <img src={etherlinkLogo.src} alt="Etherlink Logo" className="inline w-6 h-6 mr-1 rounded-full" />
    }
    {name && <span>{name}</span>}
  </span>;
};

export const BlockchainPure = memo(Blockchain);
