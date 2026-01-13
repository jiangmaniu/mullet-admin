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

    setOptions({
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false // 不显示坐标轴刻度线
        },
        axisLine: {
          show: false // 不显示坐标轴线
        },
        // axisLabel: {
        //  show: false, // 不显示坐标轴上的文字
        // },
        splitLine: {
          show: false // 不显示网格线
        },
        // data: ['4小时', '8小时', '12小时', '16小时', '20小时', '24小时']
        data: data?.data?.hourArr || []
      },
      yAxis: {
        show: false,
        type: 'value',
        splitLine: {
          show: false // 不显示刻度线
        }
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
      series: [
        {
          // data: [100, 20, 15, 70, 60, 90],
          data: data?.data?.hourCountArr || [],
          type: 'bar',
          itemStyle: {
            borderRadius: 4,
            color: '#5462F1'
          },
          barWidth: 45
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
    >
      {!loading && !noData && <ReactECharts option={options} ref={instance} style={{ height: 300, width: '100%' }} />}
      {loading && <PageLoading />}
      {noData && <Empty />}
    </ProCard>
  )
}
