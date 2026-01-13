import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { NamePath } from 'antd-mobile/es/components/form'

import { getPrepaymentCurrencyDict } from '@/services/api/common'

import ProFormSelect from '../../ProFormSelect'

type IProps = {
  /**是否是外汇模式 */
  isForex?: boolean
  disabled?: boolean
  required?: boolean
  name?: NamePath
}

export default function PepaymentCurrencySelectFormItem({ isForex, disabled, name, required = true }: IProps) {
  const intl = useIntl()

  const defaultOptions = [{ label: 'USD', value: 'USD' }]
  const { data: prepaymentCurrencyDict } = useRequest(getPrepaymentCurrencyDict)
  const prepaymentCurrencyOptions = prepaymentCurrencyDict?.data?.length
    ? prepaymentCurrencyDict.data.map((item) => ({ label: item.key, value: item.value }))
    : defaultOptions

  return (
    <ProFormSelect
      initialValue={'USD'}
      name={name || 'prepaymentCurrency'}
      label={intl.formatMessage({ id: 'mt.yufukuanhuobi' })}
      options={isForex ? defaultOptions : prepaymentCurrencyOptions}
      required={required}
      disabled={disabled}
    />
  )
}
