'use client';

import { utils as bridgeUtils, type BridgeTokenTransfer } from '@baking-bad/tezos-etherlink-bridge-sdk';
import {
  createContext, useContext, useReducer, useMemo,
  type ReactNode, type Dispatch
} from 'react';

type LocalTokenTransfersStore = {
  localTokenTransfers: ReadonlyMap<string, BridgeTokenTransfer>;
  dispatch: Dispatch<LocalTokenTransfersStoreAction>
};

type LocalTokenTransfersStoreAction =
  | { type: 'added', payload: BridgeTokenTransfer }
  | { type: 'updated', payload: BridgeTokenTransfer }
  | { type: 'deleted', payload: BridgeTokenTransfer };

const localTokenTransfersReducer = (state: ReadonlyMap<string, BridgeTokenTransfer>, action: LocalTokenTransfersStoreAction): ReadonlyMap<string, BridgeTokenTransfer> => {
  switch (action.type) {
    case 'added': {
      const newState = new Map(state);
      newState.set(bridgeUtils.getTokenTransferIdOrInitialOperationHash(action.payload), action.payload);
      return newState;
    }
    case 'updated': {
      const initialOperationHash = bridgeUtils.getInitialOperation(action.payload).hash;
      const existsByInitialOperationHash = state.has(initialOperationHash);
      const transferKey = bridgeUtils.getTokenTransferIdOrInitialOperationHash(action.payload);
      if (!existsByInitialOperationHash && !state.has(transferKey))
        return state;

      const newState = new Map(state);

      if (existsByInitialOperationHash)
        newState.delete(initialOperationHash);
      newState.set(transferKey, action.payload);

      return newState;
    }
    case 'deleted': {
      const initialOperationHash = bridgeUtils.getInitialOperation(action.payload).hash;
      const transferKey = bridgeUtils.getTokenTransferIdOrInitialOperationHash(action.payload);
      if (!state.has(initialOperationHash) && !state.has(transferKey))
        return state;

      const newState = new Map(state);
      newState.delete(initialOperationHash);
      newState.delete(transferKey);
      return newState;
    }
  }
};

const LocalTokenTransfersStoreContext = createContext<LocalTokenTransfersStore>(null!);

export const LocalTokenTransfersStoreContextProvider = (props: { children: ReactNode }) => {
  const [localTokenTransfers, dispatch] = useReducer(
    localTokenTransfersReducer,
    new Map()
  );

  const currentStore = useMemo<LocalTokenTransfersStore>(
    () => ({
      localTokenTransfers,
      dispatch
    }),
    [localTokenTransfers]
  );

  return <LocalTokenTransfersStoreContext.Provider value={currentStore}>
    {props.children}
  </LocalTokenTransfersStoreContext.Provider>;
};

export const useLocalTokenTransfersStoreContext = () => useContext(LocalTokenTransfersStoreContext);
