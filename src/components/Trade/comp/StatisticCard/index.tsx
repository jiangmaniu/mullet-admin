import { FormattedMessage } from '@umijs/max'
import { observer } from 'mobx-react'

import StatisticCardComp from '@/components/Admin/StatisticCard'
import { useStores } from '@/context/mobxProvider'

import AccountBalance from './AccountBalance'
import AvailableMargin from './AvailableMargin'
import OccupyMargin from './OccupyMargin'
import TotalProfit from './TotalProfit'

type IProps = {
  initialValues?: Account.AccountPageListItem
}

// 账户统计信息
function StatisticCard({ initialValues }: IProps) {
  const { trade } = useStores()
  const currencyDecimal = initialValues?.currencyDecimal

  return (
    <StatisticCardComp
      subCardProps={{ style: { width: 'auto', height: 60 }, ghost: false }}
      cardProps={{ bordered: true, bodyStyle: { overflowX: 'initial' } }}
      needFormatValue
      precision={currencyDecimal}
      items={[
        {
          label: <FormattedMessage id="mt.jiaoyizhanghao" />,
          value: initialValues?.id,
          noFormatValue: true
        },
        {
          label: (
            <div>
              <FormattedMessage id="mt.zhanghuyue" /> USD
            </div>
          ),
          value: initialValues?.money
        },
        {
          label: (
            <div>
              <FormattedMessage id="mt.keyong" /> USD
            </div>
          ),
          value: <AvailableMargin />,
          noFormatValue: true
        },
        {
          label: (
            <div>
              <FormattedMessage id="mt.zanyong" /> USD
            </div>
          ),
          value: <OccupyMargin />,
          noFormatValue: true
        },
        {
          label: (
            <div>
              <FormattedMessage id="mt.jingzhi" /> USD
            </div>
          ),
          value: <AccountBalance />,
          noFormatValue: true
        },
        {
          label: (
            <div>
              <FormattedMessage id="mt.fudongyingkui" /> USD
            </div>
          ),
          value: <TotalProfit />,
          noFormatValue: true
        }
        // {
        //   label: (
        //     <div>
        //       <FormattedMessage id="mt.lishizongyingkui" /> USD
        //     </div>
        //   ),
        //   value: initialValues?.totalProfit
        // }
        // {
        //   label: (
        //     <div>
        //       <FormattedMessage id="mt.baozhengjinlv" /> %
        //     </div>
        //   ),
        //   value: 0
        // }
      ]}
    />
  )
}

export default observer(StatisticCard)
