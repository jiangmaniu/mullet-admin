import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { FormInstance } from 'antd/lib'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import BaseCurrrencySelectFormItem from '@/components/Admin/Form/CurrrencyDictSelect/BaseCurrrencySelectFormItem'
import PepaymentCurrencySelectFormItem from '@/components/Admin/Form/CurrrencyDictSelect/PepaymentCurrencySelectFormItem'
import ProfitCurrencySelectFormItem from '@/components/Admin/Form/CurrrencyDictSelect/ProfitCurrencySelectFormItem'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
  tabList?: any[]
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, tabList }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()

  // 获取交易Tab下的form表单实例
  const tradeForm = tabList?.find((item) => item?.key === 'Trade')?.ref?.current as FormInstance
  // 交易Tab下的表单值 计算类型：FOREIGN_CURRENCY外汇 CFD差价合约
  const calculationType = Form.useWatch('calculationType', tradeForm)
  const isForex = calculationType === 'FOREIGN_CURRENCY' // 外汇

  // 常规Tab下的表单值
  // 品种名称从数据源选择后确定的品种名称
  // 获取常规Tab下的form表单实例
  const regularForm = tabList?.find((item) => item?.key === 'Regular')?.ref?.current as FormInstance
  const symbolName = Form.useWatch('symbol', regularForm) || '' // 这里要从常规Tab下的数据源那里选择后获取，来填充到 基准货币、盈利货币 下拉

  // 基准货币、盈利货币可选项取决与交易功能中的交易类型，如是外汇类型CNYUSD，默认基准货币为CNY盈利货币为USD不能进行修改编辑
  // 预付款货币下拉框展示USD、EUR、GBP、JPY、CHF、RUR法币；差价合约类型基准货币、盈利货币、预付款货币均为USD、EUR、GBP、JPY、CHF、RUR法币

  useImperativeHandle(ref, () => {
    return form
  })

  useEffect(() => {
    if (isForex) {
      // 切换外汇后，重置基础货币、盈利货币为USD
      form.setFieldsValue({
        baseCurrency: symbolName.slice(0, 3) || 'USD',
        profitCurrency: symbolName.slice(3, 6) || 'USD'
      })
    }
  }, [calculationType, symbolName])

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  const digitsOptions = Array.from({ length: 9 }, (k, v) => ({ label: String(v), value: String(v) }))

  // const { data: baseCurrencyDictData } = useRequest(getBaseCurrencyDict)
  // const { data: profitCurrencyDictData } = useRequest(getProfitCurrencyDict)
  // const { data: prepaymentCurrencyDict } = useRequest(getPrepaymentCurrencyDict)

  // 非外汇货币选项
  // const NotForexOptions = [
  //   { label: 'USD', value: 'USD' },
  //   { label: 'EUR', value: 'EUR' },
  //   { label: 'GBP', value: 'GBP' },
  //   { label: 'JPY', value: 'JPY' },
  //   { label: 'CHF', value: 'CHF' },
  //   { label: 'RUB', value: 'RUB' },
  //   { label: 'HKD', value: 'HKD' }
  // ]
  // const profitCurrencyOptions = (profitCurrencyDictData?.data || []).map((item) => ({ label: item.key, value: item.value }))
  // const prepaymentCurrencyOptions = (prepaymentCurrencyDict?.data || []).map((item) => ({ label: item.key, value: item.value }))

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
      <div className="flex items-start flex-col w-full">
        <div className="text-base font-semibold pb-7">
          <FormattedMessage id="mt.symbol.huobi.biaoti" />
        </div>
        <div className="w-full grid grid-cols-2 gap-x-[76px] gap-y-5">
          {/* 基准货币 */}
          <BaseCurrrencySelectFormItem isForex={isForex} disabled={isForex} />
          <ProFormSelect
            name="baseCurrencyDecimal"
            label={intl.formatMessage({ id: 'mt.jizhunhuobixiaoshuwei' })}
            options={digitsOptions}
            required
          />
          {/* 盈利货币 */}
          <ProfitCurrencySelectFormItem isForex={isForex} disabled={isForex} />
          <ProFormSelect
            name="profitCurrencyDecimal"
            label={intl.formatMessage({ id: 'mt.yinglihuobixiaoshuwei' })}
            options={digitsOptions}
            required
          />
          {/* 预付款货币 */}
          <PepaymentCurrencySelectFormItem />
          <ProFormSelect
            name="prepaymentCurrencyDecimal"
            label={intl.formatMessage({ id: 'mt.yufukuanhuobixiaoshuwei' })}
            options={digitsOptions}
            required
          />
        </div>
      </div>
    </Form>
  )
})
