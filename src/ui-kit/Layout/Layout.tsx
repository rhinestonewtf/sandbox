import classNames from 'classnames'
import { PropsWithChildren } from 'react'

export const Layout = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col h-full items-center">{children}</div>
}

const Actions = ({ children }: PropsWithChildren) => {
  return <div className="w-full">{children}</div>
}

const Header = ({
  children,
  variant,
}: PropsWithChildren & { variant?: 'main' }) => {
  return (
    <div
      className={classNames('justify-center items-center mt-6', {
        'w-full': variant === 'main',
      })}
    >
      {children}
    </div>
  )
}

const Content = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col flex-1 w-full overflow-scroll items-center">
      {children}
    </div>
  )
}

const Footer = ({ children }: PropsWithChildren) => {
  return <div className="flex pb-12 pt-2 items-center">{children}</div>
}

Layout.Actions = Actions
Layout.Header = Header
Layout.Content = Content
Layout.Footer = Footer
