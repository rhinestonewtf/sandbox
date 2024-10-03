import { ERC20Token } from '../ERC20Token/ERC20Token'

export const getTokenDisplayValue = (token: Pick<ERC20Token, 'balance'>) => {
  const value = Number(token.balance)

  if (value >= 0.01) {
    return value.toFixed(2)
  }

  return '> 0.01'
}
