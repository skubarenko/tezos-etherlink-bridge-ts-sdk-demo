'use client';

import { Menu, Transition } from '@headlessui/react';
import {
  ArrowUpRightIcon,
  ArrowPathRoundedSquareIcon,
  ArrowRightStartOnRectangleIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon as ExclamationTriangleIconOutline,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { ReactNode, Fragment, useCallback } from 'react';

import { Blockchain } from '@/components/Blockchain';
import { SpinIcon } from '@/components/icons';
import { config } from '@/config';
import { blockchainUtils, textUtils } from '@/utils';

const menuItemClassName = `flex items-center w-full px-2 py-2 text-nowrap last:rounded-b-lg
hover:cursor-pointer
dark:hover:bg-slate-800`;

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export const MenuItem = (props: MenuItemProps) => {
  return <Menu.Item>
    <button className={menuItemClassName} onClick={props.onClick}>
      {props.children}
    </button>
  </Menu.Item>;
};

interface NetworkMenuItemProps {
  isTezos: boolean,
  isSupportedNetwork: boolean;
}

export const NetworkMenuItem = (props: NetworkMenuItemProps) => {
  const needWarn = config.isTestnet || !props.isSupportedNetwork;
  const networkCssClasses = needWarn
    ? 'dark:text-orange-100 dark:bg-orange-700'
    : 'dark:text-green-100 dark:bg-green-700';
  const text = props.isSupportedNetwork
    ? props.isTezos ? config.tezos.network.displayName : config.etherlink.network.displayName
    : 'Unsupported Network';

  return <Menu.Item>
    <>
      <div className={`flex items-center w-full mb-2 pt-2 px-2 pb-2 text-nowrap font-medium rounded-t-lg ${networkCssClasses}`}>
        {needWarn
          ? <ExclamationTriangleIcon className="h-6 w-6 mr-1" />
          : <CheckBadgeIcon className="h-6 w-6 mr-1" />
        }
        <span>{text}</span>
      </div>
    </>
  </Menu.Item>;
};

interface SwitchNetworkMenuItemProps {
  onSwitchNetwork: () => void;
}

export const SwitchNetworkMenuItem = (props: SwitchNetworkMenuItemProps) => {
  return <MenuItem onClick={props.onSwitchNetwork}>
    <ArrowPathRoundedSquareIcon className="inline w-6 h-6 mr-1" />
    <span>Switch to {config.etherlink.network.displayName}</span>
  </MenuItem>;
};

interface CopyAddressMenuItemProps {
  address: string;
}

export const CopyAddressMenuItem = (props: CopyAddressMenuItemProps) => {
  const handleCopyAddressClick = useCallback(
    () => navigator.clipboard.writeText(props.address),
    [props.address]
  );

  return <MenuItem onClick={handleCopyAddressClick}>
    <DocumentDuplicateIcon className="inline w-6 h-6 mr-1" />
    <span>Copy Address</span>
  </MenuItem>;
};

interface ExplorerMenuItem {
  address: string;
}

export const ExplorerMenuItem = (props: ExplorerMenuItem) => {
  return <Menu.Item>
    <a href={blockchainUtils.getExplorerUrl(props.address, blockchainUtils.LinkType.Address)} target="_blank" rel="noreferrer"
      className={menuItemClassName}
    >
      <Squares2X2Icon className="inline w-6 h-6 mr-1" />
      <span>View in Explorer</span>
      <ArrowUpRightIcon className="inline h-4 w-4 ml-1 -mb-0.5" />
    </a>
  </Menu.Item>;
};

interface DisconnectMenuItemProps {
  onDisconnect: () => void;
}

export const DisconnectMenuItem = (props: DisconnectMenuItemProps) => {
  return <MenuItem onClick={props.onDisconnect}>
    <ArrowRightStartOnRectangleIcon className="inline w-6 h-6 mr-1" />
    <span>Disconnect</span>
  </MenuItem>;
};

interface AccountMenuBaseProps {
  address: string;
  isTezos: boolean;
  isWarn: boolean;
  isSwitchingNetwork: boolean;
  children: ReactNode;
}

export const AccountMenuBase = (props: AccountMenuBaseProps) => {
  const menuButtonText = textUtils.getShortText(props.address, 6, 4);
  return <Menu as="div" className="ml-2 first:ml-0 relative inline-block text-base text-left">
    <Menu.Button as="button" disabled={props.isSwitchingNetwork}
      className="flex justify-center items-center p-2 rounded-lg
        font-mono select-none cursor-pointer
        dark:text-gray-100 dark:bg-slate-600 dark:hover:bg-slate-700"
    >
      {props.isSwitchingNetwork || props.isWarn
        ? <span className="flex items-center">
          {props.isSwitchingNetwork
            ? <SpinIcon className="animate-spin h-5 w-5 mr-2 text-white" />
            : <ExclamationTriangleIconOutline className="h-6 w-6 mr-1 dark:text-orange-100" />}
          {menuButtonText}
        </span>
        : <Blockchain isTezos={props.isTezos} name={menuButtonText} />
      }
    </Menu.Button>
    <Transition as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 max-w-60 mt-2 origin-top-right rounded-lg
        border border-solid
      dark:bg-slate-700 dark:border-slate-500"
      >
        {props.children}
      </Menu.Items>
    </Transition >
  </Menu >;
};
