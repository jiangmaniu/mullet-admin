import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'

import { DepositDetailRecord } from '@/services/api/fundManagement'
import { formatAddress, formatTxHash, renderFallback } from '@/utils/format'

// 通道选项 - 专有名词保持英文
export const CHANNEL_OPTIONS = [
  { label: 'Privy', value: 'privy' },
  { label: 'deBridge', value: 'debridge' },
  { label: 'Jupiter', value: 'jupiter' },
  { label: 'Lifi', value: 'lifi' },
  { label: 'Rango', value: 'rango' },
  { label: 'RocketX', value: 'rocketx' }
]

// 链网络选项 - 专有名词保持英文
export const CHAIN_OPTIONS = [
  { label: 'SOL', value: 'SOL' },
  { label: 'ETH', value: 'ETH' },
  { label: 'TRON', value: 'TRON' },
  { label: 'BSC', value: 'BSC' },
  { label: 'ARB', value: 'ARB' },
  { label: 'BASE', value: 'BASE' }
]

// 状态枚举
export enum DepositStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

// 状态颜色映射
const STATUS_COLOR_MAP: Record<DepositStatus, string> = {
  [DepositStatus.PENDING]: 'default',
  [DepositStatus.SUBMITTED]: 'processing',
  [DepositStatus.PROCESSING]: 'processing',
  [DepositStatus.COMPLETED]: 'success',
  [DepositStatus.FAILED]: 'error'
}

/**
 * 获取入金明细表格列配置
 * @returns ProColumns 配置数组
 */
export const getColumns = (): ProColumns<DepositDetailRecord>[] => {
  const intl = useIntl()

  // 状态选项
  const STATUS_OPTIONS = [
    {
      label: intl.formatMessage({ id: 'fundManagement.depositDetail.statusPending' }), // 待處理
      value: DepositStatus.PENDING
    },
    {
      label: intl.formatMessage({ id: 'fundManagement.depositDetail.statusSubmitted' }), // 已提交
      value: DepositStatus.SUBMITTED
    },
    {
      label: intl.formatMessage({ id: 'fundManagement.depositDetail.statusProcessing' }), // 處理中
      value: DepositStatus.PROCESSING
    },
    {
      label: intl.formatMessage({ id: 'fundManagement.depositDetail.statusCompleted' }), // 已完成
      value: DepositStatus.COMPLETED
    },
    {
      label: intl.formatMessage({ id: 'fundManagement.depositDetail.statusFailed' }), // 失敗
      value: DepositStatus.FAILED
    }
  ]

  // 状态文本映射
  const getStatusText = (status: DepositStatus): string => {
    const statusMap: Record<DepositStatus, string> = {
      [DepositStatus.PENDING]: intl.formatMessage({
        id: 'fundManagement.depositDetail.statusPending' // 待處理
      }),
      [DepositStatus.SUBMITTED]: intl.formatMessage({
        id: 'fundManagement.depositDetail.statusSubmitted' // 已提交
      }),
      [DepositStatus.PROCESSING]: intl.formatMessage({
        id: 'fundManagement.depositDetail.statusProcessing' // 處理中
      }),
      [DepositStatus.COMPLETED]: intl.formatMessage({
        id: 'fundManagement.depositDetail.statusCompleted' // 已完成
      }),
      [DepositStatus.FAILED]: intl.formatMessage({
        id: 'fundManagement.depositDetail.statusFailed' // 失敗
      })
    }
    return statusMap[status] || status
  }

  return [
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.orderNo' }), // 訂單ID
      dataIndex: 'orderNo',
      width: 180,
      fixed: 'left',
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'fundManagement.depositDetail.orderNoPlaceholder' }) // 請輸入訂單ID
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.channelOrderId' }), // 通道訂單ID
      dataIndex: 'channelOrderId',
      width: 180,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.channelOrderIdPlaceholder' // 請輸入通道訂單ID
        })
      },
      render: (_, record) => {
        const channelOrderId = renderFallback(record.channelOrderId)
        if (channelOrderId === '--') {
          return channelOrderId
        }
        return (
          <Tooltip title={record.channelOrderId}>
            <span className="text-blue-500 cursor-pointer">{record.channelOrderId}</span>
          </Tooltip>
        )
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.channel' }), // 支付通道
      dataIndex: 'channel',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: CHANNEL_OPTIONS,
        placeholder: intl.formatMessage({ id: 'fundManagement.depositDetail.channelPlaceholder' }) // 請選擇通道
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.userId' }), // 用戶ID
      dataIndex: 'userId',
      width: 150,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'fundManagement.depositDetail.userIdPlaceholder' }) // 請輸入用戶ID
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.tradeAccountId' }), // 賬戶ID
      dataIndex: 'tradeAccountId',
      width: 150,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.tradeAccountIdPlaceholder' // 請輸入賬戶ID
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromAddress' }), // 發起地址
      dataIndex: 'fromAddress',
      width: 180,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.fromAddressPlaceholder' // 請輸入發起地址
        })
      },
      render: (_, record) => (
        <Tooltip title={record.fromAddress}>
          <span>{formatAddress(record.fromAddress)}</span>
        </Tooltip>
      )
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromChain' }), // 發起網絡
      dataIndex: 'fromChain',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: CHAIN_OPTIONS,
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.fromChainPlaceholder' // 請選擇鏈網絡
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromToken' }), // 發起幣種
      dataIndex: 'fromToken',
      width: 120,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.fromTokenPlaceholder' // 請輸入幣種
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromAmount' }), // 發起數額
      dataIndex: 'fromAmount',
      width: 150,
      hideInSearch: true,
      render: (_, record) => {
        return renderFallback(record.fromAmount)
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.txHash' }), // txHash
      dataIndex: 'txHash',
      width: 180,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'fundManagement.depositDetail.txHashPlaceholder' }) // 請輸入txHash
      },
      render: (_, record) => (
        <Tooltip title={record.txHash}>
          <span>{formatTxHash(record.txHash)}</span>
        </Tooltip>
      )
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.status' }), // 訂單狀態
      dataIndex: 'status',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: STATUS_OPTIONS,
        placeholder: intl.formatMessage({ id: 'fundManagement.depositDetail.statusPlaceholder' }) // 請選擇狀態
      },
      render: (_, record) => {
        const statusText = getStatusText(record.status as DepositStatus)
        const statusColor = STATUS_COLOR_MAP[record.status as DepositStatus] || 'default'
        return <Tag color={statusColor}>{renderFallback(statusText)}</Tag>
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.createdAt' }), // 創建時間
      dataIndex: 'createdAt',
      width: 180,
      valueType: 'dateTimeRange',
      hideInTable: true,
      search: {
        transform: (value) => ({
          startTime: value[0] ? dayjs(value[0]).valueOf() : undefined,
          endTime: value[1] ? dayjs(value[1]).valueOf() : undefined
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.createdAt' }), // 創建時間
      dataIndex: 'createdAt',
      width: 180,
      hideInSearch: true,
      render: (_, record) => dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }
  ]
}

