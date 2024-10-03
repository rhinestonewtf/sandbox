type Props = {
  title: string;
  value: React.ReactNode;
  label?: React.ReactNode;
  subLabel?: React.ReactNode;
  placeHolder?: string;
  prefix?: string;
  onChange: (value: string) => void;
};

export const InputTextArea = ({
  title,
  value,
  label,
  subLabel,
  placeHolder = "",
  prefix = "",
  onChange,
}: Props) => {
  return (
    <div
      className={`flex flex-col bg-neutral-50 rounded-xl border border-slate-900 border-opacity-0 p-2 w-full`}
    >
      <div className="flex">
        <div className="text-left flex-1 text-neutral-gray text-xs font-normal">
          {title}
        </div>
        <div>{label}</div>
      </div>
      <div className="flex items-center justify-center box-border">
        {prefix && <div className="text-lg text-slate-400">{prefix}</div>}
        <textarea
          placeholder={placeHolder}
          className="min-h-8 h-32 flex-1 input w-full bg-neutral-50 focus:outline-none p-0 m-0 text-base font-normal text-neutral-dark"
          value={value as string}
          onChange={(event) => onChange(event.target.value)}
        />
        {subLabel && <div>{subLabel}</div>}
      </div>
    </div>
  );
};
