import { useIntl } from '@umijs/max'
import { Form, FormInstance } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import FormLayout from './comp/FormLayout'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
  tabList?: any[]
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues = {}, tabList }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const isAdd = !initialValues?.id

  useImperativeHandle(ref, () => {
    return form
  })

  // 获取交易Tab下的form表单实例
  const tradeForm = tabList?.find((item) => item?.key === 'Trade')?.ref?.current as FormInstance
  // 交易Tab下的表单值 计算类型：CFD 外汇 FOREIGN_CURRENCY差价合约
  const calculationType = Form.useWatch('calculationType', tradeForm)

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
      <FormLayout layout="CREATE_SYMBOL" form={form} initialValues={initialValues} />
    </Form>
  )
})
