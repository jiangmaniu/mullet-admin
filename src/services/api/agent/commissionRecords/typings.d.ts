declare namespace AgentCommissionRecords {
  /**
   * 结算状态（0-未结算；1-已结算）
   */
  type SettlementStatus = 'SETTLED' | 'UNSETTLED'

  /**
   * 交易方向（0-买入；1-卖出）
   */
  type TradeDirection = 'SELL' | 'BUY'

  // 返佣记录-分页-参数
  type CommissionRecordsListParams = {
    agentId?: any
    /**
     * 平仓时间
     */
    closeTime?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 交易手续费
     */
    handlingFee?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 开仓时间
     */
    openTime?: string
    /**
     * 订单号
     */
    orderNo?: string
    /**
     * 已实现盈亏
     */
    realizedProfitLoss?: number
    /**
     * 返佣佣金
     */
    rebateCommission?: number
    /**
     * 获得返佣客户
     */
    rebateCustomer?: string
    /**
     *
     * 奖劢方式（FIXED_AMOUNT-固定金额；NET_DEPOSIT_PERCENTAGE-净入金百分比；FEE_PERCENTAGE-手续费百分比；PROFIT_LOSS_PERCENTAGE-盈亏百分比）
     */
    rebateType?: AgentUser.RebateType
    /**
     * 结算状态（0-未结算；1-已结算）
     */
    settlementStatus?: SettlementStatus
    /**
     * 结算时间
     */
    settlementTime?: string
    /**
     * 预估结算时间
     */
    estimatedSettlementTime?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 交易账户
     */
    tradeAccountId?: number
    /**
     * 交易方向（0-买入；1-卖出）
     */
    tradeDirection?: TradeDirection
    /**
     * 交易手数
     */
    tradeVolume?: number
    /**
     * 客户姓名
     */
    userName?: string
    /**
     * 客户UID
     */
    userUid?: string
    /**跳传类型GC为产生佣金跳传，其它默认不填,可用值:GC */
    jumpType?: 'GC'
  }
  // 返佣记录-分页-item
  type CommissionRecordsListItem = {
    /**
     * 代理商ID
     */
    agentId?: number
    /**
     * 平仓时间
     */
    closeTime?: string
    /**
     * 交易手续费
     */
    handlingFee?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 返佣层级模式 (single,multiple)
     */
    levelMode?: string
    /**
     * 净入金
     */
    netDeposit?: number
    /**
     * 开仓时间
     */
    openTime?: string
    /**
     * 订单号
     */
    orderNo?: string
    /**
     * 已实现盈亏
     */
    realizedProfitLoss?: number
    /**
     * 返佣佣金
     */
    rebateCommission?: number
    /**
     * 获得返佣客户
     */
    rebateCustomer?: string
    /**
     *
     * 奖劢方式（FIXED_AMOUNT-固定金额；NET_DEPOSIT_PERCENTAGE-净入金百分比；FEE_PERCENTAGE-手续费百分比；PROFIT_LOSS_PERCENTAGE-盈亏百分比）
     */
    rebateType?: AgentUser.RebateType
    /**
     * 结算状态（UNSETTLED-未结算；SETTLED-已结算）
     */
    settlementStatus?: SettlementStatus
    /**
     * 结算时间
     */
    settlementTime?: string
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 交易账户
     */
    tradeAccountId?: number
    /**
     * 交易方向（BUY-买入；SELL-卖出）
     */
    tradeDirection?: TradeDirection
    /**
     * 交易手数
     */
    tradeVolume?: number
    /**
     * 客户姓名
     */
    userName?: string
    /**
     * 客户UID
     */
    userUid?: string
    /**
     * 返佣值
     */
    rebateValue?: number
  }
  // 代理商返佣统计
  type CommissionRecordsCount = {
    /**
     * 已实现盈亏
     */
    profitLossAmount?: number
    /**
     * 已结算佣金
     */
    settledCommission?: number
    /**
     * 交易量
     */
    tradingVolume?: number
    /**
     * 未结算佣金
     */
    unsettledCommission?: number
  }
  // 子代理返佣记录
  type SubUserCommissionRecordsListItem = {
    agentId?: number
    /**
     * 平仓时间
     */
    closeTime?: string
    /**
     * 交易手续费
     */
    handlingFee?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 开仓时间
     */
    openTime?: string
    /**
     * 订单号
     */
    orderNo?: string
    /**
     * 已实现盈亏
     */
    realizedProfitLoss?: number
    /**
     * 返佣佣金
     */
    rebateCommission?: number
    /**
     * 获得返佣客户
     */
    rebateCustomer?: string
    /**
     *
     * 奖劢方式（FIXED_AMOUNT-固定金额；NET_DEPOSIT_PERCENTAGE-净入金百分比；FEE_PERCENTAGE-手续费百分比；PROFIT_LOSS_PERCENTAGE-盈亏百分比）
     */
    rewardType?: AgentUser.RebateType
    /**
     * 结算状态（0-未结算；1-已结算）
     */
    settlementStatus?: SettlementStatus
    /**
     * 结算时间
     */
    settlementTime?: string
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 交易账户
     */
    tradeAccountId?: number
    /**
     * 交易方向（0-买入；1-卖出）
     */
    tradeDirection?: TradeDirection
    /**
     * 交易手数
     */
    tradeVolume?: number
    /**
     * 客户姓名
     */
    userName?: string
    /**
     * 客户UID
     */
    userUid?: string
  }
}
