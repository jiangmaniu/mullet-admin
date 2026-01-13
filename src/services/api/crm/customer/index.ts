import qs from 'qs'

import { request } from '@/utils/request'

// 客户用户-新增
export async function addClient(body: Customer.AddOrUpdateParams) {
  return request<API.Response>('/api/trade-crm/crmApi/client/submit', {
    method: 'POST',
    data: body
  })
}

// 客户用户-修改
export async function updateClient(body: Customer.AddOrUpdateParams) {
  return request<API.Response>('/api/trade-crm/crmApi/client/update', {
    method: 'POST',
    data: body
  })
}

// 客户用户-分页
export async function getClientList(params: Customer.ListItemParams) {
  if (params?.isKycAuth) {
    params.isKycAuth = params?.isKycAuth === 'true' ? true : false
  }
  if (params.isBankcardBind) {
    params.isBankcardBind = params?.isBankcardBind === 'true' ? true : false
  }
  return request<API.Response<API.PageResult<Customer.ListItem>>>('/api/trade-crm/crmApi/client/list', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.success && res.data?.records?.length) {
      res.data.records = res.data.records.map((item) => {
        // @ts-ignore
        item.kycAuth = item.kycAuth?.[0]
        // @ts-ignore
        item.bankCardAuth = item.bankCardAuth?.[0]
        // @ts-ignore
        item.createTime = item.userInfo?.createTime
        return item
      })
    }
    return res
  })
}

// 客户用户-详情
export async function getClientDetail(params: API.IdParam) {
  return request<API.Response<Customer.ListItem>>('/api/trade-crm/crmApi/client/detail', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.success && res?.data) {
      const data = res.data
      // @ts-ignore
      data.kycAuth = data.kycAuth?.[0]
      // @ts-ignore
      data.bankCardAuth = data.bankCardAuth?.[0]

      if (data?.accountList?.length) {
        data.accountList = data.accountList.map((item) => {
          if (item.synopsis) {
            item.synopsis = JSON.parse(item.synopsis as any)
            // 兼容旧数据
            if (!Array.isArray(item.synopsis)) {
              item.synopsis = []
            }
          }
          return item
        })
      }

      res.data = data
    }
    return res
  })
}

// 客户用户-删除
export async function removeClient(body: { ids?: string }) {
  return request<API.Response>(`/api/trade-crm/crmApi/client/remove?${qs.stringify(body)}`, {
    method: 'POST'
  })
}

// 延时成交客户-分页
export async function getDelayUserList(params: { accountEmailPhone?: string } & API.PageParam) {
  return request<API.Response<API.PageResult<Customer.DelayuserListItem>>>('/api/trade-core/coreApi/delayUser/page', {
    method: 'GET',
    params
  })
}

// 延时成交客户-详情
export async function getDelayUserDetail(params: API.IdParam) {
  return request<API.Response<Customer.DelayuserListItem>>('/api/trade-core/coreApi/delayUser/detail', {
    method: 'GET',
    params
  })
}

// 延时成交客户-新增
export async function addDelayUser(body: Customer.AddDeplayUserParams) {
  return request<API.Response<any>>(`/api/trade-core/coreApi/delayUser/add?${qs.stringify(body)}`, {
    method: 'POST'
    // data: body
  })
}

// 延时成交客户-删除
export async function removeDelayUser(body: API.IdParam) {
  return request<API.Response<any>>(`/api/trade-core/coreApi/delayUser/remove?ids=${body.id}`, {
    method: 'POST'
  })
}
