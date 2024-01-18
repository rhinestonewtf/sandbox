import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  className?: string
  isLoading?: boolean
  disabled?: boolean
  onClick?: () => void
}
export const Button = ({
  children,
  className = 'btn-outline',
  isLoading,
  disabled,
  onClick,
}: Props) => {
  return (
    <button
      className={classNames('btn rounded-full', {
        [className]: !!className,
      })}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <span className="loading loading-dots loading-md text-white"></span>
      ) : (
        children
      )}
    </button>
  )
}
