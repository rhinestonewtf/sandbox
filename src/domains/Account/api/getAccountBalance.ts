import { formatEther } from 'viem'
import { Account } from '../Account'
import { Network } from '../../Network'
import { useActiveAccount } from '../hooks'
import { useQuery } from '@tanstack/react-query'
import { useActiveNetwork } from '../../Network/hooks'
import { getPublicClient } from '../../Network/helpers'

type Params = {
  network: Network
  account: Account
}

export const getAccountBalance = async ({ network, account }: Params) => {
  const publicClient = getPublicClient(network)
  const balance = await publicClient.getBalance({ address: account.address })
  return {
    balance: Number(formatEther(balance)).toFixed(2),
    symbol: network.nativeCurrency.symbol,
  }
}

export const useGetAccountBalance = () => {
  const [activeNetwork] = useActiveNetwork()
  const [activeAccount] = useActiveAccount()

  return useQuery({
    queryKey: ['accountBalance', activeNetwork.id, activeAccount.address],
    queryFn: () =>
      getAccountBalance({
        network: activeNetwork,
        account: activeAccount,
      }),
    enabled: false,
  })
}
