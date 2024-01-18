'use client'
import { useEffect } from 'react'
import classNames from 'classnames'
import { TokenIcon } from './TokenIcon'
import { Dropdown } from '@/src/ui-kit'
import { ERC20Token } from '../ERC20Token/ERC20Token'

type Props = {
  className?: string
  tokensList: ERC20Token[]
  selectedTokenIndex?: number
  title?: string
  variant?: 'small' | 'large'
  onChange: (token: ERC20Token) => void
}

export const TokenSwitcher = ({
  className,
  tokensList = [],
  selectedTokenIndex = 0,
  title,
  variant = 'large',
  onChange,
}: Props) => {
  useEffect(() => {
    onChange(tokensList[selectedTokenIndex])
  }, [])

  const mappedTokens = tokensList.map((token) => ({
    label: (
      <>
        <TokenIcon size={20} token={token} /> {token.symbol}
      </>
    ),
    value: token.token_address,
    decimals: token.decimals,
  }))

  return (
    <div
      className={classNames('bg-neutral-50 rounded-xl border-0', {
        'p-4': !!title,
      })}
    >
      {title && <div className="text-xs font-normal mb-2">{title}</div>}
      <Dropdown
        items={mappedTokens}
        selectedItem={mappedTokens[selectedTokenIndex].value}
        className={`dropdown-text network-switcher-dropdown pl-0 ${className}`}
        variant={variant}
        bordered={true}
        width="w-[400px]"
        onChange={(address) =>
          onChange(tokensList.find((token) => token.token_address === address)!)
        }
      />
    </div>
  )
}
