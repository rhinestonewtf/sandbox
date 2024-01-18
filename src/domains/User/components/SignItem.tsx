import classNames from 'classnames'
import { notReachable } from '@/src/utils/notReachable'
import {
  Item,
  EOAWalletIcon,
  CheckedIcon,
  ArrowRightIcon,
  KeyIcon,
} from '@/src/ui-kit'

type Props = {
  isSelected: boolean
  variant: 'eoa' | 'passkeys'
  title: string
  subTitle: string
  disabled?: boolean
  onClick: () => void
}

export const SignItem = ({
  isSelected,
  variant,
  title,
  subTitle,
  disabled,
  onClick,
}: Props) => {
  return (
    <Item
      className={classNames('h-[72px]', {
        'bg-base-100 border border-base-200 border-opacity-20 rounded-xl hover:bg-base-300 box-border':
          !isSelected,
        'bg-indigo-600 bg-opacity-5 rounded-xl border border-indigo-600 border-opacity-5':
          isSelected,
      })}
      title={
        <div
          className={classNames('security-option-title', {
            'text-indigo-600': isSelected,
          })}
        >
          {title}
        </div>
      }
      subTitle={
        <div
          className={classNames('security-option-subtitle', {
            'text-indigo-600': isSelected,
          })}
        >
          {subTitle}
        </div>
      }
      icon={<Icon selected={isSelected} variant={variant} />}
      value={isSelected ? <CheckedIcon /> : <ArrowRightIcon />}
      onClick={!disabled ? onClick : undefined}
    />
  )
}

const Icon = ({
  selected,
  variant,
}: {
  selected: boolean
  variant: Props['variant']
}) => {
  switch (variant) {
    case 'eoa':
      return <EOAWalletIcon bgColor={!selected ? '#05003B' : ''} />
    case 'passkeys':
      return <KeyIcon bgColor={!selected ? '#05003B' : ''} />
    default:
      return notReachable(variant)
  }
}
