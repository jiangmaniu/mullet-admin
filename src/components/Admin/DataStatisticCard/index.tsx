import React from 'react'

import { cn } from '@/utils/cn'

type Item = {
  /**icon图标 */
  icon: React.ReactNode
  /**标题 */
  label: React.ReactNode
  /**描述 */
  desc?: React.ReactNode | string
  descNum?: string
  /**值 */
  value: any
  style?: React.CSSProperties
  className?: string
  containerClassName?: string
  onClick?: () => void
  subClick?: () => void
}
type IProps = {
  className?: string
  items: Item[]
}

export default function DataStatisticCard({ items, className }: IProps) {
  return (
    <div className={cn(`grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:grid-cols-6 items-center gap-x-3 gap-y-2`, className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn('flex h-full rounded-xl bg-white divide-x divide-gray-130  border border-gray-150', item.containerClassName)}
        >
          <div className="flex items-center justify-center px-4 py-3">
            {/* <Iconfont name={item.icon} width={32} height={32} /> */}
            {item.icon}
          </div>
          <div className="flex flex-col flex-1 px-2 py-1 flex-shrink overflow-hidden">
            <div onClick={item.onClick} className={cn('px-2 pt-2 rounded-lg ', item.onClick ? 'hover:bg-gray-50 cursor-pointer' : '')}>
              <div className="text-gray text-sm font-semibold">{item.label}</div>
              <div
                className={cn('text-gray text-[22px] !font-dingpro-medium overflow-hidden text-ellipsis ', item.className)}
                style={item.style}
              >
                {item.value}
              </div>
            </div>
            {item.desc && item.descNum && (
              <div
                className={cn(
                  'text-xs text-secondary px-2 pb-2 rounded-lg flex-grow',
                  item.subClick ? 'hover:bg-gray-50 cursor-pointer' : ''
                )}
                onClick={item.subClick}
              >
                {item.desc}
                &nbsp;&nbsp;
                {item.descNum}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
