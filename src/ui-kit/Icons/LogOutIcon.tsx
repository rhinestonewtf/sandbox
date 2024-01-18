type Props = {
  color?: string
}

export const LogOutIcon = ({ color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_500_4459)">
        <rect x="2" y="4" width="11" height="12" rx="3" fill="#05003B" />
        <line x1="8" y1="10" x2="13" y2="10" stroke="white" strokeWidth="1.5" />
        <path
          d="M13 10L19 10M19 10L16 7M19 10L16 13"
          stroke="#05003B"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_500_4459">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
