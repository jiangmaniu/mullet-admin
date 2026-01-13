import './index.less'

import { FormattedMessage, useIntl, useModel } from '@umijs/max'
import { Statistic } from 'antd'
import * as echarts from 'echarts'
import { default as EChartsReact, default as ReactECharts } from 'echarts-for-react'
import { sum } from 'lodash'
import { useEffect, useMemo, useRef } from 'react'

import { DEFAULT_PRECISION } from '@/constants'
import { countUpFormatter } from '@/utils/countUp'

import { formatNum } from '../..'

type IProps = {
  data?: CrmTrading.findCloseMoneyInfo[] | undefined
  jiaoyie?: number
  yingkui?: number
  toucun?: number
}

/**
 * 平台结算资金
 */
export default ({ data = [], jiaoyie, yingkui, toucun }: IProps) => {
  const intl = useIntl()
  // 只展示最后七天
  const data7 = useMemo(() => [...data].reverse().slice(-7), [data])

  // const date = ['2-11', '2-12', '2-13', '2-14', '2-15', '2-16', intl.formatMessage({ id: 'mt.jinri' })]
  // @ts-ignore
  const date = data7.map((item) => item.showDateStr.slice(-2))

  // 累计手续费
  const profitSummary = useMemo(() => (data && data.length > 0 ? sum(data.map((item) => Number(item.profit))) : 0), [data])

  // 累计隔夜利息
  const handlingFeesSummary = useMemo(() => (data && data.length > 0 ? sum(data.map((item) => Number(item.handlingFees))) : 0), [data])

  // 累计已实现平仓盈亏
  const interestFeesSummary = useMemo(() => (data && data.length > 0 ? sum(data.map((item) => Number(item.interestFees))) : 0), [data])

  // 累计平台结算资金
  const totalSummary = useMemo(
    () => profitSummary + handlingFeesSummary + interestFeesSummary,
    [profitSummary, handlingFeesSummary, interestFeesSummary]
  )

  // const todaySummary = useMemo(
  //   () =>
  //     data7 && data7.length > 0
  //       ? Number(data7[data7.length - 1]?.profit ?? 0) +
  //         Number(data7[data7.length - 1]?.handlingFees ?? 0) +
  //         Number(data7[data7.length - 1]?.interestFees ?? 0)
  //       : 0,
  //   [data7]
  // )

  const today = useMemo(() => (data7 && data7.length > 0 ? data7[data7.length - 1] : undefined), [data7])
  const todaySummary = useMemo(
    () => (today ? Number(today?.profit ?? 0) + Number(today?.handlingFees ?? 0) + Number(today?.interestFees ?? 0) : 0),
    [today]
  )

  // 找到 data7 中最大的值
  const maxValue = Math.max(...data7.map((item) => Number(item.profit ?? 0)))
  const minValue = Math.min(...data7.map((item) => Number(item.profit ?? 0)))

  const max = Math.max(Math.abs(maxValue), Math.abs(minValue))

  const option = useMemo(
    () =>
      ({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            snap: true, // Add snap to ensure the tooltip follows the mouse pointer
            z: 1, // Ensure the axisPointer is above the series
            width: 42 // Set the width of the axisPointer to 42
          },
          position: function (point, params, dom, rect, size) {
            // 鼠标悬停位置
            // @ts-ignore
            return [point[0] - 150, point[1] - (size?.contentSize?.[1] ?? 0) - 60]
          },
          formatter: (params: any) => {
            const item = data7[params[0].dataIndex] as CrmTrading.findCloseMoneyInfo
            if (!item) return ''
            return `<div style="display:flex;flex-direction:column;align-items:start; width:180px;height:128px;color:#110e23;gap:2px;">
        <span style="color:#6a7073;font-size:12px;">${item.showDateStr}</span>
        <span style="font-size:12px;font-weight:600;">${intl.formatMessage({ id: 'mt.pingtaijiesuanzijin' })}: ${formatNum(
              Number(item?.profit ?? 0) + Number(item?.interestFees ?? 0) + Number(item?.handlingFees ?? 0),
              { precision: DEFAULT_PRECISION }
            )}</span>
        <div style="width:100%;height:1px;background:#efefef;margin: 4px 0 8px 0;" >
        &nbsp;
        </div>
        <div style="font-weight:500;font-size:12px;width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;">
          <span>${intl.formatMessage({ id: 'mt.yishixianpingcangyingkui' })}</span>
          <span style="font-weight:600;">${formatNum(item.profit, { precision: DEFAULT_PRECISION })}</span>
        </div>
         <div style="font-weight:500;font-size:12px;width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;">
          <span>${intl.formatMessage({ id: 'mt.geyelixi' })}</span>
          <span style="font-weight:600;">${formatNum(item.interestFees, { precision: DEFAULT_PRECISION })}</span>
        </div>
         <div style="font-weight:500;font-size:12px;width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;">
          <span>${intl.formatMessage({ id: 'mt.shouxufei' })}</span>
          <span style="font-weight:600;">${formatNum(item.handlingFees, { precision: DEFAULT_PRECISION })}</span>
        </div>
        </div>`
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          top: '12%',
          containLabel: true
        },
        xAxis: [
          {
            show: false,
            type: 'category',
            data: date,
            axisLine: {
              // 坐标轴
              show: true,
              onZero: true // 确保 x 轴在 y=0 处
            },
            axisTick: {
              // 刻度线
              show: true
            },
            axisLabel: {
              width: 42 // 设置 x 轴宽度为 42
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: -max,
            max: max,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f0f0f0' // 设置辅助线颜色为浅灰色
              }
            }
            // min: 'dataMin',
            // max: 'dataMax'
          }
        ],
        series: [
          {
            // 浮动盈亏
            name: intl.formatMessage({ id: 'mt.fudongyingkui' }),
            type: 'bar',
            barWidth: 42,
            width: 65,
            stack: 'total',
            itemStyle: {
              decal: {
                rotation: -Math.PI / 7,
                symbol: 'rect',
                symbolSize: 4,
                color: 'rgba(255, 255, 255, 0.05)',
                dashArrayX: [1, 0],
                dashArrayY: [4, 16]
              },
              barBorderRadius: 4,
              // 正數是藍色，負數是橙色
              color: (params: any) => {
                const { value } = params
                return value > 0
                  ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#5462F1' },
                      { offset: 1, color: '#395EF3' }
                    ])
                  : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#F18F54' },
                      { offset: 1, color: '#FF7823' }
                    ])
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
            },
            label: {
              show: true,
              position: 'top',
              color: '#110e23', // 字体颜色
              fontFamily: 'dingpro-regular', // 字体系列
              fontSize: 12, // 字体大小
              formatter: (val: { value: any }) => (val.value === 0 ? '' : formatNum(val.value, { precision: DEFAULT_PRECISION }))
            },
            data: data7 && data7.length > 0 ? data7.map((item) => (item.profit && item.profit > 0 ? item.profit : 0)) : [],
            z: 3
          },

          {
            // 浮动盈亏
            name: intl.formatMessage({ id: 'mt.fudongyingkui' }),
            type: 'bar',
            barWidth: 42,
            width: 65,
            stack: 'total',
            itemStyle: {
              decal: {
                rotation: -Math.PI / 7,
                symbol: 'rect',
                symbolSize: 4,
                color: 'rgba(255, 255, 255, 0.05)',
                dashArrayX: [1, 0],
                dashArrayY: [4, 16]
              },
              barBorderRadius: 4,
              // 正數是藍色，負數是橙色
              color: (params: any) => {
                const { value } = params
                return value > 0
                  ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#5462F1' },
                      { offset: 1, color: '#395EF3' }
                    ])
                  : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#F18F54' },
                      { offset: 1, color: '#FF7823' }
                    ])
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
            },
            label: {
              show: true,
              color: '#110e23', // 字体颜色
              position: 'bottom',
              fontFamily: 'dingpro-regular', // 字体系列
              fontSize: 12, // 字体大小
              formatter: (val: { value: any }) => (val.value === 0 ? '' : formatNum(val.value, { precision: DEFAULT_PRECISION }))
            },
            data: data7 && data7.length > 0 ? data7.map((item) => (item.profit && item.profit < 0 ? item.profit : 0)) : [],
            z: 3
          }
        ]
      } as echarts.EChartOption),
    [data7, intl]
  )

  const chartRef = useRef<EChartsReact | null>(null)
  const { sidebarCollapsed } = useModel('global')

  useEffect(() => {
    if (chartRef.current) {
      setTimeout(() => {
        chartRef.current?.getEchartsInstance().resize()
      }, 100)
    }
  }, [sidebarCollapsed])

  return (
    <div className=" flex gap-4 md:flex-row flex-col flex-shrink w-full h-full  overflow-hidden  ">
      <div className=" cursor-default flex flex-col md:w-[40%] w-full min-w-[24rem]  justify-between flex-shrink-0 flex-1 flex-grow  md:border-r border-r-0 border-gray-150">
        <div className="  pt-[1.5rem] px-5 border-b-gray-150 border-b pb-[1.125rem]">
          <span className=" text-base font-semibold">
            <FormattedMessage id="mt.pingtaijiesuanzijin" />
          </span>
          {/* <div className=" flex items-center">
            {intl.formatMessage({ id: 'mt.xiangqing' })}
            <Iconfont name="xiangqing" color="black" width={20} height={20} />
          </div> */}
        </div>
        <div className=" grid grid-cols-2 w-full flex-1 border-b-gray-150 border-b items-center justify-center">
          {/* <Statistic
            title={<></>}
            value={10221}
            formatter={(val) => countUpFormatter(Number(val))}
            valueRender={(val) => <span className="text-3xl !font-dingpro-medium font-semibold">{val}</span>}
          /> */}
          <div className="blur-item relative overflow-hidden h-full">
            <div className="flex h-full px-2 md:px-5 items-center justify-start  ">
              <span className="flex flex-col min-w-[70%]  z-10 min-h-[72px]">
                <span className="text-xl leading-[21px] !font-dingpro-medium font-semibold flex-shrink">
                  {/* <CountUpFormatter end={todaySummary} /> */}
                  <Statistic
                    title={<></>}
                    value={todaySummary}
                    formatter={(val) => countUpFormatter(Number(val))}
                    valueRender={(val) => <span className="text-xl leading-[21px] !font-dingpro-medium font-semibold">{val}</span>}
                  />
                </span>
                <span className=" text-xs font-normal">
                  <FormattedMessage id="mt.pingtaijiesuanzijin" />
                </span>
              </span>
            </div>
          </div>
          <div className="blur-item relative overflow-hidden h-full border-l-gray-150 border-l">
            <div className="flex h-full px-2 md:px-5 flex-shrink items-center justify-start  ">
              <span className="flex flex-col min-w-[70%] z-10 min-h-[72px]">
                <span className="text-xl leading-[21px] !font-dingpro-medium font-semibold">
                  {/* <CountUpFormatter end={totalSummary} /> */}
                  <Statistic
                    title={<></>}
                    value={totalSummary}
                    formatter={(val) => countUpFormatter(Number(val))}
                    valueRender={(val) => <span className="text-xl leading-[21px] !font-dingpro-medium font-semibold">{val}</span>}
                  />
                </span>
                <span className=" text-xs font-normal">
                  <FormattedMessage id="mt.benyueleijipingtaijiesuanzijin" />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className=" justify-between gap-y-0 grid grid-cols-12 flex-1 items-center">
          <div className="blur-item px-2 md:px-5  relative overflow-hidden flex flex-col h-full justify-center items-start border-r-gray-150 border-r md:col-span-4 col-span-6 ">
            <div className="z-10 max-w-full min-h-[72px]">
              <Statistic
                title={<></>}
                value={today?.handlingFees}
                formatter={(val) => countUpFormatter(Number(val))}
                valueRender={(val) => <span className="text-xl leading-[21px] !font-dingpro-medium font-semibold">{val}</span>}
              />
              <div className="text-xs leading-[14px] font-normal max-w-full">
                <FormattedMessage id="mt.shouxufei" />
              </div>
            </div>
          </div>
          <div className="blur-item px-2 md:px-5 relative overflow-hidden flex flex-col h-full justify-center items-start border-r-gray-150 border-r md:col-span-4 col-span-6  ">
            <div className="z-10 max-w-full min-h-[72px]">
              <Statistic
                title={<></>}
                value={today?.interestFees}
                formatter={(val) => countUpFormatter(Number(val))}
                valueRender={(val) => <span className="text-xl leading-[21px] !font-dingpro-medium font-semibold">{val}</span>}
              />
              <div className="text-xs leading-[14px] font-normal max-w-full">
                <FormattedMessage id="mt.geyelixi" />
              </div>
            </div>
          </div>
          <div className="blur-item px-2 md:px-5 border-b-gray-150 border-b md:border-b-0 relative overflow-hidden flex flex-col h-full justify-center items-start md:col-span-4 col-span-12   border-t md:border-t-0 border-t-gray-150">
            <div className="z-10 max-w-full min-h-[72px]">
              <Statistic
                title={<></>}
                value={today?.profit}
                formatter={(val) => countUpFormatter(Number(val))}
                valueRender={(val) => <span className="text-xl leading-[21px] !font-dingpro-medium font-semibold">{val}</span>}
              />
              <div className="text-xs leading-[14px] font-normal max-w-full">
                <FormattedMessage id="mt.yishixianpingcangyingkui" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactECharts ref={chartRef} option={option} style={{ height: '100%', minHeight: 254, width: '100%' }} />
    </div>
  )
}
