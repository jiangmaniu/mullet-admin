import { useRef } from 'react'

import StandardTable, { Instance, IStandardTableProps } from '@/components/Admin/StandardTable'
import { tradeFollowHistoryLeadOrder } from '@/services/api/tradeFollow/lead'

export default ({
  id,
  active,
  columns,
  renderOptionColumn,
  ...props
}: {
  id?: string
  active?: boolean
} & IStandardTableProps<TradeFollowLead.TradeFollowHistoryLeadOrderItem, TradeFollowLead.TradeFollowLeadOrderParams>) => {
  const instanceRef = useRef<Instance>()

  return (
    <StandardTable
      columns={columns}
      renderOptionColumn={renderOptionColumn}
      params={{
        leadId: id
      }}
      // ghost
      action={{
        query: (params) => tradeFollowHistoryLeadOrder(params)
      }}
      getInstance={(instance) => (instanceRef.current = instance)}
      {...props}
    />
  )
}
