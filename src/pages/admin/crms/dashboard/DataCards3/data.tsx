import { FormattedMessage, getIntl } from '@umijs/max'
import dayjs from 'dayjs'
import { sum } from 'lodash'

import { formatNum } from '../..'

const formatNumber = (value: number, { emphasis = true, suffix = '', precision = 2 }) => {
  return value === 0
    ? '0'
    : (emphasis && value > 0 ? '+' : '') +
        formatNum(value, {
          precision,
          isTruncateDecimal: true
        }) +
        suffix
}

export function getCardDatas3({
  // monthDatas,
  // lastMonthDatas,
  todayStatisticsData,
  statistics30,
  statisticsMonth,
  statisticsLastMonth,
  today,
  _today,
  _realToday,
  _startDay,
  firstDayOfMonth
}: {
  // monthDatas: CrmTrading.CRMMoneyByMonthInfo
  // lastMonthDatas: CrmTrading.CRMMoneyByMonthInfo
  todayStatisticsData: any
  statistics30: CrmTrading.findCloseMoneyInfo[]
  statisticsMonth: CrmTrading.findCloseMoneyInfo[]
  statisticsLastMonth: CrmTrading.findCloseMoneyInfo[]
  today: dayjs.Dayjs
  _today: string
  _realToday: string
  _startDay: string
  firstDayOfMonth: string
}) {
  const monthDatas = statisticsMonth.reduce(
    (acc, item) => {
      acc.profit += Number(item.profit) ?? 0
      acc.interestFees += Number(item.interestFees) ?? 0
      acc.handlingFees += Number(item.handlingFees) ?? 0
      return acc
    },
    {
      profit: 0,
      interestFees: 0,
      handlingFees: 0
    } as CrmTrading.findCloseMoneyInfo
  )

  const lastMonthDatas = statisticsLastMonth.reduce(
    (acc, item) => {
      acc.profit += Number(item.profit) ?? 0
      acc.interestFees += Number(item.interestFees) ?? 0
      acc.handlingFees += Number(item.handlingFees) ?? 0
      return acc
    },
    {
      profit: 0,
      interestFees: 0,
      handlingFees: 0
    } as CrmTrading.findCloseMoneyInfo
  )

  return [
    {
      showMom: _startDay === _today,
      icon: <img src={'/img/chujinzonge.svg'} width={40} height={40} />,
      label: <FormattedMessage id="mt.yishixinapingcangyingkui" />,
      value:
        _startDay === _today
          ? formatNumber(todayStatisticsData?.profit ?? 0, { precision: 2 })
          : formatNumber(sum(statistics30?.map((item) => Number(item.profit))) ?? 0, { precision: 2 }),
      desc: `${getIntl().formatMessage({ id: 'mt.benyueleiji' })}`,
      descNum: formatNumber(monthDatas.profit, { precision: 2 }),
      mom: monthDatas.profit && lastMonthDatas.profit ? ((monthDatas.profit - lastMonthDatas.profit) / lastMonthDatas.profit) * 100 : 0
    },
    {
      showMom: _startDay === _today,
      icon: <img src={'/img/chujinzonge.svg'} width={40} height={40} />,
      label: <FormattedMessage id="mt.geyelixi" />,
      value:
        _startDay === _today
          ? formatNum(todayStatisticsData?.interestFees ?? 0, { precision: 2 })
          : formatNum(sum(statistics30?.map((item) => Number(item.interestFees))) ?? 0, { precision: 2 }),
      desc: `${getIntl().formatMessage({ id: 'mt.benyueleiji' })}`,
      descNum: formatNum(monthDatas.interestFees, { precision: 2 }),
      mom:
        monthDatas.interestFees && lastMonthDatas.interestFees
          ? ((monthDatas.interestFees - lastMonthDatas.interestFees) / lastMonthDatas.interestFees) * 100
          : 0
    },
    {
      showMom: _startDay === _today,
      icon: <img src={'/img/chujinzonge.svg'} width={40} height={40} />,
      label: <FormattedMessage id="mt.shouxufei" />,
      value:
        _startDay === _today
          ? formatNum(todayStatisticsData?.handlingFees ?? 0, { precision: 2 })
          : formatNum(sum(statistics30?.map((item) => Number(item.handlingFees))) ?? 0, { precision: 2 }),
      desc: `${getIntl().formatMessage({ id: 'mt.benyueleiji' })}`,
      descNum: formatNum(monthDatas.handlingFees, { precision: 2 }),
      mom:
        monthDatas.handlingFees && lastMonthDatas.handlingFees
          ? ((monthDatas.handlingFees - lastMonthDatas.handlingFees) / lastMonthDatas.handlingFees) * 100
          : 0
    }
  ]
}
