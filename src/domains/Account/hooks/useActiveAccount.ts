import { useContext } from 'react'
import { ActiveAccountContext } from '@/src/context/activeAccount'

export const useActiveAccount = () => {
  const { activeAccount, setActiveAccount } = useContext(ActiveAccountContext)
  return [activeAccount, setActiveAccount] as const
}
