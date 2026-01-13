import { observer } from 'mobx-react'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getDelayUserList, removeDelayUser } from '@/services/api/crm/customer'

import ModalForm from './ModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

function List() {
  const instanceRef = useRef<Instance>()

  return (
    <PageContainer icon="/img/emoji/2.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        hiddenEditBtn
        showOptionColumn
        tableExtraRender={() => <ModalForm trigger={<AddButton />} reload={instanceRef.current?.action?.reload} />}
        action={{
          query: (params) => getDelayUserList(params),
          del: (params) => removeDelayUser(params)
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}

export default observer(List)
