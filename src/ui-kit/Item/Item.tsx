'use client'

type Props = {
  title: React.ReactNode
  value?: React.ReactNode
  subTitle?: React.ReactNode
  subValue?: React.ReactNode
  imageUrl?: string
  icon?: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Item = ({
  title,
  subTitle,
  value,
  subValue,
  imageUrl,
  icon,
  className,
  onClick,
}: Props) => (
  <div
    className={`flex gap-4 border border-slate-200 rounded-lg items-center justify-center join-item w-full p-4 ${className} ${
      onClick && 'hover:cursor-pointer hover:bg-slate-100'
    }`}
    onClick={onClick}
  >
    {imageUrl && <img src={imageUrl} className="w-12 rounded" />}
    {icon && <div>{icon}</div>}
    <div className="flex-1">
      <div className="flex flex-col gap-1">
        <p className="text-left text-sm font-normal text-neutral-dark font-oatmealProMedium">
          {title}
        </p>
        {subTitle && <div>{subTitle}</div>}
      </div>
    </div>
    <div className="flex flex-col">
      <div className="text-neutral-dark text-sm font-medium font-oatmealProMedium">
        {value}
      </div>
      {subValue && <div>{subValue}</div>}
    </div>
  </div>
)
