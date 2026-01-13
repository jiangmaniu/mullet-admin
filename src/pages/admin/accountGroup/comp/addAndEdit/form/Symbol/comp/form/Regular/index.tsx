import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormText from '@/components/Admin/Form/ProFormText'
import SpreadFormItem from '@/components/Admin/Form/SpreadFormItem'
import MarketDepthFormItem from '@/pages/admin/symbol/addAndEdit/form/Regular/comp/MarketDepthFormItem'

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
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <div className="w-full grid grid-cols-2 gap-x-[50px] gap-y-5 mt-5">
        {/* 不可以编辑 */}
        {/* <SymbolFormTreeSelect
          label={intl.formatMessage({ id: 'mt.symbol' })}
          fieldProps={{ size: 'large', treeCheckable: false, multiple: false }}
        /> */}
        <ProFormText disabled name="symbol" label={intl.formatMessage({ id: 'mt.symbol' })} />
        {/* 市场深度 */}
        <MarketDepthFormItem form={form} />
        {/* 点差模式 */}
        <SpreadFormItem form={form} />

        {/* <ProFormSlider
          name="slider"
          label={intl.formatMessage({ id: 'mt.dianchapinghang' })}
          max={4}
          min={0}
          step={1}
          fieldProps={{
            styles: {
              track: {
                backgroundColor: colorPrimary
              }
            }
          }}
          marks={{
            0: '0',
            1: '1',
            2: '2',
            3: '3',
            4: '4'
          }}
          help={<div className="text-center text-primary text-sm relative -top-1">0 bid / 0 ask</div>}
        /> */}
      </div>
    </Form>
  )
})
