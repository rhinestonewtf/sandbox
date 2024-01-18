type Props = {
  bgColor?: string
  fillColor?: string
}

export const AllIcon = ({ fillColor, bgColor }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="13.8461"
        y="4"
        width="6.15385"
        height="6.15385"
        rx="3.07692"
        fill={fillColor || '#9896ae'}
      />
      <rect
        x="13.8461"
        y="13.8459"
        width="6.15385"
        height="6.15385"
        rx="3.07692"
        fill={fillColor || '#9896ae'}
      />
      <rect
        x="4"
        y="4"
        width="6.15385"
        height="6.15385"
        rx="3.07692"
        fill={fillColor || '#9896ae'}
      />
      <rect
        x="4"
        y="13.8459"
        width="6.15385"
        height="6.15385"
        rx="3.07692"
        fill={fillColor || '#9896ae'}
      />
    </svg>
  )
}
