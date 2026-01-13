import { ProFormSwitch, ProFormTextArea } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getMessageTemplateCode } from '@/services/api/common'

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

  const code = Form.useWatch('code', form)
  const { data: codeListRes } = useRequest(getMessageTemplateCode)
  const templateCodeOptions = codeListRes?.data || []
  const messageTypeOptions = useMemo(() => {
    // @ts-ignore
    return templateCodeOptions.find((item) => item.value === code)?.sendType || []
  }, [code])

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
      <div className="grid grid-cols-1 gap-5 w-[45%]">
        <ProFormSelect
          label={intl.formatMessage({ id: 'mt.xiaoxichufa' })}
          name="code"
          required
          showSearch={false}
          options={templateCodeOptions}
          fieldProps={{
            onChange: (value) => {
              // 重置发送方式下拉值
              form.resetFields(['type'])
            }
          }}
        />
        <ProFormSelect label={intl.formatMessage({ id: 'mt.fasongfangshi' })} name="type" required options={messageTypeOptions} />
        <ProFormTextArea
          fieldProps={{ autoSize: { minRows: 3, maxRows: 6 } }}
          name="remark"
          label={intl.formatMessage({ id: 'mt.mubanmiaoshu' })}
          rules={[
            {
              required: false,
              message: intl.formatMessage({ id: 'mt.shurumubanmiaoshu' })
            }
          ]}
        />
      </div>
      <div className="mb-4 flex items-center gap-x-4 flex-row mt-4">
        <div className="flex items-center gap-x-3">
          <span className="text-primary text-sm">
            <FormattedMessage id="mt.fasongkaiguan" />
          </span>
          <ProFormSwitch name="sendSwitch" initialValue={true} />
        </div>
      </div>
    </Form>
  )
})
