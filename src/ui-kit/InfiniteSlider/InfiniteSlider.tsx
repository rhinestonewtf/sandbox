type Props = {
  items: React.ReactNode[]
}

export const InfiniteSlider = ({ items }: Props) => {
  return (
    <div className="relative m-auto overflow-hidden before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:content-['']">
      <div className="animate-infinite-slider flex w-[calc(500px*10)] hover:pause">
        {items.map((item, index) => (
          <div
            className="slide flex w-[250px] items-center justify-center"
            key={index}
          >
            {item}
          </div>
        ))}
        {items.map((item, index) => (
          <div
            className="slide flex w-[250px] items-center justify-center"
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
