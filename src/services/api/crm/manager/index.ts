import qs from 'qs'

import { request } from '@/utils/request'

// 经理用户-新增
export async function addManager(body: Manager.AddOrEditParams) {
  return request<API.Response>('/api/trade-crm/crmApi/manager/submit', {
    method: 'POST',
    data: body
  })
}

// 经理用户-更新
export async function updateManager(body: Manager.AddOrEditParams) {
  return request<API.Response>('/api/trade-crm/crmApi/manager/update', {
    method: 'POST',
    data: body
  })
}

// 经理用户-分页
export async function getManagerList(params?: Manager.ListItemParams) {
  return request<API.Response<API.PageResult<Manager.ListItem>>>('/api/trade-crm/crmApi/manager/list', {
    method: 'GET',
    params
  })
}

// 经理用户-详情
export async function getManagerDetail(params: API.IdParam) {
  return request<API.Response<Manager.ListItem>>('/api/trade-crm/crmApi/manager/detail', {
    method: 'GET',
    params
  })
}

// 经理用户-删除
export async function removeManager(body: { ids: string }) {
  return request<API.Response>(`/api/trade-crm/crmApi/manager/remove?${qs.stringify(body)}`, {
    method: 'POST'
  })
}

// 获取系统用户-角色树形结构
export async function getRoleTree() {
  return request<API.Response<Manager.RoleTreeItem[]>>('/api/trade-crm/crmApi/manager/role-function', {
    method: 'GET'
  })
}

// =========== 谷歌验证码 start ===============

// 登录成功验证谷歌验证码
export async function checkGoogleCode(params: { googleCode: string }) {
  return request<API.Response<boolean>>('/api/trade-crm/crmApi/manager/checkGoogleCode', {
    method: 'GET',
    params
  })
}

// 创建/获取谷歌验证秘钥
export async function createGoogleScret(body: { userId: string }) {
  return request<API.Response<Manager.createGoogleScretRes>>(`/api/trade-crm/crmApi/manager/createGoogleScret?userId=${body.userId}`, {
    method: 'POST'
    // data: body
  })
}

// 是否已绑定谷歌验证码
export async function isBindGoogleAuthCode(params: { userId: string }) {
  return request<API.Response<boolean>>('/api/trade-crm/crmApi/manager/isBind', {
    method: 'GET',
    skipErrorHandler: true,
    params
  })
}

// 重置谷歌验证码
export async function resetMchGoogle(body: { userId: string }) {
  return request<API.Response<boolean>>('/api/trade-crm/crmApi/manager/resetMchGoogle', {
    method: 'POST',
    data: body
  })
}

// 绑定谷歌验证码
export async function verifyGoogleScret(body: Manager.VerifyGoogleScretParams) {
  return request<API.Response<any>>('/api/trade-crm/trade-crm/crmApi/manager/verifyGoogleScret', {
    method: 'POST',
    data: body
  })
}

// =========== 谷歌验证码 end ===============
