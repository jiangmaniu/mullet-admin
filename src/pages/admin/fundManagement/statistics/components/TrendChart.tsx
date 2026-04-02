import { useIntl } from '@umijs/max'
import ReactECharts from 'echarts-for-react'
import { useEffect, useMemo, useRef, useState } from 'react'

interface TrendChartProps {
  data: {
    time: string[] // ['1:00', '2:00', ...]
    deposit: number[] // 入金数据
    withdrawal: number[] // 出金数据
  }
}

function TrendChart({ data }: TrendChartProps) {
  const intl = useIntl()
  const [options, setOptions] = useState<any>({})
  const instance = useRef<any>(null)

  const hasData = useMemo(() => {
    return data.time.length > 0 && (data.deposit.some((v) => v !== 0) || data.withdrawal.some((v) => v !== 0))
  }, [data])

  useEffect(() => {
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          snap: true
        },
        formatter: (params: any) => {
          const time = params[0].axisValue
          let content = `<div style="padding:4px 8px;">
            <div style="color:#6a7073;font-size:12px;margin-bottom:4px;">${time}</div>`

          params.forEach((param: any) => {
            const color = param.color
            content += `<div style="display:flex;justify-content:space-between;align-items:center;gap:16px;">
              <span style="display:flex;align-items:center;gap:4px;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${color};"></span>
                <span style="font-size:12px;">${param.seriesName}</span>
              </span>
              <span style="font-size:14px;font-weight:600;font-family:dingpro-medium;">${param.value.toLocaleString()}</span>
            </div>`
          })

          content += `</div>`
          return content
        }
      },
      legend: {
        show: true,
        top: 0,
        right: 20,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          color: '#6a7073',
          fontSize: 12
        }
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '10%',
        top: '12%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.time,
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          color: '#6a7073',
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#f0f0f0'
          }
        },
        axisLabel: {
          color: '#6a7073',
          fontSize: 12
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
          zoomOnMouseWheel: true,
          moveOnMouseMove: true
        },
        {
          type: 'slider',
          start: 0,
          end: 100,
          height: 20,
          bottom: 10,
          borderColor: '#e5e5e5',
          fillerColor: 'rgba(91, 143, 249, 0.1)',
          handleStyle: {
            color: '#5B8FF9'
          },
          textStyle: {
            color: '#6a7073'
          }
        }
      ],
      series: hasData
        ? [
            {
              name: intl.formatMessage({ id: 'fundManagement.statistics.deposit' }), // 入金
              type: 'line',
              smooth: true,
              showSymbol: false,
              data: data.deposit,
              itemStyle: {
                color: '#5B8FF9'
              },
              lineStyle: {
                width: 2
              }
            },
            {
              name: intl.formatMessage({ id: 'fundManagement.statistics.withdrawal' }), // 出金
              type: 'line',
              smooth: true,
              showSymbol: false,
              data: data.withdrawal,
              itemStyle: {
                color: '#9270CA'
              },
              lineStyle: {
                width: 2
              }
            }
          ]
        : [],
      graphic: !hasData
        ? {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
              text: intl.formatMessage({ id: 'fundManagement.statistics.noData' }), // 暫無數據
              fontSize: 16,
              fill: '#aaa'
            }
          }
        : null
    })
  }, [data, hasData, intl])

  // 监听窗口大小变化，自动 resize
  useEffect(() => {
    const handleResize = () => {
      if (instance.current) {
        instance.current.getEchartsInstance().resize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactECharts
        ref={instance}
        option={options}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: 400, width: '100%' }}
      />
    </div>
  )
}

export default TrendChart

