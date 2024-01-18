'use client'
import classNames from 'classnames'
import { Dropdown } from '@/src/ui-kit'
import { ReactNode, useEffect } from 'react'

type Props = {
  className?: string
  itemsList: Item[]
  selectedIndex?: number
  title?: string
  variant?: 'small' | 'large'
  onChange: (value: string) => void
}

type Item = {
  label: ReactNode
  value: string
}

export const InputDropdown = ({
  className,
  itemsList = [],
  selectedIndex = 0,
  title,
  onChange,
}: Props) => {
  useEffect(() => {
    onChange(itemsList[selectedIndex].value)
  }, [])

  return (
    <div
      className={classNames('bg-neutral-50 rounded-xl border-0', {
        'p-3': !!title,
      })}
    >
      {title && <div className="text-xs font-normal mb-2">{title}</div>}
      <Dropdown
        items={itemsList}
        selectedItem={itemsList[selectedIndex].value}
        className={`dropdown-text network-switcher-dropdown ${className}`}
        onChange={(value) =>
          onChange(itemsList.find((item) => item.value === value)?.value!)
        }
      />
    </div>
  )
}
