import { ProCard, ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useParams } from '@umijs/max'
import { useState } from 'react'

import Cumulative from './comp/Cumulative'
import FilterSelect from './comp/FilterSelect'
import Performance from './comp/Performance'
import PieChart from './comp/PieChart'
import { useOverview } from './comp/useOverview'

type IProps = {
  children: React.ReactNode
}

export default function Overview({ children }: IProps) {
  const { id } = useParams()
  const [switchLoading, setSwitchLoading] = useState(false)

  const {
    statistics,
    profitStatistics: { earningRates, profitAmounts },
    symbolStatistics,
    dateRange1,
    setDateRange1,
    dateRange2,
    setDateRange2,
    dateRange3,
    setDateRange3
  } = useOverview({ id })

  return (
    <ProCard direction="column">
      <div className="flex items-center justify-between">
        {children}
        <div className="text-sm text-weak flex items-center" key="right">
          <span className="mr-1 text-sm text-primary font-normal">
            <FormattedMessage id="mt.jinyong" />
          </span>
          <ProFormSwitch
            fieldProps={{
              loading: switchLoading,
              // value: status === 'ENABLE',
              onChange: (checked) => {
                setSwitchLoading(true)
                // switchDataSourceStatus({
                //   id: currentDataSourceItem?.id as number,
                //   status: checked ? 'ENABLE' : 'DISABLED'
                // })
                //   .then((res) => {
                //     if (res.success) {
                //       getDataSource()
                //     }
                //   })
                //   .finally(() => {
                //     setTimeout(() => {
                //       setSwitchLoading(false)
                //     }, 500)
                //   })
              }
            }}
          />
        </div>
      </div>
      <ProCard gutter={[20, 20]} ghost wrap>
        <ProCard
          bordered
          bodyStyle={{ height: 360 }}
          colSpan={{
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 7,
            xxl: 7
          }}
          title={
            <span className="text-primary text-xl font-semibold">
              <FormattedMessage id="mt.daidanbiaoxian" />
            </span>
          }
          extra={
            <div>
              <FilterSelect defaultValue={dateRange1} onChange={setDateRange1} />
            </div>
          }
        >
          <Performance datas={statistics} />
          {/* <RatioPencent percent={70} />
          <div className="mt-9">
            <div className="flex items-center justify-between mb-6">
              <span className="text-secondary text-sm">
                <FormattedMessage id="mt.zongshouyilv" />
              </span>
              <span className="text-primary text-base font-semibold">0.00%</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-secondary text-sm">
                <FormattedMessage id="mt.daidanyingkui" />
                (USD)
              </span>
              <span className="text-green text-base font-semibold">+12.24</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-secondary text-sm">
                <FormattedMessage id="mt.gendanyonghuyingkui" />
                (USD)
              </span>
              <span className="text-green text-base font-semibold">+124</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-secondary text-sm">
                <FormattedMessage id="mt.huichelv" />
              </span>
              <span className="text-primary text-base font-semibold">12.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary text-sm">
                <FormattedMessage id="mt.pingjunmeibishouyilv" />
              </span>
              <span className="text-green text-base font-semibold">+2.3%</span>
            </div>
          </div> */}
        </ProCard>
        <ProCard
          bordered
          bodyStyle={{ height: 360 }}
          colSpan={{
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 7,
            xxl: 7
          }}
          title={
            <span className="text-primary text-xl font-semibold">
              <FormattedMessage id="mt.leijiyingkui" />
              (USD)
            </span>
          }
          extra={
            <div>
              <FilterSelect defaultValue={dateRange2} onChange={setDateRange2} />
            </div>
          }
          className="line-chart-wrapper"
        >
          {/* <LineChart /> */}
          <Cumulative
            earningRates={earningRates?.map((i) => ({
              date: i.date,
              value: i.earningRate
            }))}
            profitAmounts={profitAmounts?.map((i) => ({
              date: i.date,
              value: i.profitAmount
            }))}
          />
        </ProCard>
        <ProCard
          bordered
          bodyStyle={{ height: 360 }}
          colSpan={{
            xs: 24,
            sm: 24,
            md: 24,
            lg: 24,
            xl: 10,
            xxl: 10
          }}
          title={
            <span className="text-primary text-xl font-semibold">
              <FormattedMessage id="mt.jiaoyipianhao" />
            </span>
          }
          extra={
            <div>
              <FilterSelect defaultValue={dateRange3} onChange={setDateRange3} />
            </div>
          }
          className="pie-chart-wrapper"
        >
          <PieChart datas={symbolStatistics} />
        </ProCard>
      </ProCard>
    </ProCard>
  )
}
