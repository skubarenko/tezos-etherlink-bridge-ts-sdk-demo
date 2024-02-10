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
  const connectionStatus = TezosAccountConnectionStatus.Connected as TezosAccountConnectionStatus;

  const handleConnect = useCallback(
    async () => console.log('Connect Tezos Wallet'),
    []
  );

  const handleSwitchNetwork = useCallback(
    async () => {
      console.log('Switching Network');
    },
    []
  );

  const handleDisconnect = useCallback(
    async () => console.log('Disconnect Tezos Wallet'),
    []
  );

  return connectionStatus === TezosAccountConnectionStatus.NotConnected
    ? <TezosConnectButton onConnect={handleConnect} />
    : <ConnectedTezosAccount address={address}
      onSwitchNetwork={handleSwitchNetwork}
      onDisconnect={handleDisconnect}
    />;
};
