import { financeRequest } from '@/utils/finance-request'

/**
 * 基础筛选选项
 */
export interface FilterOption {
  value: string
  label: string
}

/**
 * 链选项
 */
export interface ChainOption extends FilterOption {
  chainLogoUrl: string
  depositEnabled: boolean
  withdrawalEnabled: boolean
}

/**
 * 币种选项
 */
export interface TokenOption extends FilterOption {
  logoUrl: string
  depositEnabled: boolean
  withdrawalEnabled: boolean
}

/**
 * 状态选项
 */
export interface StatusOption extends FilterOption {
  uiStatus: 'SUCCESS' | 'FAIL' | 'WAIT' | 'RECEIPT'
}

/**
 * 筛选选项响应
 */
export interface FilterOptionsResponse {
  channels: FilterOption[]
  chains: ChainOption[]
  tokens: TokenOption[]
  depositStatuses: StatusOption[]
  withdrawalStatuses: StatusOption[]
}

/**
 * 获取筛选选项配置
 */
export async function getFilterOptions() {
  return financeRequest<FilterOptionsResponse>(
    '/api/trade-payment/paymentApi/config/filterOptions',
    { method: 'GET' }
  )
}
