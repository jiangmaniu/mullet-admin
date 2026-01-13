declare namespace Manager {
  type ListItemParams = {
    /**
     * 经理ID
     */
    managerId?: number
    /**
     * 姓名
     */
    name?: string
    /**
     * 经理登录账号
     */
    userAccount?: string
  } & API.PageParam
  // 经理用户-分页
  type ListItem = {
    /**用户id */
    userId?: string
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
     * 客户组
     */
    clientGroup?: string
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
     * 主键
     */
    id?: number
    /**
     * IP白名单
     */
    ipWhitelist?: string
    /**
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 昵称
     */
    name?: string
    /**
     * 手机
     */
    phone?: string
    /**
     * 岗位id
     */
    postId?: string
    /**
     * 真名
     */
    realName?: string
    /**
     * 最近访问
     */
    lastLoginTime?: string
    /**
     * 备注
     */
    remark?: string
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
    /**
     * 状态 1启用 0禁用
     */
    status?: 1 | 0
  }
  // 经理用户-新增
  type AddOrEditParams = {
    /**
     * 账号
     */
    account: string
    /**
     * 头像
     */
    avatar?: string
    /**
     * 生日
     */
    birthday?: string
    /**
     * 客户组
     */
    clientGroup?: string
    /**
     * 邮箱
     */
    email?: string
    /**
     * 主健ID
     */
    id?: number
    /**
     * IP白名单
     */
    ipWhitelist?: string
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
    /**
     * 状态 1启用 0禁用
     */
    status?: 1 | 0
    /**角色id，多个逗号分隔 */
    roleId?: string
  }

  // 角色树形结构
  type RoleTreeItem = {
    hasChildren: boolean
    id: string
    title: string
    /**同id的值 */
    value: string
    /**同id的值 */
    key: string
    parentId: '0'
    children: RoleTreeItem[]
  }
  // 创建谷歌秘钥返回
  type createGoogleScretRes = {
    /**
     * 谷歌绑定状态：0-未绑定；1-已绑定
     */
    googleStatus?: number
    /**
     * 二维码
     */
    qrCode?: string
    /**
     * 谷歌秘钥
     */
    secret?: string
  }
  // 绑定谷歌验证码参数
  type VerifyGoogleScretParams = {
    /**
     * 谷歌验证码
     */
    googleCode: string
    /**
     * 秘钥
     */
    secret: string
    /**
     * 用户ID不能为空
     */
    userId: any
  }
}
