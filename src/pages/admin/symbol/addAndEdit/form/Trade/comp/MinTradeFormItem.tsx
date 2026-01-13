import { useIntl } from '@umijs/max'
import { FormInstance } from 'antd'

import FormInputPresets from '@/components/Admin/Form/FormInputPresets'

type IProps = {
  form: FormInstance
}

export default function MinTradeFormItem({ form }: IProps) {
  const intl = useIntl()
  return (
    <FormInputPresets
      name="minTrade"
      label={intl.formatMessage({ id: 'mt.zuixiaodanliang' })}
      options={[
        { label: '0.1', value: '0.1' },
        { label: '1', value: '1' },
        { label: '10', value: '10' },
        { label: '100', value: '100' }
      ]}
      form={form}
      required
      initialValue="0.1"
      type="number"
      maxLength={40}
    />
  )
}
