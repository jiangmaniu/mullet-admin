import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()

  const { pathname } = useLocation()

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  return (
    <Form
      onFinish={async (values) => {
        // console.log('onFinish values', values)
      }}
      onFinishFailed={(errorInfo) => {
        // console.log('onFinishFailed', errorInfo)
      }}
      onValuesChange={async (values) => {
        const newValues = { ...formData, ...values }
        setFormData(newValues)
        onValuesChange?.(newValues)
        console.log('values', values)
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <div className="flex items-start flex-col w-[80%]">
        <div className="text-primary mb-5 font-pf-bold text-[22px]">
          <FormattedMessage id="mt.guzhangchaoshipeizhi" />
        </div>
        <div className="w-[50%] grid grid-cols-1 gap-y-[30px]">
          <div>
            <div className="mb-4">
              <div className="text-lg pb-1 text-primary font-pf-bold">
                <FormattedMessage id="mt.duanlianshijian" />
              </div>
              <div className="text-secondary text-sm">
                <FormattedMessage id="mt.duanlianshijiantips" />
              </div>
            </div>
            <ProFormDigit
              required={false}
              name="secends1"
              placeholder={intl.formatMessage({ id: 'mt.qingshurumiao' })}
              fieldProps={{
                controls: false,
                suffix: <FormattedMessage id="mt.miao" />
              }}
              rules={[
                {
                  required: false,
                  message: intl.formatMessage({ id: 'mt.qingshurumiao' })
                }
              ]}
            />
          </div>
          <div>
            <div className="mb-4">
              <div className="text-lg pb-1 text-primary font-pf-bold">
                <FormattedMessage id="mt.chongxinlianjiezhijiandejiange" />
              </div>
              <div className="text-secondary text-sm">
                <FormattedMessage id="mt.chongxinlianjiezhijiandejiangetips" />
              </div>
            </div>
            <ProFormDigit
              required={false}
              name="secends2"
              placeholder={intl.formatMessage({ id: 'mt.qingshurumiao' })}
              fieldProps={{
                controls: false,
                suffix: <FormattedMessage id="mt.miao" />
              }}
              rules={[
                {
                  required: false,
                  message: intl.formatMessage({ id: 'mt.qingshurumiao' })
                }
              ]}
            />
          </div>
          <div>
            <div className="mb-4">
              <div className="text-lg pb-1 text-primary font-pf-bold">
                <FormattedMessage id="mt.changshilianjiecishu" />
              </div>
              <div className="text-secondary text-sm">
                <FormattedMessage id="mt.changshilianjiecishutips" />
              </div>
            </div>
            <ProFormDigit
              required={false}
              name="count"
              placeholder={intl.formatMessage({ id: 'mt.qingshurucishu' })}
              fieldProps={{
                controls: false
              }}
              rules={[
                {
                  required: false,
                  message: intl.formatMessage({ id: 'mt.qingshurucishu' })
                }
              ]}
            />
          </div>
          <div>
            <div className="mb-4">
              <div className="text-lg pb-1 text-primary font-pf-bold">
                <FormattedMessage id="mt.xunhuanjiange" />
              </div>
              <div className="text-secondary text-sm">
                <FormattedMessage id="mt.xunhuanjiangetips" />
              </div>
            </div>
            <ProFormDigit
              required={false}
              name="secends22"
              placeholder={intl.formatMessage({ id: 'mt.qingshurumiao' })}
              fieldProps={{
                controls: false,
                suffix: <FormattedMessage id="mt.miao" />
              }}
              rules={[
                {
                  required: false,
                  message: intl.formatMessage({ id: 'mt.qingshurumiao' })
                }
              ]}
            />
          </div>
        </div>
      </div>
    </Form>
  )
})
