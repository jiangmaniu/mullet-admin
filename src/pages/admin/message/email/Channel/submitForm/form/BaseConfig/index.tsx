import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import FormText from '@/components/Admin/Form/ProFormText'
import { getChannelTypeCode } from '@/services/api/email/emailChannel'

import ConfParamsEditTable from './ConfParamsEditTable'

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
  const configInfo = Form.useWatch('configInfo', form)
  const channelTypeCode = Form.useWatch('channelTypeCode', form)

  const { data: channelTypeCodeRes } = useRequest(getChannelTypeCode)
  const channelTypeCodeOptions = channelTypeCodeRes?.data || []
  const channelTypeCodeOption = useMemo(() => {
    return channelTypeCodeOptions.find((item) => item.value === channelTypeCode) || ({} as DataSource.DataSourceTypeItem)
  }, [channelTypeCode, channelTypeCodeOptions])

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  console.log('channelTypeCodeOptions', channelTypeCodeOptions)

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
      <div className="grid grid-cols-1 gap-5 mb-4 w-[45%]">
        <FormText required name="channelName" label={intl.formatMessage({ id: 'mt.tongdaomingcheng' })} />
        <ProFormSelect
          label={intl.formatMessage({ id: 'mt.youjiantongdaoleixing' })}
          name="channelTypeCode"
          required
          options={channelTypeCodeOptions}
          disabled={!!initialValues?.id}
          onChange={(value) => {
            const item = channelTypeCodeOptions.find((item) => item.value === value)

            // 当前选择的数据，已经保存过
            if (initialValues?.channelTypeCode === value) {
              form.setFieldValue('configInfo', initialValues?.configInfo)
            } else {
              form.setFieldValue('configInfo', item?.params)
            }
          }}
        />
        {!!channelTypeCodeOption?.params?.length && (
          <div className="mt-6">
            <Form.Item
              name="configInfo_item"
              rules={[
                {
                  required: true,
                  validateTrigger: 'onSubmit',
                  validator(rule, value, callback) {
                    if (configInfo?.length && configInfo.some((item: any) => !item?.value)) {
                      return Promise.reject(intl.formatMessage({ id: 'mt.qingbianjicanshuzhi' }))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <ConfParamsEditTable
                form={form}
                name="configInfo"
                title={
                  <div className="text-primary text-sm relative top-2">
                    <FormattedMessage id="mt.peizhicanshuxinxi" />
                  </div>
                }
              />
            </Form.Item>
          </div>
        )}
      </div>
    </Form>
  )
})
