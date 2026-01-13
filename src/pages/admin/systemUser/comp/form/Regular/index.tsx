import { ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'

import EmailFormItem from '@/components/Admin/Form/EmailFormItem'
import PasswordCheckFormItem from '@/components/Admin/Form/PasswordCheckFormItem'
import PhoneSelectFormItem from '@/components/Admin/Form/PhoneSelectFormItem'
import FormText from '@/components/Admin/Form/ProFormText'
import { formatTime } from '@/utils'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: Manager.ListItem
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()

  const id = initialValues?.id
  const isAdd = !id

  useImperativeHandle(ref, () => {
    return form
  })

  console.log('initialValues', initialValues)

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
      {/* 按钮“连接”：决定该经理能否登录管理后台 */}
      <div className="flex items-center">
        <ProFormSwitch name="status" initialValue={true} />
        <span className="text-primary text-sm pl-3 font-semibold">
          <FormattedMessage id="mt.qiyonglianjie" />
        </span>
      </div>
      <div className="w-full pt-6">
        <div className="text-primary text-sm pb-3">
          <span className="text-red pr-[3px]">*</span>
          {intl.formatMessage({ id: 'mt.dengluzhanghao' })}
        </div>
        <div className="flex w-full items-center">
          <FormText
            required
            name="account"
            width={384}
            fieldProps={{ style: { marginBottom: 0 } }}
            placeholder={intl.formatMessage({ id: 'mt.shurudengluzhanghao' })}
            rules={[{ message: intl.formatMessage({ id: 'mt.shurudengluming' }), required: true }]}
          />
          {!isAdd && (
            <div className="flex flex-col justify-center pl-[50px]">
              <div className="text-sm text-secondary pb-1">
                <FormattedMessage id="mt.zhuceshijian" />：{formatTime(initialValues?.createTime)}
              </div>
              {initialValues?.lastLoginTime && (
                <div className="text-sm text-secondary">
                  <FormattedMessage id="mt.zuijinfangwen" />：{initialValues?.lastLoginTime}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full pt-6">
        <PasswordCheckFormItem form={form} showAction={!isAdd} userId={id} />
      </div>
      <div className="w-full grid grid-cols-2 gap-x-[50px] gap-y-5 mt-5">
        <FormText name="name" label={intl.formatMessage({ id: 'mt.mingcheng' })} />
        <FormText name="remark" label={intl.formatMessage({ id: 'mt.beizhu' })} />
        <EmailFormItem name="email" required={false} />
        <PhoneSelectFormItem names={['phone', 'phoneAreaCode']} form={form} required={false} />
      </div>
    </Form>
  )
})
