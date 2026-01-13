declare namespace Customer {
  type ListItemParams = {
    /**
     * 客户ID
     */
    clientId?: number
    /**
     * 邮箱
     */
    email?: string
    /**
     * 结束时间
     */
    endTime?: string
    /**
     * 是否绑定银行卡
     */
    isBankcardBind?: boolean | string
    /**
     * 是否KYC认证
     */
    isKycAuth?: boolean | string
    /**
     * 姓名
     */
    name?: string
    /**
     * 开始时间
     */
    startTime?: string
    /**
     * 客户登录账号
     */
    userAccount?: string
  } & API.PageParam
  // 客户分页
  type ListItem = {
    /**
     * 客户交易账户
     */
    children?: User.AccountItem[]
    accountList?: User.AccountItem[]
    /**
     * 地址
     */
    address?: string
    /**
     * 银行卡认证信息
     */
    bankCardAuth?: BankCard.ListItem[]
    /**
     * 客户组ID
     */
    clientGroupId?: number
    /**
     * 主键
     */
    id?: string
    /**
     * 是否绑定银行卡
     */
    isBankcardBind?: boolean
    /**
     * 是否KYC认证
     */
    isKycAuth?: boolean
    /**
     * KYC认证信息
     */
    kycAuth?: KycAuth.ListItem[]
    /**
     * KYC身份认证ID
     */
    kycAuthId?: number
    /**
     * 备注
     */
    remark?: string
    /**用户信息 */
    userInfo?: {
      /**
       * 账号
       */
      account?: string
      /**
       * 头像
       */
      avatar?: string
      /**
       * 生日
       */
      birthday?: string
      /**
       * 用户编号
       */
      code?: string
      /**
       * 创建部门
       */
      createDept?: number
      /**
       * 创建时间
       */
      createTime?: string
      /**
       * 创建人
       */
      createUser?: number
      /**
       * 部门id
       */
      deptId?: string
      /**
       * 邮箱
       */
      email?: string
      /**
       * 主键id
       */
      id?: number
      /**
       * 是否已删除
       */
      isDeleted?: number
      /**
       * 昵称
       */
      name?: string
      /**
       * 密码
       */
      password?: string
      /**
       * 手机
       */
      phone?: string
      /**
       * 区号
       */
      phoneAreaCode?: string
      /**
       * 岗位id
       */
      postId?: string
      /**
       * 真名
       */
      realName?: string
      /**
       * 角色id
       */
      roleId?: string
      /**
       * 性别
       */
      sex?: number
      /**
       * 业务状态
       */
      status?: number
      /**
       * 租户ID
       */
      tenantId?: string
      /**
       * 更新时间
       */
      updateTime?: string
      /**
       * 更新人
       */
      updateUser?: number
      /**
       * 用户平台
       */
      userType?: number
    }
    /**
     * 交易账号统计信息
     */
    accountCount?: {
      /**
       * 账户净值
       */
      availableBalance?: number
      /**
       * 交易账户id
       */
      id?: number
      /**
       * 总入金
       */
      totalDeposit?: number
      /**
       * 总盈亏
       */
      totalProfitLoss?: number
      /**
       * 总成交量
       */
      totalTradeVolume?: number
      /**
       * 总出金
       */
      totalWithdrawal?: number
    }
    // 业务线信息
    clientGroup?: {
      /**
       * 账户组ID
       */
      accountGroupId?: string
      /**
       * 识别码
       */
      code?: string
      /**
       * 组名称
       */
      groupName?: string
      /**
       * 主健ID
       */
      id?: number
      /**
       * KYC认证
       */
      kycAuth?: API.KycAuthType
      /**
       * 支付方式
       */
      payWay?: string
      /**
       * 注册方式
       */
      registerWay?: API.RegisterWay
      /**
       * 备注
       */
      remark?: string
      /**
       * 出金申请次数
       */
      withdrawalLimitCount?: number
      /**
       * 出金判断周期
       */
      withdrawalLimitCycle?: number
      /**
       * 出金金额（累计）
       */
      withdrawalLimitMoney?: number
      /**
       * 出金方式
       */
      withdrawalWay?: string
    }
  }
  // 修改或新增
  type AddOrUpdateParams = {
    /**
     * 主健ID
     */
    id?: number
    /**
     * 账号
     */
    account: string
    /**
     * 地址
     */
    address?: string
    /**
     * 头像
     */
    avatar?: string
    /**
     * 生日
     */
    birthday?: string
    /**
     * 客户组ID
     */
    clientGroupId?: number
    /**
     * 邮箱
     */
    email?: string
    /**
     * 昵称
     */
    name?: string
    /**
     * 密码【加密】
     */
    password?: string
    /**
     * 手机
     */
    phone?: string
    /**区号 */
    phoneAreaCode?: string
    /**
     * 真名
     */
    realName?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 性别
     */
    sex?: number
  }
  // 延时成交客户
  type DelayuserListItem = {
    id: string
    addTime: string
    account: string
    email: string
    phone: string
  }
  type AddDeplayUserParams = {
    accountEmailPhone: string
  }
}
