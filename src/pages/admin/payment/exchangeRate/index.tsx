import { FormattedMessage } from '@umijs/max'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getExchangeRatePageList, removeExchangeRate } from '@/services/api/payment/exchangeRate'

import HistoryModal from './HistoryModal'
import ModalForm from './ModalForm'
import { getColumns } from './tableConfig'
export default function List() {
  const modalRef = useRef<any>(null)
  const historyRef = useRef<any>(null)
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
        tableExtraRender={() => (
          <AddButton onClick={() => modalRef.current.show()}>
            <FormattedMessage id="mt.xinzhenghuilv" />
          </AddButton>
        )}
        onEditItem={(record) => {
          modalRef.current.show(record)
          console.log(record)
        }}
        opColumnWidth={150}
        getOpColumnItems={(record) => {
          return (
            <a
              key="record"
              onClick={async () => {
                historyRef.current.show(record)
              }}
              className="!text-primary text-sm font-medium ml-6"
            >
              <FormattedMessage id="mt.lishi" />
            </a>
          )
        }}
        // ghost
        action={{
          query: (params) => getExchangeRatePageList(params),
          del: (params) => removeExchangeRate({ id: params.id })
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
      <ModalForm ref={modalRef} reload={reload} />
      <HistoryModal ref={historyRef} />
    </PageContainer>
  )
}
