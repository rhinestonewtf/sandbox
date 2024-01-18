import Link from 'next/link'
import { LogoIcon } from '@/src/ui-kit'

export const Logo = () => {
  return (
    <Link href="/">
      <LogoIcon />
    </Link>
  )
}
