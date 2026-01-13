import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { tradeFollowProfitStatistics, tradeFollowStatistics, tradeFollowSymbolStatistics } from '@/services/api/tradeFollow/lead'

export const useOverview = ({ id }: { id: string | undefined }) => {
  // 使用 dayjs 获取今天
  const endDatetime = dayjs()

  const [dateRange1, setDateRange1] = useState('14')
  /**
   * data:
   * averageProfitRate: 0,
   * earningRateTotal: 0,
   * followerProfit: 0,
   * leadProfit: 0,
   * retracementRate: 0,
   * winRate: 0
   */
  const { data: statistics, run: getStatistics } = useRequest(tradeFollowStatistics, {
    manual: true
  })

  const [dateRange2, setDateRange2] = useState('14')
  // data: {earningRates: [{ date: '05.01', earningRate: 1}...], profitAmounts: [{date: '05.01', profitAmount: 6}...]}
  const { data: profitStatistics, run: getProfitStatistics } = useRequest(tradeFollowProfitStatistics, {
    manual: true
  })

  // 交易偏好
  const [dateRange3, setDateRange3] = useState('14')
  // data: { tradeCount: 89, symbol: 'BTCUSDT', profit: 1234, rate: 88 }[]
  const { data: symbolStatistics, run: getSymbolStatistics } = useRequest(tradeFollowSymbolStatistics, {
    manual: true
  })

  useEffect(() => {
    // 带单表现
    getStatistics({
      id: String(id),
      // startDatetime = endDatetime 日期减去 dateRange1 天
      startDatetime: endDatetime.subtract(Number(dateRange1), 'day').format('YYYY-MM-DD 00:00:00'),
      endDatetime: endDatetime.format('YYYY-MM-DD 23:59:59')
    })
  }, [id, dateRange1])

  useEffect(() => {
    // 累计盈亏
    getProfitStatistics({
      id: String(id),
      // startDatetime = endDatetime 日期减去 dateRange2 天
      startDatetime: endDatetime.subtract(Number(dateRange2), 'day').format('YYYY-MM-DD 00:00:00'),
      endDatetime: endDatetime.format('YYYY-MM-DD 23:59:59')
    })
  }, [id, dateRange2])

  useEffect(() => {
    // 交易偏好
    getSymbolStatistics({
      id: String(id),
      // startDatetime = endDatetime 日期减去 dateRange3 天
      startDatetime: endDatetime.subtract(Number(dateRange3), 'day').format('YYYY-MM-DD 00:00:00'),
      endDatetime: endDatetime.format('YYYY-MM-DD 23:59:59')
    })
  }, [id, dateRange3])

  return {
    statistics: statistics?.data || {},
    profitStatistics: profitStatistics?.data || { earningRates: [], profitAmounts: [] },
    symbolStatistics: symbolStatistics?.data || [],
    dateRange1,
    setDateRange1,
    dateRange2,
    setDateRange2,
    dateRange3,
    setDateRange3
  }
}
