import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'

export default function PendingSwapTransaction() {
  return (
    <PageContainer icon="icon-caidan-jiaoyipinzhong" pageBgColorMode="white">
      <StandardTable
        columns={[
          { title: '交易哈希', dataIndex: 'txHash', key: 'txHash' },
          { title: '用户', dataIndex: 'userId', key: 'userId' },
          { title: '兑换对', dataIndex: 'pair', key: 'pair' },
          { title: '输入金额', dataIndex: 'inputAmount', key: 'inputAmount' },
          { title: '等待时间', dataIndex: 'waitingTime', key: 'waitingTime' },
          { title: '创建时间', dataIndex: 'createTime', key: 'createTime' }
        ]}
        action={{
          query: async (params) => {
            // TODO: 实现待 Swap 交易 API 调用
            return { data: [], total: 0, success: true }
          }
        }}
      />
    </PageContainer>
  )
}
