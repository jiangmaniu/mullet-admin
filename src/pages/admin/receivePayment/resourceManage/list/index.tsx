import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getReceiveResourceListPage } from '@/services/api/receivePayment/receiveManage'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

export default function List() {
  return (
    <PageContainer icon="/img/emoji/12.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        showOptionColumn
        hiddenDeleteBtn
        opColumnWidth={80}
        tableExtraRender={() => <AddButton href="/receive-payment/resource-manage/add" />}
        onEditItem={(record) => {
          push(`/receive-payment/resource-manage/edit/${record.id}`)
        }}
        // ghost
        action={{
          query: (params) => getReceiveResourceListPage({ ...params })
        }}
      />
    </PageContainer>
  )
}
