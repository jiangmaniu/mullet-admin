import { FormattedMessage } from '@umijs/max'
import { useState } from 'react'

import DrawerForm from '@/components/Admin/DrawerForm'
import FlexCard from '@/components/Admin/FlexCard'
import Button from '@/components/Base/Button'
import { getEnum } from '@/constants/enum'
import { green, red } from '@/theme/theme.config'
import { formatNum, formatTime } from '@/utils'
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

export default function DrawerInfo({ trigger, type, info, symbol }: IProps) {
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
  const positionId = info.row_type === 'position' ? info.id : info.bagOrderId

  return (
    <DrawerForm
      trigger={trigger}
      hiddenSubmitter
      tabList={tabList}
      width={700}
      tabHeaderContainerClassNames="!px-0"
      renderTabHeaderExtra={() => {
        return (
          <div className=" flex flex-col">
            {/* // 订单号：该笔订单号码（单号），可点击跳转到对应订单详情 */}
            <div className="flex items-center justify-between  gap-10 pb-4  w-[640px] m-auto">
              {/* 持仓单号：该笔成交持仓单号（号码）；点击可跳转到持仓单号详情 */}
              <span className="text-primary text-lg font-pf-bold cursor-pointer hover:text-primary">
                {/* 委托单、成交单 持仓是bagOrderId  */}
                <FormattedMessage id="mt.daidanzheshuju" /> {positionId}
              </span>
              <Button
                type="text"
                onClick={() => {
                  const orderId = info.row_type === 'close' ? info.orderId : info.id
                  push(`/copy-trading/take/view/${orderId}`)
                }}
                className=" text-primary font-pf-medium text-lg"
              >
                <FormattedMessage id="mt.chakan" />
              </Button>
            </div>
            <FlexCard
              subCardProps={{
                colSpan: 6,
                ghost: true,
                className: 'w-36'
              }}
              cardProps={{
                wrap: true,
                style: {
                  width: 640,
                  margin: 'auto'
                }
              }}
              items={[
                { label: <FormattedMessage id="mt.daidanrenzhanghu" />, value: '2323', className: '!items-start proCardDivider' },
                { label: <FormattedMessage id="mt.dingdanhao" />, value: 'X1011122', className: 'proCardDivider' },
                {
                  label: <FormattedMessage id="mt.fangxiang" />,
                  value: 'BUY',
                  className: 'proCardDivider',
                  valueStyle: { color: true ? red['700'] : green['700'] }
                },
                { label: <FormattedMessage id="mt.shoushu" />, value: '0.3', className: '!items-end' },

                { label: <FormattedMessage id="mt.kaicangjunjia" />, value: '11111', className: '!items-start proCardDivider' },
                {
                  label: <FormattedMessage id="mt.daidanyingli" />,
                  value: '223',
                  valueStyle: { color: true ? green['700'] : red['700'] }
                }
              ]}
              labeStyle={{ fontSize: 12 }}
              height={72}
            />
            <div className=" w-full bg-gray-185 h-[1px] mt-6 mb-4"></div>
            <div className="flex justify-between text-primary w-[640px] m-auto mb-4 ">
              <div className="flex gap-2.5 items-center font-pf-bold text-base ">
                <FormattedMessage id="mt.chengjiaodanhao" />
                <span>1212121</span>
              </div>
              <div className="flex gap-2.5 items-center font-pf-bold text-base ">
                <FormattedMessage id="mt.chicangdanhao" />
                <span>1212121</span>
              </div>
              <div className="flex gap-2.5 items-center font-pf-bold text-base ">
                <FormattedMessage id="mt.dingdanhao" />
                <span>1212121</span>
              </div>
            </div>
          </div>
        )
      }}
      tabActiveKey={activeKey}
      onChangeTab={(tabActiveKey) => {
        setActiveKey(tabActiveKey)
      }}
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
                {formatNum(info.tradingVolume, { precision: 2 })}
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
              <span className="text-primary-secondary text-sm">
                <FormattedMessage id="mt.qingqiushijian" />：
              </span>
              <span className="text-primary text-sm font-semibold">{formatTime(info.createTime)}</span>
            </div>
            {/* 成交单没有修改时间 */}
            {info.row_type !== 'close' && (
              <div className="flex items-center pt-2">
                <span className="text-primary-secondary text-sm">
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
