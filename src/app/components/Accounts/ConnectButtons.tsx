import { Blockchain } from '@/components/Blockchain';
import { EtherlinkAccountConnectionStatus } from '@/models';

interface ConnectButtonProps {
  isTezos: boolean;
  text: string;
}

const ConnectButton = (props: ConnectButtonProps) => {
  return <button className="flex justify-center items-center ml-2 p-2 rounded-lg text-sm font-medium select-none
  cursor-pointer dark:text-gray-100 dark:bg-slate-600 dark:hover:bg-slate-700"
  >
    <Blockchain isTezos={props.isTezos} name={props.text} />
  </button>;
};

export const TezosConnectButton = () => {
  return <ConnectButton isTezos={true} text="Connect Tezos Account" />;
};

interface EtherlinkConnectButtonProps {
  connectionStatus: EtherlinkAccountConnectionStatus
}

export const EtherlinkConnectButton = (props: EtherlinkConnectButtonProps) => {
  const text = props.connectionStatus === EtherlinkAccountConnectionStatus.AddNetwork
    ? 'Add Etherlink Network'
    : 'Connect Etherlink Account';

  return <ConnectButton isTezos={false} text={text} />;
};

