import { CaretDownOutlined } from '@ant-design/icons'
import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import Dropdown from '@/components/Base/Dropdown'
import { gray } from '@/theme/theme.config'

export default function FilterSelect({ defaultValue = '14', onChange }: { defaultValue?: string; onChange?: (value: string) => void }) {
  const [activeKey, setActiveKey] = useState(defaultValue)

  const items = [
    { label: <FormattedMessage id="mt.jinyizhou" />, key: '7' },
    { label: <FormattedMessage id="mt.jinliangzhou" />, key: '14' },
    { label: <FormattedMessage id="mt.jinyigeyue" />, key: '30' }
  ]
  const selectInfo = items.find((item) => item.key === activeKey)

  return (
    <Dropdown
      menu={{
        onClick: ({ key }: any) => {
          setActiveKey(key)
          onChange?.(key)
        },
        activeKey,
        items
      }}
    >
      <div className="cursor-pointer flex items-center mt-2">
        <span className="text-xs text-primary select-none pr-1">{selectInfo?.label}</span>
        <CaretDownOutlined style={{ fontSize: 12, color: gray['600'] }} />
      </div>
    </Dropdown>
  )
}
