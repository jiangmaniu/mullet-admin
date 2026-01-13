import { FormattedMessage, useIntl } from '@umijs/max'
import { Popconfirm } from 'antd'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { approveWithdrawl, getWithdrawalOrderApprovalList } from '@/services/api/payment/withdraw'
import { cn } from '@/utils/cn'
import { message } from '@/utils/message'

import ModalForm from './ModalForm'
import { getColumns } from './tableConfig'

export default function List() {
  const intl = useIntl()
  const modalRef = useRef<any>(null)
  const instanceRef = useRef<Instance>()

  // 刷新列表
  const reload = () => {
    instanceRef.current?.action?.reload()
  }

  const handlePass = async (id: any) => {
    const res = await approveWithdrawl({ approvalType: 'PASS', id })
    if (res.success) {
      message.info(intl.formatMessage({ id: 'common.opSuccess' }))
      reload()
    }
  }

  return (
    <PageContainer icon="/img/emoji/12.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        showOptionColumn
        renderOptionColumn={(record) => {
          return (
            <div className="flex items-center justify-end gap-5">
              <Popconfirm
                title={intl.formatMessage({ id: 'mt.querentongguoma' })}
                onConfirm={() => {
                  handlePass(record.id)
                }}
                disabled={false}
              >
                <a
                  className={cn('!text-primary font-medium text-sm', {
                    'pointer-events-none !text-gray-900 opacity-40': record.status !== 'WAIT'
                  })}
                >
                  <FormattedMessage id="mt.tongguo" />
                </a>
              </Popconfirm>
              <a
                className={cn('!text-primary font-medium text-sm', {
                  'pointer-events-none !text-gray-900 opacity-40': record.status !== 'WAIT'
                })}
                onClick={() => {
                  modalRef.current.show(record)
                }}
              >
                <FormattedMessage id="mt.jujue" />
              </a>
            </div>
          )
        }}
        // ghost
        action={{
          query: (params) => getWithdrawalOrderApprovalList(params)
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
      <ModalForm ref={modalRef} reload={reload} />
    </PageContainer>
  )
}
