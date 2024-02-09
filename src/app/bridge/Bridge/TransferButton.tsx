import { memo } from 'react';

import { SpinIcon } from '@/components/icons';

export const enum TransferButtonDisallowedState {
  None = 0,
  Loading = 1,
  TokenTransferring = 2,
  TezosAccountNotConnected = 3,
  EtherlinkAccountNotConnected = 4,
  ZeroAmount = 5,
  NoTokens = 7,
  ZeroTokenBalance = 8,
  ZeroNativeTokenBalance = 9,
  NotEnough = 10,
  UnknownError = 100
}

const enabledButtonClassName = 'cursor-pointer dark:text-gray-100 dark:bg-blue-700 dark:hover:bg-blue-800';
const disabledButtonClassName = 'dark:text-gray-100 disabled:dark:bg-blue-700 opacity-70';
const errorButtonClassName = 'dark:text-gray-100 disabled:dark:bg-red-700 opacity-70';

const classNameByDisallowedState = {
  [TransferButtonDisallowedState.None]: enabledButtonClassName,
  [TransferButtonDisallowedState.Loading]: disabledButtonClassName,
  [TransferButtonDisallowedState.TokenTransferring]: disabledButtonClassName,
  [TransferButtonDisallowedState.TezosAccountNotConnected]: disabledButtonClassName,
  [TransferButtonDisallowedState.EtherlinkAccountNotConnected]: disabledButtonClassName,
  [TransferButtonDisallowedState.ZeroAmount]: disabledButtonClassName,
  [TransferButtonDisallowedState.NoTokens]: disabledButtonClassName,
  [TransferButtonDisallowedState.ZeroTokenBalance]: errorButtonClassName,
  [TransferButtonDisallowedState.ZeroNativeTokenBalance]: errorButtonClassName,
  [TransferButtonDisallowedState.NotEnough]: errorButtonClassName,
  [TransferButtonDisallowedState.UnknownError]: errorButtonClassName,
} as const;

interface TransferButtonProps {
  isDeposit: boolean;
  disallowedState: TransferButtonDisallowedState;
  onClick: () => void;
}

const getButtonText = (disallowedState: TransferButtonDisallowedState, isDeposit: boolean): string => {
  switch (disallowedState) {
    case TransferButtonDisallowedState.None:
      return isDeposit ? 'Deposit' : 'Withdraw';
    case TransferButtonDisallowedState.Loading:
      return 'Loading...';
    case TransferButtonDisallowedState.TokenTransferring:
      return 'Transferring...';
    case TransferButtonDisallowedState.TezosAccountNotConnected:
      return 'Please connect Tezos account';
    case TransferButtonDisallowedState.EtherlinkAccountNotConnected:
      return 'Please connect Etherlink account';
    case TransferButtonDisallowedState.ZeroAmount:
      return 'Enter amount';
    case TransferButtonDisallowedState.NoTokens:
      return isDeposit ? 'Select token to deposit' : 'Select token to withdraw';
    case TransferButtonDisallowedState.ZeroNativeTokenBalance:
      return isDeposit ? 'You have 0 XTZ in Tezos' : 'You have 0 XTZ in Etherlink';
    case TransferButtonDisallowedState.ZeroTokenBalance:
      return 'You have 0 tokens';
    case TransferButtonDisallowedState.NotEnough:
      return 'Not enough';
    case TransferButtonDisallowedState.UnknownError:
    default:
      return 'Unknown Error';
  }
};

export const TransferButton = (props: TransferButtonProps) => {
  const buttonText = getButtonText(props.disallowedState, props.isDeposit);
  const isDisabled = props.disallowedState !== TransferButtonDisallowedState.None;

  return <button className={`mt-2 h-12 rounded-lg select-none ${classNameByDisallowedState[props.disallowedState]}`}
    disabled={isDisabled}
    onClick={props.onClick}
  >
    <span className="flex justify-center items-center">
      {(props.disallowedState === TransferButtonDisallowedState.Loading || props.disallowedState === TransferButtonDisallowedState.TokenTransferring)
        && <SpinIcon className="animate-spin h-5 w-5 mr-2 text-white" />
      }
      <span>{buttonText}</span>
    </span>
  </button>;
};

export const TransferButtonPure = memo(TransferButton);
