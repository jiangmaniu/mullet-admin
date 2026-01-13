import { FormattedMessage, useIntl } from '@umijs/max'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { getDepositOrderReviewListPage } from '@/services/api/receivePayment/depositApprove'
import { cn } from '@/utils/cn'

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

  return (
    <PageContainer icon="/img/emoji/12.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        showOptionColumn
        renderOptionColumn={(record) => {
          return (
            <div className="flex items-center justify-end gap-5">
              <a
                className={cn('!text-primary font-medium text-sm', {
                  // 'pointer-events-none !text-gray-900 opacity-40': record.status !== 'WAIT'
                })}
                onClick={() => {
                  modalRef.current?.show(record)
                }}
              >
                <FormattedMessage id="mt.shenhe" />
              </a>
            </div>
          )
        }}
        // ghost
        action={{
          query: (params) => getDepositOrderReviewListPage(params)
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
      <ModalForm ref={modalRef} reload={reload} />
    </PageContainer>
  )
}
