import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'

import Iconfont from '@/components/Base/Iconfont'
import { formatNum } from '@/utils'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: Customer.ListItem
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const accountCount = initialValues?.accountCount

  useImperativeHandle(ref, () => {
    return form
  })

  const cardList = [
    {
      title: intl.formatMessage({ id: 'mt.kehukeyong' }),
      unit: 'USD',
      value: accountCount?.availableBalance || 0,
      colSpan: 8
    },
    {
      title: intl.formatMessage({ id: 'mt.zongchengjiaoliang' }),
      unit: <FormattedMessage id="mt.lot" />,
      value: accountCount?.totalTradeVolume,
      colSpan: 8
    },
    {
      title: intl.formatMessage({ id: 'mt.zongyingkui' }),
      unit: 'USD',
      value: accountCount?.totalProfitLoss,
      colSpan: 8
    },
    {
      title: intl.formatMessage({ id: 'mt.zongrujin' }),
      unit: 'USD',
      value: accountCount?.totalDeposit,
      colSpan: 12
    },
    {
      title: intl.formatMessage({ id: 'mt.zongchujin' }),
      unit: 'USD',
      value: accountCount?.totalWithdrawal,
      colSpan: 12
    }
  ]

  return (
    <ProCard ghost gutter={[12, 12]} wrap>
      {cardList.map((item, idx) => (
        <ProCard
          key={idx}
          colSpan={item.colSpan}
          bordered
          bodyStyle={{ height: 130 }}
          title={
            <div className="flex items-center">
              <Iconfont name="shuju" width={28} height={28} />
              <span className="text-primary text-base font-semibold pl-1">{item.title}</span>
            </div>
          }
          layout="center"
          direction="column"
        >
          <div className="text-primary !font-dingpro-medium text-[32px]">{formatNum(item.value, { precision: 2 })}</div>
          <div className="text-secondary text-sm pt-2">{item.unit}</div>
        </ProCard>
      ))}
    </ProCard>
  )
})
