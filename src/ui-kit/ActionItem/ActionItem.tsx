import { BsChevronCompactRight } from 'react-icons/bs'
type Props = {
  title: string
  onClick: () => void
}

export const ActionItem = ({ title, onClick }: Props) => (
  <div className="btn btn-outline w-full rounded-lg flex">
    <div className="flex-1" onClick={onClick}>
      <div>
        <p>{title}</p>
      </div>
    </div>
    <div>
      <BsChevronCompactRight />
    </div>
  </div>
)
