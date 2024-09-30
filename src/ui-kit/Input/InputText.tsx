type Props = {
  title: string;
  value: React.ReactNode;
  label?: React.ReactNode;
  subLabel?: React.ReactNode;
  placeHolder?: string;
  variant?: "text" | "number";
  prefix?: string;
  onChange: (value: string) => void;
};

export const InputText = ({
  title,
  value,
  label,
  subLabel,
  variant = "text",
  placeHolder = "",
  prefix = "",
  onChange,
}: Props) => {
  return (
    <div
      className={`flex flex-col bg-neutral-50 rounded-xl border border-slate-900 border-opacity-0 p-4 pb-3 w-full`}
    >
      <div className="flex">
        <div className="text-left flex-1 text-slate-900 text-xs font-normal leading-none">
          {title}
        </div>
        <div className="leading-none">{label}</div>
      </div>
      <div className="flex items-center justify-center box-border leading-none">
        {prefix && <div className="text-lg text-slate-400">{prefix}</div>}
        <input
          type={variant}
          placeholder={placeHolder}
          className="flex-1 input w-full bg-neutral-50 focus:outline-none p-0 m-0 text-base font-normal h-6 text-neutral-dark mt-1"
          value={value as string}
          onChange={(event) => onChange(event.target.value)}
        />
        {subLabel && <div>{subLabel}</div>}
      </div>
    </div>
  );
};
