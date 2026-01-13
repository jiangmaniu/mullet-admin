import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getEnum } from '@/constants/enum'
import MaxTradeFormItem from '@/pages/admin/symbol/addAndEdit/form/Trade/comp/MaxTradeFormItem'
import MinTradeFormItem from '@/pages/admin/symbol/addAndEdit/form/Trade/comp/MinTradeFormItem'
import NominalValueFormItem from '@/pages/admin/symbol/addAndEdit/form/Trade/comp/NominalValueFormItem'
import TradeLimitFormItem from '@/pages/admin/symbol/addAndEdit/form/Trade/comp/TradeLimitFormItem'
import TradeStepFormItem from '@/pages/admin/symbol/addAndEdit/form/Trade/comp/TradeStepFormItem'

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
        console.log('onValuesChange', newValues)
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <div className="flex justify-between items-start w-full gap-7">
        <div className="w-[60%] pb-5 grid gap-y-10">
          <ProFormSelect
            name="tradeLicense"
            required
            label={intl.formatMessage({ id: 'mt.jiaoyixuke' })}
            options={getEnum().enumToOptions('TradeLicense')}
          />
          <ProFormSelect name="gtc" required label="GTC" options={getEnum().enumToOptions('GTC')} />
          <ProFormDigit
            required
            name="limitStopLevel"
            label={intl.formatMessage({ id: 'mt.xianjiahetingsunjibie' })}
            fieldProps={{ suffix: 'PT', controls: false }}
            maxLength={40}
          />
        </div>
        <div className="w-full pb-5 grid gap-y-5 border border-gray-220 rounded-[15px]">
          <div className="text-base text-primary font-semibold text-center border-b border-gray-150 py-[10px]">
            {intl.formatMessage({ id: 'mt.jiaoyiliang' })}
          </div>
          <div className="w-full grid grid-cols-2 gap-x-6 gap-y-5 px-7">
            {/* 最小单量 */}
            <MinTradeFormItem form={form} />
            {/* 最大单量 */}
            <MaxTradeFormItem form={form} />
            {/* 步长 */}
            <TradeStepFormItem form={form} />
            {/* 限制交易量 */}
            <TradeLimitFormItem form={form} />
          </div>
          <div className="px-7">
            {/* 最大名义价值 */}
            <NominalValueFormItem form={form} />
          </div>
        </div>
      </div>
    </Form>
  )
})
