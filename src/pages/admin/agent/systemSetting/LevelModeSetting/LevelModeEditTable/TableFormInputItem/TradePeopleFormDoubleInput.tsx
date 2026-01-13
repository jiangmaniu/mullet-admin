import { useIntl } from '@umijs/max'
import { useEffect, useState } from 'react'

import FormDoubleInput from '@/components/Admin/Form/FormDoubleInput'

// renderFormItem 返回的组件都是拥有的 value 和 onChange 的
// 没有 value 将会无法注入值，没有 onChange 会无法修改行数据
const TradePeopleFormDoubleInput: React.FC<{
  value?: {
    min: any
    max: any
  }[]
  onChange?: (
    value: {
      min: any
      max: any
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
          handleInputChange(value, 'min')
        },
        (value) => {
          handleInputChange(value, 'max')
        }
      ]}
      value={[inputValue?.min, inputValue?.max]}
      placeholder={[intl.formatMessage({ id: 'mt.agent.zuixiaozhi' }), intl.formatMessage({ id: 'mt.agent.zuidazhi' })]}
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

export default TradePeopleFormDoubleInput
