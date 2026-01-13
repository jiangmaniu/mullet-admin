import { ProFormText as FormText } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { GetProps } from 'antd'

import { useLang } from '@/context/languageProvider'

type IProps = GetProps<typeof FormText> & {
  /**标签label加上星号提示必填 */
  requiredLabel?: boolean
  autoFocus?: boolean
  placeholder?: string
  maxLength?: number
}

export default function ProFormText({ label, requiredLabel = false, required, placeholder, maxLength, fieldProps, ...res }: IProps) {
  const { lng } = useLang()
  const intl = useIntl()
  const isZh = lng === 'zh-TW'
  const prefix = intl.formatMessage({ id: 'common.pleaseInput' })

  const msg = `${prefix}${!isZh ? ' ' : ''}${label}`

  return (
    <FormText
      fieldProps={
        {
          // 设置后size值不生效
          // style: { height: 40 },
          autoComplete: 'off',
          size: 'large',
          maxLength,
          ...fieldProps
        } as any
      }
      label={label}
      placeholder={placeholder || msg}
      rules={[{ required, message: msg }]}
      {...res}
    />
  )
}
