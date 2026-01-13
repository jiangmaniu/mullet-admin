import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import FormInputPresets from '@/components/Admin/Form/FormInputPresets'
import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
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

  const minSpread = Form.useWatch(['quotationConf', 'minSpread'], form)
  const maxSpread = Form.useWatch(['quotationConf', 'maxSpread'], form)
  const ordinary = Form.useWatch(['quotationConf', 'ordinary'], form)
  const filterNum = Form.useWatch(['quotationConf', 'filterNum'], form)

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
        <div className="text-base font-semibold pb-7">
          <FormattedMessage id="mt.symbol.baojia.biaoti" />
        </div>
        <div className="w-full grid gap-y-5">
          <ProFormDigit
            name={['quotationConf', 'discard']}
            width={360}
            addonAfter={
              <span className="text pl-4 text-sm text-gray">
                <FormattedMessage id="mt.dianshu" />
              </span>
            }
            fieldProps={{ style: { width: 360 } }}
            maxLength={40}
            required={false}
            label={intl.formatMessage({ id: 'mt.diuqiguolvjibie' })}
          />
          <FormInputPresets
            name={['quotationConf', 'minSpread']}
            required={false}
            label={intl.formatMessage({ id: 'mt.zuixiaodiancha' })}
            options={[
              { label: <FormattedMessage id="mt.guanbi" />, value: '0' },
              { label: '2', value: '2' },
              { label: '4', value: '4' },
              { label: '6', value: '6' },
              { label: '10', value: '10' }
            ]}
            form={form}
            type="number"
            maxLength={40}
            width={360}
            help={
              <span className="text pl-4 text-sm text-gray">
                <FormattedMessage id="mt.dianshu" />
              </span>
            }
            formItemProps={{
              required: false,
              rules: [
                {
                  required: true,
                  validator(rule, value, callback) {
                    if (!maxSpread) {
                      setTimeout(() => {
                        form.validateFields([['quotationConf', 'maxSpread']])
                      }, 300)
                    }
                    if (!value && maxSpread) {
                      return Promise.reject(intl.formatMessage({ id: 'mt.minSpreadEmpty' }))
                    }
                    return Promise.resolve()
                  }
                }
              ]
            }}
          />
          <FormInputPresets
            name={['quotationConf', 'maxSpread']}
            required={false}
            label={intl.formatMessage({ id: 'mt.zuidadiancha' })}
            options={[
              { label: <FormattedMessage id="mt.guanbi" />, value: '0' },
              { label: '2', value: '2' },
              { label: '4', value: '4' },
              { label: '6', value: '6' },
              { label: '10', value: '10' }
            ]}
            form={form}
            type="number"
            maxLength={40}
            width={360}
            help={
              <span className="text pl-4 text-sm text-gray">
                <FormattedMessage id="mt.dianshu" />
              </span>
            }
            formItemProps={{
              required: false,
              rules: [
                {
                  required: true,
                  validator(rule, value, callback) {
                    if (!minSpread) {
                      setTimeout(() => {
                        form.validateFields([['quotationConf', 'minSpread']])
                      }, 300)
                    }
                    if (!value && minSpread) {
                      return Promise.reject(intl.formatMessage({ id: 'mt.maxSpreadEmpty' }))
                    }
                    return Promise.resolve()
                  }
                }
              ]
            }}
          />
          <ProFormDigit
            name={['quotationConf', 'ordinary']}
            width={360}
            addonAfter={
              <span className="text pl-4 text-sm text-gray">
                <FormattedMessage id="mt.dianshuTips" />
              </span>
            }
            maxLength={40}
            required={false}
            fieldProps={{ style: { width: 360 } }}
            label={intl.formatMessage({ id: 'mt.putongguolvjibie' })}
            formItemProps={{
              required: false,
              rules: [
                {
                  required: true,
                  validator(rule, value, callback) {
                    if (!filterNum) {
                      setTimeout(() => {
                        form.validateFields([['quotationConf', 'filterNum']])
                      }, 300)
                    }
                    if (!value && filterNum) {
                      return Promise.reject(intl.formatMessage({ id: 'mt.ordinaryEmpty' }))
                    }
                    return Promise.resolve()
                  }
                }
              ]
            }}
          />

          <ProFormSelect
            name={['quotationConf', 'filterNum']}
            label={intl.formatMessage({ id: 'mt.guolvcishu' })}
            options={Array.from({ length: 10 }, (k, v) => ({ label: String(v + 1), value: String(v + 1) }))}
            required={false}
            width={360}
            addonAfter={
              <span className="text pl-4 text-sm text-gray">
                <FormattedMessage id="mt.gelianxuboajia" />
              </span>
            }
            showSearch={false}
            formItemProps={{
              required: false,
              rules: [
                {
                  required: true,
                  validator(rule, value, callback) {
                    if (!ordinary) {
                      setTimeout(() => {
                        form.validateFields([['quotationConf', 'ordinary']])
                      }, 300)
                    }
                    if (!value && ordinary) {
                      return Promise.reject(intl.formatMessage({ id: 'mt.filterNumEmpty' }))
                    }
                    return Promise.resolve()
                  }
                }
              ]
            }}
          />
        </div>
      </div>
    </Form>
  )
})
