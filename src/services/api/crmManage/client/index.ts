import { stores } from '@/context/mobxProvider'
import { request } from '@/utils/request'

import { formatOrderResult } from '../../tradeCore/order'

// 交易信息-持仓列表
export async function getClientPositions(params?: CrmClient.PositionsParams) {
  return request<API.Response<API.PageResult<CrmClient.PositionsItem>>>('/api/trade-operation/operationApi/client/positions', {
    method: 'GET',
    params
  })
    .then(formatOrderResult)
    .then((res) => {
      const list = res?.data?.records || []

      if (list?.length) {
        // 按需订阅行情
        stores.ws.batchSubscribeSymbol(list)

        // 动态订阅汇率品种行情
        list.forEach((item: CrmClient.PositionsItem) => {
          // @ts-ignore
          const conf = item?.conf
          if (conf) {
            stores.ws.subscribeExchangeRateQuote(conf)
          }
        })
      }
      return res
    })
}

// 交易信息-所有委托
export async function getClientAllOrder(params?: CrmClient.AllOrderParams) {
  return request<API.Response<API.PageResult<CrmClient.AllOrderItem>>>('/api/trade-operation/operationApi/client/allOrder', {
    method: 'GET',
    params
  })
}

// 交易信息-当前委托
export async function getClientCurrentOrder(params?: CrmClient.CurrentOrderParams) {
  return request<API.Response<API.PageResult<CrmClient.CurrentOrderItem>>>('/api/trade-operation/operationApi/client/currentOrder', {
    method: 'GET',
    params
  })
    .then(formatOrderResult)
    .then((res) => {
      const list = res?.data?.records || []

      if (list?.length) {
        // 按需订阅行情
        stores.ws.batchSubscribeSymbol(list)
      }
      return res
    })
}

// 交易信息-历史委托
export async function getClientHistoryOrder(params?: CrmClient.HistoryOrderParams) {
  return request<API.Response<API.PageResult<CrmClient.HistoryOrderItem>>>('/api/trade-operation/operationApi/client/historyOrder', {
    method: 'GET',
    params
  }).then(formatOrderResult)
}

// 交易信息-历史成交
export async function getClientHistoryTrade(params?: CrmClient.HistoryTradeParams) {
  return request<API.Response<API.PageResult<CrmClient.HistoryTradeItem>>>('/api/trade-operation/operationApi/client/records', {
    method: 'GET',
    params
  }).then(formatOrderResult)
}

// 交易信息-仓位历史
export async function getClientTradingLog(params?: CrmClient.TradingLogParams) {
  return request<API.Response<API.PageResult<CrmClient.TradingLogItem>>>('/api/trade-operation/operationApi/client/tradingLog', {
    method: 'GET',
    params
  }).then(formatOrderResult)
}

// 资金流水
export async function getClientMoneyLog(params?: CrmClient.MoneyLogParams) {
  return request<API.Response<API.PageResult<CrmClient.MoneyLogItem>>>('/api/trade-operation/operationApi/client/moneyLog', {
    method: 'GET',
    params
  })
}

// 资金信息
export async function getClientMoneyInfoList(params?: CrmClient.MoneyLogParams) {
  return request<API.Response<API.PageResult<CrmClient.MoneyLogItem>>>('/api/trade-operation/operationApi/client/moneyInfo', {
    method: 'GET',
    params
  })
}

// 资金信息统计汇总
export async function getClientStatMoney(params?: { clientId: any }) {
  return request<API.Response<CrmClient.StatMoneyItem>>('/api/trade-operation/operationApi/client/statMoney', {
    method: 'GET',
    params
  })
}

// 查询客户信息
export async function findClient(params: { clientId: any }) {
  return request<API.Response<CrmClient.ClientInfo>>('/api/trade-operation/operationApi/client/findClient', {
    method: 'GET',
    params
  })
}

// 查询账户信息
export async function findAccount(params: { clientId: any; accountGroupId?: string }) {
  return request<API.Response<CrmClient.ClientAccountItem[]>>('/api/trade-operation/operationApi/client/findAccount', {
    method: 'GET',
    params
  })
}

