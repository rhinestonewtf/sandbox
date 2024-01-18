import { PropsWithChildren } from 'react'

export const PageTitle = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-neutral-dark font-mono text-xs font-medium uppercase">
      {children}
    </div>
  )
}
