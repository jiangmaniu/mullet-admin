import { FormattedMessage, useSearchParams } from '@umijs/max'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'
import { formatOrderResult, getBgaOrderPage, updateBgaOrderDataSource } from '@/services/api/tradeCore/order'
import { push } from '@/utils/navigator'
import { getCurrentQuote } from '@/utils/wsUtil'

import { getColumns } from './tableConfig'

type Params = API.PageParams

function List() {
  const { global, ws } = useStores()
  const [total, setTotal] = useState(0)
  const quoteInfo = getCurrentQuote()
  const instanceRef = useRef<Instance>()
  const [searchParams] = useSearchParams()
  const bagOrderId = searchParams.get('bagOrderId')

  useEffect(() => {
    instanceRef.current?.form?.setFieldValue('bagOrderId', bagOrderId)
  }, [bagOrderId])

  useEffect(() => {
    let interval: any
    if (total) {
      interval = setInterval(() => {
        instanceRef.current?.action?.reload()
      }, 3000)
    }

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [total])

  const [initialed, setInitialed] = useState(false)
  const storeRes = useRef<any>({})
  const storeParams = useRef<any>({})

  const queryHanlder = async (params: any) => {
    if (JSON.stringify(params) === JSON.stringify(storeParams.current) && initialed) {
      let records = await updateBgaOrderDataSource(storeRes.current.data.records)
      const data = {
        ...storeRes.current,
        data: {
          ...storeRes.current.data,
          records
        }
      }
      return data
    }

    storeParams.current = params
    setInitialed(false)

    const res = await getBgaOrderPage(params)
    const data = formatOrderResult(res)
    data.data.records = await updateBgaOrderDataSource(data.data.records)

    setInitialed(true)
    storeRes.current = data

    return data
  }

  return (
    <PageContainer
      icon="/img/emoji/2.png"
      subTitle={
        <>
          {!!total && (
            <div>
              <FormattedMessage id="mt.chicangdanshuliang" />：{total}
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
                push(`/order/position/view/${record.id}`)
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
          query: queryHanlder
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}

export default observer(List)
