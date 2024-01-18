'use client'

import classNames from 'classnames'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { ReactNode, useEffect, useState } from 'react'

type Props = {
  items: {
    label: ReactNode
    value: string
  }[]
  selectedItem: string
  bordered?: boolean
  className?: string
  variant?: 'small' | 'large'
  width?: string
  position?: string
  onChange: (value: string) => void
}

export const Dropdown = ({
  items,
  className = '',
  selectedItem,
  width = 'w-full',
  onChange,
}: Props) => {
  const [selected, setSelected] = useState(
    items.find((item) => item.value === selectedItem)?.label,
  )
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSelected(items.find((item) => item.value === selectedItem)?.label)
  }, [selectedItem])

  return (
    <div
      className={classNames(
        'dropdown w-full font-mono uppercase text-slate-900 text-xs font-medium bg-neutral-50 rounded-xl border border-slate-900 border-opacity-0',
        { [className]: !!className },
      )}
    >
      <div
        className="flex h-6 hover:cursor-pointer items-center"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
      >
        <label className="flex hover:cursor-pointer p-0 !m-0 w-full h-6">
          <span className="flex-1 flex items-center gap-2">{selected}</span>
        </label>
        <MdKeyboardArrowDown size="20" />
      </div>

      {isOpen && (
        <ul
          tabIndex={0}
          className={classNames(
            'dropdown-content z-[1] menu p-2 py-1 rounded-lg shadow bg-white border-base-300 border min-w-min',
            {
              [width]: !!width,
            },
          )}
        >
          {items.map((item, index) => {
            return (
              <li key={index} className="w-full">
                <a
                  onClick={() => {
                    if (item.value) {
                      setSelected(item.label)
                      setIsOpen(false)
                    }
                    onChange(item.value)
                  }}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
