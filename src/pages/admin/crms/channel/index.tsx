import { useIntl } from '@umijs/max'
import * as lodash from 'lodash'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { getTradingChannel } from '@/services/api/crmManage/trading'
import { formatNum } from '@/utils'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const intl = useIntl()

  const idx = ['active', 'group', 'regUserCount', 'kycAuthCount', 'firstDepositUserCount', 'totalFirstAMoney', 'customerTransaction']
  const getSummary = (pageData: any) => {
    return (
      <tr>
        <td className="text-left !px-5"> {intl.formatMessage({ id: 'mt.huizong' })} </td>
        <td className="text-center !px-5">{lodash.sum(pageData.map((item: any) => item.reg_user))}</td>
        {Array.from({ length: 7 }, (_, i) => {
          const idxx = idx[i]
          let list = []

          if (idxx === 'customerTransaction') {
            list = pageData.map((item: any) => {
              return !Number.isNaN(Number(item.totalFirstAMoney)) && Number(item.totalFirstAMoney) !== 0
                ? Number(item.totalFirstAMoney) / item.regUserCount
                : 0
            })
          } else {
            list = pageData.map((item: any) => Number(item[idxx]) || 0)
          }

          const sum = lodash.sum(list)

          return (
            <td className="text-right !px-5" key={i}>
              {sum && sum !== 0 ? formatNum(sum, { precision: i >= 5 ? 2 : 0 }) : ''}
            </td>
          )
        })}
      </tr>
    )
  }

  return (
    <PageContainer icon="/img/emoji/23.png" pageBgColorMode="gray">
      <div className="relative">
        <div className=" absolute right-0 top-0 z-10">
          <Export />
        </div>
        <StandardTable
          columns={getColumns()}
          summary={getSummary}
          search={{
            span: 4,
            submitterColSpanProps: { span: 16 },
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
            query: (params) => getTradingChannel(params)
          }}
        />
      </div>
    </PageContainer>
  )
}
