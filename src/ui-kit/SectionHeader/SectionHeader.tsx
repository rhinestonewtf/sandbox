import Link from 'next/link'

type Props = {
  title: string
  href?: string
}

export const SectionHeader = ({ title, href }: Props) => {
  return (
    <div className="flex">
      <p className="flex-1 text-gray-500 text-xs font-medium uppercase font-mono">
        {title}
      </p>
      {href && (
        <Link href={href} className="underline font-mono text-xs">
          SEE ALL
        </Link>
      )}
    </div>
  )
}
