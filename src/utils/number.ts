import lodash from 'lodash'

import { formatNum } from '.'

/**
 * 获取指定数字的精度位数
 * @param value
 * @returns
 */
export const getPrecisionByNumber = (value: any) => {
  return value ? String(value).split('.')?.[1]?.length || 0 : 0
}

/**
 * 移除小数点末尾的0
 * @param num
 * @returns
 */
export function removeTrailingZeros(num: any) {
  return lodash.toString(num).replace(/\.?0+$/, '')
}

/**
 * 数字格式化单位
 * @param num
 * @param units
 * @returns
 */
export function numberFormatUnit(
  num: number,
  options: {
    units?: string[]
    precision?: number
    isTruncateDecimal?: boolean
    placeholder?: string
  }
) {
  const { units = ['K', 'M'], precision = 2, isTruncateDecimal = true, placeholder = '0' } = options

  let val = num
  let symbol = ''
  if (num >= 1000000) {
    val = num / 1000000
    symbol = units[1] // 百万位
  } else if (num >= 1000) {
    val = num / 1000
    symbol = units[0] // 千位
  }

  return formatNum(val, { precision, isTruncateDecimal, placeholder }) + symbol
}

/**
 * 传入数值，判断如果是数字返回负数，如果是 0 返回 0，否则返回空值
 * @param value
 * @returns
 */
export const toNegativeOrEmpty = (value: any) => {
  const val = Number(value)
  if (Number.isNaN(val)) return ''
  return val === 0 ? '0' : -Math.abs(val).toString()
}
