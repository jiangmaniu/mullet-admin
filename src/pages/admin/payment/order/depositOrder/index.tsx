import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { getDepositOrderListPage } from '@/services/api/payment/deposit'

import { getColumns } from './tableConfig'

export default function List() {
  return (
    <PageContainer icon="/img/emoji/12.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        // ghost
        action={{
          query: (params) => getDepositOrderListPage(params)
        }}
      />
    </PageContainer>
  )
}
