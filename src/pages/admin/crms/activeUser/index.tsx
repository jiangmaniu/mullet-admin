import { FormattedMessage } from '@umijs/max'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { getActiveUsersTable } from '@/services/api/crmManage/trading'

import { getColumns } from './tableConfig'

export default function List() {
  return (
    <PageContainer
      icon="/img/emoji/23.png"
      pageBgColorMode="gray"
      pageTitle={
        <div className="flex flex-col items-start gap-1">
          <div className="text-xl font-bold">
            <FormattedMessage id="menu.crms.active-user" />
          </div>
          <div className="text-sm text-gray-500">
            <FormattedMessage id="mt.jiaoyixingwei" />
          </div>
        </div>
      }
    >
      <div className="relative">
        <div className="absolute right-0 top-0 z-10">
          <Export />
        </div>
        <StandardTable
          columns={getColumns()}
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
                  {/* <Export /> */}
                </div>
              ]
            }
          }}
          // ghost
          action={{
            query: (params) => getActiveUsersTable(params)
          }}
        />
      </div>
    </PageContainer>
  )
}
