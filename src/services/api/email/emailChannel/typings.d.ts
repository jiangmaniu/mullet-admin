declare namespace EmailChannel {
  type ListItemParams = {
    /**
     * 通道名称
     */
    channelName?: string
    /**
     * 字典通道类型key(email_channel_type)
     */
    channelTypeCode?: string
    /**
     * 配置信息
     */
    configInfo?: string
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
     * 当前页
     */
    current?: number
    /**
     * 主键id
     */
    id?: number
    /**
     * 是否删除
     */
    isDeleted?: number
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 业务状态
     */
    status?: 'ENABLE' | 'DISABLE'
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 更新人
     */
    updateUser?: number
  }
  type EmailChannelListItem = {
    /**
     * 通道名称
     */
    channelName?: string
    /**
     * 邮箱通道类型字典key值
     */
    channelTypeCode?: string
    /**
     * 配置信息
     */
    configInfo?: Array<{ key: string; value: string }>
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
     * 主键id
     */
    id?: number
    /**
     * 是否删除
     */
    isDeleted?: number
    /**
     * 业务状态
     */
    status?: 'ENABLE' | 'DISABLE'
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 更新人
     */
    updateUser?: number
  }
  type SubmitEmailChannelParams = {
    /**
     * 通道名称
     */
    channelName?: string
    /**
     * 字典通道类型key(email_channel_type)
     */
    channelTypeCode?: string
    /**
     * 配置信息
     */
    configInfo?: string
  }
  type UpdateEmailStatus = {
    /**
     * 主键ID
     */
    id?: number
    /**
     * 状态
     */
    status?: any
  }
  // 获取数据源类型
  type channelTypeItem = {
    label: string
    value: string
    params: any[]
  }
}
