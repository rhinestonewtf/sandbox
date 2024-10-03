import { Network } from "../Network";

export const networks: Network[] = [
  {
    name: "Sepolia",
    testnet: true,
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL_SEPOLIA!,
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_SEPOLIA!,
    zeroExBaseUrl: "https://sepolia.api.0x.org",
    id: 11_155_111,
    network: "Sepolia",
    queryName: "sepolia",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: [process.env.NEXT_PUBLIC_RPC_URL_SEPOLIA!],
      },
      public: {
        http: [process.env.NEXT_PUBLIC_RPC_URL_SEPOLIA!],
      },
    },
    blockExplorerUrl: "https://sepolia.etherscan.io",
    explorerName: "Etherscan",
  },
  {
    name: "Base Sepolia",
    testnet: true,
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL_BASE_SEPOLIA!,
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_BASE_SEPOLIA!,
    zeroExBaseUrl: "https://sepolia.api.0x.org",
    id: 84532,
    network: "Base Sepolia",
    queryName: "base-sepolia",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: [process.env.NEXT_PUBLIC_RPC_URL_BASE_SEPOLIA!],
      },
      public: {
        http: [process.env.NEXT_PUBLIC_RPC_URL_BASE_SEPOLIA!],
      },
    },
    blockExplorerUrl: "https://sepolia.basescan.org",
    explorerName: "Etherscan",
  },
];
