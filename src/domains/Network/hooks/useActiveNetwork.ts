import { useContext } from 'react'
import { ActiveNetworkContext } from '@/src/context/activeNetwork'

export const useActiveNetwork = () => {
  const { activeNetwork, setActiveNetwork } = useContext(ActiveNetworkContext)
  return [activeNetwork, setActiveNetwork] as const
}
