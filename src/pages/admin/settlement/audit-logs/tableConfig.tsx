import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'
import moment from 'moment'

export const getColumns = (): ProColumns<any>[] => {
  return [
    {
      title: '日志ID',
      dataIndex: 'id',
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
      title: '操作类型',
      dataIndex: 'operationType',
      hideInSearch: false,
      width: 150,
      valueEnum: {
        settlement_create: { text: '创建对账', status: 'Default' },
        settlement_approve: { text: '审核通过', status: 'Success' },
        settlement_reject: { text: '审核拒绝', status: 'Error' },
        settlement_retry: { text: '重新对账', status: 'Processing' },
        manual_adjustment: { text: '人工调整', status: 'Warning' },
        data_export: { text: '数据导出', status: 'Default' }
      },
      renderText(text) {
        const typeConfig: Record<string, { color: string; text: string }> = {
          settlement_create: { color: 'default', text: '创建对账' },
          settlement_approve: { color: 'success', text: '审核通过' },
          settlement_reject: { color: 'error', text: '审核拒绝' },
          settlement_retry: { color: 'processing', text: '重新对账' },
          manual_adjustment: { color: 'warning', text: '人工调整' },
          data_export: { color: 'blue', text: '数据导出' }
        }
        const config = typeConfig[text] || { color: 'default', text: text }
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: '关联批次ID',
      dataIndex: 'batchId',
      hideInSearch: false,
      ellipsis: true,
      copyable: true,
      width: 180,
      renderText(text) {
        return text ? <span className="font-mono text-xs">{text}</span> : <span className="text-gray-400">-</span>
      }
    },
    {
      title: '操作人',
      dataIndex: 'operatorId',
      hideInSearch: false,
      width: 150,
      renderText(text, record) {
        return (
          <div>
            <div className="font-medium">{record.operatorName || text}</div>
            {record.operatorRole && <div className="text-xs text-gray-400">{record.operatorRole}</div>}
          </div>
        )
      }
    },
    {
      title: '操作描述',
      dataIndex: 'description',
      hideInSearch: true,
      ellipsis: true,
      width: 250,
      renderText(text) {
        return <span className="text-gray-700">{text || '-'}</span>
      }
    },
    {
      title: '操作结果',
      dataIndex: 'result',
      hideInSearch: false,
      width: 120,
      valueEnum: {
        success: { text: '成功', status: 'Success' },
        failed: { text: '失败', status: 'Error' }
      },
      renderText(text) {
        return text === 'success' ? (
          <Tag color="success">成功</Tag>
        ) : text === 'failed' ? (
          <Tag color="error">失败</Tag>
        ) : (
          <span className="text-gray-400">-</span>
        )
      }
    },
    {
      title: '错误信息',
      dataIndex: 'errorMessage',
      hideInSearch: true,
      ellipsis: true,
      width: 200,
      renderText(text) {
        return text ? <span className="text-red-500 text-xs">{text}</span> : <span className="text-gray-400">-</span>
      }
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      hideInSearch: false,
      width: 150,
      renderText(text) {
        return <span className="font-mono text-xs">{text || '-'}</span>
      }
    },
    {
      title: '操作时间',
      dataIndex: 'createdAt',
      hideInSearch: false,
      width: 180,
      valueType: 'dateTimeRange',
      renderText(text) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  ]
}
