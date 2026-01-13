import './index.less'

import { PageLoading, ProCard, ProForm, ProFormDateRangePicker } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import StandardTable from '@/components/Admin/StandardTable'
import Export from '@/components/Admin/StandardTable/Export'
import { IconFontButton } from '@/components/Base/Button'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import SymbolIcon from '@/components/Base/SymbolIcon'
import { getTradingSymbol } from '@/services/api/crmManage/trading'

import { getColumns } from './tableConfig'

type Params = API.PageParams

export default function Trade() {
  const intl = useIntl()
  const [form] = Form.useForm()

  const { run, data, loading } = useRequest(getTradingSymbol, { manual: true })
  const dataSource = data?.data || []

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const startDate = queryParams.get('startDate')
  const endDate = queryParams.get('endDate')

  const [params, setParams] = useState({
    startTime: startDate || '',
    endTime: endDate || ''
  })
  useEffect(() => {
    run(params)
  }, [params])

  const realToday = dayjs()
  const datePresets = [
    {
      label: intl.formatMessage({ id: 'mt.180tian' }),
      value: [realToday.subtract(180, 'day'), realToday]
    },
    {
      label: intl.formatMessage({ id: 'mt.jinsanyue' }),
      value: [realToday.subtract(2, 'month').startOf('month'), realToday]
    },
    {
      label: intl.formatMessage({ id: 'mt.shangyue' }),
      value: [realToday.subtract(1, 'month').startOf('month'), realToday.subtract(1, 'month').endOf('month')]
    },
    {
      label: intl.formatMessage({ id: 'mt.benyue' }),
      value: [realToday.startOf('month'), realToday]
    },
    {
      label: intl.formatMessage({ id: 'mt.jinqitian' }),
      value: [realToday.subtract(6, 'day'), realToday]
    },
    {
      label: intl.formatMessage({ id: 'mt.jintian' }),
      value: [realToday, realToday]
    }
  ] as any[]
  return (
    <div>
      <ProForm
        onFinish={(values: any) => {
          const [startTime, endTime] = values.dateRange || []

          setParams({
            startTime,
            endTime
          })
        }}
        submitter={false}
        className="!mb-4"
        form={form}
      >
        <div className="flex items-center gap-x-3">
          <ProFormDateRangePicker
            initialValue={startDate && endDate ? [startDate, endDate] : undefined}
            placeholder={[intl.formatMessage({ id: 'common.startDate' }), intl.formatMessage({ id: 'common.endDate' })]}
            name="dateRange"
            fieldProps={{
              presets: datePresets
            }}
            // initialValue={get3MonBeforeRange()}
          />
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
      </ProForm>
      <ProCard>
        {!loading && (
          <div className="flex items-start gap-x-7 w-full justify-between">
            {dataSource.length > 0 && (
              <div className="bg-gray-80 pt-5 px-5 w-[280px]">
                <div className="text-gray font-semibold text-xl pb-[150px]">
                  <FormattedMessage id="mt.chanpinqiansanming" />
                </div>
                <div className="flex items-center justify-center relative">
                  {/* 第一名 */}
                  {dataSource?.[0] && (
                    <div className="flex flex-col items-center justify-center absolute -top-[78px]">
                      <div className="text-gray font-semibold text-xxl text-center pb-3">{dataSource[0].symbol}</div>
                      <SymbolIcon src={dataSource[0].imgUrl} className="border border-gray-90 rounded-full z-10" width={82} height={82} />
                    </div>
                  )}
                  {/* 第二名 */}
                  {dataSource?.[1] && (
                    <div className="flex flex-col items-center justify-center absolute -top-[32px] left-0">
                      <div className="text-gray font-semibold text-xxl text-center pb-3">{dataSource[1].symbol}</div>
                      <SymbolIcon src={dataSource[1].imgUrl} className="border border-gray-90 rounded-full z-10" width={62} height={62} />
                    </div>
                  )}
                  {/* 第三名 */}
                  {dataSource?.[2] && (
                    <div className="flex flex-col items-center justify-center absolute -top-[24px] right-[12px]">
                      <div className="text-gray font-semibold text-xxl text-center pb-3">{dataSource[2].symbol}</div>
                      <SymbolIcon src={dataSource[2].imgUrl} className="border border-gray-90 rounded-full z-10" width={56} height={56} />
                    </div>
                  )}
                  <img
                    src="/img/product-rank-bg.png"
                    width={300}
                    height={148}
                    style={{
                      transform: 'translateX(-8px)',
                      zIndex: 0
                    }}
                  />
                </div>
              </div>
            )}
            <div className={classNames('flex-1', dataSource.length ? 'w-[calc(100%-440px)]' : 'w-full')}>
              <StandardTable
                columns={getColumns()}
                opColumnWidth={80}
                hideSearch
                scroll={{ x: 400 }}
                bodyStyle={{ padding: 0, paddingBottom: 20 }}
                cardBordered={false}
                // pageSize={999}
                search={{
                  span: 4,
                  submitterColSpanProps: { span: 20 },
                  className: 'custom-search-form-item',
                  optionRender: (searchConfig, props, dom) => {
                    return [
                      <div key="action" className="flex items-center">
                        <div className="flex items-center gap-3">
                          {/* {dom.reverse()} */}
                          <IconFontButton
                            type="primary"
                            icon="sousuo"
                            onClick={() => {
                              searchConfig?.form?.submit()
                            }}
                            style={{ paddingLeft: 10 }}
                          >
                            {intl.formatMessage({ id: 'common.query' })}
                          </IconFontButton>
                          <IconFontButton
                            icon="qingli"
                            onClick={() => {
                              searchConfig?.form?.resetFields()
                              searchConfig?.form?.submit()
                            }}
                            style={{ paddingLeft: 10 }}
                          >
                            {intl.formatMessage({ id: 'common.reset' })}
                          </IconFontButton>
                        </div>
                        <div>
                          <Export />
                        </div>
                      </div>
                    ]
                  }
                }}
                // params={params}
                // ghost
                // action={{
                //   query: (params) => getTradingSymbol(params)
                // }}
                // getRequestResult={(result) => {
                //   setRequestResultData(result.data || [])
                // }}
                dataSource={dataSource}
              />
            </div>
          </div>
        )}
        {loading && (
          <div className="pb-[100px]">
            <PageLoading />
          </div>
        )}
      </ProCard>
    </div>
  )
}
