import Link from 'next/link'
import { useEffect } from 'react'
import { useIsTransactionInProgress, usePendingTransactions } from '../hooks'
import { PendingUserOp as PendingTransaction } from '../../UserOperation/components/PendingUserOp'

export const PendingTransactionsList = () => {
  const [pendingTransactions, setPendingTransactions] = usePendingTransactions()
  const [isTransactionInProgress, setIsTransactionInProgress] =
    useIsTransactionInProgress()

  const executeTransaction = async () => {
    try {
      if (pendingTransactions.length > 0) {
        setIsTransactionInProgress(true)

        const { transactionFunc } = pendingTransactions[0]

        await transactionFunc()
      }
    } catch (err) {
      console.log(err)
    } finally {
      setPendingTransactions((prev) => {
        return [...prev.slice(1)]
      })
      setIsTransactionInProgress(false)
    }
  }

  useEffect(() => {
    if (!isTransactionInProgress) {
      executeTransaction()
    }
  }, [isTransactionInProgress, pendingTransactions.length])

  return (
    <div className="flex flex-col gap-2">
      {pendingTransactions.slice(0, 2).map((tx, index) => (
        <PendingTransaction key={index} name={tx.name} icon={tx.icon} />
      ))}

      {pendingTransactions.length > 2 && (
        <Link href="/activity" className="btn btn-active">
          {pendingTransactions.length - 2} more transactions
        </Link>
      )}
    </div>
  )
}
