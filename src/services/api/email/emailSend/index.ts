import { request } from '@/utils/request'

// 发送邮件-分页
export async function getEmailSendList(params: EmailSend.EmailSendListParams) {
  return request<API.Response<API.PageResult<EmailSend.EmailSendListItem>>>('/api/blade-email/emailApi/emailSend/list', {
    method: 'GET',
    params
  })
}

// 邮箱发送记录详情
export async function getEmailSendDetail(params: API.IdParam) {
  return request<API.Response<EmailSend.EmailSendListItem>>('/api/blade-email/emailApi/emailSend/detail', {
    method: 'GET',
    params
  })
}

// 新建邮件-新增
export async function submitEmailSend(body: EmailSend.SubmitEmailSendParams) {
  return request<API.Response>(`/api/blade-email/emailApi/emailSend/save`, {
    method: 'POST',
    data: body
  })
}

// 邮件发送记录-删除
export async function removeEmailSend(body: API.IdParam) {
  return request<API.Response>(`/api/blade-email/emailApi/emailSend/remove?ids=${body.id}`, {
    method: 'POST'
  })
}
