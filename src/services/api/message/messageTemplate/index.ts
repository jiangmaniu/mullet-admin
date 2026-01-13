import { request } from '@/utils/request'

// =================  消息模板 new start =================

// 消息模板-分页
export async function getMessageTemplateList(params: MessageTemplate.MessageTemplateListParams) {
  return request<API.Response<API.PageResult<MessageTemplate.MessageTemplateListItem>>>('/api/blade-message/message/messageTemplate/list', {
    method: 'GET',
    params
  })
}

// 消息模板详情
export async function getMessageTemplateDetail(params: API.IdParam) {
  return request<API.Response<MessageTemplate.MessageTemplateListItem>>('/api/blade-message/message/messageTemplate/detail', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.success && res.data) {
      res.data.code = (res.data.code || '').trim()
      // @ts-ignore
      res.data.type = (res.data.type || '').trim()
    }
    return res
  })
}

// 消息模板-新增
export async function submitMessageTemplate(body: MessageTemplate.SubmitMessageTemplateParams) {
  return request<API.Response>(`/api/blade-message/message/messageTemplate/submit`, {
    method: 'POST',
    data: body
  })
}

// 消息模板-删除
export async function removeMessageTemplate(body: API.IdParam) {
  return request<API.Response>(`/api/blade-message/message/messageTemplate/remove?ids=${body.id}`, {
    method: 'POST'
  })
}

// 消息模板-停用启用
export async function updateSwitch(body: { id: any; sendSwitch: boolean }) {
  return request<API.Response>(`/api/blade-message/message/messageTemplate/updateSwitch`, {
    method: 'POST',
    data: body
  })
}

// =================  消息模板 new end =================
