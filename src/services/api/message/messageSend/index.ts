import { request } from '@/utils/request'

// =================  站内信消息 new start =================

// 发送站内信-分页
export async function getMessageSendList(params: MessageSend.MessageSendListParams) {
  return request<API.Response<API.PageResult<MessageSend.MessageSendListItem>>>('/api/blade-message/message/messageSend/list', {
    method: 'GET',
    params
  })
}

// 站内信发送记录详情
export async function getMessageSendDetail(params: API.IdParam) {
  return request<API.Response<MessageSend.MessageSendListItem>>('/api/blade-message/message/messageSend/detail', {
    method: 'GET',
    params
  })
}

// 新建站内信-新增
export async function submitMessageSend(body: MessageSend.SubmitMessageSendParams) {
  return request<API.Response>(`/api/blade-message/message/messageSend/save`, {
    method: 'POST',
    data: body
  })
}

// 新建站内信-删除
export async function removeMessageSend(body: API.IdParam) {
  return request<API.Response>(`/api/blade-message/message/messageSend/remove?ids=${body.id}`, {
    method: 'POST'
  })
}

// =================  站内信消息 new end =================
