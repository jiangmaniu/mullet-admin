import { useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { useStores } from '@/context/mobxProvider'
import { transferTableData } from '@/pages/admin/order/comp/OrderDetail'
import { getBgaOrderPage, getOrderAllDetail } from '@/services/api/tradeCore/order'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const { global } = useStores()
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([])

  const [loadedChildren, setLoadedChildren] = useState<Record<string, any>>({})
  return (
    <PageContainer icon="/img/emoji/23.png" pageBgColorMode="gray">
      <div className="relative">
        <div className=" absolute right-0 top-0 z-10">
          <Export />
        </div>
        <StandardTable
          columns={getColumns()}
          showExpandRowStyle
          expandable={{
            expandedRowKeys: expandedRowKeys,
            onExpand: async (expanded, record) => {
              if (expanded && !loadedChildren[record.id]) {
                // 动态加载子数据
                const _res = await getOrderAllDetail({ id: record.id })

                setLoadedChildren((prev) => ({ ...prev, [record.id]: transferTableData(_res.data) }))
              }
              setExpandedRowKeys(expanded ? [...expandedRowKeys, record.id] : expandedRowKeys.filter((k: any) => k !== record.id))
            },
            expandedRowRender: (record) => (
              // 根据已加载的子数据渲染
              <StandardTable hideSearch dataSource={loadedChildren[record.id].children} columns={getColumns()} />
            )
          }}
          search={{
            span: 3,
            submitterColSpanProps: { span: 5 },
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
          params={{
            status: 'FINISH',
            bagOrderTime: 600
          }}
          action={{
            // 默认值BAG
            query: async (params) => {
              // @ts-ignore
              const res = await getBgaOrderPage({ ...params })

              if (!res.data) return res

              const data = res.data.records.map((item: any) => transferTableData(item))

              return {
                ...res,
                data
              }
            }
          }}
        />
      </div>
    </PageContainer>
  )
}
