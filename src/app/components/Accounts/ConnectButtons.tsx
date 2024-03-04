import { useCallback, useState } from 'react';

import { Blockchain } from '@/components/Blockchain';
import { SpinIcon } from '@/components/icons';
import { EtherlinkAccountConnectionStatus } from '@/models';
import { emptyFunction } from '@/utils';

interface ConnectButtonProps {
  isTezos: boolean;
  text: string;
  smallText: string;
  disabled: boolean;
  isLoading?: boolean;

  onConnect: () => void;
}

const enabledButtonStyleClassName = 'cursor-pointer dark:text-gray-100 dark:bg-slate-600 dark:hover:bg-slate-700';
const disabledButtonStyleClassName = ' dark:text-gray-100 dark:bg-slate-600 opacity-70';

const ConnectButton = (props: ConnectButtonProps) => {
  const isDisabled = props.isLoading || props.disabled;

  return <button className={`flex justify-center items-center ml-2 first:ml-0 p-2 rounded-lg text-sm font-medium select-none
    ${isDisabled ? disabledButtonStyleClassName : enabledButtonStyleClassName}`}
    disabled={isDisabled}
    onClick={props.onConnect}
  >
    {props.isLoading
      ? <span className="flex items-center">
        <SpinIcon className="animate-spin h-5 w-5 my-0.5 mr-2 text-white" />
        <span className="hidden md:inline">{props.text}</span>
        <span className="md:hidden">{props.smallText}</span>
      </span>
      : <>
        <div className="hidden md:inline">
          <Blockchain isTezos={props.isTezos} name={props.text} />
        </div>
        <div className="md:hidden">
          <Blockchain isTezos={props.isTezos} name={props.smallText} />
        </div>
      </>
    }
  </button>;
};

interface TezosConnectButtonProps {
  onConnect: () => Promise<unknown>;
}

export const TezosConnectButton = (props: TezosConnectButtonProps) => {
  return <ConnectButton isTezos={true} disabled={false}
    text="Connect Tezos Account"
    smallText="Connect Tezos"
    onConnect={props.onConnect}
  />;
};

interface EtherlinkConnectButtonProps {
  connectionStatus: EtherlinkAccountConnectionStatus;
  onConnect: () => Promise<unknown>;
}

export const EtherlinkConnectButton = (props: EtherlinkConnectButtonProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const onConnect = props.onConnect;
  const handleButtonConnect = useCallback(
    () => {
      setIsConnecting(true);
      onConnect()
        .catch(emptyFunction)
        .finally(() => setIsConnecting(false));
    },
    [onConnect]
  );

  return <ConnectButton isTezos={false} disabled={false} isLoading={isConnecting}
    text="Connect Etherlink Account"
    smallText="Connect Etherlink"
    onConnect={handleButtonConnect}
  />;
};
