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
import { EtherlinkAccountConnectionStatus } from '@/models';
import { emptyFunction, wait } from '@/utils';

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
  const address = '0x4A1819c83A78C948db50f80fED82721Dd0401c9b';
  const connectionState = EtherlinkAccountConnectionStatus.SwitchNetwork as EtherlinkAccountConnectionStatus;

  const handleSwitchNetwork = useCallback(
    async () => {
      console.log('Switching Network');
      await wait(3000);
      console.log('Network has been switched');
    },
    []
  );

  const handleDisconnect = useCallback(
    async () => console.log('Disconnect Etherlink Wallet'),
    []
  );

  return (connectionState === EtherlinkAccountConnectionStatus.NotConnected || connectionState === EtherlinkAccountConnectionStatus.AddNetwork)
    ? <EtherlinkConnectButton connectionStatus={connectionState} />
    : <ConnectedEtherlinkAccount address={address}
      isSupportedNetwork={connectionState !== EtherlinkAccountConnectionStatus.SwitchNetwork}
      onSwitchNetwork={handleSwitchNetwork}
      onDisconnect={handleDisconnect}
    />;
};
