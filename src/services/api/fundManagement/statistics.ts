import { financeRequest } from '@/utils/finance-request'

/**
 * 出入金统计总览数据结构
 */
export interface FundOverviewParams {
  /** 统计起始时间（ms），不填默认近 7 天 */
  startTime?: number
  /** 统计结束时间（ms） */
  endTime?: number
  /** hour / day / auto（默认，<3天→按小时，否则→按天） */
  granularity?: 'hour' | 'day' | 'auto'
}

export interface FundSummaryItem {
  /** 总额（最小单位） */
  total: string
  /** 总额可读格式（直接展示） */
  totalDisplay: string
  /** 上期总额（最小单位） */
  prevTotal: string
  /** 上期总额可读格式 */
  prevTotalDisplay: string
  /** 涨跌百分比 */
  changePercent: number | null
  /** 涨跌方向 */
  changeDirection: 'up' | 'down' | 'unchanged' | null
  /** 笔数 */
  count: number
  /** 上期笔数 */
  prevCount: number
}

export interface TimeSeriesItem {
  /** 时间点标签 */
  time: string
  /** 入金金额（最小单位） */
  depositAmount: string
  /** 入金金额可读格式 */
  depositAmountDisplay: string
  /** 出金金额（最小单位） */
  withdrawalAmount: string
  /** 出金金额可读格式 */
  withdrawalAmountDisplay: string
}

export interface TokenBreakdownItem {
  /** 币种标识，如 SOL_USDC */
  tokenId: string
  /** 金额（最小单位） */
  amount: string
  /** 金额可读格式 */
  amountDisplay: string
  /** Token 图标 URL（如 USDC logo；未配置时为空字符串） */
  logoUrl: string
  /** 链图标 URL（如 Solana/ETH/ARB logo；用于与 Token 图标叠加显示；未知链时为空字符串） */
  chainLogoUrl: string
}

export interface ChannelBreakdownItem {
  /** 通道标识（direct / swap / bridge_eth / bridge_tron 等） */
  channel: string
  /** 金额（最小单位） */
  amount: string
  /** 金额可读格式 */
  amountDisplay: string
}

export interface FundOverviewResponse {
  period: {
    startTime: number
    endTime: number
    granularity: string
  }
  /** 今日摘要（固定日历今日，不受查询参数影响） */
  todaySummary: {
    deposit: FundSummaryItem
    withdrawal: FundSummaryItem
  }
  /** 历史累计摘要 */
  allTimeSummary: {
    deposit: FundSummaryItem
    withdrawal: FundSummaryItem
  }
  timeSeries: TimeSeriesItem[]
  tokenBreakdown: {
    deposit: TokenBreakdownItem[]
    withdrawal: TokenBreakdownItem[]
  }
  channelBreakdown: {
    deposit: ChannelBreakdownItem[]
    withdrawal: ChannelBreakdownItem[]
  }
}

/**
 * 获取出入金统计总览数据
 */
export async function getFundOverview(params?: FundOverviewParams) {
  return financeRequest<FundOverviewResponse>(
    '/api/trade-payment/paymentApi/stats/overview',
    { method: 'GET', params }
  )
}
