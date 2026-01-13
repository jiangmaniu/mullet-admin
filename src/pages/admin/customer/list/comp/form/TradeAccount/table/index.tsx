import StandardTable from '@/components/Admin/StandardTable'

import { getColumns } from './tableConfig'

type Params = API.PageParams
type IProps = {
  getTotal?: (total: number) => void
  /**客户列表ID */
  clientId: any
  initialValues?: Customer.ListItem
}

function Table({ getTotal, clientId, initialValues }: IProps) {
  return (
    <StandardTable
      columns={getColumns()}
      hideSearch
      // ghost
      // action={{
      //   query: (params) => getAccountPageList({ ...params, clientId })
      // }}
      getRequestResult={(res) => getTotal?.(res.total)}
      // @ts-ignore
      dataSource={initialValues?.accountList || []}
    />
  )
}

export default Table
