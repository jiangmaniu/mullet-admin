import dayjs from 'dayjs'
import { useEffect } from 'react'

import StandardTable from '@/components/Admin/StandardTable'
import { getOrderPage } from '@/services/api/tradeCore/order'
import { tradeFollowLeadProfitSharingDetail } from '@/services/api/tradeFollow/lead'

import { getColumns } from './tableConfig'

export default function Table({ id }: { id: string }) {
  useEffect(() => {
    tradeFollowLeadProfitSharingDetail({
      leadId: id,
      date: dayjs().format('YYYY-MM-DD')
    })
  })

  return (
    <StandardTable
      columns={getColumns()}
      hideSearch
      bodyStyle={{ padding: 6 }}
      pageSize={10}
      // ghost
      action={{
        query: (params) => getOrderPage(params)
      }}
    />
  )
}
