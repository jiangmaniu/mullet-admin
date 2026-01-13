import { request } from '@umijs/max'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function Firewall() {
  return (
    <PageContainer
      // 替换图标
      icon="/img/emoji/11.png"
      pageBgColorMode="gray"
    >
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
