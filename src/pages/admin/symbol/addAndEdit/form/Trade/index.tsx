import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getEnum } from '@/constants/enum'

import MaxTradeFormItem from './comp/MaxTradeFormItem'
import MinTradeFormItem from './comp/MinTradeFormItem'
import NominalValueFormItem from './comp/NominalValueFormItem'
import TradeLimitFormItem from './comp/TradeLimitFormItem'
import TradeStepFormItem from './comp/TradeStepFormItem'

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
          <FormattedMessage id="mt.symbol.jiaoyi.biaoti" />
        </div>
        <div className="flex justify-between items-start w-full gap-[90px]">
          <div className="w-full pb-5 grid gap-y-5">
            <ProFormDigit
              maxLength={15}
              hiddenPrecision
              required
              name="contractSize"
              label={intl.formatMessage({ id: 'mt.heyuedaxiao' })}
            />
            {/* 默认选择外汇 */}
            <ProFormSelect
              name="calculationType"
              required
              label={intl.formatMessage({ id: 'mt.jisuanleixing' })}
              options={getEnum().enumToOptions('CalculationType')}
              initialValue="CFD"
              fieldProps={{ allowClear: false }}
            />
            <ProFormSelect
              name="tradeLicense"
              required
              label={intl.formatMessage({ id: 'mt.jiaoyixuke' })}
              options={getEnum().enumToOptions('TradeLicense')}
            />
            <ProFormSelect name="gtc" required label="GTC" options={getEnum().enumToOptions('GTC')} />
            <ProFormSelect
              name="orderType"
              required
              mode="multiple"
              fieldProps={{ maxTagCount: 'responsive' }}
              label={intl.formatMessage({ id: 'mt.dingdanleixing' })}
              options={getEnum().enumToOptions('OrderType')}
            />
            {/* {calculationType === 'CFD' && ( */}
            <ProFormDigit
              required
              name="quotationSize"
              label={intl.formatMessage({ id: 'mt.baojiadaxiao' })}
              maxLength={40}
              hiddenPrecision
            />
            {/* )} */}
            <ProFormDigit
              required
              name="limitStopLevel"
              label={intl.formatMessage({ id: 'mt.xianjiahetingsunjibie' })}
              fieldProps={{ suffix: 'PT', controls: false }}
              maxLength={15}
              hiddenPrecision={false}
            />
            <ProFormDigit
              required
              name="quotationDelay"
              label={intl.formatMessage({ id: 'mt.zuigaobaojiayanchi' })}
              fieldProps={{ suffix: intl.formatMessage({ id: 'mt.miao' }), controls: false }}
              maxLength={40}
            />
          </div>
          <div className="w-full pb-5 grid gap-y-5 border border-gray-220 rounded-[15px] px-7 py-6">
            <div className="text-base text-primary font-semibold">{intl.formatMessage({ id: 'mt.jiaoyiliang' })}</div>
            {/* 最小单量 */}
            <MinTradeFormItem form={form} />
            {/* 步长 */}
            <TradeStepFormItem form={form} />
            {/* 最大单量 */}
            <MaxTradeFormItem form={form} />
            {/* 限制交易量 */}
            <TradeLimitFormItem form={form} />
            {/* 最大名义价值 */}
            <NominalValueFormItem form={form} />
          </div>
        </div>
      </div>
    </Form>
  )
})
