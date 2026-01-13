import { FormattedMessage } from '@umijs/max'
import { useRef } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getEmailChannelList, removeEmailChannel } from '@/services/api/email/emailChannel'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const instanceRef = useRef<Instance>()

  return (
    <StandardTable
      columns={getColumns()}
      showOptionColumn
      tableExtraRender={() => (
        <AddButton onClick={() => push('/msg/email/add-channel')}>
          <FormattedMessage id="mt.xinjiantongdao" />
        </AddButton>
      )}
      renderEditBtn={(record) => {
        return (
          <a className="!text-primary text-sm font-medium" onClick={() => push(`/msg/email/edit-channel/${record.id}`)}>
            <FormattedMessage id="common.bianji" />
          </a>
        )
      }}
      // ghost
      action={{
        query: (params) => getEmailChannelList(params),
        del: (params) => removeEmailChannel(params)
      }}
      getInstance={(instance) => (instanceRef.current = instance)}
    />
  )
}
