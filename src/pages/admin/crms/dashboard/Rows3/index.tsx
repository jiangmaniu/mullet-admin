import { FormattedMessage, useRequest } from '@umijs/max'
import { useEffect, useMemo } from 'react'
import { gray } from 'tailwindcss/colors'

import Iconfont from '@/components/Base/Iconfont'
import { DEFAULT_PRECISION } from '@/constants'
import { getPlatformProfit } from '@/services/api/crmManage/client'
import { getFindStatAllMargin, getFindStatAllMoney } from '@/services/api/crmManage/trading'
import { sysPush } from '@/utils/navigator'

import { formatNum } from '../..'

const formatNumber = (value: number, { emphasis = true, suffix = '', precision = 2 }) => {
  return value === 0
    ? '‑‑'
    : (emphasis && value > 0 ? '+' : '') +
        formatNum(value, {
          precision
        }) +
        suffix
}

export default ({
  todayStatisticsData,
  monthDatas,
  _realToday,
  _today,
  yesterdayStatisticsData
}: {
  todayStatisticsData: CrmTrading.findCloseMoneyInfo
  monthDatas: CrmTrading.CRMMoneyByMonthInfo
  _realToday: string
  _today: string
  yesterdayStatisticsData: CrmTrading.findCloseMoneyInfo
}) => {
  // 查询汇总用户余额
  const { data: allMoneyData, run: runAllMoneyData } = useRequest(getFindStatAllMoney)
  // 汇总用户保证金
  const { data: allMarginData, run: runAllMarginData } = useRequest(getFindStatAllMargin)
  const { data: allProfitData, run: runAllProfitData } = useRequest(getPlatformProfit)

  useEffect(() => {
    if (_realToday !== _today) {
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
  }, [allMoneyData, _realToday, _today])

  useEffect(() => {
    if (_realToday !== _today) {
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
  }, [allMarginData, _realToday, _today])

  useEffect(() => {
    if (_realToday !== _today) {
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
  }, [allProfitData, _realToday, _today])

  // 平台净值 pingtaijingzhi 平台占用保证金 pingtaizhanyongbaozhengjin 平台浮动盈亏 pingtaifudongyingkui
  const rows3 = useMemo(() => {
    const {
      platformProfit: yesterdayTotalProfit,
      occupyOrderMargin: yesterdayTotalMargin,
      money: yesterdayTotalNetValue
    } = yesterdayStatisticsData

    // 如果查询当天，显示实时结果，否则显示 findCRMMoneyByDay 查出来的查询日期结算值
    // 实时 净值 = 实时余额 + 实时浮动盈亏， 接口：trading/findStatAllMoney + profit/count/platformProfit
    // 非当天： 净值 = 查询日期 余额 + 查询日期 浮动盈亏
    const newValue =
      _realToday === _today
        ? formatNum(Number(allMoneyData?.data ?? 0) + Number(allProfitData?.data ?? 0), { precision: DEFAULT_PRECISION })
        : formatNum(Number(todayStatisticsData?.money ?? 0) + Number(todayStatisticsData?.platformProfit ?? 0), {
            precision: DEFAULT_PRECISION
          })

    // 如果查询当天，显示实时结果，否则显示 findCRMMoneyByDay 查出来的查询日期结算值
    // 实时 占用保证金 = 实时 保证金， 接口：trading/findStatAllOrderMargin
    const orderMargin =
      _realToday === _today
        ? formatNum(allMarginData?.data ?? 0, { precision: DEFAULT_PRECISION })
        : formatNum(Number(todayStatisticsData?.occupyOrderMargin ?? 0), { precision: DEFAULT_PRECISION })

    // 如果查询当天，显示实时结果，否则显示 findCRMMoneyByDay 查出来的查询日期结算值
    // 实时 浮动盈亏 = 实时 浮动盈亏， 接口：tprofit/count/platformProfit
    const profit =
      _realToday === _today
        ? formatNum(allProfitData?.data ?? 0, { precision: DEFAULT_PRECISION })
        : formatNum(Number(todayStatisticsData?.platformProfit ?? 0), { precision: DEFAULT_PRECISION })

    // 今日浮动盈亏 = 实时统计盈亏（接口：tprofit/count/platformProfit） - 昨日统计浮动盈亏（取接口 statisticsDay 接口中当前查询的前一天的数据 platformProfit）
    const todayProfit = Number(allProfitData?.data ?? 0) - Number(yesterdayTotalProfit ?? 0)
    // 今日占用保证金 = 实时统计占用保证金（接口：trading/findStatAllOrderMargin） - 昨日统计占用保证金（取接口 statisticsDay 接口中当前查询的前一天的数据 occupyOrderMargin）
    const todayMargin = Number(allMarginData?.data ?? 0) - Number(yesterdayTotalMargin ?? 0)
    // 今日净值 = 实时统计净值（接口：trading/findStatAllMoney） + 实时统计浮动盈亏（接口：tprofit/count/platformProfit） - 昨日统计净值（取接口 statisticsDay 接口中当前查询的前一天的数据 money）
    const todayNetValue =
      Number(allMoneyData?.data ?? 0) + Number(allProfitData?.data ?? 0) - Number(yesterdayTotalNetValue ?? 0) + todayProfit

    /** 实时 净值 保证金 浮动盈亏 的 环比率， 只有选中当天的时候才会显示实时 */

    // 实时 浮动盈亏 的 环比率 = 今日浮动盈亏 / 昨日浮动盈亏 * 100
    const profitRate = (todayProfit / Number(yesterdayTotalProfit ?? 1)) * 100

    // 实时 占用保证金 的 环比率 = 今日占用保证金 / 昨日占用保证金 * 100
    const orderMarginRate = (todayMargin / Number(yesterdayTotalMargin ?? 1)) * 100

    // 实时 净值 的 环比率 = 今日净值 / 昨日净值 * 100
    const netValueRate = (todayNetValue / Number(yesterdayTotalNetValue ?? 1)) * 100

    return [
      {
        title: <FormattedMessage id="mt.pingtaijingzhi" />,
        value: newValue,
        jinri: {
          title: <FormattedMessage id="mt.jinri" />,
          value: _realToday === _today ? formatNumber(todayNetValue, { precision: 0 }) : undefined,
          rawRate: netValueRate,
          rate: formatNumber(Number.isNaN(netValueRate) ? 0 : netValueRate, { precision: 2, suffix: '%' })
        },
        benyue: {
          title: <FormattedMessage id="mt.benyue" />,
          value: formatNumber(Number(monthDatas?.netValue ?? 0), { precision: 0 }),
          rate: formatNumber(30, { precision: 0, suffix: '%' })
        }
      },
      {
        title: <FormattedMessage id="mt.pingtaizhanyongbaozhengjin" />,
        // 如果查询当天，显示实时结果，否则显示 findCRMMoneyByDay 查出来的查询日期结算值
        value: orderMargin,
        jinri: {
          title: <FormattedMessage id="mt.jinri" />,
          value: _realToday === _today ? formatNumber(todayMargin, { precision: 0 }) : undefined,
          rawRate: orderMarginRate,
          rate: formatNumber(Number.isNaN(orderMarginRate) ? 0 : orderMarginRate, {
            precision: 2,
            suffix: '%'
          })
        },
        benyue: {
          title: <FormattedMessage id="mt.benyue" />,
          value: formatNumber(Number(monthDatas?.orderMargin ?? 0), { precision: 0 }),
          rate: formatNumber(30, { precision: 0, suffix: '%' })
        }
      },
      {
        title: <FormattedMessage id="mt.pingtaifudongyingkui" />,
        value: profit,
        jinri: {
          title: <FormattedMessage id="mt.jinri" />,
          value: _realToday === _today ? formatNumber(todayProfit, { precision: 0 }) : undefined,
          rawRate: profitRate,
          rate: formatNumber(Number.isNaN(profitRate) ? 0 : profitRate, { precision: 2, suffix: '%' })
        },
        benyue: {
          title: <FormattedMessage id="mt.benyue" />,
          value: formatNumber(Number(monthDatas?.profit ?? 0), { precision: 0 }),
          rate: formatNumber(30, { precision: 0, suffix: '%' })
        },
        onClick: () => {
          sysPush(`/crms/position-order`)
        }
      }
    ]
  }, [todayStatisticsData, monthDatas, allMarginData, allProfitData, allMoneyData, _realToday, _today, yesterdayStatisticsData])

  return (
    <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {rows3.map((item, index) => (
        <div
          className={item.onClick ? 'dashboard-card !cursor-pointer' : 'dashboard-card !cursor-default'}
          key={index}
          onClick={item.onClick}
        >
          <div className=" pl-4 pr-[.9375rem] border-r border-gray-150 h-full items-center flex">
            <Iconfont name="shuju1" color={gray['900']} width={28} height={28} />
          </div>

          <div className=" flex flex-col px-5 pt-3 pb-2.5 flex-1 gap-1">
            <div className="flex flex-row justify-between items-center">
              <span className=" text-base font-semibold">{item.title}</span>
            </div>
            <span className=" text-[1.625rem] leading-[2.25rem] !font-dingpro-medium pt-0.5">{item.value}</span>
            {_realToday === _today && (
              <span className=" text-sm font-normal text-gray">
                {item.jinri.title} &nbsp;
                {item.jinri.value}
                &nbsp;
                <span className={item.jinri.rawRate > 0 ? 'text-green' : 'text-red'}>{item.jinri.rate}</span>
                &nbsp;&nbsp; &nbsp;&nbsp;
                {item.benyue.title} &nbsp;
                {item.benyue.value}
                &nbsp;
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
