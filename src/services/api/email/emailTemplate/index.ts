import { request } from '@/utils/request'

// 邮箱模板-分页
export async function getEmailTemplateList(params: EmailTemplate.ListItemParams) {
  return request<API.Response<API.PageResult<EmailTemplate.EmailTemplateListItem>>>('/api/blade-email/emailApi/template/list', {
    method: 'GET',
    params
  })
}

// 邮箱模板详情
export async function getEmailTemplateDetail(params: API.IdParam) {
  return request<API.Response<EmailTemplate.EmailTemplateListItem>>('/api/blade-email/emailApi/template/detail', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.data && res.data.templateLanguageVOList?.length) {
      res.data.templateLanguageVOList = res.data.templateLanguageVOList?.map((item: any) => ({
        ...item,
        // content: Base64.decode(item.content)
        content: decodeURIComponent(item.content)
      }))
    }
    return res
  })
}

// 邮箱模板-新增
export async function submitEmailTemplate(body: EmailTemplate.SubmitEmailTemplateParams) {
  return request<API.Response>(`/api/blade-email/emailApi/template/submit`, {
    method: 'POST',
    data: body
  })
}

// 邮箱模板-删除
export async function removeEmailTemplate(body: API.IdParam) {
  return request<API.Response>(`/api/blade-email/emailApi/template/remove?ids=${body.id}`, {
    method: 'POST'
  })
}

// 邮箱模板-停用启用
export async function updateSwitch(body: { id: any; sendSwitch: boolean }) {
  return request<API.Response>(`/api/blade-email/emailApi/template/updateSwitch`, {
    method: 'POST',
    data: body
  })
}
