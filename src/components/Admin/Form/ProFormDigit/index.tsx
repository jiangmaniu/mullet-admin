import { ProFormDigit as FormDigit } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { GetProps } from 'antd'
import { Rule } from 'antd/es/form'

import { useLang } from '@/context/languageProvider'

type IProps = GetProps<typeof FormDigit> & {
  /**标签label加上星号提示必填 */
  requiredLabel?: boolean
  autoFocus?: boolean
  placeholder?: string
  maxLength?: number
  /**小数位精度,默认0 */
  precision?: number
  /***隐藏小数位精度，支持输入数字 + 小数位 */
  hiddenPrecision?: boolean
  /**最小值 */
  min?: number
  rules?: Rule[]
}

export default function ProFormDigit({
  label,
  hiddenPrecision = true,
  precision = 0,
  requiredLabel = false,
  maxLength,
  required,
  placeholder,
  fieldProps,
  min,
  ...res
}: IProps) {
  const { lng } = useLang()
  const intl = useIntl()
  const isZh = lng === 'zh-TW'
  const prefix = intl.formatMessage({ id: 'common.pleaseInput' })

  const msg = `${prefix}${!isZh ? ' ' : ''}${label ?? ''}`

  return (
    <FormDigit
      fieldProps={{
        precision: hiddenPrecision ? undefined : precision,
        autoComplete: 'off',
        style: { width: '100%', height: 40 },
        size: 'large',
        maxLength,
        min,
        ...fieldProps
      }}
      label={label}
      placeholder={placeholder || msg}
      rules={[{ required, message: msg }]}
      {...res}
    />
  )
}
