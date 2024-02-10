import {
  utils as web3Utils,
  type MetaMaskProvider, type Web3EthExecutionAPI,
  type ProviderInfo, type ProviderRpcError, type ProviderMessage, type ProviderChainId, type ProviderAccounts
} from 'web3';

import { config } from '@/config';

type MetaMaskError =
  | {
    code: 4001,
    message: 'User rejected the request',
  }
  | {
    code: 4002,
    message: 'Unrecognized chain ID. Try adding the chain using wallet_addEthereumChain first.',
  };

export class MetaMaskEtherlinkWallet {
  readonly chainId = config.etherlink.network.chainId;

  constructor(private readonly provider: MetaMaskProvider<Web3EthExecutionAPI>) {
  }

  get isMetaMask() {
    return this.provider.isMetaMask;
  }

  getCurrentChainId(): Promise<string> {
    return this.provider.request({
      method: 'eth_chainId',
      params: []
    }) as Promise<string>;
  }

  async getCurrentConnectedAccount(): Promise<string | undefined> {
    try {
      const accounts = await this.provider.request({
        method: 'eth_accounts'
      }) as ProviderAccounts;

      return this.getAccountToConnect(accounts);
    } catch (error) {
      console.error(error);
    }
  }

  async connectWallet(): Promise<string | undefined> {
    try {
      const accounts = await this.provider.request({
        method: 'eth_requestAccounts'
      }) as ProviderAccounts;

      return this.getAccountToConnect(accounts);
    } catch (error: unknown) {
      if ((error as MetaMaskError)?.code === 4001)
        return;

      console.error(error);
    }
  }

  async switchNetwork(): Promise<void> {
    try {
      const result = await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.chainId }],
      });
      console.log(result);
    } catch (error) {
      const errorCode = (error as MetaMaskError)?.code;
      if (errorCode === 4001)
        return;
      else if (errorCode !== 4002)
        return this.addNetwork();

      console.error(error);
    }
  }

  async addNetwork(): Promise<void> {
    try {
      await this.provider.request({
        method: 'wallet_addEthereumChain',
        params: [config.etherlink.network]
      });
    } catch (error) {
      if ((error as MetaMaskError)?.code === 4001)
        return;

      console.error(error);
    }
  }

  async disconnectWallet() {
  }

  getAccountToConnect(accounts: ProviderAccounts) {
    return accounts && accounts[0] && web3Utils.toChecksumAddress(accounts[0]);
  }

  addEventListener(event: 'connect', listener: (info: ProviderInfo) => void): void;
  addEventListener(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  addEventListener(event: 'message', listener: (message: ProviderMessage) => void): void;
  addEventListener(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
  addEventListener(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addEventListener(event: any, listener: (data: any) => void): void {
    this.provider.on(event, listener);
  }

  removeEventListener(event: 'connect', listener: (info: ProviderInfo) => void): void;
  removeEventListener(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  removeEventListener(event: 'message', listener: (message: ProviderMessage) => void): void;
  removeEventListener(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
  removeEventListener(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeEventListener(event: any, listener: (data: any) => void): void {
    this.provider.removeListener(event, listener);
  }
}
