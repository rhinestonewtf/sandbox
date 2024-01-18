import { Address, isAddress } from 'viem'
import { fetchBalance } from '@wagmi/core'
import { ERC20Token } from '../ERC20Token'
import { AccountBalance } from '@/src/domains/Account'

type Params = {
  token?: ERC20Token
  accountBalance?: AccountBalance
  accountAddress: string
}

export const getFormattedTokenBalance = async ({
  accountBalance,
  token,
  accountAddress,
}: Params) => {
  if (token && isAddress(token.token_address)) {
    const balance = await fetchBalance({
      token: token.token_address,
      chainId: token.chainId,
      address: accountAddress as Address,
    })
    return `${Number(balance.formatted).toFixed(2)} ${token.symbol}`
  }
  if (accountBalance) {
    return `${accountBalance.balance} ${accountBalance.symbol}`
  }
  return '0'
}
