import { ReactNode } from 'react'

type Props = {
  title: ReactNode
  desc: ReactNode
  action?: ReactNode
}

export const InfoMessage = ({ title, desc, action }: Props) => {
  return (
    <div className="flex p-3 rounded-2xl border border-slate-900 border-opacity-5 items-center justify-center">
      <div className="flex-1">
        <p className="text-zinc-400 text-base font-medium font-oatmealProMedium">
          {title}
        </p>
        <p className="text-zinc-400 text-base font-normal">{desc}</p>
      </div>

      {action && <div className="ml-auto">{action}</div>}
    </div>
  )
}
