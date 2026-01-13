import { ProCard, ProFormTimePicker } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, Spin } from 'antd'
import { observer } from 'mobx-react'
import { useEffect } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import PageContainer from '@/components/Admin/PageContainer'
import { SaveButton } from '@/components/Base/Button'
import { useStores } from '@/context/mobxProvider'
import { getSystemInfo, updateSystemSet } from '@/services/api/system'
import { message } from '@/utils/message'

type Params = API.PageParams

function TimeSetting() {
  const intl = useIntl()
  const [form] = Form.useForm()
  const { global } = useStores()
  const { data, run, loading } = useRequest(getSystemInfo, { manual: true })
  const info = data?.data

  useEffect(() => {
    if (info?.timeZone) {
      // 回显展示数字
      info.timeZone = info.timeZone?.match(/\d+/g)?.[0] as string
    }
    form.setFieldsValue(info)
  }, [info])

  useEffect(() => {
    run?.()
  }, [])

  return (
    <PageContainer
      icon="/img/emoji/10.png"
      pageBgColorMode="gray"
      renderRight={() => {
        return (
          <SaveButton
            onClick={() => {
              form.submit()
            }}
          >
            <FormattedMessage id="mt.baocunbingchongqi" />
          </SaveButton>
        )
      }}
    >
      <ProCard bodyStyle={{ height: 500, paddingTop: 50 }}>
        <div className="flex items-center">
          <div className="mr-[60px]">
            <div className="flex items-center rounded-full justify-center w-[125px] h-[125px] border border-gray-150 p-8">
              <img src="/img/emoji/10.png" width={40} height={40} />
            </div>
          </div>
          <div className="w-[60%]">
            <Spin spinning={loading}>
              <Form
                onFinish={async (values: System.TimeSettingInfo) => {
                  const params = {
                    ...values,
                    timeZone: `GMT+${values.timeZone}`
                  }
                  console.log('onFinish values', params)

                  const res = await updateSystemSet(params)
                  if (res.success) {
                    message.info(intl.formatMessage({ id: 'common.saveSuccess' }))

                    // 刷新系统信息
                    run?.()

                    // 刷新顶部时区
                    global.queryTimeZone()
                  }
                }}
                // initialValues={initialValues}
                form={form}
                layout="vertical"
              >
                <div className="grid grid-cols-2 gap-10">
                  <ProFormDigit
                    fieldProps={{
                      min: -12,
                      max: 12,
                      prefix: <span className="text-gray-600 text-base pr-2">GMT +</span>
                    }}
                    required
                    name="timeZone"
                    label={intl.formatMessage({ id: 'mt.shiqu' })}
                  />
                  <ProFormSelect
                    name="daylightTime"
                    required
                    label={intl.formatMessage({ id: 'mt.qiyongxialingshi' })}
                    options={[
                      { label: <FormattedMessage id="mt.shi" />, value: 'true' },
                      { label: <FormattedMessage id="mt.fou" />, value: 'false' }
                    ]}
                  />
                  <ProFormTimePicker
                    name="daily"
                    label={intl.formatMessage({ id: 'mt.rijieshijian' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'mt.xuanzerijieshijian' }) }]}
                    fieldProps={{ style: { width: '100%' }, size: 'large', format: 'HH:mm' }}
                    allowClear={false}
                  />
                </div>
              </Form>
            </Spin>
          </div>
        </div>
      </ProCard>
    </PageContainer>
  )
}

export default observer(TimeSetting)
