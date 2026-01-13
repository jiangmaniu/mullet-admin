import { FormattedMessage } from '@umijs/max'

import StandardTable from '@/components/Admin/StandardTable'
import { getOrderPage } from '@/services/api/tradeCore/order'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

export default function Overview() {
  return (
    <StandardTable
      columns={getColumns()}
      opColumnWidth={80}
      showOptionColumn
      hideSearch
      bodyStyle={{ padding: 6 }}
      pageSize={10}
      renderOptionColumn={(record) => {
        return (
          <a
            className="!text-primary font-medium text-sm cursor-pointer"
            onClick={() => {
              push(`/copy-trading/take/view/${record.id}`)
            }}
          >
            {/* @TODO 跳转到哪里 */}
            <FormattedMessage id="common.chakan" />
          </a>
        )
      }}
      // ghost
      action={{
        query: (params) => getOrderPage(params)
      }}
    />
  )
}
