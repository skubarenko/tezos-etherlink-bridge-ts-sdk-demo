import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment, memo } from 'react';

import { TokenPure } from './Token';
import type { Token } from '@/models';

interface TokensListItemProps {
  token: Token;
  tokenBalances: ReadonlyMap<Token, string>;
}

const TokensListItem = (props: TokensListItemProps) => {
  const tokenBalance = props.tokenBalances.get(props.token) || '0';

  return <Listbox.Option value={props.token} className="flex w-full justify-between items-center px-2 py-2 text-nowrap
    first:rounded-t-lg last:rounded-b-lg
    hover:cursor-pointer
  dark:hover:bg-slate-800"
  >
    <TokenPure className="width" token={props.token} showName={true} />
    <span className="text-left overflow-hidden overflow-ellipsis">{tokenBalance}</span>
  </Listbox.Option>;
};
const TokensListItemPure = memo(TokensListItem);

interface TokensListProps {
  currentToken: Token | null;
  tokens: readonly Token[];
  tokenBalances: ReadonlyMap<Token, string>;
  onTokenSelected: (token: Token) => void;
}

const EmptyTokensList = () => {
  return <div className="flex w-full items-center px-4 py-2.5
    font-medium rounded-lg text-white bg-slate-700
    hover:cursor-not-allowed hover:bg-slate-800
    dark:bg-slate-700 dark:hover:bg-slate-800"
  >
    <span className="text-nowrap select-none">No Tokens</span>
    <ChevronDownIcon className="h-5 w-5 ml-2 -mr-1" aria-hidden="true" />
  </div>;
};

export const TokensList = (props: TokensListProps) => {
  return (props.tokens.length && props.currentToken
    ? <Listbox as="div" value={props.currentToken} onChange={props.onTokenSelected} className="relative inline-block text-left">
      <Listbox.Button className="inline-flex justify-center items-center pl-2 pr-4 py-2
        font-medium rounded-lg
        dark:text-white dark:bg-slate-700 dark:hover:bg-slate-800"
      >
        <TokenPure className="max-w-44 pl-2" token={props.currentToken} />
        <ChevronDownIcon className="h-5 w-5 ml-2 -mr-1" aria-hidden="true" />
      </Listbox.Button>
      <Transition as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Listbox.Options className="absolute right-0 w-96 max-w-96 mt-2 origin-top-right rounded-lg
           border border-solid
           dark:bg-slate-700 dark:border-slate-500"
        >
          {props.tokens.map(token => <TokensListItemPure key={token.ticker} token={token} tokenBalances={props.tokenBalances} />)}
        </Listbox.Options>
      </Transition>
    </Listbox>
    : <EmptyTokensList />);
};
export const TokensListPure = memo(TokensList);
