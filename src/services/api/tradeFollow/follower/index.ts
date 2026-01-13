// /trade-follow/followApi/admin/current_follower_order

import { request } from '@/utils/request'

// 跟单 - 当前跟单
export async function tradeFollowCurrentFollowerOrder(params: TradeFollowFollower.TradeFollowFollowerOrderParams) {
  return request<API.Response<TradeFollowFollower.TradeFollowFollowerOrderItem>>(
    '/api/trade-follow/followApi/admin/current_follower_order',
    {
      method: 'GET',
      params
    }
  )
}
// /trade-follow/followApi/follower/current_follower_order
// 跟单人 api - 当前跟单
export async function tradeFollowFollowerCurrentFollowerOrder(params: TradeFollowFollower.TradeFollowFollowerOrderParams) {
  return request<API.Response<TradeFollowFollower.TradeFollowFollowerOrderItem>>(
    '/api/trade-follow/followApi/follower/current_follower_order',
    {
      method: 'GET',
      params
    }
  )
}

// /trade-follow/followApi/admin/history_follower_order
// 跟单人 api - 历史跟单
export async function tradeFollowFollowerHistoryFollowerOrder(params: TradeFollowFollower.TradeFollowFollowerOrderParams) {
  return request<API.Response<TradeFollowFollower.TradeFollowFollowerOrderItem>>(
    '/api/trade-follow/followApi/admin/history_follower_order',
    {
      method: 'GET',
      params
    }
  )
}
