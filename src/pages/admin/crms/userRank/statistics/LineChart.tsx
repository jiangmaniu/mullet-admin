import { useIntl, useModel } from '@umijs/max'
import ReactECharts from 'echarts-for-react'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import { formatTime } from '@/utils'

type IProps = {
  data: CrmTrading.StatisticsDayItem[]
}

function LineChart({ data }: IProps) {
  const [tabKey, setTabKey] = useState('1')
  const [options, setOptions] = useState<any>({})
  const instance = useRef<any>(null)
  const { sidebarCollapsed } = useModel('global')
  const [width, setWidth] = useState(800)
  const intl = useIntl()

  useEffect(() => {
    const echarts = instance.current?.echarts

    // 截取最近14条
    const dataSource = [...data].reverse()

    setOptions({
      tooltip: {
        trigger: 'axis'
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
        data: dataSource.map((item) => formatTime(item.createTime, 'YYYY.MM.DD'))
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#f0f0f0' // 设置 y 轴轴线颜色
          }
        }
        // axisTick: {
        //   show: true,  // 显示刻度线
        //   alignWithLabel: true,  // 刻度线和标签对齐
        //   lineStyle: {
        //     color: '#ccc'  // 刻度线颜色
        //   }
        // },
        // axisLine: {
        //   show: true,  // 显示坐标轴线
        //   lineStyle: {
        //     color: '#ccc'  // 坐标轴线颜色
        //   }
        // },
        // axisLabel: {
        //   textStyle: {
        //     color: '#6A7073'
        //   }
        // },
      },
      series: [
        {
          name: intl.formatMessage({ id: 'mt.xinzengyonghu' }),
          type: 'line',
          stack: 'Total',
          smooth: true,
          showSymbol: false,
          data: dataSource.map((item) => Number(item.newUser))
        },
        {
          name: intl.formatMessage({ id: 'mt.xinzengshoucirujinkehu' }),
          type: 'line',
          stack: 'Total',
          smooth: true,
          showSymbol: false,
          data: dataSource.map((item) => Number(item.newAUser))
        },
        {
          name: intl.formatMessage({ id: 'mt.dangrijiayiyonghu' }),
          type: 'line',
          stack: 'Total',
          smooth: true,
          showSymbol: false,
          data: dataSource.map((item) => Number(item.operationUser))
        }
      ]
    })
  }, [sidebarCollapsed, data])

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
      <ReactECharts option={options} ref={instance} style={{ height: 340, width: '100%', marginTop: 30 }} />
    </div>
  )
}

export default observer(LineChart)
