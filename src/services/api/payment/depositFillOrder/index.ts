import { request } from '@/utils/request'

// 入金补单查询-分页
export async function getDepositFillOrderList(params?: PaymentDepositFillOrder.DepositFillOrderParams) {
  return request<API.Response<API.PageResult<PaymentDepositFillOrder.DepositFillOrderListItem>>>(
    '/api/trade-payment/paymentApi/depositFillOrder/list',
    {
      method: 'GET',
      params
    }
  )
}

// 入金补单查询-详情
export async function getDepositFillOrderDetail(params: API.IdParam) {
  return request<API.Response<PaymentDepositFillOrder.DepositFillOrderListItem>>('/api/trade-payment/paymentApi/depositFillOrder/detail', {
    method: 'GET',
    params
  })
}

// 提交补单直接加钱
export async function saveDepositFillOrder(body: PaymentDepositFillOrder.SaveDepositFillOrderParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/depositFillOrder/save', {
    method: 'POST',
    data: body
  })
}

// 提交补单-修改
export async function updateDepositFillOrder(body: PaymentDepositFillOrder.UpdateDepositFillOrderParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/depositFillOrder/save', {
    method: 'POST',
    data: body
  })
}
