import { request } from '@/utils/request'

// 版本-列表
export async function getVersionList(params: Version.VersionItemParams) {
  return request<API.Response<API.PageResult<Version.VersionItem>>>('/api/blade-system/api/version/list', {
    method: 'GET',
    params
  })
}

// 版本-详情
export async function getVersionDetail(params: API.IdParam) {
  return request<API.Response<Version.VersionItem>>(`/api/blade-system/api/version/${params.id}`, {
    method: 'GET'
  })
}

// 版本-新增
export async function addVersion(body: Version.SubmitVersionParams) {
  return request<API.Response>('/api/blade-system/api/version/add', {
    method: 'POST',
    data: body
  })
}

// 版本-更新
export async function updateVersion(body: Version.SubmitVersionParams) {
  return request<API.Response>('/api/blade-system/api/version/update', {
    method: 'POST',
    data: body
  })
}

// 版本-删除
export async function deleteVersion(body: API.IdParam) {
  return request<API.Response>(`/api/blade-system/api/version/delete/${body.id}?id=${body.id}`, {
    method: 'POST'
  })
}

// 版本-开关
export async function updateABSwitch(body: API.IdParam & { abControl: boolean }) {
  return request<API.Response>(`/api/blade-system/api/version/setAbControl/${body.id}?abControl=${body.abControl}`, {
    method: 'POST'
  })
}

// 版本-添加备注
export async function updateRemark(body: API.IdParam & { remark: string }) {
  return request<API.Response>(`/api/blade-system/api/version/remark/${body.id}`, {
    method: 'POST',
    data: body
  })
}

// 版本-区域列表
export async function getVersionRegionList() {
  return request<API.Response<Version.VersionRegionItem[]>>(`/api/blade-system/api/version/getRegionListTree`, {
    method: 'GET'
  })
}
