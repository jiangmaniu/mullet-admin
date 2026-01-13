import { FormattedMessage, useIntl } from '@umijs/max'
import { Popconfirm } from 'antd'
import { useRef, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import Button from '@/components/Base/Button'
import { getActivityOrderPage, stopActivity } from '@/services/api/activity'
import { cn } from '@/utils/cn'
import { message } from '@/utils/message'

import ActivityDetailModal from './ActivityDetailModal'
import ModalForm from './ModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const instanceRef = useRef<Instance>()
  const [modalInfo, setModalInfo] = useState({})
  const modalRef = useRef<any>()
  const activityDetailModalRef = useRef<any>()
  const intl = useIntl()

  const reload = () => instanceRef.current?.action?.reload?.()

  const showActivityDetailModal = (record: any) => {
    activityDetailModalRef.current?.show(record)
  }

  return (
    <PageContainer icon="/img/emoji/11.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns(showActivityDetailModal)}
        showOptionColumn
        opColumnWidth={100}
        renderOptionColumn={(record) => {
          return (
            <>
              <Popconfirm
                title={intl.formatMessage({ id: 'mt.quedingyaojieshuhuodongma' })}
                onConfirm={() => {
                  // 结束活动
                  stopActivity({ id: record.id, status: false }).then((res) => {
                    if (res.success) {
                      message.info(intl.formatMessage({ id: 'common.opSuccess' }))
                      reload()
                    }
                  })
                }}
              >
                <a className={cn('!text-brand text-sm font-medium', !record.status && 'pointer-events-none !text-gray-900 opacity-40')}>
                  <FormattedMessage id="mt.jieshuhuodong" />
                </a>
              </Popconfirm>
              {/* <a
                className="!text-primary text-sm font-medium"
                onClick={() => {
                  setModalInfo(record)
                  modalRef.current?.show()
                }}
              >
                <FormattedMessage id="common.bianji" />
              </a>
              <Popconfirm
                title={intl.formatMessage({ id: 'common.confirmDelete' })}
                onConfirm={() => {
                  // @TODO: 删除
                }}
                key="delete"
              >
                <a className="!text-primary font-medium text-sm ml-6">
                  <FormattedMessage id="common.delete" />
                </a>
              </Popconfirm> */}
            </>
          )
        }}
        tableExtraRender={() => (
          <Button
            onClick={() => {
              modalRef.current?.show()
            }}
            type="primary"
          >
            <FormattedMessage id="mt.huodongpeizhi" />
          </Button>
        )}
        // ghost
        action={{
          query: (params) => getActivityOrderPage(params)
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
      <ModalForm ref={modalRef} />
      <ActivityDetailModal ref={activityDetailModalRef} />
    </PageContainer>
  )
}
