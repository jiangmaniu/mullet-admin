/* eslint-disable simple-import-sort/imports */
import { FormattedMessage, getIntl } from '@umijs/max'
import { Popconfirm, message } from 'antd'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { getTradeFollowProjectPage, tradeFollowEnabled } from '@/services/api/tradeFollow/project'
import { push } from '@/utils/navigator'

import ApproveModalForm from './comp/ApproveModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const { columns, modalInfo, setModalInfo } = getColumns()

  const instanceRef = useRef<Instance>()
  // 刷新列表
  const reload = () => {
    instanceRef.current?.action?.reload()
  }
  return (
    <PageContainer icon="/img/emoji/22.png" pageBgColorMode="gray">
      <ApproveModalForm
        open={modalInfo}
        info={modalInfo}
        close={() => {
          setModalInfo(undefined)
          reload()
        }}
      />
      <StandardTable
        columns={columns}
        showOptionColumn
        renderOptionColumn={(record) => {
          return (
            <div className="flex gap-x-5 justify-end flex-row-reverse ">
              {record.auditStatus !== 0 && (
                <Popconfirm
                  title={
                    <FormattedMessage
                      id="mt.querenma"
                      values={{
                        desc:
                          record.enabledFlag === 0
                            ? getIntl().formatMessage({ id: 'mt.jinyong' })
                            : getIntl().formatMessage({ id: 'mt.qiyong' })
                      }}
                    />
                  }
                  onConfirm={() => {
                    tradeFollowEnabled({ leadId: record.leadId as string, enabledFlag: record.enabledFlag === 0 ? 1 : 0 })
                      .then((res) => {
                        res.success && reload()
                      })
                      .catch(() => {
                        message.info(getIntl().formatMessage({ id: 'mt.shibai' }))
                      })
                  }}
                >
                  <a className="!text-primary font-medium text-sm cursor-pointer">
                    {record.enabledFlag === 1 ? <FormattedMessage id="mt.qiyong" /> : <FormattedMessage id="mt.jinyong" />}
                  </a>
                </Popconfirm>
              )}{' '}
              <a
                className="!text-primary font-medium text-sm cursor-pointer"
                onClick={() => {
                  push(`/copy-trading/project/edit/${record.leadId}`)
                }}
              >
                <FormattedMessage id="mt.xiangqing" />
              </a>
            </div>
          )
        }}
        // onEditItem={(record) => {
        //   push(`/copy-trading/project/edit/${record.leadId}`)
        // }}
        // ghost
        action={{
          // query: (params) => getTradeFollowProjectPage(params)
          // query: (params) => getOrderPage(params)
          query: (params) => getTradeFollowProjectPage(params)
          // del: (params) => removeAccountGroup(params)
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