export type PreferenceSymbolType = 'VOLUME' | 'AMOUNT'
// 统计用户交易偏好
export async function findOrderBySymbol(params: { clientId: any; preferenceSymbolType?: PreferenceSymbolType }) {
  return request<API.Response<CrmClient.OrderBySymbolItem[]>>('/api/trade-operation/operationApi/client/findOrderBySymbol', {
    method: 'GET',
    params
  })
}

// 统计用户合约交易时长
export async function findOrderCloseMinis(params: { clientId: any }) {
  return request<API.Response<CrmClient.OrderCloseMinisItem>>('/api/trade-operation/operationApi/client/findOrderCloseMinis', {
    method: 'GET',
    params
  })
}

// 用户交易时间活跃统计
export async function getUserDealHour(params?: { clientId: any }) {
  return request<API.Response<CrmClient.UserDealHourItem>>('/api/trade-operation/operationApi/client/userDealHour', {
    method: 'GET',
    params
  })
}

// 入金明细
export async function getUserIncominInfo(params?: CrmClient.UserIncominInfoParams) {
  return request<API.Response<API.PageResult<CrmClient.UserIncominInfoItem>>>('/api/trade-operation/operationApi/client/userIncominInfo', {
    method: 'GET',
    params
  })
}

// 资产变化图表
export async function getAccountDayMoney(params?: {
  /**客户id */
  clientId: any
  tradeAccountId?: any
  /**时间大小 例如传 10 表示10天 */
  size: number
}) {
  return request<API.Response<API.PageResult<CrmClient.AccountDayMoneyItem>>>('/api/trade-operation/operationApi/client/accountDayMoney', {
    method: 'GET',
    params
  })
}

// 品种浮动盈亏
export async function getSymbolProfitMap(params?: { symbols: string }) {
  return request<API.Response<any>>('/api/trade-operation/operationApi/profit/count/symbolProfitMap', {
    method: 'GET',
    params
  })
}

// 平台浮动盈亏
// /trade-operation/operationApi/profit/count/platformProfit
export async function getPlatformProfit() {
  return request<API.Response<any>>('/api/trade-operation/operationApi/profit/count/platformProfit', {
    method: 'GET'
  })
}

// 持仓订单 - 报价&盈亏
// asgoArrayStr 交易账户ID-交易品种-账户组ID-持仓单ID（多个用','隔开）
export async function getBgaOrderPriceProfit(params?: { asgoArrayStr: any }) {
  return request<API.Response<any>>('/api/trade-core/coreApi/orders/bgaOrderPriceProfit', {
    method: 'GET',
    params
  })
}

// 出金统计（出金明细）
// /trade-operation/operationApi/client/withdrawalOrderPageList
export async function getWithdrawalOrderPageList(params?: CrmClient.WithdrawalOrderPageListParams) {
  return request<API.Response<API.PageResult<CrmClient.WithdrawalOrderPageListItem>>>(
    '/api/trade-operation/operationApi/client/withdrawalOrderPageList',
    {
      method: 'GET',
      params
    }
  )
}

// 出金统计明细（出金订单）
// /trade-operation/operationApi/client/withdrawalOrderDetailPageList
export async function getWithdrawalOrderDetailPageList(params?: CrmClient.WithdrawalOrderDetailPageListParams) {
  return request<API.Response<API.PageResult<CrmClient.WithdrawalOrderDetailPageListItem>>>(
    '/api/trade-operation/operationApi/client/withdrawalOrderDetailPageList',
    {
      method: 'GET',
      params
    }
  )
}

// 入金统计明细 （入金订单）
// /trade-operation/operationApi/client/depositOrderDetailPageList
export async function getDepositOrderDetailPageList(params?: CrmClient.DepositOrderDetailPageListParams) {
  return request<API.Response<API.PageResult<CrmClient.DepositOrderDetailPageListItem>>>(
    '/api/trade-operation/operationApi/client/depositOrderDetailPageList',
    {
      method: 'GET',
      params
    }
  )
}

// 入金统计 （入金明细）
// /trade-operation/operationApi/client/depositOrderPageList
export async function getDepositOrderPageList(params?: CrmClient.DepositOrderPageListParams) {
  return request<API.Response<API.PageResult<CrmClient.DepositOrderPageListItem>>>(
    '/api/trade-operation/operationApi/client/depositOrderPageList',
    {
      method: 'GET',
      params
    }
  )
}
