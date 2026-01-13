import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Popconfirm } from 'antd'
import { useMemo, useRef, useState } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import StatisticCard from '@/components/Admin/StatisticCard'
import Iconfont from '@/components/Base/Iconfont'
import { refuseOrPass, withdrawalRecordCount, withdrawalRecordPageList } from '@/services/api/agent/withdrawalRecord'
import { cn } from '@/utils/cn'
import { message } from '@/utils/message'

import ModalForm from './ModalForm'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const intl = useIntl()

  const [loading, setLoading] = useState(false)
  const modalRef = useRef<any>(null)
  const instanceRef = useRef<Instance>()

  const { data: countRes, run: queryCount } = useRequest(withdrawalRecordCount, { manual: true })
  const countData = countRes?.data || {}

  // 刷新列表
  const reload = () => {
    instanceRef.current?.action?.reload()
  }

  const handlePass = async (id: any) => {
    const res = await refuseOrPass({ status: 'PASS', id })
    if (res.success) {
      message.info(intl.formatMessage({ id: 'common.opSuccess' }))
      reload()
    }
  }

  const renderStaticCardItems = useMemo(() => {
    const staticCardItems = [
      {
        label: <FormattedMessage id="mt.agent.weitixianyongjin" />,
        value: countData?.unWithdrawnCommission || 0,
        valueColor: countData?.unWithdrawnCommission
          ? countData?.unWithdrawnCommission > 0
            ? 'var(--color-green)'
            : 'var(--color-red)'
          : '',
        showAddSymbol: true
      },
      {
        label: <FormattedMessage id="mt.agent.yitixianyongjin" />,
        value: countData?.withdrawnCommission || 0,
        valueColor: countData?.withdrawnCommission ? (countData?.withdrawnCommission > 0 ? 'var(--color-green)' : 'var(--color-red)') : '',
        showAddSymbol: true
      }
    ]
    return (
      <StatisticCard
        style={{ width: 300 }}
        cardProps={{ bordered: false }}
        subCardProps={{ ghost: true }}
        items={staticCardItems}
        direction="row"
        needFormatValue
      />
    )
  }, [intl.locale, countData])

  return (
    <div className="relative">
      <div className="text-sm absolute top-4 right-0 z-[1]">
        <Iconfont name="biaoshi" className="!size-[14px] mr-1" />
        <FormattedMessage id="mt.agent.huobidanwei" /> USD
      </div>
      <StandardTable<AgentWithdrawalRecord.withdrawalRecordPageListItem, AgentWithdrawalRecord.withdrawalRecordPageListParams>
        columns={getColumns()}
        search={{ span: 4 }}
        // onEditItem={(record) => {
        //   console.log('record', record)
        // }}
        // @TODO 暂时不支持
        // tableExtraRender={() => (
        //   <div>
        //     <Export />
        //   </div>
        // )}
        renderTableHeader={() => <div className="mb-4">{renderStaticCardItems}</div>}
        opColumnWidth={120}
        renderOptionColumn={(record) => {
          return (
            <div className="flex items-center justify-end gap-5">
              <Popconfirm
                title={intl.formatMessage({ id: 'mt.agent.quedingtongguoma' })}
                onConfirm={() => {
                  handlePass(record.id)
                }}
                disabled={false}
              >
                <a
                  className={cn('!text-green font-medium text-sm', {
                    'pointer-events-none !text-gray-900 opacity-40': record.status !== 'WAIT'
                  })}
                >
                  <FormattedMessage id="mt.tongguo" />
                </a>
              </Popconfirm>
              <a
                className={cn('!text-red font-medium text-sm', {
                  'pointer-events-none !text-gray-900 opacity-40': record.status !== 'WAIT'
                })}
                onClick={() => {
                  modalRef.current.show(record)
                }}
              >
                <FormattedMessage id="mt.jujue" />
              </a>
            </div>
          )
        }}
        showOptionColumn
        // ghost
        action={{
          query: (params) => {
            queryCount({
              ...params
            })
            setLoading(true)
            return withdrawalRecordPageList(params).finally(() => {
              setLoading(false)
            })
          }
        }}
        loading={loading}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
      <ModalForm ref={modalRef} reload={reload} />
    </div>
  )
}
