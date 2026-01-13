import dayjs from 'dayjs'

import DataCard, { DataCardItem } from '../DataCard'
import { getCardDatas } from './data'

export default function DataStatisticCard({
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
  const items: DataCardItem[] = getCardDatas({
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
  })

  return (
    <>
      {items.map((item, idx) => (
        <DataCard key={idx} item={item} />
      ))}
    </>
  )
}
