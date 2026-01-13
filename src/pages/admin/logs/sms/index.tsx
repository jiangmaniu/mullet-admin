import { FormattedMessage } from '@umijs/max'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { getUsualLogList } from '@/services/api/logs'

import ModalForm from './ModalForm'
import { getColumns } from './tableConfig'

export default function List() {
  return (
    <PageContainer icon="/img/emoji/17.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        showOptionColumn
        hiddenEditBtn
        hiddenDeleteBtn
        pageSize={50}
        opColumnWidth={100}
        getOpColumnItems={(record) => {
          return (
            <ModalForm
              trigger={
                <a className="!text-primary text-sm font-medium ml-6">
                  <FormattedMessage id="mt.chakan" />
                </a>
              }
              info={record}
            />
          )
        }}
        // ghost
        action={{
          query: (params) =>
            getUsualLogList({
              logId: 'sms',
              ...params
            })
        }}
        // rowClassName={(record, i) => {
        //   // @TODO 异常的状态行标红
        //   let className = i === 0 ? 'text-red' : ''

        //   return className
        // }}
      />
    </PageContainer>
  )
}
