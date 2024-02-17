import { NetworkType, ColorMode } from '@airgap/beacon-types';
import {
  createDefaultTokenBridge, defaultEtherlinkKernelAddress, defaultEtherlinkWithdrawPrecompileAddress,
  LocalTokensBridgeDataProvider, LogLevel,
  type TokenBridge
} from '@baking-bad/tezos-etherlink-bridge-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit, Signer } from '@taquito/taquito';
import Web3, { type MetaMaskProvider, type Web3EthExecutionAPI } from 'web3';

import { TezosWalletSigner, MetaMaskEtherlinkWallet } from './wallets';
import { config } from '@/config';
import { BridgeDataProviderMock, TokenBridgeMock } from '@/mocks';
import { tokenPairs } from '@/tokens';

interface Window {
  ethereum?: MetaMaskProvider<Web3EthExecutionAPI>;
}

export class App {
  readonly etherlinkToolkit: Web3;
  readonly tezosToolkit: TezosToolkit;
  readonly beaconTezosWallet: BeaconWallet['client'];
  readonly tokenBridge: TokenBridge;

  private readonly beaconWallet: BeaconWallet;
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
      featuredWallets: ['temple', 'atomex', 'metamask', 'trust'],
      colorMode: ColorMode.DARK,
    });
    this.tezosWalletSigner = new TezosWalletSigner(this.beaconWallet);
    this.tezosToolkit.setWalletProvider(this.beaconWallet);
    this.tezosToolkit.setSignerProvider(this.tezosWalletSigner);
    this.beaconTezosWallet = this.beaconWallet.client;

    this.tokenBridge = config.isMock
      ? this.createTokenBridgeMock()
      : createDefaultTokenBridge({
        logging: {
          logLevel: LogLevel.Debug
        },
        tokenPairs,
        dipDup: {
          baseUrl: config.dipDup.baseUrl,
          webSocketApiBaseUrl: config.dipDup.webSocketApiBaseUrl,
        },
        tzKTApiBaseUrl: config.tezos.tzktApiBaseUrl,
        etherlinkRpcUrl: config.etherlink.rpcUrl,
        tezos: {
          toolkit: this.tezosToolkit,
          rollupAddress: config.tezos.smartRollupAddress,
        },
        etherlink: {
          toolkit: this.etherlinkToolkit
        }
      });
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

  private createTokenBridgeMock() {
    const tokensProvider = new LocalTokensBridgeDataProvider(tokenPairs);
    const mockProvider = new BridgeDataProviderMock(tokensProvider);

    return new TokenBridgeMock({
      tezos: {
        toolkit: this.tezosToolkit,
        bridgeOptions: {
          rollupAddress: config.tezos.smartRollupAddress
        }
      },
      etherlink: {
        toolkit: this.etherlinkToolkit,
        bridgeOptions: {
          kernelAddress: defaultEtherlinkKernelAddress,
          withdrawPrecompileAddress: defaultEtherlinkWithdrawPrecompileAddress
        }
      },
      bridgeDataProviders: {
        tokens: tokensProvider,
        transfers: mockProvider,
        balances: mockProvider
      }
    });
  }
}
