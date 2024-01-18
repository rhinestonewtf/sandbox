type Props = {
  bgColor?: string
  color?: string
  size?: number
}

export const ReceiveIcon = ({ bgColor, color, size }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || '20'}
      height={size || '20'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.5 4V16M9.5 16L5 12.3333M9.5 16L14 12.3333"
        stroke={color || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
