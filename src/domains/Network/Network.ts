export type Network = {
  name: string
  testnet: boolean
  icon: string
  bundlerUrl: string
  rpcUrl: string
  zeroExBaseUrl: string
  id: number
  network: string
  nativeCurrency: { name: string; symbol: string; decimals: number }
  rpcUrls: {
    default: {
      http: string[]
    }
    public: {
      http: string[]
    }
  }
  queryName: string
  blockExplorerUrl: string
  explorerName: string
}
