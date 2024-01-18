import { Network } from '../Network'
import { createPublicClient, http } from 'viem'

export const getPublicClient = (network: Network) => {
  return createPublicClient({
    transport: http(network.rpcUrl),
    chain: network,
  })
}
