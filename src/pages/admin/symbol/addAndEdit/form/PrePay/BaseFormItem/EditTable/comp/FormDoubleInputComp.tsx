import { useIntl } from '@umijs/max'
import { useEffect, useState } from 'react'

import FormDoubleInput from '@/components/Admin/Form/FormDoubleInput'

// renderFormItem 返回的组件都是拥有的 value 和 onChange 的
// 没有 value 将会无法注入值，没有 onChange 会无法修改行数据
const FormDoubleInputComp: React.FC<{
  value?: {
    lever_end_value: any
    lever_start_value: any
  }[]
  onChange?: (
    value: {
      lever_end_value: any
      lever_start_value: any
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
    <>
      <FormDoubleInput
        onChange={[
          (value) => {
            handleInputChange(value, 'lever_start_value')
          },
          (value) => {
            handleInputChange(value, 'lever_end_value')
          }
        ]}
        value={[inputValue?.lever_start_value, inputValue?.lever_end_value]}
        placeholder={[intl.formatMessage({ id: 'common.pleaseInput' }), intl.formatMessage({ id: 'common.pleaseInput' })]}
        leftInputProps={{
          precision: 0,
          prefix: <span className="text-sm text-[#D9DDE3]">X</span>
        }}
        rightInputProps={{
          precision: 0,
          min: 1,
          prefix: <span className="text-sm text-[#D9DDE3]">X</span>
        }}
        type="number"
      />
    </>
  )
}

export default FormDoubleInputComp
