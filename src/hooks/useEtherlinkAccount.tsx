'use client';

import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

import { useAppContext } from './useAppContext';
import { config } from '@/config';
import { EtherlinkAccountConnectionStatus } from '@/models';
import { emptyAsyncFunction } from '@/utils';

interface EtherlinkAccountContextValue {
  readonly connectionStatus: EtherlinkAccountConnectionStatus;
  readonly address: string | undefined;
  readonly connect: () => Promise<void>;
  readonly switchNetwork: () => Promise<void>;
  readonly disconnect: () => Promise<void>;
}

const initialValue: EtherlinkAccountContextValue = {
  connectionStatus: EtherlinkAccountConnectionStatus.NotConnected,
  address: undefined,
  connect: emptyAsyncFunction,
  switchNetwork: emptyAsyncFunction,
  disconnect: emptyAsyncFunction
};

const getConnectedStatus = (isConnected: boolean, currentChainId: number | undefined) => {
  return isConnected
    ? currentChainId === config.etherlink.network.chainId
      ? EtherlinkAccountConnectionStatus.Connected
      : EtherlinkAccountConnectionStatus.SwitchNetwork
    : EtherlinkAccountConnectionStatus.NotConnected;
};

const EtherlinkAccountContext = createContext<EtherlinkAccountContextValue>(initialValue);

export const EtherlinkAccountProvider = (props: { children: ReactNode }) => {
  const appContext = useAppContext();
  const { address, chainId: currentChainId, isConnected } = useWeb3ModalAccount();
  const [currentValue, setCurrentValue] = useState<EtherlinkAccountContextValue>(initialValue);
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(
    () => {
      if (!appContext?.web3Modal)
        return;

      setCurrentValue({
        address: initialValue.address,
        connectionStatus: initialValue.connectionStatus,
        async connect() {
          await appContext.web3Modal.open();
        },
        async switchNetwork() {
          await appContext.web3Modal.switchNetwork(config.etherlink.network.chainId);
        },
        async disconnect() {
          await appContext.web3Modal.disconnect();
        },
      });
    },
    [appContext?.web3Modal]
  );

  useEffect(
    () => setCurrentValue(previous => ({
      ...previous,
      address,
      connectionStatus: getConnectedStatus(isConnected, currentChainId),
    })),
    [address, currentChainId, isConnected]
  );

  useEffect(
    () => {
      if (!appContext?.etherlinkToolkit)
        return;

      appContext.etherlinkToolkit.setProvider(walletProvider);
    },
    [appContext?.etherlinkToolkit, walletProvider]
  );

  return <EtherlinkAccountContext.Provider value={currentValue}>
    {props.children}
  </EtherlinkAccountContext.Provider>;
};

export const useEtherlinkAccount = () => useContext(EtherlinkAccountContext);
