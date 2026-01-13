import { request } from '@umijs/max'

/**
 * 获取财务汇总数据
 */
export async function getSettlementFinancialSummary() {
  return request<API.Result<any>>('/api/settlement/financial-summary', {
    method: 'GET'
  })
}

/**
 * 获取对账任务列表
 */
export async function getSettlementTasks(params: any) {
  return request<API.Result<API.PageResult<any>>>('/api/settlement/tasks', {
    method: 'GET',
    params
  })
}

/**
 * 获取对账任务详情
 */
export async function getSettlementTaskDetail(batchId: string) {
  return request<API.Result<any>>(`/api/settlement/tasks/${batchId}`, {
    method: 'GET'
  })
}

/**
 * 创建对账任务
 */
export async function createSettlementTask(data: any) {
  return request<API.Result<any>>('/api/settlement/tasks', {
    method: 'POST',
    data
  })
}

/**
 * 审核对账任务
 */
export async function approveSettlementTask(batchId: string, data: { approved: boolean; remarks?: string }) {
  return request<API.Result<any>>(`/api/settlement/tasks/${batchId}/approve`, {
    method: 'POST',
    data
  })
}

/**
 * 重新执行对账
 */
export async function retrySettlement(batchId: string) {
  return request<API.Result<any>>(`/api/settlement/tasks/${batchId}/retry`, {
    method: 'POST'
  })
}

/**
 * 获取审计日志
 */
export async function getAuditLogs(params: any) {
  return request<API.Result<API.PageResult<any>>>('/api/settlement/audit-logs', {
    method: 'GET',
    params
  })
}

/**
 * 导出对账数据
 */
export async function exportSettlementData(batchId: string) {
  return request(`/api/settlement/tasks/${batchId}/export`, {
    method: 'GET',
    responseType: 'blob'
  })
}

/**
 * 获取不一致项详情
 */
export async function getInconsistencies(batchId: string) {
  return request<API.Result<any[]>>(`/api/settlement/tasks/${batchId}/inconsistencies`, {
    method: 'GET'
  })
}
