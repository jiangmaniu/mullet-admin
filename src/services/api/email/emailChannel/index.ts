import { getUid } from '@/utils'
import { request } from '@/utils/request'

// 邮件通道-分页
export async function getEmailChannelList(params: EmailChannel.ListItemParams) {
  return request<API.Response<API.PageResult<EmailChannel.EmailChannelListItem>>>('/api//blade-email/emailApi/emailChannel/list', {
    method: 'GET',
    params
  })
}

// 邮件通道详情
export async function getEmailChannelDetail(params: API.IdParam) {
  return request<API.Response<EmailChannel.EmailChannelListItem>>('/api/blade-email/emailApi/emailChannel/detail', {
    method: 'GET',
    params
  }).then((res) => {
    if (res.success) {
      const data = res.data
      const configInfo = data?.configInfo

      if (configInfo) {
        try {
          // @ts-ignore
          const conf = JSON.parse(configInfo) || {}
          // 对象转数组
          // @ts-ignore
          data.configInfo = Object.entries(conf)
            .map(([key, value]) => ({ key, value }))
            .map((item) => ({ ...item, id: getUid() }))
        } catch (e) {}
      } else {
        // @ts-ignore
        data.configInfo = []
      }

      res.data = data
    }
    return res
  })
}

// 邮件通道-新增
export async function submitEmailChannel(body: EmailChannel.SubmitEmailChannelParams) {
  return request<API.Response>(`/api/blade-email/emailApi/emailChannel/saveOrUpdate`, {
    method: 'POST',
    data: body
  })
}

// 邮件通道-删除
export async function removeEmailChannel(body: API.IdParam) {
  return request<API.Response>(`/api/blade-email/emailApi/emailChannel/remove?ids=${body.id}`, {
    method: 'POST'
  })
}

// 邮箱通道-停用启用
export async function updateEmailStatus(body: EmailChannel.UpdateEmailStatus) {
  return request<API.Response>(`/api/blade-email/emailApi/emailChannel/updateStatus`, {
    method: 'POST',
    data: body
  })
}

// channelTypeCode枚举
export async function getChannelTypeCode() {
  return request<API.Response<EmailChannel.channelTypeItem[]>>('/api/trade-crm/crmClient/public/dictBiz/email_channel_type', {
    method: 'GET'
  }).then((res) => {
    if (res.success) {
      res.data = (res.data || [])
        .map((item: any) => {
          let value = {} as any
          try {
            value = JSON.parse(item.value)
          } catch (e) {}
          return {
            label: value?.key,
            value: value?.key,
            params: (value?.param || []).map((key: string) => ({ key, value: '', id: getUid() }))
          }
        })
        .filter((item) => item.value)
    }
    return res
  })
}
