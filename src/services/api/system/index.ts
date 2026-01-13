import { request } from '@/utils/request'

// 系统参数-详情
export async function getSystemInfo() {
  return request<API.Response<System.TimeSettingInfo>>('/api/trade-core/coreApi/systemSet/detail', {
    method: 'GET'
  })
}

// 系统参数-修改
export async function updateSystemSet(body: System.TimeSettingInfo) {
  return request<API.Response<System.TimeSettingInfo>>('/api/trade-core/coreApi/systemSet/update', {
    method: 'POST',
    data: body
  })
}
