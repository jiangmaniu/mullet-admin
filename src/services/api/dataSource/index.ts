import qs from 'qs'

import { getUid } from '@/utils'
import { request } from '@/utils/request'

// 行情数据源-查询超时时间
export async function getDataSourceTimeout() {
  return request<API.Response<any>>('/api/trade-market/marketApi/dataSource/getTimeout', {
    method: 'POST'
  })
}

// 行情数据源-设置超时时间
export async function setDataSourceTimeout(body: { timeout: number }) {
  return request<API.Response<any>>(`/api/trade-market/marketApi/dataSource/setTimeout?timeout=${body.timeout}`, {
    method: 'POST'
  })
}

// 行情数据源-列表
export async function getDataSourceList(params?: { code?: string }) {
  return request<API.Response<DataSource.DataSourceListItem[]>>('/api/trade-market/marketApi/dataSource/list', {
    method: 'GET',
    params
  })
}

// 行情数据源-详情
export async function getDataSourceDetail(params: API.IdParam) {
  return request<API.Response<DataSource.DataSourceListItem>>('/api/trade-market/marketApi/dataSource/detail', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.success) {
      const data = res.data
      const confInfo = data?.confInfo

      if (confInfo) {
        try {
          // @ts-ignore
          const conf = JSON.parse(confInfo) || {}
          // 对象转数组
          // @ts-ignore
          data.confInfo = Object.entries(conf)
            .map(([key, value]) => ({ key, value }))
            .map((item) => ({ ...item, id: getUid() }))
        } catch (e) {}
      } else {
        // @ts-ignore
        data.confInfo = []
      }

      res.data = data
    }
    return res
  })
}

// 行情数据源-排序
export async function sortDataSourceList(body: { ids: string }) {
  return request<API.Response<any>>(`/api/trade-market/marketApi/dataSource/sort?ids=${body.ids}`, {
    method: 'POST'
  })
}

// 行情数据源-启用/禁用
export async function switchDataSourceStatus(body: { id: string; status: DataSource.Status }) {
  return request<API.Response<any>>(`/api/trade-market/marketApi/dataSource/status?${qs.stringify(body)}`, {
    method: 'POST'
    // data: body
  })
}

// 行情数据源-订阅别名列表
export async function getDataSourceSubAliasList(params: { dsId: any /**行情源id */ }) {
  return request<API.Response<DataSource.DataSourceSubAliasListItem[]>>('/api/trade-market/marketApi/dataSource/subAlias/list', {
    method: 'GET',
    params
  })
}

// 行情数据源-订阅别名删除
export async function removeDataSourceSubAlias(body: { ids: any }) {
  return request<API.Response<any>>(`/api/trade-market/marketApi/dataSource/subAlias/remove?ids=${body.ids}`, {
    method: 'POST'
  })
}

// 行情数据源-订阅别名新增或修改
export async function submitDataSourceSubAlias(body: DataSource.SubmitDataSourceSubAliasParams) {
  return request<API.Response<any>>('/api/trade-market/marketApi/dataSource/subAlias/submit', {
    method: 'POST',
    data: body
  })
}

// 行情源配置-新增或修改
export async function submitDataSource(body: DataSource.SubmitDataSourceParams) {
  return request<API.Response<any>>('/api/trade-market/marketApi/dataSource/submit', {
    method: 'POST',
    data: body
  })
}

// 产品K线数据-分页-客户端查询tradingview使用
export async function getKlineList(params: DataSource.KlineListParams) {
  if (!params.symbol || !params.klineType || !params.klineTime) return []
  return request<API.Response<DataSource.KlineListItem[]>>('/api/trade-market/marketApi/kline/symbol/klineList', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.success) {
      const data = (res.data || []).map((item) => {
        // 返回数据格式：timestamp(时间), open(开), high(高), low(低), close(收)
        // @ts-ignore
        const [klineTime, open, high, low, close] = (item || '').split(',')
        return {
          klineTime: Number(klineTime),
          open,
          high,
          low,
          close
        }
      })
      res.data = data
    }
    return res
  })
}

// 产品K线数据-时间范围-数据源-查询历史k线数据
export async function getKlineTimeFrame(params: DataSource.KlineTimeFrameParams) {
  if (!params.symbol || !params.klineType || !params.startTime || !params.endTime) return []
  return request<API.Response<DataSource.KlineListItem[]>>('/api/trade-market/marketApi/kline/symbol/klineTimeFrame', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.success) {
      const data = (res.data || []).map((item) => {
        // 返回数据格式：timestamp(时间), open(开), high(高), low(低), close(收)
        // @ts-ignore
        const [klineTime, open, high, low, close] = (item || '').split(',')
        return {
          klineTime: Number(klineTime),
          open,
          high,
          low,
          close
        }
      })
      res.data = data
    }
    return res
  })
}

// 点击品种获取产品最新Ticker 高开低收信息
export async function getSymbolTicker(params: { symbol: any }) {
  return request<API.Response<DataSource.SymbolNewTicker>>(`/api/trade-market/marketApi/kline/symbol/newTicker/${params.symbol}`, {
    method: 'GET',
    params
  })
}

// 查询时间段交易品种价格数据
export async function getSymbolPrice(params: DataSource.SymbolPriceParams) {
  if (!params.symbol) return
  return request<API.Response<DataSource.SymbolPriceItem[]>>(`/api/trade-market/marketApi/price/symbol`, {
    method: 'GET',
    params
  }).then((res) => {
    if (res.success) {
      const data = (res.data || []).map((item) => {
        // 返回数据格式：timestamp(时间), bid(买盘[卖价]), ask(卖盘[买价]), ds(行情源), symbol(行情源品种), dsTime(行情源时间)
        // @ts-ignore
        const [timestamp, bid, ask, ds, symbol, dsTime, status] = (item || '').split(',')
        return {
          timestamp: Number(timestamp),
          bid,
          ask,
          ds,
          symbol,
          dsTime: Number(dsTime),
          status
        }
      })
      res.data = data
    }
    return res
  })
}

// 获取品种树
export async function getSymbolTree(params: { symbol: any }) {
  return request<API.Response<any>>(`/api/trade-core/coreApi/symbols/tree`, {
    method: 'GET',
    params
  })
}

// 获取数据源类型
export async function getDataSourceType() {
  return request<API.Response<DataSource.DataSourceTypeItem[]>>('/api/trade-crm/crmClient/public/dictBiz/market_datasource_type', {
    method: 'GET'
  }).then((res) => {
    if (res.success) {
      res.data = (res.data || []).map((item: any) => {
        let value = {} as any
        try {
          value = JSON.parse(item.value)
        } catch (e) {}
        return {
          label: value?.key,
          value: value?.key,
          params: (value?.param || []).map((key: string) => ({ key, value: '', id: getUid() })),
          icon: value?.icon || ''
        }
      })
    }
    return res
  })
}

export async function removeDataSource(body: API.IdParam) {
  return request<API.Response<any>>(`/api/trade-market/marketApi/dataSource/remove/remove?id=${body.id}`, {
    method: 'POST'
  })
}
