import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'

import StatisticCard from '@/components/Admin/StatisticCard'
import { green, red } from '@/theme/theme.config'

import { OrderInfo } from '..'

type IProps = {
  info: OrderInfo
}

export default function SymbolCard({ info, ...res }: IProps) {
  return (
    <ProCard direction="column" bordered={true} ghost layout="center" {...res}>
      <StatisticCard
        subCardProps={{ style: { width: 'auto', height: 66 }, ghost: false }}
        cardProps={{ bordered: false, bodyStyle: { overflowX: 'initial' } }}
        needFormatValue
        items={[
          {
            label: <FormattedMessage id="mt.qingqiujiage" />,
            value: info.startPrice
          },
          {
            label: <FormattedMessage id="mt.chengjiaojia" />,
            value: info.tradePrice
          },
          {
            label: <FormattedMessage id="mt.jiaoyiliang" />,
            value: info.tradingVolume
          }
        ]}
      />
      <StatisticCard
        subCardProps={{ style: { width: 'auto', height: 66 }, ghost: false }}
        cardProps={{ bordered: false, bodyStyle: { overflowX: 'initial' } }}
        needFormatValue
        items={[
          {
            label: <FormattedMessage id="mt.shouxufei" />,
            value: info.handlingFees
          },
          {
            label: <FormattedMessage id="mt.kucunfei" />,
            value: info.interestFees
          },
          {
            label: <FormattedMessage id="mt.yingkui" />,
            value: info.profit,
            valueColor: Number(info.profit) > 0 ? green['700'] : red['600']
          }
        ]}
      />
    </ProCard>
  )
}
