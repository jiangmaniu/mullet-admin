import { FormattedMessage } from '@umijs/max'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { getTradingStatAccount } from '@/services/api/crmManage/trading'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

export default function List() {
  return (
    <PageContainer icon="/img/emoji/23.png" pageBgColorMode="gray">
      <div className="relative">
        <div className=" absolute right-0 top-0 z-10">
          <Export />
        </div>
        <StandardTable
          columnEmptyText="0"
          columns={getColumns()}
          showOptionColumn
          opColumnWidth={80}
          search={{
            span: 3,
            submitterColSpanProps: { span: 8, offset: 0 },
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
          renderOptionColumn={(record) => {
            return (
              <a
                className="!text-gray font-medium text-sm cursor-pointer"
                onClick={() => {
                  push(`/crms/customer/view/${record.clientId}`)
                }}
              >
                <FormattedMessage id="common.chakan" />
              </a>
            )
          }}
          // ghost
          action={{
            query: (params) => getTradingStatAccount(params)
          }}
        />
      </div>
    </PageContainer>
  )
}
