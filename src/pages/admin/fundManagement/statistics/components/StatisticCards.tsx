import './StatisticCards.less'

import { useIntl } from '@umijs/max'
import classNames from 'classnames'

import { formatNum } from '@/utils'

interface StatisticCardData {
  title: string
  value: number
  unit: string
  change: number | null
  changeType: 'up' | 'down' | 'unchanged'
}

interface StatisticCardsProps {
  data: {
    todayDeposit: StatisticCardData
    todayWithdrawal: StatisticCardData
    totalDeposit: StatisticCardData
    totalWithdrawal: StatisticCardData
  }
}

const StatisticCard = ({ cardData }: { cardData: StatisticCardData }) => {
  const intl = useIntl()
  const isUp = cardData.changeType === 'up'
  const hasChange = cardData.change !== null && cardData.changeType !== 'unchanged'

  return (
    <div className="statistic-card-wrapper">
      <div className="statistic-card-content">
        <div className="card-header">
          <div className="card-title">{cardData.title}</div>
        </div>
        <div className="card-value">{formatNum(cardData.value, { precision: 2, unit: cardData.unit })}</div>
        <div className="card-change">
          <span className="change-label">{intl.formatMessage({ id: 'fundManagement.statistics.comparedToPreviousPeriod' })}</span>{' '}
          {/* 較上一個週期 */}
          {hasChange ? (
            <span className={classNames('change-badge', isUp ? 'change-up' : 'change-down')}>
              <div className={classNames('change-arrow', isUp ? 'arrow-up' : 'arrow-down')} />
              <span>{formatNum(cardData.change, { precision: 2, unit: '%' })}</span>
            </span>
          ) : (
            <span className="change-badge change-unchanged">--</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function StatisticCards({ data }: StatisticCardsProps) {
  return (
    <div className="statistic-cards-container">
      <StatisticCard cardData={data.todayDeposit} />
      <StatisticCard cardData={data.todayWithdrawal} />
      <StatisticCard cardData={data.totalDeposit} />
      <StatisticCard cardData={data.totalWithdrawal} />
    </div>
  )
}
