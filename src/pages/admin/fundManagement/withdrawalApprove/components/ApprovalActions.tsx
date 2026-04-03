import { ActionType } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Button, Popconfirm, Space } from 'antd'
import { useRef, useState } from 'react'

import { submitApproval, WithdrawalApprovalRecord } from '@/services/api/fundManagement/withdrawalApprove'
import { message } from '@/utils/message'

import RejectModal from './RejectModal'

interface ApprovalActionsProps {
  record: WithdrawalApprovalRecord
  actionRef?: React.MutableRefObject<ActionType | undefined>
}

/**
 * 审批操作按钮组件
 */
export default function ApprovalActions({ record, actionRef }: ApprovalActionsProps) {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const rejectModalRef = useRef<any>()

  // 检查是否已有人审批
  const isApproved = !Boolean(record.approver && record.approver.trim() !== '')

  /**
   * 处理审批通过
   */
  const handleApprove = async () => {
    setLoading(true)
    try {
      const res = await submitApproval({
        orderNo: record.orderNo,
        action: 'approve'
      })

      if (res.success) {
        // 审批通过，显示成功消息
        message.success(intl.formatMessage({ id: 'fundManagement.withdrawalApprove.approveSuccess' }))

        // 刷新表格
        actionRef?.current?.reload()
        return true
      } else {
        message.error(res?.msg || intl.formatMessage({ id: 'fundManagement.withdrawalApprove.approvalFailed' }))
        return false
      }
    } catch (error: any) {
      console.error('Approval failed:', error)
      message.error(error?.msg || intl.formatMessage({ id: 'fundManagement.withdrawalApprove.approvalFailed' }))
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * 处理审批拒绝
   */
  const handleReject = () => {
    rejectModalRef.current?.show(record)
  }

  return (
    <>
      <Space size="small">
        <Popconfirm title={intl.formatMessage({ id: 'fundManagement.withdrawalApprove.approveConfirm' })} onConfirm={handleApprove}>
          <Button type="primary" size="small" loading={loading} disabled={isApproved}>
            {intl.formatMessage({ id: 'fundManagement.withdrawalApprove.approve' })}
          </Button>
        </Popconfirm>
        <Button danger size="small" onClick={handleReject} disabled={isApproved}>
          {intl.formatMessage({ id: 'fundManagement.withdrawalApprove.reject' })}
        </Button>
      </Space>

      <RejectModal ref={rejectModalRef} actionRef={actionRef} />
    </>
  )
}
