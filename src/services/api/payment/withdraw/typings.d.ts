declare namespace PaymentWithdraw {
  /**
   * 审批状态
   */
  type ApprovalType = 'WAIT' | 'SUCCESS' | 'REJECT'
  /**出金订单状态 */
  type WithdrawalOrderStatus =
    /**待审核 */
    | 'WAIT'
    /**审核通过 */
    | 'SUCCESS'
    /**拒绝 */
    | 'REJECT'
    /**已到账 */
    | 'RECEIPT'
    /**失败 */
    | 'FAIL'
  /**
   * 支付类型（OTC，CHAIN）
   */
  type PaymentType = 'OTC' | 'CHAIN'
  // 出金审批列表-参数
  type WithdrawalOrderApprovalParams = {
    /**
     * 账户号
     */
    account?: string
    /**
     * 订单编号
     */
    orderNo?: string
    /**
     * 订单状态（0待审核，1审核通过 2拒绝 3已到账 4失败）
     */
    status?: WithdrawalOrderStatus
    /**
     * 交易账户
     */
    tradeAccountId?: number
  } & API.PageParam
  // 出金审批列表-item
  type WithdrawalOrderApprovalListItem = {
    /**
     * 客户账户
     */
    account?: string
    /**
     * 转账地址
     */
    address?: string
    /**
     * 审批人
     */
    approver?: string
    /**
     * 审批时间
     */
    approverTime?: Date
    /**
     * 出金后余额
     */
    balance?: number
    /**
     * 银行卡账号
     */
    bankCard?: string
    /**
     * 银行卡名称
     */
    bankName?: string
    /**
     * 基准货币单位
     */
    baseCurrency?: string
    /**
     * 平台手续费
     */
    baseHandlingFee?: number
    /**
     * 订单金额
     */
    baseOrderAmount?: number
    /**
     * 支付（到账）金额
     */
    baseReceiptAmount?: number
    /**
     * 渠道手续费
     */
    channelBaseHandlingFee?: number
    /**
     * 渠道汇率
     */
    channelExchangeRate?: number
    /**
     * 渠道收取金额
     */
    channelFee?: number
    /**
     * 渠道订ID
     */
    channelId?: string
    /**
     * 支付渠道名称
     */
    channelName?: string
    /**
     * 通道编号
     */
    channelNo?: string
    /**
     * 通道编号字典值
     */
    channelNoValue?: string
    /**
     * 渠道订单编号
     */
    channelOrderNo?: string
    /**
     * 支付渠道类型
     */
    channelType?: string
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 汇差收费
     */
    exchangeDifferenceFee?: number
    /**
     * 汇差收取百分比
     */
    exchangeDifferencePercentage?: number
    /**
     * 兑换汇率
     */
    exchangeRate?: number
    /**
     * 账户组CODE
     */
    groupCode?: string
    /**
     * 账号组名称
     */
    groupName?: string
    /**
     * 平台手续费
     */
    handlingFee?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 订单金额
     */
    orderAmount?: number
    /**
     * 订单编号
     */
    orderNo?: string
    /**
     * 支付类型（OTC，CHAIN）
     */
    paymentType?: PaymentType
    /**
     * 支付（到账）金额
     */
    receiptAmount?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 出金订单状态
     */
    status?: WithdrawalOrderStatus
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 交易hash
     */
    txid?: string
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 用户ID
     */
    userId?: number
    /**
     * 客户姓名
     */
    userName?: string
  }
  // 出金订单查询-参数
  type WithdrawalOrderPageListParams = {
    /**
     * 账户号
     */
    account?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 订单号
     */
    orderNo?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 订单状态
     */
    status?: WithdrawalOrderStatus
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
  } & API.PageParam
  // 出金订单查询-item
  type WithdrawalOrderPageListItem = {
    /**
     * 客户账户
     */
    account?: string
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 收款账户
     */
    address?: string
    /**
     * 审批人
     */
    approver?: string
    /**
     * 基准货币单位
     */
    baseCurrency?: string
    /**
     * 渠道汇率
     */
    channelExchangeReate?: number
    /**
     * 渠道收取金额
     */
    channelFee?: number
    /**
     * 渠道订单编号
     */
    channelOrderNo?: string
    /**
     * 出金渠道
     */
    channelType?: string
    /**
     * 出金渠道
     */
    channelName?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 兑换汇率
     */
    exchangeRate?: number
    /**
     * 手续费
     */
    handlingFee?: number
    /**
     * 基准货币手续费
     */
    baseHandlingFee?: number
    /**
     * ID
     */
    id?: number
    /**
     * 订单金额
     */
    orderAmount?: number
    /**
     * 订单编号
     */
    orderNo?: string
    /**
     * 支付（到账）金额
     */
    receiptAmount?: number
    /**
     * 订单状态
     */
    status?: WithdrawalOrderStatus
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 更新时间
     */
    updateTime?: string
  }
  // 出金管理审批通过/拒绝
  type ApproveWithdrawlParams = {
    /**
     * 审批类型
     */
    approvalType?: 'PASS' | 'FAIL'
    /**
     * 出金订单ID
     */
    id?: number
    /**
     * 拒绝原因
     */
    remark?: string
  }
}
