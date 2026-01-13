declare namespace CrmClient {
  // 交易信息-持仓列表
  type PositionsParams = {
    /**	户id */
    accountGroupId?: string
    /**	交易账号 */
    tradeAccountId?: string
    /**交易状态 */
    status?: API.BGAStatus
    /**客户id */
    clientId: any
  } & API.PageParam &
    API.SearchTimeParams
  type PositionsItem = {
    /**
     * 当前行情 通过 updateBgaOrderDataSource 构造
     */
    currentQuote?: IQuoteItem
    /**
     * 订单方向
     */
    buySell?: API.TradeBuySell
    /**
     * 平仓价格
     */
    closePrice?: number
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 主键
     */
    id?: number
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
    marginType?: API.MarginType
    /**
     * 订单模式
     */
    mode?: API.OrderMode
    /**
     * 基础保证金
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
     * 备注
     */
    remark?: string
    /**
     * 开仓价格
     */
    startPrice?: number
    /**
     * 状态
     */
    status?: API.BGAStatus
    /**
     * 止损
     */
    stopLoss?: number
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 止盈
     */
    takeProfit?: number
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**数据源 */
    dataSourceCode?: string
    /**数据源品种 */
    dataSourceSymbol?: string
    /**品种配置 */
    conf?: Symbol.SymbolConf
  }
  // 交易信息-所有委托
  type AllOrderParams = {
    /**	账户组户id */
    accountGroupId?: string
    /**	交易账号 */
    tradeAccountId?: string
    /**客户id */
    clientId: any
    orderStatus: API.OrderStatus
  } & API.PageParam &
    API.SearchTimeParams
  // 交易信息-当前委托
  type CurrentOrderParams = {
    /**	账户组户id */
    accountGroupId?: string
    /**	交易账号 */
    tradeAccountId?: string
    /**客户id */
    clientId: any
  } & API.PageParam &
    API.SearchTimeParams
  /**
   * 订单，订单
   */
  type AllOrderItem = {
    /**
     * 持仓ID
     */
    bagOrderIds?: string
    /**
     * 订单方向
     */
    buySell?: BuySell
    /**
     * 配置
     */
    conf?: string
    /**
     * 创建原因
     */
    createReason?: string
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 执行订单ID
     */
    executeOrderId?: number
    /**
     * 过期时间
     */
    expirationTime?: Date
    /**
     * 完成时间
     */
    finishTime?: Date
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 成交方向
     */
    inOut?: API.OrderInOut
    /**
     * 杠杆倍数
     */
    leverageMultiple?: number
    /**
     * 限价价格/挂单价
     */
    limitPrice?: number
    /**
     * 保证金类型
     */
    marginType?: API.MarginType
    /**
     * 订单模式
     */
    mode?: API.OrderMode
    /**
     * 操作人ID
     */
    operatorId?: number
    /**
     * 订单保证金
     */
    orderMargin?: number
    /**
     * 订单数量/手数
     */
    orderVolume?: number
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 状态
     */
    status?: API.OrderStatus
    /**
     * 止损
     */
    stopLoss?: number
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 止盈
     */
    takeProfit?: number
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 成交价格
     */
    tradePrice?: number
    /**
     * 成交量
     */
    tradingVolume?: number
    /**
     * 订单类型
     */
    type?: API.OrderType
    /**
     * 更新时间
     */
    updateTime?: Date
    [property: string]: any
  }

  type CurrentOrderItem = {
    /**数据源 */
    dataSourceCode?: string
    /**数据源品种 */
    dataSourceSymbol?: string
    /**
     * 持仓ID
     */
    bagOrderIds?: string
    /**
     * 订单方向
     */
    buySell?: API.TradeBuySell
    /**
     * 创建原因
     */
    createReason?: string
    /**
     * L创建时间
     */
    createTime?: string
    /**
     * 执行订单ID
     */
    executeOrderId?: number
    /**
     * 过期时间
     */
    expirationTime?: string
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 成交方向
     */
    inOut?: string
    /**
     * 杠杆倍数
     */
    leverageMultiple?: number
    /**
     * 限价价格/挂单价
     */
    limitPrice?: number
    /**
     * 保证金类型
     */
    marginType?: API.MarginType
    /**
     * 订单模式
     */
    mode?: API.OrderMode
    /**
     * 操作人ID
     */
    operatorId?: number
    /**
     * 订单保证金
     */
    orderMargin?: number
    /**
     * 订单数量/手数
     */
    orderVolume?: number
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 状态
     */
    status?: API.BGAStatus
    /**
     * 止损
     */
    stopLoss?: number
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 止盈
     */
    takeProfit?: number
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 成交价格
     */
    tradePrice?: number
    /**
     * 成交量
     */
    tradingVolume?: number
    /**
     * 订单类型
     */
    type?: string
    /**品种配置 */
    conf?: Symbol.SymbolConf
  }
  // 交易信息-历史委托
  type HistoryOrderParams = {
    /**	账户组id */
    accountGroupId?: string
    /**	交易账号 */
    tradeAccountId?: string
    /**客户id */
    clientId: any
  } & API.PageParam &
    API.SearchTimeParams
  type HistoryOrderItem = {
    /**
     * 持仓ID
     */
    bagOrderIds?: string
    /**
     * 订单方向
     */
    buySell?: API.TradeBuySell
    /**
     * 创建原因
     */
    createReason?: string
    /**
     * L创建时间
     */
    createTime?: string
    /**
     * 执行订单ID
     */
    executeOrderId?: number
    /**
     * 过期时间
     */
    expirationTime?: string
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 成交方向
     */
    inOut?: API.OrderInOut
    /**
     * 杠杆倍数
     */
    leverageMultiple?: number
    /**
     * 限价价格/挂单价
     */
    limitPrice?: number
    /**
     * 保证金类型
     */
    marginType?: API.MarginType
    /**
     * 订单模式
     */
    mode?: API.OrderMode
    /**
     * 操作人ID
     */
    operatorId?: number
    /**
     * 订单保证金
     */
    orderMargin?: number
    /**
     * 订单数量/手数
     */
    orderVolume?: number
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 状态
     */
    status?: API.OrderStatus
    /**
     * 止损
     */
    stopLoss?: number
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 止盈
     */
    takeProfit?: number
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 成交价格
     */
    tradePrice?: number
    /**
     * 成交量
     */
    tradingVolume?: number
    /**
     * 订单类型
     */
    type?: API.OrderType
    /**品种配置 */
    conf?: Symbol.SymbolConf
  }
  // 仓位历史
  type HistoryTradeParams = {
    /**	户id */
    accountGroupId?: string
    /**	交易账号 */
    tradeAccountId?: string
    /**客户id */
    clientId: any
  } & API.PageParam &
    API.SearchTimeParams

  /**
   * TradeRecords对象，成交记录
   */
  type HistoryTradeItem = {
    /**
     * 持仓订单ID
     */
    bagOrderId?: number
    /**
     * 订单方向
     */
    buySell?: API.TradeBuySell
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 汇率
     */
    exchangeRate?: string
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 成交方向
     */
    inOut?: API.OrderInOut
    /**
     * 库存费
     */
    interestFees?: number
    /**
     * 杠杆倍数
     */
    leverageMultiple?: number
    /**
     * 订单模式
     */
    mode?: API.OrderMode
    /**
     * 订单ID
     */
    orderId?: number
    /**
     * 价格id
     */
    priceValueId?: string
    /**
     * 盈亏
     */
    profit?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 开仓价格
     */
    startPrice?: number
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 交易额
     */
    tradeAmount?: number
    /**
     * 成交价格
     */
    tradePrice?: number
    /**
     * 成交量
     */
    tradingVolume?: number
    [property: string]: any
  }

  // 仓位历史
  type TradingLogParams = {
    /**	户id */
    accountGroupId?: string
    /**	交易账号 */
    tradeAccountId?: string
    /**客户id */
    clientId: any
  } & API.PageParam &
    API.SearchTimeParams
  type TradingLogItem = {
    /**
     * 订单方向
     */
    buySell?: API.TradeBuySell
    /**
     * 平仓价格
     */
    closePrice?: number
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 手续费
     */
    handlingFees?: number
    /**
     * 主键
     */
    id?: number
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
    marginType?: API.MarginType
    /**
     * 订单模式
     */
    mode?: API.OrderMode
    /**
     * 基础保证金
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
     * 备注
     */
    remark?: string
    /**
     * 开仓价格
     */
    startPrice?: number
    /**
     * 状态
     */
    status?: string
    /**
     * 止损
     */
    stopLoss?: number
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 止盈
     */
    takeProfit?: number
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**品种配置 */
    conf?: Symbol.SymbolConf
  }
  // 资金流水
  type MoneyLogParams = {
    /**	账户组id */
    accountGroupId?: string
    /**	交易账号 */
    tradeAccountId?: string
    /**客户id */
    clientId: any
  } & API.PageParam &
    API.SearchTimeParams
  type MoneyLogItem = {
    /**
     * 账户ID
     */
    accountId?: number
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 金额
     */
    money?: number
    /**
     * 新余额
     */
    newBalance?: number
    /**
     * 旧余额
     */
    oldBalance?: number
    /**
     * 操作人
     */
    operationUser?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 类型
     */
    type?: API.CustomerBalanceRecordType
  }
  // 资金信息统计汇总
  type StatMoneyItem = {
    /**
     * 净余额
     */
    netBalance: number
    /**
     * 总入金
     */
    totalAmount: number
    /**
     * 总赠金
     */
    totalGive: number
    /**
     * 划转
     */
    totalTransfer: number
    /**
     * 总出金
     */
    totalWithdraw: number
  }

  // 查询客户信息
  type ClientInfo = {
    /**
     * 账户名
     */
    account?: string
    /**
     * 头像
     */
    avatar?: string
    /**
     * 用户UID
     */
    clientId?: number
    /**
     * 开户渠道
     */
    code?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 用户组别
     */
    groupName?: string
    /**
     * 上次使用设备
     */
    lastEquipment?: string
    /**
     * 最后登录时间
     */
    lastLoginTime?: string
    /**
     * 交易量
     */
    volume?: string
  }
  // 查询账户信息
  type ClientAccountItem = {
    /**
     * 用户ID
     */
    clientId?: number
    /**
     * 渠道
     */
    code?: string
    /**
     * 注册时间
     */
    createTime?: Date
    /**
     * 交易单位
     */
    currencyUnit?: string
    /**
     * 入金
     */
    deposit?: number
    /**
     * 首次入金时间
     */
    fristATime?: Date
    /**
     * 组别
     */
    groupCode?: string
    /**
     * 组名称
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
     * 逐仓保证金
     */
    isolatedMargin?: number
    /**
     * 上次上线时间
     */
    lastVisitedTime?: Date
    /**
     * 保证金
     */
    margin?: number
    /**
     * 余额
     */
    money?: number
    /**
     * 用户名
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
     * 账户ID
     */
    tradeAccountId?: number
    /**
     * 交易量
     */
    tradingVolume?: number
    /**
     * 出金
     */
    withdrawal?: number
    [property: string]: any
  }
  // 统计用户交易偏好
  type OrderBySymbolItem = {
    symbol: string
    symbolCount: number
  }
  // 统计用户合约交易时长
  type OrderCloseMinisItem = {
    minis: any[]
    minisCount: number[]
  }
  // 用户交易时间活跃统计
  type UserDealHourItem = {
    hourArr: any[]
    hourCountArr: number[]
  }

  // 入金明细
  type UserIncominInfoParams = {
    accountGroupId?: string
    /**客户id */
    clientId?: any
    /**	交易账号 */
    tradeAccountId?: string
  } & API.PageParam &
    API.SearchTimeParams
  type UserIncominInfoItem = {
    /**
     * 账号
     */
    account?: string
    /**
     * 账户ID
     */
    accountGroupId?: number
    /**
     * 用户ID
     */
    clientId?: number
    /**
     * 生成订单
     */
    createId?: string
    /**
     * 订单时间
     */
    createTime?: Date
    /**
     * 邮箱
     */
    email?: string
    /**
     * 首充金额
     */
    fristAMoney?: number
    /**
     * 名(名字)
     */
    fristName?: string
    /**
     * 订单ID
     */
    id?: number
    /**
     * 入金方式
     */
    incomingType?: string
    /**
     * 姓(姓氏)
     */
    lastName?: string
    /**
     * 订单金额
     */
    money?: number
    /**
     * 支付渠道
     */
    payCode?: string
    /**
     * 电话
     */
    phone?: string
    /**
     * 账户注册时间
     */
    regTime?: string
    /**
     * 成功订单
     */
    successId?: string
  }

  // 资产变化图表
  type AccountDayMoneyItem = {
    dateStr: string
    money: string
  }

  type WithdrawalOrderDetailPageListParams = {
    /**
     * 账号
     */
    account?: string
    /**
     * 用户渠道ID
     */
    channelId?: number
    /**
     * 渠道订单号
     */
    channelOrderNo?: string
    /**
     * 订单号
     */
    orderNo?: string
    /**
     * 订单时间
     */
    orderTime?: string

    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 用户ID
     */
    userId?: number
    [property: string]: any
  } & API.PageParam &
    API.SearchTimeParams

  type WithdrawalOrderDetailPageListItem = {
    /**
     * 账号
     */
    account?: string
    /**
     * 钱包地址
     */
    address?: string
    /**
     * 基准货币单位
     */
    baseCurrency?: string
    /**
     * 出金手续费（基准单位）
     */
    baseHandlingFee?: number
    /**
     * 出金金额基准单位
     */
    baseOrderAmount?: number
    /**
     * 渠道收取手续费
     */
    channelBaseFandlingFee?: number
    /**
     * 渠道汇率
     */
    channelExchangeRate?: number
    /**
     * 用户渠道
     */
    channelId?: number
    /**
     * 支付渠道
     */
    channelName?: string
    /**
     * 提币订单时间
     */
    createTime?: string
    /**
     * 平台汇率
     */
    exchangeRate?: number
    /**
     * 名字
     */
    firstName?: string
    /**
     * 姓
     */
    lastName?: string
    /**
     * 到账时间
     */
    receiptTime?: string
    /**
     * （0待审核，1转账中 2拒绝 3已到账 4拒绝 5失败）
     */
    status?: number
    /**
     * 交易账号ID
     */
    tradeAccountId?: string
    [property: string]: any
  }

  type WithdrawalOrderPageListParams = {
    /**
     * 账号
     */
    account?: string
    /**
     * 渠道ID
     */
    channelId?: number
    /**
     * 交易账号
     */
    tradeAccountId?: number
    [property: string]: any
  } & API.PageParam &
    API.SearchTimeParams

  type WithdrawalOrderPageListItem = {
    /**
     * 累计出金
     */
    totalWithdrawalAmount?: number
    /**
     * 用户UID
     */
    account?: string
    /**
     * 结余
     */
    balance?: number
    /**
     * 基准货币单位
     */
    baseCurrency?: string
    /**
     * 出金手续费（基准单位）
     */
    baseHandlingFee?: number
    /**
     * 出金金额基准单位
     */
    baseOrderAmount?: number
    /**
     * 用户渠道
     */
    channelId?: number
    /**
     * 邮箱
     */
    email?: string
    /**
     * 名字
     */
    firstName?: string
    /**
     * 姓
     */
    lastName?: string
    /**
     * 累计出金订单数
     */
    orderQuantity?: number
    /**
     * 订单时间
     */
    orderTime?: Date
    /**
     * 手机号
     */
    phone?: string
    /**
     * 成功出金订单数
     */
    successOrderQuantity?: number
    /**
     * 累计出金
     */
    totalOrderAmount?: number
    /**
     * 用户ID
     */
    userId?: number
    [property: string]: any
  }

  // 入金统计明细 （入金订单）
  type DepositOrderDetailPageListParams = {
    /**
     * 账号
     */
    account?: string
    /**
     * 入金方式
     */
    channelNoValue?: string
    /**
     * 支付通道
     */
    channelType?: string
    /**
     * 是否首入订单1是，0否
     */
    isFirst?: number
    /**
     * 订单号
     */
    orderNo?: string
    /**
     * 订单时间
     */
    orderTime?: string
    /**
     * 订单状态
     */
    status?: 'FAIL' | 'SUCCESS' | 'WAIT'
    /**
     * 用户ID
     */
    userId?: number
    [property: string]: any
  } & API.PageParam &
    API.SearchTimeParams

  type DepositOrderDetailPageListItem = {
    /**
     * 订单号
     */
    orderNo?: string
    /**
     * 账号
     */
    account?: string
    /**
     * 钱包地址
     */
    address?: string
    /**
     * 基准货币单位
     */
    baseCurrency?: string
    /**
     * 出金手续费（基准单位）
     */
    baseHandlingFee?: number
    /**
     * 出金金额基准单位
     */
    baseOrderAmount?: number
    /**
     * 用户渠道
     */
    channelId?: number
    /**
     * 支付渠道
     */
    channelName?: string
    /**
     * 入金方式
     */
    channelNo?: string
    /**
     * 提币订单时间
     */
    createTime?: Date
    /**
     * 名字
     */
    firstName?: string
    /**
     * 是否首入订单1是，0否
     */
    isFirst?: number
    /**
     * 姓
     */
    lastName?: string
    /**
     * 到账时间
     */
    receiptTime?: Date
    /**
     * 订单状态
     */
    status?: 'FAIL' | 'SUCCESS' | 'WAIT'
    /**
     * 交易账号ID
     */
    tradeAccountId?: string
    [property: string]: any
  }
  type DepositOrderPageListParams = {
    /**
     * 交易账号
     */
    account?: string
    /**
     * 渠道ID
     */
    channelId?: string
    /**
     * 交易账号ID
     */
    tradeAccountId?: number
    [property: string]: any
  } & API.PageParam &
    API.SearchTimeParams

  type DepositOrderPageListItem = {
    /**
     * 用户UID
     */
    account?: string
    /**
     * 交易账户ID
     */
    tradeAccountId?: number
    /**
     * 基准货币单位
     */
    baseCurrency?: string
    /**
     * 用户渠道
     */
    channelId?: number
    /**
     * 邮箱
     */
    email?: string
    /**
     * 首充金额
     */
    firstAMoney?: number
    /**
     * 名字
     */
    firstName?: string
    /**
     * 入金方式
     */
    incomingType?: string
    /**
     * 姓
     */
    lastName?: string
    /**
     * 累入金额基准单位
     */
    money?: number
    /**
     * 累计订单数
     */
    orderQuantity?: number
    /**
     * 订单时间
     */
    orderTime?: string
    /**
     * 手机号
     */
    phone?: string
    /**
     * 用户注册时间
     */
    regTime?: Date
    /**
     * 成功订单数
     */
    successOrderQuantity?: number
    /**
     * 用户ID
     */
    userId?: number
    [property: string]: any
  }
}
