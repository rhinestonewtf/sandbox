import { Hex } from 'viem'
import { useContext } from 'react'
import { UserOperation } from 'permissionless'
import { PendingUserOpsContext } from '@/src/context'

type Params = {
  name: string
  hash: Hex
  signedOp: UserOperation
  callback?: () => void
}

export const useQueueUserOp = () => {
  const { pendingUserOps, setPendingUserOps } = useContext(
    PendingUserOpsContext,
  )

  const queueUserOp = ({ name, hash, signedOp, callback }: Params) => {
    const pendingOps = [...pendingUserOps, { name, hash, signedOp, callback }]
    setPendingUserOps(pendingOps)
  }

  return queueUserOp
}
