import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Form, FormInstance, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { OTPProps } from 'antd/es/input/OTP'

type IProps = {
  onChange?: (value: string) => void
  form?: FormInstance
  name?: NamePath
} & OTPProps

export default function CodeInput({ onChange, form, name = 'validateCode', ...rest }: IProps) {
  const className = useEmotionCss(({ token }) => {
    return {
      '.ant-otp-input': {
        width: 38,
        height: 38,
        fontSize: '22px !important',
        '&::selection': {
          background: 'transparent'
        }
      },
      '.ant-input-outlined:hover': {
        borderColor: '#110E23 !important'
      }
    }
  })

  const handleChange = (value: any) => {
    onChange?.(value)
    form?.setFieldValue?.(name, value)
  }

  return (
    <div className={className}>
      <Form.Item noStyle name={name}>
        <Input.OTP onChange={handleChange} {...rest} />
      </Form.Item>
    </div>
  )
}
