import { request } from '@/utils/request'

// 收款资源分页列表
export async function getReceiveResourceListPage(params?: PaymentReceiveManage.ReceiveResourceListParams) {
  return request<API.Response<API.PageResult<PaymentReceiveManage.ReceiveResourceListItem>>>(
    '/api/trade-payment/paymentApi/receive/receiveResourceListPage',
    {
      method: 'GET',
      params
    }
  )
}

// 收款资源-详情
export async function getReceiveResourceInfo(params?: API.IdParam) {
  return request<API.Response<PaymentReceiveManage.ReceiveResourceListItem>>('/api/trade-payment/paymentApi/receive/detail', {
    method: 'GET',
    params
  })
}

// 支付类型列表
export async function getPaymentTypeList() {
  return request<API.Response<{ channelId: string; channelNo: string; channelNoValue: string }[]>>(
    '/api/trade-payment/paymentApi/receive/paymentTypeList',
    {
      method: 'GET'
    }
  )
}

// 新增收款资源
export async function addReceiveResource(body: PaymentReceiveManage.SaveReceiveParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/receive/save', {
    method: 'POST',
    data: body
  })
}

// 编辑收款资源
export async function updateReceiveResource(body: PaymentReceiveManage.SaveReceiveParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/receive/update', {
    method: 'POST',
    data: body
  })
}

// 禁启用收款资源状态
export async function switchReceiveResourceStatus(body: PaymentReceiveManage.SaveReceiveParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/receive/operation', {
    method: 'POST',
    data: body
  })
}
