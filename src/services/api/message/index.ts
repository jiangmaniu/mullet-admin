import { removeOrderMessageFieldNames } from '@/utils/business'
import { request } from '@/utils/request'

// 获取我接收的消息列表
export async function getMyMessageList(params?: API.PageParam) {
  return request<API.Response<API.PageResult<Message.MessageItem>>>('/api/blade-message/message/my/list', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.data?.records?.length) {
      res.data.records = res.data.records.map((item) => {
        if (item.content) {
          // 格式化消息内容
          item.content = removeOrderMessageFieldNames(item.content)
        }
        return item
      })
    }

    return res
  })
}

// 获取我接收详情
export async function getMyMessageInfo(params: API.IdParam) {
  return request<API.Response<Message.MessageItem>>('/api/blade-message/message/detail', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.data?.content) {
      // 格式化消息内容
      res.data.content = removeOrderMessageFieldNames(res.data.content)
    }
    return res
  })
}

// 全部标记为已读
export async function readAllMessage() {
  return request<API.Response<number>>(`/api/blade-message/message/readAll`, {
    method: 'POST',
    skipErrorHandler: true
  })
}

// 获取未读消息数量
export async function getUnReadMessageCount() {
  return request<API.Response>(`/api/blade-message/message/unReadSize`, {
    method: 'POST'
  })
}

// 删除消息
export async function removeMessage(params: { ids: any }) {
  return request<API.Response>(`/api/blade-message/message/remove?ids=${params.ids}`, {
    method: 'POST'
  })
}

// =========== 消息模板 ===========

// 消息模版-分页
export async function getMessageTemplateList(params: API.PageParam & { code?: string; title?: string }) {
  return request<API.Response<API.PageResult<Message.MessageTemplateItem>>>('/api/blade-message/message/messageTemplate/list', {
    method: 'GET',
    params
  })
}

// 消息模版-详情
export async function getMessageTemplateDetail(params: API.IdParam) {
  return request<API.Response<Message.MessageTemplateItem>>('/api/blade-message/message/messageTemplate/detail', {
    method: 'GET',
    params
  })
}

// 消息模版-删除
export async function removeMessageTemplate(params: { ids: any }) {
  return request<API.Response>(`/api/blade-message/message/messageTemplate/remove?ids=${params.ids}`, {
    method: 'POST'
  })
}

// 消息模版-新增或修改
export async function submitMessageTemplate(body: Message.SubmitMessageTemplateParams) {
  return request<API.Response>(`/api/blade-message/message/messageTemplate/submit`, {
    method: 'POST',
    data: body
  })
}
