import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'

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
  const isDepositChannel = pathname.indexOf('payment/deposit-channel') !== -1
  const calculationType = Form.useWatch('calculationType', form)

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
        <div className="text-base font-semibold pb-7">
          <FormattedMessage id="mt.rujinshouxufeitips" />
        </div>

        <div className="flex justify-between items-start w-full gap-[90px]">
          <div className="w-full pb-5 grid gap-y-5">
            <div className="text-base font-semibold">
              {isDepositChannel ? (
                <FormattedMessage id="mt.qudaorujinshouxufeititle" />
              ) : (
                <FormattedMessage id="mt.qudaochujinshouxufeititle" />
              )}
            </div>
            <ProFormDigit
              maxLength={20}
              hiddenPrecision
              required={false}
              name="channelSingleFixedFee"
              label={intl.formatMessage({ id: 'mt.danbigudingfeiyong' })}
            />
            <ProFormDigit
              maxLength={4}
              min={0}
              max={100}
              required={false}
              name="channelTradePercentageFee"
              label={intl.formatMessage({ id: 'mt.jiaoyiebaifenbifeiyong' })}
              fieldProps={{
                suffix: '%',
                controls: false
              }}
            />

            <ProFormDigit
              maxLength={20}
              hiddenPrecision
              required={false}
              name="channelSingleLeastFee"
              label={intl.formatMessage({ id: 'mt.danbizuidishoufei' })}
            />
            <ProFormDigit maxLength={20} name="channelExchangeRate" label={intl.formatMessage({ id: 'mt.qudaojiesuanhuilv' })} />
          </div>
          <div className="w-full pb-5 grid gap-y-5 border border-gray-220 rounded-[15px] px-7 py-6">
            <div className="text-base text-primary font-semibold">
              {isDepositChannel
                ? intl.formatMessage({ id: 'mt.kehurujinshouxufeititle' })
                : intl.formatMessage({ id: 'mt.kehuchujinshouxufeititle' })}
            </div>
            <ProFormDigit
              maxLength={20}
              hiddenPrecision
              required={false}
              name="userSingleFixedFee"
              label={intl.formatMessage({ id: 'mt.danbigudingfeiyong' })}
            />
            <ProFormDigit
              maxLength={4}
              min={0}
              max={100}
              required={false}
              name="userTradePercentageFee"
              label={intl.formatMessage({ id: 'mt.jiaoyiebaifenbifeiyong' })}
              fieldProps={{
                suffix: '%',
                controls: false
              }}
            />
            <ProFormDigit
              maxLength={20}
              hiddenPrecision
              required={false}
              name="userSingleLeastFee"
              label={intl.formatMessage({ id: 'mt.danbizuidishoufei' })}
            />
            <ProFormDigit
              min={0}
              max={10000}
              name="userExchangeDifferencePercentage"
              fieldProps={{
                suffix: '%',
                controls: false
              }}
              label={intl.formatMessage({ id: 'mt.huichashouqu' })}
            />
          </div>
        </div>
      </div>
    </Form>
  )
})
