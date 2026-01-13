import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form, FormInstance, Input } from 'antd'
import { useEffect } from 'react'

import AreaCodeSelect from '@/components/Form/AreaCodeSelect'
import { regMobile } from '@/utils'

type IProps = {
  names: string[]
  form: FormInstance
  required?: boolean
}

export default function PhoneSelectFormItem({ form, names = [], required = false }: IProps) {
  const intl = useIntl()
  const phone = Form.useWatch(names[0], form)
  const phoneAreaCode = Form.useWatch(names[1], form)

  useEffect(() => {
    // 再次设置手机值
    if (phone) {
      form.setFieldValue([names[0]], phone)
    }
  }, [phone])

  const className = useEmotionCss(({ token }) => {
    return {
      '.ant-input-wrapper': {
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        paddingTop: 1.5,
        paddingBottom: 1.5,
        '&:hover': {
          borderColor: '#9C9C9C'
        },
        '.ant-input': {
          border: 'none !important',
          '&:focus-within': {
            boxShadow: 'none !important'
          }
        }
      },
      '.ant-input-group .ant-input-group-addon': {
        backgroundColor: '#fff !important',
        border: 'none !important'
      },
      '.ant-input-group-wrapper-lg': {
        paddingTop: '0px !important',
        paddingBottom: '0px !important'
      }
    }
  })

  return (
    <Form.Item
      rootClassName={className}
      name={names[0]}
      label={<FormattedMessage id="mt.dianhua" />}
      rules={
        required
          ? [
              {
                required,
                validateTrigger: 'onBlur',
                validator(rule, value, callback) {
                  setTimeout(() => {
                    form.validateFields([names[0]])
                  }, 400)

                  if (!phone) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.shurudianhua' }))
                  } else if (!regMobile.test(phone)) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.shoujihaobuzhengque' }))
                  } else if (!phoneAreaCode) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.xuanzequhao' }))
                  } else {
                    return Promise.resolve()
                  }
                }
              }
            ]
          : []
      }
      className="phoneSelect"
    >
      <Input
        size="large"
        addonBefore={
          <AreaCodeSelect
            name={names[1]}
            form={form}
            onChange={(value, option = {}) => {
              form.setFieldsValue({ countryName: option.label, country: option.key })
            }}
            selectProps={{
              fieldProps: {
                bordered: false,
                style: { height: 30, width: 'auto', textAlign: 'left', paddingRight: 10, backgroundColor: '#fff', borderRadius: 12 },
                dropdownStyle: { width: 380 }
              },
              showSearch: true,
              filedConfig: { style: { marginBottom: 0 }, noStyle: true }
            }}
            pickerProps={{
              wrapperStyle: { padding: 0, margin: 0, border: 'none', width: 80 }
            }}
          />
        }
        placeholder={intl.formatMessage({ id: 'mt.shurudianhua' })}
        style={{ width: '100%' }}
        autoComplete="off"
      />
    </Form.Item>
  )
}
