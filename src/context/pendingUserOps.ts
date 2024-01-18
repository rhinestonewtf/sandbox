import { Dispatch, SetStateAction, createContext } from 'react'
import { PendingUserOperation } from '../domains/UserOperation/UserOperation'

export const PendingUserOpsContext = createContext<{
  pendingUserOps: PendingUserOperation[]
  setPendingUserOps: Dispatch<SetStateAction<PendingUserOperation[]>>
}>({
  pendingUserOps: [],
  setPendingUserOps: () => {},
})
