import { request } from '@/utils/request'

// 账户组列表
export async function accountGroupList() {
  return request<API.Response<AgentSettings.accountGroupListItem[]>>('/api/trade-agent/agentApi/settings/accountGroupList', {
    method: 'GET'
  }).then((res) => {
    if (res.data?.length) {
      const data = res.data.map((item) => ({
        ...item,
        label: item.groupName,
        value: item.id
      }))
      res.data = data
    }
    return res
  })
}

// 代理模式设置查询
export async function settingsQueryInfo() {
  return request<API.Response<AgentSettings.SettingsQueryInfo>>('/api/trade-agent/agentApi/settings/settingsQuery', {
    method: 'GET'
  }).then((res) => {
    if (res.data) {
      const data = res.data
      if (data.levelMode) {
        // @ts-ignore
        data.levelMode = res.data.levelMode?.split(',')
      }
      res.data = data
    }
    return res
  })
}

// 代理模式设置保存/更新
export async function agentSaveOrUpdate(body: AgentSettings.SaveOrUpdateAgentSettings) {
  return request<API.Response>('/api/trade-agent/agentApi/settings/saveOrUpdate', {
    method: 'POST',
    data: body
  })
}

// 代理模式设置查询
export async function tradeSymbolsTree(params: { accountGroupId: string }) {
  return request<API.Response<AgentSettings.TradeSymbolsTreeItem>>('/api/trade-agent/agentApi/settings/tradeSymbolsTree', {
    method: 'GET',
    params
  })
}
