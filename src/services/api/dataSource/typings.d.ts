declare namespace DataSource {
  /**
   * 连接状态
   */
  type ConnectStatus = 'CONNECTING' | 'DISCONNECT'

  /**
   * 数据源类型
   */
  type DsType = 'PRIMEXM' | 'MT5' | 'BINANCE' | 'HUOBI'

  // k线类型
  type KlineType = '1min' | '5min' | '15min' | '30min' | '60min' | '4hour' | '1day' | '1week' | '1mon'

  /**
   * 状态
   */
  type Status = 'ENABLE' | 'DISABLED'

  type DataSourceListItem = {
    /**
     * 连接地址
     */
    address?: string
    /**
     * 数据源代码
     */
    code?: string
    /**
     * 配置信息
     */
    confInfo?: Array<{ key: string; value: string }>
    /**
     * 连接状态
     */
    connectStatus?: ConnectStatus
    /**
     * 上次连接时间
     */
    lastConnectTime?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 数据源类型
     */
    dsType?: DsType
    /**
     * 主键
     */
    id?: string
    /**
     * 图标
     */
    imgUrl?: string
    /**
     * 数据源名称
     */
    name?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 优先级排序
     */
    sort?: number
    /**
     * 状态
     */
    status?: Status
    /**
     * 行情源订阅品种，后台根据应用品种规则自动生成
     */
    subSymbols?: string[]
    /**
     * 应用品种
     */
    symbols?: string
  }
  // 行情数据源-订阅别名列表
  type DataSourceSubAliasListItem = {
    /**
     * 别名
     */
    alias?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 数据源ID
     */
    datasourceId?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 订阅symbol
     */
    subscribe?: string
  }
  // 行情数据源-订阅别名新增或修改
  type SubmitDataSourceSubAliasParams = {
    /**
     * 别名
     */
    alias?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 数据源ID
     */
    datasourceId?: string
    /**
     * 主键
     */
    id?: string
    /**
     * 订阅symbol
     */
    subscribe?: string
  }
  // 行情源配置-新增或修改
  type SubmitDataSourceParams = {
    /**
     * 连接地址
     */
    address?: string
    /**
     * 数据源代码
     */
    code?: string
    /**
     * 配置信息
     */
    confInfo?: string
    /**
     * 数据源类型
     */
    dsType?: DsType
    /**
     * 主键
     */
    id?: number
    /**
     * 图标
     */
    imgUrl?: string
    /**
     * 数据源名称
     */
    name?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 应用品种
     */
    symbols?: string
  }
  // 产品K线数据-分页-参数
  type KlineListParams = {
    /**
     * 是否首次请求
     */
    first?: string
    /**
     * K线时间
     */
    klineTime?: number
    /**
     * K线类型
     */
    klineType?: KlineType
    /**
     * K线数量
     */
    size?: number
    /**
     * symbol
     */
    symbol?: string
  }
  type KlineTimeFrameParams = {
    symbol: string
    /**	K线开始时间 */
    startTime?: string
    /**K线结束时间 */
    endTime?: string
    /**
     * K线类型
     */
    klineType?: KlineType
  }
  // 产品K线数据-分页
  type KlineListItem = {
    /**
     * K线时间
     */
    klineTime?: number
    /**
     * 本阶段收盘价
     */
    close?: number
    /**
     * 本阶段最高价
     */
    high?: number
    /**
     * 本阶段最低价
     */
    low?: number
    /**
     * 本阶段开盘价
     */
    open?: number
  }
  // 获取当前交易品种最新Ticker 高开低收信息
  type SymbolNewTicker = {
    /**
     * 最新价
     */
    close?: number
    /**
     * 最高价
     */
    high?: number
    /**
     * 最低价
     */
    low?: number
    /**
     * 开盘价
     */
    open?: number
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 响应生成时间点
     */
    time?: number
  }
  // 查询时间段交易品种价格数据-参数
  type SymbolPriceParams = {
    /**
     * 排序
     */
    orderBy?: string
    /**
     * 开始时间
     */
    queryTime?: number
    /**
     * 数据量
     */
    size?: number
    /**
     * 交易品种
     */
    symbol: string
  }
  type SymbolPriceItem = {
    /**13位时间戳 */
    timestamp: any
    /**买盘[卖价] */
    bid: any
    /**卖盘[买价] */
    ask: any
    /**行情源 */
    ds: any
    /**行情源品种 */
    symbol: any
    /**行情源时间 */
    dsTime: any
    /**状态 */
    status: any
  }
  // 获取数据源类型
  type DataSourceTypeItem = {
    label: string
    value: string
    params: any[]
    icon: string
  }
}
