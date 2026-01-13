import { useModel } from '@umijs/max'
import ReactECharts from 'echarts-for-react'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { DEFAULT_PRECISION } from '@/constants'
import { formatTime } from '@/utils'
import { numberFormatUnit } from '@/utils/number'

import { formatNum } from '../..'
import { showTypes } from './chartConfig'

type IProps = {
  data: CrmTrading.StatisticsDayItem[]
  // showType: { label: string; value: string; [key: string]: any }[] // 多选
  showType: string
}

function LineChart({ data, showType }: IProps) {
  const [options, setOptions] = useState<any>({})
  const instance = useRef<any>(null)
  const { sidebarCollapsed } = useModel('global')

  const keys = [showTypes?.[showType]?.value] // 单选
  const raw = showTypes?.[showType]?.raw

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

  const series = useMemo(() => {
    return (
      // 多选
      // showType?.map((item) => ({
      //   name: item.label,
      //   type: 'line',
      //   stack: 'Total',
      //   smooth: true,
      //   showSymbol: false,
      //   data: dataSource.map((i) => i?.[item.value] ?? 0)
      // })) || []

      // 单选
      showType
        ? [
            {
              name: showTypes[showType].label,
              type: 'line',
              stack: 'Total',
              smooth: true,
              showSymbol: false,
              data: dataSource.map((i) => i?.[showTypes[showType].value] ?? 0),
              itemStyle: {
                color: '#5462F1'
              }
            }
          ]
        : []
    )
  }, [showType, dataSource])

  const hasShowType = useMemo(() => {
    return showType?.length > 0
  }, [showType])

  useEffect(() => {
    // 截取最近14条
    // const dataSource = [...data].reverse()

    setOptions({
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
               <span style="font-size:14px;font-weight:600; font-family: dingpro-medium;">
               ${
                 raw
                   ? formatNum(value, { precision: hasFloat ? DEFAULT_PRECISION : 0 })
                   : numberFormatUnit(value, {
                       precision: hasFloat ? DEFAULT_PRECISION : 0
                     })
               }
               </span>
          </div>`
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '2%',
        top: '2%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#ccc',
            width: '1'
          }
        },
        axisLabel: {
          // rotate: sidebarCollapsed ? 0 : 45, // 将x轴的文字旋转45度
          textStyle: {
            color: '#6A7073'
          }
        },
        data: dataSource.map((item) => formatTime(item.showDateStr, 'MM-DD'))
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#f0f0f0' // 设置 y 轴轴线颜色
          }
        }
      },
      series: hasShowType ? series : [],
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
    })
  }, [sidebarCollapsed, series, dataSource, hasShowType])

  useEffect(() => {}, [options])

  // useEffect(() => {
  //   setTimeout(() => {
  //     // @ts-ignore
  //     const { width } = document.querySelector('.line-chart-wrapper')?.getBoundingClientRect() || {}

  //     if (width) {
  //       setWidth(width - 40)
  //     }
  //   }, 200)
  // }, [sidebarCollapsed])

  return (
    <div>
      <ReactECharts
        notMerge={true}
        lazyUpdate={true}
        option={options}
        ref={instance}
        style={{ height: 340, width: '100%', marginTop: 30 }}
      />
    </div>
  )
}

export default observer(LineChart)
