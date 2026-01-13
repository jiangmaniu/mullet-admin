import { useParams } from '@umijs/max'
import { useEffect, useRef, useState } from 'react'

import StandardTable from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { getClientCurrentOrder } from '@/services/api/crmManage/client'
import { formatOrderResult, updateBgaOrderDataSource } from '@/services/api/tradeCore/order'

import { getColumns } from './tableConfig'

export default function CurrentOrder({
  groups,
  accounts,
  active
}: {
  groups: Record<string, { text: string; color?: string }>
  accounts: Record<string, { text: string; color?: string }>
  active: boolean
}) {
  const { id } = useParams()
  const instanceRef = useRef<any>(null)

  const [initialed, setInitialed] = useState(false)
  const [hasData, setHasData] = useState(false)
  const storeRes = useRef<any>({})
  const storeParams = useRef<any>({})

  const queryHanlder = async (params: any) => {
    // 如果 params 没有变化，则不重新请求
    if (JSON.stringify(params) === JSON.stringify(storeParams.current) && initialed) {
      console.log('不重新请求 currentOrder')
      let ndata = storeRes.current.data.records
      ndata = await updateBgaOrderDataSource(ndata)
      const nres = {
        ...storeRes.current,
        data: {
          ...storeRes.current.data,
          records: ndata
        }
      }
      return nres
    }

    storeParams.current = params
    setInitialed(false)

    const res = await getClientCurrentOrder(params)

    if (!res.data.records.length) return res

    let ndata = formatOrderResult(res.data.records)
    ndata = await updateBgaOrderDataSource(ndata)
    const nres = {
      ...res,
      data: {
        ...res.data,
        records: ndata
      }
    }
    setInitialed(true)
    storeRes.current = nres

    return nres
  }

  useEffect(() => {
    if (!active || !initialed) return

    let interval: any
    if (hasData) {
      interval = setInterval(() => {
        instanceRef.current?.action?.reload()
      }, 3000)
    }

    return () => clearInterval(interval)
  }, [active, initialed, hasData])

  return (
    <StandardTable
      columnEmptyText="0"
      getInstance={(instance) => (instanceRef.current = instance)}
      columns={getColumns(groups, accounts)}
      cardProps={{ bodyStyle: { padding: 10 } }}
      // hideForm={true}
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
              <Export />
            </div>
          ]
        }
      }}
      params={{ clientId: id, orderStatus: 'ENTRUST' as API.OrderStatus }}
      // params={{ clientId: id }}
      // ghost
      action={{
        query: queryHanlder
      }}
      getRequestResult={({ total }) => {
        setHasData(total > 0)
      }}
    />
  )
}
