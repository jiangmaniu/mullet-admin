import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

import { useEnv } from '@/context/envProvider'

export default function PieChart() {
  const { breakPoint } = useEnv()
  const [width, setWidth] = useState(600)

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 0,
      itemGap: 15
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['40%', breakPoint === 'xxl' ? '70%' : '65%'],
        avoidLabelOverlap: false,
        // @ts-ignore
        padAngle: 1,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  }

  useEffect(() => {
    // @ts-ignore
    const { width } = document.querySelector('.chart-wrap')?.getBoundingClientRect() || {}

    if (width) {
      setWidth(width)
    }
  }, [breakPoint])

  return (
    <>
      <ReactECharts option={option} style={{ height: 400, width }} />
    </>
  )
}
