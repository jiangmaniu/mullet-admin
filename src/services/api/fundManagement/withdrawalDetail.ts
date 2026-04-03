import { financeRequest } from '@/utils/finance-request'

import type { TxInfo } from './types'

/**
 * 出金明细查询参数
 */
export interface WithdrawalDetailParams {
  /** 出金订单 ID（精确） */
  orderNo?: string
  /** 通道订单 ID（精确） */
  channelOrderId?: string
  /** 通道：privy / debridge / jupiter / lifi / rango / rocketx */
  channel?: string
  /** 用户 ID */
  userId?: string
  /** 交易账户 ID */
  tradeAccountId?: string
  /** 接收地址 */
  toAddress?: string
  /** 接收链网络（SOL / ETH / TRON / BSC / ARB / BASE） */
  toChain?: string
  /** 接收币种（前缀模糊） */
  toToken?: string
  /** 状态：pending / submitted / processing / completed / failed */
  status?: string
  /** 开始时间（毫秒时间戳） */
  startTime?: number
  /** 结束时间（毫秒时间戳） */
  endTime?: number
  /** 当前页 */
  current?: number
  /** 每页条数 */
  pageSize?: number
  /** txHash */
  txHash?: string
}

/**
 * 出金明细记录
 */
export interface WithdrawalDetailRecord {
  /** 出金订单 ID */
  orderNo: string
  /** 通道订单 ID */
  channelOrderId: string | null
  /** 通道名：privy / debridge / jupiter / rango / lifi / rocketx */
  channel: string
  /** 路由：Wallet / Bridge / Swap */
  route: string
  /** 用户 ID */
  userId: string
  /** 交易账户 ID */
  tradeAccountId: string | null
  /** 接收地址 */
  toAddress: string
  /** 接收链：SOL / ETH / TRON / BSC / ARB / BASE */
  toChain: string
  /** 接收币种：USDC / USDT / SOL / ETH */
  toToken: string
  /** 发起金额（USDC 小数，6位精度） */
  fromAmountUsdc: string
  /** 交易哈希 */
  txHash: string | null
  /** 链上交易列表 */
  txList: TxInfo[]
  /** 实际到账金额 */
  arrivedAmount: string | null
  /** Gas 费（USDC） */
  gasFeeUsdc: string | null
  /** 状态：completed / confirmed / failed / pending / confirming */
  status: string
  /** UI 状态：SUCCESS / FAIL / WAIT */
  uiStatus: string
  /** 创建时间（ms） */
  createdAt: number | null
  /** 更新时间（ms） */
  updatedAt: number | null
  /** 完成时间（ms） */
  completedAt: number | null
}

/**
 * 出金明细响应
 */
export interface WithdrawalDetailResponse {
  records: WithdrawalDetailRecord[]
  total: number
  current: number
  pageSize: number
  pages: number
}

/**
 * 获取出金明细列表
 */
export async function getWithdrawalDetailList(params?: WithdrawalDetailParams) {
  return financeRequest<WithdrawalDetailResponse>('/api/trade-payment/paymentApi/withdrawl/withdrawalDetailList', {
    method: 'GET',
    params
  })
}
