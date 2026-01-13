import { FormattedMessage, getIntl, useSearchParams } from '@umijs/max'
import { useEffect, useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { useStores } from '@/context/mobxProvider'
import { getFindChannelUser } from '@/services/api/crmManage/trading'
import { push } from '@/utils/navigator'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function Order() {
  const { global } = useStores()
  const instanceRef = useRef<Instance>()

  const [searchParams, setSearchParams] = useSearchParams()
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const lastLoginStartDate = searchParams.get('lastLoginStartDate')
  const lastLoginEndDate = searchParams.get('lastLoginEndDate')
  const fastAStartTime = searchParams.get('fastAStartTime')
  const fastAEndTime = searchParams.get('fastAEndTime')
  const isKycAuth = searchParams.get('isKycAuth') ?? 'ALLALL'

  useEffect(() => {
    instanceRef.current?.form?.setFieldsValue({
      time1: [startDate, endDate],
      time2: [fastAStartTime, fastAEndTime],
      time3: [lastLoginStartDate, lastLoginEndDate],
      isKycAuth
    })
  }, [searchParams])

  return (
    <PageContainer
      icon="/img/emoji/23.png"
      pageBgColorMode="gray"
      pageTitle={getIntl().formatMessage({ id: 'mt.qudaomingxi' })}
      contentStyle={{ paddingTop: 15, paddingInline: 36 }}
    >
      {' '}
      <div className="relative">
        <StandardTable
          columns={getColumns()}
          opColumnWidth={80}
          // tableExtraRender={() => (
          //   <div key="action" className="flex items-center">
          //     <Export />
          //   </div>
          // )}
          search={{
            span: 3
          }}
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
            query: (params) => getFindChannelUser({ ...params })
          }}
          debounceTime={500}
          onReset={() => {
            // 重置表单时，重置地址栏筛选条件
            setSearchParams({})
          }}
          getInstance={(instance) => (instanceRef.current = instance)}
        />
      </div>
    </PageContainer>
  )
}
