declare namespace PaymentDepositFillOrder {
  /**
   * 补单状态
   */
  type FillOrderStatus =
    /**待回调 */
    | 'WAIT_CALLBACK'
    /**已到账 */
    | 'RECEIPT'

  // 入金补单查询-分页参数
  type DepositFillOrderParams = {
    /**
     * 客户账户
     */
    account?: string
    /**
     * 补单订单号
     */
    fillOrderNo?: string
    /**
     * 补单状态（1待回调 2已到账）
     */
    status?: FillOrderStatus
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
  } & API.PageParam
  type DepositFillOrderListItem = {
    /**
     * 客户账户
     */
    account?: string
    /**
     * 实际转入金额
     */
    actualAmount?: number
    /**
     * 原订单金额
     */
    baseOrderAmount?: number
    /**
     * 渠道订单号
     */
    channelOrderNo?: string
    /**
     * 支付渠道类型
     */
    channelType?: string
    channelName?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 补单订单号
     */
    fillOrderNo?: string
    id?: number
    /**
     * 订单金额法币
     */
    orderAmount?: number
    /**
     * 到账金额-法币
     */
    receiptAmount?: number
    /**
     * 到账金额-基准货币
     */
    baseReceiptAmount?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 补单状态
     */
    status?: FillOrderStatus
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 入金交易账号
     */
    tradingAccount?: string
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 用户订单号
     */
    userOrderNo?: string
    /**
     * 交易凭证图片
     */
    voucherPicture?: string
    /**基准货币单位 */
    baseCurrency?: string
    /**法币单位 */
    symbol?: string
    /**补单后金额 */
    baseActualAmount?: number
  }
  type SaveDepositFillOrderParams = {
    /**
     * 实际转入金额
     */
    actualAmount?: number
    /**
     * 补单备注
     */
    remark?: string
    /**
     * 入金交易账号
     */
    tradingAccountId?: string
    /**
     * 客户入金订单号
     */
    userOrderNo?: string
    /**
     * 凭证图片，多张用逗号隔开
     */
    voucherPicture?: string
  }
  type UpdateDepositFillOrderParams = SaveDepositFillOrderParams & API.IdParam
}
