type Props = {
  color?: string
  isActive: boolean
}

export const DashboardIcon = ({ color, isActive }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={isActive ? '' : '0.64'}>
        <rect x="2" y="4" width="20" height="16" rx="4" fill={color} />
        <rect x="5" y="7" width="12" height="2" rx="1" fill="white" />
      </g>
    </svg>
  )
}
