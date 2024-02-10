import { useCallback, useState } from 'react';

import {
  AccountMenuBase,
  NetworkMenuItem,
  SwitchNetworkMenuItem,
  CopyAddressMenuItem,
  ExplorerMenuItem,
  DisconnectMenuItem
} from './Common';
import { EtherlinkConnectButton } from './ConnectButtons';
import { useEtherlinkAccount } from '@/hooks';
import { EtherlinkAccountConnectionStatus } from '@/models';
import { emptyFunction } from '@/utils';

interface ConnectedEtherlinkAccountProps {
  address: string;
  isSupportedNetwork: boolean;

  onSwitchNetwork: () => Promise<void>;
  onDisconnect: () => Promise<void>;
}

const ConnectedEtherlinkAccount = (props: ConnectedEtherlinkAccountProps) => {
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);
  const onSwitchNetwork = props.onSwitchNetwork;
  const handleMenuItemSwitchingNetwork = useCallback(
    () => {
      setIsSwitchingNetwork(true);
      onSwitchNetwork()
        .catch(emptyFunction)
        .finally(() => setIsSwitchingNetwork(false));
    },
    [onSwitchNetwork]
  );

  return <AccountMenuBase address={props.address}
    isTezos={false}
    isWarn={!props.isSupportedNetwork}
    isSwitchingNetwork={isSwitchingNetwork}
  >
    <>
      <NetworkMenuItem isTezos={false} isSupportedNetwork={props.isSupportedNetwork} />
      {!props.isSupportedNetwork && <SwitchNetworkMenuItem onSwitchNetwork={handleMenuItemSwitchingNetwork} />}
      <CopyAddressMenuItem address={props.address} />
      <ExplorerMenuItem address={props.address} />
      <DisconnectMenuItem onDisconnect={props.onDisconnect} />
    </>
  </AccountMenuBase>;
};

export const EtherlinkAccount = () => {
  const { address, connectionStatus, connect, switchNetwork, disconnect } = useEtherlinkAccount();

  return (connectionStatus <= EtherlinkAccountConnectionStatus.AddNetwork || !address)
    ? <EtherlinkConnectButton connectionStatus={connectionStatus} onConnect={connect} />
    : <ConnectedEtherlinkAccount address={address}
      isSupportedNetwork={connectionStatus !== EtherlinkAccountConnectionStatus.SwitchNetwork}
      onSwitchNetwork={switchNetwork}
      onDisconnect={disconnect}
    />;
};
