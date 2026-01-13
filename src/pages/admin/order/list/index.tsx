import { FormattedMessage, useSearchParams } from '@umijs/max'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'
import { getOrderPage } from '@/services/api/tradeCore/order'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function OrderList() {
  const { global } = useStores()
  const [total, setTotal] = useState(0)
  const instanceRef = useRef<Instance>()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    instanceRef.current?.form?.setFieldValue('orderId', orderId)
  }, [orderId])

  return (
    <PageContainer
      icon="/img/emoji/2.png"
      subTitle={
        <>
          {!!total && (
            <div>
              <FormattedMessage id="mt.dingdanshuliang" />：{total}
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
              className={classNames(
                'font-medium text-sm cursor-pointer',
                record.tradingVolume === '0' ? 'pointer-events-none !text-gray-900 opacity-40' : '!text-primary'
              )}
              onClick={() => {
                // push(`/order/list/view/${record.id}`)
                push(`/order/list/view/${record.bagOrderIds}`)
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
          query: (params) => getOrderPage(params)
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
