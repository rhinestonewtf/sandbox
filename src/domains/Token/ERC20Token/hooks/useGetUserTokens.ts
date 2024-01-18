import { getTokens } from '../api'
import { ERC20Token } from '../ERC20Token'
import { useEffect, useState } from 'react'
import { nativeCoins } from '../../api/data/tokens'
import { useActiveNetwork } from '@/src/domains/Network/hooks'
import { useActiveAccount } from '@/src/domains/Account/hooks'

type Params = { withNativeCoin?: boolean }

export const useGetUserTokens = ({ withNativeCoin = true }: Params) => {
  const [activeNetwork] = useActiveNetwork()
  const [activeAccount] = useActiveAccount()
  const [tokens, setTokens] = useState<ERC20Token[]>([])

  const activeNetworkNativeCoin = nativeCoins.filter(
    (coin) => coin.chainId === activeNetwork.id && withNativeCoin,
  )

  const _getTokens = async () => {
    setTokens(
      await getTokens({
        account: activeAccount,
        network: activeNetwork,
      }),
    )
  }

  useEffect(() => {
    _getTokens()
  }, [activeNetwork, activeAccount])

  return [...activeNetworkNativeCoin, ...tokens]
}
