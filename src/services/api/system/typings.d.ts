declare namespace System {
  type TimeSettingInfo = {
    /**交易系统时区 'UTC/GMT+8' */
    timeZone: string
    /**是否启用夏令时 */
    daylightTime: true
    /**日结 分时格式 12:12 */
    daily: string
  }
}
