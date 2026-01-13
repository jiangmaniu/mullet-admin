import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import DrawerForm from '@/components/Admin/DrawerForm'
import { getEnum } from '@/constants/enum'
import { formatTime, hiddenCenterPartStr } from '@/utils'
import { push } from '@/utils/navigator'

import CloseQuotePrice from './CloseQuotePrice'
import CloseStatisticCard from './statisticCard/CloseStatisticCard'
import OrderListStatisticCard from './statisticCard/OrderListStatisticCard'
import PositionStatisticCard from './statisticCard/PositionStatisticCard'

/**订单类型：订单(委托单)管理、持仓单、成交单 */
type Type = 'order' | 'position' | 'close'
export type OrderInfo = Partial<Order.OrderDetailListItem & Order.TradeRecordsPageListItem & Order.OrderPageListItem & { row_type?: Type }>
type IProps = {
  trigger: JSX.Element
  type: Type
  info: OrderInfo
  symbol?: string
}

export default ({ trigger, type, info, symbol }: IProps) => {
  const tabList = [
    {
      label: <FormattedMessage id="mt.xiangxiziliao" />,
      key: 'Detail',
      icon: 'xiangxiziliao1'
    }
  ].concat(
    info.row_type === 'close'
      ? {
          label: <FormattedMessage id="mt.chengjiaobaojia" />,
          key: 'QuotePrice',
          icon: 'chengjiaobaojia1'
        }
      : []
  )
  const [activeKey, setActiveKey] = useState(tabList[0]?.key)

  // 持仓单号: 委托单、成交单 持仓是bagOrderId
  const positionIds =
    info.row_type === 'position'
      ? [info.id]
      : info?.bagOrderIds
      ? (info?.bagOrderIds || '').split(',').filter((v) => v)
      : [info?.bagOrderId].filter((v) => v)

  return (
    <DrawerForm
      trigger={trigger}
      hiddenSubmitter
      tabList={tabList}
      width={750}
      renderTabHeaderExtra={() => {
        return (
          // 订单号：该笔订单号码（单号），可点击跳转到对应订单详情
          <div className="flex items-center gap-x-10 gap-y-3 flex-wrap pb-4">
            {/* 委托单、成交单 */}
            {info.row_type !== 'position' && (
              <span
                className="text-primary hover:cursor-pointer hover:text-blue text-base font-semibold"
                onClick={() => {
                  const orderId = info.row_type === 'close' ? info.orderId : info.id
                  // 订单列表
                  push(`/order/list?orderId=${orderId}`)
                }}
              >
                <FormattedMessage id="mt.dingdanhao" /> {info.row_type === 'close' ? info.orderId : info.id}
              </span>
            )}
            {info.row_type === 'close' && (
              <span
                className="text-primary text-base font-semibold hover:cursor-pointer hover:text-blue"
                onClick={() => {
                  // 成交单列表
                  push(`/order/close?tradeRecordsId=${info.id}`)
                }}
              >
                <FormattedMessage id="mt.chengjiaodanhao" /> {info.id}
              </span>
            )}
            {/* 持仓单号：该笔成交持仓单号（号码）；点击可跳转到持仓单号详情 */}
            <span className="text-primary text-base font-semibold">
              {/* 委托单、成交单 持仓是bagOrderId  */}
              <FormattedMessage id="mt.chicangdanhao" />
              {positionIds.map((item, idx) => (
                <span
                  className="text-primary text-base font-semibold ml-3 hover:cursor-pointer hover:text-blue"
                  onClick={() => {
                    // 持仓单列表
                    push(`/order/position?bagOrderId=${item}`)
                  }}
                  key={idx}
                >
                  {positionIds.length > 2 ? hiddenCenterPartStr(item, 4) : item}
                </span>
              ))}
            </span>
          </div>
        )
      }}
      tabActiveKey={activeKey}
      onChangeTab={(tabActiveKey) => {
        setActiveKey(tabActiveKey)
      }}
      title={<FormattedMessage id="mt.xiangqing" />}
      onFinish={async (values) => {
        // 不返回不会关闭弹框
        return true
      }}
    >
      {activeKey === 'Detail' && (
        <div>
          <div className="flex items-center">
            <span className="text-xl text-primary font-semibold pr-5">
              {/* 成交单只有IN Out 没有买卖 */}
              {info.row_type === 'close' ? getEnum().Enum.OrderInOut[info.inOut!]?.text : getEnum().Enum.TradeBuySell[info.buySell!]?.text}
            </span>
            <div className="flex items-center">
              <span className="text-sm text-primary bg-gray-180 px-2 rounded-md py-[3px] font-semibold">{symbol}</span>
              {/* 交易量 */}
              <span className="text-sm text-primary border-gray-150 rounded-md px-3 border py-[3px] font-semibold ml-[5px]">
                {info.tradingVolume}
              </span>
              {info.leverageMultiple && (
                <span className="text-sm text-primary border-gray-150 rounded-md px-3 border py-[3px] font-semibold ml-[5px]">
                  {info.leverageMultiple}X
                </span>
              )}
            </div>
          </div>
          <div className="my-6">
            <div className="flex items-center">
              <span className="text-secondary text-sm">
                <FormattedMessage id="mt.qingqiushijian" />：
              </span>
              <span className="text-primary text-sm font-semibold">{formatTime(info.createTime)}</span>
            </div>
            {/* 成交单没有修改时间 */}
            {info.row_type !== 'close' && (
              <div className="flex items-center pt-2">
                <span className="text-secondary text-sm">
                  <FormattedMessage id="mt.xiugaishijian" />：
                </span>
                <span className="text-primary text-sm font-semibold">{formatTime(info.updateTime)}</span>
              </div>
            )}
          </div>
          {info.row_type === 'order' && <OrderListStatisticCard info={info} />}
          {info.row_type === 'position' && <PositionStatisticCard info={info} />}
          {info.row_type === 'close' && <CloseStatisticCard info={info} />}
        </div>
      )}
      {/* 成交单才展示成交报价 */}
      {activeKey === 'QuotePrice' && (
        <div>
          <CloseQuotePrice info={info} />
        </div>
      )}
    </DrawerForm>
  )
}
