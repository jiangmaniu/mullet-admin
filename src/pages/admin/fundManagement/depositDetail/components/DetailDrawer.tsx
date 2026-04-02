import { useIntl } from '@umijs/max'
import { Descriptions, Table, Tag, Typography } from 'antd'
import dayjs from 'dayjs'

import DrawerForm from '@/components/Admin/DrawerForm'
import { DepositDetailRecord } from '@/services/api/fundManagement/depositDetail'
import { formatNum } from '@/utils'
import { formatAddress, formatTxHash, renderFallback } from '@/utils/format'

import { getStatusColor, getStatusLabel } from '../utils'

interface DetailDrawerProps {
  trigger: JSX.Element
  record: DepositDetailRecord
}

export default function DetailDrawer({ trigger, record }: DetailDrawerProps) {
  const intl = useIntl()

  const chainColumns = [
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.txHash' }),
      dataIndex: 'txHash',
      key: 'txHash',
      render: (value: string) => (
        <Typography.Text copyable={value ? { text: value } : false} ellipsis={value ? { tooltip: value } : false} style={{ maxWidth: 200 }}>
          {formatTxHash(value)}
        </Typography.Text>
      )
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromAddress' }),
      dataIndex: 'fromAddress',
      key: 'fromAddress',
      render: (value: string) => (
        <Typography.Text copyable={value ? { text: value } : false} ellipsis={value ? { tooltip: value } : false} style={{ maxWidth: 160 }}>
          {formatAddress(value)}
        </Typography.Text>
      )
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.toAddress' }),
      dataIndex: 'toAddress',
      key: 'toAddress',
      render: (value: string) => (
        <Typography.Text copyable={value ? { text: value } : false} ellipsis={value ? { tooltip: value } : false} style={{ maxWidth: 160 }}>
          {formatAddress(value)}
        </Typography.Text>
      )
    },
    {
      title: intl.formatMessage({ id: 'fundManagement.depositDetail.fromChainLabel' }),
      dataIndex: 'fromChain',
      key: 'fromChain',
      render: (value: string) => renderFallback(value)
    }
  ]

  const chainData = [
    {
      key: '1',
      txHash: record.txHash,
      fromAddress: record.fromAddress,
      toAddress: record.toAddress,
      fromChain: record.fromChain
    }
  ]

  return (
    <DrawerForm
      trigger={trigger}
      width={750}
      hiddenSubmitter
      title={intl.formatMessage({ id: 'fundManagement.depositDetail.drawerTitle' })}
      onFinish={async () => true}
    >
      <Descriptions column={1} bordered size="small" labelStyle={{ width: 140 }}>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.depositDetail.orderNo' })}>
          {renderFallback(record.orderNo)}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.depositDetail.channelOrderId' })}>
          {renderFallback(record.channelOrderId)}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.depositDetail.channel' })}>
          {renderFallback(record.channel)}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.depositDetail.userId' })}>
          {renderFallback(record.userId)}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.depositDetail.tradeAccountId' })}>
          {renderFallback(record.tradeAccountId)}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.depositDetail.fromAmount' })}>
          {formatNum(record.fromAmount, { precision: 2 })}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.depositDetail.createdAt' })}>
          {renderFallback(dayjs(record?.createdAt)?.format('YYYY-MM-DD HH:mm:ss'), { verify: !!record?.createdAt })}
        </Descriptions.Item>
        <Descriptions.Item label={intl.formatMessage({ id: 'fundManagement.depositDetail.status' })}>
          <Tag color={getStatusColor(record.status)}>{getStatusLabel(record.status, intl) || renderFallback(record.status)}</Tag>
        </Descriptions.Item>
      </Descriptions>

      <div className="mt-6">
        <div className="text-base font-semibold text-primary mb-3">
          {intl.formatMessage({ id: 'fundManagement.depositDetail.onChainInfo' })}
        </div>
        <Table columns={chainColumns} dataSource={chainData} pagination={false} size="small" bordered />
      </div>
    </DrawerForm>
  )
}
