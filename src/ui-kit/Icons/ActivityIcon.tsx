type Props = {
  color?: string
  isActive: boolean
}

export const ActivityIcon = ({ color, isActive }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={isActive ? '' : '0.64'}>
        <rect x="2" y="6" width="20" height="5" rx="1" fill={color} />
        <rect x="5" y="13" width="14" height="3" rx="1" fill={color} />
        <rect x="7" y="18" width="10" height="2" rx="1" fill={color} />
      </g>
    </svg>
  )
}
