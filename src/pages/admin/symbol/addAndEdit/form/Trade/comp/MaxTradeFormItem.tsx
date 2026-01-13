import { useIntl } from '@umijs/max'
import { FormInstance } from 'antd'

import FormInputPresets from '@/components/Admin/Form/FormInputPresets'

type IProps = {
  form: FormInstance
}

export default function MaxTradeFormItem({ form }: IProps) {
  const intl = useIntl()
  return (
    <FormInputPresets
      name="maxTrade"
      label={intl.formatMessage({ id: 'mt.zuidadanliang' })}
      options={[
        { label: '1', value: '1' },
        { label: '10', value: '10' },
        { label: '100', value: '100' },
        { label: '1000', value: '1000' }
      ]}
      form={form}
      required
      initialValue="1000"
      type="number"
      maxLength={40}
    />
  )
}
