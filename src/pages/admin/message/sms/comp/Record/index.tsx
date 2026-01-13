import { FormattedMessage } from '@umijs/max'

import StandardTable from '@/components/Admin/StandardTable'
import { getMyMessageList } from '@/services/api/message'

import PreviewModal from '../../../comp/PreviewModal'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  return (
    <StandardTable
      columns={getColumns()}
      showOptionColumn
      renderOptionColumn={(record) => {
        return (
          <PreviewModal
            trigger={
              <a className="!text-primary font-medium text-sm">
                <FormattedMessage id="mt.yulan" />
              </a>
            }
            title={<FormattedMessage id="mt.yulanduanxin" />}
          />
        )
      }}
      // ghost
      action={{
        query: (params) => getMyMessageList(params)
      }}
    />
  )
}
