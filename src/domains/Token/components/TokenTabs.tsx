import classNames from 'classnames'

type Tab = 'TOKENS' | 'NFTS'

const tabs: Tab[] = ['TOKENS', 'NFTS']

type Props = {
  activeTab: Tab
  tokensCount: number
  nftsCount: number
  onTabChange: (tab: Tab) => void
}

export const TokenTabs = ({
  activeTab,
  tokensCount,
  nftsCount,
  onTabChange,
}: Props) => {
  return (
    <div role="tablist" className="tabs tabs-boxed w-fit rounded-full">
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tab"
          className={classNames('tab', {
            'bg-slate-700 text-white': activeTab === tab,
          })}
          style={{ borderRadius: '30px' }}
          onClick={() => onTabChange(tab)}
        >
          {tab === 'TOKENS' ? tokensCount : nftsCount} {tab}
        </div>
      ))}
    </div>
  )
}
