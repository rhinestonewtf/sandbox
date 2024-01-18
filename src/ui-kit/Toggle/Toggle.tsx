type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const Toggle = ({ checked, onChange }: Props) => {
  return (
    <div className="">
      <label className="cursor-pointer label">
        <input
          checked={checked}
          type="checkbox"
          className="toggle toggle-primary"
          onChange={(e) => onChange(e.target.checked)}
        />
      </label>
    </div>
  )
}
