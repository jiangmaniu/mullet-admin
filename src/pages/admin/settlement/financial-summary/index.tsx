import { FormattedMessage } from '@umijs/max'
import { Card, Col, Row, Statistic, Tag } from 'antd'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { getSettlementFinancialSummary, getSettlementTasks } from '@/services/api/settlement'

import { getColumns } from './tableConfig'

function FinancialSummary() {
  const [summary, setSummary] = useState<any>({
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalBalance: 0,
    pendingSettlements: 0,
    failedSettlements: 0
  })

  useEffect(() => {
    loadSummary()
  }, [])

  const loadSummary = async () => {
    try {
      const result = await getSettlementFinancialSummary()
      if (result.success) {
        setSummary(result.data)
      }
    } catch (error) {
      console.error('Failed to load financial summary:', error)
    }
  }

  return (
    <PageContainer
      icon="/img/emoji/2.png"
      pageBgColorMode="gray"
      title={<FormattedMessage id="menu.settlement.financial-summary" defaultMessage="财务流水看板" />}
    >
      {/* 财务汇总统计卡片 */}
      <Card className="mb-4">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="累计充值"
              value={summary.totalDeposits}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="USDT"
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="累计提现"
              value={summary.totalWithdrawals}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              suffix="USDT"
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="当前余额"
              value={summary.totalBalance}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
              suffix="USDT"
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="待对账批次"
              value={summary.pendingSettlements}
              valueStyle={{ color: '#faad14' }}
            />
          </Col>
        </Row>
      </Card>

      {/* 对账任务列表 */}
      <StandardTable
        columns={getColumns()}
        hiddenDeleteBtn
        hiddenEditBtn
        showOptionColumn={false}
        pageSize={20}
        action={{
          query: (params) => getSettlementTasks(params)
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div className="p-4 bg-gray-50">
              <h4 className="font-bold mb-2">交易明细</h4>
              {record.transactions && record.transactions.length > 0 ? (
                <div className="space-y-2">
                  {record.transactions.map((tx: any, idx: number) => (
                    <div key={idx} className="flex justify-between border-b pb-2">
                      <div>
                        <span className="font-medium">{tx.type === 'deposit' ? '充值' : '提现'}</span>
                        <span className="ml-2 text-gray-500">用户: {tx.userId}</span>
                      </div>
                      <div>
                        <span className="mr-4">金额: {tx.amount} USDT</span>
                        <span className="text-gray-500">时间: {tx.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">暂无交易明细</p>
              )}
            </div>
          )
        }}
      />
    </PageContainer>
  )
}

export default observer(FinancialSummary)
