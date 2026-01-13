import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'

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
        console.log('onValuesChange', newValues)
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <div className="w-full grid gap-y-5">
        <ProFormText required width="lg" name="symbol11" label={intl.formatMessage({ id: 'mt.zhanghuzumingcheng' })} />
        {/* 问产品这个是什么类型组件 */}
        <ProFormSelect
          label={intl.formatMessage({ id: 'mt.cengji' })}
          mode="multiple"
          name="role"
          required
          options={[
            { label: 'real', value: 'real' },
            { label: 'demo', value: 'demo' }
          ]}
          width="lg"
        />
      </div>
    </Form>
  )
})
