import { request } from '@/utils/request'

// 绑定代理
export async function bindAgent(body: AgentUser.BindAgentParams) {
  return request<API.Response>('/api/trade-agent/agentApi/users/bindAgent', {
    method: 'POST',
    data: body
  })
}

// 添加代理
export async function addAgent(body: AgentUser.AddAgentParams) {
  return request<API.Response>('/api/trade-agent/agentApi/users/saveAgent', {
    method: 'POST',
    data: body
  })
}

// 返佣配置修改
export async function updateRebateConfig(body: AgentUser.UpdateRebateConfigParams) {
  return request<API.Response>('/api/trade-agent/agentApi/users/rebateConfigUpdate', {
    method: 'POST',
    data: body
  })
}

// 等级配置列表
export async function levelConfigList() {
  return request<API.Response<AgentUser.LevelListItem[]>>('/api/trade-agent/agentApi/users/levelConfigList', {
    method: 'GET'
  })
}

// 多层级配置列表
export async function multiLevelConfigList() {
  return request<API.Response<AgentUser.MultiLevelConfigListItem[]>>('/api/trade-agent/agentApi/users/multiLevelConfigList', {
    method: 'GET'
  })
}

// 代理等级返佣配置列表
export async function levelRebateConfigList(params: { levelId: any }) {
  if (!params.levelId) return null
  return request<API.Response<AgentUser.LevelRebateConfigListItem[]>>('/api/trade-agent/agentApi/users/levelRebateConfigList', {
    method: 'GET',
    params
  })
}

// 代理用户列表分页
export async function agentUserPageList(params: AgentUser.AgentUserPageListParams) {
  return request<API.Response<API.PageResult<AgentUser.AgentUserPageListItem>>>('/api/trade-agent/agentApi/users/page', {
    method: 'GET',
    params
  })
}

// 所有用户列表分页
export async function queryUsersPageList(params: AgentUser.AgentUserPageListParams) {
  return request<API.Response<API.PageResult<AgentUser.AgentUserPageListItem>>>('/api/trade-agent/agentApi/users/userPage', {
    method: 'GET',
    params
  })
}

// 所有用户统计
export async function queryUserCount(params: AgentUser.AgentUserPageListParams) {
  return request<API.Response<AgentUser.UserCount>>('/api/trade-agent/agentApi/users/userCount', {
    method: 'GET',
    params
  })
}

// 子用户列表查询
export async function subUserListQueryList(params: { userId: any; startTime?: any; endTime?: any }) {
  return request<API.Response<AgentUser.SubUserListQueryListItem[]>>('/api/trade-agent/agentApi/users/subUserListQuery', {
    method: 'GET',
    params
  })
}

// 返佣标准查询
export async function rebateStandardsQueryList(params: { userId: any }) {
  return request<API.Response<AgentUser.RebateStandardsQueryListItem>>('/api/trade-agent/agentApi/users/rebateStandardsQuery', {
    method: 'GET',
    params
  })
}

// 代理商统计
export async function queryAgentCount(params: AgentUser.AgentUserPageListParams) {
  return request<API.Response<AgentUser.AgentCount>>('/api/trade-agent/agentApi/users/agentCount', {
    method: 'GET',
    params
  })
}
