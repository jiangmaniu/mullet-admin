import { FormattedMessage, useIntl } from '@umijs/max'
import { FormInstance } from 'antd'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'

type IProps = {
  form: FormInstance
}

export default function MarketDepthFormItem({ form }: IProps) {
  const intl = useIntl()

  return (
    <>
      {/* // <FormInputPresets
    //   name="depthOfMarket"
    //   required
    //   label={intl.formatMessage({ id: 'mt.shenduxianzhi' })}
    //   options={[
    //     { label: <FormattedMessage id="mt.guanbi" />, value: '0' },
    //     // { label: '2', value: '2' },
    //     // { label: '4', value: '4' },
    //     // { label: '6', value: '6' },
    //     { label: '10', value: '10' }
    //   ]}
    //   form={form}
    //   type="number"
    // /> */}
      <ProFormSelect
        name="depthOfMarket"
        required
        label={intl.formatMessage({ id: 'mt.shenduxianzhi' })}
        options={[
          { label: <FormattedMessage id="mt.guanbi" />, value: 0 },
          { label: <FormattedMessage id="mt.qiyong" />, value: 10 }
        ]}
        initialValue={0}
      />
    </>
  )
}
