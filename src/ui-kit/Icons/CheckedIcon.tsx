type Props = {
  bgColor?: string
  fillOpacity?: string
}

export const CheckedIcon = ({ fillOpacity, bgColor }: Props) => {
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
        fill={bgColor || '#4F41EF'}
        fillOpacity={fillOpacity || '0.16'}
      />
      <path
        d="M17.1016 9.28185L10.1917 16.1917L7 13"
        stroke="#4F41EF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
