import { useIntl } from '@umijs/max'

import { isEmail } from '@/utils'

import ProFormText from '../ProFormText'

type IProps = {
  name: string
  required?: boolean
}

export default function EmailFormItem({ name, required = true }: IProps) {
  const intl = useIntl()
  return (
    <ProFormText
      required={required}
      name={name}
      rules={
        required
          ? [
              {
                required,
                validator(rule, value, callback) {
                  if (!value) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.shuruyouxiang' }))
                  } else if (!isEmail(value)) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.youxianggeshibuzhengque' }))
                  }
                  return Promise.resolve()
                }
              }
            ]
          : []
      }
      label={intl.formatMessage({ id: 'mt.youxiang' })}
    />
  )
}
