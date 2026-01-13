import { useParams } from '@umijs/max'

import StandardTable from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { getClientHistoryTrade } from '@/services/api/crmManage/client'

import { getColumns } from './tableConfig'

export default function HistoryTrade({
  groups,
  accounts
}: {
  groups: Record<string, { text: string; color?: string }>
  accounts: Record<string, { text: string; color?: string }>
}) {
  const { id } = useParams()

  return (
    <StandardTable
      columnEmptyText="0"
      columns={getColumns(groups, accounts)}
      cardProps={{ bodyStyle: { padding: 10 } }}
      // hideForm={true}
      search={{
        span: 4,
        submitterColSpanProps: { span: 12 },
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
              <Export />
            </div>
          ]
        }
      }}
      // ghost
      params={{ clientId: id }}
      action={{
        query: (params) => getClientHistoryTrade({ ...params })
      }}
    />
  )
}
