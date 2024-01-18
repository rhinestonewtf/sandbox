import { useContext } from 'react'
import { IsTransactionInProgress } from '@/src/context'

export const useIsTransactionInProgress = () => {
  const { isTransactionInProgress, setIsTransactionInProgress } = useContext(
    IsTransactionInProgress,
  )
  return [isTransactionInProgress, setIsTransactionInProgress] as const
}
