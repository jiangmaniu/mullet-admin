import { useIntl } from '@umijs/max'
import { Descriptions, Table, Tag, Typography } from 'antd'
import dayjs from 'dayjs'

import DrawerForm from '@/components/Admin/DrawerForm'
import { WithdrawalDetailRecord } from '@/services/api/fundManagement/withdrawalDetail'
import { formatNum } from '@/utils'
import { formatAddress, formatTxHash, renderFallback } from '@/utils/format'

import { getStatusColor, getStatusLabel } from '../utils'

interface DetailDrawerProps {
  trigger: JSX.Element
  record: WithdrawalDetailRecord
}

export default function DetailDrawer({ trigger, record }: DetailDrawerProps) {
  const intl = useIntl()

  const chainColumns = [
    {
      title: 'TxHash',
      dataIndex: 'txHash',
      key: 'txHash',
      render: (value: string) => (
        <Typography.Text copyable={value ? { text: value } : false} ellipsis={value ? { tooltip: value } : false} style={{ maxWidth: 200 }}>
          {formatTxHash(value)}
        </Typography.Text>
      )
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.fromAddress' }),
      dataIndex: 'fromAddress',
      key: 'fromAddress',
      render: (value: string | null) => {
        if (!value) return renderFallback(null)
        return (
          <Typography.Text copyable={{ text: value }} ellipsis={{ tooltip: value }} style={{ maxWidth: 160 }}>
            {formatAddress(value)}
          </Typography.Text>
        )
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.toAddress' }),
      dataIndex: 'toAddress',
      key: 'toAddress',
      render: (value: string | null) => {
        if (!value) return renderFallback(null)
        return (
          <Typography.Text copyable={{ text: value }} ellipsis={{ tooltip: value }} style={{ maxWidth: 160 }}>
            {formatAddress(value)}
          </Typography.Text>
        )
      }
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.withdrawalDetail.toChainLabel' }),
      dataIndex: 'network',
      key: 'network',
      render: (value: string) => renderFallback(value)
    }
  ]

  const chainData =
    record.txList?.map((tx, index) => ({
      key: index,
      ...tx
    })) || []

  return (
    <DrawerForm
      trigger={trigger}
      width={750}
      hiddenSubmitter
      title={intl.formatMessage({ id: 'fundManagement.withdrawalDetail.drawerTitle' })}
      onFinish={async () => true}
    >
      <Descriptions column={1} bordered size="small" labelStyle={{ width: 140 }}>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.withdrawalDetail.orderNo' })}>
          {renderFallback(record.orderNo)}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.withdrawalDetail.channelOrderId' })}>
          {renderFallback(record.channelOrderId)}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.withdrawalDetail.channel' })}>
          {renderFallback(record.channel)}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.withdrawalDetail.userId' })}>
          {renderFallback(record.userId)}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.withdrawalDetail.tradeAccountId' })}>
          {renderFallback(record.tradeAccountId)}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.withdrawalDetail.withdrawalAmount' })}>
          {formatNum(record.fromAmountUsdc, { precision: 2 })} USDC
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.withdrawalDetail.time' })}>
          {renderFallback(dayjs(record?.createdAt)?.format('YYYY.M.D HH:mm:ss'), { verify: !!record?.createdAt })}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.withdrawalDetail.statusLabel' })}>
          <Tag color={getStatusColor(record.uiStatus)}>{getStatusLabel(record.status, intl) || renderFallback(record.status)}</Tag>
        </Descriptions.Item>
      </Descriptions>

      <div className="mt-6">
        <div className="text-base font-semibold text-primary mb-3">
          {intl.formatMessage({ id: 'fundManagement.withdrawalDetail.onChainInfo' })}
        </div>
        <Table columns={chainColumns} dataSource={chainData} pagination={false} size="small" bordered />
      </div>
    </DrawerForm>
  )
}
