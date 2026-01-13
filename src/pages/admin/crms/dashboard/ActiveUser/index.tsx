import { FormattedMessage, useIntl } from '@umijs/max'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'

import CountUpFormatter from '@/components/Base/CountUpFormatter'

type IProps = {
  jiaoyi?: number
  denglu?: number
}

/**
 * 累計盈虧
 */
export default ({ jiaoyi = 442, denglu = 1123 }: IProps) => {
  const intl = useIntl()

  const jiaoyihuoyue = intl.formatMessage({ id: 'mt.jiaoyihuoyue' })
  const dengluhuoyue = intl.formatMessage({ id: 'mt.dengluhuoyue' })

  // 计算最大值
  let maxValue = denglu

  const rawData = [jiaoyi, denglu]

  // 计算每个数据相对于最大值的百分比, 浮点数保留两位小数
  let percentageData = rawData.map(function (value) {
    return Math.round((value / maxValue) * 100 * 100) / 100
  })

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      show: false
    },
    grid: {
      top: '0%',
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: false
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          // 坐标轴
          show: false
        },
        axisTick: {
          // 刻度线
          show: false
        },
        show: false
      }
    ],
    yAxis: [
      {
        type: 'category',
        data: [intl.formatMessage({ id: 'mt.dangrihuoyueyonghu' })],
        show: false
      }
    ],

    // graphic: [
    //   {
    //     type: 'group',
    //     left: 30,
    //     bottom: 30,
    //     children: [
    //       {
    //         type: 'text',
    //         style: {
    //           text: `${jiaoyi}`,
    //           fill: '#110e23', // 字体颜色
    //           fontWeight: 'bold', // 字体粗细
    //           fontFamily: 'dingpro-medium', // 字体系列
    //           fontSize: 20 // 字体大小
    //         },
    //         position: [0, 0]
    //       }
    //     ]
    //   },
    //   {
    //     type: 'group',
    //     left: 30,
    //     bottom: 30,
    //     children: [
    //       {
    //         type: 'text',
    //         style: {
    //           text: `${denglu}`,
    //           fill: '#110e23', // 字体颜色
    //           fontWeight: 'bold', // 字体粗细
    //           fontFamily: 'dingpro-medium', // 字体系列
    //           fontSize: 20 // 字体大小
    //         },
    //         position: [0, 0]
    //       }
    //     ]
    //   },
    //   {
    //     type: 'group',
    //     left: 30,
    //     bottom: 70,
    //     children: [
    //       {
    //         type: 'text',
    //         style: {
    //           text: `${jiaoyihuoyue}`,
    //           font: '400 12px',
    //           fill: '#6a7073'
    //         },
    //         position: [0, 0]
    //       }
    //     ]
    //   },
    //   {
    //     type: 'group',
    //     right: 30,
    //     bottom: 70,
    //     children: [
    //       {
    //         type: 'text',
    //         style: {
    //           text: `${dengluhuoyue}`,
    //           font: '400 12px',
    //           fill: '#6a7073'
    //         },
    //         position: [0, 0]
    //       }
    //     ]
    //   }
    // ],
    series: [
      {
        // 浮动盈亏
        name: intl.formatMessage({ id: 'mt.fudongyingkui' }),
        type: 'bar',
        barWidth: 300,
        width: 300,
        height: 28,

        itemStyle: {
          decal: {
            rotation: Math.PI / 3,
            symbol: 'rect',
            symbolSize: 4,
            color: 'rgba(255, 255, 255, 0.1)',
            dashArrayX: [1, 0],
            dashArrayY: [4, 16]
          },
          barBorderRadius: 8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3FF697' },
            { offset: 1, color: '#39F3C3' }
          ])
        },
        label: {
          show: true,
          color: '#110e23', // 字体颜色
          fontWeight: 'bold', // 字体粗细
          fontFamily: 'dingpro-medium', // 字体系列
          fontSize: 18, // 字体大小
          formatter: () => percentageData[0] + '%'
        },
        data: [
          {
            value: percentageData[0],
            label: {
              position: percentageData[0] > 75 ? 'insideRight' : percentageData[0] > 25 ? 'inside' : 'right'
            }
          }
        ],
        z: 3
      },
      {
        // 保证金头寸
        name: intl.formatMessage({ id: 'mt.baozhengjintoucun' }),
        type: 'bar',
        barWidth: 300,
        width: 300,
        height: 28,
        barGap: '-100%',
        label: {
          show: false
        },
        data: [{ value: percentageData[1], label: { position: 'insideRight' } }],
        itemStyle: {
          decal: {
            rotation: Math.PI / 3,
            symbol: 'rect',
            symbolSize: 4,
            color: 'rgba(255, 255, 255, 0.1)',
            dashArrayX: [1, 0],
            dashArrayY: [4, 16]
          },
          barBorderRadius: 8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5462F1' },
            { offset: 1, color: '#395EF3' }
          ])
        },
        z: 2
      }
    ]
  } as echarts.EChartOption

  return (
    <div className=" flex flex-col gap-4 ">
      <div className="flex flex-col justify-between flex-shrink-0 flex-1 flex-grow gap-16 h-[210px]">
        <div className="flex flex-col gap-2">
          <span className="text-3xl !font-dingpro-medium font-semibold back">
            <CountUpFormatter end={10221} />
          </span>
          <span className=" text-sm font-medium text-gray">
            <FormattedMessage id="mt.benyueleiji" />
            &nbsp;
            <span className=" !font-dingpro-medium">
              <CountUpFormatter end={102241} />
            </span>
          </span>
        </div>
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col">
            <span className=" text-xs font-normal text-gray-600">
              <FormattedMessage id="mt.jiaoyihuoyue" />
            </span>
            <span className="text-xl leading-5 !font-dingpro-medium font-semibold">
              <CountUpFormatter end={jiaoyi} />
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className=" text-xs font-normal text-gray-600">
              <FormattedMessage id="mt.dengluhuoyue" />
            </span>
            <span className="text-xl leading-5 !font-dingpro-medium font-semibold">
              <CountUpFormatter end={denglu} />
            </span>
            {/* <Statistic

              title={
                <span className=" text-xs font-normal text-gray-600">
                  <FormattedMessage id="mt.dengluhuoyue" />
                </span>
              }
              value={1123}
              formatter={(val) => countUpFormatter(Number(val))}
              valueRender={(val) => <span className="text-xl leading-5 !font-dingpro-medium font-semibold">{val}</span>}
            /> */}
          </div>
        </div>
      </div>
      <ReactECharts option={option} style={{ height: 26, width: '100%' }} />
    </div>
  )
}
