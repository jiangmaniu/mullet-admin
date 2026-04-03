import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { useMemo, useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { getFilterOptions } from '@/services/api/fundManagement/filterOptions'
import { getWithdrawalDetailList, WithdrawalDetailParams } from '@/services/api/fundManagement/withdrawalDetail'

import { getColumns } from './tableConfig'

export default function WithdrawalDetail() {
  const intl = useIntl()
  const instanceRef = useRef<Instance>()

  // 获取筛选选项配置
  const { data: filterOptionsResponse, loading: filterOptionsLoading } = useRequest(getFilterOptions)

  // 处理筛选选项，只显示 withdrawalEnabled 的链和币种
  const filterOptions = useMemo(() => {
    const filterOptionsData = filterOptionsResponse?.data
    if (!filterOptionsData) {
      return {
        channels: [],
        chains: [],
        tokens: [],
        statuses: []
      }
    }

    return {
      channels: filterOptionsData.channels || [],
      chains: (filterOptionsData.chains || []).filter((chain) => chain.withdrawalEnabled),
      tokens: (filterOptionsData.tokens || []).filter((token) => token.withdrawalEnabled),
      statuses: filterOptionsData.withdrawalStatuses || []
    }
  }, [filterOptionsResponse])

  const queryHandler = async (params: WithdrawalDetailParams) => {
    try {
      const res = await getWithdrawalDetailList(params)
      return res
    } catch (error: unknown) {
      return {
        success: false,
        data: {
          records: [],
          total: 0,
          current: 1,
          pageSize: 20,
          pages: 0
        }
      }
    }
  }

  return (
    <PageContainer icon="/img/emoji/4.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns(filterOptions)}
        scroll={{ x: 2000 }}
        loading={filterOptionsLoading}
        pageSize={20}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          hideOnSinglePage: false
        }}
        action={{
          query: queryHandler
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
