"use client";
import { useState } from "react";
import { Address, Hex } from "viem";
import * as allChains from "viem/chains";
import { injected } from "wagmi/connectors";
import { ConnectKitProvider } from "connectkit";
import { Account } from "@/src/domains/Account";
import { Network } from "@/src/domains/Network";
import { mainnet, sepolia, Chain } from "wagmi/chains";
import { WagmiProvider, createConfig, http } from "wagmi";
import { networks } from "@/src/domains/Network/api/networks";
import { walletConnect, coinbaseWallet } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PendingTransaction } from "@/src/domains/Transaction/Transaction";
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

const chainList: Chain[] = [];

for (const chainName in allChains) {
  // Check if the property is not inherited from the prototype chain
  if (Object.prototype.hasOwnProperty.call(allChains, chainName)) {
    // @ts-ignore
    chainList.push(allChains[chainName]);
  }
}

export const wagmiConfig = createConfig({
  // @ts-ignore
  chains: [...chainList],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [allChains.baseSepolia.id]: http(),
  },
  connectors: [
    injected({ target: "metaMask" }),
    coinbaseWallet({
      appName: "Rhinestone",
      headlessMode: true,
    }),
    // walletConnect({
    //   projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    // }),
  ],
});

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
    tokens: [],
    balance: {
      balance: "0",
      symbol: activeNetwork.nativeCurrency.symbol,
    },
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <ConnectKitProvider>
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
        </ConnectKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default Providers;
