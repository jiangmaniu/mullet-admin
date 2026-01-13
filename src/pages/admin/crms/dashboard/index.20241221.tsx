import './index.less'

import { ProCard, ProFormDatePicker } from '@ant-design/pro-components'
import { FormattedMessage, getLocale, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import DataStatisticCard from '@/components/Admin/DataStatisticCard'
import {
  getFindCRMMoneyByMonth,
  getFindCrmMoneyLine,
  getFindCrmTradingLine,
  getFindGMVByDay,
  getTradingMoneyPosition,
  getTradingStatisticsDay
} from '@/services/api/crmManage/trading'
import { formatNum } from '@/utils'
import { sysPush } from '@/utils/navigator'

import DashboardCardBody from './DashboardCardBody'
import DatasLine from './DatasLine'
import Rows3 from './Rows3'
import SettlementAmount from './SettlementAmount'
import TransactionVolume from './TransactionVolume'

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

  const [monthDatas, setMonthDatas] = useState<CrmTrading.CRMMoneyByMonthInfo>({}) // 今月数据
  const [lastMonthDatas, setLastMonthDatas] = useState<CrmTrading.CRMMoneyByMonthInfo>({}) // 上个月

  const [dayTransVol, setDayTransVol] = useState<CrmTrading.GMVInfo[]>([]) // 今日交易额

  // 本月：注册人数 & 首 A & 登录活跃 & 交易活跃 & 入金总额 & 出金总额 && 头寸 & 浮动盈亏 & 净值
  const [statistics30, setStatistics30] = useState<CrmTrading.findCloseMoneyInfo[]>()

  // 七天：注册人数 & 首 A & 登录活跃 & 交易活跃 & 入金总额 & 出金总额 && 头寸 & 浮动盈亏 & 净值
  const statistics7 = useMemo(() => {
    // 返回最后七天的数据, 取数组最后7个
    return statistics30 ? [...statistics30].reverse().slice(-7) : []
  }, [statistics30])

  const getTradingStatisticsDayParams = useMemo(
    () =>
      ({
        type: 10,
        // current: 1,
        // size: 7,
        // startTime: today.subtract(6, 'day').format('YYYY-MM-DD'),
        startTime: firstDayOfMonth,
        endTime: today.format('YYYY-MM-DD')
      } as {
        type: 10 | 20
      } & API.SearchTimeParams &
        API.PageParam),
    [today]
  )

  useEffect(() => {
    console.log('getTradingStatisticsDayParams', getTradingStatisticsDayParams)
  }, [getTradingStatisticsDayParams])

  useRequest(() => getTradingStatisticsDay(getTradingStatisticsDayParams), {
    onSuccess(data, params) {
      if (data.success) {
        setStatistics30(data.data?.records)
      }
    },
    refreshDeps: [getTradingStatisticsDayParams]
  })

  // 今天的 浮动盈亏 & 净值
  const todayStatisticsData = useMemo(() => {
    return JSON.parse(JSON.stringify(statistics7?.[statistics7.length - 1] ?? {}))
  }, [statistics7])

  console.log('statistics7', statistics7)

  // console.log('todayStatisticsData', todayStatisticsData)

  // 取得昨天的 浮动盈亏 & 净值
  const yesterdayStatisticsData = useMemo(() => {
    return JSON.parse(JSON.stringify(statistics7?.[statistics7.length - 2] ?? {}))
  }, [statistics7])

  // console.log('yesterdayStatisticsData', yesterdayStatisticsData)

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

  const getFindGMVByDayParams = useMemo(
    () =>
      ({
        startTime: firstDayOfMonth,
        endTime: today.format('YYYY-MM-DD')
      } as {
        startTime: string
        endTime: string
      }),
    [firstDayOfMonth, today]
  )
  // 查询当月平台交易额
  useRequest(() => getFindGMVByDay(getFindGMVByDayParams), {
    onSuccess(data, params) {
      if (data.success) setDayTransVol(data.data ?? [])
    },
    refreshDeps: [getFindGMVByDayParams]
  })

  const [current, setCurrent] = useState(1)
  const [size, setSize] = useState(6)

  // const getFindCloseMoneyParams = useMemo(
  //   () =>
  //     ({
  //       current,
  //       size: days, // 只展示最后七天
  //       startTime: today.format('YYYY-MM-DD')
  //     } as { startTime: string } & API.PageParam),
  //   [current, days, today]
  // )
  // useRequest(() => getFindCloseMoney(getFindCloseMoneyParams), {
  //   onSuccess(data, params) {
  //     if (data.success) {
  //       setSettlementAmount(
  //         data.data?.map(
  //           (i) =>
  //             // 预处理
  //             ({
  //               ...i,
  //               handlingFees: Number(i?.handlingFees).toFixed(2),
  //               interestFees: Number(i?.interestFees).toFixed(2),
  //               profit: Number(i?.profit).toFixed(2)
  //             } as unknown as CrmTrading.findCloseMoneyInfo)
  //         ) ?? []
  //       )
  //     }
  //   },
  //   refreshDeps: [getFindCloseMoneyParams]
  // })

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

  const d4 = useMemo(() => {
    const sortedData = [...statistics7]
    console.log('sortedData', sortedData)
    return [
      {
        name: intl.formatMessage({ id: 'mt.toucun' }),
        color: '#183EFC',
        // @ts-ignore TODO:修改为头寸的字段
        data: sortedData?.map((i) => Number(i?.occupyOrderMargin ?? '0')) ?? []
      },
      {
        name: intl.formatMessage({ id: 'mt.fudongyingkui' }),
        color: '#299D22',
        // @ts-ignore TODO: 模型更新
        data: sortedData?.map((i) => Number(i.platformProfit ?? '0')) ?? []
      },
      {
        name: intl.formatMessage({ id: 'mt.jingzhi' }),
        color: '#FFC51E',
        // @ts-ignore TODO: 模型更新
        data: sortedData?.map((i) => Number(i.platformProfit ?? '0') + Number(i.money ?? '0')) ?? []
      }
    ]
  }, [statistics7, intl])

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

  const totalTransVol = useMemo(() => {
    return dayTransVol?.reduce((acc, cur) => acc + Number(cur.gvm ?? 0), 0) ?? 0
  }, [dayTransVol])

  return (
    <div className="m-4">
      <ProCard
        bordered
        bodyStyle={{ minHeight: 900, backgroundColor: 'white', padding: 0 }}
        headerBordered
        extra={useMemo(
          () => (
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
          ),
          [today]
        )}
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
                value: formatNum(todayStatisticsData?.newUser ?? 0, { precision: 0 }),
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
                value: formatNum(todayStatisticsData?.newAUser ?? 0, { precision: 0 }),
                desc: `${intl.formatMessage({ id: 'mt.benyueleiji' })}`,
                descNum: _realToday === _today ? formatNum(monthDatas.depositUserCount, { precision: 0 }) : undefined,
                // onClick: () => {
                //   sysPush(`/crms/channels`, `fastAStartTime=${today.format('YYYY-MM-DD')}&fastAEndTime=${today.format('YYYY-MM-DD')}`)
                // },
                // subClick: () => {
                //   sysPush(`/crms/channels`, `fastAStartTime=${firstDayOfMonth}&fastAEndTime=${today.format('YYYY-MM-DD')}`)
                // }
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
                value: formatNum(todayStatisticsData?.activeUser ?? 0, { precision: 0 }),
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
                value: formatNum(todayStatisticsData?.operationUser ?? 0, { precision: 0 }),
                desc: `${intl.formatMessage({ id: 'mt.benyueleiji' })}`,
                descNum: _realToday === _today ? formatNum(monthDatas.activeUserCount, { precision: 0 }) : undefined
              },
              {
                icon: <img src={'/img/rujinzonge.svg'} width={40} height={40} />,
                label: <FormattedMessage id="mt.rujinzonge" />,
                value: formatNum(todayStatisticsData?.totalAmount ?? 0, { precision: 2 }),
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
                value: formatNum(todayStatisticsData?.totalWithdraw ?? 0, { precision: 2 }),
                desc: `${intl.formatMessage({ id: 'mt.benyueleiji' })}`,
                descNum: _realToday === _today ? formatNum(monthDatas.totalWithdraw, { precision: 2 }) : undefined
              }
            ]}
          />
          <div className=" flex flex-row-reverse gap-4 flex-wrap-reverse">
            <ProCard bordered ghost={true} className="md:flex-shrink-0 flex-shrink flex-grow rounded-xl w-[26.75rem] ">
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
                  sysPush(`/crms/product-rank`, `startDate=${firstDayOfMonth}&endDate=${today.format('YYYY-MM-DD')}`)
                }}
                color="black"
              >
                {/* <TradingVolume /> */}
                {/* <TransactionVolume data={monthDatas.transVol} /> */}
                {/* 平台交易额 */}
                <TransactionVolume defaultData={dayTransVol} />
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
              <SettlementAmount data={statistics30} />
            </div>
          </div>
          <Rows3
            todayStatisticsData={todayStatisticsData}
            monthDatas={monthDatas}
            _realToday={_realToday}
            _today={_today}
            yesterdayStatisticsData={yesterdayStatisticsData}
          />
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
