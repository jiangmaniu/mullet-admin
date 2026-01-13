import './index.less'

import { ProCard, ProForm, ProFormDateRangePicker } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { useEffect, useState } from 'react'

import PageContainer from '@/components/Admin/PageContainer'
import StandardTable from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { useStores } from '@/context/mobxProvider'
import { exportStatisticsDay } from '@/services/api/crmManage/export'
import { getTradingStatisticsDay } from '@/services/api/crmManage/trading'
import { get3MonBeforeRange } from '@/utils'
import { push } from '@/utils/navigator'

import LineChart from './LineChart'
import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function List() {
  const { global } = useStores()
  const [requestResultData, setRequestResultData] = useState([] as CrmTrading.StatisticsDayItem[])
  const [form] = Form.useForm()
  const [params, setParams] = useState({ type: 10 } as CrmTrading.StatisticsDayItemParams)
  const intl = useIntl()

  const [dateRange, setDateRange] = useState<string[]>(get3MonBeforeRange(true) as string[])

  useEffect(() => {
    setParams({
      startTime: dateRange[0],
      endTime: dateRange[1],
      type: params.type
    })
  }, [dateRange])

  return (
    <PageContainer icon="/img/emoji/23.png" pageBgColorMode="gray">
      <ProForm
        onFinish={(values: any) => {
          console.log('values', values)
          // const [startTime, endTime] = values.dateRange || []
          setDateRange(values.dateRange || [])
        }}
        submitter={false}
        className="!mb-4"
        form={form}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <ProFormDateRangePicker
              placeholder={[intl.formatMessage({ id: 'common.startDate' }), intl.formatMessage({ id: 'common.endDate' })]}
              // initialValue={get3MonBeforeRange()}
              name="dateRange"
            />
            {/* <ProFormSelect
              options={[
                { value: 10, label: <FormattedMessage id="mt.antian" /> },
                { value: 20, label: <FormattedMessage id="mt.anyue" /> }
              ]}
              fieldProps={{ size: 'middle', defaultValue: 10 }}
              width={200}
              allowClear={false}
              placeholder={intl.formatMessage({ id: 'common.pleaseSelect' })}
              name="type"
            /> */}
            <QueryBtnGroup
              onSubmit={() => {
                form?.submit()
              }}
              onReset={() => {
                form?.resetFields()
                form?.submit()
              }}
            />
          </div>
          <Export
            onClick={() =>
              exportStatisticsDay(params).then((res) => {
                console.log('res', res)
                // 下载文件
                downloadFile(res)
              })
            }
          />
        </div>
      </ProForm>
      <ProCard bodyStyle={{ padding: 10 }}>
        <StandardTable
          columnEmptyText="0"
          columns={getColumns()}
          hideSearch
          bodyStyle={{ padding: 0 }}
          pageSize={15}
          cardBordered={false}
          renderOptionColumn={(record) => {
            return (
              <a
                className="!text-gray font-medium text-sm cursor-pointer"
                onClick={() => {
                  push(`/order/list/view/${record.id}`)
                }}
              >
                <FormattedMessage id="common.chakan" />
              </a>
            )
          }}
          tableExtraRender={() => (
            <>
              {requestResultData.length > 0 && (
                <div className="line-chart-wrapper">
                  <LineChart data={requestResultData} />
                </div>
              )}
            </>
          )}
          getRequestResult={(result) => {
            setRequestResultData(result?.data || [])
          }}
          // ghost
          action={{
            query: (params) => getTradingStatisticsDay(params)
          }}
          params={params}
        />
      </ProCard>
    </PageContainer>
  )
}

function downloadFile(res: any) {
  // console.log('res', res)
  // const link = document.createElement('a')
  // link.href = window.URL.createObjectURL(res)
  // link.download = '统计日报.xlsx'
  // link.click()
}
