import { FormattedMessage } from '@umijs/max'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'
import { getAccountGroupPageList, removeAccountGroup } from '@/services/api/tradeCore/accountGroup'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function RealList() {
  return (
    <PageContainer icon="/img/emoji/6.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        showOptionColumn
        onEditItem={(record) => {
          console.log('record', record)
          push(`/account-group/real/edit/${record.id}`)
        }}
        tableExtraRender={() => (
          <div className="flex gap-3">
            <AddButton href="/account-group/real/add">
              <FormattedMessage id="mt.xinzengzhanghuzu" />
            </AddButton>
            {/* <IconFontButton icon="daoru">
              <FormattedMessage id="common.import" />
            </IconFontButton>
            <IconFontButton icon="daochu">
              <FormattedMessage id="common.export" />
            </IconFontButton> */}
          </div>
        )}
        getOpColumnBeforeItems={(record, actionRef, formRef) => {
          return (
            <a
              onClick={async () => {
                push(`/account-group/real/clone?id=${record.id}`)
              }}
              className="!text-primary text-sm font-medium mr-6"
            >
              <FormattedMessage id="mt.kelong" />
            </a>
          )
        }}
        // ghost
        action={{
          query: (params) => getAccountGroupPageList({ ...params, isSimulate: false }),
          del: (params) => removeAccountGroup(params)
        }}
      />
    </PageContainer>
  )
}
