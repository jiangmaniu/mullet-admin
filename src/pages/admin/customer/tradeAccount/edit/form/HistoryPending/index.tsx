import { FormattedMessage, useParams } from '@umijs/max'
import { forwardRef, useEffect, useRef } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { getOrderPage } from '@/services/api/tradeCore/order'
import { cn } from '@/utils/cn'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

type Params = API.PageParams

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
  active?: boolean
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, active }: IProps, ref) => {
  const query = useParams()
  const tableRef = useRef<Instance>(null)

  useEffect(() => {
    if (active) {
      tableRef?.current?.action?.reload()
    }
  }, [active])

  return (
    <StandardTable
      columns={getColumns()}
      ghost
      searchFormBgColor="#fff"
      action={{
        query: (params) => getOrderPage({ ...params, accountId: query.id })
      }}
      opColumnWidth={80}
      showOptionColumn
      renderOptionColumn={(record) => {
        return (
          <a
            className={cn(
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
      ref={tableRef}
    />
  )
})
