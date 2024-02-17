'use client';

import { utils as bridgeUtils, type BridgeTokenTransfer } from '@baking-bad/tezos-etherlink-bridge-sdk';
import {
  createContext, useContext, useReducer, useMemo,
  type ReactNode, type Dispatch
} from 'react';

type TokenTransfersStore = {
  tokenTransfers: ReadonlyMap<string, BridgeTokenTransfer>;
  dispatch: Dispatch<TokenTransfersStoreAction>
};

type TokenTransfersStoreAction =
  | { type: 'loaded', payload: readonly BridgeTokenTransfer[] }
  | { type: 'added', payload: BridgeTokenTransfer }
  | { type: 'updated', payload: BridgeTokenTransfer };

const tokenTransfersReducer = (state: ReadonlyMap<string, BridgeTokenTransfer>, action: TokenTransfersStoreAction) => {
  switch (action.type) {
    case 'loaded': {
      const newState = new Map(state);
      action.payload.forEach(transfer => newState.set(bridgeUtils.getInitialOperationHash(transfer), transfer));
      return newState;
    }
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
  }
};

const TokenTransfersStoreContext = createContext<TokenTransfersStore>(null!);

export const TokenTransfersStoreContextProvider = (props: { children: ReactNode }) => {
  const [tokenTransfers, dispatch] = useReducer(
    tokenTransfersReducer,
    new Map()
  );

  const currentStore = useMemo<TokenTransfersStore>(
    () => ({
      tokenTransfers,
      dispatch
    }),
    [tokenTransfers, dispatch]
  );

  return <TokenTransfersStoreContext.Provider value={currentStore}>
    {props.children}
  </TokenTransfersStoreContext.Provider>;
};

export const useTokenTransfersStoreContext = () => useContext(TokenTransfersStoreContext);
