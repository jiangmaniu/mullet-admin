import './index.less'

import { ProCard, ProForm, ProFormDateRangePicker } from '@ant-design/pro-components'
import { FormattedMessage, getLocale, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import dayjs from 'dayjs'
import { useLayoutEffect, useMemo, useState } from 'react'

import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { useStores } from '@/context/mobxProvider'
import { getTradingStatisticsDay, getTradingSymbol } from '@/services/api/crmManage/trading'

import { formatNum } from '..'
import DataCards from './DataCards'
import DataCards2 from './DataCards2'
import DataCards3 from './DataCards3'
import StatisticsCharts from './StatisticsCharts'
import TransactionVolumeRow, { IData } from './TransactionVolumeRow'

export default function Dashboard() {
  const { trade } = useStores()

  useLayoutEffect(() => {
    trade.getSymbolListBack()
  }, [])

  const intl = useIntl()

  const locale = getLocale()

  const realToday = dayjs()
  const _realToday = useMemo(() => realToday.format('YYYY-MM-DD'), [realToday])

  const [now, setNow] = useState(dayjs())

  // 統計的結束時間
  const [today, setToday] = useState(dayjs()) // 默认使用 dayjs 获取今天
  const _today = useMemo(() => today.format('YYYY-MM-DD'), [today])

  // 30天前
  const _29DaysAgo = useMemo(() => today.subtract(29, 'day').format('YYYY-MM-DD'), [today])

  // const yesterday = useMemo(() => today.subtract(1, 'day'), [today]) // 昨天
  // 当月第一天
  const firstDayOfMonth = useMemo(() => today.startOf('month').format('YYYY-MM-DD'), [today])
  // 上个月第一天
  const firstDayOfLastMonth = useMemo(() => today.subtract(1, 'month').startOf('month').format('YYYY-MM-DD'), [today])
  const lastDayOfLastMonth = useMemo(() => today.subtract(1, 'month').endOf('month').format('YYYY-MM-DD'), [today])

  const thisMonth = useMemo(() => today.format('YYYY-MM'), [today])
  const lastMonth = useMemo(() => today.subtract(1, 'month').format('YYYY-MM'), [today]) // 获取上个月的“YYYY-MM”

  // 統計的開始時間
  const [startDay, setStartDay] = useState(dayjs(_today))
  const _startDay = useMemo(() => startDay.format('YYYY-MM-DD'), [startDay])
  const _dayBeforeStartDay = useMemo(() => startDay.subtract(1, 'day').format('YYYY-MM-DD'), [startDay])
  const days = useMemo(() => today.diff(startDay, 'days') + 1, [today, startDay]) // 日期範圍一共多少天

  // const [monthDatas, setMonthDatas] = useState<CrmTrading.CRMMoneyByMonthInfo>({}) // 今月数据
  // const [lastMonthDatas, setLastMonthDatas] = useState<CrmTrading.CRMMoneyByMonthInfo>({}) // 上个月

  const [dayTransVol, setDayTransVol] = useState<IData[]>([]) // 今日交易额

  // 本月：注册人数 & 首 A & 登录活跃 & 交易活跃 & 入金总额 & 出金总额 && 头寸 & 浮动盈亏 & 净值
  const [statistics30, setStatistics30] = useState<CrmTrading.findCloseMoneyInfo[]>([])
  const [statisticsMonth, setStatisticsMonth] = useState<CrmTrading.findCloseMoneyInfo[]>([])
  const [statisticsLastMonth, setStatisticsLastMonth] = useState<CrmTrading.findCloseMoneyInfo[]>([])

  const getTradingStatisticsDayParams = useMemo(
    () =>
      ({
        type: 10,
        size: 1000,
        // current: 1,
        // size: 7,
        // startTime: today.subtract(6, 'day').format('YYYY-MM-DD'),
        // startTime: firstDayOfMonth,
        startTime: firstDayOfLastMonth,
        endTime: _today
      } as {
        type: 10 | 20
      } & API.SearchTimeParams &
        API.PageParam),
    [_startDay, _today]
  )

  // 查詢日期范圍中的數據
  useRequest(() => getTradingStatisticsDay(getTradingStatisticsDayParams), {
    onSuccess(data, params) {
      if (data.success) {
        // 截取上个月的数据
        const lastMonthData = data.data?.records?.filter((item) => dayjs(item.showDateStr).isBefore(firstDayOfMonth)) ?? []
        setStatisticsLastMonth(lastMonthData)
        console.log('lastMonthData', lastMonthData)

        // 截取本月的数据
        const monthData = data.data?.records?.filter((item) => dayjs(item.showDateStr).isAfter(lastDayOfLastMonth)) ?? []
        setStatisticsMonth(monthData)
        console.log('monthData', monthData)
        // 截取 _startDay 到 _today 的数据
        const startDayData = data.data?.records?.filter((item) => dayjs(item.showDateStr).isAfter(_dayBeforeStartDay)) ?? []
        setStatistics30(startDayData)
        console.log('startDayData', startDayData)
      }
    },
    refreshDeps: [getTradingStatisticsDayParams]
  })

  // 今天的 浮动盈亏 & 净值
  const todayStatisticsData = useMemo(() => {
    return JSON.parse(JSON.stringify(statistics30?.[0] ?? {}))
  }, [statistics30])

  // 取得昨天的 浮动盈亏 & 净值
  const yesterdayStatisticsData = useMemo(() => {
    return JSON.parse(JSON.stringify(statistics30?.[1] ?? {}))
  }, [statistics30])

  // 查询当月 CRM 资金统计
  // useRequest(() => getFindCRMMoneyByMonth({ month: thisMonth }), {
  //   onSuccess(data, params) {
  //     if (data.success)
  //       setMonthDatas({
  //         ...(data.data ?? {})
  //       })
  //   },
  //   refreshDeps: [thisMonth]
  // })

  // useRequest(() => getFindCRMMoneyByMonth({ month: lastMonth }), {
  //   onSuccess(data, params) {
  //     if (data.success)
  //       setLastMonthDatas({
  //         ...(data.data ?? {})
  //       })
  //   },
  //   refreshDeps: [lastMonth]
  // })

  const getFindGMVByDayParams = useMemo(
    () =>
      ({
        startTime: _startDay,
        endTime: _today
      } as {
        startTime: string
        endTime: string
      }),
    [_startDay, _today]
  )

  // 查詢某個時間範圍的商品交易額
  useRequest(() => getTradingSymbol(getFindGMVByDayParams), {
    onSuccess(data, params) {
      if (data.success && data.data) {
        const newData = data.data?.map((item: any) => {
          const symbol = trade.symbolListBack.find((symbol) => symbol.symbol === item.symbol)

          if (symbol) {
            return {
              symbol: symbol.symbol,
              gvm: item.totalGvm,
              volume: item.totalVolume,
              icon: symbol.imgUrl
            }
          }
          return {
            symbol: item.symbol,
            gvm: item.totalGvm,
            volume: item.totalVolume,
            icon: ''
          }
        })

        setDayTransVol(newData ?? [])
      }
    },
    refreshDeps: [getFindGMVByDayParams]
  })

  const totalTransVol = useMemo(() => {
    return dayTransVol?.reduce((acc, cur) => acc + Number(cur.gvm ?? 0), 0) ?? 0
  }, [dayTransVol])

  const datePresets = [
    {
      label: intl.formatMessage({ id: 'mt.180tian' }),
      value: [realToday.subtract(180, 'day'), realToday]
    },
    {
      label: intl.formatMessage({ id: 'mt.jinsanyue' }),
      value: [realToday.subtract(2, 'month').startOf('month'), realToday]
    },
    {
      label: intl.formatMessage({ id: 'mt.shangyue' }),
      value: [realToday.subtract(1, 'month').startOf('month'), realToday.subtract(1, 'month').endOf('month')]
    },
    {
      label: intl.formatMessage({ id: 'mt.benyue' }),
      value: [realToday.startOf('month'), realToday]
    },
    {
      label: intl.formatMessage({ id: 'mt.jinqitian' }),
      value: [realToday.subtract(6, 'day'), realToday]
    },
    {
      label: intl.formatMessage({ id: 'mt.jintian' }),
      value: [realToday, realToday]
    }
  ] as any[]

  const [queryDates, setQueryDates] = useState<[any, any]>([today, today])

  const [form] = Form.useForm()

  return (
    <div className="m-4">
      <ProCard
        bordered
        bodyStyle={{ minHeight: 900, backgroundColor: 'white', padding: 0 }}
        // headerBordered
        extra={
          <ProForm
            onFinish={(values: any) => {
              console.log('values', values)
              setStartDay(dayjs(values.dateRange[0]))
              setToday(dayjs(values.dateRange[1]))
              setNow(dayjs())
            }}
            submitter={false}
            // className="!mb-4"
            form={form}
          >
            <div className="flex flex-row justify-center items-center gap-4">
              <ProFormDateRangePicker
                name="dateRange"
                placeholder={[intl.formatMessage({ id: 'common.startDate' }), intl.formatMessage({ id: 'common.endDate' })]}
                initialValue={[realToday, realToday]}
                fieldProps={{
                  presets: datePresets
                }}
              />

              <QueryBtnGroup
                onSubmit={() => {
                  form?.submit()
                }}
                onReset={() => {
                  // form?.resetFields()
                  form?.setFieldsValue({
                    dateRange: [realToday, realToday]
                  })
                  form?.submit()
                }}
              />
            </div>
          </ProForm>
        }
        title={
          <div className="flex flex-row justify-center items-center gap-4 ">
            {/* {locale === 'zh-TW' ? (
              <img src={'/img/crms/crmyygl.png'} width={165} height={44} />
            ) : ( */}
            <span className="font-pf-bold  text-xl text-gray">{intl.formatMessage({ id: 'mt.crmdashboard1' })}</span>
            {/* )} */}
            <span className="text-base font-normal text-gray-600">
              {/* {now.format('YYYY-MM-DD HH:mm:ss')} {intl.formatMessage({ id: 'common.gengxin' })} */}
              {_startDay}
              {_today === _startDay ? '' : ` - ${_today}`}
              &nbsp;
              {_today === _startDay ? intl.formatMessage({ id: 'mt.dangrishuju' }) : intl.formatMessage({ id: 'mt.qujianshuju' })}
            </span>
          </div>
        }
      >
        <div className="flex flex-col gap-4 w-full p-4">
          <div className={`grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:grid-cols-6 items-center gap-x-3 gap-y-4 mt-4`}>
            <DataCards
              // monthDatas={monthDatas}
              // lastMonthDatas={lastMonthDatas}
              todayStatisticsData={todayStatisticsData}
              statisticsMonth={statisticsMonth}
              statisticsLastMonth={statisticsLastMonth}
              statistics30={statistics30}
              today={today}
              _today={_today}
              _realToday={_realToday}
              _startDay={_startDay}
              firstDayOfMonth={firstDayOfMonth}
            />
            <DataCards2
              todayStatisticsData={todayStatisticsData}
              statistics30={statistics30}
              statisticsMonth={statisticsMonth}
              statisticsLastMonth={statisticsLastMonth}
              _realToday={_realToday}
              _today={_today}
              yesterdayStatisticsData={yesterdayStatisticsData}
              _startDay={_startDay}
            />

            <DataCards3
              // monthDatas={monthDatas}
              statistics30={statistics30}
              statisticsMonth={statisticsMonth}
              statisticsLastMonth={statisticsLastMonth}
              // lastMonthDatas={lastMonthDatas}
              todayStatisticsData={todayStatisticsData}
              today={today}
              _today={_today}
              _realToday={_realToday}
              firstDayOfMonth={firstDayOfMonth}
              _startDay={_startDay}
            />
          </div>
          <div className="w-full h-[1px] bg-gray-150 mb-1 mt-1.5"></div>
          <div className="flex flex-row justify-start items-end gap-8">
            <span className=" flex items-end text-base font-bold text-primary">
              <FormattedMessage id="mt.leijijiaoyie" />
              :&nbsp;<span className="text-lg text-primary font-pf-bold leading-6">{formatNum(totalTransVol, { precision: 0 })}</span>
            </span>
          </div>
          <TransactionVolumeRow defaultData={dayTransVol} />
          <div className="w-full h-[1px] bg-gray-150 mt-1 mb-1.5"></div>
          <StatisticsCharts datePresets={datePresets} today={today} _today={_today} _realToday={_realToday} _startDay={_29DaysAgo} />
          {/* <div className=" flex flex-row-reverse gap-4 flex-wrap-reverse">
            <ProCard bordered ghost={true} className="md:flex-shrink-0 flex-shrink flex-grow rounded-xl w-[26.75rem] ">

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
                <TransactionVolume defaultData={dayTransVol} />
              </DashboardCardBody>
            </ProCard>

            <div className="dashboard-card rounded-xl flex-grow w-[46.0625rem] max-w-full">
              <SettlementAmount data={statistics30} />
            </div>
          </div> */}
        </div>
      </ProCard>
    </div>
  )
}
