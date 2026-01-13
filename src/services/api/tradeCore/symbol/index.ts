import qs from 'qs'

import { formatSymbolConf } from '@/utils/business'
import { request } from '@/utils/request'

// 交易品种-新增
export async function addSymbol(body: Symbol.SubmitSymbolParams) {
  return request<API.Response>('/api/trade-core/coreApi/symbols/add', {
    method: 'POST',
    data: body
  })
}

// 交易品种-修改
export async function updateSymbol(body: Symbol.SubmitSymbolParams) {
  return request<API.Response>('/api/trade-core/coreApi/symbols/update', {
    method: 'POST',
    data: body
  })
}

// 交易品种-删除
export async function removeSymbol(body: API.IdParam) {
  return request<API.Response>(`/api/trade-core/coreApi/symbols/remove?${qs.stringify(body)}`, {
    method: 'POST'
  })
}

// 交易品种分页列表
export async function getSymbolPageList(params?: Symbol.SymbolPageParams) {
  return request<API.Response<API.PageResult<Symbol.SymbolListItem>>>('/api/trade-core/coreApi/symbols/page', {
    method: 'GET',
    params
  })
}

// 交易品种详情页
export async function getSymbolDetail(params: API.IdParam) {
  return request<API.Response<Symbol.SymbolListItem>>('/api/trade-core/coreApi/symbols/detail', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.data?.symbolConf) {
      const symbolConf = formatSymbolConf(res.data?.symbolConf)
      res.data = {
        symbolConf,
        ...res.data,
        // 展开方便回显
        ...symbolConf
      }
    }
    return res
  })
}

// 获取后台配置的全部品种列表，用于验证汇率品种是否配置
export async function getAllSymbols(params?: API.PageParam) {
  return request<API.Response<Symbol.AllSymbolItem[]>>('/api/trade-core/coreApi/symbols/list', {
    method: 'GET',
    params
  })
}
