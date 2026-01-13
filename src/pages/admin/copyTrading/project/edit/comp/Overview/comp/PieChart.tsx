import { useIntl, useModel } from '@umijs/max'
import ReactECharts from 'echarts-for-react'
import { useEffect, useRef, useState } from 'react'

export default function PieChart({ datas }: { datas: Record<string, any>[] }) {
  const [options, setOptions] = useState<any>({})
  const instance = useRef<any>(null)
  const intl = useIntl()
  const [width, setWidth] = useState(500)
  const { sidebarCollapsed } = useModel('global')

  /** 只显示前十个 */
  const data = datas
    .map((item) => {
      return {
        value: item.tradeCount,
        name: item.symbol,
        meta: {
          profit: item.profit,
          rate: item.rate
        }
      }
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)

  // const data = [
  //   { value: 89, name: 'BTCUSDT', meta: { profit: 1234, rate: 88 } },
  //   { value: 120, name: 'ETHUSDT', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'GOLD', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'SILVER', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'EURJPY', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'AUDUSD', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'XUGUSD', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'XUGUSD1', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'XUGUSD2', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'XUGUSD3', meta: { profit: -1234, rate: 45.12 } },

  //   { value: 120, name: 'EURJPY33', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'AUDUSD22', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'XUGUSD11', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'XUGUSD13', meta: { profit: -1234, rate: 45.12 } },
  //   { value: 120, name: 'XUGUSD24', meta: { profit: -1234, rate: 45.12 } }
  // ]
  //   .sort((a, b) => b.value - a.value)
  //   .slice(0, 10)

  useEffect(() => {
    const echarts = instance.current?.echarts

    setOptions({
      tooltip: {
        trigger: 'item'
      },
      // color: ['#45A48A', '#183EFC', '#32cd32', '#da70d6', '#6495ed', '#45A48A', '#183EFC', '#45A48A', '#183EFC', '#32cd32'],
      graphic: [
        {
          type: 'group',
          right: 10,
          top: 10,
          children: [
            {
              type: 'text',
              style: {
                text: `交易对                    交易次数                交易盈亏`,
                font: 'bold 12px Arial',
                fill: '#666'
              },
              position: [0, 0]
            }
          ]
        }
      ],
      legend: {
        orient: 'vertical',
        right: 0,
        top: 30,
        symbolKeepAspect: true,
        // padding: 10,
        formatter: function (name) {
          let target = data.find((item) => item.name === name)

          if (target) {
            const arr = [
              '{name|' + name + '}',
              '{value|' + target.value + '}',
              target.meta.profit > 0 ? '{amount1|' + target.meta.profit + ' USD}' : '{amount2|' + target.meta.profit + ' USD}'
            ]

            return arr.join('')
          }
          return name
        },
        icon: 'circle',
        itemStyle: {
          borderWidth: 0,
          alignSelf: 'self-end',
          verticalAlign: 'end',
          position: 'absolute',
          bottom: 0
        },
        itemWidth: 6,
        itemHeight: 6,
        itemGap: 10,
        textStyle: {
          rich: {
            title: {
              width: 80,
              align: 'center',
              fontSize: 12,
              fontWeight: 'bold',
              padding: [0, 0, 5, 0],
              color: '#666'
            },
            hr: {
              width: '100%',
              borderColor: '#aaa',
              borderWidth: 0.5,
              height: 0,
              lineHeight: 10
            },
            blank: {
              height: 1,
              lineHeight: 1
            },
            name: {
              width: 80,
              align: 'left',
              fontSize: 14,
              color: '#061c2c',
              fontWeight: 500,
              height: 20,
              lineHeight: 20
            },
            value: {
              width: 80,
              align: 'center',
              fontSize: 14,
              color: '#061c2c',
              fontWeight: 500,
              height: 20,
              lineHeight: 20
            },
            amount1: {
              width: 80,
              align: 'right',
              color: '#45a48a',
              fontSize: 14,
              fontWeight: 500,
              height: 20,
              lineHeight: 20
            },
            amount2: {
              width: 80,
              align: 'right',
              color: '#c54747',
              fontSize: 14,
              fontWeight: 500,
              height: 20,
              lineHeight: 20
            }
          }
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          top: 40,
          radius: ['43%', '60%'],
          center: ['20%', '35%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
            formatter: (e: any) => {
              return `${e?.data?.name} \n\n ${e?.data?.meta?.rate}%`
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          // itemStyle: {
          //   color: function (params: any) {
          //     // 预定义颜色数组
          //     const colors = ['#45A48A', '#183EFC', '#32cd32', '#da70d6', '#6495ed', '#45A48A', '#183EFC', '#45A48A', '#183EFC', '#32cd32']
          //     return colors[params.dataIndex]
          //   }
          // },
          data
        }
      ]
    } as echarts.EChartOption)
  }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     // @ts-ignore
  //     const { width } = document.querySelector('.pie-chart-wrapper')?.getBoundingClientRect() || {}

  //     if (width) {
  //       setWidth(width - 40)
  //     }
  //   }, 200)
  // }, [sidebarCollapsed])

  return <ReactECharts option={options} ref={instance} style={{ height: 360 }} />
}
