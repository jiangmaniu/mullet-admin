declare namespace CrmTrading {
  // 亏损商品排行
  type LossItem = {
    /**
     * 交易人次
     */
    personCount?: number
    /**
     * 盈亏金额
     */
    profit?: number
    /**
     * 产品名称
     */
    symbol?: string
    /**
     * 交易次数
     */
    tradeCount?: number
    /**
     * 交易手数
     */
    tradingVolume?: number
    /**
     * 产品图片
     */
    imgUrl?: string
  }
  // 盈利商品排行
  type ProfitSymbolItem = {
    /**
     * 交易人次
     */
    personCount?: number
    /**
     * 盈亏金额
     */
    profit?: number
    /**
     * 产品名称
     */
    symbol?: string
    /**
     * 交易次数
     */
    tradeCount?: number
    /**
     * 交易手数
     */
    tradingVolume?: number
    /**
     * 产品图片
     */
    imgUrl?: string
  }
  // 日统计报表
  type StatisticsDayItemParams = API.PageParam &
    API.SearchTimeParams & {
      /**10按天 20 按月 */
      type: 10 | 20
    } & API.SearchTimeParams
  type StatisticsDayItem = {
    /**
     * 登录用户活跃
     */
    activeUser?: number
    auserCount?: number
    /**
     * 回流用户
     */
    backflowUser?: number
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 结束时间
     */
    endDate?: Date
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 隔夜利息
     */
    interestFees?: number
    /**
     * 每天用户总余额汇总
     */
    money?: number
    /**
     * 净值
     */
    netValue?: number
    /**
     * 新增首次入金用户数
     */
    newAUser?: number
    /**
     * 新增实名认证客户数
     */
    newKycUser?: number
    /**
     * 新增用户数
     */
    newUser?: number
    /**
     * 占用保证金
     */
    occupyOrderMargin?: number
    /**
     * 交易额
     */
    operationAmount?: number
    /**
     * 交易活跃用户数
     */
    operationUser?: number
    /**
     * 保证金
     */
    orderMargin?: number
    /**
     * 浮动盈亏
     */
    platformProfit?: number
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 新增二次入金用户数
     */
    secondAUser?: number
    /**
     * 显示时间
     */
    showDateStr?: string
    /**
     * 开始时间
     */
    statDate?: Date
    /**
     * 总入金
     */
    totalAmount?: number
    /**
     * 总出金
     */
    totalWithdraw?: number
    /**
     * 类型
     */
    type?: number
    [property: string]: any
  }
  // 产品交易排行
  type TradingSymbolItem = {
    /**
     * 多（平仓）
     */
    closeBullish?: number
    /**
     * 交易额（平仓）
     */
    closeGvm?: number
    /**
     * 空（平仓）
     */
    closeShortSelling?: number
    /**
     * 交易量（平仓）
     */
    closeVolume?: number
    /**
     * 合约价值（平仓）
     */
    closeWeight?: number
    /**
     * 交易合约大小
     */
    contractSize?: number
    /**
     * 图标
     */
    imgUrl?: string
    /**
     * 多（开仓）
     */
    openBullish?: number
    /**
     * 交易额（开仓）
     */
    openGvm?: number
    /**
     * 空（开仓）
     */
    openShortSelling?: number
    /**
     * 交易量（开仓）
     */
    openVolume?: number
    /**
     * 合约价值（开仓）
     */
    openWeight?: number
    /**
     * 产品名称
     */
    symbol?: string
    /**
     * 产品图片
     */
    imgUrl?: string
  }
  // 用户交易排行
  type TradingUserItem = {
    /**
     * 用户名
     */
    account?: string
    /**
     * 余额
     */
    availableBalance?: number
    /**
     * 渠道ID
     */
    channelId?: number
    /**
     * 用户ID
     */
    clientId?: string
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 入金
     */
    deposit?: number
    /**
     * 首充金额
     */
    fastAMoney?: number
    /**
     * 首充时间
     */
    fastATime?: Date
    /**
     * 净入金
     */
    netIncome?: number
    /**
     * 盈亏金额
     */
    profit?: number
    /**
     * 用户排名
     */
    rank?: number
    /**
     * 资金利用率
     */
    ratio?: number
    /**
     * 真名
     */
    realName?: string
    /**
     * 交易量
     */
    volume?: number
    /**
     * 出金
     */
    withdrawal?: number
  }
  // 统计用户留存率
  type RetentionParams = API.PageParam &
    API.SearchTimeParams & {
      /**统计留存天数,默认12天 */
      day?: number
    }
  type RetentionListItem = {
    /**日期 */
    datestr: string
    /**注册用户 */
    reg_user: number
    active_1_day: number
    active_2_day: number
    active_3_day: number
    active_4_day: number
    active_5_day: number
    active_6_day: number
    active_7_day: number
    active_8_day: number
    active_9_day: number
    active_10_day: number
    active_11_day: number
    active_12_day: number
    [key: string]: number
  }
  // 统计渠道报表
  type ChannelListItem = {
    /**
     * 活动
     */
    active?: string
    /**
     * 渠道id
     */
    clientGroupId?: string
    /**
     * 渠道名称
     */
    code?: string
    /**
     * 客单价
     */
    customerTransaction?: number
    /**
     * 日期
     */
    dateStr?: string
    /**
     * 入金
     */
    deposit?: number
    /**
     * 组
     */
    group?: string
    /**
     * 实名人数
     */
    kycAuthCount?: number
    /**
     * 注册人数
     */
    regUserCount?: number
  }
  // 现金头寸报表
  type MoneyPositionListItem = {
    /**
     * 多头交易量
     */
    bullish?: number
    /**
     * 多头均价
     */
    bullishAvg?: number
    /**
     * 多头合约价值
     */
    bullishWeight?: number
    /**
     * 合约大小
     */
    contractSize?: string
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 空头交易量
     */
    shortSelling?: number
    /**
     * 空头均价
     */
    shortSellingAvg?: number
    /**
     * 空头合约价值
     */
    shortSellingWeight?: number
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 总交易量
     */
    totalVolume?: number
  }
  // 客户数据统计
  type StatAccountParams = {
    /**	渠道ID */
    clientGroupId?: string
    /**	交易账号 */
    tradeAccountId?: string
    /**用户UID */
    userUid?: string
  } & API.PageParam &
    API.SearchTimeParams
  type StatAccountItem = {
    /**
     * 客户id
     */
    clientId?: string
    /**
     * 渠道
     */
    code?: string
    /**
     * 注册时间
     */
    createTime?: string
    /**
     * 入金
     */
    deposit?: number
    /**
     * 首次入金时间
     */
    fristATime?: string
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 隔夜利息
     */
    interestFees?: number
    /**
     * 上次上线时间
     */
    lastVisitedTime?: string
    /**
     * 余额
     */
    money?: number
    /**
     * 名称
     */
    name?: string
    /**
     * 净入金
     */
    netIncome?: number
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 交易量
     */
    tradingVolume?: number
    /**
     * 用户UID
     */
    userUid?: string
    /**
     * 出金
     */
    withdrawal?: number
  }
  // 首A用户明细
  type FristAUserParams = {
    /**	户id */
    accountGroupId?: string
    /**	交易账号 */
    tradeAccountId?: string
  } & API.PageParam &
    API.SearchTimeParams
  type FristAUserItem = {
    /**
     * 交易账号
     */
    tradeAccountId?: string
    /**
     * 开户渠道
     */
    code?: string
    /**
     * 注册时间
     */
    createTime?: string
    /**
     * 所属客服
     */
    customerServer?: string
    /**
     * 入金
     */
    deposit?: number
    /**
     * 总出入金次数
     */
    depositCount?: number
    /**
     * 首次入金金额
     */
    fristAMoney?: string
    /**
     * 首次入金时间
     */
    fristATime?: string
    /**
     * 组别
     */
    groupName?: string
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 隔夜利息
     */
    interestFees?: number
    /**
     * 上次上线时间
     */
    lastVisitedTime?: string
    /**
     * 余额
     */
    money?: number
    /**
     * 名称
     */
    name?: string
    /**
     * 净入金
     */
    netIncome?: number
    /**
     * 支付渠道
     */
    payChannel?: string
    /**
     * 入金方式
     */
    payType?: string
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 交易量
     */
    tradingVolume?: number
    /**
     * 用户UID
     */
    userUid?: string
    /**
     * 出金
     */
    withdrawal?: number
    /**
     * 总出金次数
     */
    withdrawalCount?: number
  }

  // ==== 首页接口 =====

  // 按天查询首页CRM资金统计
  type CRMMoneyByDayInfo = {
    /**
     * 交易活跃
     */
    activeUserCount?: number
    /**
     * 入金人数
     */
    depositUserCount?: number
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 隔夜利息
     */
    interestFees?: number
    /**
     * 登录活跃
     */
    loginUserCount?: number
    /**
     * 净值
     */
    netValue?: number
    /**
     * 保证金
     */
    orderMargin?: number
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 注册人数
     */
    regUserCount?: number
    /**
     * 总入金
     */
    totalAmount?: number
    /**
     * 总出金
     */
    totalWithdraw?: number
  }

  type GMVInfo = {
    /**
     *
     */
    symbol?: string
    /**
     *
     */
    gvm?: string
    /**
     * 交易量
     */
    volume?: number
  }

  // 按月查询首页CRM资金统计
  type CRMMoneyByMonthInfo = {
    /**
     * 交易活跃
     */
    activeUserCount?: number
    /**
     * 入金人数
     */
    depositUserCount?: number
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 隔夜利息
     */
    interestFees?: number
    /**
     * 登录活跃
     */
    loginUserCount?: number
    /**
     * 净值
     */
    netValue?: number
    /**
     * 保证金
     */
    orderMargin?: number
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 注册人数
     */
    regUserCount?: number
    /**
     * 总入金
     */
    totalAmount?: number
    /**
     * 总出金
     */
    totalWithdraw?: number
  }

  /**
   * 平台结算金额，平台结算金额
   */
  type findCloseMoneyInfo = {
    // /**
    //  * 手续费
    //  */
    // handlingFees?: number
    // /**
    //  * 隔夜费
    //  */
    // interestFees?: number
    // /**
    //  * 盈亏
    //  */
    // profit?: number
    // /**
    //  * 日期时间
    //  */
    // showDateStr?: string
    [property: string]: any
  }

  /**
   * crm首页运营数据图表，crm首页运营数据图表
   */
  type findCrmMoneyLineInfo = {
    /**
     * 交易活跃
     */
    activeUserCount?: number
    /**
     * 入金人数
     */
    depositUserCount?: number
    /**
     * 登录活跃
     */
    loginUserCount?: number
    /**
     * 注册人数
     */
    regUserCount?: number
    /**
     * 日期时间
     */
    showDateStr?: string
    [property: string]: any
  }

  /**
   * crm首页交易Volume，crm首页交易Volume
   */
  type findCrmTradingLineInfo = {
    /**
     * 平仓交易量
     */
    closeVolume?: number
    /**
     * 开仓交易量
     */
    openVolume?: number
    /**
     * 日期时间
     */
    showDateStr?: string
    /**
     * 交易量
     */
    volume?: number
    [property: string]: any
  }

  /**
   * 统计头寸，统计头寸
   */
  type findCrmMoneyPositionInfo = {
    /**
     * 多头交易量
     */
    bullish?: number
    /**
     * 多头均价
     */
    bullishAvg?: number
    /**
     * 多头交易权重
     */
    bullishWeight?: number
    /**
     * 合约大小
     */
    contractSize?: string
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 空头交易量
     */
    shortSelling?: number
    /**
     * 空头均价
     */
    shortSellingAvg?: number
    /**
     * 空头交易权重
     */
    shortSellingWeight?: number
    /**
     * 货币类型
     */
    symbol?: string
    [property: string]: any
  }

  /**
   * 用户渠道VO，用户渠道VO
   */
  type findChannelUserItem = {
    /**
     * 用户ID
     */
    clientId?: number
    /**
     * 渠道
     */
    code?: string
    /**
     * 国家
     */
    country?: string
    /**
     * 注册时间
     */
    createTime?: Date
    /**
     * 邮箱
     */
    email?: string
    /**
     * 首次入金时间
     */
    fristATime?: Date
    /**
     * ip
     */
    ip?: string
    /**
     * 是否KYC认证
     */
    isKycAuth?: boolean
    /**
     * 最后登录时间
     */
    lastLoginTime?: Date
    /**
     * 手机号
     */
    phone?: string
    /**
     * 手机号码区域代码
     */
    phoneAreaCode?: string
    /**
     * 账户ID
     */
    tradeAccountId?: number
    [property: string]: any
  }
  /**
   * findAllClientGroupItem
   */
  type findAllClientGroupItem = {
    /**
     * 识别码
     */
    code?: string
    /**
     * 组名称
     */
    groupName?: string
    /**
     * id
     */
    id?: number
    [property: string]: any
  }

  /**
   * // 活跃用户表数据统计
   * /trade-operation/operationApi/trading/getActiveUsersTable
   */
  type ActiveUsersTableItem = {
    /**
     * 活跃用户人数
     */
    activeUserCount?: number
    /**
     * 活跃用户总入金
     */
    activeUserDepositAmount?: number
    /**
     * 活跃用户净入金
     */
    activeUserNetDepositAmount?: number
    /**
     * 活跃用户人数百分比
     */
    activeUserPercentage?: number
    /**
     * 活跃用户总手数
     */
    activeUserTotalSize?: number
    /**
     * 活跃用户总出金
     */
    activeUserWithdrawalAmount?: number
    /**
     * 首A用户人数统计
     */
    firstAUserCount?: number
    /**
     * 流失首A用户
     */
    lossFirstAUserCount?: number
    /**
     * 流失首A用户总入金
     */
    lossFirstAUserDepositAmount?: number
    /**
     * 流失首A用户净入金
     */
    lossFirstAUserNetDepositAmount?: number
    /**
     * 流失首A用户总手数
     */
    lossFirstAUserTotalSize?: number
    /**
     * 流失首A用户总出金
     */
    lossFirstAUserWithdrawalAmount?: number
    /**
     * 流失正常用户数
     */
    lossNormalUserCount?: number
    /**
     * 流失正常用户总入金
     */
    lossNormalUserDepositAmount?: number
    /**
     * 流失正常用户净入金
     */
    lossNormalUserNetDepositAmount?: number
    /**
     * 流失正常用户总手数
     */
    lossNormalUserTotalSize?: number
    /**
     * 流失正常用户总出金
     */
    lossNormalUserWithdrawalAmount?: number
    /**
     * 流失回流用户
     */
    lossReturningUserCount?: number
    /**
     * 流失回流用户总入金
     */
    lossReturningUserDepositAmount?: number
    /**
     * 流失回流用户净入金
     */
    lossReturningUserNetDepositAmount?: number
    /**
     * 流失回流用户总手数
     */
    lossReturningUserTotalSize?: number
    /**
     * 流失回流用户总出金
     */
    lossReturningUserWithdrawalAmount?: number
    /**
     * 正常用户
     */
    normalUser?: number
    /**
     * 正常用户总入金
     */
    normalUserDepositAmount?: number
    /**
     * 正常用户净入金
     */
    normalUserNetDepositAmount?: number
    /**
     * 正常用户总手数
     */
    normalUserTotalSize?: number
    /**
     * 正常用户总出金
     */
    normalUserWithdrawalAmount?: number
    /**
     * 回流用户
     */
    returningUserCount?: number
    /**
     * 回流用户总入金
     */
    returningUserDepositAmount?: number
    /**
     * 回流用户净入金
     */
    returningUserNetDepositAmount?: number
    /**
     * 回流用户总手数
     */
    returningUserTotalSize?: number
    /**
     * 回流用户总出金
     */
    returningUserWithdrawalAmount?: number
    /**
     * 统计日期
     */
    statisticsDate?: string
    [property: string]: any
  }
}
