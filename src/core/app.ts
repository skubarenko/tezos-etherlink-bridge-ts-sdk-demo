import { NetworkType, ColorMode } from '@airgap/beacon-types';
import {
  loggerProvider as sdkLoggerProvider, LogLevel,
  createDefaultTokenBridge, defaultEtherlinkKernelAddress, defaultEtherlinkWithdrawPrecompileAddress,
  LocalTokensBridgeDataProvider,
  type TokenBridge
} from '@baking-bad/tezos-etherlink-bridge-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit, Signer } from '@taquito/taquito';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { EthersStoreUtil } from '@web3modal/scaffold-utils/ethers';
import Web3 from 'web3';

import { TezosWalletSigner } from './wallets';
import { config } from '@/config';
import { BridgeDataProviderMock, TokenBridgeMock } from '@/mocks';
import { tokenPairs } from '@/tokens';

interface Window {
  sdkLoggerProvider?: typeof sdkLoggerProvider;
  app?: App;
}

export class App {
  readonly etherlinkToolkit: Web3;
  readonly web3Modal: ReturnType<typeof createWeb3Modal>;
  readonly tezosToolkit: TezosToolkit;
  readonly beaconTezosWallet: BeaconWallet['client'];
  readonly tokenBridge: TokenBridge;

  private readonly beaconWallet: BeaconWallet;
  private readonly tezosWalletSigner: Signer;

  constructor() {
    this.etherlinkToolkit = new Web3(EthersStoreUtil.state.provider);
    this.web3Modal = createWeb3Modal({
      ethersConfig: defaultConfig({
        metadata: {
          name: config.app.name,
          description: config.app.description,
          url: config.app.url,
          icons: []
        }
      }),
      chains: [{
        chainId: config.etherlink.network.chainId,
        name: config.etherlink.network.name,
        currency: config.etherlink.network.nativeCurrency.symbol,
        rpcUrl: config.etherlink.network.rpcUrl,
        explorerUrl: config.etherlink.network.blockExplorerUrl,
      }],
      projectId: config.walletConnectProjectId,
      enableAnalytics: false
    });

    this.tezosToolkit = new TezosToolkit(config.tezos.network.rpcUrl);
    this.beaconWallet = new BeaconWallet({
      name: config.app.name,
      network: {
        type: NetworkType.CUSTOM,
        rpcUrl: config.tezos.network.rpcUrl
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
          baseUrl: config.providers.dipDup.baseUrl,
          webSocketApiBaseUrl: config.providers.dipDup.webSocketApiBaseUrl,
        },
        tzKTApiBaseUrl: config.providers.tzKT.baseUrl,
        etherlinkRpcUrl: config.etherlink.network.rpcUrl,
        tezos: {
          toolkit: this.tezosToolkit,
          rollupAddress: config.bridge.smartRollupAddress,
        },
        etherlink: {
          toolkit: this.etherlinkToolkit
        }
      });

    if (typeof window !== 'undefined') {
      (window as Window).sdkLoggerProvider = sdkLoggerProvider;
      (window as Window).app = this;
    }
  }

  private createTokenBridgeMock() {
    const tokensProvider = new LocalTokensBridgeDataProvider(tokenPairs);
    const mockProvider = new BridgeDataProviderMock(tokensProvider);

    return new TokenBridgeMock({
      tezos: {
        toolkit: this.tezosToolkit,
        bridgeOptions: {
          rollupAddress: config.bridge.smartRollupAddress
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
