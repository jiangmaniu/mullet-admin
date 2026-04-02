import './CoinDistribution.less'

import { useIntl } from '@umijs/max'
import { Tabs } from 'antd'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useMemo, useState } from 'react'

import { numberFormatUnit } from '@/utils/number'

interface CoinData {
  name: string
  icon?: string
  chainIcon?: string
  value: number
}

interface CoinDistributionProps {
  depositData: CoinData[]
  withdrawalData: CoinData[]
}

export default function CoinDistribution({ depositData, withdrawalData }: CoinDistributionProps) {
  const intl = useIntl()
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdrawal'>('deposit')

  const currentData = useMemo(() => {
    return activeTab === 'deposit' ? depositData : withdrawalData
  }, [activeTab, depositData, withdrawalData])

  const option = useMemo(() => {
    if (!currentData || currentData.length === 0) {
      return null
    }

    const coinNames = currentData.map((item) => item.name)
    const values = currentData.map((item) => item.value)
    const maxValue = Math.max(...values)

    return {
      grid: {
        left: 42,
        right: 80,
        top: 10,
        bottom: 10,
        containLabel: true
      },
      xAxis: {
        type: 'value',
        show: false,
        min: 0,
        max: maxValue * 1.2
      },
      yAxis: {
        type: 'category',
        data: coinNames,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          type: 'bar',
          data: values,
          barWidth: 32,
          itemStyle: {
            borderRadius: [0, 8, 8, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#FF9A3E' },
              { offset: 1, color: '#FFD13E' }
            ])
          },
          label: {
            show: true,
            position: 'right',
            color: '#110e23',
            fontSize: 14,
            fontWeight: 600,
            formatter: (params: any) => numberFormatUnit(params.value, { units: ['K', 'M'], precision: 2 })
          }
        }
      ]
    } as echarts.EChartOption
  }, [currentData])

  const calculateLabelTop = (index: number): number => {
    const chartHeight = 280
    const topPadding = 10 // grid.top
    const bottomPadding = 10 // grid.bottom
    const availableHeight = chartHeight - topPadding - bottomPadding
    const itemHeight = availableHeight / currentData.length
    // ECharts 的分类轴会将每个类别均匀分布在可用空间内
    // 每个类别的中心位置 = topPadding + (index + 0.5) * itemHeight
    // 向上调整 8px 以更好地对齐柱形图中心
    return topPadding + (index + 0.5) * itemHeight - 10
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

  if (!option) {
    return (
      <div className="flex flex-col gap-4">
        <Tabs activeKey={activeTab} items={tabItems} onChange={(key) => setActiveTab(key as 'deposit' | 'withdrawal')} />
        <div className="flex items-center justify-center h-[280px] text-gray-400">
          {intl.formatMessage({ id: 'fundManagement.statistics.noData' })} {/* 暫無數據 */}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Tabs activeKey={activeTab} items={tabItems} onChange={(key) => setActiveTab(key as 'deposit' | 'withdrawal')} />
      <div className="coin-distribution-container">
        <div className="custom-yaxis-labels" style={{ width: 40, height: 280 }}>
          {currentData.map((item, index) => (
            <div key={index} className="coin-label" style={{ top: calculateLabelTop(index) }}>
              {(item.icon || item.chainIcon) && (
                <div className="icon-container">
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="token-icon"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  {item.chainIcon && (
                    <img
                      src={item.chainIcon}
                      alt={`${item.name} chain`}
                      className="chain-icon"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <ReactECharts option={option} style={{ height: 280, width: '100%' }} notMerge lazyUpdate />
      </div>
    </div>
  )
}
