declare namespace PaymentChannel {
  /**
   * 资金类型
   */
  type FundsType = 'DEPOSIT' | 'WITHDRAWAL'
  /**
   * 渠道交易类型
   */
  type CollectionType = 'SAVE_MODE' | 'ORDER_MODE'
  /**开关状态 */
  type SWITCH_STATUS = 'OPEN' | 'CLOSE'
  // 出入金渠道管理列表-分页-参数
  type ChannelConfigListParams = {
    /**
     * 渠道名称,（字典表获取数据)Apay Cpay
     */
    channelName?: string
    /**
     * 出入金币种,通道币种
     */
    symbol?: string
    /**资金类型（DEPOSIT入金，WITHDRAWAL出金) */
    fundsType: FundsType
  } & API.PageParam
  // 出入金渠道管理列表-分页-item
  type ChannelConfigListItem = {
    /**
     * 平台基准货币
     */
    baseCurrency?: string
    /**
     * 渠道秘钥
     */
    channelApiKey?: string
    /**
     * 渠道网关
     */
    channelApiUrl?: string
    /**
     * 渠道汇率
     */
    channelExchangeRate?: number
    /**
     * 渠道图标URL地址
     */
    channelIcon?: string
    /**
     * 通道名称展示
     */
    channelRevealName?: string
    /**
     * 渠道多语言列表
     */
    channelLanguageAddDTOList?: ChannelLangeItem[]
    /**
     * 渠道商户号
     */
    channelMenchantNo?: string
    /**
     * 渠道名称
     */
    channelName?: string
    /**
     * 渠道通道编号
     */
    channelNo?: string
    /**
     * 支付通道编号值
     */
    channelNoValue?: string
    /**
     * 渠道结算结准货币
     */
    channelSettlementCurrency?: string
    /**
     * 渠道单笔固定手续费
     */
    channelSingleFixedFee?: number
    /**
     * 交易单笔最低手续费
     */
    channelSingleLeastFee?: number
    /**
     * 渠道排序
     */
    channelSort?: number
    /**
     * 渠道交易百分比手续费
     */
    channelTradePercentageFee?: number
    /**
     * 渠道类型
     */
    channelType?: string
    /**
     * 渠道交易类型
     */
    collectionType?: CollectionType
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 汇率ID
     */
    exchangeRateId?: number
    /**
     * 资金类型
     */
    fundsType?: FundsType
    /**
     * 主键
     */
    id?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 单笔入金限制最大金额
     */
    singleAmountMax?: number
    /**
     * 单笔入金限制起始金额
     */
    singleAmountMin?: number
    /**
     * 开关状态
     */
    status?: SWITCH_STATUS
    /**
     * 出入金币种
     */
    symbol?: string
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 汇率收取百分比
     */
    userExchangeDifferencePercentage?: number
    /**
     * 客户单笔固定手续费
     */
    userSingleFixedFee?: number
    /**
     * 客户单笔最低手续费
     */
    userSingleLeastFee?: number
    /**
     * 客户交易百分比手续费
     */
    userTradePercentageFee?: number
  }
  // 提交渠道管理
  type SubmitChannelConfigParams = {
    /**
     * 渠道秘钥
     */
    channelApiKey?: string
    /**
     * 渠道网关
     */
    channelApiUrl?: string
    /**
     * 渠道结算汇率
     */
    channelExchangeRate?: number
    /**
     * 渠道图标URL地址
     */
    channelIcon?: string
    /**
     * 渠道多语言列表
     */
    channelLanguageAddDTOList?: ChannelLangeItem[]
    /**
     * 渠道商户号
     */
    channelMenchantNo?: string
    /**
     *
     * 支付通道编号（字典二级联动，在接口/trade-crm/crmClient/public/dictionaryTree/payment_channel_type里面的children数组取dictKey给后端，dictValue显示)
     */
    channelNoValue?: string
    /**
     * 渠道结算货币
     */
    channelSettlementCurrency?: string
    /**
     * 渠道单笔固定手续费
     */
    channelSingleFixedFee?: number
    /**
     * 交易单笔最低手续费
     */
    channelSingleLeastFee?: number
    /**
     * 渠道排序
     */
    channelSort?: number
    /**
     * 渠道交易百分比手续费
     */
    channelTradePercentageFee?: number
    /**
     *
     * 渠道配置类型(请求接口/trade-crm/crmClient/public/dictionaryTree/payment_channel_type)dictKey给后端，dictValue显示)
     */
    channelType?: string
    /**
     * 渠道交易类型）
     */
    collectionType?: CollectionType
    /**
     * 汇率ID
     */
    exchangeRateId?: number
    /**
     * 资金类型
     */
    fundsType?: FundsType
    /**
     * 备注
     */
    remark?: string
    /**
     * 单笔入金限制最大金额
     */
    singleAmountMax?: number
    /**
     * 单笔入金限制起始金额
     */
    singleAmountMin?: number
    /**
     * 开关状态
     */
    status?: SWITCH_STATUS
    /**
     * 汇差收取百分比）
     */
    userExchangeDifferencePercentage?: string
    /**
     * 客户单笔固定手续费
     */
    userSingleFixedFee?: number
    /**
     * 客户单笔最低手续费
     */
    userSingleLeastFee?: number
    /**
     * 客户交易百分比手续费
     */
    userTradePercentageFee?: number
    id?: any
  }
  // 更新渠道开关
  type UpdateChannelConfigStatus = {
    /**渠道ID */
    id: any
    status: SWITCH_STATUS
    fundsType: FundsType
  }
  type ChannelLangeItem = {
    /**
     * 是否默认语言
     */
    defaultFlag?: 'YES' | 'NO'
    /**
     * 出入金说明
     */
    explanation?: ExplanationItem[]
    /**
     * 语言编码
     */
    language?: string
    /**
     * 出入金须知
     */
    notice?: string
  }
  // 入金说明
  type ExplanationItem = {
    title: string
    content: string
  }
}
