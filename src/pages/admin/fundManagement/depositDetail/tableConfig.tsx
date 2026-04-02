import { ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Tag, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'

import { DepositDetailRecord, FilterOption, StatusOption } from '@/services/api/fundManagement'
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
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.orderNo' }),
      dataIndex: 'orderNo',
      width: 220,
      fixed: 'left',
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'fundManagement.depositDetail.orderNoPlaceholder' })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.channelOrderId' }),
      dataIndex: 'channelOrderId',
      width: 180,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.channelOrderIdPlaceholder'
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
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.channel' }),
      dataIndex: 'channel',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.channels,
        placeholder: intl.formatMessage({ id: 'fundManagement.depositDetail.channelPlaceholder' })
      },
      render: (_, record) => {
        const channelKey = CHANNEL_NAME_MAP[record.channel.toLowerCase()]
        if (channelKey) {
          return intl.formatMessage({ id: `fundManagement.depositDetail.${channelKey}` })
        }
        return record.channel
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.userId' }),
      dataIndex: 'userId',
      width: 150,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'fundManagement.depositDetail.userIdPlaceholder' })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.tradeAccountId' }),
      dataIndex: 'tradeAccountId',
      width: 150,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.tradeAccountIdPlaceholder'
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromAddress' }),
      dataIndex: 'fromAddress',
      width: 180,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.fromAddressPlaceholder'
        })
      },
      render: (_, record) => (
        <Typography.Text copyable={{ text: record.fromAddress }} ellipsis={{ tooltip: record.fromAddress }} style={{ maxWidth: 150 }}>
          {formatAddress(record.fromAddress)}
        </Typography.Text>
      )
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromChain' }),
      dataIndex: 'fromChain',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.chains,
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.fromChainPlaceholder'
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromToken' }),
      dataIndex: 'fromToken',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.tokens,
        placeholder: intl.formatMessage({
          id: 'fundManagement.depositDetail.fromTokenPlaceholder'
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromAmount' }),
      dataIndex: 'fromAmount',
      width: 150,
      hideInSearch: true,
      render: (_, record) => {
        return formatNum(record.fromAmount, { precision: 2 })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.status' }),
      dataIndex: 'status',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.statuses,
        placeholder: intl.formatMessage({ id: 'fundManagement.depositDetail.statusPlaceholder' })
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
