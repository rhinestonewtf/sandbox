type Props = {
  color?: string
  size?: number
}

export const SwapIcon = ({ color, size }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M17 10.5C17 6.91015 14.0899 4 10.5 4C8.50127 4 6.71325 4.90213 5.52089 6.32143M4 10.5C4 14.0899 6.91015 17 10.5 17C12.4987 17 14.2868 16.0979 15.4791 14.6786"
        stroke={color || '#4F41EF'}
        strokeWidth="1.2"
        strokeLinecap="square"
      />
      <path
        d="M14.6221 9.62537L16.9163 11.7667L19.0576 9.47246"
        stroke={color || '#4F41EF'}
      />
      <path
        d="M6.30005 11.6902L4.00584 9.54891L1.86454 11.8431"
        stroke={color || '#4F41EF'}
      />
    </svg>
  )
}
