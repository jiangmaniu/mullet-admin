import { ActionType } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { useMemo, useRef } from 'react'

import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { getFilterOptions } from '@/services/api/fundManagement/filterOptions'
import { getWithdrawalApprovalList, WithdrawalApprovalParams } from '@/services/api/fundManagement/withdrawalApprove'

import { getColumns } from '../tableConfig'

export default function PendingApprovalTab() {
  const instanceRef = useRef<Instance>()
  const actionRef = useRef<ActionType>()

  // 获取筛选选项配置
  const { data: filterOptionsResponse, loading: filterOptionsLoading } = useRequest(getFilterOptions)

  // 处理筛选选项，只显示 withdrawalEnabled 的链和币种
  const filterOptions = useMemo(() => {
    const filterOptionsData = filterOptionsResponse?.data
    if (!filterOptionsData) {
      return {
        chains: [],
        tokens: []
      }
    }

    return {
      chains: (filterOptionsData.chains || []).filter((chain) => chain.withdrawalEnabled),
      tokens: (filterOptionsData.tokens || []).filter((token) => token.withdrawalEnabled)
    }
  }, [filterOptionsResponse])

  const queryHandler = async (params: WithdrawalApprovalParams) => {
    try {
      const res = await getWithdrawalApprovalList({ ...params, status: 'WAIT' })
      return res
    } catch (error: unknown) {
      console.error('Failed to fetch withdrawal approval list:', error)
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
    <StandardTable
      columns={getColumns(filterOptions, 'pending', actionRef)}
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
      getInstance={(instance) => {
        instanceRef.current = instance
        actionRef.current = instance as unknown as ActionType
      }}
    />
  )
}
