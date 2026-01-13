import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'

import Table from './table'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: Customer.ListItem
  getTotal?: (total: number) => void
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, getTotal }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => {
    return form
  })

  return <Table getTotal={getTotal} clientId={initialValues?.id} initialValues={initialValues} />
})
