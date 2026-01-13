import { useSearchParams } from '@umijs/max'
import { useEffect, useRef } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'
import { getWithdrawalOrderDetailPageList } from '@/services/api/crmManage/client'

import { TabProps } from '..'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function Order(props: TabProps) {
  const { global } = useStores()
  const instanceRef = useRef<Instance>()
  const [searchParams, setSearchParams] = useSearchParams()

  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const account = searchParams.get('account')
  const tradeAccountId = searchParams.get('tradeAccountId')
  const channelId = searchParams.get('channelId')
  const channelOrderNo = searchParams.get('channelOrderNo')
  const orderNo = searchParams.get('orderNo')
  const status = searchParams.get('status')

  useEffect(() => {
    if (props.activeKey !== 'Order') return

    // 设置表单值
    instanceRef.current?.form?.setFieldsValue({
      dateRangeNoTime: [props.params?.startDate || startDate || undefined, props.params?.endDate || endDate || undefined],
      startDate: props.params?.startDate || startDate || undefined,
      endDate: props.params?.endDate || endDate || undefined,
      account: props.params?.account || account || undefined,
      tradeAccountId: props.params?.tradeAccountId || tradeAccountId || undefined,
      channelId: props.params?.channelId || channelId || undefined,
      channelOrderNo: props.params?.channelOrderNo || channelOrderNo || undefined,
      orderNo: props.params?.orderNo || orderNo || undefined,
      status: props.params?.status || status || 'ALLALL'
    })

    // 提交表单
    instanceRef.current?.form?.submit()
  }, [props.params, props.activeKey, searchParams])

  return (
    <StandardTable
      columnEmptyText="0"
      columns={getColumns(props)}
      opColumnWidth={80}
      rowKey={(record) => record.orderNo}
      search={{
        span: 4
      }}
      getInstance={(instance) => (instanceRef.current = instance)}
      // renderOptionColumn={(record) => {
      //   return (
      //     <a
      //       className="!text-gray font-medium text-sm cursor-pointer"
      //       onClick={() => {
      //         push(`/crms/customer/view/${record.clientId}`)
      //       }}
      //     >
      //       <FormattedMessage id="common.chakan" />
      //     </a>
      //   )
      // }}
      // ghost
      action={{
        query: (params) => getWithdrawalOrderDetailPageList(params)
      }}
      onReset={async () => {
        // 重置表单时，清空筛选条件
        props.setParams({})

        // 重置地址栏参数
        setSearchParams({ activeKey: 'Order' })
      }}
    />
  )
}
