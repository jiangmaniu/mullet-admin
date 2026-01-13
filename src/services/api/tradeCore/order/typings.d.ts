declare namespace Order {
  // 追加保证金
  type addMargin = {
    /**追加保证金 */
    addMargin: number
    /**订单号 */
    id: number
  }
  type ExtractMarginParams = {
    /**	持仓订单号 */
    bagOrderId: any
    /**提取保证金 */
    extractMargin: number
  }
  // 下单
  type CreateOrder = {
    /**
     * 持仓订单号
     */
    executeOrderId?: any
    /**
     * 订单方向
     */
    buySell?: API.TradeBuySell
    /**
     * 过期时间
     */
    expirationTime?: string
    /**
     * 杠杆倍数
     */
    leverageMultiple?: number
    /**
     * 限价价格
     */
    limitPrice?: any
    /**
     * 保证金类型
     */
    marginType?: API.MarginType
    /**
     * 订单数量
     */
    orderVolume?: any
    /**
     * 止损
     */
    stopLoss?: any
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 止盈
     */
    takeProfit?: any
    /**
     * 交易账户ID
     */
    tradeAccountId?: any
    /**
     * 订单类型
     */
    type: API.OrderType
  }
  // 订单修改
  type UpdateOrder = {
    /**
     * 过期时间
     */
    expirationTime?: string
    /**
     * 订单号
     */
    id?: number
    /**
     * 止损
     */
    stopLoss?: number
    /**
     * 止盈
     */
    takeProfit?: number
  }
  // 修改委托单(挂单)
  type UpdatePendingOrderParams = {
    /**
     * 委托订单号
     */
    orderId?: number
    /**
     * 止损
     */
    stopLoss?: number
    /**
     * 止盈
     */
    takeProfit?: number
  }

  // 修改止盈止损参数
  type ModifyStopProfitLossParams = {
    /**持仓订单号 */
    bagOrderId: any
    /**止损 */
    stopLoss: any
    /**止盈 */
    takeProfit: any
  }

  // 订单分页-参数
  type OrderPageListParams = {
    /**当前账户ID */
    accountId?: any
    /**
     * 订单方向
     */
    buySell?: API.TradeBuySell
    /**
     * 客户ID
     */
    clientId?: number
    /**
     * 保证金类型
     */
    marginType?: API.MarginType
    /**
     * 订单模式
     */
    mode?: API.OrderMode
    /**
     * 状态
     */
    status?: API.OrderStatus | string
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 订单类型
     */
    type?: API.OrderType | string
    /**	是否模拟，false真实，true模拟 */
    isSimulate?: boolean
  } & API.PageParam

  // 订单分页-列表
  type OrderPageListItem = {
    /**
     * 持仓ID 深度成交有多个 逗号分隔
     */
    bagOrderIds?: string
    executeOrderId?: string
    /**
     * 订单方向
     */
    buySell?: API.TradeBuySell
    /**
     * 配置
     */
    conf?: Symbol.SymbolConf
    /**
     * 创建原因
     */
    createReason?: API.OrderCreateReason
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 过期时间
     */
    expirationTime?: string
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
     * 保证金类型
     */
    marginType?: API.MarginType
    /**
     * 订单模式
     */
    mode?: API.OrderMode
    /**
     * 操作员ID
     */
    operatorId?: number
    /**
     * 订单保证金
     */
    orderMargin?: number
    /**
     * 订单交易量
     */
    orderVolume?: number
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
    tradePrice?: string
    /**
     * 限价
     */
    limitPrice?: string
    /**
     * 成交量
     */
    tradingVolume?: any
    /**
     * 订单类型
     */
    type?: API.OrderType
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 账户id
     */
    accountId: string
    /**
     * 交易账户001
     */
    accountName: string
    /**
     * 用户登录账号 654321@163.com
     */
    userAccount: string
    /**用户名称 */
    userName: string
    /**数据源 huobi */
    dataSourceCode: string
    /**数据源品种 */
    dataSourceSymbol: string
    /**小数位 */
    symbolDecimal?: number
    /**追加预付款比例 */
    addAdvanceCharge?: number
    /**强平比例 */
    compelCloseRatio?: number
    imgUrl?: string
    handlingFees?: number
    /**品种别名 */
    alias?: string
  }
  type OrderAccountDetail = {
    id: string
    clientId: string
    accountGroupId: string
    name: string
    money: string
    currencyUnit: string
    margin: string
    isolatedMargin: string
    status: string
    remark: string
    lastVisitedTime: string
    createTime: string
    /**组别 例如real/test2 */
    groupCode: string
    /**组名 */
    groupName: string
    fundTransfer: API.FundTransfer
    orderMode: API.OrderMode
    enableIsolated: false
    /**是否是模拟账户 */
    isSimulate: false
  }
  // 订单详情：持仓单、委托单、成交单
  type OrderDetailListItem = BgaOrderPageListItem & {
    /**账户详情信息 */
    accountDetail?: OrderAccountDetail
    /**
     * 订单集合
     */
    ordersInfo?: Array<
      OrderPageListItem & {
        /**
         * 成交记录集合
         */
        tradeRecordsInfo?: TradeRecordsPageListItem[]
      }
    >
  }

  // 持仓单分页-参数
  type BgaOrderPageListParams = {
    /**
     * 交易账户ID
     */
    accountId?: number | string
    /**
     * 持仓订单号ID
     */
    bagOrderId?: number
    /**
     * 订单方向
     */
    buySell?: API.TradeBuySell
    /**
     * 客户ID
     */
    clientId?: any
    /**
     * 结束时间
     */
    endTime?: string
    /**
     * 保证金类型
     */
    marginType?: API.MarginType
    /**
     * 订单模式
     */
    mode?: API.OrderMode
    /**
     * 开始时间
     */
    startTime?: string
    /**
     * 状态
     */
    status?: API.BGAStatus
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 客户登录账号
     */
    userAccount?: string
    /**	是否模拟，false真实，true模拟 */
    isSimulate?: boolean
    /**排序字段 */
    orderByField?: string
    /**排序方式 */
    orderBy?: API.ORDER_BY
  } & API.PageParam
  // 持仓单分页-列表
  type BgaOrderPageListItem = {
    /**
     * 当前行情
     * 前端通过接口 getBgaOrderPriceProfit 返回值构造
     */
    currentQuote?: DataSource.Quote
    /**
     * 订单方向
     */
    buySell?: API.TradeBuySell
    /**
     * 平仓价格
     */
    closePrice?: number
    /**
     * 配置
     */
    conf?: Symbol.SymbolConf
    /**
     * 创建时间
     */
    createTime?: string
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
     * 主键
     */
    id: string
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
    marginType?: API.MarginType
    /**
     * 订单模式
     */
    mode?: API.OrderMode
    /**
     * 订单保证金
     */
    orderMargin?: number
    /**
     * 订单保证金汇率
     */
    marginExchangeRate?: string
    /**
     * 订单基础保证金
     */
    orderBaseMargin?: number
    /**
     * 订单数量
     */
    orderVolume?: string
    /**交易手数 */
    tradingVolume?: string
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
     * 品种小数位
     */
    symbolDecimal: number
    /**
     * 止盈
     */
    takeProfit?: number
    /**
     * 交易账户ID
     */
    tradeAccountId?: any
    /**
     * 更新时间
     */
    updateTime?: string
    /**品种配置 */
    conf?: Symbol.SpreadConf
    /**
     * 账户id
     */
    accountId: string
    /**
     * 交易账户001
     */
    accountName: string
    /**
     * 用户登录账号 654321@163.com
     */
    userAccount: string
    /**用户名称 */
    userName: string
    /**追加预付款比例 */
    addAdvanceCharge: number
    /**强制平仓比例 */
    compelCloseRatio: number
    /**限价 */
    limitPrice?: string
    /**
     * 品种别名
     */
    alias?: string
  }
  // 成交记录-分页-参数
  type TradeRecordsPageListParams = {
    /**
     * 交易账户ID
     */
    accountId?: number | string
    /**
     * 客户ID
     */
    clientId?: number
    /**
     * 结束时间
     */
    endTime?: string
    /**
     * 成交方向
     */
    inOut?: API.OrderInOut
    /**
     * 开始时间
     */
    startTime?: string
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 成交单号ID
     */
    tradeRecordsId?: number
    /**
     * 客户登录账号
     */
    userAccount?: string
    /**	是否模拟，false真实，true模拟 */
    isSimulate?: boolean
  } & API.PageParam
  // 成交记录-分页-列表
  type TradeRecordsPageListItem = {
    /**
     * 交易账户ID
     */
    accountId?: number
    /**
     * 交易账户名
     */
    accountName?: string
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
    createTime?: string
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
     * 主键
     */
    id?: number
    /**
     * 图标
     */
    imgUrl?: string
    /**
     * 成交方向
     */
    inOut?: API.OrderInOut
    /**
     * 库存费
     */
    interestFees?: number
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
     * 品种小数位
     */
    symbolDecimal?: number
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
     * 用户登录账户
     */
    userAccount?: string
    /**
     * 用户名称
     */
    userName?: string
    /**
     * 配置
     */
    conf?: Symbol.SymbolConf
  }
  // 【全仓】追加预付款账户【敏感账户】
  type CrossHightListItem = {
    /**
     * 账户组别
     */
    accountGroup?: string
    /**
     * 交易账户ID
     */
    accountId?: number
    /**
     * 客户
     */
    client?: string
    /**
     * 客户id
     */
    clientId?: string
    /**
     * 保证金比例
     */
    marginRatio?: number
    /**
     * 余额
     */
    money?: number
  }
  // 【逐仓】追加预付款订单【敏感订单】
  type IsolatedHighListItem = {
    /**
     * 账户组别
     */
    accountGroup?: string
    /**
     * 交易账户ID
     */
    accountId?: number
    /**
     * 持仓单id
     */
    bagOrderId?: string
    /**
     * 客户
     */
    client?: string
    /**
     * 客户id
     */
    clientId?: string
    /**
     * 保证金比例
     */
    marginRatio?: number
    /**
     * 余额
     */
    money?: number
  }
}
