import { FormattedMessage, useSearchParams } from '@umijs/max'
import { useEffect, useRef } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'
import { getDepositOrderDetailPageList } from '@/services/api/crmManage/client'
import { push } from '@/utils/navigator'

import { TabProps } from '..'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function Order(props: TabProps) {
  const { global } = useStores()

  const [searchParams, setSearchParams] = useSearchParams()
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const account = searchParams.get('account')
  const tradeAccountId = searchParams.get('tradeAccountId')
  const status = searchParams.get('status')

  const instanceRef = useRef<Instance>()
  useEffect(() => {
    if (props.activeKey !== 'Order') return

    instanceRef.current?.form?.setFieldsValue({
      dateRangeNoTime: [props.params?.startDate || startDate, props.params?.endDate || endDate],
      startDate: props.params?.startDate || startDate || undefined,
      endDate: props.params?.endDate || endDate || undefined,
      account: props.params?.account || account || undefined,
      tradeAccountId: props.params?.tradeAccountId || tradeAccountId || undefined,
      status: props.params?.status || status || 'ALLALL'
    })

    instanceRef.current?.form?.submit()
  }, [props.params, props.activeKey, searchParams])

  return (
    <StandardTable
      columns={getColumns(props)}
      opColumnWidth={80}
      search={{
        span: 4
      }}
      // tableExtraRender={() => <Export />}
      renderOptionColumn={(record) => {
        return (
          <a
            className="!text-gray font-medium text-sm cursor-pointer"
            onClick={() => {
              push(`/crms/customer/view/${record.clientId}`)
            }}
          >
            <FormattedMessage id="common.chakan" />
          </a>
        )
      }}
      getInstance={(instance) => (instanceRef.current = instance)}
      // ghost
      action={{
        query: (params) => {
          return getDepositOrderDetailPageList(params)
        }
      }}
      onReset={async () => {
        // 重置表单时，清空筛选条件
        props.setParams({})

        // 重置地址栏参数
        setSearchParams({})
      }}
      debounceTime={500}
    />
  )
}
