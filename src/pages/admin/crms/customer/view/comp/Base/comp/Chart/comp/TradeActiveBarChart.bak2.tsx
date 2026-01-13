import { PageLoading, ProCard } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useModel, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import ReactECharts from 'echarts-for-react'
import { useEffect, useRef, useState } from 'react'

import Empty from '@/components/Base/Empty'
import { getUserDealHour } from '@/services/api/crmManage/client'

// 交易活跃时间
export default function TradeActiveBarChart() {
  const [options, setOptions] = useState<any>({})
  const instance = useRef<any>(null)
  const intl = useIntl()
  const [width, setWidth] = useState(300)
  const { sidebarCollapsed } = useModel('global')
  const { id } = useParams()

  const { loading, data, run } = useRequest(getUserDealHour, { manual: true })
  const noData = !data?.data?.hourArr?.length

  useEffect(() => {
    run({ clientId: id })
  }, [id])

  useEffect(() => {
    const echarts = instance.current?.echarts

    const hourArr = data?.data?.hourArr || []
    const hourCountArr = data?.data?.hourCountArr || []
    // 按交易量从大到小排序
    const sortedData = hourArr
      .map((hour, index) => ({
        value: hourCountArr[index],
        label: `${hour}:00`
      }))
      .filter((item) => item.value)
      .sort((a, b) => a.value - b.value)

    setOptions({
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
        left: '0%',
        // right: '10%',
        top: '0%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#f0f0f0' // 设置 y 轴轴线颜色
          }
        },
        boundaryGap: [0, 0.01]
      },
      aria: {
        enabled: true,
        decal: {
          show: true,
          decals: {
            // color: '#5470f3',
            color: 'rgba(255,255,255,0.1)',
            dashArrayX: [10, 0], // 表示图案和空白依次为数组值的循环
            dashArrayY: [12, 14], // 表示图案和空白依次为数组值的循环
            rotation: -Math.PI / 3.6
          }
        }
      },
      yAxis: {
        type: 'category',
        data: sortedData.map((item) => item.label),
        axisTick: {
          lineStyle: {
            color: '#fff' // 设置y轴刻度线颜色为灰色
          }
        },
        axisLine: {
          lineStyle: {
            color: '#ccc' // 设置y轴线颜色为灰色
          }
        },
        axisLabel: {
          textStyle: {
            color: '#6A7073' // 设置y轴文字颜色
          }
        },
        // 添加滚动条
        axisPointer: {
          type: 'shadow'
        }
      },
      dataZoom: [
        {
          labelFormatter: '',
          type: 'slider',
          yAxisIndex: 0,
          // @ts-ignore
          width: 10,
          top: 0,
          right: 0,
          start: 50,
          end: 100 // 默认显示25%的数据，即6个小时
        }
      ],
      series: [
        {
          name: intl.formatMessage({ id: 'mt.jiaoyiliang' }),
          type: 'bar',
          barWidth: 12,
          barGap: 5,
          data: sortedData.map((item) => item.value)
        }
      ]
    } as echarts.EChartOption)
  }, [data])

  // useEffect(() => {
  //   setTimeout(() => {
  //     // @ts-ignore
  //     const { width } = document.querySelector('.pie-chart-wrapper')?.getBoundingClientRect() || {}

  //     if (width) {
  //       setWidth(width - 40)
  //     }
  //   }, 200)
  // }, [sidebarCollapsed])

  return (
    <ProCard
      ghost
      title={
        <div className="flex items-center mb-3">
          <span className="text-gray font-semibold text-xl mr-3">
            <FormattedMessage id="mt.jiaoyihuoyueshijiantubiao" />
          </span>
        </div>
      }
      bodyStyle={{ paddingRight: 20 }}
    >
      {!loading && !noData && <ReactECharts option={options} ref={instance} style={{ height: 300, width: '100%' }} />}
      {loading && <PageLoading />}
      {noData && <Empty />}
    </ProCard>
  )
}
