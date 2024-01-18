type Props = {
  color?: string
}

export const ArrowRightIcon = ({ color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="24"
        width="24"
        height="24"
        rx="12"
        transform="rotate(90 24 0)"
        fill="#05003B"
        fillOpacity="0.08"
      />
      <path
        d="M10 17L15 12L10 7"
        stroke="#05003B"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
