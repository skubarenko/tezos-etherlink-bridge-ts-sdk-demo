import {
  AccountMenuBase,
  NetworkMenuItem,
  CopyAddressMenuItem,
  ExplorerMenuItem,
  DisconnectMenuItem
} from './Common';
import { TezosConnectButton } from './ConnectButtons';
import { useTezosAccount } from '@/hooks';
import { TezosAccountConnectionStatus } from '@/models';

interface ConnectedTezosAccountProps {
  address: string;

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
  const { address, connectionStatus, connect, disconnect } = useTezosAccount();

  return (connectionStatus === TezosAccountConnectionStatus.NotConnected || !address)
    ? <TezosConnectButton onConnect={connect} />
    : <ConnectedTezosAccount address={address} onDisconnect={disconnect} />;
};
