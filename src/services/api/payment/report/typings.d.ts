declare namespace PaymentReport {
  // 渠道入金结算报表-参数
  type ChannelDepositReportParams = {
    /**
     * 渠道商
     */
    channelType?: string
    /**
     * 到账结束时间
     */
    endTime?: string
    /**
     * 到账起始时间
     */
    startTime?: string
    /**
     * 统计周期,日传day,月传month
     */
    timeType?: 'DAY' | 'MONTH'
  } & API.PageParam
  // 渠道入金结算报表-item
  type ChannelDepositReportListItem = {
    /**
     * 客户转入金额基准
     */
    baseActualOrderAmount?: number
    /**
     * 客户入金手续费基准
     */
    baseHandlingFee?: number
    /**
     * 客户入金金额基准
     */
    baseOrderAmount?: number
    /**
     * 客户入金手续费法币
     */
    handlingFee?: number
    /**
     * 渠道汇率
     */
    channelExchangeRate?: number
    /**
     * 渠道名称
     */
    channelName?: string
    /**
     * 渠道到账合计
     */
    channelReceiptAmount?: number
    /**
     * 渠道结算金额
     */
    channelSettlementAmount?: number
    /**
     * 兑换汇率
     */
    customerTransferAmount?: number
    /**
     * 客户转入金额法币
     */
    orderAmount?: number
    /**
     * 入金订单数
     */
    orderQuantity?: number
    /**
     * 平台入账合计
     */
    platformAccountAmount?: number
    /**
     * 平台入金手续费基准
     */
    platformBaseDepositFee?: number
    /**
     * 平台入金手续费法币
     */
    platformDepositFee?: number
    /**
     * 平台汇收益
     */
    platformExchangeIncome?: number
    /**
     * 平台汇率
     */
    platformExchangeRate?: number
    /**
     * 统计日期
     */
    statisticsDate?: string
    /**
     * 入金成功数
     */
    successesQuantity?: number
    /**
     * 入金币种
     */
    symbol?: string
  }
  // 渠道出金结算报表-参数
  type ChannelWithdrawalReportParams = {
    /**
     * 渠道商
     */
    channelType?: string
    /**
     * 到账结束时间
     */
    endTime?: string
    /**
     * 到账起始时间
     */
    startTime?: string
    /**
     * 统计周期,日传DAY,月传MONTH
     */
    timeType?: 'DAY' | 'MONTH'
  } & API.PageParam
  // 渠道出金结算报表-item
  type ChannelWithdrawalReportListItem = {
    /**
     * 客户出金手续费
     */
    baseHandlingFee?: number
    /**
     * 客户出金金额
     */
    baseOrderAmount?: number
    /**
     * 渠道名称
     */
    channelName?: string
    /**
     * 渠道出金金额
     */
    channelWithdrawAmount?: number
    /**
     * 渠道出金汇率
     */
    channelWithdrawExchangeRate?: number
    /**
     * 渠道出金手续费
     */
    channelWithdrawFee?: number
    /**
     * 渠道出金合计
     */
    channelWithdrawTotalAmount?: number
    /**
     * 客户到账金额
     */
    customerReceiptAmount?: number
    /**
     * 出金订单数
     */
    orderQuantity?: number
    /**
     * 平台实际出金
     */
    platformActualAmount?: number
    /**
     * 平台汇率
     */
    platformExchangeRate?: number
    /**
     * 平台出金手续费
     */
    platformWithdrawFee?: number
    /**
     * 统计日期
     */
    statisticsDate?: string
    /**
     * 出金成功数
     */
    successesQuantity?: number
    /**
     * 渠道币种
     */
    symbol?: string
  }
  // 平台出入金核算报表-参数
  type PlatformReportParams = {
    /**
     * 到账结束时间
     */
    endTime?: string
    /**
     * 到账起始时间
     */
    startTime?: string
    /**
     * 币种
     */
    symbol?: string
    /**
     * 统计周期,日传DAY,月传MONTH
     */
    timeType?: string
  } & API.PageParam
  // 平台出入金核算报表-item
  type PlatformReportListItem = {
    /**
     * 客户入金金额
     */
    customerDepositAmount?: number
    /**
     * 客户入金手续费
     */
    customerDepositFee?: number
    /**
     * 客户出金金额
     */
    customerWithdrawAmount?: number
    /**
     * 客户出金手续费
     */
    customerWithdrawFee?: number
    /**
     * 客户到账金额
     */
    customrReceiptAmount?: number
    /**
     * 入金成功数
     */
    depositSuccessesQuantity?: number
    /**
     * 订单总数
     */
    orderQuantity?: number
    /**
     * 平台结余
     */
    platformBalance?: number
    /**
     * 平台入金手续费
     */
    platformDepositFee?: number
    /**
     * 平台手续费合计
     */
    platformTotalFee?: number
    /**
     * 平台出金手续费
     */
    platformWithdrawFee?: number
    /**
     * 统计日期
     */
    statisticsDate?: string
    /**
     * 统计币种
     */
    symbol?: string
    /**
     * 出金成功数
     */
    withdrawalSuccessesQuantity?: number
  }
  // 客户出入金统计报表-参数
  type UserReportParams = {
    /**
     * 登录账号
     */
    account?: string
    /**
     * 结束时间
     */
    endTime?: string
    /**
     * 开始时间
     */
    startTime?: string
  } & API.PageParam
  // 客户出入金统计报表-item
  type UserReportListItem = {
    /**
     * 客户账号
     */
    account?: string
    /**
     * 客户账户组出入金统计列表
     */
    userReportCountVOList?: UserReportCountVOListItem[]
  } & UserReportListItem
  type UserReportCountVOListItem = {
    /**
     * 交易账户号
     */
    account?: string
    /**
     * 货币类型
     */
    baseCurrency?: string
    /**
     * 入金金额
     */
    customerDepositAmount?: number
    /**
     * 出金金额
     */
    customerWithdrawAmount?: number
    /**
     * 入金手续费
     */
    depositHandlingFee?: number
    /**
     * 入金订单数量
     */
    depositOrderQuantity?: number
    /**
     * 成功入金数量
     */
    depositSuccessQuantity?: number
    /**
     * 订单数量
     */
    orderQuantity?: number
    /**
     * 交易账户ID
     */
    tradeAccountId?: string
    /**
     * 出金到账金额
     */
    withdrawalReceiptAmount?: number
    /**
     * 出金手续费
     */
    withdrawHandlingFee?: number
    /**
     * 出金订单数量
     */
    withdrawOrderQuantity?: number
    /**
     * 成功出金数量
     */
    withdrawSuccessQuantity?: number
    /**
     * 手续费合计
     */
    totalHandlingFee?: number
    /**
     * 出入金合计
     */
    totalDwAmount?: number
  }
}
