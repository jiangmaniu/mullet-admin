import { request } from '@/utils/request'

// 收款资源汇总报表
export async function getReceiveResourceReportList(params?: PaymentReceiveReport.ReceiveResourceReportListParams) {
  return request<API.Response<API.PageResult<PaymentReceiveReport.ReceiveResourceReportListItem>>>(
    '/api/trade-payment/paymentApi/report/receiveResourceReportList',
    {
      method: 'GET',
      params
    }
  )
}
// 收款资源汇总报表-合计
export async function getReceiveResourceReportCount(params?: PaymentReceiveReport.ReceiveResourceReportListParams) {
  return request<API.Response<PaymentReceiveReport.ReceiveResourceReportListItem>>(
    '/api/trade-payment/paymentApi/report/receiveResourceReportCount',
    {
      method: 'GET',
      params
    }
  )
}
// 收款资源汇总报表-导出
export async function exportReceiveResourceReportList(params?: PaymentReceiveReport.ReceiveResourceReportListParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/report/exportReceiveResourceReportList', {
    method: 'GET',
    isExport: true,
    params
  })
}
