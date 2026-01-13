import { ProCard, ProFormSelect } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'

export default function StatisticCard() {
  const cardList = [
    {
      title: <FormattedMessage id="mt.jinrirujinzonge" />,
      value: '6,934',
      unit: 'USD',
      icon: '/img/dashboard-1.png'
    },
    {
      title: <FormattedMessage id="mt.dingdanshu" />,
      value: '122',
      unit: <FormattedMessage id="mt.dan" />,
      icon: '/img/dashboard-5.png'
    },
    {
      title: <FormattedMessage id="mt.chenggongrujindanshu" />,
      value: '41,212',
      unit: <FormattedMessage id="mt.dan" />,
      icon: '/img/dashboard-3.png'
    },
    {
      title: <FormattedMessage id="mt.zhifubao" />,
      value: '8,965,523',
      unit: 'USD',
      icon: '/img/dashboard-6.png'
    },
    {
      title: <FormattedMessage id="mt.weixin" />,
      value: '8,523',
      unit: 'USD',
      icon: '/img/dashboard-7.png'
    }
  ]
  return (
    <ProCard
      title={
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
          colSpan={{ xs: '100%', sm: '100%', md: '50%', lg: '30%', xl: '30%', xxl: '20%' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-start flex-col">
              <div className="text-primary text-sm">{item.title}</div>
              <div className="text-primary !font-dingpro-medium text-[30px] py-2">{item.value}</div>
              <div className="text-secondary text-xs">{item.title}</div>
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
