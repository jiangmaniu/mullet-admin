import { useRef } from 'react'

import StandardTable, { Instance, IStandardTableProps } from '@/components/Admin/StandardTable'
import { tradeFollowFollowerHistoryFollowerOrder } from '@/services/api/tradeFollow/follower'

export default ({
  id,
  active,
  columns,
  renderOptionColumn,
  ...props
}: {
  id?: string
  active?: boolean
} & IStandardTableProps<TradeFollowFollower.TradeFollowFollowerOrderItem, TradeFollowFollower.TradeFollowFollowerOrderParams>) => {
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
        query: (params) => tradeFollowFollowerHistoryFollowerOrder(params)
      }}
      getInstance={(instance) => (instanceRef.current = instance)}
      {...props}
    />
  )
}
