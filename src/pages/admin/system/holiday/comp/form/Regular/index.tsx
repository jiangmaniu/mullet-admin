import { ProFormDateTimePicker, ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

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
  const startTime = Form.useWatch('startTime', form)
  const endTime = Form.useWatch('endTime', form)

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    if (initialValues?.startTime) {
      initialValues.startTime = moment(initialValues.startTime)
      initialValues.endTime = moment(initialValues.endTime)
    }
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
      <div className="flex items-center gap-8">
        <div className="flex items-center">
          <ProFormSwitch name="status" />
          <span className="text-primary text-sm pl-3 font-semibold">
            <FormattedMessage id="mt.qiyong" />
          </span>
        </div>
        <div className="flex items-center">
          <ProFormSwitch name="repeatYear" />
          <span className="text-primary text-sm pl-3 font-semibold">
            <FormattedMessage id="mt.shifoumeinian" />
          </span>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-x-[50px] gap-y-7 mt-5">
        <ProFormDateTimePicker
          fieldProps={{ size: 'large', style: { width: '100%' } }}
          required
          width="lg"
          name="startTime"
          label={intl.formatMessage({ id: 'common.startTime' })}
          rules={[
            {
              required: true,
              validator(rule, value, callback) {
                if (!startTime) {
                  return Promise.reject(intl.formatMessage({ id: 'mt.xuanzekaishishijian' }))
                }
                if (endTime && dayjs(startTime).isAfter(endTime)) {
                  return Promise.reject(intl.formatMessage({ id: 'mt.startTimebunengdayuEndTime' }))
                }
                setTimeout(() => {
                  form.validateFields(['endTime'])
                }, 300)
                return Promise.resolve()
              }
            }
          ]}
        />
        <ProFormDateTimePicker
          fieldProps={{ size: 'large', style: { width: '100%' } }}
          required
          width="lg"
          name="endTime"
          label={intl.formatMessage({ id: 'common.endTime' })}
          rules={[
            {
              required: true,
              validator(rule, value, callback) {
                if (!endTime) {
                  return Promise.reject(intl.formatMessage({ id: 'mt.xuanjieshushishijian' }))
                }
                if (startTime && dayjs(startTime).isAfter(endTime)) {
                  return Promise.reject(intl.formatMessage({ id: 'mt.endTimebunengxiaoyuStartTime' }))
                }
                setTimeout(() => {
                  form.validateFields(['startTime'])
                }, 300)
                return Promise.resolve()
              }
            }
          ]}
        />
        <ProFormText name="describeInfo" label={intl.formatMessage({ id: 'mt.miaoshu' })} />
      </div>
    </Form>
  )
})
