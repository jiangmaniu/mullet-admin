import { FormattedMessage, useSearchParams } from '@umijs/max'
import { useEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'
import { getTradeRecordsPage } from '@/services/api/tradeCore/order'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const { global } = useStores()
  const [total, setTotal] = useState(0)

  const instanceRef = useRef<Instance>()

  const [searchParams] = useSearchParams()
  const tradeRecordsId = searchParams.get('tradeRecordsId')

  useEffect(() => {
    instanceRef.current?.form?.setFieldValue('tradeRecordsId', tradeRecordsId)
  }, [tradeRecordsId])

  return (
    <PageContainer
      icon="/img/emoji/2.png"
      subTitle={
        <>
          {!!total && (
            <div>
              <FormattedMessage id="mt.chengjiaoshuliang" />：{total}
            </div>
          )}
        </>
      }
      pageBgColorMode="gray"
    >
      <StandardTable
        columns={getColumns()}
        opColumnWidth={80}
        showOptionColumn
        renderOptionColumn={(record) => {
          return (
            <a
              className="!text-primary font-medium text-sm cursor-pointer"
              onClick={() => {
                // @ts-ignore
                push(`/order/close/view/${record.bagOrderId}`)
              }}
            >
              <FormattedMessage id="common.chakan" />
            </a>
          )
        }}
        getRequestResult={(result) => {
          setTotal(result?.total)
        }}
        // ghost
        action={{
          query: (params) => getTradeRecordsPage(params)
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
