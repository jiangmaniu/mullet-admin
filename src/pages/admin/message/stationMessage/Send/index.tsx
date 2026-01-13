import { FormattedMessage } from '@umijs/max'
import { useRef, useState } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getMessageSendList, removeMessageSend } from '@/services/api/message/messageSend'

import ModalForm from './ModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const tableRef = useRef<Instance>(null)
  const [modalInfo, setModalInfo] = useState<MessageSend.MessageSendListItem>({})
  const reload = () => tableRef.current?.action?.reload?.()
  const modalRef = useRef<any>(null)

  return (
    <>
      <StandardTable
        columns={getColumns()}
        showOptionColumn
        tableExtraRender={() => (
          <AddButton
            onClick={() => {
              modalRef.current?.show()
            }}
          >
            <FormattedMessage id="mt.xinzhenggonggao" />
          </AddButton>
        )}
        renderEditBtn={(record: any) => {
          return (
            <a
              className="!text-primary text-sm font-medium"
              onClick={() => {
                setModalInfo(record)
                modalRef.current?.show()
              }}
            >
              <FormattedMessage id="common.chakan" />
            </a>
          )
        }}
        // ghost
        action={{
          query: (params) => getMessageSendList(params),
          del: (params) => removeMessageSend(params)
        }}
        ref={tableRef}
      />
      <ModalForm info={modalInfo} reload={reload} onClose={() => setModalInfo({})} ref={modalRef} />
    </>
  )
}
