declare namespace MessageTemplate {
  // ===== 消息模板 ======
  /**
   * 发送方式
   */
  export type TemplateSendType = 'GROUP' | 'APPROVAL' | 'ROLE' | 'ORDER' | 'SINGLE' | 'ONCEADAY' | 'ORDER_ONCEADAY'
  // 消息模板-分页
  type MessageTemplateListParams = {
    size?: number
    current?: number
  }
  // 消息模板-分页
  type MessageTemplateListItem = {
    /**
     * 触发事件字典key
     */
    code?: string
    /**
     * 默认内容
     */
    content?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 消息模板ID
     */
    id?: number
    /**
     * 默认语言
     */
    language?: string
    /**
     * 消息多语言模板列表
     */
    messageTemplateLanguageVOList?: MessageTemplateLanguageDTO[]
    /**
     * 备注
     */
    remark?: string
    /**
     * 发送开关
     */
    sendSwitch?: boolean
    /**
     * 默认标题
     */
    title?: string
    /**
     * 发送方式
     */
    type?: TemplateSendType
  }

  // 消息模板-新增
  type SubmitMessageTemplateParams = {
    /**
     * 消息触发code,字典的key,字典请求参数message_type
     */
    code?: string
    /**
     * 消息模板ID
     */
    id?: number
    /**
     * 模板多语言列表
     */
    messageTemplateLanguageDTOList?: MessageTemplateLanguageDTO[]
    /**
     * 备注
     */
    remark?: string
    /**
     * 发送开关
     */
    sendSwitch?: boolean
    /**
     * 发送方式(SINGLE单发,ONCEADAY每天一次,ORDER_ONCEADAY相同订单每天一次)
     */
    type?: TemplateSendType
  }
  type MessageTemplateLanguageDTO = {
    /**
     * 内容
     */
    content?: string
    /**
     * 语言
     */
    language?: string
    /**
     * 模板ID
     */
    templateId?: number
    /**
     * 标题
     */
    title?: string
  }
}
