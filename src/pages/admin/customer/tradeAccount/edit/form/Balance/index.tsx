import { ActionType } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useParams } from '@umijs/max'
import { Form } from 'antd'
import { observer } from 'mobx-react'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Button from '@/components/Base/Button'
import { getEnum } from '@/constants/enum'
import { useStores } from '@/context/mobxProvider'
import { rechargeAccount } from '@/services/api/tradeCore/account'
import { message } from '@/utils/message'

import StatisticCard from '../../../../../../../components/Trade/comp/StatisticCard'
import Table from './comp/Table'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: Account.AccountPageListItem
  iconDom?: React.ReactNode
  /**刷新详情页 */
  reload?: (params: API.IdParam) => void
  active?: boolean
}

export default observer(
  forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, iconDom, reload, active }: IProps, ref) => {
    const intl = useIntl()
    const [formData, setFormData] = useState<any>({})
    const [form] = Form.useForm()
    const query = useParams()
    const tableRef = useRef<ActionType>()
    const { trade } = useStores()

    const accountId = query.id as string

    useImperativeHandle(ref, () => {
      return form
    })

    // 动态回显表单项值，不能通过initialValues回显
    useEffect(() => {
      form.setFieldsValue(initialValues)
    }, [initialValues])

    // const handleSubmit = async (type: 'DEPOSIT' | 'WITHDRAWAL') => {
    //   const formatData = form.getFieldsValue()
    //   const amount = formatData.amount
    //   if (!amount) {
    //     return message.info(intl.formatMessage({ id: 'mt.qingshurujine' }))
    //   }
    //   if (!formatData.opRemark) {
    //     return message.info(intl.formatMessage({ id: 'mt.qingshurubeizhu' }))
    //   }
    //   const params = {
    //     type: formatData.type,
    //     remark: formatData.opRemark,
    //     accountId,
    //     money: Number(type === 'WITHDRAWAL' ? -amount : amount) // 出金为负数
    //   } as Account.RechargeParams

    //   const res = await rechargeAccount(params)
    //   if (res.success) {
    //     message.info(intl.formatMessage({ id: 'common.opSuccess' }))
    //     form.resetFields()
    //     // 刷新列表
    //     tableRef?.current?.reload?.()
    //     // 刷新详情页
    //     reload?.({ id: accountId })
    //   }
    // }
    const handleSubmit = async () => {
      const formatData = form.getFieldsValue()
      const amount = formatData.amount
      if (!amount) {
        return message.info(intl.formatMessage({ id: 'mt.qingshurujine' }))
      }
      if (!formatData.opRemark) {
        return message.info(intl.formatMessage({ id: 'mt.qingshurubeizhu' }))
      }
      const params = {
        type: formatData.type,
        remark: formatData.opRemark,
        accountId,
        money: Number(formatData.type === 'WITHDRAWAL' ? -amount : amount) // 出金为负数
      } as Account.RechargeParams

      const res = await rechargeAccount(params)
      if (res.success) {
        message.info(intl.formatMessage({ id: 'common.opSuccess' }))
        form.resetFields()
        // 刷新列表
        tableRef?.current?.reload?.()
        // 刷新详情页
        reload?.({ id: accountId })
      }
    }

    const currencyDecimal = initialValues?.currencyDecimal

    // 当前账户占用的保证金 = 逐仓保证金 + 全仓保证金（可用保证金）
    const occupyMargin = Number(initialValues?.margin || 0) + Number(initialValues?.isolatedMargin || 0)

    return (
      <>
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
          <div className="flex items-start w-full pl-[43px] py-[37px]">
            <div className="text-base font-semibold mr-[50px]">{iconDom}</div>
            <div className="flex flex-col w-full justify-end">
              <div className="w-full pb-7">
                <StatisticCard initialValues={initialValues} />
              </div>
              <div className="w-full grid grid-cols-4 gap-4">
                <ProFormDigit
                  name="amount"
                  fieldProps={{
                    min: 1
                    // precision: trade.currentAccountInfo?.currencyDecimal
                  }}
                  label={intl.formatMessage({ id: 'mt.jine' })}
                />
                <ProFormSelect
                  name="type"
                  // required
                  label={intl.formatMessage({ id: 'common.op' })}
                  options={getEnum().enumToOptions('CustomerBalanceType')}
                  // width="lg"
                  initialValue={'DEPOSIT'} // 默认入金
                  allowClear={false}
                />
                <ProFormText name="opRemark" label={intl.formatMessage({ id: 'mt.beizhu' })} />
                <div className="flex items-end gap-3">
                  <Button
                    type="primary"
                    style={{ height: 40, width: 100 }}
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    <FormattedMessage id="mt.biangeng" />
                  </Button>
                  {/* <Button
                  type="primary"
                  style={{ height: 40, width: 100 }}
                  onClick={() => {
                    handleSubmit('DEPOSIT')
                  }}
                >
                  <FormattedMessage id="mt.rujin" />
                </Button>
                <Button
                  type="primary"
                  style={{ height: 40, width: 100 }}
                  onClick={() => {
                    handleSubmit('WITHDRAWAL')
                  }}
                >
                  <FormattedMessage id="mt.chujin" />
                </Button> */}
                </div>
              </div>
            </div>
          </div>
        </Form>
        <Table ref={tableRef} />
      </>
    )
  })
)
