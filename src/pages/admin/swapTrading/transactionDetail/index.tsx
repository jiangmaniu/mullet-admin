import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'

export default function SwapTransactionDetail() {
  return (
    <PageContainer icon="icon-caidan-jiaoyipinzhong" pageBgColorMode="white">
      <StandardTable
        columns={[
          { title: '交易哈希', dataIndex: 'txHash', key: 'txHash' },
          { title: '用户', dataIndex: 'userId', key: 'userId' },
          { title: '兑换对', dataIndex: 'pair', key: 'pair' },
          { title: '输入金额', dataIndex: 'inputAmount', key: 'inputAmount' },
          { title: '输出金额', dataIndex: 'outputAmount', key: 'outputAmount' },
          { title: '状态', dataIndex: 'status', key: 'status' },
          { title: '时间', dataIndex: 'createTime', key: 'createTime' }
        ]}
        action={{
          query: async (params) => {
            // TODO: 实现 Swap 交易明细 API 调用
            return { data: [], total: 0, success: true }
          }
        }}
      />
    </PageContainer>
  )
}
