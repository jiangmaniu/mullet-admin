import StandardTable from '@/components/Admin/StandardTable'
import { getOrderPage } from '@/services/api/tradeCore/order'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function Dashboard() {
  return (
    <div className="max-w-[100%]">
      <StandardTable
        columns={getColumns()}
        hideSearch
        // ghost
        scroll={{ y: 400, x: 500 }}
        bordered={false}
        cardProps={{ bordered: false, bodyStyle: { padding: 0 } }}
        action={{
          query: (params) => getOrderPage(params)
        }}
      />
    </div>
  )
}
