import { request } from '@/utils/request'

// 汇率管理列表
export async function getExchangeRatePageList(params?: PaymentExchangeRate.ExchangeRateParams) {
  return request<API.Response<API.PageResult<PaymentExchangeRate.ExchangeRateListItem>>>(
    '/api/trade-payment/paymentApi/exchangeRate/list',
    {
      method: 'GET',
      params
    }
  )
}

// 汇率管理详情
export async function getExchangeRateDetail(params: API.IdParam) {
  return request<API.Response<PaymentExchangeRate.ExchangeRateListItem>>('/api/trade-payment/paymentApi/exchangeRate/detail', {
    method: 'GET',
    params
  })
}

// 汇率管理-新增
export async function saveExchangeRate(body: PaymentExchangeRate.SaveExchangeRateParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/exchangeRate/save', {
    method: 'POST',
    data: body
  })
}

// 汇率管理-编辑
export async function updateExchangeRate(body: PaymentExchangeRate.UpdateExchangeRateParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/exchangeRate/update', {
    method: 'POST',
    data: body
  })
}

// 汇率管理-删除
export async function removeExchangeRate(body: API.IdParam) {
  return request<API.Response>(`/api/trade-payment/paymentApi/exchangeRate/remove?id=${body.id}`, {
    method: 'POST',
    data: body
  })
}

// 汇率出入金币种列表
export async function getExchangeRateSymbolTypeList() {
  return request<API.Response<PaymentExchangeRate.SymbolTypeList[]>>('/api/trade-payment/paymentApi/exchangeRate/symbolTypeList', {
    method: 'POST'
  })
}

// 汇率修改历史记录分页
export async function getExchangeRateLog(params?: PaymentExchangeRate.ExchangeRateLogParams) {
  return request<API.Response<API.PageResult<PaymentExchangeRate.ExchangeRateLogListItem>>>(
    '/api/trade-payment/paymentApi/exchangeRateLog/list',
    {
      method: 'GET',
      params
    }
  )
}
