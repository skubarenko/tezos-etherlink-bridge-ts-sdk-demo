import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { TransferButtonDisallowedState, TransferButtonPure } from './TransferButton';
import { TransferFromPure } from './TransferFrom';
import { TransferToPure } from './TransferTo';
import { config } from '@/config';
import { EtherlinkAccountConnectionStatus, TezosAccountConnectionStatus, type Token, type TokenPair } from '@/models';
import { nativeEtherlinkToken, nativeTezosToken } from '@/tokens';
import { emptyFunction, tokenUtils } from '@/utils';

type TransferCallback = (amount: bigint, token: Token, receiverAddress?: string) => Promise<void>;

const handleTransferButtonClick = (currentToken: Token | null, currentTokenAmount: string, callback: TransferCallback): Promise<void> => {
  if (!currentToken || currentTokenAmount.startsWith('-'))
    return Promise.resolve();

  const currentTokenRawAmount = tokenUtils.convertTokensAmountToRawAmount(currentTokenAmount, currentToken.decimals);
  if (!currentTokenRawAmount)
    return Promise.resolve();

  return callback(currentTokenRawAmount, currentToken);
};

interface BridgeProps {
  isLoading: boolean;
  tezosAccountConnectionStatus: TezosAccountConnectionStatus;
  etherlinkAccountConnectionStatus: EtherlinkAccountConnectionStatus;
  tokenPairs: readonly TokenPair[];
  tokenBalances: ReadonlyMap<Token, string>;

  onDeposit: TransferCallback;
  onWithdraw: TransferCallback;
}

