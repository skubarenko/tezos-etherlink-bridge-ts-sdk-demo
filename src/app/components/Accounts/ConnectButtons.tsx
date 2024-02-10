import { useCallback, useState } from 'react';

import { Blockchain } from '@/components/Blockchain';
import { SpinIcon } from '@/components/icons';
import { EtherlinkAccountConnectionStatus } from '@/models';
import { emptyFunction } from '@/utils';

interface ConnectButtonProps {
  isTezos: boolean;
  text: string;
  disabled: boolean;

  onConnect: () => Promise<unknown>;
}

const enabledButtonStyleClassName = 'cursor-pointer dark:text-gray-100 dark:bg-slate-600 dark:hover:bg-slate-700';
const disabledButtonStyleClassName = ' dark:text-gray-100 dark:bg-slate-600 opacity-70';

const ConnectButton = (props: ConnectButtonProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const onConnect = props.onConnect;
  const handleClick = useCallback(
    () => {
      setIsConnecting(true);
      onConnect()
        .catch(emptyFunction)
        .finally(() => setIsConnecting(false));
    },
    [onConnect]
  );

  return <button className={`flex justify-center items-center ml-2 p-2 rounded-lg text-sm font-medium select-none
    ${props.disabled ? disabledButtonStyleClassName : enabledButtonStyleClassName}`}
    disabled={props.disabled}
    onClick={handleClick}
  >
    {isConnecting
      ? <span className="flex items-center">
        <SpinIcon className="animate-spin h-5 w-5 my-0.5 mr-2 text-white" />
        {props.text}
      </span>
      :
      <Blockchain isTezos={props.isTezos} name={props.text} />
    }
  </button>;
};

interface TezosConnectButtonProps {
  onConnect: () => Promise<unknown>;
}

export const TezosConnectButton = (props: TezosConnectButtonProps) => {
  return <ConnectButton isTezos={true} disabled={false}
    text="Connect Tezos Account"
    onConnect={props.onConnect}
  />;
};

interface EtherlinkConnectButtonProps {
  connectionStatus: EtherlinkAccountConnectionStatus;
  onConnect: () => Promise<unknown>;
}

export const EtherlinkConnectButton = (props: EtherlinkConnectButtonProps) => {
  const isDisabled = props.connectionStatus === EtherlinkAccountConnectionStatus.NotInstalled;
  const text = props.connectionStatus === EtherlinkAccountConnectionStatus.AddNetwork
    ? 'Add Etherlink Network'
    : isDisabled
      ? 'MetaMask Not Installed'
      : 'Connect Etherlink Account';

  return <ConnectButton isTezos={false} disabled={isDisabled} text={text} onConnect={props.onConnect} />;
};

