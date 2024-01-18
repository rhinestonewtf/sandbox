import Image from 'next/image'
import { UserOperation } from 'permissionless'
import { BsFillCircleFill } from 'react-icons/bs'
import { LargeButton, Layout, SideHeader } from '@/src/ui-kit'
import { UserOpStepper } from '@/src/domains/UserOperation/components'

type Props = {
  userOp: UserOperation
  title?: string
  subTitle?: string
  icon?: React.ReactNode
  onFinishClick: () => void
}

export const UserOpStatusView = ({
  title,
  subTitle,
  userOp,
  icon,
  onFinishClick,
}: Props) => {
  return (
    <Layout>
      <Layout.Content>
        <div className="mt-[205px] justify-center items-center">
          {icon || <Image width={96} height={96} alt="" src="/icon.svg" />}
        </div>

        <div className="mt-6" />

        <SideHeader
          title={title || 'Transaction is being processed'}
          subTitle={subTitle || ''}
        />

        <div className="mt-12" />

        <UserOpStepper userOp={userOp} />
      </Layout.Content>
      <Layout.Footer>
        <LargeButton
          className="bg-primary hover:bg-primary border-none disabled:bg-indigo-600 disabled:bg-opacity-20 disabled:text-red-600"
          contentClassName="font-normal !text-primary-content"
          onClick={onFinishClick}
        >
          Complete
        </LargeButton>
      </Layout.Footer>
    </Layout>
  )
}
