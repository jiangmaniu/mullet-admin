import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Table } from 'antd'
import { useRef } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable, { Instance } from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import {
  exportReceiveResourceReportList,
  getReceiveResourceReportCount,
  getReceiveResourceReportList
} from '@/services/api/receivePayment/report'
import { formatNum } from '@/utils'

import { getColumns } from './tableConfig'

export default function List() {
  const intl = useIntl()
  const instanceRef = useRef<Instance>()

  const { data, run } = useRequest(getReceiveResourceReportCount, { manual: true })
  const reportCount = data?.data

  const handleExport = async () => {
    const params = instanceRef.current?.formRef?.getFieldsFormatValue?.()
    return exportReceiveResourceReportList(params)
  }

  return (
    <PageContainer icon="/img/emoji/12.png" pageBgColorMode="gray">
      <StandardTable
        columns={getColumns()}
        tableExtraRender={() => <Export onClick={() => handleExport()} />}
        showOptionColumn={false}
        // ghost
        action={{
          query: (params) => {
            run(params)
            return getReceiveResourceReportList({ ...params })
          }
        }}
        getInstance={(instance) => (instanceRef.current = instance)}
        summary={(postData) => {
          if (!postData?.length) return null
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} className="!px-5">
                  {intl.formatMessage({ id: 'mt.heji' })}
                </Table.Summary.Cell>
                {Array.from({ length: 4 }, (k, v) => k).map((item, index) => (
                  <Table.Summary.Cell key={index + 1} index={index + 1} className="!px-5"></Table.Summary.Cell>
                ))}
                {/* 订单金额 */}
                <Table.Summary.Cell index={5} className="!px-5 font-dingpro-medium">
                  {reportCount?.baseOrderAmount ? formatNum(reportCount?.baseOrderAmount, { precision: 2 }) + ' USD' : 0}
                </Table.Summary.Cell>
                {/* 支付金额(单位法币) */}
                <Table.Summary.Cell index={6} className="!px-5 font-dingpro-medium">
                  {reportCount?.receiptAmount ? formatNum(reportCount?.receiptAmount, { precision: 2 }) + ` ${reportCount.symbol}` : 0}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7} className="!px-5"></Table.Summary.Cell>
                <Table.Summary.Cell index={8} className="!px-5"></Table.Summary.Cell>
                <Table.Summary.Cell index={9} className="!px-5"></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )
        }}
      />
    </PageContainer>
  )
}
