import { request } from '@/utils/request'

// 客户出入金统计报表
export async function getUserReportList(params?: PaymentReport.UserReportParams) {
  return request<API.Response<API.PageResult<PaymentReport.UserReportListItem>>>('/api/trade-payment/paymentApi/report/userReportList', {
    method: 'GET',
    params
  })
}
// 客户出入金统计报表-合计
export async function getUserReportCount(params?: PaymentReport.UserReportParams) {
  return request<API.Response<PaymentReport.UserReportListItem>>('/api/trade-payment/paymentApi/report/userReportCount', {
    method: 'GET',
    params
  })
}
// 客户出入金统计报表-导出
export async function exportUserReportList(params?: PaymentReport.UserReportParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/report/exportUserReportList', {
    method: 'GET',
    isExport: true,
    params
  })
}

// 渠道入金结算报表
export async function getChannelDepositReportList(params?: PaymentReport.ChannelDepositReportParams) {
  return request<API.Response<API.PageResult<PaymentReport.ChannelDepositReportListItem>>>(
    '/api/trade-payment/paymentApi/report/channelDepositReportList',
    {
      method: 'GET',
      params
    }
  )
}
// 渠道入金结算报表-合计
export async function getChannelDepositReportCount(params?: PaymentReport.ChannelDepositReportParams) {
  return request<API.Response<PaymentReport.ChannelDepositReportListItem>>(
    '/api/trade-payment/paymentApi/report/channelDepositReportCount',
    {
      method: 'GET',
      params
    }
  )
}
// 渠道入金结算报表-导出
export async function exportChannelDepositReportList(params?: PaymentReport.ChannelDepositReportParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/report/exportChannelDepositReportList', {
    method: 'GET',
    isExport: true,
    params
  })
}

// 渠道出金结算报表
export async function getChannelWithdrawalReportList(params?: PaymentReport.ChannelWithdrawalReportParams) {
  return request<API.Response<API.PageResult<PaymentReport.ChannelWithdrawalReportListItem>>>(
    '/api/trade-payment/paymentApi/report/channelWithdrawalReportList',
    {
      method: 'GET',
      params
    }
  )
}
// 渠道出金结算报表-合计
export async function getChannelWithdrawalReportCount(params?: PaymentReport.ChannelWithdrawalReportParams) {
  return request<API.Response<PaymentReport.ChannelWithdrawalReportListItem>>(
    '/api/trade-payment/paymentApi/report/channelWithdrawalReportCount',
    {
      method: 'GET',
      params
    }
  )
}
// 渠道出金结算报表-导出
export async function exportChannelWithdrawalReportList(params?: PaymentReport.ChannelWithdrawalReportParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/report/exportChannelWithdrawalReportList', {
    method: 'GET',
    isExport: true,
    params
  })
}

// 平台出入金核算报表
export async function getPlatformReportList(params?: PaymentReport.PlatformReportParams) {
  return request<API.Response<API.PageResult<PaymentReport.PlatformReportListItem>>>(
    '/api/trade-payment/paymentApi/report/platformReportList',
    {
      method: 'GET',
      params
    }
  )
}
// 平台出入金核算报表-合计
export async function getPlatformReportCount(params?: PaymentReport.PlatformReportParams) {
  return request<API.Response<PaymentReport.PlatformReportListItem>>('/api/trade-payment/paymentApi/report/platformReportCount', {
    method: 'GET',
    params
  })
}
// 平台出入金核算报表-导出
export async function exportPlatformReportList(params?: PaymentReport.PlatformReportParams) {
  return request<API.Response>('/api/trade-payment/paymentApi/report/exportPlatformReportList', {
    method: 'GET',
    isExport: true,
    params
  })
}
