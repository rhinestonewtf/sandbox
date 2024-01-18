type Props = {
  color?: string
}

export const CopyIcon = ({ color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect x="3" y="3" width="14" height="14" rx="3" fill="#05003B" />
      <rect
        x="7"
        y="1"
        width="12"
        height="12"
        rx="2"
        stroke="#05003B"
        strokeWidth="1.5"
      />
      <path
        d="M17 13H9C7.89543 13 7 12.1046 7 11V3"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  )
}
