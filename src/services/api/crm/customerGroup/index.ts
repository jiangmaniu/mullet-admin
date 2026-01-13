import qs from 'qs'

import { request } from '@/utils/request'

// 客户组-新增、删除
export async function submitClientGroup(body: CustomerGroup.AddOrUpdateParams) {
  return request<API.Response>('/api/trade-crm/crmApi/clientGroup/submit', {
    method: 'POST',
    data: body
  })
}

// 客户组-分页
export async function getClientGroupList(params?: API.PageParam) {
  return request<API.Response<API.PageResult<CustomerGroup.ListItem>>>('/api/trade-crm/crmApi/clientGroup/list', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.data?.records) {
      res.data.records = res.data.records.map((item) => {
        return {
          ...item,
          // 账户组id回显
          accountGroupId: item.accountGroupId?.split(',')
        }
      })
      return res
    }
  })
}

// 客户组-详情
export async function getClientGroupDetail(params: API.IdParam) {
  return request<API.Response<CustomerGroup.ListItem>>('/api/trade-crm/crmApi/clientGroup/detail', {
    method: 'GET',
    params
  })
}

// 客户组-删除
export async function removeClientGroup(body: { ids: string }) {
  return request<API.Response>(`/api/trade-crm/crmApi/clientGroup/remove?${qs.stringify(body)}`, {
    method: 'POST'
  })
}
