declare namespace AgentSettings {
  /**
   * 结算到账账户 (MT: MT账户, PLATFORM: 平台钱包)
   */
  type SettlementAccount = 'MT' | 'PLATFORM'

  /**
   * 提现审核模式 (AUTOAUDIT: 自动审核, MANUALAUDIT: 手动审核)
   */
  type WithdrawAuditMode = 'AUTOAUDIT' | 'MANUALAUDIT'

  /**
   * 提现频率 (DAYONE: 一天一次, WEEKONE一周一次, MONTHONE 每月一次)
   */
  type WithdrawFrequency = 'DAYONE' | 'MONTHONE' | 'WEEKONE'

  /**
   * 代理商等级模式 (single,multiple)
   */
  type LevelMode = 'single' | 'multiple'

  // 账户组列表
  type accountGroupListItem = {
    /**
     * 组别
     */
    groupCode?: string
    /**
     * 组名称
     */
    groupName?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 备注
     */
    remark?: string
  }
  // 代理模式设置查询
  type SettingsQueryInfo = {
    /**
     * 多层级模式列表
     */
    commonMultiLevelConfigVOList?: CommonMultiLevelConfigItem[]
    /**
     * 主键
     */
    id?: number
    /**
     * 代理商等级模式列表
     */
    levelConfigVoList?: LevelConfigItem[]
    /**
     * 代理商等级模式 (single,multiple)
     */
    levelMode?: LevelMode
    /**
     * 自动审核最大金额
     */
    maxAutoAuditAmount?: number
    /**
     * 最低提现金额
     */
    minWithdrawAmount?: number
    /**
     * 结算到账账户 (MT: MT账户, PLATFORM: 平台钱包)
     */
    settlementAccount?: SettlementAccount
    /**
     * 提现审核模式 (AUTOAUDIT: 自动审核, MANUALAUDIT: 手动审核)
     */
    withdrawAuditMode?: WithdrawAuditMode
    /**
     * 提现频率 (DAYONE: 一天一次, WEEKONE一周一次, MONTHONE 每月一次)
     */
    withdrawFrequency?: WithdrawFrequency
  }
  /**
   * CommonMultiLevelConfig对象_1，代理商公共多层级配置表
   */
  type CommonMultiLevelConfigItem = {
    /**
     * 账户组ID
     */
    accountGroupId?: string
    /**
     * 账户组名称
     */
    // accountGroupName?: string;
    /**
     * 主键
     */
    id?: number
    /**
     *
     * 类型（FIXED_AMOUNT-固定金额；NET_DEPOSIT_PERCENTAGE-净入金百分比；FEE_PERCENTAGE-手续费百分比；PROFIT_LOSS_PERCENTAGE-盈亏百分比）
     */
    rebateType?: AgentUser.RebateType
    /**
     * 值
     */
    rebateValue?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 统计周期（DAY-天；WEEK-周；MONTH-月；QUARTER-季度）
     */
    statisticPeriod?: AgentUser.StatisticPeriod
    /**
     * 交易品种
     */
    symbol?: string
  }
  /**
   * LevelConfig对象，代理商等级配置表
   */
  type LevelConfigItem = {
    /**
     * 等级评估周期（MONTHLY-每月；SEMIANNUALLY-每半年；QUARTERLY-每季度；CUMULATIVE-累计）
     */
    evaluationPeriod?: AgentUser.EvaluationPeriod
    /**
     * 主键
     */
    id?: number
    /**
     * 等级名称
     */
    levelName?: string
    /**
     * 净入金
     */
    netDeposit?: number
    /**
     * 净值
     */
    netValue?: number
    /**
     * 返佣配置列表
     */
    rebateConfigVOList?: AgentUser.RebateConfigItem[]
    /**
     * 交易手数
     */
    tradeVolume?: number
    /**
     * 交易人数
     */
    userCount?: number
  }
  // 交易组品种树
  type TradeSymbolsTreeItem = {
    /**
     * 组名称
     */
    groupName?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 父级ID
     */
    parentId?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 子级交易品种组列表
     */
    subTradeSymbolGroupList?: TradeSymbolsTreeItem[]
    /**
     * 交易品种列表
     */
    symbolList?: TradeSymbolItem[]
  }
  /**
   * TradeSymbols对象，交易品种
   */
  type TradeSymbolItem = {
    /**
     * 别名
     */
    alias?: string
    /**
     * 分类
     */
    classify?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 图标
     */
    imgUrl?: string
    /**
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 状态
     */
    status?: number
    /**
     * 品种名称
     */
    symbol?: string
    /**
     * 品种小数位
     */
    symbolDecimal?: number
    /**
     * 品种组ID
     */
    symbolGroupId?: number
  }
  // 代理模式设置保存/更新
  type SaveOrUpdateAgentSettings = {
    /**
     * 多层级模式列表
     */
    commonMultiLevelConfigDTOList?: AgentUser.MultiLevelConfigItem[]
    /**
     * 主键
     */
    id?: number
    /**
     * 等级模式列表
     */
    levelConfigDTOList?: Array<
      Omit<LevelConfigItem, 'rebateConfigVOList'> & {
        rebateConfigDTOList?: AgentUser.RebateConfigItem[]
      }
    >
    /**
     * 代理商等级模式 (single,multiple)
     */
    levelMode?: LevelMode
    /**
     * 自动审核最大金额
     */
    maxAutoAuditAmount?: number
    /**
     * 最低提现金额
     */
    minWithdrawAmount?: number
    /**
     * 结算到账账户 (MT: MT账户, PLATFORM: 平台钱包)
     */
    settlementAccount?: SettlementAccount
    /**
     * 提现审核模式 (AUTOAUDIT: 自动审核, MANUALAUDIT: 手动审核)
     */
    withdrawAuditMode?: WithdrawAuditMode
    /**
     * 提现频率 (DAYONE: 一天一次, WEEKONE一周一次, MONTHONE 每月一次)
     */
    withdrawFrequency?: WithdrawFrequency
  }
}
