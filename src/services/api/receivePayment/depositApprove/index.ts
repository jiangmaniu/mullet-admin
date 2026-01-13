import { request } from '@/utils/request'

// 后端入金审核列表
export async function getDepositOrderReviewListPage(params?: DepositApprove.DepositApproveListParams) {
  return request<API.Response<API.PageResult<DepositApprove.DepositApproveListItem>>>(
    '/api/trade-payment/paymentApi/deposit/depositOrderReviewListPage',
    {
      method: 'GET',
      params
    }
  )
}

// 后台入金审核
export async function depositApprove(body: DepositApprove.DepositApproveParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/deposit/approval', {
    method: 'POST',
    data: body,
    replayProtection: true
  })
}
