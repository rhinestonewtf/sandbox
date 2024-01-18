import { useContext } from 'react'
import { PendingTransactionsContext } from '@/src/context'

export const usePendingTransactions = () => {
  const { pendingTransactions, setPendingTransactions } = useContext(
    PendingTransactionsContext,
  )
  return [pendingTransactions, setPendingTransactions] as const
}
