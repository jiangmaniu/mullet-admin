import { FormattedMessage, request } from '@umijs/max'
import { Popconfirm } from 'antd'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import { AddButton } from '@/components/Base/Button'

import ModalFormOne from '../comp/ModalFormOne'
import ModalFormTwo from '../comp/ModalFormTwo'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function PaySupplier() {
  return (
    <PageContainer icon="/img/emoji/13.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        // ghost
        showOptionColumn
        tableExtraRender={() => (
          <ModalFormOne
            trigger={
              <AddButton style={{ paddingLeft: 20, paddingRight: 20, height: 34 }}>
                <FormattedMessage id="common.add" />
              </AddButton>
            }
          />
        )}
        opColumnWidth={180}
        renderOptionColumn={(record) => {
          return (
            <div className="flex items-center justify-end gap-4">
              <ModalFormOne
                trigger={
                  <a className="!text-primary text-sm font-medium">
                    <FormattedMessage id="common.bianji" />
                  </a>
                }
                info={record}
              />
              {/* @TODO 处理查看不能编辑表单 */}
              <ModalFormTwo
                trigger={
                  <a className="!text-primary text-sm font-medium">
                    <FormattedMessage id="common.chakan" />
                  </a>
                }
                info={record}
              />
              <Popconfirm
                title={<FormattedMessage id="common.confirmDelete" />}
                onConfirm={async () => {
                  console.log('delte')
                }}
              >
                <a className="!text-primary font-medium text-sm">
                  <FormattedMessage id="common.delete" />
                </a>
              </Popconfirm>
            </div>
          )
        }}
        action={{
          query: (params) =>
            request<{
              data: any[]
            }>('https://proapi.azurewebsites.net/github/issues', {
              params
            })
        }}
      />
    </PageContainer>
  )
}
