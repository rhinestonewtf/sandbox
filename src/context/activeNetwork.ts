import { Network } from '../domains/Network'
import { networks } from '../domains/Network/api/networks'
import { Dispatch, SetStateAction, createContext } from 'react'

export const ActiveNetworkContext = createContext<{
  activeNetwork: Network
  setActiveNetwork: Dispatch<SetStateAction<Network>>
}>({
  activeNetwork: networks[0],
  setActiveNetwork: () => {},
})
