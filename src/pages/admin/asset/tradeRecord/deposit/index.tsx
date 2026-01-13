import { FormattedMessage, request } from '@umijs/max'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { IconFontButton } from '@/components/Base/Button'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function Deposit() {
  return (
    <PageContainer icon="/img/emoji/19.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        // ghost
        tableExtraRender={() => (
          <div className="flex gap-3">
            <IconFontButton icon="daochu">
              <FormattedMessage id="common.daochu" />
            </IconFontButton>
          </div>
        )}
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
