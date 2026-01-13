import { FormattedMessage, useParams } from '@umijs/max'
import { forwardRef, useEffect, useRef } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { getBgaOrderPage } from '@/services/api/tradeCore/order'
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
        query: (params) =>
          getBgaOrderPage({ ...params, status: 'FINISH', orderByField: 'finishTime', orderBy: 'DESC', accountId: query.id })
      }}
      opColumnWidth={80}
      showOptionColumn
      renderOptionColumn={(record) => {
        return (
          <a
            className="!text-primary font-medium text-sm cursor-pointer"
            onClick={() => {
              push(`/order/position/view/${record.id}`)
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
