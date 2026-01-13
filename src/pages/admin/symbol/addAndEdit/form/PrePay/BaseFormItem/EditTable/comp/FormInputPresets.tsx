import { useIntl } from '@umijs/max'
import { useEffect, useState } from 'react'

import FormInputPresetsComp from '@/components/Admin/Form/FormInputPresets'

// renderFormItem 返回的组件都是拥有的 value 和 onChange 的
// 没有 value 将会无法注入值，没有 onChange 会无法修改行数据
const FormInputPresets: React.FC<{
  value?: any
  onChange?: (value: any) => void
}> = ({ value, onChange }) => {
  const intl = useIntl()
  const [inputValue, setInputValue] = useState<any>('')

  useEffect(() => {
    setInputValue(value)
  }, [])

  return (
    <FormInputPresetsComp
      placeholder={intl.formatMessage({ id: 'mt.shurugangganbeishu' })}
      options={[
        { label: '10', value: '10' },
        { label: '50', value: '50' },
        { label: '100', value: '100' },
        { label: '500', value: '500' },
        { label: '1000', value: '1000' }
      ]}
      unit="X"
      // required
      inputProps={{
        size: 'middle',
        value: inputValue,
        maxLength: 40,
        min: 1,
        onChange: (e: any) => {
          const newValue = e?.target?.value || e
          setInputValue(newValue)
          onChange?.(newValue)
        }
      }}
      selectProps={{
        size: 'middle',
        onSelect: (value) => {
          setInputValue(value)
          onChange?.(value)
        }
      }}
      type="number"
    />
  )
}

export default FormInputPresets
