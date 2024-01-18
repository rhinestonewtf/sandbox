'use client'
import Image from 'next/image'
import { ReactNode } from 'react'
import classNames from 'classnames'
import { BsFillCircleFill } from 'react-icons/bs'

type Props = {
  title: ReactNode
  description: ReactNode
  icon?: ReactNode
  imageUrl?: string
  actions?: ReactNode
  className?: string
  onClick?: () => void
}

export const Card = ({
  title,
  description,
  icon,
  imageUrl,
  className = '',
  actions,
  onClick,
}: Props) => {
  return (
    <div
      className={classNames(
        'flex flex-col gap-1 border-solid border-[1px] border-base-200 rounded-2xl p-4 bg-white',
        {
          [className]: true,
          'hover:cursor-pointer': onClick,
        },
      )}
      onClick={onClick}
    >
      {icon}
      {imageUrl && (
        <Image
          width={64}
          height={64}
          alt=""
          src={imageUrl}
          className="w-16 h-16 mb-4 rounded-full"
        />
      )}
      <div className="text-paragraph-accent font-oatmealProMedium">{title}</div>
      <div
        className="opacity-[48%] text-slate-900 text-base font-normal"
        style={{ letterSpacing: '-0.16px' }}
      >
        {description}
      </div>
      {actions && <div className="mt-4">{actions}</div>}
    </div>
  )
}
