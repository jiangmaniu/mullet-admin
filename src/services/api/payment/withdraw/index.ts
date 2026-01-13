import { request } from '@/utils/request'

// 出金审批列表
export async function getWithdrawalOrderApprovalList(params?: PaymentWithdraw.WithdrawalOrderApprovalParams) {
  return request<API.Response<API.PageResult<PaymentWithdraw.WithdrawalOrderApprovalListItem>>>(
    '/api/trade-payment/paymentApi/withdrawl/withdrawalOrderApprovalList',
    {
      method: 'GET',
      params
    }
  )
}

// 出金订单查询
export async function getWithdrawalOrderPageList(params?: PaymentWithdraw.WithdrawalOrderPageListParams) {
  return request<API.Response<API.PageResult<PaymentWithdraw.WithdrawalOrderPageListItem>>>(
    '/api/trade-payment/paymentApi/withdrawl/withdrawalOrderPageList',
    {
      method: 'GET',
      params
    }
  )
}

// 审批通过/拒绝
export async function approveWithdrawl(body: PaymentWithdraw.ApproveWithdrawlParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/withdrawl/approval', {
    method: 'POST',
    data: body
  })
}
