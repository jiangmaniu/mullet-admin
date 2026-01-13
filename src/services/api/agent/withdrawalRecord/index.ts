import { request } from '@/utils/request'

// 分页
export async function withdrawalRecordPageList(params: AgentWithdrawalRecord.withdrawalRecordPageListParams) {
  return request<API.Response<API.PageResult<AgentWithdrawalRecord.withdrawalRecordPageListItem>>>(
    '/api/trade-agent/agentApi/withdrawalRecord/page',
    {
      method: 'GET',
      params
    }
  )
}

// 未提已提佣金统计
export async function withdrawalRecordCount(params: AgentWithdrawalRecord.withdrawalRecordPageListParams) {
  return request<API.Response<AgentWithdrawalRecord.WithdrawalRecordCount>>('/api/trade-agent/agentApi/withdrawalRecord/count', {
    method: 'GET',
    params
  })
}

// 审核拒绝或通过
export async function refuseOrPass(body: AgentWithdrawalRecord.refuseOrPassParams) {
  return request<API.Response>('/api/trade-agent/agentApi/withdrawalRecord/refuseOrPass', {
    method: 'POST',
    data: body
  })
}
