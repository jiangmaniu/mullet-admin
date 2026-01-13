import { ProFormText } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import FormText from '@/components/Admin/Form/ProFormText'

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
  const calculationType = Form.useWatch('calculationType', form)

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
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <div className="flex items-start flex-col w-full">
        <div className="text-base font-semibold pb-7">
          <FormattedMessage id="mt.zhifuxitongduijiepeizhi" />
        </div>
        <div className="w-full">
          <div className="w-full pb-5 grid grid-cols-2 gap-8">
            <FormText name="channelMenchantNo" label={intl.formatMessage({ id: 'mt.qudaoshanghuhao' })} />
            <FormText name="channelApiUrl" label={intl.formatMessage({ id: 'mt.qudaowangguan' })} />
            <ProFormText.Password
              fieldProps={{ style: { height: 40 } }}
              name="channelApiKey"
              placeholder={intl.formatMessage({ id: 'mt.shurushanghumiyao' })}
              rules={[
                {
                  required: false,
                  message: intl.formatMessage({ id: 'mt.shurushanghumiyao' })
                }
              ]}
              label={intl.formatMessage({ id: 'mt.shanghumiyao' })}
            />
          </div>
          {/* <div className="w-[50%] pb-5 pt-3">
            <Upload />
          </div> */}
        </div>
      </div>
    </Form>
  )
})
