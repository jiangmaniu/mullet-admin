declare namespace EmailTemplate {
  /**
   * 发送方式
   */
  type SendType = 'GROUP' | 'APPROVAL' | 'ROLE' | 'ORDER' | 'SINGLE' | 'ONCEADAY' | 'ORDER_ONCEADAY'
  // 邮件模板-分页 参数
  type ListItemParams = {
    /**
     * 模版Code
     */
    code?: string
    /**
     * 模版内容
     */
    content?: string
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
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 语言
     */
    language?: string
    /**
     * 模版名称
     */
    name?: string
    /**
     * 模版描述
     */
    remark?: string
    /**
     * 发送开关
     */
    sendSwitch?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 业务状态
     */
    status?: number
    /**
     * 租户ID
     */
    tenantId?: string
    /**
     * 标题
     */
    title?: string
    /**
     * 发送方式
     */
    type?: SendType
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 更新人
     */
    updateUser?: number
  }
  // 邮件模板-分页
  type EmailTemplateListItem = {
    /**
     * 模版Code
     */
    code?: string
    /**
     * 模版内容
     */
    content?: string
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
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 语言
     */
    language?: string
    /**
     * 模版名称
     */
    name?: string
    /**
     * 模版描述
     */
    remark?: string
    /**
     * 发送开关
     */
    sendSwitch?: boolean
    /**
     * 业务状态
     */
    status?: number
    /**
     * 租户ID
     */
    tenantId?: string
    /**
     * 标题
     */
    title?: string
    /**
     * 发送方式
     */
    type?: SendType
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 更新人
     */
    updateUser?: number
    templateLanguageVOList?: TemplateLanguageAddDTOListItem[]
  }

  // 新建邮件-新增
  type SubmitEmailTemplateParams = {
    /**
     * 模版Code
     */
    code?: string
    /**
     * 模版内容
     */
    content?: string
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
     * 是否已删除
     */
    isDeleted?: number
    /**
     * 语言
     */
    language?: string
    /**
     * 模版名称
     */
    name?: string
    /**
     * 模版描述
     */
    remark?: string
    /**
     * 发送开关
     */
    sendSwitch?: boolean
    /**
     * 业务状态
     */
    status?: number
    /**
     * 模板多语言列表
     */
    templateLanguageAddDTOList?: TemplateLanguageAddDTOListItem[]
    /**
     * 租户ID
     */
    tenantId?: string
    /**
     * 标题
     */
    title?: string
    /**
     * 发送方式
     */
    type?: SendType
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 更新人
     */
    updateUser?: number
  }
  type TemplateLanguageAddDTOListItem = {
    /**
     * 模版内容
     */
    content?: string
    /**
     * 语言
     */
    language?: string
    /**
     * 标题
     */
    title?: string
  }
}
