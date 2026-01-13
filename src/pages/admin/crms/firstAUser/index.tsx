import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { useStores } from '@/context/mobxProvider'
import { getTradingFristAUser } from '@/services/api/crmManage/trading'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const { global } = useStores()

  return (
    <PageContainer icon="/img/emoji/23.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        tableExtraRender={() => (
          <div key="action" className="flex items-center">
            <Export />
          </div>
        )}
        search={{
          span: 5,
          submitterColSpanProps: { span: 9 },
          className: 'custom-search-form-item',
          optionRender: (searchConfig, props, dom) => {
            return [
              <div key="action" className="flex items-center">
                <QueryBtnGroup
                  onSubmit={() => {
                    searchConfig.form?.submit()
                  }}
                  onReset={() => {
                    searchConfig?.form?.resetFields()
                    searchConfig?.form?.submit()
                  }}
                />
              </div>
            ]
          }
        }}
        // ghost
        action={{
          query: (params) => getTradingFristAUser(params)
        }}
      />
    </PageContainer>
  )
}
