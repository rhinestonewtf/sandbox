import { useContext } from 'react'
import { IsUserOpInProgressContext } from '@/src/context'

export const useIsUserOpInProgress = () => {
  const { isUserOpInProgress, setIsUserOpInProgress } = useContext(
    IsUserOpInProgressContext,
  )
  return [isUserOpInProgress, setIsUserOpInProgress] as const
}
