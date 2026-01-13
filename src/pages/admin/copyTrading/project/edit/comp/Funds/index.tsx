import { ProCard } from '@ant-design/pro-components'

import StandardTable from '@/components/Admin/StandardTable'
import { getOrderPage } from '@/services/api/tradeCore/order'

import { getColumns } from './tableConfig'

export default function Profit() {
  return (
    <ProCard>
      <StandardTable
        columns={getColumns()}
        cardProps={{ bodyStyle: { padding: 0 } }}
        // ghost
        action={{
          query: (params) => getOrderPage(params)
        }}
      />
    </ProCard>
  )
}
