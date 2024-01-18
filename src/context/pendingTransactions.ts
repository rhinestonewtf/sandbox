import { Dispatch, SetStateAction, createContext } from 'react'
import { PendingTransaction } from '../domains/Transaction/Transaction'

export const PendingTransactionsContext = createContext<{
  pendingTransactions: PendingTransaction[]
  setPendingTransactions: Dispatch<SetStateAction<PendingTransaction[]>>
}>({
  pendingTransactions: [],
  setPendingTransactions: () => {},
})
