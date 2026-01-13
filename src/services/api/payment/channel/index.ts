import { request } from '@/utils/request'

// 出入金渠道管理列表-分页
export async function getChannelConfigList(params?: PaymentChannel.ChannelConfigListParams) {
  return request<API.Response<API.PageResult<PaymentChannel.ChannelConfigListItem>>>('/api/trade-payment/paymentApi/channelConfig/list', {
    method: 'GET',
    params
  })
}

// 出入金渠道管理详情
export async function getChannelConfigDetail(params: API.IdParam) {
  return request<API.Response<PaymentChannel.ChannelConfigListItem>>('/api/trade-payment/paymentApi/channelConfig/detail', {
    method: 'GET',
    params
  }).then((res) => {
    const info = res.data
    if (info?.channelLanguageAddDTOList?.length) {
      info.channelLanguageAddDTOList = info.channelLanguageAddDTOList.map((item) => {
        const explanation = typeof item.explanation === 'string' ? JSON.parse(item.explanation) : []

        return {
          ...item,
          // 转成列表，回显数据
          explanation:
            Array.isArray(explanation) && explanation.length
              ? explanation
              : [
                  {
                    title: '',
                    content: ''
                  }
                ]
        }
      })
      res.data = info
    }
    return res
  })
}

// 新增渠道管理
export async function saveChannelConfig(body: PaymentChannel.SubmitChannelConfigParams) {
  return request<API.Response>(`/api/trade-payment/paymentApi/channelConfig/save`, {
    method: 'POST',
    data: body
  })
}

// 更新渠道管理
export async function updateChannelConfig(body: PaymentChannel.SubmitChannelConfigParams) {
  return request<API.Response>(`/api/trade-payment/paymentApi/channelConfig/update`, {
    method: 'POST',
    data: body
  })
}

// 渠道开关
export async function updateChannelConfigStatus(body: PaymentChannel.UpdateChannelConfigStatus) {
  return request<API.Response>(`/api/trade-payment/paymentApi/channelConfig/updateStatus`, {
    method: 'POST',
    data: body
  })
}

// 查询渠道商枚举
export async function getPaymentChannelType() {
  return request<API.Response<API.DictEnumItem[]>>('/api/trade-crm/crmClient/public/dictionaryTree/payment_channel_type', {
    method: 'GET'
  })
}
