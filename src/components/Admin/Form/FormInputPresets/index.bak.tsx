import { useIntl } from '@umijs/max'
import { Form, FormItemProps, Input, InputNumber, InputNumberProps, InputProps, Select, SelectProps, Space } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { FormInstance } from 'antd/lib'

import SelectSuffixIcon from '@/components/Base/SelectSuffixIcon'
import { useLang } from '@/context/languageProvider'
import useStyle from '@/hooks/useStyle'

type InputPropsType = Partial<InputProps & InputNumberProps>

type IProps = {
  options: Array<{ value: any; label: React.ReactNode }>
  /**input前置内容 */
  prefix?: React.ReactNode
  /** input前置单位*/
  unit?: string
  /**input表单的name */
  name?: NamePath
  /**表单实例 */
  form?: FormInstance
  /**表单label */
  label?: React.ReactNode
  /**input placeholder */
  placeholder?: string
  /**input属性 */
  inputProps?: InputPropsType
  /**select属性 */
  selectProps?: SelectProps
  /**formItem属性 */
  formItemProps?: FormItemProps
  /**是否必填 */
  required?: boolean
  /**输入框初始值 */
  initialValue?: any
  /**输入框类型 */
  type?: 'text' | 'number'
  maxLength?: number
  /**右侧帮助信息 */
  help?: React.ReactNode
  /**宽度 */
  width?: number | string
}

/**
 * 表单项：input输入框 + 预设select可选择 组件
 * @returns
 */
export default function FormInputPresets({
  options,
  prefix,
  unit,
  name,
  form,
  placeholder,
  label,
  inputProps,
  formItemProps,
  selectProps,
  required,
  initialValue,
  type,
  maxLength,
  width = '100%',
  help
}: IProps) {
  const { addonFormItemClassName } = useStyle()

  const { lng } = useLang()
  const intl = useIntl()
  const isZh = lng === 'zh-TW'
  const prefixText = intl.formatMessage({ id: 'common.pleaseInput' })

  const msg = `${prefixText}${!isZh ? ' ' : ''}${label}`

  const commonProps: InputPropsType = {
    prefix: prefix || (unit ? <span className="text-gray-400 text-sm pr-2 relative top-[1px]">{unit}</span> : null),
    addonAfter: (
      <Form.Item noStyle>
        <Select
          defaultValue={options?.[0]?.value}
          style={{ width: 'auto', paddingRight: 4 }}
          options={options}
          suffixIcon={<SelectSuffixIcon opacity={0.4} />}
          dropdownStyle={{ minWidth: 120 }}
          // dropdownAlign={{
          //   offset: [0, 2]
          // }}
          // showSearch
          onSelect={(value) => {
            // 设置input值
            form?.setFieldValue?.(name, value)
            // 重新校验输入
            form?.validateFields?.([name])
          }}
          size="large"
          {...selectProps}
        />
      </Form.Item>
    ),
    placeholder: placeholder || msg,
    size: 'large',
    autoComplete: 'off',
    maxLength,
    style: { width: '100%' }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rootClassName={addonFormItemClassName}
      rules={[{ required, message: msg }]}
      initialValue={initialValue}
      {...formItemProps}
    >
      <Space>
        {type === 'number' ? (
          <InputNumber min={0} controls={false} {...commonProps} {...inputProps} />
        ) : (
          <Input {...commonProps} {...inputProps} />
        )}
        {help}
      </Space>
    </Form.Item>
  )
}
