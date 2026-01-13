import { getIntl } from '@umijs/max'
import { Form, FormInstance } from 'antd'

import FormInputPresets from '@/components/Admin/Form/FormInputPresets'
import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getEnum } from '@/constants/enum'

type IProps = {
  form: FormInstance
}

/**和账户组同一份表单配置 */
export default function InventoryBaseFormItem({ form }: IProps) {
  const intl = getIntl()
  const holdingCostConf = Form.useWatch('holdingCostConf', form)
  const isEnable = holdingCostConf?.isEnable
  const isPointMode = holdingCostConf?.type === 'pointMode' || form.getFieldValue(['holdingCostConf', 'type']) === 'pointMode'

  return (
    <>
      <ProFormSelect
        name={['holdingCostConf', 'type']}
        label={intl.formatMessage({ id: 'common.type' })}
        options={getEnum().enumToOptions('SymbolInventoryType')}
        required={isEnable}
        initialValue="pointMode"
      />
      <ProFormDigit
        maxLength={40}
        hiddenPrecision
        name={['holdingCostConf', 'buyBag']}
        label={intl.formatMessage({ id: 'mt.mairuchicang' })}
        required={isEnable}
        initialValue="0"
        min={-10000000}
        fieldProps={{
          suffix: !isPointMode ? '%' : '',
          controls: isPointMode
        }}
      />
      <ProFormDigit
        maxLength={40}
        hiddenPrecision
        name={['holdingCostConf', 'sellBag']}
        label={intl.formatMessage({ id: 'mt.maichuchicang' })}
        required={isEnable}
        initialValue="0"
        min={-10000000}
        fieldProps={{
          suffix: !isPointMode ? '%' : '',
          controls: isPointMode
        }}
      />
      <FormInputPresets
        name={['holdingCostConf', 'days']}
        label={intl.formatMessage({ id: 'mt.yinianzhongdetianshu' })}
        options={[
          { label: '360', value: '360' },
          { label: '365', value: '365' },
          { label: '366', value: '366' }
        ]}
        form={form}
        maxLength={3}
        initialValue="365"
        inputProps={{ min: 1, max: 366, style: { width: '100%' } }}
        type="number"
        required={isEnable}
      />
    </>
  )
}
