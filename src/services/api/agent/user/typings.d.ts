declare namespace AgentUser {
  /**
   * 等级评估周期（MONTHLY-每月；SEMIANNUALLY-每半年；QUARTERLY-每季度；CUMULATIVE-累计）
   */
  type EvaluationPeriod = 'MONTHLY' | 'SEMIANNUALLY' | 'QUARTERLY' | 'CUMULATIVE'
  /**
   *
   * 类型（FIXED_AMOUNT-固定金额；NET_DEPOSIT_PERCENTAGE-净入金百分比；FEE_PERCENTAGE-手续费百分比；PROFIT_LOSS_PERCENTAGE-盈亏百分比）
   */
  type RebateType = 'FIXED_AMOUNT' | 'NET_DEPOSIT_PERCENTAGE' | 'FEE_PERCENTAGE' | 'PROFIT_LOSS_PERCENTAGE'

  /**
   * 统计周期（DAY-天；WEEK-周；MONTH-月；QUARTER-季度）
   */
  type StatisticPeriod = 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER'

  /**
   * 用户类型(1普通用户，2代理商)
   */
  type UserType = 'USER' | 'AGENT'

  // 绑定代理
  type BindAgentParams = {
    /**
     * 备注
     */
    remark?: string
    /**
     * 用户Uid
     */
    userUid?: number
    /**代理商Uid */
    agentUid?: string
  }
  // 添加代理
  type AddAgentParams = {
    /**
     * 代理等级ID
     */
    levelId?: number
    /**多层级返佣配置 */
    multiLevelConfigDTOList?: MultiLevelConfigItem[]
    /**
     * 用户Uid
     */
    userUid?: number
    /**
     * 代理模式
     */
    levelMode?: AgentSettings.LevelMode
  }
  // 返佣标准-返佣配置修改
  type UpdateRebateConfigParams = {
    /**所属代理商id */
    agentId: any
    /**用户ID */
    userId: any
    /**代理等级ID */
    levelId?: any
    /**返佣配置 */
    multiLevelConfigDTOList?: MultiLevelConfigItem[]
    /**用户类型 */
    userType: UserType
  }
  /**
   * MultiLevelConfig对象，代理商多层级配置表
   */
  type MultiLevelConfigItem = {
    /**排序**/
    sortIndex?: number
    /**
     * 账户组ID
     */
    accountGroupId?: string
    /**
     * 账户组名称
     */
    accountGroupName?: string
    /**
     * 代理商ID
     */
    agentId?: number
    /**
     * 主键
     */
    id?: number
    /**
     *
     * 类型（FIXED_AMOUNT-固定金额；NET_DEPOSIT_PERCENTAGE-净入金百分比；FEE_PERCENTAGE-手续费百分比；PROFIT_LOSS_PERCENTAGE-盈亏百分比）
     */
    rebateType?: RebateType
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
    statisticPeriod?: StatisticPeriod
    /**
     * 交易品种
     */
    symbol?: string
  }
  // 代理等级列表
  type LevelListItem = {
    /**
     * 等级评估周期（MONTHLY-每月；SEMIANNUALLY-每半年；QUARTERLY-每季度；CUMULATIVE-累计）
     */
    evaluationPeriod?: EvaluationPeriod
    /**
     * 主键
     */
    id?: number
    /**
     * 等级名称
     */
    levelName?: string
    /**
     * 净入金值
     */
    netDeposit?: number
    /**
     * 净值
     */
    netValue?: number
    /**
     * 交易手数值
     */
    tradeVolume?: number
    /**
     * 交易人数
     */
    userCount?: number
  }
  /**
   * RebateConfig对象，代理商返佣配置表
   */
  type RebateConfigItem = {
    /**
     * 账户组ID
     */
    accountGroupId?: string
    /**
     * 账户组名称
     */
    accountGroupName?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 关联等级ID
     */
    levelId?: number
    /**
     *
     * 类型（FIXED_AMOUNT-固定金额；NET_DEPOSIT_PERCENTAGE-净入金百分比；FEE_PERCENTAGE-手续费百分比；PROFIT_LOSS_PERCENTAGE-盈亏百分比）
     */
    rebateType?: RebateType
    /**
     * 值
     */
    rebateValue?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 序号
     */
    sortIndex?: number
    /**
     * 统计周期（DAY-天；WEEK-周；MONTH-月；QUARTER-季度）
     */
    statisticPeriod?: StatisticPeriod
    /**
     * 交易品种
     */
    symbol?: string
  }
  // 多层级配置列表
  type MultiLevelConfigListItem = {
    /**
     * 账户组ID
     */
    accountGroupId?: string
    /**
     * 账户组名称
     */
    accountGroupName?: string
    /**
     * 主键
     */
    id?: number
    /**
     *
     * 类型（FIXED_AMOUNT-固定金额；NET_DEPOSIT_PERCENTAGE-净入金百分比；FEE_PERCENTAGE-手续费百分比；PROFIT_LOSS_PERCENTAGE-盈亏百分比）
     */
    rebateType?: RebateType
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
    statisticPeriod?: StatisticPeriod
    /**
     * 交易品种
     */
    symbol?: string
  }
  // 代理等级返佣配置列表
  type LevelRebateConfigListItem = {
    /**
     * 账户组ID
     */
    accountGroupId?: string
    /**
     * 账户组名称
     */
    accountGroupName?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 关联等级ID
     */
    levelId?: number
    /**
     *
     * 类型（FIXED_AMOUNT-固定金额；NET_DEPOSIT_PERCENTAGE-净入金百分比；FEE_PERCENTAGE-手续费百分比；PROFIT_LOSS_PERCENTAGE-盈亏百分比）
     */
    rebateType?: RebateType
    /**
     * 值
     */
    rebateValue?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 序号
     */
    sortIndex?: number
    /**
     * 统计周期（DAY-天；WEEK-周；MONTH-月；QUARTER-季度）
     */
    statisticPeriod?: StatisticPeriod
    /**
     * 交易品种
     */
    symbol?: string
  }
  // 代理用户列表分页-参数
  type AgentUserPageListParams = {
    /**
     * 所属代理商ID
     */
    agentId?: number
    /**
     * 当前页
     */
    current?: number
    /**
     * 邮箱
     */
    email?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 等级模式ID
     */
    levelId?: number
    /**
     * 钱包余额
     */
    money?: number
    /**
     * 密码
     */
    password?: string
    /**
     * 手机
     */
    phone?: string
    /**
     * 手机号码区域代码
     */
    phoneAreaCode?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 姓名
     */
    userName?: string
    /**
     * 用户类型(1普通用户，2代理商)
     */
    userType: UserType
    /**
     * 账号
     */
    userUid?: string
  }
  // 代理用户列表分页-item
  type AgentUserPageListItem = {
    /**
     * 名下客户累计产生佣金
     */
    accumulatedCommission?: number
    /**
     * 所属代理商ID
     */
    agentId?: string
    /**
     * 绑定时间
     */
    bindTime?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 入金
     */
    deposit?: number
    /**
     * 邮箱
     */
    email?: string
    /**
     * 产生佣金
     */
    generateCommission?: number
    /**
     * 交易手续费
     */
    handlingFee?: number
    /**
     * 是否有子级,true有,false没有
     */
    hasChildren?: boolean
    children?: AgentUserPageListItem[]
    /**
     * 主键
     */
    id?: number
    /**
     * 邀请码
     */
    invitationCode?: string
    /**
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 等级模式ID
     */
    levelId?: number
    /**
     * 代理商等级模式 (single,multiple)
     */
    levelMode?: AgentSettings.LevelMode
    /**
     * 代理等级
     */
    levelName?: string
    /**
     * 钱包余额
     */
    money?: number
    /**
     * 净入金
     */
    netDeposit?: number
    /**
     * 客户数量
     */
    numberOfCustomers?: number
    /**
     * 密码
     */
    password?: string
    /**
     * 手机
     */
    phone?: string
    /**
     * 手机号码区域代码
     */
    phoneAreaCode?: string
    /**
     * 已实现盈亏
     */
    realizedProfitLoss?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 上级代理
     */
    topAgentName?: string
    /**
     * 总入金
     */
    totalDeposit?: number
    /**
     * 总出金
     */
    totalWithdrawal?: number
    /**
     * 交易手数
     */
    tradeVolume?: number
    /**
     * 未结算返佣余额
     */
    unsettledRebateBalance?: number
    /**
     * 姓名
     */
    userName?: string
    /**
     * 用户类型(1普通用户，2代理商)
     */
    userType?: UserType
    /**
     * 账号
     */
    userUid?: string
    /**
     * 返佣钱包余额
     */
    walletBalance?: number
    /**
     * 出金
     */
    withdrawal?: number
  }
  // 子用户列表查询
  type SubUserListQueryListItem = {
    /**
     * 名下客户累计产生佣金
     */
    accumulatedCommission?: number
    /**
     * 所属代理商ID
     */
    agentId?: number
    /**
     * 邮箱
     */
    email?: string
    /**
     * 产生佣金
     */
    generateCommission?: number
    /**
     * 交易手续费
     */
    handlingFee?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 等级模式ID
     */
    levelId?: number
    /**
     * 钱包余额
     */
    money?: number
    /**
     * 净入金
     */
    netDeposit?: number
    /**
     * 客户数量
     */
    numberOfCustomers?: number
    /**
     * 密码
     */
    password?: string
    /**
     * 手机
     */
    phone?: string
    /**
     * 手机号码区域代码
     */
    phoneAreaCode?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 总入金
     */
    totalDeposit?: number
    /**
     * 总出金
     */
    totalWithdrawal?: number
    /**
     * 交易手数
     */
    tradeVolume?: number
    /**
     * 未返佣余额
     */
    unsettledRebateBalance?: number
    /**
     * 姓名
     */
    userName?: string
    /**
     * 用户类型(1普通用户，2代理商)
     */
    userType?: UserType
    /**
     * 账号
     */
    userUid?: string
    /**
     * 钱包余额
     */
    walletBalance?: number
    /**
     * 是否有子级,true有,false没有，是否有子级,true有,false没有，需要调接口展开子级
     */
    hasChildren?: boolean
    /**自定义属性 */
    children?: SubUserListQueryListItem[]
  }
  // 返佣标准列表item
  type RebateStandardsQueryListItem = {
    /**
     * 等级评估周期（MONTHLY-每月；SEMIANNUALLY-每半年；QUARTERLY-每季度；CUMULATIVE-累计）
     */
    evaluationPeriod?: EvaluationPeriod
    /**
     * 主键
     */
    id?: number
    /**
     * 等级名称
     */
    levelName?: string
    /**
     * 多层级模式列表
     */
    multiLevelConfigVOList?: MultiLevelConfigItem[]
    /**
     * 净入金值
     */
    netDeposit?: number
    /**
     * 已实现净入金
     */
    achievedNetDeposit?: number
    /**
     * 净值
     */
    netValue?: number
    /**已实现净值 */
    achievedNetValue?: number
    /**
     * 等级模式返佣配置列表
     */
    rebateConfigVOList?: RebateConfigItem[]
    /**
     * 交易手数值
     */
    tradeVolume?: number
    /**
     * 已实现交易手数值
     */
    achievedTradeVolume?: number
    /**
     * 交易人数
     */
    userCount?: number
    /**
     * 已实现交易人数
     */
    achievedUserCount?: number
    /**
     * 用户类型(1普通用户,2代理商)
     */
    userType?: UserType
  }
  // 代理商统计
  type AgentCount = {
    /**
     * 累计产生佣金
     */
    accumulatedCommission?: number
    /**
     * 交易手续费
     */
    handlingFee?: number
    /**
     * 净入金
     */
    netDeposit?: number
    /**
     * 客户数量
     */
    numberOfCustomers?: number
    /**
     * 盈亏
     */
    profitLoss?: number
    /**
     * 总入金
     */
    totalDeposit?: number
    /**
     * 总出金
     */
    totalWithdrawal?: number
    /**
     * 已结算佣金
     */
    settledCommission?: number
    /**
     * 交易量
     */
    tradingVolume?: number
    /**
     * 未结算佣金
     */
    unsettledCommission?: number
  }
  // 所有用户统计
  type UserCount = {
    /**
     * 累计产生佣金
     */
    accumulatedCommission?: number
    /**
     * 交易手续费
     */
    handlingFee?: number
    /**
     * 净入金
     */
    netDeposit?: number
    /**
     * 客户数量
     */
    numberOfCustomers?: number
    /**
     * 盈亏
     */
    profitLoss?: number
    /**
     * 已结算佣金
     */
    settledCommission?: number
    /**
     * 总入金
     */
    totalDeposit?: number
    /**
     * 总出金
     */
    totalWithdrawal?: number
    /**
     * 交易量
     */
    tradingVolume?: number
    /**
     * 未结算佣金
     */
    unsettledCommission?: number
  }
}
