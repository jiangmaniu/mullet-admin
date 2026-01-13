import qs from 'qs'

import { stores } from '@/context/mobxProvider'
import { request } from '@/utils/request'

// 行情数据源-全部
export async function getDataSourceAll() {
  return request<API.Response<DataSource.QuoteDataSourceItem>>('/api/trade-market/marketApi/dataSource/list', {
    method: 'GET'
  })
}

// 数据源产品symbol-分页
export async function getDataSourceSymbolList(params?: API.PageParam & { dataSourceCode: any; symbol?: string }) {
  const dataSourceCode = params?.dataSourceCode
  if (!dataSourceCode) return
  // 获取数据源的高开低收信息
  getSymbolTicker({ dataSourceCode })

  return request<API.Response<API.PageResult<DataSource.SymbolListItem>>>('/api/trade-market/marketApi/symbol/symbolList', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.success) {
      // 按需订阅品种行情
      const symbolList: any = res.data?.records || []

      stores.ws.batchSubscribeSymbol({
        list: symbolList.map((item: any) => ({ dataSourceCode: item.dataSourceCode, symbol: item.symbol }))
      })
    }
    return res
  })
}

// 行情数据源-启用/禁用
export async function switchDataSourceStatus(body: DataSource.SwitchDataSourceStatusParams) {
  return request<API.Response>(`/api/trade-market/marketApi/dataSource/status?${qs.stringify(body)}`, {
    method: 'POST'
  })
}

// 查询数据源行情高开低收信息
export async function getSymbolTicker(params: { dataSourceCode: any }) {
  return request<API.Response<any>>(`/api/trade-market/marketApi/public/symbol/newTicker/${params.dataSourceCode}`, {
    method: 'GET'
  }).then((res) => {
    if (res.success) {
      const data: any = res.data || ''
      const result: any = {}
      Object.keys(data).forEach((key) => {
        try {
          result[key] = JSON.parse(data[key])
        } catch (error) {}
      })
      stores.trade.setSymbolTicker(result)
    }
    return res
  })
}
