import { useContext } from 'react'
import { PendingUserOpsContext } from '@/src/context'

export const usePendingUserOps = () => {
  const { pendingUserOps, setPendingUserOps } = useContext(
    PendingUserOpsContext,
  )
  return [pendingUserOps, setPendingUserOps] as const
}
