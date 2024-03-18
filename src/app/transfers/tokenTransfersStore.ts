'use client';

import { utils as bridgeUtils, type BridgeTokenTransfer } from '@baking-bad/tezos-etherlink-bridge-sdk';
import { useReducer, useMemo, type Dispatch } from 'react';

type TokenTransfersStore = readonly [
  tokenTransfers: readonly BridgeTokenTransfer[],
  dispatch: Dispatch<TokenTransfersStoreAction>
];

type TokenTransfersStoreAction =
  | { type: 'loaded', payload: readonly BridgeTokenTransfer[] }
  | { type: 'added', payload: BridgeTokenTransfer }
  | { type: 'updated', payload: BridgeTokenTransfer }
  | { type: 'added-or-updated', payload: BridgeTokenTransfer }
  | { type: 'cleared' };

let lastTokenTransferTimestamp: string | undefined = undefined;

const updateLastTokenTransferTimestampIfNeeded = (initialOperation: ReturnType<typeof bridgeUtils.getInitialOperation>) => {
  if (!lastTokenTransferTimestamp || initialOperation.timestamp >= lastTokenTransferTimestamp) {
    lastTokenTransferTimestamp = initialOperation.timestamp;
    return true;
  }

  return false;
};

const tokenTransfersMapReducer = (
  state: ReadonlyMap<string, BridgeTokenTransfer>, action: TokenTransfersStoreAction
): ReadonlyMap<string, BridgeTokenTransfer> => {
  switch (action.type) {
    case 'loaded': {
      const newState = new Map(state);

      for (const transfer of action.payload) {
        const initialOperation = bridgeUtils.getInitialOperation(transfer);
        const transferKey = bridgeUtils.getTokenTransferIdOrInitialOperationHash(transfer);
        updateLastTokenTransferTimestampIfNeeded(initialOperation);

        if (newState.has(initialOperation.hash))
          newState.delete(initialOperation.hash);
        newState.set(transferKey, transfer);
      }

      return newState;
    }
    case 'added': {
      const initialOperation = bridgeUtils.getInitialOperation(action.payload);
      const transferKey = bridgeUtils.getTokenTransferIdOrInitialOperationHash(action.payload);
      updateLastTokenTransferTimestampIfNeeded(initialOperation);

      const newState = new Map(state);

      if (newState.has(initialOperation.hash))
        newState.delete(initialOperation.hash);
      newState.set(transferKey, action.payload);

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
    case 'added-or-updated': {
      const initialOperation = bridgeUtils.getInitialOperation(action.payload);
      const existsByInitialOperationHash = state.has(initialOperation.hash);
      const transferKey = bridgeUtils.getTokenTransferIdOrInitialOperationHash(action.payload);
      const isLastTokenTransfer = updateLastTokenTransferTimestampIfNeeded(initialOperation);
      if (!isLastTokenTransfer && !existsByInitialOperationHash && !state.has(transferKey))
        return state;

      const newState = new Map(state);

      if (existsByInitialOperationHash)
        newState.delete(initialOperation.hash);
      newState.set(transferKey, action.payload);

      return newState;
    }
    case 'cleared': {
      lastTokenTransferTimestamp = undefined;

      return new Map<string, BridgeTokenTransfer>();
    }
  }
};

export const useTokenTransfersStore = () => {
  const [tokenTransfersMap, dispatch] = useReducer(
    tokenTransfersMapReducer,
    new Map()
  );

  const tokenTransfers = useMemo(
    () => [...tokenTransfersMap.values()].sort((tokenTransferA, tokenTransferB) => {
      const initialOperationA = bridgeUtils.getInitialOperation(tokenTransferA);
      const initialOperationB = bridgeUtils.getInitialOperation(tokenTransferB);

      return initialOperationB.timestamp.localeCompare(initialOperationA.timestamp);
    }),
    [tokenTransfersMap]
  );

  const currentStore = useMemo<TokenTransfersStore>(
    () => [tokenTransfers, dispatch],
    [tokenTransfers]
  );

  return currentStore;
};
