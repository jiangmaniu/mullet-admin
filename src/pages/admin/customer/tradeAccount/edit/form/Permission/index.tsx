import { ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import useStyle from '@/hooks/useStyle'

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
  const { spreadAddonClassName } = useStyle()

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
        <div className="w-full grid grid-cols-1 gap-x-[76px] gap-y-7">
          <div className="flex items-start flex-col gap-4">
            <div className="flex items-center">
              <ProFormSwitch name="status" />
              <span className="text-primary text-sm pl-3 font-semibold">
                <FormattedMessage id="mt.qiyongzhanghudenglu" />
              </span>
            </div>
            <div className="flex items-center">
              <ProFormSwitch name="isTrade" />
              <span className="text-primary text-sm pl-3 font-semibold">
                <FormattedMessage id="mt.qiyongjiaoyi" />
              </span>
            </div>
            {/* @TODO 暂时不支持 */}
            {/* <div className="flex items-center">
              <ProFormSwitch name="isDeposit" />
              <span className="text-primary text-sm pl-3 font-semibold">
                <FormattedMessage id="mt.chujin" />
              </span>
            </div> */}
            {/* @TODO 暂时不支持 */}
            {/* <div className="flex items-center">
              <ProFormSwitch name="isTransfer" />
              <span className="text-primary text-sm pl-3 font-semibold">
                <FormattedMessage id="mt.zijinhuazhuan" />
              </span>
            </div> */}
          </div>
          {/* <div className="w-[50%]">
            <AccountGroupSelectFormItem form={form} />
          </div> */}
          {/* @TODO 交易账号密码接口暂时没有考虑 */}
          {/* <PasswordCheckFormItem form={form} /> */}
        </div>
      </div>
    </Form>
  )
})
