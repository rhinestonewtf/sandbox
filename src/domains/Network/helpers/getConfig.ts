import { Network } from '../Network'
import { createConfig, http } from 'wagmi'

export const getConfig = (activeNetwork: Network) => {
  return createConfig({
    chains: [activeNetwork],
    transports: {
      [activeNetwork.id]: http(),
    },
  })
}
