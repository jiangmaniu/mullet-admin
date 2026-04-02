import './index.less'

import { ProCard, ProFormDateRangePicker } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Alert, Col, Form, Row, Spin } from 'antd'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { getFundOverview } from '@/services/api/fundManagement'

import ChannelDistribution from './components/ChannelDistribution'
import CoinDistribution from './components/CoinDistribution'
import StatisticCards from './components/StatisticCards'
import TrendChart from './components/TrendChart'

// 通道名称映射
const getChannelNameMap = (intl: any): Record<string, string> => ({
  direct: intl.formatMessage({ id: 'fundManagement.statistics.channelWallet' }), // Wallet
  swap: intl.formatMessage({ id: 'fundManagement.statistics.channelSwap' }), // Swap
  bridge_eth: intl.formatMessage({ id: 'fundManagement.statistics.channelBridgeEth' }), // Bridge(ETH)
  bridge_sol: intl.formatMessage({ id: 'fundManagement.statistics.channelBridgeSol' }), // Bridge(SOL)
  bridge_tron: intl.formatMessage({ id: 'fundManagement.statistics.channelBridgeTron' }), // Bridge(TRON)
  bridge_bsc: intl.formatMessage({ id: 'fundManagement.statistics.channelBridgeBsc' }) // Bridge(BSC)
})

// 提取币种名称（从 SOL_USDC 提取 USDC）
const extractTokenName = (tokenId: string): string => {
  const parts = tokenId.split('_')
  return parts.length > 1 ? parts[parts.length - 1] : tokenId
}

