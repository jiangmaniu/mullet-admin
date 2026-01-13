import { PageLoading, ProCard } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useModel, useParams } from '@umijs/max'
import { useRequest } from 'ahooks'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import Empty from '@/components/Base/Empty'
import { formatNum } from '@/pages/admin/crms'
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

  const date = useMemo(() => {
    return data?.data?.hourArr || []
  }, [data])

  const value = useMemo(() => {
    return data?.data?.hourCountArr || []
  }, [data])

  const option = useMemo(
    () =>
      ({
        legend: {
          show: false
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          top: '12%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: date,
            axisLine: {
              // 坐标轴
              show: true,
              onZero: true // 确保 x 轴在 y=0 处
            },
            axisTick: {
              // 刻度线
              show: true
            },
            axisLabel: {
              width: 24 // 设置 x 轴宽度为 24
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f0f0f0' // 设置辅助线颜色为浅灰色
              }
            },
            min: 'dataMin',
            max: 'dataMax'
          }
        ],
        series: [
          {
            // 浮动盈亏
            name: intl.formatMessage({ id: 'mt.fudongyingkui' }),
            type: 'bar',
            barWidth: 24,
            width: 40,
            stack: 'total',
            itemStyle: {
              decal: {
                rotation: -Math.PI / 7,
                symbol: 'rect',
                symbolSize: 4,
                color: 'rgba(255, 255, 255, 0.05)',
                dashArrayX: [1, 0],
                dashArrayY: [4, 16]
              },
              barBorderRadius: 4,
              // 正數是藍色，負數是橙色
              color: (params: any) => {
                const { value } = params
                return value > 0
                  ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#5462F1' },
                      { offset: 1, color: '#395EF3' }
                    ])
                  : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#F18F54' },
                      { offset: 1, color: '#FF7823' }
                    ])
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 6,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
            },
            label: {
              show: true,
              position: 'top',
              color: '#110e23', // 字体颜色
              fontFamily: 'dingpro-regular', // 字体系列
              fontSize: 12, // 字体大小
              formatter: (val: { value: any }) => (val.value === 0 ? '' : formatNum(val.value, { precision: 0 }))
            },
            data: value,
            z: 3
          }
        ]
      } as echarts.EChartOption),
    [value, date, intl]
  )

  useEffect(() => {
    setOptions(option as echarts.EChartOption)
  }, [option])

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
