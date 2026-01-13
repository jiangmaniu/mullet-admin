declare namespace Log {
  // API日志-查询多条(分页) 参数
  type APIListParams = {
    /**
     * 客户端
     */
    client?: string
    /**
     * 操作人
     */
    createBy?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 结束时间
     */
    endTime?: string
    /**
     * 请求URI
     */
    requestUri?: string
    /**
     * 服务器名
     */
    serverHost?: string
    /**
     * 服务器IP地址
     */
    serverIp?: string
    /**
     * 服务ID
     */
    serviceId?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 开始时间
     */
    startTime?: string
    /**
     * 日志标题
     */
    title?: string
    /**
     * 日志类型
     */
    type?: string
  }
  // API日志-查询多条(分页)
  type APIListItem = {
    client?: string
    createBy?: string
    createTime?: string
    env?: string
    id?: number
    method?: string
    methodClass?: string
    methodName?: string
    params?: string
    remoteIp?: string
    requestUri?: string
    serverHost?: string
    serverIp?: string
    serviceId?: string
    tenantId?: string
    time?: string
    title?: string
    type?: string
    userAgent?: string
  }
  // 错误日志-查询多条(分页) 参数
  type ErrorLogListParams = {
    /**
     * 客户端
     */
    client?: string
    /**
     * 操作人
     */
    createBy?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 结束时间
     */
    endTime?: string
    /**
     * 请求URI
     */
    requestUri?: string
    /**
     * 服务器名
     */
    serverHost?: string
    /**
     * 服务器IP地址
     */
    serverIp?: string
    /**
     * 服务ID
     */
    serviceId?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 开始时间
     */
    startTime?: string
    /**
     * 日志标题
     */
    title?: string
    /**
     * 日志类型
     */
    type?: string
  }
  // 错误日志-查询多条(分页)
  type ErrorLogListItem = {
    client?: string
    createBy?: string
    createTime?: string
    env?: string
    exceptionName?: string
    fileName?: string
    id?: number
    lineNumber?: number
    message?: string
    method?: string
    methodClass?: string
    methodName?: string
    params?: string
    remoteIp?: string
    requestUri?: string
    serverHost?: string
    serverIp?: string
    serviceId?: string
    stackTrace?: string
    tenantId?: string
    userAgent?: string
  }
  // 通用日志-查询多条(分页)
  type UsualLogListParams = {
    /**
     * 客户端
     */
    client?: string
    /**
     * 操作人
     */
    createBy?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 结束时间
     */
    endTime?: string
    /**
     * 请求URI
     */
    requestUri?: string
    /**
     * 服务器名
     */
    serverHost?: string
    /**
     * 服务器IP地址
     */
    serverIp?: string
    /**
     * 服务ID
     */
    serviceId?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 开始时间
     */
    startTime?: string
    /**
     * 日志标题
     */
    title?: string
    /**
     * 日志类型
     */
    type?: string
    /**
     * 日志id
     */
    logId?: string
    /**
     * 日志数据
     */
    logData?: string
  }
  // 通用日志-查询多条(分页)
  type UsualLogListItem = {
    client?: string
    createBy?: string
    createTime?: string
    env?: string
    id?: number
    logData?: string
    logId?: string
    logLevel?: string
    method?: string
    methodClass?: string
    methodName?: string
    params?: string
    remoteIp?: string
    requestUri?: string
    serverHost?: string
    serverIp?: string
    serviceId?: string
    tenantId?: string
    userAgent?: string
  }
}
