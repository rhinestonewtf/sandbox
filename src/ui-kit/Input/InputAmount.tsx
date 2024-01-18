type Props = {
  title: string
  value: React.ReactNode
  label?: React.ReactNode
  tokenSelector: React.ReactNode
  placeHolder?: string
  disabled?: boolean
  onChange: (value: string) => void
}

export const InputAmount = ({
  title,
  value,
  label,
  tokenSelector,
  placeHolder = '',
  onChange,
  disabled = false,
}: Props) => {
  return (
    <div
      className={`flex flex-col p-4 pb-3 w-full bg-neutral-50 rounded-xl border border-slate-900 border-opacity-0 leading-none`}
    >
      <div className="flex">
        <div className="text-left flex-1 text-slate-900 text-xs font-normal leading-none">
          {title}
        </div>
        <div className="opacity-40 text-slate-900 text-xs font-normal !leading-none">
          {label}
        </div>
      </div>
      <div className="flex items-center mt-3">
        <div>{tokenSelector}</div>
        <input
          type="number"
          placeholder={placeHolder}
          className="flex-1 focus:outline-none p-0 m-0 bg-neutral-50 text-right leading-none"
          value={value as string}
          onChange={(event) => {
            onChange(event.target.value)
          }}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
