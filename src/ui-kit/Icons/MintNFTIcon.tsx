type Props = {
  color?: string
  size?: number
}

export const MintNFTIcon = ({ color, size }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || '20'}
      height={size || '20'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect x="2" y="2" width="16" height="16" rx="3" fill="#05003B" />
      <path
        d="M7.52752 7C7.30448 7 7.09057 7.07159 6.93286 7.19902L5.74632 8.15771C5.44292 8.40286 5.41658 8.79325 5.68521 9.06359L9.34423 12.7459C9.68087 13.0847 10.3191 13.0847 10.6558 12.7459L14.3148 9.06359C14.5834 8.79325 14.5571 8.40286 14.2537 8.15771L13.0671 7.19902C12.9094 7.07159 12.6955 7 12.4725 7H7.52752Z"
        fill="white"
      />
    </svg>
  )
}
