import { useRef } from 'react'

import StandardTable, { Instance, IStandardTableProps } from '@/components/Admin/StandardTable'
import { tradeFollowCurrentLeadOrder } from '@/services/api/tradeFollow/lead'

export default ({
  id,
  active,
  columns,
  renderOptionColumn,
  ...props
}: {
  id?: string
  active?: boolean
} & IStandardTableProps<TradeFollowLead.TradeFollowCurrentLeadOrderItem, TradeFollowLead.TradeFollowLeadOrderParams>) => {
  const instanceRef = useRef<Instance>()
  return (
    <StandardTable
      columns={columns}
      renderOptionColumn={renderOptionColumn}
      // ghost
      params={{
        leadId: id
      }}
      action={{
        query: (params) => tradeFollowCurrentLeadOrder(params)
      }}
      getInstance={(instance) => (instanceRef.current = instance)}
      {...props}
    />
  )
}
