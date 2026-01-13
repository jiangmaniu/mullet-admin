import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getChannelConfigList } from '@/services/api/payment/channel'
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
        tableExtraRender={() => <AddButton href="/payment/deposit-channel/add" />}
        onEditItem={(record) => {
          push(`/payment/deposit-channel/edit/${record.id}`)
        }}
        // ghost
        action={{
          query: (params) => getChannelConfigList({ fundsType: 'DEPOSIT', ...params })
        }}
      />
    </PageContainer>
  )
}
