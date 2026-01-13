import { FormattedMessage } from '@umijs/max'
import { useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { deleteVersion, getVersionList } from '@/services/api/version'

import ModalForm from './ModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const instanceRef = useRef<Instance>()
  const [modalInfo, setModalInfo] = useState({})
  const modalRef = useRef<any>()

  return (
    <PageContainer icon="/img/emoji/4.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        hideSearch
        showOptionColumn
        renderEditBtn={(record, index, action) => {
          return (
            <a
              className="!text-primary text-sm font-medium"
              onClick={() => {
                // push(`/version/edit/${record.id}`)
                setModalInfo(record)
                modalRef.current?.show()
              }}
            >
              <FormattedMessage id="common.bianji" />
            </a>
          )
        }}
        tableExtraRender={() => (
          <AddButton
            onClick={() => {
              // push('/version/add')
              modalRef.current?.show()
            }}
          >
            <FormattedMessage id="mt.xinzengbanben" />
          </AddButton>
        )}
        // ghost
        action={{
          query: (params) => getVersionList(params),
          del: (params) => deleteVersion({ id: params.id })
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
      <ModalForm
        info={modalInfo}
        ref={modalRef}
        reload={() => instanceRef.current?.action?.reload()}
        onClose={() => {
          setModalInfo({})
        }}
      />
    </PageContainer>
  )
}
