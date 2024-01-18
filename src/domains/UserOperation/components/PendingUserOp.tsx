import { ReactNode } from 'react'
import { AssetsIcon } from '@/src/ui-kit'

type Props = {
  name: string
  icon?: ReactNode
}

export const PendingUserOp = ({ name, icon }: Props) => (
  <div className={`flex gap-4 border-slate-200 rounded-lg p-4 bg-white`}>
    <div className="relative w-12 h-12 rounded-full self-center">
      <div className="flex self-center rounded-full w-[50px] h-[50px] shadow-md">
        {icon || <AssetsIcon size={50} />}
      </div>
      <div className=" bg-white absolute -right-2 -bottom-2 rounded-full w-6 h-6 shadow-md flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-slate-400 m-1"></span>
      </div>
    </div>

    <div className="flex-1">
      <div className="flex flex-col gap-2">
        <p className="text-left text-sm text-slate-700">{name}</p>
        <p className="text-sm font-bold text-slate-500">Processing..</p>
      </div>
    </div>
  </div>
)
