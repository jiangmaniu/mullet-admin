import { request } from '@/utils/request'

// 带单项目 - 列表
export async function getTradeFollowProjectPage(params?: TradeFollowProject.TradeFollowPageParams) {
  return request<API.Response<API.PageResult<TradeFollowProject.TradeFollowPageItem>>>('/api/trade-follow/followApi/admin/page', {
    method: 'GET',
    params
    // transformBigInt: true // 处理大数
  })
}

// 带单申请 - 审核
export async function tradeFollowSymbolAudit(body: TradeFollowProject.TradeFollowSymbolAuditParams) {
  return request<API.Response>('/api/trade-follow/followApi/admin/audit', {
    method: 'POST',
    data: body
  })
}

// 带单项目 - 设置
export async function tradeFollowSettings(body: TradeFollowProject.TradeFollowSettingsParams) {
  return request<API.Response>('/api/trade-follow/followApi/admin/settings', {
    method: 'POST',
    data: body
  })
}

// 带单项目 - 启用
// /trade-follow/followApi/admin/open
export async function tradeFollowOpen(query: { leadId: string }) {
  return request<API.Response>('/api/trade-follow/followApi/admin/open?leadId=' + query.leadId, {
    method: 'POST',
    data: {}
  })
}

// 带单项目 - 禁用/启用
// /trade-follow/followApi/admin/edit_enabled_switch
export async function tradeFollowEnabled(query: { leadId: string; enabledFlag: number }) {
  return request<API.Response>(
    '/api/trade-follow/followApi/admin/edit_enabled_switch?leadId=' + query.leadId + '&enabledFlag=' + query.enabledFlag,
    {
      method: 'POST',
      data: {}
    }
  )
}
