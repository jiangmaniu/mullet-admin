import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getAccountGroupPageList } from '@/services/api/tradeCore/accountGroup'

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

  const { data, loading } = useRequest(getAccountGroupPageList, {
    defaultParams: [{ size: 999, current: 1 }]
  })
  const accountGroupOptions = (data?.data?.records || [])?.map((item) => ({
    label: item.groupName,
    value: item.id,
    isSimulate: item.isSimulate
  }))
  const realAccountGroupOptions = useMemo(() => accountGroupOptions.filter((item) => !item.isSimulate), [accountGroupOptions])
  const demoAccountGroupOptions = useMemo(() => accountGroupOptions.filter((item) => item.isSimulate), [accountGroupOptions])

  // 根据账户组id回显 拆分真实和模拟账户组id
  const accountGroupId = (initialValues?.accountGroupId || '').split(',')
  const realAccountGroupId = useMemo(
    () => realAccountGroupOptions.filter((item) => accountGroupId.includes(item.value)).map((item) => item.value),
    [realAccountGroupOptions, accountGroupId]
  )
  const demoAccountGroupId = useMemo(
    () => demoAccountGroupOptions.filter((item) => accountGroupId.includes(item.value)).map((item) => item.value),
    [demoAccountGroupOptions, accountGroupId]
  )

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue({
      ...initialValues
    })
    if (realAccountGroupId.length > 0) {
      form.setFieldsValue({
        realAccountGroupId: realAccountGroupId
      })
    }
    if (demoAccountGroupId.length > 0) {
      form.setFieldsValue({
        demoAccountGroupId: demoAccountGroupId
      })
    }
  }, [initialValues, realAccountGroupId.length, demoAccountGroupId.length])

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
      <div className="w-full">
        <div className="mb-8">
          <div className="text-lg font-semibold mb-4">
            <FormattedMessage id="mt.zhenshijiaoyi" />
          </div>
          <ProFormSelect
            name="realAccountGroupId"
            mode="multiple"
            options={realAccountGroupOptions}
            fieldProps={{
              maxTagCount: 'responsive'
            }}
            label={intl.formatMessage({ id: 'mt.zhenshijiaoyitips' })}
            placeholder={intl.formatMessage({ id: 'mt.qingxuanzezhenshijiaoyi' })}
            rules={[{ required: true, message: intl.formatMessage({ id: 'mt.qingxuanzezhenshijiaoyi' }) }]}
          />
        </div>
        <div>
          <div className="text-lg font-semibold mb-4">
            <FormattedMessage id="mt.monijiaoyi" />
          </div>
          <ProFormSelect
            name="demoAccountGroupId"
            mode="multiple"
            options={demoAccountGroupOptions}
            fieldProps={{
              maxTagCount: 'responsive'
            }}
            label={intl.formatMessage({ id: 'mt.monijiaoyitips' })}
            placeholder={intl.formatMessage({ id: 'mt.qingxuanzemonijiaoyi' })}
            // rules={[{ required: true, message: intl.formatMessage({ id: 'mt.qingxuanzemonijiaoyi' }) }]}
          />
        </div>
      </div>
    </Form>
  )
})
