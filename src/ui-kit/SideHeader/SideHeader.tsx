type Props = {
  title: string
  subTitle: string
  actions?: React.ReactNode
  className?: string
}

export const SideHeader = ({ title, subTitle, actions, className }: Props) => {
  return (
    <div className={`text-center w-[448px] ${className}`}>
      <div>
        <h1 className="text-neutral-dark text-2xl font-medium font-oatmealProMedium">
          {title}
        </h1>
        <p className="text-neutral-dark text-base font-normal">{subTitle}</p>
      </div>
      <div>{actions}</div>
    </div>
  )
}

export const MainHeader = ({ title, subTitle, actions, className }: Props) => {
  return (
    <div
      className={`flex justify-between items-center text-left w-full ${className}`}
    >
      <div>
        <h1 className="text-neutral-dark text-2xl font-medium font-oatmealProMedium">
          {title}
        </h1>
        <p className="text-neutral-dark text-base font-normal">{subTitle}</p>
      </div>
      <div>{actions}</div>
    </div>
  )
}
