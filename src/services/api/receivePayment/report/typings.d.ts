declare namespace PaymentReceiveReport {
  // 收款资源汇总报表-参数
  type ReceiveResourceReportListParams = {
    /**
     * 客户账号
     */
    account?: string
    /**
     * 支付凭证状态
     */
    certificateStatus?: string
    /**
     * 渠道类型
     */
    channelNo?: string
    /**
     * 创建结束时间
     */
    createEndTime?: string
    /**
     * 创建开始时间
     */
    createStartTime?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 订单号
     */
    orderNo?: string
    /**
     * 到账结束时间
     */
    receiptEndTime?: string
    /**
     * 到账开始时间
     */
    receiptStartTime?: string
    /**
     * 资源账号
     */
    resouceAccount?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 交易账户ID
     */
    tradeAccountId?: string
  }
  // 收款资源汇总报表-item
  type ReceiveResourceReportListItem = {
    /**
     * 账号
     */
    account?: string
    /**
     * 基准货币单位
     */
    baseCurrency?: string
    /**
     * 订单金额
     */
    baseOrderAmount?: number
    /**
     * 渠道类型
     */
    channelNo?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 汇率
     */
    exchangeRate?: number
    /**
     * 订单编号
     */
    orderNo?: string
    /**
     * 支付金额
     */
    receiptAmount?: number
    /**
     * 到账时间
     */
    receiptTime?: string
    /**
     * 资源账号
     */
    resouceAccount?: string
    /**
     * 法币
     */
    symbol?: string
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
  }
}
