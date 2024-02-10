'use client';

import {
  createContext, useState, useContext, useEffect,
  type ReactNode
} from 'react';

import { useAppContext } from './useAppContext';
import { EtherlinkAccountConnectionStatus } from '@/models';
import { emptyAsyncFunction } from '@/utils';

interface EtherlinkAccountContextValue {
  readonly connectionStatus: EtherlinkAccountConnectionStatus;
  readonly address: string | undefined;
  readonly connect: () => Promise<string | undefined>;
  readonly switchNetwork: () => Promise<void>;
  readonly disconnect: () => Promise<void>;
}

const initialValue: EtherlinkAccountContextValue = {
  connectionStatus: EtherlinkAccountConnectionStatus.NotInstalled,
  address: undefined,
  connect: emptyAsyncFunction,
  switchNetwork: emptyAsyncFunction,
  disconnect: emptyAsyncFunction
};

const EtherlinkAccountContext = createContext<EtherlinkAccountContextValue>(initialValue);

export const EtherlinkAccountProvider = (props: { children: ReactNode }) => {
  const appContext = useAppContext();
  const [currentValue, setCurrentValue] = useState<EtherlinkAccountContextValue>(initialValue);
  const etherlinkWallet = appContext?.etherlinkWallet;

  useEffect(() => {
    setCurrentValue(etherlinkWallet
      ? {
        connectionStatus: EtherlinkAccountConnectionStatus.NotConnected,
        address: undefined,

        connect: async () => {
          const [currentChainId, address] = await Promise.all([
            etherlinkWallet.getCurrentChainId(),
            etherlinkWallet.connectWallet()
          ]);
          const isValidChainId = currentChainId === etherlinkWallet.chainId;
          setCurrentValue(previous => ({
            ...previous,
            connectionStatus: address
              ? isValidChainId
                ? EtherlinkAccountConnectionStatus.Connected
                : EtherlinkAccountConnectionStatus.SwitchNetwork
              : EtherlinkAccountConnectionStatus.NotConnected,
            address,
          }));

          if (!isValidChainId) {
            await etherlinkWallet.switchNetwork();
          }

          return address;
        },
        switchNetwork: async () => {
          await etherlinkWallet.switchNetwork();
        },
        disconnect: () => {
          setCurrentValue(previous => ({
            ...previous,
            connectionStatus: EtherlinkAccountConnectionStatus.NotConnected,
            address: undefined,
          }));
          return etherlinkWallet.disconnectWallet();
        }
      }
      : initialValue);
  }, [etherlinkWallet]);

  useEffect(() => {
    if (!etherlinkWallet)
      return;

    const loadConnectedAccount = async () => {
      try {
        const [currentChainId, address] = await Promise.all([
          etherlinkWallet.getCurrentChainId(),
          etherlinkWallet.getCurrentConnectedAccount(),
        ]);

        setCurrentValue(previous => ({
          ...previous,
          connectionStatus: address
            ? currentChainId === etherlinkWallet.chainId
              ? EtherlinkAccountConnectionStatus.Connected
              : EtherlinkAccountConnectionStatus.SwitchNetwork
            : EtherlinkAccountConnectionStatus.NotConnected,
          address,
        }));
      }
      catch (error) {
        console.error(error);
      }
    };

    etherlinkWallet.addEventListener('chainChanged', chainId => {
      const connectionStatus = chainId === etherlinkWallet.chainId
        ? EtherlinkAccountConnectionStatus.Connected
        : EtherlinkAccountConnectionStatus.SwitchNetwork;
      setCurrentValue(previous => (previous.connectionStatus === connectionStatus
        ? previous
        : {
          ...previous,
          connectionStatus
        })
      );

      console.log('Etherlink chain changed', chainId);
    });

    etherlinkWallet.addEventListener('accountsChanged', async accounts => {
      const address = etherlinkWallet.getAccountToConnect(accounts);
      const currentChainId = await etherlinkWallet.getCurrentChainId();
      const connectionStatus = address
        ? currentChainId === etherlinkWallet.chainId
          ? EtherlinkAccountConnectionStatus.Connected
          : EtherlinkAccountConnectionStatus.SwitchNetwork
        : EtherlinkAccountConnectionStatus.NotConnected;

      setCurrentValue(previous => !previous.address || (previous.address === address && previous.connectionStatus === connectionStatus)
        ? previous
        : ({
          ...previous,
          connectionStatus,
          address,
        })
      );

      console.log('Etherlink account changed', address, currentChainId);
    });

    loadConnectedAccount();
  }, [etherlinkWallet]);

  return <EtherlinkAccountContext.Provider value={currentValue}>
    {props.children}
  </EtherlinkAccountContext.Provider>;
};

export const useEtherlinkAccount = () => useContext(EtherlinkAccountContext);
