import './index.less'

import { getIntl } from '@umijs/max'
import classNames from 'classnames'

import Iconfont from '@/components/Base/Iconfont'
import { cn } from '@/utils/cn'

import { formatNum } from '../..'

export type DataCardItem = {
  /**标题 */
  label: React.ReactNode
  /**值 */
  value: any
  onClick?: () => void
  /**描述 */
  desc?: React.ReactNode | string // 月
  descNum?: string
  subClick?: () => void
  mom?: number
  showMom?: boolean
}

export default ({ item }: { item: DataCardItem }) => {
  return (
    <div className={cn('flex h-full rounded-xl p-[1px] overflow-hidden hover-effect click-effect', item.onClick ? 'cursor-pointer ' : '')}>
      <div className="flex flex-col justify-between flex-1 flex-shrink overflow-hidden bg-white rounded-xl z-10 box-content">
        <div
          onClick={item.onClick}
          className={cn('px-2 pl-4 py-3 flex-grow', item.onClick ? 'hover:bg-gray-50 cursor-pointer click-effect-item' : '')}
        >
          <div className="flex flex-row justify-between items-start">
            <div className="text-gray text-sm ">{item.label}</div>
            {item.onClick && (
              <div className="go-to-detail">
                <Iconfont name="xiangqing" className="-mt-2" width={28} height={28} />
              </div>
            )}
          </div>
          <div
            title={item.value as string}
            className={cn('text-gray text-[24px] left-7 !font-dingpro-medium overflow-hidden text-ellipsis ')}
          >
            {item.value}
          </div>

          {item.showMom && (
            <div className="flex flex-row text-xs gap-1">
              <span className=" font-normal">{getIntl().formatMessage({ id: 'mt.yuehuanbi' })}</span>
              <span
                className={classNames(
                  'text-xs font-semibold flex flex-row items-center py-[1px] px-1.5 rounded-[9px] gap-1',
                  Number(item.mom) > 0 ? 'text-[#45a48a] bg-[#c8fff0]' : 'text-[#ff4518] bg-[#ffc2b6] '
                )}
              >
                <div
                  className={classNames(
                    'w-0 h-0 border-solid',
                    Number(item.mom) > 0
                      ? 'border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#45a48a]'
                      : 'border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[7px] border-t-[#ff4518]'
                  )}
                ></div>
                <span>{formatNum(Number(item.mom ?? 0), { precision: 2 })}%</span>
              </span>
            </div>
          )}
        </div>
        {item.showMom && item.desc && item.descNum && (
          <div
            className={cn(
              ' flex flex-row flex-shrink-0 flex-grow-0 !h-[28px] justify-between items-center pl-4 pr-2 py-1 border-t border-gray-130 rounded-b-xl text-nowrap text-ellipsis',
              item.subClick ? 'hover:bg-gray-50 cursor-pointer click-effect-item' : ''
            )}
            onClick={item.subClick}
          >
            <span className="text-xs text-secondary " title={item.descNum as string}>
              {item.desc}&nbsp;&nbsp;{item.descNum}
            </span>

            {item.subClick && (
              <div className="go-to-detail">
                <Iconfont name="xiangqing" width={28} height={20} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
