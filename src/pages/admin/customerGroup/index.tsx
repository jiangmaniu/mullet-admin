import { FormattedMessage } from '@umijs/max'
import { useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getClientGroupList, removeClientGroup } from '@/services/api/crm/customerGroup'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function CustomerGroup() {
  const instanceRef = useRef<Instance>()
  const [modalInfo, setModalInfo] = useState({})
  const modalRef = useRef<any>()

  const showModal = () => {
    modalRef?.current?.show()
  }

  return (
    <PageContainer icon="/img/emoji/21.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        showOptionColumn
        renderEditBtn={(record, index, action) => {
          return (
            <a
              className="!text-primary text-sm font-medium"
              onClick={() => {
                // setModalInfo(record)
                // showModal()
                push(`/customer-group/edit/${record.id}`)
              }}
            >
              <FormattedMessage id="common.bianji" />
            </a>
          )
        }}
        tableExtraRender={() => <AddButton onClick={() => push('/customer-group/add')} />}
        // ghost
        action={{
          query: (params) => getClientGroupList(params),
          del: (params) => removeClientGroup({ ids: params.id })
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
      {/* <ModalForm
        info={modalInfo}
        ref={modalRef}
        reload={() => instanceRef.current?.action?.reload()}
        onClose={() => {
          setModalInfo({})
        }}
      /> */}
    </PageContainer>
  )
}
