import { FormattedMessage, useSearchParams } from '@umijs/max'
import { useEffect, useRef } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'
import { getWithdrawalOrderPageList } from '@/services/api/crmManage/client'
import { push } from '@/utils/navigator'

import { TabProps } from '..'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function Detail(props: TabProps) {
  const { global } = useStores()

  const [searchParams, setSearchParams] = useSearchParams()
  const instanceRef = useRef<Instance>()

  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const account = searchParams.get('account')
  const status = searchParams.get('status')

  useEffect(() => {
    if (props.activeKey !== 'Detail') return

    // 设置表单值
    instanceRef.current?.form?.setFieldsValue({
      dateRangeNoTime: [props.params?.startDate || startDate || undefined, props.params?.endDate || endDate || undefined],
      account: props.params?.account || account || undefined,
      status: props.params?.status || status || 'ALLALL'
    })

    // 提交表单
    instanceRef.current?.form?.submit()
  }, [props.params, props.activeKey, searchParams])

  return (
    <div className="relative">
      <StandardTable
        columnEmptyText="0"
        columns={getColumns(props)}
        opColumnWidth={80}
        // tableExtraRender={() => (
        //   <div key="action" className="flex items-center">
        //     <Export />
        //   </div>
        // )}
        search={{
          span: 4
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
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
        // ghost
        action={{
          query: (params) => getWithdrawalOrderPageList(params)
        }}
        onReset={async () => {
          // 重置表单时，清空筛选条件
          props.setParams({})

          // 重置地址栏参数
          setSearchParams({ activeKey: 'Detail' })
        }}
      />
    </div>
  )
}
