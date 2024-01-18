'use client'
import { Sidebar } from './Sidebar'
import { CLoseIcon } from '../ui-kit/Icons/CLoseIcon'

type Props = {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
}

export const SideDrawer = ({
  isOpen = false,
  title = '',
  children,
  onClose,
}: Props) => (
  <div className="drawer drawer-end z-50">
    <input
      id="my-drawer"
      type="checkbox"
      className="drawer-toggle"
      checked={isOpen}
      onChange={onClose}
    />
    <div className="drawer-content"></div>
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="flex justify-center items-center w-2/3  max-w-[1000px] min-w-[760px] h-[56px] px-2 relative">
        <p className="text-center text-gray-800 text-sm font-medium">{title}</p>
        <div className="absolute right-0 top-4">
          <CloseButton onClick={onClose} />
        </div>
      </div>
      <div
        className="menu w-2/3 max-w-[1000px] min-w-[760px] mt-[56px] bg-white text-base-content overflow-scroll p-0 px-5 rounded-[20px]"
        style={{
          height: 'calc(100% - 75px)',
          boxShadow: '0px 40px 52px rgba(0, 0, 0, 0.08)',
        }}
      >
        {children}
      </div>
    </div>
  </div>
)

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <div
    className="flex font-mono w-[69px] h-6 pl-2 pr-1 py-2 box-border bg-neutral-dark rounded-[100px] backdrop-blur-2xl bg-opacity-5 justify-center items-center gap-1 hover:cursor-pointer"
    onClick={onClick}
  >
    <div className="font-medium text-[11px] text-neutral-dark font-mono uppercase">
      Close
    </div>
    <CLoseIcon />
  </div>
)
