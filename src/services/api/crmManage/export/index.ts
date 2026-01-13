import { request } from '@/utils/request'

export type SymbolSortBy =
  | 'DEFAULTDESC'
  | 'OPENVOLUMEDESC'
  | 'CLOSEVOLUMEDESC'
  | 'OPENGVMEDESC'
  | 'CLOSEGVMEDESC'
  | 'DEFAULTASC'
  | 'OPENVOLUMEASC'
  | 'CLOSEVOLUMEASC'
  | 'OPENGVMEASC'
  | 'CLOSEGVMEASC'
// /trade-operation/operationApi/excelExport/symbol
// 导出产品交易排行
export async function exportSymbol(params?: { sortBy: SymbolSortBy } & API.SearchTimeParams) {
  return request('/api/trade-operation/operationApi/excelExport/symbol', {
    method: 'GET',
    params
  })
}

// 导出 excel 盈利商品排行
export async function exportProfitProduct(params?: API.SearchTimeParams) {
  return request('/api/trade-operation/operationApi/excelExport/profit', {
    method: 'GET',
    params
  })
}

export async function exportLossProduct(params?: API.SearchTimeParams) {
  return request('/api/trade-operation/operationApi/excelExport/loss', {
    method: 'GET',
    params
  })
}

// /trade-operation/operationApi/excelExport/user
// 导出 excel 用户排行
export async function exportUser(params?: {
  channelId?: number
  clientId?: number
  fastAEndTime?: string
  fastAStartTime?: string
  regEndTime?: string
  regStartTime?: string
}) {
  return request('/api/trade-operation/operationApi/excelExport/user', {
    method: 'GET',
    params
  })
}

// /trade-operation/operationApi/excelExport/statisticsDay
// 导出 excel 统计日报
export async function exportStatisticsDay(params?: CrmTrading.StatisticsDayItemParams) {
  return request('/api/trade-operation/operationApi/excelExport/statisticsDay', {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    params
  })
}
