import { useContext } from 'react'
import { TokenIcon } from './TokenIcon'
import { ActiveNetworkContext } from '@/src/context'
import { ERC20Token } from '../ERC20Token/ERC20Token'
import { useActiveAccount } from '../../Account/hooks'
import { InfoMessage } from '@/src/ui-kit/InfoMessage'
import { AssetsIcon, Button, Item } from '@/src/ui-kit'
import { getCoinFromFaucet } from '../../Network/helpers/faucet'
import { useQueueTransactions } from '../../Transaction/hooks/useQueueTransactions'

type Props = {
  tokens: ERC20Token[]
}
export const TokensList = ({ tokens }: Props) => {
  const [activeAccount] = useActiveAccount()
  const { activeNetwork } = useContext(ActiveNetworkContext)
  const queueTransaction = useQueueTransactions()

  return tokens.length > 0 ? (
    <div className="flex flex-col divide-y divide-base-300 gap-2">
      <div className="py-2">
        <Item
          icon={<TokenIcon size={48} token={activeNetwork.nativeCurrency} />}
          title={
            <div className="text-neutral-dark text-base font-medium">
              {activeNetwork.nativeCurrency.name}
            </div>
          }
          subTitle={
            <div className="opacity-50 text-slate-900 text-base font-normal">
              {activeNetwork.nativeCurrency.symbol}
            </div>
          }
          value={`${activeAccount.balance.balance} ${activeAccount.balance.symbol}`}
          className="border-none !px-0 py-1"
        />
      </div>

      {tokens.map((token, index) => (
        <div className="py-2" key={index}>
          <Item
            icon={<TokenIcon size={48} token={token} />}
            title={
              <div className="text-neutral-dark text-base font-medium">
                {token.name}
              </div>
            }
            subTitle={
              <div className="opacity-50 text-slate-900 text-base font-normal">
                {token.symbol}
              </div>
            }
            value={`${token.balance} ${token.symbol}`}
            className="border-none !px-0 py-1"
          />
        </div>
      ))}
    </div>
  ) : (
    <InfoMessage
      title="No Tokens to show"
      desc="Claim some tokens and start testing the Rhinestone Wallet"
      action={
        <Button
          className="bg-white w-[143px] h-[36px] btn-xs gap-1 pl-0 font-medium border-slate-900 border-opacity-5"
          onClick={() => {
            queueTransaction({
              name: `Receive 0.1 ${activeNetwork.nativeCurrency.symbol}`,
              transactionFunc: () =>
                getCoinFromFaucet(activeNetwork, '0.1', activeAccount.address),
            })
          }}
        >
          <AssetsIcon isActive color="#05003B" />
          Claim tokens
        </Button>
      }
    />
  )
}
