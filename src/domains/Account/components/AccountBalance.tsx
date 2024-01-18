'use client'

import { useActiveAccount } from '../hooks'

export const AccountBalance = () => {
  const [activeAccount] = useActiveAccount()

  const { balance } = activeAccount.balance

  const [amount, fraction] = balance.split('.')

  return (
    <div className="flex flex-1 text-neutral-dark font-oatmealProMedium">
      <div className="text-heading-0">
        {amount}
        <span className="text-heading-2">.{fraction}</span>{' '}
        <span className="text-heading-2 text-slate-900 text-opacity-50 font-medium">
          {activeAccount.balance.symbol}
        </span>
      </div>
    </div>
  )
}
