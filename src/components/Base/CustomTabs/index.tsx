import { useEffect, useState } from 'react'

import { useLang } from '@/context/languageProvider'
import { cn } from '@/utils/cn'

type IProps = {
  onChange?: (key: string) => void
  items: {
    key: string
    label: React.ReactNode
  }[]
  activeKey?: string
}

export default function Tabs({ onChange, items, activeKey }: IProps) {
  const [current, setCurrent] = useState('')
  const { lng } = useLang()
  const isZh = lng === 'zh-TW'

  useEffect(() => {
    setCurrent(activeKey || items[0]?.key)
  }, [activeKey, items])

  return (
    <div className="flex rounded-[26px] border-[0.5px] border-[#dadada] p-[1px]">
      {items.map((item, idx) => {
        const isActive = item.key === current
        return (
          <div
            className={cn(
              'cursor-pointer py-[6px] hover:text-gray',
              isActive ? 'rounded-[26px] bg-gray-120 text-gray' : 'text-[#9c9c9c]',
              isZh ? 'px-[26px]' : 'px-[7px]'
            )}
            onClick={() => {
              onChange?.(item.key)
              setCurrent(item.key)
            }}
            key={idx}
          >
            {item.label}
          </div>
        )
      })}
    </div>
  )
}
