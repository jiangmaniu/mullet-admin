import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'
import { Tag } from 'antd'
import moment from 'moment'

export const getColumns = (): ProColumns<any>[] => {
  return [
    {
      title: '批次ID',
      dataIndex: 'batchId',
      hideInSearch: true,
      ellipsis: true,
      copyable: true,
      fixed: 'left',
      width: 180,
      renderText(text) {
        return <span className="text-primary text-sm font-mono">{text}</span>
      }
    },
    {
      title: '结算周期',
      dataIndex: 'settlementPeriod',
      hideInSearch: true,
      width: 200,
      renderText(text, record) {
        return (
          <div>
            <div>{moment(record.startTime).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div className="text-gray-400 text-xs">至</div>
            <div>{moment(record.endTime).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        )
      }
    },
    {
      title: '交易笔数',
      dataIndex: 'transactionCount',
      hideInSearch: true,
      width: 120,
      align: 'right',
      renderText(text) {
        return <span className="font-medium">{text || 0}</span>
      }
    },
    {
      title: '充值金额',
      dataIndex: 'totalDeposits',
      hideInSearch: true,
      width: 150,
      align: 'right',
      renderText(text) {
        return <span className="text-green-600 font-medium">+{text || 0} USDT</span>
      }
    },
    {
      title: '提现金额',
      dataIndex: 'totalWithdrawals',
      hideInSearch: true,
      width: 150,
      align: 'right',
      renderText(text) {
        return <span className="text-red-600 font-medium">-{text || 0} USDT</span>
      }
    },
    {
      title: '净额',
      dataIndex: 'netAmount',
      hideInSearch: true,
      width: 150,
      align: 'right',
      renderText(text, record) {
        const netAmount = (record.totalDeposits || 0) - (record.totalWithdrawals || 0)
        const color = netAmount >= 0 ? 'text-green-600' : 'text-red-600'
        return <span className={`${color} font-medium`}>{netAmount} USDT</span>
      }
    },
    {
      title: '对账状态',
      dataIndex: 'status',
      hideInSearch: false,
      width: 120,
      valueEnum: {
        pending: { text: '待对账', status: 'Default' },
        processing: { text: '对账中', status: 'Processing' },
        success: { text: '对账成功', status: 'Success' },
        failed: { text: '对账失败', status: 'Error' },
        manual_review: { text: '人工审核', status: 'Warning' }
      },
      renderText(text, record) {
        const statusConfig: Record<string, { color: string; text: string }> = {
          pending: { color: 'default', text: '待对账' },
          processing: { color: 'processing', text: '对账中' },
          success: { color: 'success', text: '对账成功' },
          failed: { color: 'error', text: '对账失败' },
          manual_review: { color: 'warning', text: '人工审核' }
        }
        const config = statusConfig[text] || statusConfig.pending
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: '不一致项',
      dataIndex: 'inconsistencies',
      hideInSearch: true,
      width: 120,
      align: 'center',
      renderText(text, record) {
        if (!text || text === 0) {
          return <span className="text-gray-400">-</span>
        }
        return <span className="text-orange-600 font-bold">{text}</span>
      }
    },
    {
      title: '执行时间',
      dataIndex: 'executionTime',
      hideInSearch: true,
      width: 180,
      renderText(text) {
        return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-'
      }
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      hideInSearch: true,
      ellipsis: true,
      width: 200,
      renderText(text) {
        return <span className="text-gray-600">{text || '-'}</span>
      }
    },
    {
      title: <FormattedMessage id="common.createTime" defaultMessage="创建时间" />,
      dataIndex: 'createdAt',
      hideInSearch: true,
      width: 180,
      renderText(text) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  ]
}
