import { request } from '@/utils/request'

// 入金订单查询
export async function getDepositOrderListPage(params?: PaymentDeposit.depositOrderListPageParams) {
  return request<API.Response<API.PageResult<PaymentDeposit.depositOrderListItem>>>(
    '/api/trade-payment/paymentApi/deposit/depositOrderListPage',
    {
      method: 'GET',
      params
    }
  )
}

// 根据订单号查询入金订单记录
export async function getDepositOrderByOrderNo(params: { orderNo: string }) {
  return request<API.Response<PaymentDeposit.DepositOrderByOrderNoListItem>>(
    '/api/trade-payment/paymentApi/deposit/getDepositOrderByOrderNo',
    {
      method: 'GET',
      params
    }
  )
}
