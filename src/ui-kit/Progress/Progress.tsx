type Props = {
  value: number
}

export const Progress = ({ value }: Props) => {
  return (
    <progress
      className="progress w-[160px] h-[2px]"
      value={value}
      max="100"
    ></progress>
  )
}
