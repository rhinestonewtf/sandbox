import { ERC20Token } from '../ERC20Token/ERC20Token'
import {
  AssetsIcon,
  PolygonIcon,
  USDCIcon,
  USDTIcon,
  WETHIcon,
  WMaticIcon,
} from '@/src/ui-kit/Icons'

type Props = {
  token: Pick<ERC20Token, 'symbol'>
  size: number
}

export const TokenIcon = ({ token, size }: Props) => {
  switch (token.symbol) {
    case 'USDC':
      return <USDCIcon size={size} />
    case 'USDT':
      return <USDTIcon size={size} />
    case 'WETH':
      return <WETHIcon size={size} />
    case 'WMATIC':
      return <WMaticIcon size={size} />
    case 'MATIC':
      return <PolygonIcon size={size} />
    default:
      return <AssetsIcon size={size} isActive={false} />
  }
}
