declare namespace TradeFollowLead {
  type TradeFollowLeadOrderParams = {
    /**
     * leadId
     */
    leadId?: string
  } & API.PageParam

  /**
   * api: tradeFollowCurrentLeadOrder
   */
  type TradeFollowCurrentLeadOrderItem = {
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
     * 创建时间
     */
    createTime?: Date
    /**
     * 数据源code
     */
    dataSourceCode?: string
    /**
     * 数据源Symbol
     */
    dataSourceSymbol?: string
    /**
     * 跟单人数
     */
    followerNumber?: number
    /**
     * 分组名称
     */
    groupName?: string
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 带单Id
     */
    id?: number
    /**
     * 图标
     */
    imgUrl?: string
    /**
     * 库存费
     */
    interestFees?: number
    /**
     * 带单人Id
     */
    leadId?: number
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
     * 项目名称
     */
    projectName?: string
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
    /**
     * 交易账户Id
     */
    tradeAccountId?: number
    [property: string]: any
  }

  /**
   * api: tradeFollowHistoryLeadOrder
   */
  type TradeFollowHistoryLeadOrderItem = {
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
     * 创建时间
     */
    createTime?: Date
    /**
     * 数据源code
     */
    dataSourceCode?: string
    /**
     * 数据源Symbol
     */
    dataSourceSymbol?: string
    /**
     * 跟单人数
     */
    followerNumber?: number
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 带单Id
     */
    id?: number
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

  /**
   * api: tradeFollowLeadProfitSharing
   * 带单人 - 分润
   */
  type TradeFollowLeadProfitSharingItem = {
    /**
     * 日期
     */
    date?: Date
    /**
     * 跟单人数
     */
    followerNumber?: number
    /**
     * 分润总金额
     */
    profitSharingAmountTotal?: number
    [property: string]: any
  }

  /**
   * api: tradeFollowLeadProfitSharingDetail
   * 带单人 - 分润明细
   */
  type TradeFollowLeadProfitSharingDetailItem = {
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
     * 数据源code
     */
    dataSourceCode?: string
    /**
     * 数据源Symbol
     */
    dataSourceSymbol?: string
    /**
     * 跟单人UUID
     */
    followerId?: number
    /**
     * 图标
     */
    imgUrl?: string
    /**
     * 杠杆倍数
     */
    leverageMultiple?: number
    /**
     * 订单模式
     */
    mode?: string
    /**
     * 订单数量
     */
    orderVolume?: number
    /**
     * 分润金额
     */
    profitSharingAmount?: number
    /**
     * 分润时间
     */
    profitSharingTime?: Date
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
     * 交易账户Id
     */
    tradeAccountId?: number
    /**
     * 交易账户名称
     */
    tradeAccountName?: string
    [property: string]: any
  }

  /**
   * api: tradeFollowLeadStatistics
   * // 带单人 - 带单表现
   */
  type TradeFollowLeadStatisticsItem = {
    /**
     * 平均每笔收益率
     */
    averageProfitRate?: number
    /**
     * 总收益率
     */
    earningRateTotal?: number
    /**
     * 跟单盈亏
     */
    followerProfit?: number
    /**
     * 带单盈亏
     */
    leadProfit?: number
    /**
     * 回撤率
     */
    retracementRate?: number
    /**
     * 胜率
     */
    winRate?: number
    [property: string]: any
  }

  /**
   * api: tradeFollowLeadProfitStatistics
   * // 带单人 - 累计盈亏
   */
  type TradeFollowLeadProfitStatisticsItem = {
    earningRates?: EarningRate[]
    profitAmounts?: ProfitAmount[]
    [property: string]: any
  }

  type EarningRate = {
    /**
     * 日期
     */
    date?: string
    /**
     * 收益率
     */
    earningRate?: number
    [property: string]: any
  }

  /**
   * ProfitAmount
   */
  type ProfitAmount = {
    /**
     * 日期
     */
    date?: string
    /**
     * 盈亏额
     */
    profitAmount?: number
    [property: string]: any
  }
  /**
   * api: tradeFollowSymbolStatistics
   * 带单人 - 交易偏好
   */
  export type TradeFollowLeadSymbolStatisticsItem = {
    /**
     * 跟单盈亏
     */
    profit?: number
    /**
     * 比例
     */
    rate?: number
    /**
     * 品种名称
     */
    symbol?: string
    /**
     * 交易次数
     */
    tradeCount?: number
    [property: string]: any
  }
  /**
   * api: tradeFollowLeadInfo
   */
  export type TradeFollowLeadInfoItem = {
    /**
     * 交易账户组Id
     */
    accountGroupId?: number
    /**
     * 交易账户组名称
     */
    accountGroupName?: string
    /**
     * 资产要求
     */
    assetRequirement?: number
    /**
     * 资产要求限制
     */
    assetRequirementLimit?: number
    /**
     * 资产规模
     */
    assetScale?: number
    /**
     * 资产规模限制
     */
    assetScaleLimit?: number
    /**
     * 审核原因
     */
    auditReason?: string
    /**
     * 审核状态：0待审核  1=已审核 2=审核拒绝
     */
    auditStatus?: number
    /**
     * 客户端id
     */
    clientId?: number
    /**
     * 合约证明
     */
    contractProof?: string
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 是否被禁用
     */
    enabledFlag?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 头像
     */
    imageUrl?: string
    /**
     * 最大支持人数
     */
    maxSupportCount?: number
    /**
     * 最大支持人数限制
     */
    maxSupportCountLimit?: number
    /**
     * 是否开启带单：1=开启 0=关闭
     */
    openFlag?: number
    /**
     * 利润分成比例
     */
    profitSharingRatio?: number
    /**
     * 利润分成比例限制
     */
    profitSharingRatioLimit?: number
    /**
     * 描述
     */
    projectDesc?: string
    /**
     * 项目名称
     */
    projectName?: string
    /**
     * 标签
     */
    tags?: string
    /**
     * 交易账户Id
     */
    tradeAccountId?: number
    /**
     * 更新时间
     */
    updateTime?: Date
    [property: string]: any
  }

  type TradeFollowLeadListItem = {
    /**
     * 账户组
     */
    groupName?: string
    /**
     * 带单人Id
     */
    leadId?: number
    /**
     * 项目名称
     */
    projectName?: string
    /**
     * 交易账户
     */
    tradeAccountId?: number
    [property: string]: any
  }
}
