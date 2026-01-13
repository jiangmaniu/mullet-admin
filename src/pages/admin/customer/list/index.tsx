import { FormattedMessage } from '@umijs/max'
import { useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getClientList, removeClient } from '@/services/api/crm/customer'

import ModalForm from './comp/ModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const [tabActiveKey, setTabActiveKey] = useState('')
  const [total, setTotal] = useState(0)
  const instanceRef = useRef<Instance>()
  const modalRef = useRef<any>()
  const [modalInfo, setModalInfo] = useState({} as Customer.ListItem)

  const showModal = () => {
    modalRef?.current?.show()
  }

  console.log('modalInfo', modalInfo)

  return (
    <PageContainer
      icon="/img/emoji/4.png"
      subTitle={
        <>
          {!!total && (
            <div>
              <FormattedMessage id="mt.kehushuliang" />：{total}
            </div>
          )}
        </>
      }
      pageBgColorMode="gray"
    >
      <StandardTable
        columns={getColumns({ showModal, setModalInfo, setTabActiveKey })}
        tableExtraRender={() => (
          <AddButton
            onClick={() => {
              setTabActiveKey('AccountInfo')
              setModalInfo({})
              showModal()
            }}
          >
            <FormattedMessage id="mt.xinzhengkehu" />
          </AddButton>
        )}
        search={{ span: 4 }}
        showOptionColumn
        // @TODO 暂时隐藏删除按钮
        hiddenDeleteBtn
        opColumnWidth={80}
        renderEditBtn={(record, index, action) => {
          return (
            <a
              className="!text-primary text-sm font-medium"
              onClick={() => {
                setModalInfo(record)
                showModal()
              }}
            >
              <FormattedMessage id="common.bianji" />
            </a>
          )
        }}
        getRequestResult={(result) => {
          setTotal(result?.total)
        }}
        // ghost
        action={{
          query: (params) => getClientList(params),
          del: (params) => removeClient({ ids: params.id })
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
      {/* 弹窗 */}
      <ModalForm
        info={modalInfo}
        tabActiveKey={tabActiveKey}
        ref={modalRef}
        close={() => {
          setTabActiveKey('Overview')
          setModalInfo({})
        }}
        reload={instanceRef.current?.action?.reload}
      />
    </PageContainer>
  )
}
