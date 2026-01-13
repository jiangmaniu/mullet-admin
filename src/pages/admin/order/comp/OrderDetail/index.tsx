import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
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

export const transferTableData = (info: Order.OrderDetailListItem | undefined) => {
  return {
    // 第一层：持仓单
    ...info,
    row_key: `${info?.id}_${info?.tradeAccountId}`, // id可能不是唯一的，使用row_key自定义id
    tradePrice: info?.closePrice,
    // 第一层、第三层 createReason也没有字段
    tradingVolume: info?.orderVolume, // 统一三层的字段一致
    row_type: 'position', // 弹窗类型标识
    direction: getEnum().Enum.TradeBuySell[info?.buySell as string]?.text, // 交易方向
    price: formatNum(info?.startPrice), // 持仓单：开仓均价
    accountDetail: {
      userAccount: info?.userAccount,
      // @ts-ignore
      clientId: info?.userId,
      ...info?.accountDetail
    },
    // 第二层：委托单
    children: (info?.ordersInfo || []).map((item) => {
      return {
        ...item,
        // 持仓单的accountDetail 20241114
        accountDetail: info?.accountDetail,
        row_key: item.id,
        row_type: 'order', // 弹窗类型标识
        direction: getEnum().Enum.TradeBuySell[item.buySell as string]?.text, // 交易方向
        price: item.limitPrice ? formatNum(item.limitPrice, { isTruncateDecimal: false }) : <FormattedMessage id="mt.shijia" />, // 委托单：请求价
        tradingVolume: item.orderVolume,
        layers: 2,
        // 第三层：成交单
        children: (item.tradeRecordsInfo || []).map((v) => {
          return {
            ...v,
            // 持仓单的accountDetail 20241114
            accountDetail: info?.accountDetail,
            direction: getEnum().Enum.OrderInOut[v.inOut as string]?.text, // 交易方向
            price: formatNum(v.inOut === 'IN' ? v.startPrice : v.tradePrice, { isTruncateDecimal: false }), // 成交单：成交价
            row_type: 'close', // 弹窗类型标识
            row_key: v.id,
            layers: 3
          }
        })
      }
    })
  }
}

/**订单详情：订单列表、持仓单、成交单 */
function Detail({ type }: IProps) {
  const params = useParams()
  const id = params.id
  const { run: queryOrderDetail, data: orderData } = useRequest(getOrderDetail, { manual: true })
  const { run, loading, data } = useRequest(getOrderAllDetail, { manual: true })
  const [pageLoading, setPageLoading] = useState(false)
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([])
  const { ws } = useStores()
  const [orderDataSource, setOrderDataSource] = useState<any>([]) // 委托单数据

  const isOrderDetail = type === 'order' // 委托订单详情
  const allDetail = data?.data
  const ordersInfo = allDetail?.ordersInfo || []
  const info = isOrderDetail ? orderData?.data : allDetail

  const dataSource = isOrderDetail
    ? // [
      //     {
      //       ...(orderData?.data || {}),
      //       row_key: orderData?.data?.id,
      //       direction: getEnum().Enum.TradeBuySell[orderData?.data?.buySell as string]?.text,
      //       tradingVolume: `${orderData?.data?.tradingVolume}/${orderData?.data?.orderVolume}`, // 委托单订单详情的交易量展示为：实际交易手数/下单手数
      //       price: orderData?.data?.limitPrice ? (
      //         formatNum(orderData?.data.limitPrice, { precision: 2 })
      //       ) : (
      //         <FormattedMessage id="mt.shijia" />
      //       ), // 委托单：请求价
      //       row_type: 'order' // 弹窗类型标识
      //     }
      //   ]
      orderDataSource
    : [
        // 三层结构：持仓单、委托单、成交单
        transferTableData(info)
      ]

  // 订单详情，根据bagOrderIds拆解依次获取订单详情
  const getOrderDetailForDataSource = async () => {
    const result: any = []
    const bagIds = (id || '').split(',') // 委托单id可能有多个，处理传递多个的情况
    for (let bagId of bagIds) {
      const res = await getOrderAllDetail({ id: bagId })
      const data = res?.data
      result.push(transferTableData(data))
    }
    console.log('result', result)
    setOrderDataSource(result)
    setPageLoading(false)
  }

  useEffect(() => {
    if (id) {
      // setExpandedRowKeys([id])
      if (isOrderDetail) {
        // queryOrderDetail({ id })
        setPageLoading(true)
        getOrderDetailForDataSource()
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

  const orderDataSourceItem = orderDataSource[0] // 订单详情 有多条获取第一条

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
      <Spin spinning={loading || pageLoading}>
        <ProCard>
          <div className="pb-3">
            <div className="flex items-center">
              <div>
                {/* 组名 */}
                <span className="text-primary text-lg font-semibold pr-3">
                  {info?.accountDetail?.name || orderDataSourceItem?.accountDetail?.name}
                </span>
              </div>
            </div>
            <div className="text-primary text-sm pt-2">
              {info?.accountDetail?.groupCode || orderDataSourceItem?.accountDetail?.groupCode}
              <span className="pl-3">#{info?.tradeAccountId || orderDataSourceItem?.tradeAccountId}</span>
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
              // expandRowByClick: true,
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
      </Spin>
    </PageContainer>
  )
}

export default observer(Detail)
