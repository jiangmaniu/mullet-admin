import { financeRequest } from '@/utils/finance-request'

/**
 * 入金明细查询参数
 */
export interface DepositDetailParams {
  /** 入金订单 ID（精确） */
  orderNo?: string
  /** 通道订单 ID（精确） */
  channelOrderId?: string
  /** 通道：privy / debridge / jupiter / lifi / rango / rocketx */
  channel?: string
  /** 用户 ID */
  userId?: string
  /** 交易账户 ID */
  tradeAccountId?: string
  /** 发起地址 */
  fromAddress?: string
  /** 发起链网络（SOL / ETH / TRON / BSC / ARB / BASE） */
  fromChain?: string
  /** 发起币种（前缀模糊） */
  fromToken?: string
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
 * 入金明细记录
 */
export interface DepositDetailRecord {
  /** 入金订单 ID */
  orderNo: string
  /** 通道订单 ID */
  channelOrderId: string
  /** 通道名 */
  channel: string
  /** 路由：Wallet（直充）/ Bridge（跨链）/ Swap */
  route: string
  /** 用户 ID */
  userId: string
  /** 交易账户 ID */
  tradeAccountId: string
  /** 发起地址 */
  fromAddress: string
  /** 发起链 */
  fromChain: string
  /** 发起币种 */
  fromToken: string
  /** 发起金额 */
  fromAmount: string
  /** 链上 txHash */
  txHash: string
  /** 到账 USDC 金额 */
  arrivedAmountUsdc: string
  /** Gas 费 */
  gasFee: string
  /** Gas 费币种 */
  gasFeeToken: string
  /** 状态 */
  status: string
  /** UI 状态 */
  uiStatus: string
  /** 创建时间（ms） */
  createdAt: number
  /** 更新时间（ms） */
  updatedAt: number
  /** 完成时间（ms） */
  completedAt: number
}

/**
 * 入金明细响应
 */
export interface DepositDetailResponse {
  records: DepositDetailRecord[]
  total: number
  current: number
  pageSize: number
  pages: number
}

/**
 * 获取入金明细列表
 */
export async function getDepositDetailList(params?: DepositDetailParams) {
  return financeRequest<DepositDetailResponse>('/api/trade-payment/paymentApi/deposit/depositDetailList', {
    method: 'GET',
    params
  })
}
