import { request } from '@/utils/request'

// /trade-follow/followApi/admin/current_lead_order
// 带单人 - 当前仓位
export async function tradeFollowCurrentLeadOrder(params: TradeFollowLead.TradeFollowLeadOrderParams) {
  return request<API.Response<TradeFollowLead.TradeFollowCurrentLeadOrderItem>>('/api/trade-follow/followApi/admin/current_lead_order', {
    method: 'GET',
    params
  })
}

// /trade-follow/followApi/admin/history_lead_order
// 带单人 - 历史仓位
export async function tradeFollowHistoryLeadOrder(params: TradeFollowLead.TradeFollowLeadOrderParams) {
  return request<API.Response<TradeFollowLead.TradeFollowHistoryLeadOrderItem>>('/api/trade-follow/followApi/admin/history_lead_order', {
    method: 'GET',
    params
  })
}

// /trade-follow/followApi/admin/lead_profit_sharing
// 带单人 - 分润比例
export async function tradeFollowLeadProfitSharing(params: TradeFollowLead.TradeFollowLeadOrderParams) {
  return request<API.Response<TradeFollowLead.TradeFollowLeadProfitSharingItem>>('/api/trade-follow/followApi/admin/lead_profit_sharing', {
    method: 'GET',
    params
  })
}

// /trade-follow/followApi/admin/lead_profit_sharing_detail
// 带单人 - 分润详情
export async function tradeFollowLeadProfitSharingDetail(
  params: TradeFollowLead.TradeFollowLeadOrderParams & {
    date?: string
  }
) {
  return request<API.Response<TradeFollowLead.TradeFollowLeadProfitSharingDetailItem>>(
    '/api/trade-follow/followApi/admin/lead_profit_sharing_detail',
    {
      method: 'GET',
      params
    }
  )
}

// /trade-follow/followApi/admin/statistics
// 带单人 - 带单表现
export async function tradeFollowStatistics(params: { id: string; startDatetime: string; endDatetime: string }) {
  return request<API.Response<TradeFollowLead.TradeFollowLeadStatisticsItem>>('/api/trade-follow/followApi/admin/statistics', {
    method: 'GET',
    params
  })
}

// /trade-follow/followApi/admin/profit_statistics
// 带单人 - 累计盈亏
export async function tradeFollowProfitStatistics(params: { id: string; startDatetime: string; endDatetime: string }) {
  return request<API.Response<TradeFollowLead.TradeFollowLeadProfitStatisticsItem>>('/api/trade-follow/followApi/admin/profit_statistics', {
    method: 'GET',
    params
  })
}

// /trade-follow/followApi/admin/symbol_statistics
// 带单人 - 交易偏好
export async function tradeFollowSymbolStatistics(params: { id: string; startDatetime: string; endDatetime: string }) {
  return request<API.Response<TradeFollowLead.TradeFollowLeadSymbolStatisticsItem[]>>(
    '/api/trade-follow/followApi/admin/symbol_statistics',
    {
      method: 'GET',
      params
    }
  )
}

// /trade-follow/followApi/admin/lead_info
// 带单人 - 详情
export async function tradeFollowLeadInfo(params: { leadId: string }) {
  return request<API.Response<TradeFollowLead.TradeFollowLeadInfoItem>>('/api/trade-follow/followApi/admin/lead_info', {
    method: 'GET',
    params
  })
}

// /trade-follow/followApi/admin/list_leads
// 带单人 - 其他账户
export async function tradeFollowListLeads(params: { leadId: string }) {
  return request<API.Response<TradeFollowLead.TradeFollowLeadListItem>>('/api/trade-follow/followApi/admin/list_leads', {
    method: 'GET',
    params
  })
}
