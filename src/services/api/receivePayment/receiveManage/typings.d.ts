declare namespace PaymentReceiveManage {
  /**
   * 收款资源状态
   */
  type Status = 'IDLE' | 'OCCUPY' | 'DISABLE' | 'AUTOSTOP'

  type ReceiveResourceListItem = {
    /**
     * 账户
     */
    account?: string
    /**
     * 银行名称
     */
    bankName?: string
    /**
     * 类型名称
     */
    channelNo?: string
    /**
     * 类型字典值
     */
    channelNoValue?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 单日限额
     */
    dayLimitAmount?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 姓名
     */
    name?: string
    /**
     * 收款码
     */
    paymentCode?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 收款资源状态
     */
    status?: Status
    /**
     * 总限额
     */
    totalLimitAmount?: number
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 权重
     */
    weight?: number
    /**今日收入 */
    todayAmount?: number
    /**累计收入 */
    totalAmount?: number
  }
  type ReceiveResourceListParams = {
    /**
     * 账户
     */
    account?: string
    /**
     * 银行名称
     */
    bankName?: string
    /**
     * 类型名称
     */
    channelNo?: string
    /**
     * 类型字典值
     */
    channelNoValue?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 单日限额
     */
    dayLimitAmount?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 姓名
     */
    name?: string
    /**
     * 收款码
     */
    paymentCode?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 收款资源状态
     */
    status?: string
    /**
     * 总限额
     */
    totalLimitAmount?: number
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 权重
     */
    weight?: number
  }
  // 提交参数
  type SaveReceiveParams = {
    id?: any
    /**
     * 账户
     */
    account?: string
    /**
     * 银行名称
     */
    bankName?: string
    /**渠道id */
    channelId?: string
    /**
     * 类型名称
     */
    channelNo?: string
    /**
     * 类型字典值
     */
    channelNoValue?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 单日限额
     */
    dayLimitAmount?: number
    /**
     * 主键
     */
    id?: number
    /**
     * 姓名
     */
    name?: string
    /**
     * 收款码
     */
    paymentCode?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 收款资源状态
     */
    status?: Status
    /**
     * 总限额
     */
    totalLimitAmount?: number
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 权重
     */
    weight?: number
  }
}
