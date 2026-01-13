import { ProForm, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { getIntl, getLocale, useIntl, useRequest } from '@umijs/max'
import { Form } from 'antd'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import QueryBtnGroup from '@/components/Base/QueryBtnGroup'
import { getTradingStatisticsDay } from '@/services/api/crmManage/trading'

import BarChart from './BarChart'
import { showTypes } from './chartConfig'
import LineChart from './LineChart'

export default function StatisticsCharts({
  datePresets,
  today,
  _today,
  _realToday,
  _startDay
}: {
  datePresets: any[]
  today: dayjs.Dayjs
  _today: string
  _realToday: string
  _startDay: string
}) {
  const showTypeOptions = Object.values(showTypes).map((item) => ({
    label: item.label,
    value: item.value
  }))

  const chartTypeOptions = [
    {
      label: getIntl().formatMessage({ id: 'mt.zhuzhuangtu' }),
      value: '1'
    },
    {
      label: getIntl().formatMessage({ id: 'mt.zhexiantu' }),
      value: '2'
    }
  ]

  const locale = getLocale()
  const intl = useIntl()
  const [params, setParams] = useState({
    showType: showTypeOptions[0].value,
    chartType: '1',
    dateRange: [_startDay, _today]
  }) as any
  const [form] = Form.useForm()
  const [requestResultData, setRequestResultData] = useState<CrmTrading.findCloseMoneyInfo[]>([])

  const getTradingStatisticsDayParams = useMemo(() => {
    const startTime = params.dateRange?.[0]
    const endTime = params.dateRange?.[1]

    const dateDifference = dayjs(endTime).diff(dayjs(startTime), 'day')

    return {
      type: 10,
      startTime: dayjs(startTime).format('YYYY-MM-DD'),
      endTime: dayjs(endTime).format('YYYY-MM-DD'),
      pageSize: dateDifference + 1
    } as {
      type: 10 | 20
    } & API.SearchTimeParams &
      API.PageParam
  }, [params.dateRange])

  useRequest(() => getTradingStatisticsDay(getTradingStatisticsDayParams), {
    onSuccess(data, params) {
      if (data.success) {
        setRequestResultData(data.data?.records || [])
      }
    },
    refreshDeps: [getTradingStatisticsDayParams]
  })

  const selectClassName = useEmotionCss(({ token }) => {
    return {
      '.ant-select-selector': {
        border: '1px solid #d9d9d9 !important'
      }
    }
  })

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex flex-row justify-between items-center">
        {/* {locale === 'zh-TW' ? (
          <img src={'/img/crms/crmgjzb.png'} width={178} height={23} />
        ) : ( */}
        <span className="font-pf-bold ml-1 text-lg text-gray">{intl.formatMessage({ id: 'mt.guanjianzhibiaoqushitu' })}</span>
        {/* // )} */}

        <ProForm
          // onValuesChange={(values) => {
          //   setParams({
          //     ...form.getFieldsValue()
          //   })
          // }}

          onFinish={(values: any) => {
            setParams({
              ...values
            })
          }}
          submitter={false}
          layout="horizontal"
          colon={false}
          form={form}
          className="flex flex-row gap-2 flex-1 justify-end"
          autoFocusFirstInput={false}
        >
          <ProFormSelect
            name="showType"
            label={intl.formatMessage({ id: 'mt.shujulaiyuan' })}
            initialValue={showTypeOptions[0].value}
            options={showTypeOptions}
            allowClear={false}
            width={180}
            fieldProps={{
              size: 'middle',
              bordered: false,
              style: { background: '#fff' },
              className: selectClassName
            }}
            className="!mb-4"
          />
          <ProFormSelect
            name="chartType"
            label={intl.formatMessage({ id: 'mt.chart' })}
            initialValue={'1'}
            options={chartTypeOptions}
            width={180}
            fieldProps={{ size: 'middle', bordered: false, style: { background: '#fff' }, className: selectClassName }}
            className="!mb-4"
          />
          <ProFormDateRangePicker
            name="dateRange"
            fieldProps={{ presets: datePresets }}
            placeholder={[intl.formatMessage({ id: 'common.startDate' }), intl.formatMessage({ id: 'common.endDate' })]}
            initialValue={[_startDay, _today]}
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
        </ProForm>
      </div>
      {params.chartType === '2' ? (
        <LineChart data={requestResultData} showType={params.showType} />
      ) : (
        <BarChart data={requestResultData} showType={params.showType} />
      )}
    </div>
  )
}
