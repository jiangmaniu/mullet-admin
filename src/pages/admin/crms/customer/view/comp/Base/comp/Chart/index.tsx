import { ProCard } from '@ant-design/pro-components'
import { useIntl, useModel } from '@umijs/max'
import { Form } from 'antd'
import { useState } from 'react'

import AssetLineChart from './comp/AssetLineChart'
import OrderTimePieChart from './comp/OrderTimePieChart'
import TradeActiveBarChart from './comp/TradeActiveBarChart'
import TradeSymbolPieChart from './comp/TradeSymbolPieChart'

export type IParams = {
  /**交易账号 */
  tradeAccountId?: string
}

export default function Chart() {
  const [params, setParams] = useState<IParams>({})
  const intl = useIntl()
  const [form] = Form.useForm()
  const { realAccountGroupOptions } = useModel('accountGroup')
  const { accountOptions } = useModel('clientInfo')

  return (
    <div>
      {/* <ProForm
        onValuesChange={(values) => {
          // console.log('values', values)
          setParams(form.getFieldsValue() || {})
        }}
        submitter={false}
        layout="horizontal"
        colon={false}
        form={form}
        autoFocusFirstInput={false}
      >
        <div className="grid grid-cols-2 gap-x-3 w-[550px]">
          <ProFormSelect
            name="tradeAccountId"
            label={intl.formatMessage({ id: 'mt.jiaoyizhanghu' })}
            options={accountOptions}
            width={180}
            fieldProps={{ size: 'middle', bordered: false, style: { background: '#fff' } }}
            className="!mb-4"
          />
        </div>
      </ProForm> */}
      <ProCard>
        {/* 账户资产变化 */}
        <AssetLineChart params={params} />
        <div className="mt-4 grid grid-cols-3 overflow-hidden">
          {/* 交易活跃时间 */}
          <TradeActiveBarChart />
          {/* 交易品种偏好 */}
          <TradeSymbolPieChart />
          {/* 合约订单时长统计图表 */}
          <OrderTimePieChart />
        </div>
      </ProCard>
    </div>
  )
}
