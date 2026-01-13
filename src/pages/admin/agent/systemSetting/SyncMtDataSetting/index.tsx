import { ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import FormText from '@/components/Admin/Form/ProFormText'
import { useEnv } from '@/context/envProvider'

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
  const { breakPoint } = useEnv()

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
      <div className="w-[70%]">
        <div>
          <div className="text-base font-semibold pb-7">
            <img src="/img/mt4.png" className="w-[140px] h-[38px]" />
            <span className="pl-2">
              <FormattedMessage id="mt.agent.lianjiepeizhi" />
            </span>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-[76px] gap-y-5 mb-5">
            <FormText required maxLength={60} name="node1" label={intl.formatMessage({ id: 'mt.agent.fangwenjiedian' })} />
            <div></div>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-[76px] gap-y-5">
            <FormText required maxLength={60} name="account1" label={intl.formatMessage({ id: 'mt.agent.zhanghao' })} />
            <ProFormText.Password
              required
              name="pwd1"
              label={intl.formatMessage({ id: 'common.mima' })}
              fieldProps={{ size: 'large' }}
              placeholder={intl.formatMessage({ id: 'mt.agent.shuruzhumima' })}
              rules={[{ message: intl.formatMessage({ id: 'mt.agent.shuruzhumima' }), required: true }]}
            />
          </div>
        </div>
        <div className="mt-7">
          <div className="text-base font-semibold pb-7">
            <img src="/img/mt5.png" className="w-[140px] h-[38px]" />
            <span className="pl-2">
              <FormattedMessage id="mt.agent.lianjiepeizhi" />
            </span>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-[76px] gap-y-5 mb-5">
            <FormText required maxLength={60} name="node1" label={intl.formatMessage({ id: 'mt.agent.fangwenjiedian' })} />
            <div></div>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-[76px] gap-y-5">
            <FormText required maxLength={60} name="account1" label={intl.formatMessage({ id: 'mt.agent.zhanghao' })} />
            <ProFormText.Password
              required
              name="pwd1"
              label={intl.formatMessage({ id: 'common.mima' })}
              fieldProps={{ size: 'large' }}
              placeholder={intl.formatMessage({ id: 'mt.agent.shuruzhumima' })}
              rules={[{ message: intl.formatMessage({ id: 'mt.agent.shuruzhumima' }), required: true }]}
            />
          </div>
        </div>
        <div className="mt-7">
          <div className="text-base font-semibold pb-5">
            <FormattedMessage id="mt.agent.duozhanghuzhichi" />
          </div>
          <div className="w-full grid grid-cols-2 xxl:gap-x-[76px] max-xxl:gap-x-[20px] gap-y-5">
            <ProFormCheckbox.Group
              name="checkbox"
              label={intl.formatMessage({ id: 'mt.agent.duozhanghuguanlianziduan' })}
              width="lg"
              options={[
                {
                  label: intl.formatMessage({ id: 'mt.agent.shouji' }),
                  value: '1'
                },
                {
                  label: intl.formatMessage({ id: 'mt.agent.youxiang' }),
                  value: '2'
                },
                {
                  label: intl.formatMessage({ id: 'mt.agent.xingming' }),
                  value: '3'
                },
                {
                  label: intl.formatMessage({ id: 'mt.agent.zhushi' }),
                  value: '4'
                }
              ]}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'mt.agent.qingxuanzeduozhanghuguanlianziduan' })
                }
              ]}
            />
          </div>
          <div className="text-secondary text-xs mt-3">
            <FormattedMessage id="mt.agent.duozhanghuzhichitips" />
          </div>
        </div>
      </div>
    </Form>
  )
})
