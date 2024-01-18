type Props = {
  color?: string
  size?: number
}

export const BackIcon = ({ color, size }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect
        x="20"
        width="20"
        height="20"
        rx="10"
        transform="rotate(90 20 0)"
        fill="#05003B"
      />
      <path d="M11.5 14L7.5 10L11.5 6" stroke="white" strokeWidth="1.2" />
    </svg>
  )
}
