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
 * 链上交易信息
 */
export interface TxInfo {
  /** 交易哈希 */
  txHash: string
  /** 发起地址（Bridge 目标链 tx 为 null） */
  fromAddress: string | null
  /** 接收地址（Bridge 源链 tx 为 null） */
  toAddress: string | null
  /** 链网络：Solana / Ethereum / Tron / BSC / Arbitrum / Base */
  network: string
}

/**
 * 入金明细记录
 */
export interface DepositDetailRecord {
  /** 入金订单 ID */
  orderNo: string
  /** 通道订单 ID（Privy 直充为 null） */
  channelOrderId: string | null
  /** 通道名：privy / debridge / jupiter / rango / lifi / rocketx */
  channel: string
  /** 路由：Wallet（直充）/ Bridge（跨链）/ Swap */
  route: string
  /** 用户 ID */
  userId: string
  /** 交易账户 ID */
  tradeAccountId: string | null
  /** 发起地址 */
  fromAddress: string
  /** 发起链：SOL / ETH / TRON / BSC / ARB / BASE */
  fromChain: string
  /** 发起币种：USDC / USDT / SOL / ETH */
  fromToken: string
  /** 发起金额（USDC 小数，6位精度） */
  fromAmount: string
  /** 链上交易列表（Wallet/Swap 通常1条；Bridge 跨链有2条） */
  txList: TxInfo[]
  /** 实际到账 USDC（经滑点后的金额，6位精度） */
  arrivedAmountUsdc: string | null
  /** Gas 费（仅 Swap 路由有值） */
  gasFee: string | null
  /** Gas 费币种（SOL / ETH 等） */
  gasFeeToken: string | null
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

/**
 * TxHash 校验参数
 */
export interface ValidateTxHashParams {
  /** 链上交易 Hash */
  txHash: string
  /** 交易账户 ID */
  tradeAccountId: string
}

/**
 * TxHash 校验结果
 */
export interface ValidateTxHashResult {
  /** 是否有效 */
  valid: boolean
  /** 失败原因：WRONG_ACCOUNT / NOT_IN_DB */
  reason?: 'WRONG_ACCOUNT' | 'NOT_IN_DB'
  /** 错误消息 */
  msg?: string
  /** 入金 ID（校验通过时返回） */
  depositId?: string
  /** 接收地址 */
  toAddress?: string
  /** 金额 */
  amount?: string
  /** 链 ID */
  chainId?: string
  /** 代币 ID */
  tokenId?: string
  /** 状态 */
  status?: string
}

/**
 * 校验 TxHash 是否属于指定交易账户
 */
export async function validateTxHash(params: ValidateTxHashParams) {
  return financeRequest<ValidateTxHashResult>('/api/trade-payment/paymentApi/depositFillOrder/validateTxHash', {
    method: 'GET',
    params
  })
}

/**
 * 入金补单请求参数
 */
export interface DepositFillOrderParams {
  /** 交易账户 ID */
  tradeAccountId: string
  /** 交易账户入金地址 */
  tradeAccountAddress?: string
  /** 实际入金金额（USDC，6位小数精度） */
  actualAmount: number
  /** 链上交易 Hash */
  txHash?: string
  /** 是否已归集（必填） */
  isCollected: boolean
  /** 补单备注（最长 500 字符） */
  remark?: string
}

/**
 * 入金补单响应
 */
export interface DepositFillOrderResult {
  /** 补单订单号 */
  fillOrderNo: string
}

/**
 * 新增入金补单
 */
export async function saveDepositFillOrder(data: DepositFillOrderParams) {
  return financeRequest<DepositFillOrderResult>('/api/trade-payment/paymentApi/depositFillOrder/save', {
    method: 'POST',
    data
  })
}
