import './index.less'

import { useSearchParams } from '@umijs/max'
import { useEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import { useStores } from '@/context/mobxProvider'
import { getTradingUser } from '@/services/api/crmManage/trading'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const { global } = useStores()
  const instanceRef = useRef<Instance>()
  const [searchParams, setSearchParams] = useState<any>({})
  const [urlSearchParams, setUrlSearchParams] = useSearchParams()
  const lastTradeStartTime = urlSearchParams.get('lastTradeStartTime')
  const lastTradeEndTime = urlSearchParams.get('lastTradeEndTime')

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger the table to reload data
      getTradingUser(searchParams)
    }, 60000) // 60000 milliseconds = 1 minute

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  useEffect(() => {
    instanceRef.current?.form?.setFieldValue('lastTradeTime', [lastTradeStartTime, lastTradeEndTime])
  }, [urlSearchParams])

  return (
    <PageContainer icon="/img/emoji/23.png" pageBgColorMode="gray">
      <div className="relative">
        <StandardTable
          columnEmptyText="0"
          columns={getColumns()}
          search={{
            span: 4
          }}
          tableExtraRender={() => {
            return <Export />
          }}
          // ghost
          action={{
            query: (params: any) => {
              if (params.regTime) {
                params.regStartTime = params.regTime[0]
                params.regEndTime = params.regTime[1]
              }
              if (params.fastATime) {
                params.fastAStartTime = params.fastATime[0]
                params.fastAEndTime = params.fastATime[1]
              }

              if (!params.orderBy || !params.orderByField) {
                params.orderBy = 'DESC'
                params.orderByField = 'volume'
              }
              delete params.regTime
              delete params.fastATime
              setSearchParams(params)
              return getTradingUser(params)
            }
          }}
          debounceTime={500}
          getInstance={(instance) => (instanceRef.current = instance)}
          onReset={() => {
            // 重置地址栏参数
            setUrlSearchParams({})
          }}
        />
      </div>
    </PageContainer>
  )
}
