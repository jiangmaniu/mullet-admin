declare namespace Version {
  /**
   * 设备类型 (ios, android)
   */
  type Device = 'ios' | 'android'
  /**
   * 更新状态（1: 强制更新, 2: 更新提示, 3: 不提示更新）
   */
  type Status = 'mandatory_update' | 'update_prompt' | 'no_update_prompt'
  // 版本-列表-参数
  type VersionItemParams = {
    /**
     * AB面控制开关（false: 关, true: 开）
     */
    abControl?: string
    /**
     * 屏蔽地区（省市编号）
     */
    blockedRegions?: string
    /**
     * 渠道号
     */
    channelNumber?: string
    /**
     * 创建用户
     */
    createdUser?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 当前页
     */
    current?: number
    /**
     * 设备类型 (ios, android)
     */
    device?: string
    /**
     * 下载地址
     */
    downloadUrl?: string
    /**
     * 唯一标识
     */
    id?: number
    /**
     * 应用名称
     */
    name?: string
    /**
     * 平台
     */
    platform?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 每页的数量
     */
    size?: number
    /**
     * 更新状态（1: 强制更新, 2: 更新提示, 3: 不提示更新）
     */
    status?: number
    /**
     * 更新内容
     */
    updateContent?: string
    /**
     * 更新用户
     */
    updatedUser?: string
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 版本号
     */
    versionNumber?: string
  }
  // 版本-区域列表-返回
  type VersionItem = {
    /**
     * AB面控制开关（false: 关, true: 开）
     */
    abControl?: boolean
    /**
     * 屏蔽地区（省市编号）
     */
    blockedRegions?: string
    /**
     * 屏蔽地区名称
     */
    blockedRegionsName?: string
    /**
     * 渠道号
     */
    channelNumber?: string
    /**
     * 创建用户
     */
    createdUser?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 设备类型 (ios, android)
     */
    device?: Device
    /**
     * 下载地址
     */
    downloadUrl?: string
    /**
     * 唯一标识
     */
    id?: number
    /**
     * 应用名称
     */
    name?: string
    /**
     * 平台
     */
    platform?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 更新状态（1: 强制更新, 2: 更新提示, 3: 不提示更新）
     */
    status?: number
    /**
     * 更新内容
     */
    updateContent?: string
    /**
     * 更新用户
     */
    updatedUser?: string
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 版本号
     */
    versionNumber?: string
  }
  // 版本-新增
  type SubmitVersionParams = {
    /**
     * AB面控制开关（false: 关, true: 开）
     */
    abControl?: boolean
    /**
     * 屏蔽地区（省市编号）
     */
    blockedRegions?: string
    /**
     * 渠道号
     */
    channelNumber?: string
    /**
     * 创建用户
     */
    createdUser?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 设备类型 (ios, android)
     */
    device?: Device
    /**
     * 下载地址
     */
    downloadUrl?: string
    /**
     * 唯一标识
     */
    id?: number
    /**
     * 应用名称
     */
    name?: string
    /**
     * 平台
     */
    platform?: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 更新状态（1: 强制更新, 2: 更新提示, 3: 不提示更新）
     */
    status?: Status
    /**
     * 更新内容
     */
    updateContent?: string
    /**
     * 更新用户
     */
    updatedUser?: string
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 版本号
     */
    versionNumber?: string
  }
  // 版本-区域列表
  type VersionRegionItem = {
    /**
     * 祖区划编号
     */
    ancestors?: string
    children?: VersionRegionItem[]
    /**
     * 市级区划编号
     */
    cityCode?: string
    /**
     * 市级名称
     */
    cityName?: string
    /**
     * 区划编号
     */
    code?: string
    /**
     * 区级区划编号
     */
    districtCode?: string
    /**
     * 区级名称
     */
    districtName?: string
    hasChildren?: boolean
    id?: number
    /**
     * 区划名称
     */
    name?: string
    /**
     * 父区划编号
     */
    parentCode?: string
    parentId?: number
    parentName?: string
    /**
     * 省级区划编号
     */
    provinceCode?: string
    /**
     * 省级名称
     */
    provinceName?: string
    /**
     * 层级
     */
    regionLevel?: number
    /**
     * 备注
     */
    remark?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 镇级区划编号
     */
    townCode?: string
    /**
     * 镇级名称
     */
    townName?: string
    /**
     * 村级区划编号
     */
    villageCode?: string
    /**
     * 村级名称
     */
    villageName?: string
  }
}
