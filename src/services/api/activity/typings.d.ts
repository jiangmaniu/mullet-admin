declare namespace Activity {
  type ListParams = {
    /**
     * 活动订单号
     */
    activityOrderNo?: number
    /**
     * 当前页
     */
    current?: number
    /**
     * 客户UID
     */
    customerUid?: string
    /**
     * 客户邮箱/手机
     */
    emailOrPhone?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 报名结束时间
     */
    signupEndTime?: string
    /**
     * 报名开始时间
     */
    signupStartTime?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * true开，false关
     */
    status?: string
  }
  // 首充活动分页列表
  type ListItem = {
    /**
     * 活动订单号
     */
    activityOrderNo?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 客户UID
     */
    customerUid?: string
    /**
     * 客户邮箱
     */
    email?: string
    /**
     * 结束时间
     */
    endTime?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 客户手机号
     */
    phone?: string
    /**
     * 剩余赠送金额
     */
    remainingRewardAmount?: number
    /**
     * 报名时间
     */
    signupTime?: string
    /**
     * true开，false关
     */
    status?: boolean
    /**
     * 累计领取金额
     */
    totalClaimedAmount?: number
    /**
     * 累计充值金额
     */
    totalRechargeAmount?: number
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 交易订单号
     */
    tradeOrderNum?: string
  }
  // 首充活动-详情列表 参数
  type DetailListItemParams = {
    /**
     * 活动订单号
     */
    activityOrderNo?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 交易订单号
     */
    tradeOrderNo?: string
  }
  type DetailListItem = {
    /**
     * 活动订单号
     */
    activityOrderNo?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 状态
     */
    status?: boolean
    /**
     * 交易品种
     */
    symbol?: string
    /**
     * 品种组ID
     */
    symbolGroupId?: number
    /**
     * 品种组名称
     */
    symbolGroupName?: string
    /**
     * 交易订单号
     */
    tradeOrderNo?: string
    /**
     * 交易手数
     */
    tradeVolume?: number
    /**
     * 更新时间
     */
    updateTime?: string
  }
  // 活动配置
  type ActivityConfig = {
    /**
     * 活动时长(天)
     */
    activityDuration?: number
    /**
     * 活动名称
     */
    activityName?: string
    /**
     * 活动开关
     */
    activitySwitch?: boolean
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 主键
     */
    id?: number
    /**
     * 充值最低触发金额
     */
    minRechargeAmount?: number
    /**
     * 赠送奖励额度百分比
     */
    rewardPercentage?: number
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 包含品种类别及每手赠送金额的JSON数据
     */
    varietyRewards?: string
  }
  // 保存更新活动配置
  type SubmitActivityConfig = {
    /**
     * 活动时长(天)
     */
    activityDuration?: number
    /**
     * 活动名称
     */
    activityName?: string
    /**
     * 活动开关
     */
    activitySwitch?: boolean
    /**
     * 主键
     */
    id?: number
    /**
     * 充值最低触发金额
     */
    minRechargeAmount?: number
    /**
     * 赠送奖励额度百分比
     */
    rewardPercentage?: number
    /**
     * 包含品种类别及每手赠送金额的JSON数据
     */
    varietyRewards?: SymBolGroupVO[]
  }
  type SymBolGroupVO = {
    /**
     * 赠金
     */
    rewardAmount?: number
    /**
     * 交易品种组ID
     */
    symbolGroupId?: number
    /**
     * 交易品种组名称
     */
    symbolGroupName?: string
  }
}
