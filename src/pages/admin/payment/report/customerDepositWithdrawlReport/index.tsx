import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import { exportUserReportList, getUserReportList } from '@/services/api/payment/report'

import { getColumns } from './tableConfig'

export default function List() {
  const instanceRef = useRef<Instance>()

  const handleExport = async () => {
    const { dateRange, ...params } = instanceRef.current?.form?.getFieldsValue()
    if (dateRange) {
      params.startTime = dateRange[0].format('YYYY-MM-DD HH:mm:ss')
      params.endTime = dateRange[1].format('YYYY-MM-DD HH:mm:ss')
    }
    return exportUserReportList(params)
  }

  return (
    <PageContainer icon="/img/emoji/12.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        search={{
          span: 5
        }}
        stripe={false}
        showExpandRowStyle
        optionColumnClassName="z-[18] relative"
        tableExtraRender={() => <Export onClick={() => handleExport()} />}
        action={{
          query: (params) =>
            getUserReportList(params).then((res) => {
              if (res.success && res.data?.records?.length) {
                res.data.records = res.data.records.map((item) => {
                  item.id = item.account
                  const list = item.userReportCountVOList || []
                  item.children = list.map((v: PaymentReport.UserReportListItem) => {
                    v.id = v.tradeAccountId
                    return v
                  })
                  // 统计展开行之前的数据，展开前和展开后的字段需要保持一致
                  // 交易账户数
                  item.tradeAccountId = list.length
                  // 订单数
                  item.orderQuantity = list.reduce((total: number, next: any) => total + Number(next.orderQuantity), 0)
                  // 成功入金数量
                  item.depositSuccessQuantity = list.reduce((total: number, next: any) => total + Number(next.depositSuccessQuantity), 0)
                  // 成功出金数量
                  item.withdrawSuccessQuantity = list.reduce((total: number, next: any) => total + Number(next.withdrawSuccessQuantity), 0)
                  // 入金金额
                  item.customerDepositAmount = list.reduce((total: number, next: any) => total + Number(next.customerDepositAmount), 0)
                  // 入金手续费
                  item.depositHandlingFee = list.reduce((total: number, next: any) => total + Number(next.depositHandlingFee), 0)
                  // 出金金额
                  item.customerWithdrawAmount = list.reduce((total: number, next: any) => total + Number(next.customerWithdrawAmount), 0)
                  // 出金手续费
                  item.withdrawHandlingFee = list.reduce((total: number, next: any) => total + Number(next.withdrawHandlingFee), 0)
                  // 到账金额
                  item.withdrawalReceiptAmount = list.reduce((total: number, next: any) => total + Number(next.withdrawalReceiptAmount), 0)
                  // 手续费合计
                  item.totalHandlingFee = list.reduce((total: number, next: any) => total + Number(next.totalHandlingFee), 0)
                  // 出入金合计
                  item.totalDwAmount = list.reduce((total: number, next: any) => total + Number(next.totalDwAmount), 0)

                  return item
                })
              }
              return res
            })
        }}
        expandable={{
          expandRowByClick: true // 点击行展开
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
