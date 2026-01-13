import { ProCard, ProFormSelect } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'

import { getEnum } from '@/constants/enum'

export default function StatisticCard() {
  const cardList = [
    {
      title: <FormattedMessage id="mt.zongrujinjine" />,
      value: '6,934',
      unit: 'USD',
      icon: '/img/dashboard-1.png'
    },
    {
      title: <FormattedMessage id="mt.zongchujinjine" />,
      value: '122',
      unit: <FormattedMessage id="mt.shoushu" />,
      icon: '/img/dashboard-2.png'
    },
    {
      title: <FormattedMessage id="mt.jiaoyizongshousu" />,
      value: '41,212',
      unit: <FormattedMessage id="mt.shoushu" />,
      icon: '/img/dashboard-3.png'
    },
    {
      title: <FormattedMessage id="mt.zongyingkuijine" />,
      value: '8,965,523',
      unit: 'USD',
      icon: '/img/dashboard-4.png'
    }
  ]
  return (
    <ProCard
      title={
        <div className="ml-2">
          <ProFormSelect
            options={getEnum().enumToOptions('DashbaordTimeType')}
            width={150}
            fieldProps={{ value: '1' }}
            allowClear={false}
          />
        </div>
      }
      headStyle={{ paddingBottom: 6, paddingTop: 0 }}
      gutter={[20, 20]}
      wrap
      ghost
    >
      {cardList.map((item, idx) => (
        <ProCard
          key={idx}
          bordered
          style={{
            height: 130,
            background: 'linear-gradient(180deg, #EEFDFF 0%, #FFFFFF 100%)',
            overflow: 'hidden'
          }}
          colSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-start flex-col">
              <div className="text-primary text-sm">{item.title}</div>
              <div className="text-primary !font-dingpro-medium text-[30px] py-2">{item.value}</div>
              <div className="text-secondary text-xs">{item.unit}</div>
            </div>
            <div>
              <img src={item.icon} width={74} height={74} />
            </div>
          </div>
        </ProCard>
      ))}
    </ProCard>
  )
}
