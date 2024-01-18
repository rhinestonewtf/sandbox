'use client'
import { Account } from '../../Account'
import { PendingUserOperation } from '../UserOperation'

type Params = {
  activeAccount: Account
  pendingUserOps: PendingUserOperation[]
}

export const storePendingUserOps = ({
  activeAccount,
  pendingUserOps,
}: Params) => {
  window.localStorage.setItem(
    `${activeAccount.address}-pendingUserOps`,
    JSON.stringify(pendingUserOps, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  )
}

export const getPendingUserOps = (
  activeAccount: Account,
): PendingUserOperation[] => {
  const pendingUserOps = window.localStorage.getItem(
    `${activeAccount.address}-pendingUserOps`,
  )

  if (!pendingUserOps) {
    return []
  }

  return JSON.parse(pendingUserOps, (key, value) =>
    typeof value === 'string' && /^\d+$/.test(value) ? BigInt(value) : value,
  )
}
