declare namespace PaymentDeposit {
  /**
   * 订单状态
   */
  type OrderStatus =
    /**待支付 */
    | 'WAIT'
    /**支付成功 */
    | 'SUCCESS'
    /**支付失败 */
    | 'FAIL'
  // 入金订单列表参数
  type depositOrderListPageParams = {
    /**
     * 账号
     */
    account?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 结束时间
     */
    endTime?: string
    /**
     * 订单号
     */
    orderNo?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 开始时间
     */
    startTime?: string
    /**
     * 订单状态
     */
    status?: OrderStatus
    /**
     * 交易账户ID
     */
    tradeAccountId?: string
  }
  // 入金订单列表
  type depositOrderListItem = {
    /**
     * 账号
     */
    account?: string
    /**
     * 基准货币单位
     */
    baseCurrency?: string
    /**
     * 基准货币订单金额
     */
    baseOrderAmount?: string
    /**
     * 渠道结算汇率
     */
    channelExchangeRate?: number
    /**兑换汇率 */
    exchangeRate?: number
    /**
     * 渠道订单编号
     */
    channelOrderNo?: string
    /**
     * 渠道展示名称
     */
    channelRevealName?: string
    /**
     * 支付渠道
     */
    channelType?: string
    channelName?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 账户组CODE
     */
    groupCode?: string
    /**
     * 订单金额
     */
    orderAmount?: string
    /**
     * 订单编号
     */
    orderNo?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 订单状态
     */
    status?: OrderStatus
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * userId
     */
    userId?: number
    /**凭证地址 */
    certificateUrl?: string
    /**基准货币支付金额 */
    baseReceiptAmount?: number
    /**法币支付金额 */
    receiptAmount?: number
    /**法币单位 */
    symbol?: string
    /**法币手续费 */
    handlingFee?: number
    /**基准货币手续费 */
    baseHandlingFee?: number
  }
  type DepositOrderByOrderNoListItem = {
    /**
     * 客户账户
     */
    account?: string
    /**
     * 充值地址
     */
    address?: string
    /**
     * 基准货币手续费
     */
    baseHandlingFee?: number
    /**
     * 基准货币订单金额
     */
    baseOrderAmount?: number
    /**
     * 渠道入账金额
     */
    channelAccountAmount?: number
    /**
     * 渠道结算汇率
     */
    channelExchangeRate?: number
    /**
     * 渠道ID
     */
    channelId?: number
    /**
     * 支付渠道名称
     */
    channelName?: string
    /**
     * 渠道回调订单编号
     */
    channelOrderNo?: string
    /**
     * 渠道结算货币基准
     */
    channelSettlementCurrency?: string
    /**
     * 支付渠道类型
     */
    channelType?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 汇差收取百分比
     */
    exchangeDifferencePercentage?: number
    /**
     * 汇率
     */
    exchangeRate?: number
    /**
     * 账户组组CODE
     */
    groupCode?: string
    /**
     * 账户组名称
     */
    groupName?: string
    /**
     * 手续费
     */
    handlingFee?: number
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
     * 到账时间
     */
    receiptTime?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 订单状态（1待支付 2支付成功3支付失败）
     */
    status?: OrderStatus
    /**
     * 币种
     */
    symbol?: string
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 用户ID
     */
    userId?: number
    /**
     * 客户单笔固定手续费
     */
    userSingleFixedFee?: number
    /**
     * 客户单笔最低手续费
     */
    userSingleLeastFee?: number
    /**
     * 客户交易百分比手续费
     */
    userTradePercentageFee?: number
  }
}
