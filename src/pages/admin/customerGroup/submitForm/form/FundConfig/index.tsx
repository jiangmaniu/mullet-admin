import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import { getFundsMethodPageList } from '@/services/api/wallet'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const language = intl.locale.replace('-', '').replace('_', '').toUpperCase() as Wallet.Language

  const { pathname } = useLocation()
  // {fundsType:'DEPOSIT',current:1,size:1000,language:'ZHTW'}
  // fundsType=DEPOSIT&current=1&size=1000&language=ZHTW
  const { data: depositWayRes, run: runDepositWay } = useRequest(getFundsMethodPageList, { manual: true })
  const { data: withdrawalWayRes, run: runWithdrawalWay } = useRequest(getFundsMethodPageList, { manual: true })
  const payWayOptions = (depositWayRes?.data?.records || []).map((item) => ({ label: item.channelRevealName, value: item.id }))
  const withdrawalWayOptions = (withdrawalWayRes?.data?.records || []).map((item) => ({ label: item.channelRevealName, value: item.id }))

  console.log('payWayOptions', payWayOptions)
  console.log('withdrawalWayOptions', withdrawalWayOptions)
  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  useEffect(() => {
    runDepositWay({ fundsType: 'DEPOSIT', current: 1, size: 1000, language })
    runWithdrawalWay({ fundsType: 'WITHDRAWAL', current: 1, size: 1000, language })
  }, [language])

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
        console.log('values', values)
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <div className="w-full">
        <div className="mb-8">
          <div className="text-lg font-semibold mb-4">
            <FormattedMessage id="mt.rujinqudao" />
          </div>
          <ProFormSelect name="payWay" options={payWayOptions} label={intl.formatMessage({ id: 'mt.rujinqudao' })} />
        </div>
        <div>
          <div className="text-lg font-semibold mb-4">
            <FormattedMessage id="mt.chujinqudao" />
          </div>
          <ProFormSelect name="withdrawalWay" options={withdrawalWayOptions} label={intl.formatMessage({ id: 'mt.chujinqudao' })} />
        </div>
        <div className="mb-8">
          <div className="text-lg font-semibold mt-8 mb-4">
            <FormattedMessage id="mt.pinfanchujinkongzhi" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <ProFormDigit
              fieldProps={{ controls: false }}
              name="withdrawalLimitCount"
              label={intl.formatMessage({ id: 'mt.chujinshenqingcishu' })}
            />
            <ProFormDigit
              fieldProps={{ controls: false }}
              name="withdrawalLimitMoney"
              label={intl.formatMessage({ id: 'mt.chujinjineleiji' })}
            />
            <ProFormDigit
              fieldProps={{ controls: false }}
              name="withdrawalLimitCycle"
              label={intl.formatMessage({ id: 'mt.panduanzhouqi' })}
            />
          </div>
        </div>
      </div>
    </Form>
  )
})
