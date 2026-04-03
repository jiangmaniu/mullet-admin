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
