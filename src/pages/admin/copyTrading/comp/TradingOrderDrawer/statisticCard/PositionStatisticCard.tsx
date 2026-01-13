import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import { observer } from 'mobx-react'

import StatisticCard from '@/components/Admin/StatisticCard'
import { getEnum } from '@/constants/enum'
import { green, red } from '@/theme/theme.config'
import { getCurrentQuote } from '@/utils/wsUtil'

import { OrderInfo } from '..'

type IProps = {
  info: OrderInfo
}

function SymbolCard({ info, ...res }: IProps) {
  const quote = getCurrentQuote(info.symbol)
  return (
    <ProCard direction="column" bordered={true} ghost layout="center" {...res}>
      <StatisticCard
        subCardProps={{ style: { width: 'auto', height: 66 }, ghost: false }}
        cardProps={{ bordered: false, bodyStyle: { overflowX: 'initial' } }}
        needFormatValue
        items={[
          {
            label: <FormattedMessage id="mt.kaicangjiage" />,
            value: info.startPrice
          },
          {
            label: <FormattedMessage id="mt.jiaoyiliang" />,
            value: info.orderVolume
          },
          {
            label: <FormattedMessage id="mt.zhiying" />,
            value: info.takeProfit
          },
          {
            label: <FormattedMessage id="mt.zhisun" />,
            value: info.stopLoss
          }
        ]}
      />
      <StatisticCard
        subCardProps={{ style: { width: 'auto', height: 66 }, ghost: false }}
        cardProps={{ bordered: false, bodyStyle: { overflowX: 'initial' } }}
        needFormatValue
        items={[
          {
            label: <FormattedMessage id="common.status" />,
            value: getEnum().Enum.BGAStatus[info.status!]?.text,
            noFormatValue: true
          },
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

export default observer(SymbolCard)
