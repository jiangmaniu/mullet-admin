import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Tag, Tooltip, Typography } from 'antd'

import { WithdrawalDetailRecord } from '@/services/api/fundManagement/withdrawalDetail'
import { FilterOption, StatusOption } from '@/services/api/fundManagement'
import { formatNum } from '@/utils'
import { formatAddress, renderFallback } from '@/utils/format'

import DetailDrawer from './components/DetailDrawer'
import { getStatusColor, getStatusLabel } from './utils'

/**
 * 通道名称映射
 */
const CHANNEL_NAME_MAP: Record<string, string> = {
  privy: 'channelPrivy',
  debridge: 'channelDebridge',
  jupiter: 'channelJupiter',
  rango: 'channelRango',
  lifi: 'channelLifi',
  rocketx: 'channelRocketx'
}

/**
 * 获取出金明细表格列配置
 * @param options 动态筛选选项
 * @returns ProColumns 配置数组
 */
export const getColumns = (options: {
  channels: FilterOption[]
  chains: FilterOption[]
  tokens: FilterOption[]
  statuses: StatusOption[]
}): ProColumns<WithdrawalDetailRecord>[] => {
  const intl = useIntl()

  return [
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.orderNo' }),
      dataIndex: 'orderNo',
      width: 220,
      fixed: 'left',
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.orderNoPlaceholder' })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.channelOrderId' }),
      dataIndex: 'channelOrderId',
      width: 180,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.withdrawalDetail.channelOrderIdPlaceholder'
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
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.channel' }),
      dataIndex: 'channel',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.channels,
        placeholder: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.channelPlaceholder' })
      },
      render: (_, record) => {
        const channelKey = CHANNEL_NAME_MAP[record.channel.toLowerCase()]
        if (channelKey) {
          return intl.formatMessage({ id: `fundManagement.withdrawalDetail.${channelKey}` })
        }
        return record.channel
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.userId' }),
      dataIndex: 'userId',
      width: 150,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.userIdPlaceholder' })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.tradeAccountId' }),
      dataIndex: 'tradeAccountId',
      width: 150,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.withdrawalDetail.tradeAccountIdPlaceholder'
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.toAddress' }),
      dataIndex: 'toAddress',
      width: 180,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.withdrawalDetail.toAddressPlaceholder'
        })
      },
      render: (_, record) => (
        <Typography.Text copyable={{ text: record.toAddress }} ellipsis={{ tooltip: record.toAddress }} style={{ maxWidth: 150 }}>
          {formatAddress(record.toAddress)}
        </Typography.Text>
      )
    },
    {
      title: 'TxHash',
      dataIndex: 'txHash',
      width: 180,
      ellipsis: true,
      hideInTable: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.withdrawalDetail.txHashPlaceholder'
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.toChain' }),
      dataIndex: 'toChain',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.chains,
        placeholder: intl.formatMessage({
          id: 'fundManagement.withdrawalDetail.toChainPlaceholder'
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.toToken' }),
      dataIndex: 'toToken',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.tokens,
        placeholder: intl.formatMessage({
          id: 'fundManagement.withdrawalDetail.toTokenPlaceholder'
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.initiatedAmount' }),
      dataIndex: 'fromAmountUsdc',
      width: 150,
      hideInSearch: true,
      render: (_, record) => {
        return formatNum(record.fromAmountUsdc, { precision: 2 })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.status' }),
      dataIndex: 'status',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.statuses,
        placeholder: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.statusPlaceholder' })
      },
      render: (_, record) => {
        const statusText = getStatusLabel(record.status, intl) || record.status
        return <Tag color={getStatusColor(record.uiStatus)}>{renderFallback(statusText)}</Tag>
      }
    },
    {
      title: intl.formatMessage({ id: 'common.op' }),
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      hideInSearch: true,
      render: (_, record) => (
        <DetailDrawer trigger={<a style={{ fontSize: 12 }}>{intl.formatMessage({ id: 'common.chakan' })}</a>} record={record} />
      )
    }
  ]
}
