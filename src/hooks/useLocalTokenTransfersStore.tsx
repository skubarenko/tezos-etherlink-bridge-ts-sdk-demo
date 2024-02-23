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
  | { type: 'deleted', payload: BridgeTokenTransfer | string };

const localTokenTransfersReducer = (state: ReadonlyMap<string, BridgeTokenTransfer>, action: LocalTokenTransfersStoreAction): ReadonlyMap<string, BridgeTokenTransfer> => {
  switch (action.type) {
    case 'added': {
      const newState = new Map(state);
      newState.set(bridgeUtils.getInitialOperationHash(action.payload), action.payload);
      return newState;
    }
    case 'updated': {
      const initialOperationHash = bridgeUtils.getInitialOperationHash(action.payload);
      if (!state.has(initialOperationHash))
        return state;

      const newState = new Map(state);
      newState.set(initialOperationHash, action.payload);
      return newState;
    }
    case 'deleted': {
      const initialOperationHash = typeof action.payload === 'string'
        ? action.payload
        : bridgeUtils.getInitialOperationHash(action.payload);
      if (!state.has(initialOperationHash))
        return state;

      const newState = new Map(state);
      newState.delete(initialOperationHash);
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
