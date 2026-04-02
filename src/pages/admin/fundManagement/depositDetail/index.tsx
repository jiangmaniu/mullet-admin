import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import { DepositDetailParams, getDepositDetailList } from '@/services/api/fundManagement'

import { getColumns } from './tableConfig'

export default function DepositDetail() {
  const instanceRef = useRef<Instance>()

  const queryHandler = async (params: DepositDetailParams) => {
    try {
      const res = await getDepositDetailList(params)
      return {
        success: res.success,
        data: res.data?.records || [],
        total: res.data?.total || 0
      }
    } catch (error: unknown) {
      console.error('Failed to fetch deposit detail list:', error)
      return {
        success: false,
        data: [],
        total: 0
      }
    }
  }

  return (
    <PageContainer icon="/img/emoji/4.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        scroll={{ x: 2000 }}
        action={{
          query: queryHandler
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
