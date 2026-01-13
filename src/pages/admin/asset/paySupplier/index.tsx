import { request } from '@umijs/max'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function PaySupplier() {
  return (
    <PageContainer icon="/img/emoji/14.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        // ghost
        action={{
          query: (params) =>
            request<{
              data: any[]
            }>('https://proapi.azurewebsites.net/github/issues', {
              params
            })
        }}
      />
    </PageContainer>
  )
}
