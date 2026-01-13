import { FormattedMessage } from '@umijs/max'
import { useRef } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { IconFontButton } from '@/components/Base/Button'
import { getEmailTemplateList, removeEmailTemplate } from '@/services/api/email/emailTemplate'
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
        <IconFontButton
          icon="moban"
          style={{ paddingLeft: 20, paddingRight: 20, height: 36 }}
          type="primary"
          onClick={() => push('/msg/email/add-template')}
        >
          <FormattedMessage id="mt.xinjianmoban" />
        </IconFontButton>
      )}
      renderEditBtn={(record) => {
        return (
          <a className="!text-primary text-sm font-medium" onClick={() => push(`/msg/email/edit-template/${record.id}`)}>
            <FormattedMessage id="common.bianji" />
          </a>
        )
      }}
      // ghost
      action={{
        query: (params) => getEmailTemplateList(params),
        del: (params) => removeEmailTemplate(params)
      }}
      getInstance={(instance) => (instanceRef.current = instance)}
    />
  )
}
