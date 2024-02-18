'use client';

import {
  createContext, useState, useContext, useEffect,
  type ReactNode
} from 'react';

import { useAppContext } from './useAppContext';
import { TezosAccountConnectionStatus } from '@/models';
import { emptyAsyncFunction } from '@/utils';

interface TezosAccountContextValue {
  readonly connectionStatus: TezosAccountConnectionStatus;
  readonly address: string | undefined;
  readonly connect: () => Promise<string | undefined>;
  readonly disconnect: () => Promise<void>;
}

const initialValue: TezosAccountContextValue = {
  connectionStatus: TezosAccountConnectionStatus.NotConnected,
  address: undefined,
  connect: emptyAsyncFunction,
  disconnect: emptyAsyncFunction
};

const TezosAccountContext = createContext<TezosAccountContextValue>(initialValue);

export const TezosAccountProvider = (props: { children: ReactNode }) => {
  const appContext = useAppContext();
  const [currentValue, setCurrentValue] = useState<TezosAccountContextValue>(initialValue);
  const tezosWallet = appContext?.beaconTezosWallet;

  useEffect(() => {
    setCurrentValue(tezosWallet
      ? {
        connectionStatus: TezosAccountConnectionStatus.NotConnected,
        address: undefined,

        connect: async () => {
          try {
            const { address } = await tezosWallet.requestPermissions();

            setCurrentValue(previous => ({
              ...previous,
              connectionStatus: address
                ? TezosAccountConnectionStatus.Connected
                : TezosAccountConnectionStatus.NotConnected,
              address,
            }));
            return address;
          }
          catch (error) {
            return undefined;
          }
        },
        disconnect: () => {
          setCurrentValue(previous => ({
            ...previous,
            connectionStatus: TezosAccountConnectionStatus.NotConnected,
            address: undefined,
          }));

          return tezosWallet.disconnect();
        }
      }
      : initialValue);
  }, [tezosWallet]);

  useEffect(() => {
    if (!tezosWallet)
      return;

    const loadConnectedAccount = async () => {
      try {
        const activeAccount = await tezosWallet.getActiveAccount();
        const address = activeAccount?.address;

        setCurrentValue(previous => ({
          ...previous,
          connectionStatus: address
            ? TezosAccountConnectionStatus.Connected
            : TezosAccountConnectionStatus.NotConnected,
          address,
        }));
      }
      catch (error) {
        console.error(error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tezosWallet.subscribeToEvent('ACTIVE_ACCOUNT_SET' as any, async ({ address }: { address: string | undefined }) => {
      const connectionStatus = address
        ? TezosAccountConnectionStatus.Connected
        : TezosAccountConnectionStatus.NotConnected;

      setCurrentValue(previous => (previous.address === address && previous.connectionStatus === connectionStatus)
        ? previous
        : ({
          ...previous,
          connectionStatus,
          address,
        })
      );

      console.log('Tezos account changed', address);
    }
    );

    loadConnectedAccount();
  }, [tezosWallet]);

  return <TezosAccountContext.Provider value={currentValue}>
    {props.children}
  </TezosAccountContext.Provider>;
};

export const useTezosAccount = () => useContext(TezosAccountContext);
