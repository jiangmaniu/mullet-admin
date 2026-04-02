import { useIntl } from '@umijs/max'
import { Tabs } from 'antd'
import type { EChartOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useState } from 'react'

interface ChannelData {
  name: string
  value: number
}

interface ChannelDistributionProps {
  depositData: ChannelData[]
  withdrawalData: ChannelData[]
}

const COLORS = ['#5B8FF9', '#5AD8A6', '#5D7092']

export default function ChannelDistribution({ depositData, withdrawalData }: ChannelDistributionProps) {
  const intl = useIntl()
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdrawal'>('deposit')

  const currentData = activeTab === 'deposit' ? depositData : withdrawalData

  const total = currentData.reduce((sum, item) => sum + item.value, 0)

  const option: EChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const percent = ((params.value / total) * 100).toFixed(2)
        return `${params.name}: $${params.value.toLocaleString()} (${percent}%)`
      }
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      itemGap: 20,
      formatter: (name: string) => {
        const item = currentData.find((d) => d.name === name)
        if (item) {
          const percent = ((item.value / total) * 100).toFixed(1)
          return `{name|${name}} {value|$${item.value.toLocaleString()}} {percent|(${percent}%)}`
        }
        return name
      },
      textStyle: {
        rich: {
          name: {
            fontSize: 14,
            color: '#110e23',
            fontWeight: 500
          },
          value: {
            fontSize: 14,
            color: '#110e23',
            fontWeight: 500,
            padding: [0, 8, 0, 8]
          },
          percent: {
            fontSize: 12,
            color: '#666',
            fontWeight: 400
          }
        }
      }
    },
    color: COLORS,
    series: [
      {
        name: intl.formatMessage({ id: 'fundManagement.statistics.channelDistributionChart' }), // 通道分佈
        type: 'pie',
        radius: ['40%', '68%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderWidth: 3,
          borderColor: '#fff',
          borderRadius: 8
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            formatter: (params: any) => {
              const percent = ((params.value / total) * 100).toFixed(1)
              return `{name|${params.name}}\n{value|$${params.value.toLocaleString()}}\n{percent|${percent}%}`
            },
            rich: {
              name: {
                fontSize: 14,
                color: '#110e23',
                fontWeight: 400
              },
              value: {
                fontSize: 20,
                color: '#110e23',
                fontWeight: 600,
                padding: [8, 0, 4, 0]
              },
              percent: {
                fontSize: 14,
                color: '#666',
                fontWeight: 400
              }
            }
          }
        },
        labelLine: {
          show: false
        },
        data: currentData.map((item, index) => ({
          ...item,
          itemStyle: {
            color: COLORS[index % COLORS.length]
          }
        }))
      }
    ]
  }

  const tabItems = [
    {
      key: 'deposit',
      label: intl.formatMessage({ id: 'fundManagement.statistics.deposit' }) // 入金
    },
    {
      key: 'withdrawal',
      label: intl.formatMessage({ id: 'fundManagement.statistics.withdrawal' }) // 出金
    }
  ]

  return (
    <div className="flex flex-col gap-4">
      <Tabs activeKey={activeTab} items={tabItems} onChange={(key) => setActiveTab(key as 'deposit' | 'withdrawal')} />
      <ReactECharts option={option} style={{ height: 280, width: '100%' }} />
    </div>
  )
}

