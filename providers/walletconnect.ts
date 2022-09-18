import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: {
        1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
      },
    }),
  [1]
);
