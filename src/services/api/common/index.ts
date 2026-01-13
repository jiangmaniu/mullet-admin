import { getIntl } from '@umijs/max'

import { request } from '@/utils/request'

// 上传文件
export async function fileUpload(body: any) {
  return request<API.Response<Common.UploadResult>>('/api/blade-resource/oss/endpoint/put-file', {
    method: 'POST',
    data: body,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 查询顶部时区展示
export async function getTimeZone() {
  return request<API.Response>('/api/trade-crm/crmClient/public/param/trade.time-zone', {
    method: 'GET'
  })
}

// 查询手机区号选择
export async function getAreaCode() {
  return request<API.Response<Common.AreaCodeItem[]>>('/api/trade-crm/crmClient/public/countryList', {
    method: 'GET',
    needToken: true
  })
}

// 查询注册方式（客户组创建客户用到）
export async function getRegisterWay() {
  return request<API.Response<'EMAIL' | 'PHONE'>>('/api/trade-crm/crmClient/public/param/trade.recharge', {
    method: 'GET'
  })
}

// 查询交易品种分类列表
export async function getSymbolCategory() {
  return request<API.Response<API.KEYVALUE[]>>('/api/trade-crm/crmClient/public/dictBiz/symbol_classify', {
    method: 'GET'
  }).then((res) => {
    if (res.success && res.data?.length) {
      res.data = res.data.map((item) => ({
        ...item,
        value: item.key,
        label: getIntl().formatMessage({ id: `mt.${item.value.split(',').at(-1)}` })
      }))
    }
    return res
  })
}

// 查询预设的角色对应的权限
export async function getPresetsPermissions() {
  return request<API.Response<API.KEYVALUE[]>>('/api/trade-crm/crmClient/public/dictBiz/permissions', {
    method: 'GET'
  })
}

// 查询基础货币字典
export async function getBaseCurrencyDict() {
  return request<API.Response<API.KEYVALUE[]>>('/api/trade-crm/crmClient/public/dictBiz/base_currency', {
    method: 'GET'
  })
}

// 查询预付款货币字典
export async function getPrepaymentCurrencyDict() {
  return request<API.Response<API.KEYVALUE[]>>('/api/trade-crm/crmClient/public/dictBiz/prepayment_currency', {
    method: 'GET'
  })
}

// 查询盈利货币字典
export async function getProfitCurrencyDict() {
  return request<API.Response<API.KEYVALUE[]>>('/api/trade-crm/crmClient/public/dictBiz/profit_currency', {
    method: 'GET'
  })
}

// 模板code枚举
export async function getMessageTemplateCode() {
  return request<API.Response<API.KEYVALUE[]>>('/api/trade-crm/crmClient/public/dictBiz/message_type', {
    method: 'GET'
  }).then((res) => {
    if (res.success && res.data?.length) {
      // @ts-ignore
      res.data = res.data
        .map((item) => {
          let value = {}
          try {
            value = JSON.parse(item.value)
          } catch (error) {}
          const key = (item.key || '').trim()
          // @ts-ignore
          let sendType = value?.type
          if (sendType) {
            const sendTypeKey = (sendType.key || '').trim()
            sendType = [
              {
                value: sendTypeKey,
                label: getIntl().formatMessage({ id: `mt.enum.${sendTypeKey}` })
              }
            ]
          }
          return {
            value: key,
            // 根据key翻译多语言
            label: getIntl().formatMessage({ id: `mt.enum.${key}` }),
            sendType
          }
        })
        .filter((item) => item.value)
    }
    return res
  })
}