export default function Statistics() {
  const intl = useIntl()
  const [form] = Form.useForm()

  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs().subtract(7, 'day'), dayjs()])

  // 通道名称映射
  const CHANNEL_NAME_MAP = getChannelNameMap(intl)

  // 请求参数
  const requestParams = useMemo(
    () => ({
      startTime: dateRange[0].startOf('day').valueOf(),
      endTime: dateRange[1].endOf('day').valueOf(),
      granularity: 'auto' as const
    }),
    [dateRange]
  )

  // 获取出入金统计数据
  const {
    data: apiData,
    loading,
    error
  } = useRequest(() => getFundOverview(requestParams), {
    refreshDeps: [requestParams]
  })

  // 转换统计卡片数据
  const statisticData = useMemo(() => {
    if (!apiData?.data) {
      return {
        todayDeposit: {
          title: intl.formatMessage({ id: 'fundManagement.statistics.todayDeposit' }), // 今日入金
          value: 0,
          unit: 'USDC',
          change: null,
          changeType: 'unchanged' as const
        },
        todayWithdrawal: {
          title: intl.formatMessage({ id: 'fundManagement.statistics.todayWithdrawal' }), // 今日出金
          value: 0,
          unit: 'USDC',
          change: null,
          changeType: 'unchanged' as const
        },
        totalDeposit: {
          title: intl.formatMessage({ id: 'fundManagement.statistics.totalDeposit' }), // 累計入金
          value: 0,
          unit: 'USDC',
          change: null,
          changeType: 'unchanged' as const
        },
        totalWithdrawal: {
          title: intl.formatMessage({ id: 'fundManagement.statistics.totalWithdrawal' }), // 累計出金
          value: 0,
          unit: 'USDC',
          change: null,
          changeType: 'unchanged' as const
        }
      }
    }

    const { todaySummary, allTimeSummary } = apiData.data
    return {
      todayDeposit: {
        title: intl.formatMessage({ id: 'fundManagement.statistics.todayDeposit' }), // 今日入金
        value: todaySummary.deposit.totalDisplay,
        unit: 'USDC',
        change: todaySummary.deposit.changePercent,
        changeType: (todaySummary.deposit.changeDirection || 'unchanged') as 'up' | 'down' | 'unchanged'
      },
      todayWithdrawal: {
        title: intl.formatMessage({ id: 'fundManagement.statistics.todayWithdrawal' }), // 今日出金
        value: todaySummary.withdrawal.totalDisplay,
        unit: 'USDC',
        change: todaySummary.withdrawal.changePercent,
        changeType: (todaySummary.withdrawal.changeDirection || 'unchanged') as 'up' | 'down' | 'unchanged'
      },
      totalDeposit: {
        title: intl.formatMessage({ id: 'fundManagement.statistics.totalDeposit' }), // 累計入金
        value: allTimeSummary.deposit.totalDisplay,
        unit: 'USDC',
        change: allTimeSummary.deposit.changePercent,
        changeType: (allTimeSummary.deposit.changeDirection || 'unchanged') as 'up' | 'down' | 'unchanged'
      },
      totalWithdrawal: {
        title: intl.formatMessage({ id: 'fundManagement.statistics.totalWithdrawal' }), // 累計出金
        value: allTimeSummary.withdrawal.totalDisplay,
        unit: 'USDC',
        change: allTimeSummary.withdrawal.changePercent,
        changeType: (allTimeSummary.withdrawal.changeDirection || 'unchanged') as 'up' | 'down' | 'unchanged'
      }
    }
  }, [apiData, intl])

  // 转换趋势图数据
  const trendData = useMemo(() => {
    if (!apiData?.data?.timeSeries) {
      return { time: [], deposit: [], withdrawal: [] }
    }

    const { timeSeries } = apiData.data
    return {
      time: timeSeries.map((item) => item.time),
      deposit: timeSeries.map((item) => Number(item.depositAmount)),
      withdrawal: timeSeries.map((item) => Number(item.withdrawalAmount))
    }
  }, [apiData])

  // 转换币种分布数据
  const coinDepositData = useMemo(() => {
    if (!apiData?.data?.tokenBreakdown?.deposit) return []
    return apiData.data.tokenBreakdown.deposit.map((item) => ({
      name: extractTokenName(item.tokenId),
      icon: item.logoUrl,
      chainIcon: item.chainLogoUrl,
      value: Number(item.amountDisplay)
    }))
  }, [apiData])

  const coinWithdrawalData = useMemo(() => {
    if (!apiData?.data?.tokenBreakdown?.withdrawal) return []
    return apiData.data.tokenBreakdown.withdrawal.map((item) => ({
      name: extractTokenName(item.tokenId),
      icon: item.logoUrl,
      chainIcon: item.chainLogoUrl,
      value: Number(item.amountDisplay)
    }))
  }, [apiData])

  // 转换通道分布数据
  const channelDepositData = useMemo(() => {
    if (!apiData?.data?.channelBreakdown?.deposit) return []
    return apiData.data.channelBreakdown.deposit.map((item) => ({
      name: CHANNEL_NAME_MAP[item.channel] || item.channel,
      value: Number(item.amountDisplay)
    }))
  }, [apiData])

  const channelWithdrawalData = useMemo(() => {
    if (!apiData?.data?.channelBreakdown?.withdrawal) return []
    return apiData.data.channelBreakdown.withdrawal.map((item) => ({
      name: CHANNEL_NAME_MAP[item.channel] || item.channel,
      value: Number(item.amountDisplay)
    }))
  }, [apiData])

  const handleDateChange = (dates: any) => {
    if (dates && dates.length === 2) {
      setDateRange([dates[0], dates[1]])
    }
  }

  const handleSubmit = () => {
    // 日期变化会自动触发 useRequest 重新请求
  }

  const handleReset = () => {
    const defaultRange: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs().subtract(7, 'day'), dayjs()]
    setDateRange(defaultRange)
    form.setFieldsValue({ dateRange: defaultRange })
  }

  return (
    <PageContainer icon="/img/emoji/4.png" pageBgColorMode="gray">
      <div className="fund-statistics-page">
        {/* 错误提示 */}
        {error && (
          <Alert
            message={intl.formatMessage({ id: 'fundManagement.statistics.dataLoadFailed' })} // 數據加載失敗
            description={error.message || intl.formatMessage({ id: 'fundManagement.statistics.pleaseRetryLater' })} // 請稍後重試
            type="error"
            showIcon
            closable
            className="mb-4"
          />
        )}

        {/* 统计卡片 */}
        <Spin spinning={loading}>
          <StatisticCards data={statisticData} />
        </Spin>

        {/* 日期选择和趋势图 */}
        <ProCard className="mt-4">
          <Form form={form} layout="inline" className="mb-4">
            <ProFormDateRangePicker
              name="dateRange"
              fieldProps={{
                value: dateRange,
                onChange: handleDateChange
              }}
            />
            <QueryBtnGroup onSubmit={handleSubmit} onReset={handleReset} />
          </Form>

          <Spin spinning={loading}>
            {!loading && trendData.time.length === 0 ? (
              <Alert message={intl.formatMessage({ id: 'fundManagement.statistics.noTrendData' })} type="info" showIcon /> // 暫無趨勢數據
            ) : (
              <TrendChart data={trendData} />
            )}
          </Spin>
        </ProCard>

        {/* 币种分布和通道分布 */}
        <Row gutter={16} className="mt-4">
          <Col xs={24} lg={12}>
            <ProCard title={intl.formatMessage({ id: 'fundManagement.statistics.coinDistribution' })}>
              {' '}
              {/* 出入金幣種 */}
              <Spin spinning={loading}>
                {!loading && coinDepositData.length === 0 && coinWithdrawalData.length === 0 ? (
                  <Alert message={intl.formatMessage({ id: 'fundManagement.statistics.noCoinData' })} type="info" showIcon /> // 暫無幣種分佈數據
                ) : (
                  <CoinDistribution depositData={coinDepositData} withdrawalData={coinWithdrawalData} />
                )}
              </Spin>
            </ProCard>
          </Col>
          <Col xs={24} lg={12}>
            <ProCard title={intl.formatMessage({ id: 'fundManagement.statistics.channelDistribution' })}>
              {' '}
              {/* 通道 */}
              <Spin spinning={loading}>
                {!loading && channelDepositData.length === 0 && channelWithdrawalData.length === 0 ? (
                  <Alert message={intl.formatMessage({ id: 'fundManagement.statistics.noChannelData' })} type="info" showIcon /> // 暫無通道分佈數據
                ) : (
                  <ChannelDistribution depositData={channelDepositData} withdrawalData={channelWithdrawalData} />
                )}
              </Spin>
            </ProCard>
          </Col>
        </Row>
      </div>
    </PageContainer>
  )
}
