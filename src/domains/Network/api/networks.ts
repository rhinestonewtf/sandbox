import { Network } from "../Network";

export const networks: Network[] = [
  {
    name: "Sepolia",
    testnet: true,
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL_MUMBAI!,
    rpcUrl: "https://rpc.ankr.com/eth_sepolia",
    zeroExBaseUrl: "https://sepolia.api.0x.org",
    id: 11_155_111,
    network: "Sepolia",
    queryName: "sepolia",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://rpc.ankr.com/eth_sepolia"],
      },
      public: {
        http: ["https://rpc.ankr.com/eth_sepolia"],
      },
    },
    blockExplorerUrl: "https://sepolia.etherscan.io",
    explorerName: "Etherscan",
  },
];
