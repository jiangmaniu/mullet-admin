import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Button, Tag, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'

import { DepositDetailRecord, FilterOption, StatusOption } from '@/services/api/fundManagement'
import { formatNum } from '@/utils'
import { formatAddress, formatTxHash, renderFallback } from '@/utils/format'

/**
 * 根据 uiStatus 获取状态颜色
 */
const getStatusColor = (uiStatus: string): string => {
  switch (uiStatus) {
    case 'SUCCESS':
      return 'success'
    case 'FAIL':
      return 'error'
    case 'WAIT':
      return 'warning'
    case 'RECEIPT':
      return 'processing'
    default:
      return 'default'
  }
}

/**
 * 获取入金明细表格列配置
 * @param options 动态筛选选项
 * @returns ProColumns 配置数组
 */
export const getColumns = (options: {
  channels: FilterOption[]
  chains: FilterOption[]
  tokens: FilterOption[]
  statuses: StatusOption[]
}): ProColumns<DepositDetailRecord>[] => {
  const intl = useIntl()

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
        options: options.channels,
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
        <Typography.Text copyable={{ text: record.fromAddress }} ellipsis={{ tooltip: record.fromAddress }} style={{ maxWidth: 150 }}>
          {formatAddress(record.fromAddress)}
        </Typography.Text>
      )
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromChain' }), // 發起網絡
      dataIndex: 'fromChain',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.chains,
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.fromChainPlaceholder' // 請選擇鏈網絡
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromToken' }), // 發起幣種
      dataIndex: 'fromToken',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.tokens,
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.fromTokenPlaceholder' // 請選擇幣種
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromAmount' }), // 發起數額
      dataIndex: 'fromAmount',
      width: 150,
      hideInSearch: true,
      render: (_, record) => {
        return formatNum(record.fromAmount, { precision: 2 })
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
        <Typography.Text copyable={{ text: record.txHash }} ellipsis={{ tooltip: record.txHash }} style={{ maxWidth: 150 }}>
          {formatTxHash(record.txHash)}
        </Typography.Text>
      )
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.status' }), // 訂單狀態
      dataIndex: 'status',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.statuses,
        placeholder: intl.formatMessage({ id: 'fundManagement.depositDetail.statusPlaceholder' }) // 請選擇狀態
      },
      render: (_, record) => {
        const statusOption = options.statuses.find((s) => s.value === record.status)
        const statusText = statusOption?.label || record.status
        const statusColor = statusOption ? getStatusColor(statusOption.uiStatus) : 'default'
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
      width: 200,
      hideInSearch: true,
      render: (_, record) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      hideInSearch: true,
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => {
            console.log('查看详情:', record)
            // TODO: 实现查看详情逻辑
          }}
        >
          查看
        </Button>
      )
    }
  ]
}
