import { useContext } from 'react'
import { PendingTransaction } from '../Transaction'
import { PendingTransactionsContext } from '@/src/context'

export const useQueueTransactions = () => {
  const { pendingTransactions, setPendingTransactions } = useContext(
    PendingTransactionsContext,
  )

  const queueTransaction = ({
    name,
    icon,
    transactionFunc,
  }: PendingTransaction) => {
    setPendingTransactions([
      ...pendingTransactions,
      { name, icon, transactionFunc },
    ])
  }

  return queueTransaction
}
