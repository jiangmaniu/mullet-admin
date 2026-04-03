import { PlusOutlined } from '@ant-design/icons'
import { FormattedMessage, history, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { useMemo, useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import AddButton from '@/components/Base/Button'
import { DepositDetailParams, getDepositDetailList } from '@/services/api/fundManagement/depositDetail'
import { getFilterOptions } from '@/services/api/fundManagement/filterOptions'

import { getColumns } from './tableConfig'

export default function DepositDetail() {
  const intl = useIntl()
  const instanceRef = useRef<Instance>()

  // 获取筛选选项配置
  const { data: filterOptionsResponse, loading: filterOptionsLoading } = useRequest(getFilterOptions)

  // 处理筛选选项，只显示 depositEnabled 的链和币种
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
      chains: (filterOptionsData.chains || []).filter((chain) => chain.depositEnabled),
      tokens: (filterOptionsData.tokens || []).filter((token) => token.depositEnabled),
      statuses: filterOptionsData.depositStatuses || []
    }
  }, [filterOptionsResponse])

  const queryHandler = async (params: DepositDetailParams) => {
    try {
      const res = await getDepositDetailList(params)
      return res
    } catch (error: unknown) {
      console.error('Failed to fetch deposit detail list:', error)
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
        tableExtraRender={() => (
          <AddButton
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push(`/${intl.locale}/fund-management/deposit-detail/add`)}
          >
            <FormattedMessage id="fundManagement.depositDetail.supplementOrder" />
          </AddButton>
        )}
        action={{
          query: queryHandler
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
