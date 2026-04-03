import { financeRequest } from '@/utils/finance-request'

/**
 * 出金审批查询参数
 */
export interface WithdrawalApprovalParams {
  /** 审批状态：WAIT（待审批）/ SUCCESS（已通过）/ REJECT（已拒绝） / DONE（SUCCESS & REJECT） */
  status?: string
  /** 当前页 */
  current?: number
  /** 每页条数 */
  pageSize?: number
}

/**
 * 出金审批记录
 */
export interface WithdrawalApprovalRecord {
  /** 审批记录 ID */
  approvalId: string
  /** 出金订单 ID */
  orderNo: string
  /** 用户 ID */
  userId: string
  /** 出金金额（USDC 最小单位） */
  amount: string
  /** 币种 ID（如 SOL_USDC） */
  tokenId: string
  /** 链网络 */
  chainId: string
  /** 用户出金目标地址 */
  toAddress: string
  /** 交易账户 ID */
  tradeAccountId: string
  /** 审批状态：WAIT / SUCCESS / REJECT */
  status: string
  /** 第一签审批人 */
  approver: string
  /** 第一签时间（ms） */
  approverTime: number | null
  /** 第二签审批人 */
  approver2: string
  /** 第二签时间（ms） */
  approver2Time: number | null
  /** 拒绝原因 */
  reason: string
  /** 审批单创建时间（ms） */
  createTime: number
}

/**
 * 出金审批响应
 */
export interface WithdrawalApprovalResponse {
  records: WithdrawalApprovalRecord[]
  total: number
  current: number
  pageSize: number
  pages: number
}

/**
 * 获取出金审批列表
 */
export async function getWithdrawalApprovalList(params?: WithdrawalApprovalParams) {
  return financeRequest<WithdrawalApprovalResponse>('/api/trade-payment/paymentApi/withdrawl/withdrawalOrderApprovalList', {
    method: 'GET',
    params
  })
}

/**
 * 审批请求参数
 */
export interface ApprovalRequest {
  /** 审批单 ID 或出金订单 ID */
  orderNo: string
  /** 审批操作：approve（通过）/ reject（拒绝） */
  action: 'approve' | 'reject'
  /** 审批原因/拒绝理由（可选） */
  reason?: string
  /** 审批人标识（可选） */
  approver?: string
}

/**
 * 审批响应数据
 */
export interface ApprovalResponse {
  /** 审批记录 ID */
  approvalId: string
  /** 审批状态：APPROVE（审批通过）/ REJECT（审批拒绝） */
  status: 'APPROVE' | 'REJECT'
  /** 是否可以执行出金 */
  canExecute: boolean
  /** 提示消息 */
  message: string
}

/**
 * 提交审批（通过或拒绝）
 */
export async function submitApproval(data: ApprovalRequest) {
  return financeRequest<ApprovalResponse>('/api/trade-payment/paymentApi/withdrawl/approval', {
    method: 'POST',
    data
  })
}
