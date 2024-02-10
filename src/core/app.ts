import { NetworkType } from '@airgap/beacon-types';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit, Signer } from '@taquito/taquito';
import Web3, { type MetaMaskProvider, type Web3EthExecutionAPI } from 'web3';

import { TezosWalletSigner, MetaMaskEtherlinkWallet } from './wallets';
import { config } from '@/config';

interface Window {
  ethereum?: MetaMaskProvider<Web3EthExecutionAPI>;
}

export class App {
  readonly etherlinkToolkit: Web3;
  readonly tezosToolkit: TezosToolkit;
  readonly beaconWallet: BeaconWallet;
  readonly beaconDAppClient: BeaconWallet['client'];

  private readonly tezosWalletSigner: Signer;
  private _etherlinkWallet: MetaMaskEtherlinkWallet | null;

  constructor() {
    const metaMaskEthereumProvider: MetaMaskProvider<Web3EthExecutionAPI> | undefined = typeof window !== 'undefined'
      ? (window as Window).ethereum
      : undefined;
    this.etherlinkToolkit = new Web3(metaMaskEthereumProvider);
    this._etherlinkWallet = metaMaskEthereumProvider
      ? new MetaMaskEtherlinkWallet(metaMaskEthereumProvider)
      : null;

    this.tezosToolkit = new TezosToolkit(config.tezos.rpcUrl);
    this.beaconWallet = new BeaconWallet({
      name: config.appName,
      network: {
        type: NetworkType.CUSTOM,
        rpcUrl: config.tezos.rpcUrl
      },
      featuredWallets: ['temple', 'kukai', 'metamask', 'trust']
    });
    this.beaconDAppClient = this.beaconWallet.client;
    this.tezosWalletSigner = new TezosWalletSigner(this.beaconWallet);
    this.tezosToolkit.setWalletProvider(this.beaconWallet);
    this.tezosToolkit.setSignerProvider(this.tezosWalletSigner);
  }

  get etherlinkWallet(): MetaMaskEtherlinkWallet | null {
    return this._etherlinkWallet;
  }

  async start() {
    if (!this.etherlinkWallet && typeof window !== 'undefined') {
      const metaMaskEthereumProvider = await this.loadMetaMaskEthereumProvider(3000);
      if (metaMaskEthereumProvider)
        this._etherlinkWallet = new MetaMaskEtherlinkWallet(metaMaskEthereumProvider);
    }
  }

  private loadMetaMaskEthereumProvider(timeout: number) {
    return new Promise<MetaMaskProvider<Web3EthExecutionAPI> | undefined>((resolve, reject) => {
      try {
        window.addEventListener(
          'ethereum#initialized',
          () => {
            resolve((window as Window).ethereum);
          },
          { once: true }
        );

        setTimeout(
          () => {
            resolve(undefined);
          },
          timeout
        );
      }
      catch (error) {
        reject(error);
      }
    });
  }
}
