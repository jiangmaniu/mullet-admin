import { ProCard } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import { observer } from 'mobx-react'

import StatisticCard from '@/components/Admin/StatisticCard'
import { getEnum } from '@/constants/enum'
import { formatNum } from '@/utils'
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
            label: <FormattedMessage id="mt.qingqiujiage" />,
            value: info?.limitPrice ? formatNum(info.limitPrice) : <FormattedMessage id="mt.shijia" />,
            noFormatValue: true
          },
          {
            label: <FormattedMessage id="mt.xiugaijiage" />,
            value: info.tradePrice
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
            label: <FormattedMessage id="mt.dingdanleixing" />,
            value: getEnum().Enum.OrderType[info.type!]?.text,
            noFormatValue: true
          },
          {
            label: <FormattedMessage id="mt.dingdanzhuangtai" />,
            value: getEnum().Enum.OrderStatus[info.status!]?.text,
            noFormatValue: true
          },
          {
            label: <FormattedMessage id="mt.yuanyin" />,
            value: getEnum().Enum.OrderCreateReason[info.createReason!]?.text,
            noFormatValue: true
          },
          {
            renderItem: () => ''
          }
        ]}
      />
    </ProCard>
  )
}

export default observer(SymbolCard)
