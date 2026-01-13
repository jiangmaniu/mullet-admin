import { request } from '@/utils/request'

// API日志-分页
export async function getApiLogList(params: Log.APIListParams) {
  return request<API.Response<API.PageResult<Log.APIListItem>>>('/api/blade-log/logs/api/list', {
    method: 'GET',
    params
  })
}

// API日志-详情
export async function getApiLogDetail(params: API.IdParam) {
  return request<API.Response<Log.APIListItem>>('/api/blade-log/logs/api/detail', {
    method: 'GET',
    params
  })
}

// 错误日志-分页
export async function getErrorLogList(params: Log.ErrorLogListParams) {
  return request<API.Response<API.PageResult<Log.ErrorLogListItem>>>('/api/blade-log/logs/error/list', {
    method: 'GET',
    params
  })
}

// 错误日志-详情
export async function getErrorLogDetail(params: API.IdParam) {
  return request<API.Response<Log.ErrorLogListItem>>('/api/blade-log/logs/error/detail', {
    method: 'GET',
    params
  })
}

// 通用日志-分页
export async function getUsualLogList(params: Log.UsualLogListParams) {
  return request<API.Response<API.PageResult<Log.UsualLogListItem>>>('/api/blade-log/logs/usual/list', {
    method: 'GET',
    params
  })
}

// 通用日志-详情
export async function getUsualLogDetail(params: API.IdParam) {
  return request<API.Response<Log.UsualLogListItem>>('/api/blade-log/logs/usual/detail', {
    method: 'GET',
    params
  })
}
