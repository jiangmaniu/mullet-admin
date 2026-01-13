import { useIntl } from '@umijs/max'
import { FormInstance } from 'antd'

import FormInputPresets from '@/components/Admin/Form/FormInputPresets'

type IProps = {
  form: FormInstance
}

export default function NominalValueFormItem({ form }: IProps) {
  const intl = useIntl()
  return (
    <FormInputPresets
      name="nominalValue"
      label={intl.formatMessage({ id: 'mt.zuidamingyijiazhi' })}
      options={[
        { label: '10000', value: '10000' },
        { label: '100000', value: '100000' },
        { label: '1000000', value: '1000000' },
        { label: '100000000', value: '100000000' }
      ]}
      form={form}
      required
      initialValue="10000"
      type="number"
      maxLength={9}
      inputProps={{ precision: 0 }}
    />
  )
}
