import { FormattedMessage, useRequest } from '@umijs/max'
import { sum } from 'lodash'
import { useEffect, useMemo } from 'react'

import { getPlatformProfit } from '@/services/api/crmManage/client'
import { getFindStatAllMargin, getFindStatAllMoney } from '@/services/api/crmManage/trading'
import { sysPush } from '@/utils/navigator'

import { formatNum } from '../..'
import DataCard from '../DataCard'

const formatNumber = (value: number, { emphasis = true, suffix = '', precision = 2 }) => {
  return value === 0
    ? '0'
    : (emphasis && value > 0 ? '+' : '') +
        formatNum(value, {
          precision
        }) +
        suffix
}

export default ({
  todayStatisticsData,
  statistics30,
  statisticsMonth,
  statisticsLastMonth,
  // monthDatas,
  // lastMonthDatas,
  _realToday,
  _today,
  _startDay,
  yesterdayStatisticsData
}: {
  todayStatisticsData: CrmTrading.findCloseMoneyInfo
  statistics30: CrmTrading.findCloseMoneyInfo[]
  statisticsMonth: CrmTrading.findCloseMoneyInfo[]
  statisticsLastMonth: CrmTrading.findCloseMoneyInfo[]
  _realToday: string
  _today: string
  _startDay: string
  yesterdayStatisticsData: CrmTrading.findCloseMoneyInfo
}) => {
  // 查询汇总用户余额
  const { data: allMoneyData, run: runAllMoneyData } = useRequest(getFindStatAllMoney)
  // 汇总用户保证金
  const { data: allMarginData, run: runAllMarginData } = useRequest(getFindStatAllMargin)
  const { data: allProfitData, run: runAllProfitData } = useRequest(getPlatformProfit)

  useEffect(() => {
    if (_startDay !== _today) {
      // 如果查询日期不是当天，则不定时刷新
      return
    }
    if (allMoneyData?.success) {
      const timer = setTimeout(() => {
        // 余额 十秒 更新一次
        runAllMoneyData()
      }, 10000)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        // 余额 十秒 更新一次
        runAllMoneyData()
      }, 20000)
      return () => clearTimeout(timer)
    }
  }, [allMoneyData, _startDay, _today])

  useEffect(() => {
    if (_startDay !== _today) {
      // 如果查询日期不是当天，则不定时刷新
      return
    }
    if (allMarginData?.success) {
      const timer = setTimeout(() => {
        // 保证金 十秒 更新一次
        runAllMarginData()
      }, 10000)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        // 保证金 十秒 更新一次
        runAllMarginData()
      }, 20000)
      return () => clearTimeout(timer)
    }
  }, [allMarginData, _startDay, _today])

  useEffect(() => {
    if (_startDay !== _today) {
      // 如果查询日期不是当天，则不定时刷新
      return
    }

    if (allProfitData?.success) {
      const timer = setTimeout(() => {
        runAllProfitData()
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        runAllProfitData()
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [allProfitData, _startDay, _today])

  const monthDatas = statisticsMonth.reduce(
    (acc, item) => {
      acc.netValue += Number(item.netValue) ?? 0
      acc.platformProfit += Number(item.platformProfit) ?? 0
      acc.occupyOrderMargin += Number(item.occupyOrderMargin) ?? 0
      return acc
    },
    {
      netValue: 0,
      platformProfit: 0,
      occupyOrderMargin: 0
    } as CrmTrading.findCloseMoneyInfo
  )

  const lastMonthDatas = statisticsLastMonth.reduce(
    (acc, item) => {
      acc.netValue += Number(item.netValue) ?? 0
      acc.platformProfit += Number(item.platformProfit) ?? 0
      acc.occupyOrderMargin += Number(item.occupyOrderMargin) ?? 0
      return acc
    },
    {
      netValue: 0,
      platformProfit: 0,
      occupyOrderMargin: 0
    } as CrmTrading.findCloseMoneyInfo
  )

  // 平台净值 pingtaijingzhi 平台占用保证金 pingtaizhanyongbaozhengjin 平台浮动盈亏 pingtaifudongyingkui
  const rows3 = useMemo(() => {
    // const {
    //   platformProfit: yesterdayTotalProfit,
    //   occupyOrderMargin: yesterdayTotalMargin,
    //   netValue: yesterdayTotalNetValue
    // } = yesterdayStatisticsData

    // 今日浮动盈亏 = 实时统计盈亏（接口：tprofit/count/platformProfit）
    const todayProfit = Number(allProfitData?.data ?? 0)
    // 今日占用保证金 = 实时统计占用保证金（接口：trading/findStatAllOrderMargin）
    const todayMargin = Number(allMarginData?.data ?? 0)
    // 实时净值 = 汇总用户余额（接口：trading/findStatAllMoney） + 平台浮动盈亏（接口：tprofit/count/platformProfit）
    const todayNetValue = Number(allMoneyData?.data ?? 0) + Number(allProfitData?.data ?? 0)

    const otherDayProfit = todayStatisticsData.platformProfit
    const otherDayMargin = todayStatisticsData.occupyOrderMargin
    const otherDayNetValue = todayStatisticsData.netValue

    return [
      {
        showMom: _startDay === _today,
        label: <FormattedMessage id="mt.pingtaijingzhi" />,

        // _realToday === _today 不是当天的数据不实时浮动
        value:
          _realToday === _today && _startDay === _today
            ? formatNum(todayNetValue, { precision: 2 })
            : _startDay === _today
            ? formatNum(otherDayNetValue, { precision: 2 })
            : formatNum(sum(statistics30?.map((item) => Number(item.netValue))) ?? 0, { precision: 2 }),
        desc: <FormattedMessage id="mt.shangyueleiji" />,
        descNum: formatNum(Number(lastMonthDatas?.netValue ?? 0), { precision: 2 }),
        mom:
          monthDatas.netValue && lastMonthDatas.netValue
            ? ((monthDatas.netValue - lastMonthDatas.netValue) / lastMonthDatas.netValue) * 100
            : 0
      },
      {
        showMom: _startDay === _today,
        label: <FormattedMessage id="mt.pingtaifudongyingkui" />,
        // _realToday === _today 不是当天的数据不实时浮动
        value:
          _realToday === _today && _startDay === _today
            ? formatNumber(todayProfit, { precision: 2 })
            : _startDay === _today
            ? formatNumber(otherDayProfit, { precision: 2 })
            : formatNumber(sum(statistics30?.map((item) => Number(item.platformProfit))) ?? 0, { precision: 2 }),
        desc: <FormattedMessage id="mt.shangyueleiji" />,
        descNum: formatNumber(Number(lastMonthDatas?.platformProfit ?? 0), { precision: 2 }),
        mom:
          monthDatas.platformProfit && lastMonthDatas.platformProfit
            ? ((monthDatas.platformProfit - lastMonthDatas.platformProfit) / lastMonthDatas.platformProfit) * 100
            : 0,

        onClick: () => {
          sysPush(`/crms/position-order`)
        }
      },
      {
        showMom: _startDay === _today,
        label: <FormattedMessage id="mt.pingtaizhanyongbaozhengjin" />,

        // _realToday === _today 不是当天的数据不实时浮动
        value:
          _realToday === _today && _startDay === _today
            ? formatNum(todayMargin, { precision: 2 })
            : _startDay === _today
            ? formatNum(otherDayMargin, { precision: 2 })
            : formatNum(sum(statistics30?.map((item) => Number(item.occupyOrderMargin))) ?? 0, { precision: 2 }),
        desc: <FormattedMessage id="mt.shangyueleiji" />,
        descNum: formatNum(Number(lastMonthDatas?.occupyOrderMargin ?? 0), { precision: 2 }),
        mom:
          monthDatas.occupyOrderMargin && lastMonthDatas.occupyOrderMargin
            ? ((monthDatas.occupyOrderMargin - lastMonthDatas.occupyOrderMargin) / lastMonthDatas.occupyOrderMargin) * 100
            : 0
      }
    ]
  }, [todayStatisticsData, monthDatas, allMarginData, allProfitData, allMoneyData, _startDay, _today, yesterdayStatisticsData])

  return (
    <>
      {rows3.map((item, index) => (
        <DataCard key={index} item={item} />
      ))}
    </>
  )
}
