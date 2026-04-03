import { ProFormTextArea } from '@ant-design/pro-components'
import { ActionType } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Col, Form, Row } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import Modal from '@/components/Admin/ModalForm'
import { submitApproval, WithdrawalApprovalRecord } from '@/services/api/fundManagement/withdrawalApprove'
import { formatNum } from '@/utils'
import { formatAddress } from '@/utils/format'
import { message } from '@/utils/message'

interface RejectModalProps {
  actionRef?: React.MutableRefObject<ActionType | undefined>
}

/**
 * 出金拒绝弹窗组件
 */
function RejectModal({ actionRef }: RejectModalProps, ref: any) {
  const intl = useIntl()
  const [record, setRecord] = useState<WithdrawalApprovalRecord | null>(null)
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const submittedRef = useRef(false)

  const show = (data: WithdrawalApprovalRecord) => {
    submittedRef.current = false
    setRecord(data)
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
  }

  useImperativeHandle(ref, () => ({
    show,
    close
  }))

  useEffect(() => {
    if (record) {
      form.resetFields()
    }
  }, [record, form])

  return (
    <Modal
      title={intl.formatMessage({ id: 'fundManagement.withdrawalApprove.rejectTitle' })}
      open={open}
      onCancel={close}
      form={form}
      width={600}
      afterClose={() => {
        setRecord(null)
        form.resetFields()
        if (submittedRef.current) {
          actionRef?.current?.reload()
        }
      }}
      onFinish={async (values: any) => {
        try {
          const res = await submitApproval({
            orderNo: record!.orderNo,
            action: 'reject',
            reason: values.reason.trim()
          })

          if (res?.success) {
            submittedRef.current = true
            message.success(intl.formatMessage({ id: 'fundManagement.withdrawalApprove.rejectSuccess' }))
          } else {
            message.error(res?.msg || intl.formatMessage({ id: 'fundManagement.withdrawalApprove.approvalFailed' }))
          }

          return res?.success
        } catch (error: any) {
          message.error(error?.msg || intl.formatMessage({ id: 'fundManagement.withdrawalApprove.approvalFailed' }))
          return false
        }
      }}
    >
      {record && (
        <div>
          {/* 第一行：申请用户、交易账户、出金金额 */}
          <div className="mb-4">
            <Row gutter={16}>
              <Col span={8}>
                <div className="text-sm text-gray-500 mb-1">
                  {intl.formatMessage({ id: 'fundManagement.withdrawalApprove.applicantUser' })}
                </div>
                <div className="text-gray-700">{record.userId}</div>
              </Col>
              <Col span={8}>
                <div className="text-sm text-gray-500 mb-1">
                  {intl.formatMessage({ id: 'fundManagement.withdrawalApprove.tradeAccount' })}
                </div>
                <div className="text-gray-700">{record.tradeAccountId || '--'}</div>
              </Col>
              <Col span={8}>
                <div className="text-sm text-gray-500 mb-1">{intl.formatMessage({ id: 'fundManagement.withdrawalApprove.amount' })}</div>
                <div className="text-gray-700">{formatNum(record.amount, { precision: 4 })}</div>
              </Col>
            </Row>
          </div>

          {/* 第二行：接收链网络、接收币种、接收地址 */}
          <div className="mb-4">
            <Row gutter={16}>
              <Col span={8}>
                <div className="text-sm text-gray-500 mb-1">{intl.formatMessage({ id: 'fundManagement.withdrawalApprove.chainId' })}</div>
                <div className="text-gray-700">{record.chainId}</div>
              </Col>
              <Col span={8}>
                <div className="text-sm text-gray-500 mb-1">{intl.formatMessage({ id: 'fundManagement.withdrawalApprove.tokenId' })}</div>
                <div className="text-gray-700">{record.tokenId}</div>
              </Col>
              <Col span={8}>
                <div className="text-sm text-gray-500 mb-1">{intl.formatMessage({ id: 'fundManagement.withdrawalApprove.toAddress' })}</div>
                <div className="text-gray-700">{formatAddress(record.toAddress)}</div>
              </Col>
            </Row>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-gray-200 my-4" />

          {/* 拒绝原因 */}
          <ProFormTextArea
            name="reason"
            label={intl.formatMessage({ id: 'fundManagement.withdrawalApprove.rejectReason' })}
            placeholder={intl.formatMessage({
              id: 'fundManagement.withdrawalApprove.rejectReasonPlaceholder'
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'fundManagement.withdrawalApprove.rejectReasonRequired'
                })
              }
            ]}
            fieldProps={{
              showCount: true,
              maxLength: 1000,
              autoSize: { minRows: 4, maxRows: 10 }
            }}
            required
          />
        </div>
      )}
    </Modal>
  )
}

export default forwardRef(RejectModal)
