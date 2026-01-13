import { ProCard, ProCardProps } from '@ant-design/pro-components'
import { isValidElement } from 'react'

import { useEnv } from '@/context/envProvider'
import { useLang } from '@/context/languageProvider'
import { colorTextPrimary } from '@/theme/theme.config'
import { formatNum } from '@/utils'

type Item = {
  value?: string | number | React.ReactNode
  label?: string | React.ReactNode
  icon?: string | React.ReactNode
  valueColor?: string
  iconWidth?: number
  iconHeight?: number
  noFormatValue?: boolean
  renderItem?: (item: Item) => React.ReactNode
  /**value样式 */
  valueStyle?: React.CSSProperties
  /**label样式 */
  labeStyle?: React.CSSProperties
  /** 獨立配置 item 容器樣式 */
  className?: string
  /**是否显示加号 */
  showAddSymbol?: boolean
}
interface IProps {
  showCardBg?: boolean
  style?: React.CSSProperties
  /**@name 子卡片高度 */
  height?: number | string
  items: Item[]
  direction?: 'column' | 'row' | undefined
  /**@name 外层卡片属性 */
  cardProps?: ProCardProps
  /**@name 子卡片属性 */
  subCardProps?: ProCardProps
  /**@name 是否需要格式化value值为统一小数点 */
  needFormatValue?: boolean
  /**value样式 */
  valueStyle?: React.CSSProperties
  /**label样式 */
  labeStyle?: React.CSSProperties
  /**小数位 */
  precision?: number
}
export default function StatisticCard({
  showCardBg,
  style = {},
  cardProps,
  subCardProps = {},
  height = 60,
  items = [],
  needFormatValue = false,
  labeStyle,
  valueStyle,
  precision = 2
}: IProps) {
  const { isMobile, isMobileOrIpad } = useEnv()
  const { lng } = useLang()
  const proCardStyle = {} as React.CSSProperties
  if (showCardBg) {
    proCardStyle.background = 'linear-gradient(270deg, #FFFFFF 60%, #F0FFE9 100%)'
  }
  const labelFontSize = isMobile ? 12 : 14
  const valueFontSize = isMobile ? 15 : 16
  const lineHeight = lng === 'zh-TW' ? '20px' : '15px'
  const renderItem = (item: Item) => {
    return (
      <>
        <span
          className="text-primary text-base pb-[4px] !font-dingpro-medium font-medium"
          style={{
            color: Number(item.value) ? item.valueColor || colorTextPrimary : colorTextPrimary,
            fontSize: valueFontSize,
            lineHeight,
            ...valueStyle,
            ...item.valueStyle
          }}
        >
          {item.showAddSymbol && item.value && Number(item.value) > 0 ? '+' : ''}
          {needFormatValue && !item.noFormatValue ? formatNum(item.value, { precision }) : item.value || 0}
        </span>
        <span className="text-secondary" style={{ fontSize: labelFontSize, lineHeight, ...labeStyle }}>
          {item.label}
        </span>
      </>
    )
  }
  const renderProCardItem = (item: Item) => {
    return (
      <div
        className={`flex flex-col items-center text-center ${subCardProps.className} ${item.className}`}
        style={{ flexDirection: subCardProps.direction }}
      >
        {item.icon ? (
          <>
            <div>
              {isValidElement(item.icon) ? (
                item.icon
              ) : (
                <img src={item.icon as string} style={{ width: item.iconWidth || 46, height: item.iconHeight || 46 }} />
              )}
            </div>
            <div className="flex flex-col items-center text-center">{renderItem(item)}</div>
          </>
        ) : (
          renderItem(item)
        )}
      </div>
    )
  }
  return (
    <ProCard ghost bordered style={{ ...style, ...proCardStyle }} bodyStyle={{ overflowX: 'auto', overflowY: 'hidden' }} {...cardProps}>
      {items.map((item: Item, index) => {
        return (
          <ProCard
            direction={item.icon ? 'row' : 'column'}
            className={index !== items.length - 1 && items.length > 1 && !isMobile ? 'proCardDivider' : ''}
            key={index}
            style={{ background: 'transparent', height: isMobileOrIpad && lng !== 'zh-TW' ? 'auto' : height }}
            layout="center"
            {...subCardProps}
          >
            {item.renderItem ? (item as any).renderItem?.(item) : renderProCardItem(item)}
          </ProCard>
        )
      })}
    </ProCard>
  )
}
