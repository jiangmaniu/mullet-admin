declare namespace TradeFollowFollower {
  type TradeFollowFollowerOrderParams = {
    /**
     * 订单保证金
     */
    endTime?: Date
    /**
     * 订单保证金
     */
    followerId?: number
    /**
     * 跟单订单Id
     */
    followerOrderId?: number
    /**
     * 跟单类型：10 表示固定金额，20 表示固定比例
     */
    followerType?: number
    /**
     * 订单保证金
     */
    leadId?: string
    /**
     * 订单保证金
     */
    startTime?: Date
    /**
     * 交易账户Id
     */
    tradeAccountId?: string
  } & API.PageParam

  /**
   * api: tradeFollowCurrentFollowerOrder
   * 跟单 - 当前跟单
   */
  type TradeFollowFollowerOrderItem = {
    /**
     * 别名
     */
    alias?: string
    /**
     * 订单方向
     */
    buySell?: string
    /**
     * 分类
     */
    classify?: string
    /**
     * 平仓价格
     */
    closePrice?: number
    /**
     * 配置
     */
    conf?: string
    /**
     * 数据源code
     */
    dataSourceCode?: string
    /**
     * 数据源Symbol
     */
    dataSourceSymbol?: string
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 图标
     */
    imgUrl?: string
    /**
     * 库存费
     */
    interestFees?: number
    /**
     * 杠杆倍数
     */
    leverageMultiple?: number
    /**
     * 保证金类型
     */
    marginType?: string
    /**
     * 订单模式
     */
    mode?: string
    /**
     * 订单基础保证金
     */
    orderBaseMargin?: number
    /**
     * 订单保证金
     */
    orderMargin?: number
    /**
     * 订单数量
     */
    orderVolume?: number
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 开仓均价
     */
    startPrice?: number
    /**
     * 止损
     */
    stopLoss?: number
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 品种组配置ID
     */
    symbolConfId?: number
    /**
     * 品种小数位
     */
    symbolDecimal?: number
    /**
     * 品种组ID
     */
    symbolGroupId?: number
    /**
     * 止盈
     */
    takeProfit?: number
    [property: string]: any
  }
}
