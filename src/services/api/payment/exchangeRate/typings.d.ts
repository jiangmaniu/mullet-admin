declare namespace PaymentExchangeRate {
  type ExchangeRateParams = {
    /**
     * 货币编号
     */
    currencyCode?: string
    /**
     * 货币名称
     */
    currencyName?: string
  } & API.PageParam
  type ExchangeRateListItem = {
    /**
     * 基准货币
     */
    baseCurrency?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 货币编号
     */
    currencyCode?: string
    /**
     * 货币名称
     */
    currencyName?: string
    /**
     * 货币符号
     */
    currencySymbol?: string
    /**
     * 兑换比例
     */
    exchangeRatio?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 更新时间
     */
    updateTime?: string
  }
  type SaveExchangeRateParams = {
    /**
     * 基准货币
     */
    baseCurrency?: string
    /**
     * 货币编号
     */
    currencyCode?: string
    /**
     * 货币名称
     */
    currencyName?: string
    /**
     * 货币符号
     */
    currencySymbol?: string
    /**
     * 兑换比例
     */
    exchangeRatio?: number
  }
  type UpdateExchangeRateParams = {
    id: string
    /**
     * 兑换比例
     */
    exchangeRatio?: number
  }
  // 汇率出入金币种列表
  type SymbolTypeList = {
    /**
     * 基准货币
     */
    baseCurrency?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 货币编号
     */
    currencyCode?: string
    /**
     * 货币名称
     */
    currencyName?: string
    /**
     * 货币符号
     */
    currencySymbol?: string
    /**
     * 兑换比例
     */
    exchangeRatio?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 更新时间
     */
    updateTime?: string
  }
  // 汇率修改历史记录分页-参数
  type ExchangeRateLogParams = {
    /**
     * 汇率ID
     */
    id: number
  } & API.PageParam
  // 汇率修改历史记录分页
  type ExchangeRateLogListItem = {
    /**
     * 基准货币
     */
    baseCurrency?: string
    /**
     * 货币简称
     */
    currencyCode?: string
    /**
     * 货币名称
     */
    currencyName?: string
    /**
     * 货币符号
     */
    currencySymbol?: string
    /**
     * 汇率表主键ID
     */
    exchangeRateId?: number
    /**
     * 兑换比例
     */
    exchangeRatio?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 修改人
     */
    modifier?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 更新时间
     */
    updateTime?: string
  }
}
