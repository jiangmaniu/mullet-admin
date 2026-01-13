import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { NamePath } from 'antd-mobile/es/components/form'

import { getBaseCurrencyDict } from '@/services/api/common'

import ProFormSelect from '../../ProFormSelect'

type IProps = {
  /**是否是外汇模式 */
  isForex?: boolean
  disabled?: boolean
  required?: boolean
  name?: NamePath
}

export default function BaseCurrrencySelectFormItem({ isForex, disabled, name, required = true }: IProps) {
  const intl = useIntl()

  const defaultOptions = [{ label: 'USD', value: 'USD' }]
  const { data: baseCurrencyDictData } = useRequest(getBaseCurrencyDict)
  const baseCurrencyOptions = baseCurrencyDictData?.data?.length
    ? baseCurrencyDictData.data.map((item) => ({ label: item.key, value: item.value }))
    : defaultOptions

  return (
    <ProFormSelect
      initialValue={'USD'}
      name={name || 'baseCurrency'}
      label={intl.formatMessage({ id: 'mt.jizhunhuobi' })}
      options={isForex ? defaultOptions : baseCurrencyOptions}
      required={required}
      disabled={disabled}
    />
  )
}
