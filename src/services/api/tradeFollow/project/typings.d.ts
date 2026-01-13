/** Trade Follow Project */
declare namespace TradeFollowProject {
  type TradeFollowPageParams = {
    /**
     * 分组名称
     */
    groupName?: string
    /**
     * 带单人UUId
     */
    leadId?: string
    /**
     * 项目状态 0=关  1=开
     */
    openFlag?: number
  } & API.PageParam

  type TradeFollowPageItem = {
    id: number
    /**
     * 跟单规模
     */
    assetScale?: number
    /**
     * 审核状态：0待审核  1=已审核 2=审核拒绝
     */
    auditStatus?: number
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 跟单人数
     */
    followerNumber?: number
    /**
     * 账户组
     */
    groupName?: string
    /**
     * 带单人Id
     */
    leadId?: string
    /**
     * 项目状态
     */
    enabledFlag?: number
    /**
     * 带单人项目状态
     */
    openFlag?: number
    /**
     * 分润比例
     */
    profitSharingRatio?: number
    /**
     * 项目名称
     */
    projectName?: string
    /**
     * 交易账户
     */
    tradeAccountId?: number
  }

  /**
   * 带单人-当前仓位
   */
  type currentLeadOrderItem = {
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
    leadId?: string
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
   * api: tradeFollowSymbolAudit
   * 带单申请 - 审核
   */
  type TradeFollowSymbolAuditParams = {
    /**
     * 资产要求限制
     */
    assetRequirementLimit?: number
    /**
     * 资产规模限制
     */
    assetScaleLimit?: number
    /**
     * 审核原因
     */
    auditReason?: string
    /**
     * 审核状态
     */
    auditStatus?: number
    leadId?: string
    /**
     * 最大支持人数限制
     */
    maxSupportCountLimit?: number
    /**
     * 利润分成比例限制
     */
    profitSharingRatioLimit?: number
    [property: string]: any
  }

  /**
   * api: tradeFollowSettings
   * 带单项目 - 设置
   */
  type TradeFollowSettingsParams = {
    /**
     * 资产要求限制
     */
    assetRequirementLimit?: number
    /**
     * 资产规模限制
     */
    assetScaleLimit?: number
    leadId?: string
    /**
     * 最大支持人数限制
     */
    maxSupportCountLimit?: number
    /**
     * 利润分成比例限制
     */
    profitSharingRatioLimit?: number
    [property: string]: any
  }
}
