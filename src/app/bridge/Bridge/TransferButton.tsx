import { memo } from 'react';

import { SpinIcon } from '@/components/icons';
import { config } from '@/config';

export const enum TransferButtonDisallowedState {
  None = 0,
  Loading = 1,
  TokenTransferring = 2,

  TezosAccountNotConnected = 3,
  EtherlinkWalletNotInstalled = 4,
  EtherlinkAccountNotConnected = 5,
  EtherlinkAccountInvalidNetwork = 6,

  ZeroAmount = 7,
  NoTokens = 8,
  ZeroTokenBalance = 9,
  ZeroNativeTokenBalance = 10,
  NotEnough = 11,

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
  [TransferButtonDisallowedState.EtherlinkWalletNotInstalled]: disabledButtonClassName,
  [TransferButtonDisallowedState.EtherlinkAccountNotConnected]: disabledButtonClassName,
  [TransferButtonDisallowedState.EtherlinkAccountInvalidNetwork]: disabledButtonClassName,
  [TransferButtonDisallowedState.ZeroAmount]: disabledButtonClassName,
  [TransferButtonDisallowedState.NoTokens]: disabledButtonClassName,
  [TransferButtonDisallowedState.ZeroTokenBalance]: errorButtonClassName,
  [TransferButtonDisallowedState.ZeroNativeTokenBalance]: errorButtonClassName,
  [TransferButtonDisallowedState.NotEnough]: errorButtonClassName,
  [TransferButtonDisallowedState.UnknownError]: errorButtonClassName,
} as const;

const buttonTextMap = {
  [TransferButtonDisallowedState.None]: ['Deposit', 'Withdraw'],
  [TransferButtonDisallowedState.Loading]: 'Loading...',
  [TransferButtonDisallowedState.TokenTransferring]: 'Transferring...',
  [TransferButtonDisallowedState.TezosAccountNotConnected]: 'Please connect Tezos account',
  [TransferButtonDisallowedState.EtherlinkWalletNotInstalled]: 'Please install MetaMask wallet',
  [TransferButtonDisallowedState.EtherlinkAccountNotConnected]: 'Please connect Etherlink account',
  [TransferButtonDisallowedState.EtherlinkAccountInvalidNetwork]: `Please switch to ${config.etherlink.networkName}`,
  [TransferButtonDisallowedState.ZeroAmount]: 'Enter amount',
  [TransferButtonDisallowedState.NoTokens]: ['Select token to deposit', 'Select token to withdraw'],
  [TransferButtonDisallowedState.ZeroTokenBalance]: 'You have 0 tokens',
  [TransferButtonDisallowedState.ZeroNativeTokenBalance]: ['You have 0 XTZ in Tezos', 'You have 0 XTZ in Etherlink'],
  [TransferButtonDisallowedState.NotEnough]: 'Not enough',
  [TransferButtonDisallowedState.UnknownError]: 'Unknown Error',
} as const;

const getButtonText = (disallowedState: TransferButtonDisallowedState, isDeposit: boolean): string => {
  const text = buttonTextMap[disallowedState];

  return typeof text === 'string' ? text : text[+!isDeposit];
};

interface TransferButtonProps {
  isDeposit: boolean;
  disallowedState: TransferButtonDisallowedState;
  onClick: () => void;
}

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
