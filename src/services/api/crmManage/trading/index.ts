import { request } from '@/utils/request'

// 产品交易排行
export async function getTradingSymbol(params?: API.SearchTimeParams) {
  return request<API.Response<CrmTrading.TradingSymbolItem[]>>('/api/trade-operation/operationApi/trading/symbol', {
    method: 'GET',
    params
  })
}

// 亏损商品排行
export async function getTradingLoss(params?: API.SearchTimeParams) {
  return request<API.Response<CrmTrading.LossItem[]>>('/api/trade-operation/operationApi/trading/loss', {
    method: 'GET',
    params
  })
}

// 盈利商品排行
export async function getTradingProfit(params?: API.SearchTimeParams) {
  return request<API.Response<CrmTrading.ProfitSymbolItem[]>>('/api/trade-operation/operationApi/trading/profit', {
    method: 'GET',
    params
  })
}

// 用户交易排行
export async function getTradingUser(
  params?: API.PageParam &
    API.SearchTimeParams & {
      lastTradeStartTime: string
      lastTradeEndTime: string
    }
) {
  return request<API.Response<API.PageResult<CrmTrading.TradingUserItem>>>('/api/trade-operation/operationApi/trading/user', {
    method: 'GET',
    params
  })
}

// 日统计报表
// /api/trade-operation/operationApi/trading/statisticsDay
export async function getTradingStatisticsDay(params?: CrmTrading.StatisticsDayItemParams) {
  return request<API.Response<API.PageResult<CrmTrading.StatisticsDayItem>>>('/api/trade-operation/operationApi/trading/statisticsDay', {
    method: 'GET',
    params
  })
}

// 统计用户留存率
export async function getTradingRetention(params?: CrmTrading.RetentionParams) {
  return request<API.Response<API.PageResult<CrmTrading.RetentionListItem>>>('/api/trade-operation/operationApi/trading/retention', {
    method: 'GET',
    params
  })
}

// 统计渠道报表
export async function getTradingChannel(params?: API.PageParam & API.SearchTimeParams & { clientGroupId?: string }) {
  return request<API.Response<API.PageResult<CrmTrading.ChannelListItem>>>('/api/trade-operation/operationApi/trading/channel', {
    method: 'GET',
    params
  })
}

// 现金头寸报表
export async function getTradingMoneyPosition(params?: API.PageParam) {
  return request<API.Response<CrmTrading.MoneyPositionListItem[]>>('/api/trade-operation/operationApi/trading/moneyPosition', {
    method: 'GET',
    params
  })
}

// 客户数据统计
export async function getTradingStatAccount(params?: CrmTrading.StatAccountParams) {
  return request<API.Response<API.PageResult<CrmTrading.StatAccountItem>>>('/api/trade-operation/operationApi/trading/statAccount', {
    method: 'GET',
    params
  })
}

// 首A用户明细
export async function getTradingFristAUser(params?: CrmTrading.FristAUserParams) {
  return request<API.Response<API.PageResult<CrmTrading.FristAUserItem>>>('/api/trade-operation/operationApi/trading/fristAUser', {
    method: 'GET',
    params
  })
}

// ====== CRM 首页 ========

// 按天查询首页CRM资金统计
export async function getFindCRMMoneyByDay(params?: API.SearchTimeParams) {
  return request<API.Response<CrmTrading.CRMMoneyByDayInfo>>('/api/trade-operation/operationApi/trading/findCRMMoneyByDay', {
    method: 'GET',
    params
  })
}

// 按月查询首页CRM资金统计
export async function getFindCRMMoneyByMonth(params?: { month: string }) {
  return request<API.Response<CrmTrading.CRMMoneyByMonthInfo>>('/api/trade-operation/operationApi/trading/findCRMMoneyByMonth', {
    method: 'GET',
    params
  })
}

// 按天查询首页CRM平台交易额
export async function getFindGMVByDay(params?: API.SearchTimeParams) {
  return request<API.Response<any>>('/api/trade-operation/operationApi/trading/findGMVByDay', {
    method: 'GET',
    params
  })
}

// 按月查询首页CRM平台交易额
export async function getFindGMVByMonth(params?: any) {
  return request<API.Response<any>>('/api/trade-operation/operationApi/trading/findGMVByMonth', {
    method: 'GET',
    params
  })
}

// 平台结算资金
export async function getFindCloseMoney(params?: { startTime: string } & API.PageParam) {
  return request<API.Response<CrmTrading.findCloseMoneyInfo[]>>('/api/trade-operation/operationApi/trading/findCloseMoney', {
    method: 'GET',
    params
  })
}

// 运营数据图表
export async function getFindCrmMoneyLine(params?: { size: number; startTime: string }) {
  return request<API.Response<CrmTrading.findCrmMoneyLineInfo[]>>('/api/trade-operation/operationApi/trading/findCrmMoneyLine', {
    method: 'GET',
    params
  })
}

// 平仓开仓交易量表
export async function getFindCrmTradingLine(params?: { size: number; startTime: string }) {
  return request<API.Response<CrmTrading.findCrmTradingLineInfo[]>>('/api/trade-operation/operationApi/trading/findCrmTradingLine', {
    method: 'GET',
    params
  })
}

// 渠道明细
// /trade-operation/operationApi/trading/findChannelUser
export async function getFindChannelUser(params?: API.PageParam) {
  return request<API.Response<CrmTrading.findChannelUserItem[]>>('/api/trade-operation/operationApi/trading/findChannelUser', {
    method: 'GET',
    params
  })
}

// 查询所有渠道
// /trade-operation/operationApi/trading/findAllClientGroup
export async function getFindAllClientGroup(params?: API.PageParam) {
  return request<API.Response<CrmTrading.findAllClientGroupItem[]>>('/api/trade-operation/operationApi/trading/findAllClientGroup', {
    method: 'GET',
    params
  })
}

// 查询汇总用户余额
// /trade-operation/operationApi/trading/findStatAllMoney
export async function getFindStatAllMoney(params?: API.PageParam) {
  return request<API.Response<any>>('/api/trade-operation/operationApi/trading/findStatAllMoney', {
    method: 'GET',
    params
  })
}

// 汇总用户保证金
// /trade-operation/operationApi/trading/findStatAllOrderMargin
export async function getFindStatAllMargin(params?: API.PageParam) {
  return request<API.Response<any>>('/api/trade-operation/operationApi/trading/findStatAllOrderMargin', {
    method: 'GET',
    params
  })
}

// 活跃用户表数据统计
// /trade-operation/operationApi/trading/getActiveUsersTable
export async function getActiveUsersTable(params?: API.PageParam) {
  return request<API.Response<CrmTrading.ActiveUsersTableItem[]>>('/api/trade-operation/operationApi/trading/getActiveUsersTable', {
    method: 'GET',
    params
  })
}
