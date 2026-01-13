import { useIntl, useModel } from '@umijs/max'
import ReactECharts from 'echarts-for-react'
import { useEffect, useRef, useState } from 'react'

import { DEFAULT_PRECISION } from '@/constants'
import { formatNum } from '@/pages/admin/crms'

type IProps = {
  data: any[]
}

export default function PieChart({ data }: IProps) {
  const [options, setOptions] = useState<any>({})
  const instance = useRef<any>(null)
  const intl = useIntl()
  // const [width, setWidth] = useState(600)
  const { sidebarCollapsed } = useModel('global')

  const totalValue = data.reduce((sum, item) => sum + item.value, 0)

  useEffect(() => {
    const echarts = instance.current?.echarts

    setOptions({
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          // @ts-ignore
          return `${params.name} ${formatNum(params.value, { precision: DEFAULT_PRECISION })}`
        }
      },
      grid: {
        containLabel: true,
        bottom: '4%',
        top: 0
      },

      // graphic: [
      //   {
      //     type: 'text',
      //     left: '30%', // 修改位置到饼状图中心
      //     top: '2%', // 修改位置到饼状图中心
      //     style: {
      //       backgroundColor: 'white',
      //       width: 100,
      //       text: `Total: ${totalValue}`, // 默认显示总和
      //       textAlign: 'center',
      //       fontSize: 16,
      //       fontWeight: 'bold'
      //     }
      //   }
      // ],
      legend: {
        orient: 'vertical',
        icon: 'rect',
        itemWidth: 30,
        itemHeight: 12,
        left: '65%',
        top: -4,
        symbolKeepAspect: true,
        itemStyle: {
          borderWidth: 0,
          alignSelf: 'self-end',
          verticalAlign: 'end',
          position: 'absolute',
          bottom: 0
        },
        // icon: 'circle',
        // itemWidth: 10,
        // itemHeight: 10,
        itemGap: 16
      },
      series: [
        {
          name: '',
          type: 'pie',
          top: 0,
          // padAngle: 0,
          radius: ['43%', '68%'],
          center: ['32%', '46%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderWidth: 5,
            borderColor: 'white',
            borderRadius: 6
          },
          label: {
            // show: false,
            position: 'outside'
            // formatter: '{b}\n\n{c}\n\n{d}%'
          },
          // itemStyle: {
          //   borderRadius: 10
          // },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
              formatter: '{b} {d}%'
            }
          },
          // labelLine: {
          //   show: false
          // },
          data
        }
      ]
    } as echarts.EChartOption)
  }, [data.length])

  // 事件处理函数
  const onEvents = {
    // // @ts-ignore
    // legendMouseover: (params) => {
    //   const chart = instance.current?.echarts
    //   chart.setOption({
    //     graphic: [
    //       {
    //         type: 'text',
    //         style: {
    //           text: ``
    //         }
    //       },
    //       {
    //         type: 'text',
    //         style: {
    //           text: ``
    //         }
    //       }
    //     ]
    //   })
    // },
    // // @ts-ignore
    // legendmouseout: (params) => {
    //   const chart = instance.current?.echarts
    //   chart.setOption({
    //     graphic: [
    //       {
    //         type: 'text',
    //         left: '15%', // 修改位置到饼状图中心
    //         top: '40%', // 修改位置到饼状图中心
    //         style: {
    //           backgroundColor: 'white',
    //           width: 100,
    //           text: `Total`, // 默认显示总和
    //           textAlign: 'center',
    //           fontSize: 16,
    //           fontWeight: 'bold'
    //         }
    //       },
    //       {
    //         type: 'text',
    //         left: '15%', // 修改位置到饼状图中心
    //         top: '47%', // 修改位置到饼状图中心
    //         style: {
    //           backgroundColor: 'white',
    //           width: 100,
    //           text: `${totalValue}`, // 默认显示总和
    //           textAlign: 'center',
    //           fontSize: 14
    //         }
    //       }
    //     ]
    //   })
    // },
    // @ts-ignore
    // mouseover: (params, chart) => {
    //   chart.setOption({
    //     graphic: [
    //       {
    //         type: 'text',
    //         style: {
    //           text: ``
    //         }
    //       },
    //       {
    //         type: 'text',
    //         style: {
    //           text: ``
    //         }
    //       }
    //     ]
    //   })
    // },
    // // @ts-ignore
    // mouseout: (params, chart) => {
    //   chart.setOption({
    //     graphic: [
    //       {
    //         type: 'text',
    //         left: '15%', // 修改位置到饼状图中心
    //         top: '40%', // 修改位置到饼状图中心
    //         style: {
    //           backgroundColor: 'white',
    //           width: 100,
    //           text: `Total`, // 默认显示总和
    //           textAlign: 'center',
    //           fontSize: 16,
    //           fontWeight: 'bold'
    //         }
    //       },
    //       {
    //         type: 'text',
    //         left: '15%', // 修改位置到饼状图中心
    //         top: '47%', // 修改位置到饼状图中心
    //         style: {
    //           backgroundColor: 'white',
    //           width: 100,
    //           text: `${totalValue}`, // 默认显示总和
    //           textAlign: 'center',
    //           fontSize: 14
    //         }
    //       }
    //     ]
    //   })
    // }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     // @ts-ignore
  //     const { width } = document.querySelector('.pie-chart-wrapper')?.getBoundingClientRect() || {}

  //     if (width) {
  //       setWidth(width - 40)
  //     }
  //   }, 200)
  // }, [sidebarCollapsed])

  return <ReactECharts option={options} ref={instance} onEvents={onEvents} style={{ height: 300, width: '100%' }} />
}
