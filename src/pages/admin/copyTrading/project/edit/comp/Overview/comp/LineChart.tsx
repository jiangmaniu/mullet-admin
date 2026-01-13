import { useIntl, useModel } from '@umijs/max'
import ReactECharts from 'echarts-for-react'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import ProFormSegmented from '@/components/Admin/Form/ProFormSegmented'

function LineChart() {
  const [tabKey, setTabKey] = useState('1')
  const [options, setOptions] = useState<any>({})
  const instance = useRef<any>(null)
  const { sidebarCollapsed } = useModel('global')
  const [width, setWidth] = useState(300)
  const intl = useIntl()

  const tabOptions = [
    { label: intl.formatMessage({ id: 'mt.shouyilv' }), value: '1' },
    { label: intl.formatMessage({ id: 'mt.yingkuie' }), value: '2' }
  ]

  const selectItem = tabOptions.find((item) => item.value === tabKey)

  const isRate = tabKey === '1'

  useEffect(() => {
    const echarts = instance.current?.echarts

    setOptions({
      tooltip: {
        trigger: 'axis',
        formatter: (value: any) => {
          const item = value[0] || {}
          return `${item.seriesName} ${item.value}${isRate ? '%' : ''}`
        }
      },
      legend: {
        data: []
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '2%',
        top: '2%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#F0F0F0',
              width: '1'
            }
          },
          axisLabel: {
            rotate: sidebarCollapsed ? 0 : 45, // 将x轴的文字旋转45度
            textStyle: {
              color: '#6A7073'
            }
          },
          data: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6']
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#f0f0f0' // 设置 y 轴轴线颜色
            }
          },
          axisLabel: {
            formatter: isRate ? '{value}%' : '{value}',
            textStyle: {
              color: '#6A7073'
            }
          }
        }
      ],
      series: [
        {
          name: selectItem?.label,
          type: 'line',
          lineStyle: {
            color: '#183EFC',
            width: 1
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(24, 62, 252, 0.1)'
              },
              {
                offset: 1,
                color: 'rgba(24,62,252,0)'
              }
            ])
          },
          showSymbol: false,
          emphasis: {
            // focus: 'series'
          },

          data: isRate ? [1, 4, 6, 10, 5, 10] : [50, 100, 340, 250, 380, 160, 300]
        }
      ]
    })
  }, [tabKey, sidebarCollapsed])

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      const { width } = document.querySelector('.line-chart-wrapper')?.getBoundingClientRect() || {}

      if (width) {
        setWidth(width - 40)
      }
    }, 200)
  }, [sidebarCollapsed])

  return (
    <div>
      <ProFormSegmented
        request={async () => tabOptions}
        fieldProps={{
          size: 'small',
          value: tabKey,
          onChange: (value: any) => {
            setTabKey(value)
          }
        }}
      />
      <ReactECharts option={options} ref={instance} style={{ height: 260, width, marginTop: 30 }} />
    </div>
  )
}

export default observer(LineChart)
