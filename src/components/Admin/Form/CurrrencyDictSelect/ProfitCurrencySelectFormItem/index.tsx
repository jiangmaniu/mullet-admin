import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { NamePath } from 'antd-mobile/es/components/form'

import { getProfitCurrencyDict } from '@/services/api/common'

import ProFormSelect from '../../ProFormSelect'

type IProps = {
  /**是否是外汇模式 */
  isForex?: boolean
  disabled?: boolean
  required?: boolean
  name?: NamePath
}

export default function ProfitCurrencySelectFormItem({ isForex, disabled, name, required = true }: IProps) {
  const intl = useIntl()

  const defaultOptions = [{ label: 'USD', value: 'USD' }]
  const { data: profitCurrencyDictData } = useRequest(getProfitCurrencyDict)
  const profitCurrencyOptions = profitCurrencyDictData?.data?.length
    ? profitCurrencyDictData.data.map((item) => ({ label: item.key, value: item.value }))
    : defaultOptions

  return (
    <ProFormSelect
      initialValue={'USD'}
      name={name || 'profitCurrency'}
      label={intl.formatMessage({ id: 'mt.yinglihuobi' })}
      options={isForex ? defaultOptions : profitCurrencyOptions}
      required={required}
      disabled={disabled}
    />
  )
}
