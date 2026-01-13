import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Form, Input, InputNumber, InputNumberProps, InputProps } from 'antd'

import { cn } from '@/utils/cn'

type InputPropsType = Partial<InputProps & InputNumberProps>

type IProps = {
  /**表单的name */
  name?: any[]
  label?: React.ReactNode
  placeholder?: any[]
  onChange?: Array<(value: any) => void>
  value?: Array<string>
  required?: boolean
  /**是否使用Form.item包裹输入框 */
  noStyle?: boolean
  /**输入框类型 */
  type?: 'text' | 'number'
  /**左边输入框 */
  leftInputProps?: InputPropsType
  /**右边边输入框 */
  rightInputProps?: InputPropsType
}

/**
 * 双向输入表单组件
 * @export
 * @param {IProps} { ...res }
 * @return {*}
 */
export default function FormDoubleInput({
  noStyle = true,
  onChange,
  name = [],
  label,
  type,
  required,
  placeholder = [],
  value = [],
  leftInputProps,
  rightInputProps
}: IProps) {
  const { style: leftInputStyle, ...leftInputPropsRes } = leftInputProps || ({} as InputPropsType)
  const { style: rightInputStyle, ...rightInputPropsRes } = rightInputProps || ({} as InputPropsType)
  const className = useEmotionCss(({ token }) => {
    return {
      '&': {
        border: '1px solid #d9d9d9',
        borderRadius: 7
      },
      '&:hover': {
        borderColor: '#9C9C9C'
      },
      '.ant-input:focus-within,.ant-input-affix-wrapper:focus-within': {
        boxShadow: 'none !important'
      },
      '.ant-input-number:focus-within,.ant-input-number-affix-wrapper:focus-within': {
        boxShadow: 'none !important'
      },
      '.divider': {
        content: "''",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 2
      }
    }
  })

  const [onChangeLeft, onChangeRight] = onChange || []

  const isNumberInput = type === 'number'
  const renderInput = (key: string) => {
    const isLeft = key === 'left'
    // @ts-ignore
    const inputProps: InputPropsType = {
      placeholder: isLeft ? placeholder[0] : placeholder[1],
      onChange: (e: any) => {
        const changeFn = isLeft ? onChangeLeft : onChangeRight
        changeFn?.(isNumberInput ? e : e?.target?.value)
      },
      value: isLeft ? value[0] : value[1],
      size: 'middle',
      autoComplete: 'off',
      style: { border: 'none', width: '100%', paddingLeft: 15, ...(isLeft ? leftInputStyle : rightInputStyle) },
      styles: { input: { paddingLeft: 5 } },
      ...(isLeft ? leftInputPropsRes : rightInputPropsRes)
    }

    return <>{isNumberInput ? <InputNumber controls={false} {...inputProps} /> : <Input {...inputProps} />}</>
  }

  return (
    <div className={cn('flex items-center relative', className)}>
      <Form.Item name={name[0]} label={label} rules={[{ required, message: placeholder[0] }]} noStyle={noStyle}>
        {renderInput('left')}
      </Form.Item>
      <span className="text-primary text-sm divider">-</span>
      <Form.Item name={name[1]} label={label} rules={[{ required, message: placeholder[1] }]} noStyle={noStyle}>
        {renderInput('right')}
      </Form.Item>
    </div>
  )
}
