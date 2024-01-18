import { Hex } from 'viem'
import Link from 'next/link'
import { useEffect } from 'react'
import { submitUserOpToBundler } from '../api'
import { PendingUserOp } from './PendingUserOp'
import { updateAccount } from '../../Account/api'
import { useActiveNetwork } from '../../Network/hooks'
import { getBundlerClient } from '@/src/utils/userOps'
import { useActiveAccount } from '../../Account/hooks'
import { useIsUserOpInProgress, usePendingUserOps } from '../hooks'

export const PendingUserOpsList = () => {
  const [pendingUserOps, setPendingUserOps] = usePendingUserOps()
  const [isUserOpInProgress, setIsUserOpInProgress] = useIsUserOpInProgress()
  const [activeNetwork] = useActiveNetwork()
  const [activeAccount] = useActiveAccount()

  const executeUserOp = async () => {
    try {
      if (pendingUserOps.length > 0) {
        setIsUserOpInProgress(true)

        const { signedOp, callback } = pendingUserOps[0]

        const hash = (await submitUserOpToBundler(
          signedOp,
          activeNetwork,
          activeAccount,
        )) as Hex

        await getBundlerClient(activeNetwork).waitForUserOperationReceipt({
          hash,
        })

        if (callback) {
          await callback()
        }

        if (!activeAccount.deployedOnNetworks.includes(activeNetwork.id)) {
          await updateAccount({
            address: activeAccount.address,
            deployedOnNetworks: [
              ...activeAccount.deployedOnNetworks,
              activeNetwork.id,
            ],
          })
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setPendingUserOps((prev) => {
        return [...prev.slice(1)]
      })
      setIsUserOpInProgress(false)
    }
  }

  useEffect(() => {
    if (!isUserOpInProgress) {
      executeUserOp()
    }
  }, [isUserOpInProgress, pendingUserOps.length])

  return (
    <div className="flex flex-col gap-2">
      {pendingUserOps.slice(0, 2).map((userOp, index) => (
        <PendingUserOp key={index} name={userOp.name} icon={userOp.icon} />
      ))}

      {pendingUserOps.length > 2 && (
        <Link href="/activity" className="btn btn-active">
          {pendingUserOps.length - 2} more transactions
        </Link>
      )}
    </div>
  )
}
