import { FormattedMessage } from '@umijs/max'

import StandardTable from '@/components/Admin/StandardTable'
import { IconFontButton } from '@/components/Base/Button'
import { getOrderPage } from '@/services/api/tradeCore/order'

import ModalForm from './ModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  return (
    <StandardTable
      columns={getColumns()}
      hideSearch
      showOptionColumn
      tableExtraRender={() => (
        <ModalForm
          trigger={
            <IconFontButton icon="moban" style={{ paddingLeft: 20, paddingRight: 20, height: 36 }} type="primary">
              <FormattedMessage id="mt.xinjianmoban" />
            </IconFontButton>
          }
        />
      )}
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
        query: (params) => getOrderPage(params)
      }}
    />
  )
}
