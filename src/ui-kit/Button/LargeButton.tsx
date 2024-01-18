type Props = {
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
  contentClassName?: string
  disabled?: boolean
  isLoading?: boolean
  onClick: () => void
}

export const LargeButton = ({
  children,
  icon,
  className,
  contentClassName,
  disabled,
  isLoading,
  onClick,
}: Props) => {
  return (
    <button
      className={`login-btn ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      <div className={`login-btn-text ${contentClassName}`}>{children}</div>
      <div className="absolute left-[12px]">{icon}</div>
    </button>
  )
}
