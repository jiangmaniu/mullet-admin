import { isNil, isUndefined } from 'lodash-es'

const RENDER_FALLBACK = '--'

/**
 * 渲染回退值
 * @param v 要渲染的值
 * @param option 配置选项
 * @returns 渲染结果
 */
export const renderFallback = (v?: any, option?: { verify?: boolean }) => {
  const { verify } = option || {}
  if (!isNil(verify)) {
    return verify ? v : RENDER_FALLBACK
  }
  return isNil(v) ? RENDER_FALLBACK : v
}

/**
 * 渲染回退占位符
 * @param integerValue 整数部分
 * @param decimalValue 小数部分
 * @param volScale 小数位数
 * @returns 格式化后的字符串
 */
export const renderFallbackPlaceholder = ({
  integerValue = 0,
  decimalValue = 0,
  volScale
}: {
  integerValue?: number
  decimalValue?: number
  volScale?: number
}) => {
  let value = integerValue.toString()

  if (!(isUndefined(decimalValue) || isUndefined(volScale))) {
    value = `${value}.${decimalValue.toString().padEnd(volScale, decimalValue.toString())}`
  }

  return value
}

/**
 * 格式化地址，显示前6位和后4位
 * @param address 地址字符串
 * @returns 格式化后的地址
 */
export const formatAddress = (address: any) => {
  if (!address) return RENDER_FALLBACK
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * 格式化交易哈希，显示前6位和后4位
 * @param txHash 交易哈希字符串
 * @returns 格式化后的交易哈希
 */
export const formatTxHash = (txHash: string) => {
  if (!txHash) return RENDER_FALLBACK
  return `${txHash.slice(0, 6)}...${txHash.slice(-4)}`
}
