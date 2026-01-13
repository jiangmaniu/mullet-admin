import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Col, Row, Tooltip } from 'antd'
import { observer } from 'mobx-react'
import { useTransition } from 'react'

import SymbolIcon from '@/components/Base/SymbolIcon'
import { useEnv } from '@/context/envProvider'
import { useStores } from '@/context/mobxProvider'
import { formatNum } from '@/utils'
import { cn } from '@/utils/cn'
import mitt from '@/utils/mitt'
import { getCurrentQuote } from '@/utils/wsUtil'

type IProps = {
  item: Account.TradeSymbolListItem
  isActive?: boolean
  popupRef?: any
}
/**
 * 行情list item
 * @returns
 */
function QuoteItem({ item, isActive, popupRef }: IProps) {
  const [isPending, startTransition] = useTransition() // 切换内容，不阻塞渲染，提高整体响应性
  const { isMobileOrIpad } = useEnv()
  const { trade, ws } = useStores()
  const symbol = item.symbol
  const res = getCurrentQuote(symbol)
  const bid = res.bid // 卖价
  const per: any = res.percent

  const activeClassName = useEmotionCss(({ token }) => {
    return {
      '&:after': {
        position: 'absolute',
        left: 0,
        width: 4,
        height: 19,
        background: '#000000',
        borderRadius: '0px 4px 4px 0px',
        content: '""'
      }
    }
  })

  return (
    <>
      <div
        className="relative"
        onClick={() => {
          startTransition(() => {
            // 记录打开的symbol
            trade.setOpenSymbolNameList(symbol)
            // 设置当前当前的symbol
            trade.setActiveSymbolName(symbol)

            // 切换品种事件
            mitt.emit('symbol_change')

            if (isMobileOrIpad) {
              popupRef.current?.close()
            }
          })
        }}
      >
        {/*激活打开的项展示当前的箭头 */}
        {/* {isActive && <CaretRightOutlined className="absolute -left-1 top-4" />} */}
        <Row
          className={cn('flex cursor-pointer pr-4 items-center rounded px-3 py-[10px] hover:bg-[var(--hover-primary-bg)] relative', {
            'bg-[var(--hover-primary-bg)]': isActive,
            [activeClassName]: isActive
          })}
        >
          <Col span={12} className="!flex items-center">
            {/* <img
              width={24}
              height={24}
              alt=""
              src={`/img/${trade.favoriteList.some((item) => item.symbol === symbol) ? 'star-active' : 'star'}.png`}
              onClick={(e) => {
                e.stopPropagation()
                trade.toggleSymbolFavorite(symbol)
              }}
            /> */}
            <SymbolIcon src={item?.imgUrl} width={28} height={28} />
            <Tooltip placement="bottom" title={item.remark}>
              <div className="flex flex-col pl-1">
                {/* 品种别名 */}
                <span className="pl-[6px] text-sm font-pf-bold text-primary tracking-[0.5px]">{item.alias}</span>
                <span className="pl-[6px] text-xs text-weak truncate max-w-[120px]">{item.remark || '‑‑'}</span>
              </div>
            </Tooltip>
          </Col>
          <Col span={12} className="flex flex-col items-end">
            <div className="!font-dingpro-medium text-sx text-primary text-right">{res.hasQuote ? formatNum(bid) : '‑‑'}</div>
            {res.hasQuote && (
              <div className={cn('text-right !font-dingpro-medium text-xs', per > 0 ? 'text-green' : 'text-red')}>
                {bid ? (per > 0 ? `+${per}%` : `${per}%`) : '‑‑'}
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default observer(QuoteItem)
