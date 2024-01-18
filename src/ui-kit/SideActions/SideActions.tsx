import { BackIcon } from '../Icons'
import { BackButton } from '@/src/components'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
  onBackClick?: () => void
  onCloseClick?: () => void
  children?: React.ReactNode
}

export const SideActions = ({ children, onBackClick, onCloseClick }: Props) => {
  return (
    <div className="flex sticky top-0 justify-between items-center bg-white z-20 h-14">
      {onBackClick ? (
        <BackButton onClick={onBackClick} />
      ) : (
        <div className="w-12" />
      )}
      <span className="text-slate-900 text-base font-medium">{children}</span>
      {onCloseClick ? (
        <div
          className="flex gap-1 items-center link link-hover w-12"
          onClick={onCloseClick}
        >
          <a className="link link-hover">Close</a>
          <div>
            <AiOutlineClose />
          </div>
        </div>
      ) : (
        <div className="w-12" />
      )}
    </div>
  )
}
