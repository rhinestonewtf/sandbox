'use client'

type Props = {
  children: React.ReactNode
}

export const GroupItems = ({ children }: Props) => (
  <div className="join join-vertical w-full">{children}</div>
)
