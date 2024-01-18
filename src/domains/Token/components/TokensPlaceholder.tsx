import { useContext } from 'react'
import { ActiveNetworkContext } from '@/src/context'
import { useActiveAccount } from '../../Account/hooks'
import { getCoinFromFaucet } from '../../Network/helpers/faucet'
import { Card, StarIcon, ChatIcon, AssetsIcon, Button } from '@/src/ui-kit'
import { useQueueTransactions } from '../../Transaction/hooks/useQueueTransactions'

export const TokensPlaceholder = () => {
  const [activeAccount] = useActiveAccount()
  const { activeNetwork } = useContext(ActiveNetworkContext)
  const queueTransaction = useQueueTransactions()

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card
        title="Welcome to Rhinestone!"
        description="The first plug-n-play smart wallet, powered by Rhinestone's unique modular infrastructure"
        imageUrl="/robot.png"
        actions={
          <div className="flex gap-2">
            <Button
              className="bg-base-100 w-[127px] h-[36px] btn-xs pl-0 font-medium border-base-200 gap-2"
              onClick={() => {}}
            >
              <StarIcon />
              Learn more
            </Button>
            <Button
              className="bg-base-100 border w-[142px] h-[36px] btn-xs pl-0 font-medium border-base-200 gap-2"
              onClick={() => {}}
            >
              <ChatIcon />
              Get in touch
            </Button>
          </div>
        }
      />
      <Card
        title="Claim your first tokens"
        description="This will allow you to test out the Rhinestone Wallet and explore applications"
        imageUrl="/modules.png"
        actions={
          <Button
            className="bg-neutral-dark hover:bg-neutral-dark hover:border-none text-white w-24 h-[36px] btn-xs pl-0 font-medium border-slate-900 border-opacity-5 gap-2"
            onClick={() => {
              queueTransaction({
                name: `Receive 0.1 ${activeNetwork.nativeCurrency.symbol}`,
                transactionFunc: () =>
                  getCoinFromFaucet(
                    activeNetwork,
                    '0.1',
                    activeAccount.address,
                  ),
              })
            }}
          >
            <AssetsIcon isActive color="#ffffff" fill="#05003B" />
            Claim
          </Button>
        }
      />
    </div>
  )
}
