import type { AppProps } from "next/app";
import Head from "next/head";

import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useEffect } from "react";

import type { MetaMask } from "@web3-react/metamask";
import type { WalletConnect } from "@web3-react/walletconnect";
import type { Web3ReactHooks } from "@web3-react/core";

import { Web3ReactProvider } from "@web3-react/core";

import { hooks as metaMaskHooks, metaMask } from "../providers/metamask";
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "../providers/walletconnect";

const connectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
];

export const lightTheme = createTheme({
  type: "light",
  className: "nextui-docs-light",
  theme: {
    colors: {
      background: "none",
      headerBackground: "",
      menuBackground: "",
      headerIconColor: "$accents4",
      codeBackground: "",
      codeComment: "$accents7",
      codeCopyIconColor: "$accents2",
      cardBackground: "",
      codeHighlight: "hsl(243, 16%, 30%)",
      backgroundBlur: "rgba(255, 255, 255, 0.3)",
      blockLinkColor: "#FF1CF7",
      blockLinkBackground: "",
      blockLinkHoverBackground: "#FFD1ED",
    },
  },
});

const AppEntrypoint = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    metaMask.connectEagerly();
    walletConnect.connectEagerly();
  }, []);

  return (
    <>
      <Head>
        <title>ZED RUN | Digital Horse Racing</title>
        <link rel="icon" href="https://zed.run/zed_favicon_black.ico" />
      </Head>
      <NextThemesProvider
        defaultTheme="light"
        attribute="class"
        value={{
          light: lightTheme.className,
        }}
      >
        <NextUIProvider>
          <Web3ReactProvider connectors={connectors}>
            <Component {...pageProps} />
          </Web3ReactProvider>
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
};

export default AppEntrypoint;
