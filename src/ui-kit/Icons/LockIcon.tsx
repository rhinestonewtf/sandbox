type Props = {
  bgColor?: string
  fillColor?: string
  size?: number
}

export const LockIcon = ({ bgColor, fillColor, size = 24 }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 11C6 10.4477 6.44772 10 7 10H17C17.5523 10 18 10.4477 18 11V16C18 18.2091 16.2091 20 14 20H10C7.79086 20 6 18.2091 6 16V11Z"
        fill={fillColor || '#9896ae'}
      />
      <path
        d="M9 10V8C9 6.34315 10.3431 5 12 5V5C13.6569 5 15 6.34315 15 8V10"
        stroke={fillColor || '#9896ae'}
        strokeWidth="2"
      />
    </svg>
  )
}
