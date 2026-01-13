import { FormattedMessage, useParams } from '@umijs/max'

import StandardTable from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { getEnum } from '@/constants/enum'
import { useStores } from '@/context/mobxProvider'
import useStyle from '@/hooks/useStyle'
import { formatNum } from '@/pages/admin/crms'
import { getBgaOrderPage, getOrderAllDetail } from '@/services/api/tradeCore/order'
import { cn } from '@/utils/cn'
import { removeEmptyChildren } from '@/utils/tree'

import { getColumns } from './tableConfig'
import { getExpandColumns } from './tableConfig.expand'

export default function PositionHistory({
  groups,
  accounts
}: {
  groups: Record<string, { text: string; color?: string }>
  accounts: Record<string, { text: string; color?: string }>
}) {
  const { id } = useParams()

  const { trade, ws } = useStores()
  const { recordListClassName } = useStyle()
  const symbol = trade.showActiveSymbol ? trade.activeSymbolName : undefined
  const currencyDecimal = trade.currentAccountInfo.currencyDecimal

  // const className = useEmotionCss(({ token }) => {
  //   return {
  //     '.ant-table-expanded-row.ant-table-expanded-row-level-1': {
  //       '.ant-table': {
  //         marginLeft: `0px !important`
  //       },
  //       '.ant-table-expanded-row-fixed': {
  //         marginTop: `-16px !important`
  //       },
  //       '.ant-table-thead > tr > th': {
  //         background: `var(--bg-base-gray) !important`,
  //         color: `var(--color-text-secondary) !important`
  //       }
  //     }
  //   }
  // })

  return (
    <StandardTable
      columnEmptyText="0"
      columns={getColumns({
        currencyDecimal,
        groups,
        accounts
      })}
      // ghost
      showOptionColumn={false}
      stripe={false}
      hasTableBordered
      cardBordered={false}
      bordered={false}
      // className={cn(recordListClassName, className)}
      className={cn(recordListClassName)}
      size="middle"
      params={{ accountId: trade.currentAccountInfo.id, symbol }}
      action={{
        // @ts-ignore
        query: (params) => getBgaOrderPage({ ...params, status: 'FINISH', orderByField: 'finishTime', orderBy: 'DESC' })
      }}
      pageSize={6}
      expandable={{
        columnWidth: 30,
        expandedRowRender: (record) => (
          <>
            <StandardTable
              columnEmptyText="0"
              columns={getExpandColumns()}
              key={trade.currentAccountInfo.id}
              ghost
              showOptionColumn={false}
              stripe={false}
              hasTableBordered
              hideSearch
              cardBordered={false}
              bordered={false}
              className={recordListClassName}
              cardProps={{
                bodyStyle: { padding: 0 },
                headStyle: { borderRadius: 0 },
                className: ''
              }}
              pagination={false}
              size="middle"
              params={{
                clientId: id,
                status: 'FINISH' as API.BGAStatus
              }}
              action={{
                // @ts-ignore
                query: (params) =>
                  getOrderAllDetail({ id: record.id }).then((res) => {
                    const info = res.data
                    // 第二层：委托单
                    const data = (info?.ordersInfo || []).map((item) => {
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
                    return {
                      total: 1,
                      data: removeEmptyChildren(data),
                      success: true
                    }
                  })
              }}
            />
          </>
        )
        // rowExpandable: (record) => record.symbol !== 'BTC'
      }}
      // columns={getColumns(groups, accounts)}
      // cardProps={{ bodyStyle: { padding: 10 } }}
      // hideForm={true}
      search={{
        span: 4,
        submitterColSpanProps: { span: 12 },
        className: 'custom-search-form-item',
        optionRender: (searchConfig, props, dom) => {
          return [
            <div key="action" className="flex items-center">
              <QueryBtnGroup
                onSubmit={() => {
                  searchConfig.form?.submit()
                }}
                onReset={() => {
                  searchConfig?.form?.resetFields()
                  searchConfig?.form?.submit()
                }}
              />
              <Export />
            </div>
          ]
        }
      }}
      // ghost
      // params={{ clientId: id, status: 'FINISH' as API.BGAStatus }}
      // action={{
      // query: (params) =>
      //   getClientPositions(params).then((res) => {
      //     // 订阅持仓中的品种行情
      //     // const list = (res.data?.records || []).filter((item: any) => item.status === 'BAG')

      //     // // 动态订阅汇率品种行情
      //     // if (list.length) {
      //     //   // 按需订阅行情
      //     //   stores.ws.batchSubscribeSymbol(list.map((item: any) => ({ dataSourceCode: item.dataSourceCode, symbol: item.symbol })))

      //     //   list.forEach((item: any) => {
      //     //     stores.ws.subscribeExchangeRateQuote(item?.conf)
      //     //   })
      //     // }

      //     return res
      //   })
      // }}
    />
  )
}
