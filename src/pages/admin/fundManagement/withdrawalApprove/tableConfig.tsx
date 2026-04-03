import { ActionType, ProColumns } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Tag, Typography } from 'antd'
import dayjs from 'dayjs'

import { FilterOption } from '@/services/api/fundManagement/filterOptions'
import { WithdrawalApprovalRecord } from '@/services/api/fundManagement/withdrawalApprove'
import { formatNum } from '@/utils'
import { formatAddress, renderFallback } from '@/utils/format'

import ApprovalActions from './components/ApprovalActions'

/**
 * 获取出金审批表格列配置
 * @param options 动态筛选选项
 * @param tabType 标签类型
 * @param actionRef 表格操作引用（用于刷新表格）
 * @returns ProColumns 配置数组
 */
export const getColumns = (
  options: { chains: FilterOption[]; tokens: FilterOption[] },
  tabType: 'pending' | 'records',
  actionRef?: React.MutableRefObject<ActionType | undefined>
): ProColumns<WithdrawalApprovalRecord>[] => {
  const intl = useIntl()

  return [
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.userId' }),
      dataIndex: 'userId',
      width: 150,
      fixed: 'left',
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.userIdPlaceholder' })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.tradeAccountId' }),
      dataIndex: 'tradeAccountId',
      width: 150,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.withdrawalApprove.tradeAccountIdPlaceholder'
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.chainId' }),
      dataIndex: 'chainId',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.chains,
        placeholder: intl.formatMessage({
          id: 'fundManagement.withdrawalApprove.chainIdPlaceholder'
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.tokenId' }),
      dataIndex: 'tokenId',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: options.tokens,
        placeholder: intl.formatMessage({
          id: 'fundManagement.withdrawalApprove.tokenIdPlaceholder'
        })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.amount' }),
      dataIndex: 'amount',
      width: 150,
      hideInSearch: true,
      render: (_, record) => {
        return formatNum(record.amount, { precision: 2 })
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.toAddress' }),
      dataIndex: 'toAddress',
      width: 180,
      ellipsis: true,
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'fundManagement.withdrawalApprove.toAddressPlaceholder'
        })
      },
      render: (_, record) => (
        <Typography.Text copyable={{ text: record.toAddress }} ellipsis={{ tooltip: record.toAddress }} style={{ maxWidth: 150 }}>
          {formatAddress(record.toAddress)}
        </Typography.Text>
      )
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.createTime' }),
      dataIndex: 'createTime',
      width: 180,
      hideInSearch: true,
      render: (_, record) => {
        return renderFallback(record.createTime ? dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') : null)
      }
    },
    ...(tabType === 'records'
      ? [
          {
            title: intl.formatMessage({ id: 'fundManagement.withdrawalApprove.status' }),
            dataIndex: 'status',
            width: 120,
            hideInSearch: true,
            render: (_: unknown, record: WithdrawalApprovalRecord) => {
              const statusMap: Record<string, string> = {
                WAIT: 'statusWait',
                SUCCESS: 'statusSuccess',
                REJECT: 'statusReject'
              }
              const colorMap: Record<string, string> = {
                WAIT: 'warning',
                SUCCESS: 'success',
                REJECT: 'error'
              }
              const statusKey = statusMap[record.status] || 'statusWait'
              const color = colorMap[record.status] || 'default'

              return <Tag color={color}>{intl.formatMessage({ id: `fundManagement.withdrawalApprove.${statusKey}` })}</Tag>
            }
          }
        ]
      : []),
    ...(tabType === 'pending'
      ? [
          {
            title: intl.formatMessage({ id: 'common.op' }),
            dataIndex: 'action',
            width: 180,
            fixed: 'right' as const,
            hideInSearch: true,
            render: (_: unknown, record: WithdrawalApprovalRecord) => <ApprovalActions record={record} actionRef={actionRef} />
          }
        ]
      : [])
  ]
}
