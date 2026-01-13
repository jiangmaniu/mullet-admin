import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { getWithdrawalOrderPageList } from '@/services/api/payment/withdraw'

import { getColumns } from './tableConfig'

export default function List() {
  return (
    <PageContainer icon="/img/emoji/12.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        // ghost
        action={{
          query: (params) => getWithdrawalOrderPageList(params)
        }}
      />
    </PageContainer>
  )
}
