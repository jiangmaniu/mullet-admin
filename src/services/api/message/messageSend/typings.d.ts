declare namespace MessageSend {
  // 站内信 new==============
  /**
   * 1即时发送，0定时发送
   */
  type ImmediateSend = 'IMMEDIATE' | 'SCHEDULED'

  /**
   * 接收对象类型（ALL_USERS全部用户，BUSINESS_LINE业务线，CUSTOMER客户，ACCOUNT_TYPE账户类型）
   */
  type RecipientType = 'ALL_USERS' | 'BUSINESS_LINE' | 'CUSTOMER' | 'ACCOUNT_TYPE'

  /**
   * 状态（SENDING待发送，SUCCESS已发送，FAIL发送失败）
   */
  type SendStatus = 'SENDING' | 'SUCCESS' | 'FAIL'
  // 发送站内信-分页 参数
  type MessageSendListParams = {
    /**
     * 当前页
     */
    current?: number
    /**
     * 结束时间
     */
    endTime?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 开始时间
     */
    startTime?: string
    /**
     * 状态（SENDING待发送，SUCCESS已发送，FAIL发送失败）
     */
    status?: SendStatus
    /**
     * 标题
     */
    title?: string
  }
  // 发送站内信-分页
  type MessageSendListItem = {
    /**
     * 账户组ID，多个逗号隔开
     */
    accountGroupId?: string
    /**
     * 业务线ID
     */
    businessLine?: string
    /**
     * 内容
     */
    content?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 操作人
     */
    createUser?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 1即时发送，0定时发送
     */
    immediateSend?: ImmediateSend
    /**
     * 是否删除
     */
    isDeleted?: number
    /**
     * 接收对象类型（ALL_USERS全部用户，BUSINESS_LINE业务线，CUSTOMER客户，ACCOUNT_TYPE账户类型）
     */
    recipientType?: RecipientType
    /**
     * 定时发送时间
     */
    scheduledTime?: string
    /**
     * 发送通道
     */
    sendChannel?: string
    /**
     * 发送类型，0短信，1邮件，2站内信
     */
    sendType?: number
    /**
     * 状态（SENDING待发送，SUCCESS已发送，FAIL发送失败）
     */
    status?: SendStatus
    /**
     * 标题
     */
    title?: string
    /**
     * 修改时间
     */
    updateTime?: string
    /**
     * 修改人
     */
    account?: number
    /**
     * 用户UID，多个逗号隔开
     */
    userUid?: string
  }
  // 新建站内信-新增
  type SubmitMessageSendParams = {
    /**
     * 账户组ID，多个逗号隔开
     */
    accountGroupId?: string
    /**
     * 业务线ID
     */
    businessLine?: string
    /**
     * 内容
     */
    content?: string
    /**
     * 主键
     */
    id?: number
    /**
     * IMMEDIATE即时发送，SCHEDULED定时发送
     */
    immediateSend?: ImmediateSend
    /**
     * 接收对象类型（ALL_USERS全部用户，BUSINESS_LINE业务线，CUSTOMER客户，ACCOUNT_TYPE账户类型）
     */
    recipientType?: RecipientType
    /**
     * 定时发送时间
     */
    scheduledTime?: string
    /**
     * 标题
     */
    title?: string
    /**
     * 用户UID，多个逗号隔开
     */
    userUid?: string
  }
}
