import { useCallback } from 'react';

import {
  AccountMenuBase,
  NetworkMenuItem,
  CopyAddressMenuItem,
  ExplorerMenuItem,
  DisconnectMenuItem
} from './Common';
import { TezosConnectButton } from './ConnectButtons';
import { TezosAccountConnectionStatus } from '@/models';

interface ConnectedTezosAccountProps {
  address: string;

  onSwitchNetwork: () => Promise<void>;
  onDisconnect: () => Promise<void>;
}

const ConnectedTezosAccount = (props: ConnectedTezosAccountProps) => {
  return <AccountMenuBase address={props.address} isTezos={true} isWarn={false} isSwitchingNetwork={false}>
    <>
      <NetworkMenuItem isTezos={true} isSupportedNetwork={true} />
      <CopyAddressMenuItem address={props.address} />
      <ExplorerMenuItem address={props.address} />
      <DisconnectMenuItem onDisconnect={props.onDisconnect} />
    </>
  </AccountMenuBase>;
};

export const TezosAccount = () => {
  const address = 'tz1M6VFkpALGXYoP5CvobR3z1pYu7KvirpMF';
  const connectionState = TezosAccountConnectionStatus.Connected as TezosAccountConnectionStatus;

  const handleSwitchNetwork = useCallback(
    async () => console.log('Switch Network'),
    []
  );

  const handleDisconnect = useCallback(
    async () => console.log('Disconnect Tezos Wallet'),
    []
  );

  return connectionState === TezosAccountConnectionStatus.NotConnected
    ? <TezosConnectButton />
    : <ConnectedTezosAccount address={address}
      onSwitchNetwork={handleSwitchNetwork}
      onDisconnect={handleDisconnect}
    />;
};
