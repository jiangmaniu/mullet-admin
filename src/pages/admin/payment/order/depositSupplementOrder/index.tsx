import { FormattedMessage, useIntl } from '@umijs/max'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getDepositFillOrderList } from '@/services/api/payment/depositFillOrder'
import { cn } from '@/utils/cn'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

export default function List() {
  const intl = useIntl()
  const instanceRef = useRef<Instance>()

  const handleDelete = async (id: any) => {}

  return (
    <PageContainer icon="/img/emoji/12.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        showOptionColumn
        tableExtraRender={() => (
          <AddButton onClick={() => push('/payment/deposit-supplement/add')}>
            <FormattedMessage id="mt.chuangjianbudan" />
          </AddButton>
        )}
        opColumnWidth={80}
        renderOptionColumn={(record) => {
          return (
            <div className="flex items-center justify-end gap-5">
              <a
                className={cn('!text-primary font-medium text-sm')}
                onClick={() => {
                  push(`/payment/deposit-supplement/view/${record.id}`)
                }}
              >
                <FormattedMessage id="mt.chakan" />
              </a>
              {/* 补单不支持编辑功能 */}
              {/* <a
                className={cn('!text-primary font-medium text-sm', {
                  'pointer-events-none !text-gray-900 opacity-40': false
                })}
                onClick={() => {
                  push(`/payment/deposit-supplement/edit/${record.id}`)
                }}
              >
                <FormattedMessage id="mt.bianji" />
              </a> */}
              {/* <Popconfirm
                title={intl.formatMessage({ id: 'common.confirmDelete' })}
                onConfirm={() => {
                  handleDelete(record.id)
                }}
                disabled={false}
              >
                <a
                  className={cn('!text-primary font-medium text-sm', {
                    'pointer-events-none !text-gray-900 opacity-40': false
                  })}
                >
                  <FormattedMessage id="common.delete" />
                </a>
              </Popconfirm> */}
            </div>
          )
        }}
        // ghost
        action={{
          query: (params) => getDepositFillOrderList(params)
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
