"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Hex } from "viem";
import * as allChains from "viem/chains";
import { useEffect, useState } from "react";
import { Account } from "@/src/domains/Account";
import { Network } from "@/src/domains/Network";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { InjectedConnector } from "wagmi/connectors/injected";
import { networks } from "@/src/domains/Network/api/networks";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { PendingTransaction } from "@/src/domains/Transaction/Transaction";
import { WagmiConfig, createConfig, configureChains, Address } from "wagmi";
import { PendingUserOperation } from "@/src/domains/UserOperation/UserOperation";
import {
  ActiveAccountContext,
  ActiveNetworkContext,
  PendingUserOpsContext,
  PendingTransactionsContext,
  IsUserOpInProgressContext,
  IsTransactionInProgress,
} from "@/src/context";

type Props = { children: React.ReactNode };

export const Providers = ({ children }: Props) => {
  const [activeNetwork, setActiveNetwork] = useState<Network>(networks[0]);
  const [isUserOpInProgress, setIsUserOpInProgress] = useState<boolean>(false);
  const [pendingUserOps, setPendingUserOps] = useState<PendingUserOperation[]>(
    []
  );
  const [pendingTransactions, setPendingTransactions] = useState<
    PendingTransaction[]
  >([]);
  const [isTransactionInProgress, setIsTransactionInProgress] =
    useState<boolean>(false);

  const [activeAccount, setActiveAccount] = useState<Account>({
    address: "" as Address,
    salt: "",
    webauthnKeyId: "",
    initCode: "" as Hex,
    deployedOnNetworks: [],
    balance: {
      balance: "0",
      symbol: activeNetwork.nativeCurrency.symbol,
    },
  });

  const { chains, publicClient } = configureChains(
    [...Object.values(allChains), ...networks],
    [
      publicProvider(),
      infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY! }),
    ]
  );

  const queryClient = new QueryClient();

  const { connectors } = getDefaultWallets({
    appName: "Rhinestone Playground",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,

    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={queryClient}>
          <ActiveAccountContext.Provider
            value={{ activeAccount, setActiveAccount }}
          >
            <ActiveNetworkContext.Provider
              value={{ activeNetwork, setActiveNetwork }}
            >
              <IsUserOpInProgressContext.Provider
                value={{ isUserOpInProgress, setIsUserOpInProgress }}
              >
                <PendingUserOpsContext.Provider
                  value={{ pendingUserOps, setPendingUserOps }}
                >
                  <PendingTransactionsContext.Provider
                    value={{ pendingTransactions, setPendingTransactions }}
                  >
                    <IsTransactionInProgress.Provider
                      value={{
                        isTransactionInProgress,
                        setIsTransactionInProgress,
                      }}
                    >
                      {/* <ReactQueryDevtools /> */}
                      {children}
                    </IsTransactionInProgress.Provider>
                  </PendingTransactionsContext.Provider>
                </PendingUserOpsContext.Provider>
              </IsUserOpInProgressContext.Provider>
            </ActiveNetworkContext.Provider>
          </ActiveAccountContext.Provider>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
