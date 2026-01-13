import { getUid } from '@/utils'
import { request } from '@/utils/request'

// 首充活动分页列表
export async function getActivityOrderPage(params: Activity.ListParams) {
  return request<API.Response<API.PageResult<Activity.ListItem>>>('/api/trade-activity/activityApi/order/activityOrderPage', {
    method: 'GET',
    params
  })
}

// 首充活动-详情
export async function getActivityOrderDetailList(params: Activity.DetailListItemParams) {
  return request<API.Response<API.PageResult<Activity.DetailListItem>>>(`/api/trade-activity/activityApi/order/activityOrderDetailPage`, {
    method: 'GET',
    params
  })
}

// 活动配置查询
export async function getFirstDepositConfigQuery() {
  return request<API.Response<Activity.ActivityConfig>>(`/api/trade-activity/activityApi/config/firstDepositConfigQuery`, {
    method: 'GET'
  }).then((res) => {
    if (res.success && res.data) {
      const varietyRewards = res.data?.varietyRewards
      if (varietyRewards) {
        let list = []
        try {
          list = JSON.parse(varietyRewards)
        } catch (e) {}
        // @ts-ignore
        res.data.varietyRewards = list.map((item) => {
          return {
            ...item,
            // 生成唯一id，用于表格删除
            id: getUid()
          }
        })
      }
    }
    return res
  })
}

// 活动配置保存/更新
export async function saveOrUpdateActivityConfig(body: Activity.SubmitActivityConfig) {
  return request<API.Response>('/api/trade-activity/activityApi/config/saveOrUpdate', {
    method: 'POST',
    data: body
  })
}

// 结束活动
export async function stopActivity(body: { id: any; status: boolean /**false 停止 */ }) {
  return request<API.Response>('/api/trade-activity/activityApi/order/stopActivity', {
    method: 'POST',
    data: body
  })
}
