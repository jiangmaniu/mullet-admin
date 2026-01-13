import { useParams } from '@umijs/max'
import { forwardRef, useImperativeHandle, useRef } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { getMoneyRecordsPageList } from '@/services/api/tradeCore/account'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default forwardRef((props, ref) => {
  const query = useParams()
  const instanceRef = useRef<Instance>()

  useImperativeHandle(ref, () => {
    return instanceRef?.current?.action
  })
  return (
    <StandardTable
      columns={getColumns()}
      ghost
      searchFormBgColor="#fff"
      action={{
        query: (params) => getMoneyRecordsPageList({ ...params, accountId: query.id as string })
      }}
      getInstance={(instance) => (instanceRef.current = instance)}
    />
  )
})
