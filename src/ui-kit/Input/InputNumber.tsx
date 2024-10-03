type Props = {
  title: string;
  value: React.ReactNode;
  label?: React.ReactNode;
  subLabel?: React.ReactNode;
  placeHolder?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  inputWidth?: string;
  onChange: (value: string) => void;
};

export const InputNumber = ({
  title,
  value,
  label,
  subLabel,
  placeHolder = "",
  prefix = "",
  suffix = "",
  inputWidth,
  onChange,
}: Props) => {
  return (
    <div
      className="flex flex-col w-full h-[80px] bg-neutral-50 rounded-xl p-4"
      style={{ border: "1px solid rgba(5, 0, 59, 0.02)" }}
    >
      <div className="flex">
        <div className="text-left flex-1 text-neutral-gray text-xs font-normal">
          {title}
        </div>
        <div>{label}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {prefix && <div className="text-lg text-slate-400">{prefix}</div>}
          <input
            type="number"
            placeholder={placeHolder}
            className={`bg-neutral-50 focus:outline-none p-0 m-0 text-lg self-start ${inputWidth}`}
            value={value as string}
            onChange={(event) => onChange(event.target.value)}
          />
          {suffix && (
            <div className="text-base font-medium text-neutral-dark">
              {suffix}
            </div>
          )}
        </div>

        <div>
          {subLabel && (
            <div className="flex-1 justify-self-end">{subLabel}</div>
          )}
        </div>
      </div>
    </div>
  );
};
