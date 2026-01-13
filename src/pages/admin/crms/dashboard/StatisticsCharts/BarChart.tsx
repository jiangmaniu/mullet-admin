import { useModel } from '@umijs/max'
import * as echarts from 'echarts'
import { default as EChartsReact, default as ReactECharts } from 'echarts-for-react'
import { useEffect, useMemo, useRef } from 'react'

import { DEFAULT_PRECISION } from '@/constants'
import { formatTime } from '@/utils'
import { numberFormatUnit } from '@/utils/number'

import { formatNum } from '../..'
import { showTypes } from './chartConfig'

type IProps = {
  data: CrmTrading.StatisticsDayItem[]
  // showType: { label: string; value: string; [key: string]: any }[] // 多选
  showType: string // 单选
}

export default function BarChart({ data, showType }: IProps) {
  // const keys = showType?.map((item) => item.value) || [] // 多选
  const keys = [showTypes?.[showType]?.value] // 单选
  const raw = showTypes?.[showType]?.raw

  const hasShowType = useMemo(() => {
    return showType?.length > 0
  }, [showType])

  const dataSource = useMemo(() => {
    return [...data].reverse()
  }, [data])

  // 找到 data 中最大的值
  const [maxValue, minValue, hasNegative, hasPositive, hasFloat] = useMemo(() => {
    let values: number[] = []
    keys.forEach((key) => {
      values.push(...dataSource.map((item) => Number(item[key] ?? 0)))
    })

    return [
      Math.max(...values),
      Math.min(...values),
      values.some((value) => value < 0),
      values.some((value) => value > 0),
      values.some((value) => value !== 0 && value !== Math.floor(value))
    ]
  }, [dataSource, keys])

  const max = Math.max(Math.abs(maxValue), Math.abs(minValue))

  const series = useMemo(() => {
    return keys.map((key) => ({
      // name: showType.find((item) => item.value === key)?.label, // 多选
      name: showTypes?.[showType]?.label,
      type: 'bar',
      data: dataSource.map((item) => Number(item[key] ?? 0)),
      // barWidth: 42,
      // width: 65,
      maxBarWidth: 42,
      maxWidth: 65,
      barMaxWidth: 42,
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
        formatter: (val: { value: any }) =>
          val.value === 0 ? '' : numberFormatUnit(val.value, { precision: hasFloat ? DEFAULT_PRECISION : 0 })
      },
      tooltip: {
        show: true,
        formatter: (params: any) => {
          const item = dataSource[params[0].dataIndex] as CrmTrading.StatisticsDayItem
          const value = params[0].value
          const valueColor = value >= 0 ? '#395EF3' : '#FF7823'

          return `<div style="display:flex;flex-direction:column;align-items:start;width:180px;color:#110e23;gap:8px;padding:4px;">
            <span style="color:#6a7073;font-size:12px;font-weight:500;">${item.showDateStr}</span>
            <div style="width:100%;height:1px;background:#efefef;margin:2px 0;"></div>
            <div style="width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;">
              <span style="font-size:12px;font-weight:500;">${showTypes?.[showType]?.label}</span>
              <span style="font-size:14px;font-weight:600;color:${valueColor};">${
            raw
              ? formatNum(value, { precision: hasFloat ? DEFAULT_PRECISION : 0 })
              : numberFormatUnit(value, {
                  precision: hasFloat ? DEFAULT_PRECISION : 0
                })
          }</span>
            </div>
          </div>`
        }
      },
      z: 3
    }))
  }, [dataSource, keys, showType, hasFloat])

  // [
  //   {
  //     // 浮动盈亏
  //     name: getIntl().formatMessage({ id: 'mt.fudongyingkui' }),
  //     type: 'bar',
  //     barWidth: 42,
  //     width: 65,
  //     stack: 'total',
  //     itemStyle: {
  //       decal: {
  //         rotation: -Math.PI / 7,
  //         symbol: 'rect',
  //         symbolSize: 4,
  //         color: 'rgba(255, 255, 255, 0.05)',
  //         dashArrayX: [1, 0],
  //         dashArrayY: [4, 16]
  //       },
  //       barBorderRadius: 4,
  //       // 正數是藍色，負數是橙色
  //       color: (params: any) => {
  //         const { value } = params
  //         return value > 0
  //           ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //               { offset: 0, color: '#5462F1' },
  //               { offset: 1, color: '#395EF3' }
  //             ])
  //           : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //               { offset: 0, color: '#F18F54' },
  //               { offset: 1, color: '#FF7823' }
  //             ])
  //       }
  //     },
  //     emphasis: {
  //       itemStyle: {
  //         shadowBlur: 10,
  //         shadowColor: 'rgba(0, 0, 0, 0.5)',
  //         shadowOffsetX: 0,
  //         shadowOffsetY: 0
  //       }
  //     },
  //     label: {
  //       show: true,
  //       position: 'top',
  //       color: '#110e23', // 字体颜色
  //       fontFamily: 'dingpro-regular', // 字体系列
  //       fontSize: 12, // 字体大小
  //       formatter: (val: { value: any }) => (val.value === 0 ? '' : formatNum(val.value, { precision: DEFAULT_PRECISION }))
  //     },
  //     data: data7 && data7.length > 0 ? data7.map((item) => (item.profit && item.profit > 0 ? item.profit : 0)) : [],
  //     z: 3
  //   },

  //   {
  //     // 浮动盈亏
  //     name: intl.formatMessage({ id: 'mt.fudongyingkui' }),
  //     type: 'bar',
  //     barWidth: 42,
  //     width: 65,
  //     stack: 'total',
  //     itemStyle: {
  //       decal: {
  //         rotation: -Math.PI / 7,
  //         symbol: 'rect',
  //         symbolSize: 4,
  //         color: 'rgba(255, 255, 255, 0.05)',
  //         dashArrayX: [1, 0],
  //         dashArrayY: [4, 16]
  //       },
  //       barBorderRadius: 4,
  //       // 正數是藍色，負數是橙色
  //       color: (params: any) => {
  //         const { value } = params
  //         return value > 0
  //           ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //               { offset: 0, color: '#5462F1' },
  //               { offset: 1, color: '#395EF3' }
  //             ])
  //           : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //               { offset: 0, color: '#F18F54' },
  //               { offset: 1, color: '#FF7823' }
  //             ])
  //       }
  //     },
  //     emphasis: {
  //       itemStyle: {
  //         shadowBlur: 10,
  //         shadowColor: 'rgba(0, 0, 0, 0.5)',
  //         shadowOffsetX: 0,
  //         shadowOffsetY: 0
  //       }
  //     },
  //     label: {
  //       show: true,
  //       color: '#110e23', // 字体颜色
  //       position: 'bottom',
  //       fontFamily: 'dingpro-regular', // 字体系列
  //       fontSize: 12, // 字体大小
  //       formatter: (val: { value: any }) => (val.value === 0 ? '' : formatNum(val.value, { precision: DEFAULT_PRECISION }))
  //     },
  //     data: data7 && data7.length > 0 ? data7.map((item) => (item.profit && item.profit < 0 ? item.profit : 0)) : [],
  //     z: 3
  //   }
  // ]

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
          formatter: (params: any) => {
            const item = dataSource[params[0].dataIndex] as CrmTrading.StatisticsDayItem
            const value = params[0].value
            const valueColor = value >= 0 ? '#395EF3' : '#FF7823'

            return `<div style="display:flex;flex-direction:column;align-items:start;width:180px;color:#110e23;gap:2px;padding:2px;">
              <span style="color:#6a7073;font-size:12px;font-weight:500;">${item.showDateStr}</span>
              <div style="width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;">
                <span style="font-size:12px;font-weight:500;">${showTypes?.[showType]?.label}</span>
              </div>
                 <span style="font-size:14px;font-weight:600; font-family: dingpro-medium;">${
                   raw
                     ? formatNum(value, { precision: hasFloat ? DEFAULT_PRECISION : 0 })
                     : numberFormatUnit(value, {
                         precision: hasFloat ? DEFAULT_PRECISION : 0
                       })
                 }</span>
            </div>`
          }
          // position: function (point, params, dom, rect, size) {
          //   // 鼠标悬停位置
          //   // @ts-ignore
          //   return [point[0] - 150, point[1] - (size?.contentSize?.[1] ?? 0) - 60]
          // }
          //   formatter: (params: any) => {
          //     const item = data7[params[0].dataIndex] as CrmTrading.findCloseMoneyInfo
          //     if (!item) return ''
          //     return `<div style="display:flex;flex-direction:column;align-items:start; width:180px;height:128px;color:#110e23;gap:2px;">
          // <span style="color:#6a7073;font-size:12px;">${item.showDateStr}</span>
          // <span style="font-size:12px;font-weight:600;">${intl.formatMessage({ id: 'mt.pingtaijiesuanzijin' })}: ${formatNum(
          //       Number(item?.profit ?? 0) + Number(item?.interestFees ?? 0) + Number(item?.handlingFees ?? 0),
          //       { precision: DEFAULT_PRECISION }
          //     )}</span>
          // <div style="width:100%;height:1px;background:#efefef;margin: 4px 0 8px 0;" >
          // &nbsp;
          // </div>
          // <div style="font-weight:500;font-size:12px;width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;">
          //   <span>${intl.formatMessage({ id: 'mt.yishixianpingcangyingkui' })}</span>
          //   <span style="font-weight:600;">${formatNum(item.profit, { precision: DEFAULT_PRECISION })}</span>
          // </div>
          //  <div style="font-weight:500;font-size:12px;width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;">
          //   <span>${intl.formatMessage({ id: 'mt.geyelixi' })}</span>
          //   <span style="font-weight:600;">${formatNum(item.interestFees, { precision: DEFAULT_PRECISION })}</span>
          // </div>
          //  <div style="font-weight:500;font-size:12px;width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;">
          //   <span>${intl.formatMessage({ id: 'mt.shouxufei' })}</span>
          //   <span style="font-weight:600;">${formatNum(item.handlingFees, { precision: DEFAULT_PRECISION })}</span>
          // </div>
          // </div>`
          //   }
        },
        legend: {
          show: false
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '2%',
          top: '5%',
          containLabel: true
        },
        xAxis: [
          {
            show: true,
            type: 'category',
            data: dataSource.map((item) => formatTime(item.showDateStr, 'MM-DD')),
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
            min: hasNegative ? -max : 0,
            max: hasPositive ? max : 0,
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
        series,
        graphic: !hasShowType
          ? {
              type: 'text',
              left: 'center',
              top: 'middle',
              style: {
                text: 'No Data Available',
                fontSize: 20,
                fill: '#aaa'
              }
            }
          : null
      } as echarts.EChartOption),
    [dataSource, series, hasNegative]
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
    <div>
      <ReactECharts
        notMerge={true}
        lazyUpdate={true}
        ref={chartRef}
        option={option}
        style={{ height: 340, marginTop: 30, width: '100%' }}
      />
    </div>
  )
}
