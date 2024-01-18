'use client'

import { Dropdown } from '@/src/ui-kit'

export const ActivityFilters = () => {
  return (
    <div className="flex gap-2">
      <Dropdown
        items={[
          { label: 'All time', value: 'all_time' },
          { label: 'Last month', value: 'last_month' },
        ]}
        selectedItem="all_time"
        onChange={() => {}}
        bordered
      />

      <Dropdown
        items={[
          { label: 'All actions', value: 'all_actions' },
          { label: 'Transfers', value: 'transfers' },
        ]}
        selectedItem="all_actions"
        onChange={() => {}}
        bordered
      />
    </div>
  )
}
