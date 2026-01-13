import { ProCard, ProFormSelect } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'

import PageContainer from '@/components/Admin/PageContainer'

import PieChart from './comp/PieChart'
import Report from './comp/Report'
import StatisticCard from './comp/StatisticCard'

type Params = API.PageParams

export default function Dashboard() {
  return (
    <PageContainer icon="/img/emoji/18.png" pageBgColorMode="gray">
      <ProCard direction="column" bodyStyle={{ padding: 20 }}>
        <StatisticCard />
        <ProCard gutter={[20, 20]} ghost wrap>
          <ProCard
            bodyStyle={{ overflow: 'hidden', height: 546 }}
            title={<FormattedMessage id="mt.huobibaobiao" />}
            bordered
            colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 10, xxl: 12 }}
          >
            <Report />
          </ProCard>
          <ProCard
            colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 14, xxl: 12 }}
            layout="center"
            bodyStyle={{ height: 540 }}
            title={<FormattedMessage id="mt.jiaoyipinzhongxinxi" />}
            bordered
            extra={
              <div className="ml-2">
                <ProFormSelect
                  options={[
                    { label: '全部', value: 'all' },
                    { label: <FormattedMessage id="mt.zhanshiqitianneishuju" />, value: '7' }
                  ]}
                  width={150}
                  fieldProps={{ value: '7' }}
                  allowClear={false}
                />
              </div>
            }
          >
            <PieChart />
          </ProCard>
        </ProCard>
      </ProCard>
    </PageContainer>
  )
}
