import { TransactionReceipt } from 'viem'

export type PendingTransaction = {
  name: string
  icon?: React.ReactNode
  transactionFunc: () => Promise<TransactionReceipt>
}
