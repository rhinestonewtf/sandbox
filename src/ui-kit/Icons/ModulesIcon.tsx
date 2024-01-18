type Props = {
  color?: string
  isActive: boolean
}

export const ModulesIcon = ({ color, isActive }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={isActive ? '' : '0.64'}>
        <rect
          x="6"
          y="0.342773"
          width="8"
          height="8"
          rx="2"
          transform="rotate(45 6 0.342773)"
          fill={color}
        />
        <rect x="2" y="14" width="8" height="8" rx="4" fill={color} />
        <rect x="14" y="2" width="8" height="8" rx="2" fill={color} />
      </g>
    </svg>
  )
}
