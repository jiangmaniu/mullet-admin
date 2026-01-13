import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Table } from 'antd'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import { exportChannelDepositReportList, getChannelDepositReportCount, getChannelDepositReportList } from '@/services/api/payment/report'
import { formatNum } from '@/utils'

import { getColumns } from './tableConfig'

export default function List() {
  const intl = useIntl()
  const instanceRef = useRef<Instance>()
  const { data, run } = useRequest(getChannelDepositReportCount, { manual: true })
  const reportCount = data?.data

  const handleExport = async () => {
    const { dateRange, ...params } = instanceRef.current?.form?.getFieldsValue()
    if (dateRange) {
      params.startTime = dateRange[0].format('YYYY-MM-DD HH:mm:ss')
      params.endTime = dateRange[1].format('YYYY-MM-DD HH:mm:ss')
    }
    return exportChannelDepositReportList(params)
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
            const queryParams = { timeType: 'DAY', ...params } as PaymentReport.ChannelDepositReportParams
            run(queryParams)
            return getChannelDepositReportList(queryParams)
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
                {Array.from({ length: 11 }, (k, v) => k).map((item, index) => (
                  <Table.Summary.Cell key={index + 1} index={index + 1} className="!px-5"></Table.Summary.Cell>
                ))}
                {/* 客户入金金额 */}
                <Table.Summary.Cell index={12} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.baseOrderAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 客户入金手续费 */}
                <Table.Summary.Cell index={13} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.baseHandlingFee, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 客户转入金额*/}
                <Table.Summary.Cell index={14} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.baseActualOrderAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 平台入金手续费*/}
                <Table.Summary.Cell index={15} className="!px-5 font-dingpro-medium">
                  {formatNum(reportCount?.platformBaseDepositFee, { precision: 2, noDataFormat: '0', unit: 'USD' })}
                </Table.Summary.Cell>
                {/* 平台入账合计*/}
                <Table.Summary.Cell index={16} className="!px-5 text-right font-dingpro-medium">
                  {formatNum(reportCount?.platformAccountAmount, { precision: 2, noDataFormat: '0', unit: 'USD' })}
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
