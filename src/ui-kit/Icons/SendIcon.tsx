type Props = {
  color?: string
  size?: number
}

export const SendIcon = ({ color, size }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || '12'}
      height={size || '12'}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M1.75735 10.2426L10.2426 1.75736M10.2426 1.75736L10.8319 7.53206M10.2426 1.75736L4.46793 1.1681"
        stroke={color || 'white'}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}
