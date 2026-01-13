import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Table } from 'antd'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import {
  exportChannelWithdrawalReportList,
  getChannelWithdrawalReportCount,
  getChannelWithdrawalReportList
} from '@/services/api/payment/report'
import { formatNum } from '@/utils'

import { getColumns } from './tableConfig'
export default function List() {
  const intl = useIntl()
  const instanceRef = useRef<Instance>()
  const { data, run } = useRequest(getChannelWithdrawalReportCount, { manual: true })
  const reportCount = data?.data

  const handleExport = async () => {
    const { dateRange, ...params } = instanceRef.current?.form?.getFieldsValue()
    if (dateRange) {
      params.startTime = dateRange[0].format('YYYY-MM-DD HH:mm:ss')
      params.endTime = dateRange[1].format('YYYY-MM-DD HH:mm:ss')
    }
    return exportChannelWithdrawalReportList(params)
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
            const queryParams = { timeType: 'DAY', ...params } as PaymentReport.ChannelWithdrawalReportParams
            run(queryParams)
            return getChannelWithdrawalReportList(queryParams)
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
                {Array.from({ length: 9 }, (k, v) => k).map((item, index) => (
                  <Table.Summary.Cell key={index + 1} index={index + 1} className="!px-5"></Table.Summary.Cell>
                ))}
                {/* 客户出金金额 */}
                <Table.Summary.Cell index={10} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.baseOrderAmount || 0, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 客户出金手续费 */}
                <Table.Summary.Cell index={11} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.baseHandlingFee || 0, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 客户到账金额*/}
                <Table.Summary.Cell index={12} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.customerReceiptAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 平台出金手续费*/}
                <Table.Summary.Cell index={13} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.platformWithdrawFee, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 平台实际出金*/}
                <Table.Summary.Cell index={14} className="!px-5 text-right font-dingpro-medium">
                  {formatNum(reportCount?.platformActualAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })}
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
