import { ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import FormInputPresets from '@/components/Admin/Form/FormInputPresets'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getEnum } from '@/constants/enum'

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
      <div className="flex items-start flex-col w-full">
        <div className="flex items-center gap-10">
          <div className="flex items-center pb-5">
            {/* 默认关闭 */}
            <ProFormSwitch name="enableIsolated" initialValue={false} />
            <span className="text-primary text-sm pl-3 font-semibold">
              <FormattedMessage id="mt.shifouqiyongzhuncang" />
            </span>
          </div>
          <div className="flex items-center pb-5">
            {/* 默认打开 */}
            <ProFormSwitch name="enableQphbcfjy" initialValue={true} />
            <span className="text-primary text-sm pl-3 font-semibold">
              <FormattedMessage id="mt.qiangpinghoubuchangfujieyu" />
            </span>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-x-[76px] gap-y-5">
          <ProFormSelect
            name="orderMode"
            required
            label={intl.formatMessage({ id: 'common.type' })}
            options={getEnum().enumToOptions('OrderMode')}
          />

          <ProFormSelect
            name="usableAdvanceCharge"
            label={intl.formatMessage({ id: 'mt.keyongyufukuan' })}
            options={getEnum().enumToOptions('UsableAdvanceCharge')}
            initialValue="NOT_PROFIT_LOSS"
          />

          <FormInputPresets
            name="addAdvanceCharge"
            label={intl.formatMessage({ id: 'mt.zhunjiayufukuanbili' })}
            options={[
              { label: '10%', value: 10 },
              { label: '20%', value: 20 },
              { label: '50%', value: 50 },
              { label: '70%', value: 70 },
              { label: '100%', value: 100 }
            ]}
            form={form}
            maxLength={4}
            inputProps={{ max: 10000 }}
            type="number"
            required
          />

          <FormInputPresets
            name="compelCloseRatio"
            label={intl.formatMessage({ id: 'mt.qiangzhipingcangbili' })}
            options={[
              { label: '10%', value: 10 },
              { label: '20%', value: 20 },
              { label: '50%', value: 50 },
              { label: '70%', value: 70 },
              { label: '100%', value: 100 }
            ]}
            form={form}
            maxLength={4}
            inputProps={{ max: 10000 }}
            type="number"
            required
          />
        </div>
      </div>
    </Form>
  )
})
