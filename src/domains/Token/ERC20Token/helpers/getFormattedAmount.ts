import { ERC20Token } from '../ERC20Token'
import { Network } from '@/src/domains/Network'

export const getFormattedAmount = ({
  token,
  amount,
  activeNetwork,
}: {
  token?: ERC20Token
  amount: number
  activeNetwork: Network
}) => {
  if (token) {
    return `${amount.toFixed(2)} ${token.symbol}`
  } else {
    return `${amount.toFixed(2)} ${activeNetwork.nativeCurrency.symbol}`
  }
}
