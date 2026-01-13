import { FormattedMessage, request } from '@umijs/max'

import StandardTable from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'

import ModalForm from './comp/ModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  return (
    <StandardTable
      columns={getColumns()}
      hideSearch
      showOptionColumn
      tableExtraRender={() => <ModalForm trigger={<AddButton />} />}
      renderEditBtn={(record) => {
        return (
          <ModalForm
            trigger={
              <a className="!text-primary text-sm font-medium">
                <FormattedMessage id="common.bianji" />
              </a>
            }
            info={record}
          />
        )
      }}
      // ghost
      action={{
        query: (params) =>
          request<{
            data: any[]
          }>('https://proapi.azurewebsites.net/github/issues', {
            params
          })
      }}
    />
  )
}
