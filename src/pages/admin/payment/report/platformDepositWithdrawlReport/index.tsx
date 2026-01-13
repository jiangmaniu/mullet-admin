import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Table } from 'antd'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import { exportPlatformReportList, getPlatformReportCount, getPlatformReportList } from '@/services/api/payment/report'
import { formatNum } from '@/utils'

import { getColumns } from './tableConfig'

export default function List() {
  const instanceRef = useRef<Instance>()
  const intl = useIntl()
  const { data, run } = useRequest(getPlatformReportCount, { manual: true })
  const reportCount = data?.data

  const handleExport = async () => {
    const { dateRange, ...params } = instanceRef.current?.form?.getFieldsValue()
    if (dateRange) {
      params.startTime = dateRange[0].format('YYYY-MM-DD HH:mm:ss')
      params.endTime = dateRange[1].format('YYYY-MM-DD HH:mm:ss')
    }
    return exportPlatformReportList(params)
  }

  return (
    <PageContainer icon="/img/emoji/12.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        search={{
          span: 5
        }}
        tableExtraRender={() => <Export onClick={() => handleExport()} />}
        // ghost
        action={{
          query: (params) => {
            const queryParams = { timeType: 'DAY', ...params } as PaymentReport.PlatformReportParams
            run(queryParams)
            return getPlatformReportList(queryParams)
          }
        }}
        summary={(postData) => {
          if (!postData?.length) return null
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} className="!px-5">
                  {intl.formatMessage({ id: 'mt.heji' })}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} className="!px-5"></Table.Summary.Cell>
                {/* 订单总数 */}
                <Table.Summary.Cell index={2} className="!px-5 font-dingpro-medium">
                  {reportCount?.orderQuantity || 0}
                </Table.Summary.Cell>
                {/* 入金成功数 */}
                <Table.Summary.Cell index={3} className="!px-5 font-dingpro-medium">
                  {reportCount?.depositSuccessesQuantity || 0}
                </Table.Summary.Cell>
                {/* 出金成功数*/}
                <Table.Summary.Cell index={4} className="!px-5 font-dingpro-medium">
                  {reportCount?.withdrawalSuccessesQuantity || 0}
                </Table.Summary.Cell>
                {/* 客户入金金额*/}
                <Table.Summary.Cell index={5} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.customerDepositAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 客户入金手续费*/}
                <Table.Summary.Cell index={6} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.customerDepositFee, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 平台入金手续费*/}
                <Table.Summary.Cell index={7} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.platformDepositFee, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 客户出金金额*/}
                <Table.Summary.Cell index={8} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.customerWithdrawAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 客户出金手续费*/}
                <Table.Summary.Cell index={9} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.customerWithdrawFee, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 客户到账金额*/}
                <Table.Summary.Cell index={10} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.customrReceiptAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 平台出金手续费*/}
                <Table.Summary.Cell index={11} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.platformWithdrawFee, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 平台手续费合计*/}
                <Table.Summary.Cell index={12} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.platformTotalFee, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 平台结余*/}
                <Table.Summary.Cell index={13} className="!px-5 text-right font-dingpro-medium">
                  {formatNum(reportCount?.platformBalance, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
      />
    </PageContainer>
  )
}
