import './index.less'

import { ProCard, ProFormDatePicker } from '@ant-design/pro-components'
import { FormattedMessage, getLocale, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import DataStatisticCard from '@/components/Admin/DataStatisticCard'
import Iconfont from '@/components/Base/Iconfont'
import { DEFAULT_PRECISION } from '@/constants'
import { getPlatformProfit } from '@/services/api/crmManage/client'
import {
  getFindCloseMoney,
  getFindCRMMoneyByDay,
  getFindCRMMoneyByMonth,
  getFindCrmMoneyLine,
  getFindCrmTradingLine,
  getFindGMVByMonth,
  getFindStatAllMargin,
  getFindStatAllMoney,
  getTradingMoneyPosition,
  getTradingStatisticsDay
} from '@/services/api/crmManage/trading'
import { gray } from '@/theme/theme.config'
import { formatNum } from '@/utils'
import { push, sysPush } from '@/utils/navigator'

import DashboardCardBody from './DashboardCardBody'
import DatasLine from './DatasLine'
import SettlementAmount from './SettlementAmount'
import TransactionVolume from './TransactionVolume'

const formatNumber = (value: number, { emphasis = true, suffix = '', precision = 2 }) => {
  return value === 0
    ? '‑‑'
    : (emphasis && value > 0 ? '+' : '') +
        formatNum(value, {
          precision
        }) +
        suffix
}

export default function Dashboard() {
  const intl = useIntl()

  const locale = getLocale()

  const realToday = dayjs()
  const _realToday = useMemo(() => realToday.format('YYYY-MM-DD'), [realToday])
  const [today, setToday] = useState(dayjs()) // 默认使用 dayjs 获取今天
  const _today = useMemo(() => today.format('YYYY-MM-DD'), [today])

  const yesterday = useMemo(() => today.subtract(1, 'day'), [today]) // 昨天
  // 当月第一天
  const firstDayOfMonth = useMemo(() => today.startOf('month').format('YYYY-MM-DD'), [today])

  const lastMonth = useMemo(() => today.subtract(1, 'month').format('YYYY-MM'), [today]) // 获取上个月的“YYYY-MM”
  const days = useMemo(() => today.diff(today.startOf('month'), 'days') + 1, [today]) // 计算本月 1 日距离今天有多少天

  const [dayDatas, setDayDatas] = useState<CrmTrading.CRMMoneyByMonthInfo>() // 今日数据
  const [yesterdayDatas, setYesterdayDatas] = useState<CrmTrading.CRMMoneyByMonthInfo>() // 昨日数据
  const [monthDatas, setMonthDatas] = useState<CrmTrading.CRMMoneyByMonthInfo>({}) // 今月数据
  const [lastMonthDatas, setLastMonthDatas] = useState<CrmTrading.CRMMoneyByMonthInfo>({}) // 上个月

  // const [dayTransVol, setDayTransVol] = useState<CrmTrading.GMVInfo[]>([]) // 今日交易额
  const [monthTransVol, setMonthTransVol] = useState<CrmTrading.GMVInfo[]>([]) // 今月交易额

  // 结算资金
  const [settlementAmount, setSettlementAmount] = useState<CrmTrading.findCloseMoneyInfo[]>()

  // 查询当天 CRM 资金统计
  const getFindCRMMoneyByDayParams = useMemo(
    () =>
      ({
        startTime: today.format('YYYY-MM-DD'),
        endTime: today.format('YYYY-MM-DD')
      } as API.SearchTimeParams),
    [today]
  )
  useRequest(() => getFindCRMMoneyByDay(getFindCRMMoneyByDayParams), {
    onSuccess(data, params) {
      if (data.success)
        setDayDatas({
          // ...dayDatas,
          ...(data.data ?? {})
        })
    },
    refreshDeps: [getFindCRMMoneyByDayParams]
  })

  // 查询昨日 CRM 资金统计
  const getFindCRMMoneyByDayParams2 = useMemo(
    () =>
      ({
        startTime: yesterday.format('YYYY-MM-DD'),
        endTime: yesterday.format('YYYY-MM-DD')
      } as API.SearchTimeParams),
    [yesterday]
  )
  useRequest(() => getFindCRMMoneyByDay(getFindCRMMoneyByDayParams2), {
    onSuccess(data, params) {
      if (data.success)
        setYesterdayDatas({
          // ...dayDatas,
          ...(data.data ?? {})
        })
    },
    refreshDeps: [getFindCRMMoneyByDayParams2]
  })

  // 查询当月 CRM 资金统计
  useRequest(getFindCRMMoneyByMonth, {
    onSuccess(data, params) {
      if (data.success)
        setMonthDatas({
          // ...monthDatas,
          ...(data.data ?? {})
        })
    }
  })

  // 查询当天 平台交易额
  // useRequest(getFindGMVByDay, {
  //   onSuccess(data, params) {
  //     if (data.success)
  //       // setDayDatas({
  //       //   // ...dayDatas,
  //       //   // 交易额 transaction volume
  //       //   transVol: data.data ?? []
  //       // })
  //       setDayTransVol(data.data ?? [])
  //   }
  // })

  // 查询当月平台交易额
  useRequest(getFindGMVByMonth, {
    onSuccess(data, params) {
      if (data.success) setMonthTransVol(data.data ?? [])
      // setMonthDatas({
      //   // ...monthDatas,
      //   // 交易额 transaction volume
      //   transVol: data.data ?? []
      // })
    }
  })

  const [current, setCurrent] = useState(1)
  const [size, setSize] = useState(6)

  const getFindCloseMoneyParams = useMemo(
    () =>
      ({
        current,
        size: 7, // 只展示最后七天
        startTime: today.format('YYYY-MM-DD')
      } as { startTime: string } & API.PageParam),
    [current, days, today]
  )
  useRequest(() => getFindCloseMoney(getFindCloseMoneyParams), {
    onSuccess(data, params) {
      if (data.success) {
        setSettlementAmount(
          data.data?.map(
            (i) =>
              // 预处理
              ({
                ...i,
                handlingFees: Number(i?.handlingFees).toFixed(2),
                interestFees: Number(i?.interestFees).toFixed(2),
                profit: Number(i?.profit).toFixed(2)
              } as unknown as CrmTrading.findCloseMoneyInfo)
          ) ?? []
        )
      }
    },
    refreshDeps: [getFindCloseMoneyParams]
  })

  /** 关键指标趋势图 */
  const [moneyLineInfo, setMoneyLineInfo] = useState<CrmTrading.findCrmMoneyLineInfo[] | undefined>([])
  const getFindCrmMoneyLineParams = useMemo(
    () =>
      ({
        size: 7,
        startTime: today.format('YYYY-MM-DD')
      } as {
        size: number
        startTime: string
      }),
    [today]
  )
  useRequest(() => getFindCrmMoneyLine(getFindCrmMoneyLineParams), {
    onSuccess(data, params) {
      if (data.success) {
        if (data.data) {
          setMoneyLineInfo(data.data.reverse())
        }
      }
    },
    refreshDeps: [getFindCrmMoneyLineParams]
  })

  const [tradingLineInfo, setTradingLineInfo] = useState<CrmTrading.findCrmTradingLineInfo[] | undefined>([])
  const getFindCrmTradingLineParams = useMemo(
    () =>
      ({
        size: 7,
        startTime: today.format('YYYY-MM-DD')
      } as {
        size: number
        startTime: string
      }),
    [today]
  )
  useRequest(() => getFindCrmTradingLine(getFindCrmTradingLineParams), {
    onSuccess(data, params) {
      if (data.success) {
        if (data.data) {
          setTradingLineInfo(data.data.reverse())
        }
      }
    },
    refreshDeps: [getFindCrmTradingLineParams]
  })

  // 头寸 & 浮动盈亏 & 净值
  const [tradingLineInfo2, setTradingLineInfo2] = useState<CrmTrading.StatisticsDayItem[] | undefined>([])
  const getTradingStatisticsDayParams = useMemo(
    () =>
      ({
        type: 10,
        // current: 1,
        // size: 7,
        startTime: today.subtract(8, 'day').format('YYYY-MM-DD'),
        endTime: today.format('YYYY-MM-DD')
      } as {
        type: 10 | 20
      } & API.SearchTimeParams &
        API.PageParam),
    [today]
  )
  useRequest(() => getTradingStatisticsDay(getTradingStatisticsDayParams), {
    onSuccess(data, params) {
      if (data.success) {
        setTradingLineInfo2(data.data?.records)
      }
    },
    refreshDeps: [getTradingStatisticsDayParams]
  })

  const dates = useMemo(() => {
    let lastDate = intl.formatMessage({ id: 'mt.jinri' })
    if (moneyLineInfo?.[moneyLineInfo.length - 1]?.showDateStr !== realToday.format('YYYY-MM-DD')) {
      return moneyLineInfo?.map((i) => i.showDateStr?.slice(-5) ?? '') ?? []
    }
    return moneyLineInfo?.map((i) => i.showDateStr?.slice(-5) ?? '').toSpliced(-1, 1, lastDate) ?? [lastDate]
  }, [moneyLineInfo, realToday])
  const d1 = useMemo(
    () => [
      {
        name: intl.formatMessage({ id: 'mt.zhuceyonghu' }),
        color: '#183EFC',
        data: moneyLineInfo?.map((i) => i.regUserCount) ?? []
      },
      {
        name: intl.formatMessage({ id: 'mt.rujinyonghu' }),
        color: '#299D22',
        data: moneyLineInfo?.map((i) => i.depositUserCount) ?? []
      }
    ],
    [moneyLineInfo, intl]
  )

  const d2 = useMemo(
    () => [
      {
        name: intl.formatMessage({ id: 'mt.dengluhuoyue' }),
        color: '#183EFC',
        data: moneyLineInfo?.map((i) => i.loginUserCount) ?? []
      },
      {
        name: intl.formatMessage({ id: 'mt.jiaoyihuoyue' }),
        color: '#299D22',
        data: moneyLineInfo?.map((i) => i.activeUserCount) ?? []
      }
    ],
    [moneyLineInfo, intl]
  )

  const d3 = useMemo(
    () => [
      {
        name: intl.formatMessage({ id: 'mt.kaicang' }),
        color: '#183EFC',
        data: tradingLineInfo?.map((i) => i.openVolume) ?? []
      },
      {
        name: intl.formatMessage({ id: 'mt.pingcangliang' }),
        color: '#299D22',
        data: tradingLineInfo?.map((i) => i.closeVolume) ?? []
      },
      {
        name: intl.formatMessage({ id: 'mt.jiaoyiliang' }),
        color: '#FFC51E',
        data: tradingLineInfo?.map((i) => i.volume) ?? []
      }
    ],
    [tradingLineInfo, intl]
  )

  const d4 = useMemo(
    () => [
      {
        name: intl.formatMessage({ id: 'mt.toucun' }),
        color: '#183EFC',
        // @ts-ignore TODO:修改为头寸的字段
        data: tradingLineInfo2?.map((i) => i?.occupyOrderMargin ?? 0) ?? []
      },
      {
        name: intl.formatMessage({ id: 'mt.fudongyingkui' }),
        color: '#299D22',
        // @ts-ignore TODO: 模型更新
        data: tradingLineInfo2?.map((i) => i.platformProfit ?? 0) ?? []
      },
      {
        name: intl.formatMessage({ id: 'mt.jingzhi' }),
        color: '#FFC51E',
        // @ts-ignore TODO: 模型更新
        data: tradingLineInfo2?.map((i) => i.netValue ?? 0) ?? []
      }
    ],
    [tradingLineInfo2, intl]
  )

  // 查询汇总用户余额
  const { data: allMoneyData, run: runAllMoneyData } = useRequest(getFindStatAllMoney)
  // 汇总用户保证金
  const { data: allMarginData, run: runAllMarginData } = useRequest(getFindStatAllMargin)

  const { data: symbolRes } = useRequest(getTradingMoneyPosition)
  // 汇总用户浮动盈亏
  // const getAllProfit = useCallback(async () => {
  //   let profit = 0
  //   if (symbolRes?.success && symbolRes?.data) {
  //     const symbols = symbolRes.data.map((item: any) => item.symbol).join(',') || ''

  //     const rres = await getSymbolProfitMap({ symbols })

  //     if (rres.success && rres.data) {
  //       Object.keys(rres.data).forEach((key) => {
  //         const target = rres.data[key]
  //         profit += target
  //       })
  //     }
  //   }
  //   return {
  //     success: true,
  //     data: profit
  //   }
  // }, [symbolRes])

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

  // 今天的 浮动盈亏 & 净值
  const todayStatisticsData = useMemo(() => {
    return tradingLineInfo2?.[0] ?? {}
  }, [tradingLineInfo2])

  // 取得昨天的 浮动盈亏 & 净值
  const yesterdayStatisticsData = useMemo(() => {
    return tradingLineInfo2?.[1] ?? {}
  }, [tradingLineInfo2])

  // 平台净值 pingtaijingzhi 平台占用保证金 pingtaizhanyongbaozhengjin 平台浮动盈亏 pingtaifudongyingkui
  const rows3 = useMemo(() => {
    const {
      platformProfit: yesterdayTotalProfit,
      occupyOrderMargin: yesterdayTotalMargin,
      money: yesterdayTotalNetValue
    } = yesterdayStatisticsData

    /** 实时 净值 保证金 浮动盈亏 的 环比率， 只有选中当天的时候才会显示实时 */
    const netValueRate = (Number(dayDatas?.netValue ?? 0) / Number(yesterdayTotalNetValue ?? 1)) * 100
    const orderMarginRate = (Number(dayDatas?.orderMargin ?? 0) / Number(yesterdayTotalMargin ?? 1)) * 100
    const profitRate = (Number(dayDatas?.profit ?? 0) / Number(yesterdayTotalProfit ?? 1)) * 100

    // 如果查询当天，显示实时结果，否则显示 findCRMMoneyByDay 查出来的查询日期结算值
    const newValue =
      _realToday === _today
        ? formatNum(Number(allMoneyData?.data ?? 0) + Number(allProfitData?.data ?? 0), { precision: DEFAULT_PRECISION })
        : formatNum(Number(todayStatisticsData?.money ?? 0), { precision: DEFAULT_PRECISION })

    // 如果查询当天，显示实时结果，否则显示 findCRMMoneyByDay 查出来的查询日期结算值
    const orderMargin =
      _realToday === _today
        ? formatNum(allMarginData?.data ?? 0, { precision: DEFAULT_PRECISION })
        : formatNum(Number(todayStatisticsData?.occupyOrderMargin ?? 0), { precision: DEFAULT_PRECISION })

    // 如果查询当天，显示实时结果，否则显示 findCRMMoneyByDay 查出来的查询日期结算值
    const profit =
      _realToday === _today
        ? formatNum(allProfitData?.data ?? 0, { precision: DEFAULT_PRECISION })
        : formatNum(Number(todayStatisticsData?.platformProfit ?? 0), { precision: DEFAULT_PRECISION })

    return [
      {
        title: <FormattedMessage id="mt.pingtaijingzhi" />,
        value: newValue,
        jinri: {
          title: <FormattedMessage id="mt.jinri" />,
          value: _realToday === _today ? formatNumber(Number(dayDatas?.netValue ?? 0), { precision: 0 }) : undefined,
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
          value: _realToday === _today ? formatNumber(Number(dayDatas?.orderMargin ?? 0), { precision: 0 }) : undefined,
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
          value: _realToday === _today ? formatNumber(dayDatas?.profit ?? 0, { precision: 0 }) : undefined,
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
  }, [dayDatas, monthDatas, allMarginData, allProfitData, allMoneyData, _realToday, _today, yesterdayStatisticsData])

  const totalTransVol = useMemo(() => {
    return monthTransVol?.reduce((acc, cur) => acc + Number(cur.gvm ?? 0), 0) ?? 0
  }, [monthTransVol])

  return (
    <div className="m-4">
      <ProCard
        bordered
        bodyStyle={{ minHeight: 900, backgroundColor: 'white', padding: 0 }}
        headerBordered
        extra={
          <ProFormDatePicker
            allowClear={false}
            placeholder={intl.formatMessage({ id: 'mt.mianbanriqi' })}
            fieldProps={{
              value: today,
              onChange: (value: any) => {
                setToday(dayjs(value))
              }
            }}
            name="date"
          />
        }
        title={
          <div className="flex flex-col justify-center items-start ">
            {locale === 'zh-TW' ? (
              <img src={'/img/crms/crmyygl.png'} width={165} height={44} />
            ) : (
              <span className="font-pf-bold  text-xl text-gray">{intl.formatMessage({ id: 'mt.crmdashboard1' })}</span>
            )}
          </div>
        }
      >
        <div className="flex flex-col gap-4 w-full p-4">
          <DataStatisticCard
            items={[
              {
                icon: <img src={'/img/zhucerenshu.svg'} width={40} height={40} />,
                label: <FormattedMessage id="mt.zhucerenshu" />,
                value: formatNum(dayDatas?.regUserCount ?? 0, { precision: 0 }),
                desc: `${intl.formatMessage({ id: 'mt.benyueleiji' })}`,
                descNum: _realToday === _today ? formatNum(monthDatas.regUserCount, { precision: 0 }) : undefined,
                onClick: () => {
                  sysPush(`/crms/channels`, `startDate=${today.format('YYYY-MM-DD')}&endDate=${today.format('YYYY-MM-DD')}`)
                },
                subClick: () => {
                  sysPush(`/crms/channels`, `startDate=${firstDayOfMonth}&endDate=${today.format('YYYY-MM-DD')}`)
                }
              },
              {
                icon: <img src={'/img/shouarujinrenshu.svg'} width={40} height={40} />,
                label: <FormattedMessage id="mt.shouarujinrenshu" />,
                value: formatNum(dayDatas?.depositUserCount ?? 0, { precision: 0 }),
                desc: `${intl.formatMessage({ id: 'mt.benyueleiji' })}`,
                descNum: _realToday === _today ? formatNum(monthDatas.depositUserCount, { precision: 0 }) : undefined,
                onClick: () => {
                  sysPush(`/crms/deposit`, `startDate=${today.format('YYYY-MM-DD')}&endDate=${today.format('YYYY-MM-DD')}`)
                },
                subClick: () => {
                  sysPush(`/crms/deposit`, `startDate=${firstDayOfMonth}&endDate=${today.format('YYYY-MM-DD')}`)
                }
              },
              {
                icon: <img src={'/img/dengluhuoyue.svg'} width={40} height={40} />,
                label: <FormattedMessage id="mt.dengluhuoyue" />,
                value: formatNum(dayDatas?.loginUserCount ?? 0, { precision: 0 }),
                desc: `${intl.formatMessage({ id: 'mt.benyueleiji' })}`,
                descNum: _realToday === _today ? formatNum(monthDatas.loginUserCount, { precision: 0 }) : undefined,
                onClick: () => {
                  sysPush(
                    `/crms/channels`,
                    `lastLoginStartDate=${today.format('YYYY-MM-DD')}&lastLoginEndDate=${today.format('YYYY-MM-DD')}`
                  )
                },
                subClick: () => {
                  sysPush(`/crms/channels`, `lastLoginStartDate=${firstDayOfMonth}&lastLoginEndDate=${today.format('YYYY-MM-DD')}`)
                }
              },
              {
                icon: <img src={'/img/jiaoyihuoyue.svg'} width={40} height={40} />,
                label: <FormattedMessage id="mt.jiaoyihuoyue" />,
                value: formatNum(dayDatas?.activeUserCount ?? 0, { precision: 0 }),
                desc: `${intl.formatMessage({ id: 'mt.benyueleiji' })}`,
                descNum: _realToday === _today ? formatNum(monthDatas.activeUserCount, { precision: 0 }) : undefined
              },
              {
                icon: <img src={'/img/rujinzonge.svg'} width={40} height={40} />,
                label: <FormattedMessage id="mt.rujinzonge" />,
                value: formatNum(dayDatas?.totalAmount ?? 0, { precision: 2 }),
                desc: `${intl.formatMessage({ id: 'mt.benyueleiji' })}`,
                descNum: _realToday === _today ? formatNum(monthDatas.totalAmount, { precision: 2 }) : undefined,
                onClick: () => {
                  sysPush(`/crms/deposit`, `startDate=${today.format('YYYY-MM-DD')}&endDate=${today.format('YYYY-MM-DD')}`)
                },
                subClick: () => {
                  sysPush(`/crms/deposit`, `startDate=${firstDayOfMonth}&endDate=${today.format('YYYY-MM-DD')}`)
                }
              },
              {
                icon: <img src={'/img/chujinzonge.svg'} width={40} height={40} />,
                label: <FormattedMessage id="mt.chujinzonge" />,
                value: formatNum(dayDatas?.totalWithdraw ?? 0, { precision: 2 }),
                desc: `${intl.formatMessage({ id: 'mt.benyueleiji' })}`,
                descNum: _realToday === _today ? formatNum(monthDatas.totalWithdraw, { precision: 2 }) : undefined
              }
            ]}
          />
          <div className=" flex flex-row-reverse gap-4 flex-wrap-reverse">
            <ProCard bordered ghost={true} className="md:flex-shrink-0 flex-shrink flex-grow rounded-xl w-[28.75rem]">
              {/* 平台交易额 pingtaijiaoyie  */}
              <DashboardCardBody
                title={
                  <div className="flex flex-row gap-4 items-center">
                    <FormattedMessage id="mt.pingtaijiaoyie" />
                    <span className=" flex items-center text-xs font-normal">
                      <FormattedMessage id="mt.benyueleijijiaoyie" />
                      :&nbsp;{formatNum(totalTransVol, { precision: 0 })}
                    </span>
                  </div>
                }
                onDetail={() => {
                  push('/crms/product-rank')
                }}
                color="black"
              >
                {/* <TradingVolume /> */}
                {/* <TransactionVolume data={monthDatas.transVol} /> */}
                {/* 平台交易额 */}
                <TransactionVolume defaultData={monthTransVol} />
              </DashboardCardBody>
            </ProCard>
            {/* <ProCard bordered ghost={true} className="lg:flex-grow-0 flex-grow flex-shrink-0 rounded-xl w-[17.8125rem] ">
              <DashboardCardBody title={<FormattedMessage id="mt.dangrihuoyueyonghu" />} color="black">
                <ActiveUser />
              </DashboardCardBody>
            </ProCard> */}
            {/* <ProCard bordered ghost={true} className="rounded-xl flex-grow w-[46.0625rem] max-w-full">
              <DashboardCardBody title={<FormattedMessage id="mt.dangrijiaoyie" />} color="black">
                <SettlementAmount />
              </DashboardCardBody>
            </ProCard> */}

            <div className="dashboard-card rounded-xl flex-grow w-[46.0625rem] max-w-full">
              {/* 平台结算资金 pingtaijiesuanzijin  */}
              <SettlementAmount data={settlementAmount} />
            </div>
          </div>
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
                    {/* <div className=" flex items-center">
                      {intl.formatMessage({ id: 'mt.xiangqing' })}
                      <Iconfont name="xiangqing" color="black" width={20} height={20} />
                    </div> */}
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
          <div className="flex flex-col gap-2.5 w-full">
            {locale === 'zh-TW' ? (
              <img
                src={'/img/crms/crmgjzb.png'}
                width={178}
                height={23}
                style={{
                  marginTop: 20
                }}
              />
            ) : (
              <span className="font-pf-bold mt-4 ml-1 text-lg text-gray">{intl.formatMessage({ id: 'mt.guanjianzhibiaoqushitu' })}</span>
            )}

            <div className="dashboard-card !grid lg:grid-cols-2 grid-cols-1 w-full">
              <DashboardCardBody
                className=" border-r-gray-150 border-r border-solid rounded-r-none"
                title={<FormattedMessage id="mt.yunyingshuju" />}
                desc={<></>}
                color="black"
              >
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4 pt-4 w-full">
                  <DatasLine xAxis={dates} series={d1} /> <DatasLine xAxis={dates} series={d2} />
                </div>
              </DashboardCardBody>
              <DashboardCardBody title={<FormattedMessage id="mt.jiaoyishuju" />} desc={<></>} color="black">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4 pt-4 w-full">
                  <DatasLine xAxis={dates} series={d3} /> <DatasLine xAxis={dates} series={d4} />
                </div>
              </DashboardCardBody>
            </div>
          </div>
        </div>
      </ProCard>
    </div>
  )
}
