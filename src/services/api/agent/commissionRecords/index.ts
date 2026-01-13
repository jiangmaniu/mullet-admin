import { request } from '@/utils/request'

// 分页
export async function commissionRecordsPageList(params: AgentCommissionRecords.CommissionRecordsListParams) {
  return request<API.Response<API.PageResult<AgentCommissionRecords.CommissionRecordsListItem>>>(
    '/api/trade-agent/agentApi/commissionRecords/page',
    {
      method: 'GET',
      params
    }
  )
}

// 代理商返佣
export async function commissionRecordsCount(params: AgentCommissionRecords.CommissionRecordsListParams) {
  return request<API.Response<AgentCommissionRecords.CommissionRecordsCount>>(
    '/api/trade-agent/agentApi/commissionRecords/commissionRecordsCount',
    {
      method: 'GET',
      params
    }
  )
}

// 子代理返佣记录
export async function subUserCommissionRecordsList(params: { userId: any }) {
  return request<API.Response<AgentCommissionRecords.SubUserCommissionRecordsListItem>>(
    '/api/trade-agent/agentApi/commissionRecords/subUserList',
    {
      method: 'GET',
      params
    }
  )
}
