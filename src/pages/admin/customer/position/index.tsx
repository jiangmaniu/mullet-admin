import { FormattedMessage } from '@umijs/max'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'
import { formatOrderResult, getBgaOrderPage, updateBgaOrderDataSource } from '@/services/api/tradeCore/order'
import { push } from '@/utils/navigator'
import { getCurrentQuote } from '@/utils/wsUtil'

import { getColumns } from './tableConfig'

type Params = API.PageParams

function List() {
  const { trade, ws } = useStores()
  const [total, setTotal] = useState(0)
  const quoteInfo = getCurrentQuote()

  // useEffect(() => {
  //   // 连接行情
  //   ws.reconnect()

  //   return () => {
  //     // 关闭行情
  //     ws.close()
  //   }
  // }, [])
  const instanceRef = useRef<any>(null)

  useEffect(() => {
    let interval: any

    if (total) {
      interval = setInterval(() => {
        instanceRef.current?.action?.reload()
      }, 3000)
    }

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [total])

  return (
    <PageContainer
      icon="/img/emoji/2.png"
      pageBgColorMode="gray"
      subTitle={
        <>
          {!!total && (
            <div>
              <FormattedMessage id="mt.chicangdanshuliang" />：{total}
            </div>
          )}
        </>
      }
    >
      <StandardTable
        getInstance={(instance) => (instanceRef.current = instance)}
        columns={getColumns()}
        // ghost
        hiddenDeleteBtn
        // 持仓列表不能删除和编辑
        showOptionColumn={false}
        opColumnWidth={80}
        onEditItem={(record) => {
          console.log('record', record)
          // 跳转到交易页面，带上交易品种等信息，填入交易输入框
          push(`/customer/account/edit/${record.tradeAccountId}?key=Trade`)
        }}
        getRequestResult={(result) => {
          setTotal(result?.total)
        }}
        action={{
          // @ts-ignore
          // 默认值BAG
          query: (params) =>
            getBgaOrderPage({ ...params }).then(async (res) => {
              const data = formatOrderResult(res)
              data.data.records = await updateBgaOrderDataSource(data.data.records)

              return data
            })
        }}
      />
    </PageContainer>
  )
}

export default observer(List)
