type Props = {
  color?: string
  isActive?: boolean
  size?: number
}

export const WMaticIcon = ({ size }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || '50'}
      height={size || '50'}
      viewBox="0 0 50 50"
      fill="none"
    >
      <rect x="1" y="1.00006" width="48" height="48" rx="24" fill="white" />
      <rect
        x="0.5"
        y="0.500061"
        width="49"
        height="49"
        rx="24.5"
        stroke="#05003B"
        strokeOpacity="0.02"
      />
      <path
        d="M10.1981 15.8957L25.2501 24.5829V30.3743L15.2154 24.5829V36.1657L10.1981 33.27V15.8957Z"
        fill="#2891F9"
      />
      <path
        d="M15.2155 36.1657V24.5829L20.2328 27.4786V33.27L15.2155 36.1657Z"
        fill="#2BBDF7"
      />
      <path
        d="M10.1981 15.8957L15.2154 13L30.2674 21.6872L25.2501 24.5829L10.1981 15.8957Z"
        fill="#2B6DEF"
      />
      <path
        d="M25.25 24.5828L30.2673 21.6871V27.4786L25.25 30.3743V24.5828Z"
        fill="#2BBDF7"
      />
      <path
        d="M30.2675 15.8957V33.27L35.2848 36.1657V18.7914L30.2675 15.8957Z"
        fill="#2891F9"
      />
      <path
        d="M40.302 15.8957L35.2847 18.7914V36.1657L40.302 33.27V15.8957Z"
        fill="#2BBDF7"
      />
      <path
        d="M35.2848 13L40.3021 15.8957L35.2848 18.7914L30.2675 15.8957L35.2848 13Z"
        fill="#2B6DEF"
      />
    </svg>
  )
}
