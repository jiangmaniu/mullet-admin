import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage, useSearchParams } from '@umijs/max'
import { useEffect, useState } from 'react'

import ProFormSegmented from '@/components/Admin/Form/ProFormSegmented'
import PageContainer from '@/components/Admin/PageContainer'
import StatisticCard from '@/components/Admin/StatisticCard'
import Hidden from '@/components/Base/Hidden'
import { green, red } from '@/theme/theme.config'
import { push } from '@/utils/navigator'

import CurrentCopyTrading from '../../comp/CurrentTakeOrder'
import HistoryCopyTrading from '../../comp/HistoryTakeOrder'
import currentCopyTrading from './currentCopyTrading'
import historyCopyTrading from './historyCopyTrading'

export default function Detail() {
  const [tabKey, setTabKey] = useState<any>('CURRENT')

  const [searchParams] = useSearchParams()
  const key = searchParams.get('key')

  const options = [
    {
      label: <FormattedMessage id="mt.dangqiangendan" />,
      value: 'CURRENT',
      component: <CurrentCopyTrading {...currentCopyTrading()} />,
      disabled: !!key
    },
    { label: <FormattedMessage id="mt.lishigendan" />, value: 'HISTORY', component: <HistoryCopyTrading {...historyCopyTrading()} /> }
  ]

  useEffect(() => {
    if (key) {
      setTabKey(key.toUpperCase())
    }
  }, [key])

  return (
    <PageContainer
      icon="/img/emoji/22.png"
      pageBgColorMode="gray"
      pageTitle={<span>D598 必胜100 #5000005</span>}
      showBack
      onBack={() => {
        push('/copy-trading/list')
      }}
    >
      <div className="mb-4">
        <ProFormSegmented
          request={async () => options}
          width={240}
          fieldProps={{
            block: true,
            value: tabKey,
            onChange: (value) => {
              setTabKey(value)
            }
          }}
        />
      </div>
      <ProCard>
        <div className="mb-6">
          <div className="text-primary text-xl font-semibold mb-4">
            <FormattedMessage id="mt.gendangailan" />
          </div>
          <StatisticCard
            items={[
              { label: <FormattedMessage id="mt.symbol" />, value: 'BTCUSDT' },
              { label: <FormattedMessage id="mt.ganggan" />, value: 'X10' },
              { label: <FormattedMessage id="mt.fangxiang" />, value: '买入', valueStyle: { color: true ? red['700'] : green['700'] } },
              { label: <FormattedMessage id="mt.shuliang" />, value: '122' },
              { label: <FormattedMessage id="mt.dingdanhao" />, value: '1241212' },
              { label: <FormattedMessage id="mt.leixing" />, value: '跟单' },
              { label: <FormattedMessage id="mt.kaicangjia" />, value: '1000.00' },
              tabKey === 'CURRENT'
                ? // @TODO 标记价 当前实时价格
                  { label: <FormattedMessage id="mt.biaojijia" />, value: '1000.00' }
                : { label: <FormattedMessage id="mt.qingqiujia" />, value: '1000.00' },
              { label: <FormattedMessage id="mt.yufukuan" />, value: '1000.00' },
              { label: <FormattedMessage id="mt.shouyilv" />, value: '20%', valueStyle: { color: true ? red['700'] : green['700'] } },
              { label: <FormattedMessage id="mt.shijian" />, value: '2024/9/22 18:00:22' }
            ]}
            labeStyle={{ fontSize: 12 }}
            height={72}
          />
        </div>
        {options.map((item, idx) => {
          return (
            <Hidden show={item.value === tabKey} key={idx}>
              {item.component}
            </Hidden>
          )
        })}
      </ProCard>
    </PageContainer>
  )
}
