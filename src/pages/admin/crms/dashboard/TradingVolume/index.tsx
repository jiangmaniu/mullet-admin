import { useIntl } from '@umijs/max'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useState } from 'react'

import { formatNum } from '../..'

type IProps = {
  kaicangliang?: number
  pingcangliang?: number
  benyueleiji?: number
}

/**
 * 累計盈虧
 */
export default ({ kaicangliang = 1548, pingcangliang = 878, benyueleiji = 12341 }: IProps) => {
  const intl = useIntl()

  const [data, setData] = useState<any[]>([
    { value: kaicangliang, name: intl.formatMessage({ id: 'mt.dangrikaicangliang' }) },
    { value: pingcangliang, name: intl.formatMessage({ id: 'mt.dangripingcangliang' }) }
  ])

  // 计算断点 angle
  const angle = (data[0].value / (data[0].value + data[1].value)) * 180

  /** start - 配置项 */
  const min = 100 // 每个柱状图宽度
  const padAngle = 1 // 同一颜色的柱状图之间的间隔角度
  const radius = ['115%', '160%'] // 饼图的半径
  const center = ['50%', '85%'] // 饼图的中心
  const commonOptions = {
    top: 0,
    radius,
    center,
    name: '蓝色部分',
    type: 'pie',
    legend: {
      position: ['50%', '90%']
    },
    selectedMode: 'series',
    itemStyle: {
      // color: '#4169E1',
      // 从上到下渐变色
      color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
        // { offset: 0, color: '#3044FF' },
        { offset: 0, color: '#395EF3' },
        { offset: 1, color: 'rgba(57,94,243,0.7)' }
      ]),
      borderRadius: 4
    },
    // @ts-ignore
    padAngle,
    label: {
      show: false,
      position: 'center'
    },
    labelLine: {
      show: false
    }
  }
  /** end - 配置项 */

  // 计算获得长度为 n / min 的数组，数组中的值相加等于 n，每个值差值为 min
  const data1 = Array.from({ length: Math.ceil(data[0].value / min) }, (_, i) => {
    return {
      value: min * (i + 1) < data[0].value ? min : data[0].value % min,
      name: intl.formatMessage({ id: 'mt.dangrikaicangliang' })
    }
  })

  const data2 = Array.from({ length: Math.ceil(data[1].value / min) }, (_, i) => {
    return {
      value: min * (i + 1) < data[1].value ? min : data[1].value % min,
      name: intl.formatMessage({ id: 'mt.dangripingcangliang' })
    }
  }).reverse()

  const option = {
    graphic: [
      {
        type: 'group',
        left: 0,
        top: 12,
        children: [
          {
            type: 'text',
            style: {
              text: intl.formatMessage({ id: 'mt.benyueleiji' }),
              fontSize: 14,
              lineHeight: 20,
              fontWeight: 500,
              fill: '#110e23'
            },
            position: [0, 0]
          }
        ]
      },
      {
        type: 'group',
        left: 0,
        top: 32,
        children: [
          {
            type: 'text',
            style: {
              text: benyueleiji,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: 500,
              fill: '#110e23'
            },
            position: [0, 0]
          }
        ]
      }
    ],
    legend: {
      orient: 'vertical',
      left: 'center',
      bottom: 30,
      itemGap: 4,
      formatter: function (name) {
        let target
        let index
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === name) {
            target = data[i]
            index = i
            break
          }
        }

        if (target) {
          const arr = ['{name|' + name + ': ' + target.value + '}']
          return arr.join('')
        }
        return name
      },
      textStyle: {
        rich: {
          name: {
            width: 100,
            color: '#110e23',
            fontWeight: 500,
            align: 'left',
            fontSize: 12,
            height: 20,
            lineHeight: 20
          }
        }
      }
    },
    series: [
      {
        ...commonOptions,
        startAngle: 180,
        endAngle: 180 - angle,
        data: data1,
        itemStyle: {
          // color: '#4169E1',
          // 从上到下渐变色
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            // { offset: 0, color: '#3044FF' },
            { offset: 0, color: '#395EF3' },
            { offset: 1, color: 'rgba(57,94,243,0.7)' }
          ]),
          borderRadius: 4
        },
        emphasis: {
          itemStyle: {
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          label: {
            show: true,
            // position: ['50%', '80%'],
            // center: true,
            offset: [0, -70],
            formatter: (params: any) => {
              return [`{name|$${formatNum(data[0].value)}}`].join('\n')
            },
            rich: {
              name: {
                fontSize: 28,
                lineHeight: 30,
                fontWeight: '600',
                color: '#110E23'
              }
            }
          }
        }
      },
      {
        ...commonOptions,
        startAngle: 180 - angle,
        endAngle: 0,
        data: data2,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            // { offset: 0, color: 'rgba(63,246,151,0.7)' },
            { offset: 0, color: '#3FF697' },
            { offset: 1, color: '#39F3C3' }
          ]),
          borderRadius: 4
        },
        emphasis: {
          itemStyle: {
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          label: {
            show: true,
            // position: ['50%', '80%'],
            // center: true,
            offset: [0, -70],
            formatter: (params: any) => {
              return [`{name|$${formatNum(data[1].value)}}`].join('\n')
            },
            rich: {
              name: {
                fontSize: 28,
                lineHeight: 30,
                fontWeight: '600',
                color: '#110E23'
              }
            }
          }
        }
      }
    ]
  } as echarts.EChartOption

  return (
    <div className=" flex flex-col gap-4 ">
      <ReactECharts option={option} style={{ height: 230, width: '100%' }} />
    </div>
  )
}
