declare namespace AgentWithdrawalRecord {
  /**
   * 审核方式（人工审核，自动审核）
   */
  type ReviewMethod = 'MANUAL' | 'AUTO'

  /**
   * 订单状态(待处理,成功，拒绝)
   */
  type Status = 'WAIT' | 'SUCCESS' | 'FAIL'

  // 提现记录-分页-参数
  type withdrawalRecordPageListParams = {
    /**
     * 代理编号
     */
    agentId?: number
    /**
     * 金额
     */
    amount?: number
    /**
     * 当前页
     */
    current?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 剩余钱包余额
     */
    remainingBalance?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 审核方式（人工审核，自动审核）
     */
    reviewMethod?: ReviewMethod
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 订单状态(待处理,成功，拒绝)
     */
    status?: Status
    /**
     * 转入交易账户
     */
    tradeAccountId?: string
    /**
     * 姓名
     */
    userName?: string
    /**
     * 用户UID
     */
    userUid?: string
    /**
     * 时间
     */
    withdrawalTime?: string
  }
  // 提现记录-分页-item
  type withdrawalRecordPageListItem = {
    /**
     * 代理编号
     */
    agentId?: number
    /**
     * 金额
     */
    amount?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 剩余钱包余额
     */
    remainingBalance?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 审核方式（人工审核，自动审核）
     */
    reviewMethod?: ReviewMethod
    /**
     * 订单状态(待处理,成功，拒绝)
     */
    status?: Status
    /**
     * 转入交易账户
     */
    tradeAccountId?: string
    /**
     * 姓名
     */
    userName?: string
    /**
     * 用户UID
     */
    userUid?: string
    /**
     * 时间
     */
    withdrawalTime?: string
  }
  // 未提已提佣金统计
  type WithdrawalRecordCount = {
    /**
     * 未提现佣金
     */
    unWithdrawnCommission?: number
    /**
     * 已提现佣金
     */
    withdrawnCommission?: number
  }
  // 拒绝通过
  type refuseOrPassParams = {
    /**
     * 主键
     */
    id?: number
    /**
     * 状态
     */
    status?: 'REFUSE' | 'PASS'
    /**
     * 拒绝原因
     */
    remark?: string
  }
}
