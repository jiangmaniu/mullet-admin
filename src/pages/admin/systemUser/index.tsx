import { FormattedMessage } from '@umijs/max'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getManagerList, removeManager } from '@/services/api/crm/manager'

import ModalForm from './comp/ModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const instanceRef = useRef<Instance>()

  return (
    <PageContainer icon="/img/emoji/5.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        tableExtraRender={() => (
          <ModalForm
            trigger={
              <AddButton>
                <FormattedMessage id="common.add" />
              </AddButton>
            }
            reload={instanceRef.current?.action?.reload}
          />
        )}
        search={{ span: 4 }}
        // onEditItem={(record) => {
        //   console.log('record', record)
        // }}
        renderEditBtn={(record, index, action) => {
          return (
            <ModalForm
              trigger={
                <a className="!text-primary text-sm font-medium">
                  <FormattedMessage id="common.bianji" />
                </a>
              }
              info={record}
              reload={action?.reload}
            />
          )
        }}
        showOptionColumn
        hiddenDeleteBtn
        // ghost
        action={{
          query: (params) => getManagerList(params),
          del: (params) => removeManager({ ids: params.id })
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
