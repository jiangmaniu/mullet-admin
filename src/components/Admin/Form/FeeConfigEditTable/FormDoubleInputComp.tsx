import { useIntl } from '@umijs/max'
import { useEffect, useState } from 'react'

import FormDoubleInput from '../FormDoubleInput'

// renderFormItem 返回的组件都是拥有的 value 和 onChange 的
// 没有 value 将会无法注入值，没有 onChange 会无法修改行数据
const FormDoubleInputComp: React.FC<{
  value?: {
    min_value: any
    max_value: any
  }[]
  onChange?: (
    value: {
      min_value: any
      max_value: any
    }[]
  ) => void
}> = ({ value, onChange }) => {
  const intl = useIntl()
  const [inputValue, setInputValue] = useState<any>({})

  useEffect(() => {
    setInputValue(value)
  }, [])

  useEffect(() => {
    onChange?.(inputValue)
  }, [inputValue])

  const handleInputChange = (value: any, key: string) => {
    const newValue = {
      ...inputValue,
      [key]: value
    }
    setInputValue(newValue)
  }

  return (
    <FormDoubleInput
      onChange={[
        (value) => {
          handleInputChange(value, 'min_value')
        },
        (value) => {
          handleInputChange(value, 'max_value')
        }
      ]}
      value={[inputValue?.min_value, inputValue?.max_value]}
      placeholder={[intl.formatMessage({ id: 'common.pleaseInput' }), intl.formatMessage({ id: 'common.pleaseInput' })]}
      leftInputProps={{
        min: 0.0001,
        max: 10000,
        style: { paddingLeft: 0 }
      }}
      rightInputProps={{
        min: 0.0001,
        max: 10000
      }}
      type="number"
    />
  )
}

export default FormDoubleInputComp
