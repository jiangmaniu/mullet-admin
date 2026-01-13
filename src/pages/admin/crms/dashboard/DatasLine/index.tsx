import { useIntl } from '@umijs/max'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'

import { DEFAULT_PRECISION } from '@/constants'
import { colorToRGBA } from '@/utils/color'

import { formatNum } from '../..'

type IProps = {
  xAxis?: string[]
  series: any[]
}

export default (props: IProps) => {
  const intl = useIntl()

  // const xAxis = ['2-11', '2-12', '2-13', '2-14', '2-15', '2-16', intl.formatMessage({ id: 'mt.jinri' })]

  const series = props.series.map((item) => {
    return {
      name: item.name,
      type: 'line',
      // stack: '总量',
      lineStyle: {
        color: item.color,
        width: 1
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: colorToRGBA(item.color, 0.05)
          },
          {
            offset: 1,
            color: colorToRGBA(item.color, 0)
          }
        ])
      },
      smooth: true,
      showSymbol: false,
      emphasis: {
        focus: 'series'
      },

      data: item.data
    }
  })

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        // params 是一个数组，包含每个数据点的信息
        let content = `${params[0].axisValue}<br/>`
        params.forEach((item: any) => {
          content += `<div style="display: flex; width: 160px; justify-content: space-between;"><span>${item.marker} ${
            item.seriesName
          }:</span><span style="margin-left: auto;">${formatNum(item.value, { precision: DEFAULT_PRECISION })}</span></div>`
        })
        return content
      }
    },
    legend: {
      show: true,
      bottom: 0,
      orient: 'horizontal',
      icon: 'roundRect',
      itemWidth: 15,
      itemHeight: 5,
      itemStyle: {
        borderCap: 'round'
      },
      left: 'center',
      itemGap: 20
    },
    // visualMap: {
    //   top: 50,
    //   right: 10,
    //   pieces: [
    //     {
    //       gt: 0,
    //       lte: 50,
    //       color: '#93CE07'
    //     },
    //     {
    //       gt: 50,
    //       lte: 100,
    //       color: '#FBDB0F'
    //     },
    //     {
    //       gt: 100,
    //       lte: 150,
    //       color: '#FC7D02'
    //     },
    //     {
    //       gt: 150,
    //       lte: 200,
    //       color: '#FD0100'
    //     },
    //     {
    //       gt: 200,
    //       lte: 300,
    //       color: '#AA069F'
    //     },
    //     {
    //       gt: 300,
    //       color: '#AC3B2A'
    //     }
    //   ],
    //   outOfRange: {
    //     color: '#999'
    //   }
    // },
    grid: {
      left: '0%',
      right: '4%',
      bottom: 30,
      top: '4%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xAxis
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            dashOffest: 20,
            color: '#f0f0f0' // 设置辅助线颜色为浅灰色
          }
        }
      }
    ],
    series
  }

  return <ReactECharts option={option} style={{ height: 211, width: '100%' }} />
}