export const Bridge = (props: BridgeProps) => {
  const [isDeposit, setIsDeposit] = useState(true);
  const fromBlockchainName = isDeposit ? 'tezos' : 'etherlink';
  const toBlockchainName = isDeposit ? 'etherlink' : 'tezos';

  const fromTokensList = useMemo(
    () => props.tokenPairs.map(t => t[fromBlockchainName]),
    [fromBlockchainName, props.tokenPairs]
  );

  const [currentToken, setCurrentToken] = useState<Token | null>(fromTokensList[0] || null);
  const [currentTokenAmount, setCurrentTokenAmount] = useState<string>('0');
  const targetToken = useMemo(
    () => props.tokenPairs.find(t => t[fromBlockchainName] === currentToken)?.[toBlockchainName] || null,
    [currentToken, fromBlockchainName, toBlockchainName, props.tokenPairs]
  );
  const [isTokenTransferring, setIsTokenTransferring] = useState(false);
  const [transferButtonDisallowedState, setTransferButtonDisallowedState] = useState<TransferButtonDisallowedState>(TransferButtonDisallowedState.Loading);

  useEffect(
    () => {
      if (props.isLoading)
        setTransferButtonDisallowedState(TransferButtonDisallowedState.Loading);
      if (isTokenTransferring)
        setTransferButtonDisallowedState(TransferButtonDisallowedState.TokenTransferring);
      else if (props.tezosAccountConnectionStatus === TezosAccountConnectionStatus.NotConnected)
        setTransferButtonDisallowedState(TransferButtonDisallowedState.TezosAccountNotConnected);
      else if (props.etherlinkAccountConnectionStatus === EtherlinkAccountConnectionStatus.NotInstalled)
        setTransferButtonDisallowedState(TransferButtonDisallowedState.EtherlinkWalletNotInstalled);
      else if (props.etherlinkAccountConnectionStatus === EtherlinkAccountConnectionStatus.NotConnected)
        setTransferButtonDisallowedState(TransferButtonDisallowedState.EtherlinkAccountNotConnected);
      else if (props.etherlinkAccountConnectionStatus === EtherlinkAccountConnectionStatus.SwitchNetwork)
        setTransferButtonDisallowedState(TransferButtonDisallowedState.EtherlinkAccountInvalidNetwork);
      else if (!currentToken)
        setTransferButtonDisallowedState(TransferButtonDisallowedState.NoTokens);
      else {
        const currentTokenRawAmount = tokenUtils.convertTokensAmountToRawAmount(currentTokenAmount, currentToken.decimals);
        if (!currentTokenRawAmount)
          setTransferButtonDisallowedState(TransferButtonDisallowedState.ZeroAmount);
        else {
          const currentTokenBalanceRawAmount = tokenUtils.convertTokensAmountToRawAmount(props.tokenBalances.get(currentToken) || '', currentToken.decimals);
          const currentNativeToken = isDeposit ? nativeTezosToken : nativeEtherlinkToken;

          if (!currentTokenBalanceRawAmount)
            setTransferButtonDisallowedState(TransferButtonDisallowedState.ZeroTokenBalance);
          else if (!tokenUtils.convertTokensAmountToRawAmount(props.tokenBalances.get(currentNativeToken) || '', currentNativeToken.decimals))
            setTransferButtonDisallowedState(TransferButtonDisallowedState.ZeroNativeTokenBalance);
          else if (currentTokenRawAmount > currentTokenBalanceRawAmount)
            setTransferButtonDisallowedState(TransferButtonDisallowedState.NotEnough);
          else
            setTransferButtonDisallowedState(TransferButtonDisallowedState.None);
        }
      }
    },
    [
      currentToken, currentTokenAmount, isDeposit, isTokenTransferring,
      props.etherlinkAccountConnectionStatus, props.isLoading, props.tezosAccountConnectionStatus, props.tokenBalances
    ]
  );

  const onDeposit = props.onDeposit;
  const onWithdraw = props.onWithdraw;
  const handleDepositTransferButtonClick = useCallback(
    () => {
      setIsTokenTransferring(true);
      handleTransferButtonClick(currentToken, currentTokenAmount, onDeposit)
        .catch(emptyFunction)
        .finally(() => setIsTokenTransferring(false));
    },
    [currentToken, currentTokenAmount, onDeposit]
  );
  const handleWithdrawTransferButtonClick = useCallback(
    () => {
      setIsTokenTransferring(true);
      handleTransferButtonClick(currentToken, currentTokenAmount, onWithdraw)
        .catch(emptyFunction)
        .finally(() => setIsTokenTransferring(false));
    },
    [currentToken, currentTokenAmount, onWithdraw]
  );

  const handleSwitchDirection = useCallback(
    () => {
      setIsDeposit(current => !current);
      setCurrentToken(targetToken);
    },
    [targetToken]
  );

  return <div className="flex flex-col w-full max-w-xl m-4 p-4 rounded-xl overflow-hidden dark:bg-slate-800"
  >
    <h2 className="text-2xl font-medium dark:text-gray-100">
      Bridge
      {config.isTestnet && <span className="ml-3 px-3 py-1 rounded-xl text-lg dark:text-orange-100 dark:bg-orange-700">
        <ExclamationTriangleIcon className="inline h-6 w-6 -mt-1 -ml-1 mr-1" />
        Testnet
      </span>}
    </h2>
    <TransferFromPure
      isTezos={isDeposit}
      currentToken={currentToken}
      blockchainTokens={fromTokensList}
      tokenBalances={props.tokenBalances}
      onTokenSelected={setCurrentToken}
      onAmountChanged={setCurrentTokenAmount}
    />
    <button className="flex self-center items-center justify-center
      w-12 h-12 rounded-lg
      dark:text-gray-100 dark:bg-slate-600 dark:hover:bg-slate-700"
      onClick={handleSwitchDirection}
    >
      <ArrowsUpDownIcon className="h-7 w-7" />
    </button>
    <TransferToPure
      isTezos={!isDeposit}
      amount={currentTokenAmount || '0'}
      targetToken={targetToken}
      tokenBalances={props.tokenBalances}
    />
    <TransferButtonPure
      isDeposit={isDeposit}
      disallowedState={transferButtonDisallowedState}
      onClick={isDeposit ? handleDepositTransferButtonClick : handleWithdrawTransferButtonClick}
    />
  </div>;
};

export const BridgePure = memo(Bridge);
