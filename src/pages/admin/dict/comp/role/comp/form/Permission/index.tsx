import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import PermissionTree from '@/components/Admin/Form/PermissionTree'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'

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
      <div className="w-full">
        <ProFormSelect
          label={intl.formatMessage({ id: 'mt.role' })}
          mode="multiple"
          name="role"
          required
          options={[
            { label: '管理员', value: 'admin' },
            { label: '普通用户', value: 'user' },
            { label: '游客', value: 'guest' }
          ]}
          width="lg"
        />
        <Form.Item
          name="per"
          label={intl.formatMessage({ id: 'mt.quanxian' })}
          rules={[
            {
              required: true,
              validator(rule, value, callback) {
                if (!value?.length) {
                  return Promise.reject(intl.formatMessage({ id: 'mt.xuanzequanxian' }))
                }
                return Promise.resolve()
              }
            }
          ]}
          className="!mt-5"
        >
          <PermissionTree
            initialValues={initialValues.per}
            onChange={(checkedKeys) => {
              form.setFieldValue('per', checkedKeys)
            }}
          />
        </Form.Item>
      </div>
    </Form>
  )
})
