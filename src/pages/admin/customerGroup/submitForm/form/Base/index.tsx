import { useIntl, useLocation } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import { getEnum } from '@/constants/enum'

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

  const isDemoAccount = pathname.indexOf('account-group/demo') !== -1

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
      <div className="flex items-start flex-col w-full">
        <div className="w-full grid grid-cols-2 gap-x-[76px] gap-y-5">
          <ProFormText required maxLength={40} name="groupName" label={intl.formatMessage({ id: 'mt.yewuxianming' })} />
          <ProFormText required maxLength={40} name="code" label={intl.formatMessage({ id: 'mt.yewuxianbianhao' })} />
          <ProFormSelect
            name="registerWay"
            required
            label={intl.formatMessage({ id: 'mt.zhucefangshi' })}
            options={getEnum().enumToOptions('RegisterWay')}
          />
          <ProFormSelect
            name="kycAuth"
            required
            label={intl.formatMessage({ id: 'mt.kycrenzheng' })}
            options={getEnum().enumToOptions('KycAuthType')}
          />
          <ProFormText name="remark" label={intl.formatMessage({ id: 'mt.beizhu' })} />
        </div>
      </div>
    </Form>
  )
})
