import './index.less'

import { useEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { getSymbolProfitMap } from '@/services/api/crmManage/client'
import { getTradingMoneyPosition } from '@/services/api/crmManage/trading'

import { getColumns } from './tableConfig'

export default function List() {
  const tableRef = useRef<any>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger the table to reload data
      tableRef.current?.action?.reload()
    }, 1000) // 5s

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  const [initialed, setInitialed] = useState(false)
  const storeRes = useRef<any>({})
  const storeParams = useRef<any>({})
  const storeSymbols = useRef<any>('')

  const queryHanlder = async (params: any) => {
    // 如果 params 没有变化，则不重新请求
    if (JSON.stringify(params) === JSON.stringify(storeParams.current) && initialed) {
      const rres = await getSymbolProfitMap({ symbols: storeSymbols.current })

      let data = storeRes.current.data.map((item: any) => {
        const target = rres.data?.[item.symbol]
        if (target) {
          item.profit = target
        }
        return item
      })

      return {
        ...storeRes.current,
        data
      }
    }

    storeParams.current = params
    setInitialed(false)

    const res = await getTradingMoneyPosition(params)

    let nres = res

    if (res.success && res.data) {
      storeSymbols.current = res.data.map((item: any) => item.symbol).join(',') || ''

      const rres = await getSymbolProfitMap({ symbols: storeSymbols.current })

      let data = res.data.map((item: any) => {
        const target = rres.data?.[item.symbol]
        if (target) {
          item.profit = target
        }
        return item
      })

      nres = {
        ...res,
        data
      }
    }

    setInitialed(true)
    storeRes.current = nres

    return res
  }

  return (
    <PageContainer icon="/img/emoji/23.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        columnEmptyText="0"
        getInstance={(instance) => (tableRef.current = instance)}
        hideSearch
        pagination={{ pageSize: 10 }}
        pageSize={10}
        // ghost
        action={{
          query: queryHanlder
          // query: async (params) => {
          //   const res = await getTradingMoneyPosition(params)

          //   if (res.success && res.data) {
          //     const symbols = res.data.map((item: any) => item.symbol).join(',') || ''

          //     const rres = await getSymbolProfitMap({ symbols })

          //     let data = res.data.map((item: any) => {
          //       const target = rres.data?.[item.symbol]
          //       // console.log(target, item.symbol)
          //       if (target) {
          //         item.profit = target
          //       }
          //       return item
          //     })

          //     return {
          //       ...res,
          //       data
          //     }
          //   }

          //   return res
          // }
        }}
      />
    </PageContainer>
  )
}
