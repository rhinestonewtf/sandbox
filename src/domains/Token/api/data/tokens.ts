import { zeroAddress } from 'viem'

export const allTokens = [
  {
    name: 'MATIC',
    token_address: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    name: 'Wrapped Ether',
    token_address: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    symbol: 'WETH',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    name: 'Wrapped Matic',
    token_address: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
  },
]

export const nativeCoins = [
  {
    name: 'MATIC',
    token_address: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
]

export const ERC20Tokens = [
  {
    name: 'Wrapped Ether',
    token_address: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    symbol: 'WETH',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    name: 'Wrapped Matic',
    token_address: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 80001,
    logoURI:
      'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
  },
]

export const AnyERC20Token = {
  name: 'Any ERC20 Token',
  token_address: zeroAddress,
  symbol: 'Any ERC20 Token',
  decimals: 18,
  chainId: 80001,
  logoURI:
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
}
