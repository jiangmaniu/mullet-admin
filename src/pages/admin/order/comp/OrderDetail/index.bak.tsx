import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { getEnum } from '@/constants/enum'
import { useStores } from '@/context/mobxProvider'
import { getOrderAllDetail, getOrderDetail } from '@/services/api/tradeCore/order'
import { formatNum } from '@/utils'
import { removeEmptyChildren } from '@/utils/tree'

import OrderDrawer from '../OrderDrawer'
import { getColumns } from './tableConfig'

type Params = API.PageParams

type IProps = {
  /**订单类型：订单管理、持仓单、成交单 */
  type: 'order' | 'position' | 'close'
}

/**订单详情：订单列表、持仓单、成交单 */
function Detail({ type }: IProps) {
  const params = useParams()
  const id = params.id
  const { run: queryOrderDetail, data: orderData } = useRequest(getOrderDetail, { manual: true })
  const { run, loading, data } = useRequest(getOrderAllDetail, { manual: true })
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([])
  const { ws } = useStores()

  const isOrderDetail = type === 'order' // 委托订单详情
  const allDetail = data?.data
  const ordersInfo = allDetail?.ordersInfo || []
  const info = isOrderDetail ? orderData?.data : allDetail
  const dataSource = isOrderDetail
    ? [
        {
          ...(orderData?.data || {}),
          row_key: orderData?.data?.id,
          direction: getEnum().Enum.TradeBuySell[orderData?.data?.buySell as string]?.text,
          tradingVolume: `${orderData?.data?.tradingVolume}/${orderData?.data?.orderVolume}`, // 委托单订单详情的交易量展示为：实际交易手数/下单手数
          price: orderData?.data?.limitPrice ? (
            formatNum(orderData?.data.limitPrice, { precision: 2 })
          ) : (
            <FormattedMessage id="mt.shijia" />
          ), // 委托单：请求价
          row_type: 'order' // 弹窗类型标识
        }
      ]
    : [
        // 三层结构：持仓单、委托单、成交单
        {
          // 第一层：持仓单
          ...info,
          row_key: `${info?.id}_${info?.tradeAccountId}`, // id可能不是唯一的，使用row_key自定义id
          tradePrice: info?.closePrice,
          // 第一层、第三层 createReason也没有字段
          tradingVolume: info?.orderVolume, // 统一三层的字段一致
          row_type: 'position', // 弹窗类型标识
          direction: getEnum().Enum.TradeBuySell[info?.buySell as string]?.text, // 交易方向
          price: formatNum(info?.startPrice, { precision: 2 }), // 持仓单：开仓均价
          // 第二层：委托单
          children: ordersInfo.map((item) => {
            return {
              ...item,
              row_key: item.id,
              row_type: 'order', // 弹窗类型标识
              direction: getEnum().Enum.TradeBuySell[item.buySell as string]?.text, // 交易方向
              price: item.limitPrice ? formatNum(item.limitPrice, { precision: 2 }) : <FormattedMessage id="mt.shijia" />, // 委托单：请求价
              // 第三层：成交单
              children: (item.tradeRecordsInfo || []).map((v) => {
                return {
                  ...v,
                  direction: getEnum().Enum.OrderInOut[v.inOut as string]?.text, // 交易方向
                  price: formatNum(v.inOut === 'IN' ? v.startPrice : v.tradePrice, { precision: 2 }), // 成交单：成交价
                  row_type: 'close', // 弹窗类型标识
                  row_key: v.id
                }
              })
            }
          })
        }
      ]

  useEffect(() => {
    if (id) {
      // setExpandedRowKeys([id])
      if (isOrderDetail) {
        // 订单详情
        queryOrderDetail({ id })
      } else {
        // 持仓单/成交记录详情
        run({ id })
      }
    }
  }, [id])

  useEffect(() => {
    // 展开
    if (dataSource.length) {
      setExpandedRowKeys([dataSource[0]?.row_key])
    }
  }, [info])

  return (
    <PageContainer
      showBack
      icon="/img/emoji/2.png"
      pageTitle={
        <div className="flex items-center">
          <span className="text-xl text-gray">{info?.symbol}</span>
          <span className="text-xs text-secondary pl-6">
            <FormattedMessage id="mt.dingdan" />：{id}
          </span>
        </div>
      }
      pageBgColorMode="gray"
    >
      <ProCard>
        <div className="pb-3">
          <div className="flex items-center">
            <div>
              {/* 组名 */}
              <span className="text-primary text-lg font-semibold pr-3">{info?.accountDetail?.name}</span>
            </div>
          </div>
          <div className="text-primary text-sm pt-2">
            {info?.accountDetail?.groupCode}
            <span className="pl-3">#{info?.tradeAccountId}</span>
          </div>
        </div>
        <StandardTable
          rowKey="row_key"
          // @ts-ignore
          columns={getColumns()}
          hideSearch
          showExpandRowStyle
          showOptionColumn
          loading={loading}
          // stripe={false}
          cardProps={{ ghost: true }}
          expandable={{
            expandedRowKeys: expandedRowKeys,
            onExpandedRowsChange: (expandedKeys) => {
              console.log('expandedKeys', expandedKeys)
              setExpandedRowKeys(expandedKeys)
            }
          }}
          renderOptionColumn={(record) => {
            return (
              <>
                <OrderDrawer
                  trigger={
                    <a
                      className="!text-primary font-medium text-sm cursor-pointer z-[18] relative"
                      onClick={() => {
                        // 按需订阅品种行情
                        if (info?.symbol) {
                          ws.batchSubscribeSymbol({
                            list: [{ dataSourceCode: info?.dataSourceCode, symbol: info?.symbol }]
                          })
                        }
                      }}
                    >
                      <FormattedMessage id="common.chakan" />
                    </a>
                  }
                  type={type}
                  // @ts-ignore
                  info={record}
                  symbol={info?.symbol || record?.symbol}
                />
              </>
            )
          }}
          // ghost
          // @ts-ignore
          dataSource={removeEmptyChildren(dataSource)}
        />
      </ProCard>
    </PageContainer>
  )
}

export default observer(Detail)
