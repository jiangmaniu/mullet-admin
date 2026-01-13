import { ProForm, ProFormDateRangePicker } from '@ant-design/pro-components'
import { useIntl, useLocation } from '@umijs/max'
import { Form } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

import Export from '@/components/Admin/StandardTable/Export'
import QueryBtnGroup from '@/components/Base/QueryBtnGroup'

import StopLoss from './StopLoss'
import TakeProfit from './TakeProfit'

type Params = API.PageParams

export default function Profit() {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [params, setParams] = useState({})

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const startDate = queryParams.get('startDate')
  const endDate = queryParams.get('endDate')

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
          console.log('values', values)
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
        <div className="flex items-center justify-between">
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
          <Export />
        </div>
      </ProForm>
      <div className="flex items-start justify-between gap-5">
        <TakeProfit params={params} />
        <StopLoss params={params} />
      </div>
    </div>
  )
}
