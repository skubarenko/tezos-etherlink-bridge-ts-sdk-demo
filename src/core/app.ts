import { NetworkType, ColorMode } from '@airgap/beacon-types';
import {
  loggerProvider as sdkLoggerProvider, LogLevel,
  TaquitoWalletTezosBridgeBlockchainService, EthersEtherlinkBridgeBlockchainService,
  TokenBridge, DefaultDataProvider, LocalTokensBridgeDataProvider
} from '@baking-bad/tezos-etherlink-bridge-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit, Signer } from '@taquito/taquito';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { ethers } from 'ethers';

import { TezosWalletSigner } from './wallets';
import { config } from '@/config';
import { BridgeDataProviderMock, TokenBridgeMock } from '@/mocks';
import { tokenPairs } from '@/tokens';

interface Window {
  sdkLoggerProvider?: typeof sdkLoggerProvider;
  app?: App;
}

export class App {
  readonly ethersService: EthersEtherlinkBridgeBlockchainService;
  readonly web3Modal: ReturnType<typeof createWeb3Modal>;
  readonly tezosToolkit: TezosToolkit;
  readonly beaconTezosWallet: BeaconWallet['client'];
  readonly tokenBridge: TokenBridge;

  private readonly beaconWallet: BeaconWallet;
  private readonly tezosWalletSigner: Signer;

  constructor() {
    this.ethersService = new EthersEtherlinkBridgeBlockchainService({
      // NOTE: the VoidSiger used as a filler before real signer assigned
      //       consider to change this to something else:
      signer: new ethers.VoidSigner(config.etherlink.network.rpcUrl),
      ethers
    });
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
      description: config.app.description,
      network: {
        type: NetworkType.CUSTOM,
        rpcUrl: config.tezos.network.rpcUrl
      },
      featuredWallets: ['temple', 'atomex', 'metamask', 'trust'],
      colorMode: ColorMode.DARK,
      walletConnectOptions: {
        projectId: config.walletConnectProjectId
      }
    });
    this.tezosWalletSigner = new TezosWalletSigner(this.beaconWallet);
    this.tezosToolkit.setWalletProvider(this.beaconWallet);
    this.tezosToolkit.setSignerProvider(this.tezosWalletSigner);
    this.beaconTezosWallet = this.beaconWallet.client;

    sdkLoggerProvider.setLogLevel(LogLevel.Debug);
    this.tokenBridge = config.isMock
      ? this.createTokenBridgeMock()
      : this.createTokenBridge();

    if (typeof window !== 'undefined') {
      (window as Window).sdkLoggerProvider = sdkLoggerProvider;
      (window as Window).app = this;
    }
  }

  private createTokenBridgeMock() {
    const tokensProvider = new LocalTokensBridgeDataProvider(tokenPairs);
    const mockProvider = new BridgeDataProviderMock(tokensProvider);

    return new TokenBridgeMock({
      tezosBridgeBlockchainService: new TaquitoWalletTezosBridgeBlockchainService({
        tezosToolkit: this.tezosToolkit,
        smartRollupAddress: config.bridge.smartRollupAddress
      }),
      etherlinkBridgeBlockchainService: this.ethersService,
      bridgeDataProviders: {
        tokens: tokensProvider,
        transfers: mockProvider,
        balances: mockProvider
      }
    });
  }

  private createTokenBridge() {
    const defaultDataProvider = new DefaultDataProvider({
      tokenPairs,
      dipDup: {
        baseUrl: config.providers.dipDup.baseUrl,
        webSocketApiBaseUrl: config.providers.dipDup.webSocketApiBaseUrl,
      },
      tzKTApiBaseUrl: config.providers.tzKT.baseUrl,
      etherlinkRpcUrl: config.etherlink.network.rpcUrl,
    });

    return new TokenBridge({
      tezosBridgeBlockchainService: new TaquitoWalletTezosBridgeBlockchainService({
        tezosToolkit: this.tezosToolkit,
        smartRollupAddress: config.bridge.smartRollupAddress
      }),
      etherlinkBridgeBlockchainService: this.ethersService,
      bridgeDataProviders: {
        transfers: defaultDataProvider,
        balances: defaultDataProvider,
        tokens: defaultDataProvider,
      }
    });
  }
}
