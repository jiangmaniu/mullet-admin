import { QuestionCircleOutlined } from '@ant-design/icons'
import { FormattedHTMLMessage, FormattedMessage, useIntl } from '@umijs/max'
import { AutoComplete, Form, Tooltip } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import Button from '@/components/Base/Button'
import Iconfont from '@/components/Base/Iconfont'
import { getEnum } from '@/constants/enum'
import { useEnv } from '@/context/envProvider'

import LevelModeEditTable from './LevelModeEditTable'
import MulLevelModeEditTable from './MulLevelModeEditTable'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: AgentSettings.SettingsQueryInfo
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const { breakPoint } = useEnv()

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue({
      ...initialValues,
      levelConfigDTOList: initialValues?.levelConfigVoList,
      commonMultiLevelConfigVOList: (initialValues?.commonMultiLevelConfigVOList || []).sort((a: any, b: any) => a.sortIndex - b.sortIndex)
    })
  }, [initialValues])

  console.log('initialValues', initialValues)

  const modeOptions = getEnum().enumToOptions('AgentModeSetting')
  const levelMode = Form.useWatch('levelMode', form) || modeOptions?.[0]?.value
  const withdrawAuditMode = Form.useWatch('withdrawAuditMode', form)

  return (
    <Form
      onFinish={async (values) => {
        // console.log('onFinish values', values)
      }}
      onFinishFailed={(errorInfo) => {
        // console.log('onFinishFailed', errorInfo)
      }}
      onValuesChange={async (values) => {
        const newValues = { ...formData, ...values }
        setFormData(newValues)
        onValuesChange?.(newValues)
      }}
      onFieldsChange={(changedFields, allFields) => {
        onFieldsChange?.(changedFields, allFields)
      }}
      initialValues={initialValues}
      form={form}
      layout="vertical"
      style={style}
    >
      <div className="flex items-start flex-col w-full">
        <div className="w-[80%] grid grid-cols-2 xxl:gap-x-[76px] max-xxl:gap-x-[20px] gap-y-5">
          {/* <ProFormSelect
            name="mode"
            required
            label={intl.formatMessage({ id: 'mt.agent.dailimoshishezhi' })}
            options={getEnum().enumToOptions('AgentModeSetting')}
            initialValue={'1'}
            fieldProps={{ allowClear: false }}
          /> */}
          <Form.Item name="levelMode" label={intl.formatMessage({ id: 'mt.agent.dailimoshishezhi' })}>
            <div className="flex items-center gap-x-3">
              {modeOptions.map((item, idx) => (
                <Button
                  style={{ minWidth: 160, height: 38 }}
                  key={idx}
                  type={levelMode.includes(item.value) ? 'primary' : 'default'}
                  onClick={() => {
                    const newMode = levelMode.includes(item.value)
                      ? levelMode.filter((val: any) => val !== item.value)
                      : [...levelMode, item.value]
                    // 至少选择一个
                    if (newMode.length > 0) {
                      form.setFieldValue('levelMode', newMode)
                    }
                  }}
                >
                  <div className="flex items-center gap-x-1">
                    {levelMode.includes(item.value) ? <Iconfont name="xuanzhong" color="#fff" /> : null}
                    {item.label}
                  </div>
                </Button>
              ))}
            </div>
          </Form.Item>

          <ProFormSelect
            name="withdrawAuditMode"
            required
            label={intl.formatMessage({ id: 'mt.agent.tixianshenhemoshi' })}
            options={getEnum().enumToOptions('AgentSettingWithdrawAuditMode')}
            fieldProps={{ showSearch: false }}
            allowClear={false}
          />
          <ProFormSelect
            name="settlementAccount"
            required
            label={intl.formatMessage({ id: 'mt.agent.jiesuandaozhangzhanghu' })}
            options={getEnum().enumToOptions('AgentSettlementAccount')}
            fieldProps={{ showSearch: false }}
            initialValue="PLATFORM"
            allowClear={false}
          />
          <ProFormSelect
            name="withdrawFrequency"
            required
            label={intl.formatMessage({ id: 'mt.agent.tixianpinlv' })}
            options={getEnum().enumToOptions('AgentWithdrawFrequency')}
            fieldProps={{ showSearch: false }}
            allowClear={false}
          />

          {/* {withdrawAuditMode === 'AUTOAUDIT' && (
            <ProFormDigit
              required
              maxLength={60}
              name="maxAutoAuditAmount"
              label={intl.formatMessage({ id: 'mt.agent.zidongshenhezuidajine' })}
            />
          )} */}
          {withdrawAuditMode === 'AUTOAUDIT' && (
            <Form.Item
              name="maxAutoAuditAmount"
              required
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  validator(rule, value, callback) {
                    if (!value) {
                      return Promise.reject(intl.formatMessage({ id: 'mt.agent.shuruzuidatixianjine' }))
                    }
                    // 只能输入数字正则校验
                    if (!/^\d+(\.\d+)?$/.test(value)) {
                      return Promise.reject(intl.formatMessage({ id: 'mt.agent.qingshurushuzi' }))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
              label={intl.formatMessage({ id: 'mt.agent.zidongshenhezuidajine' })}
            >
              <AutoComplete
                options={[
                  {
                    value: '100',
                    label: '100'
                  },
                  {
                    value: '200',
                    label: '200'
                  },
                  {
                    value: '500',
                    label: '500'
                  }
                ]}
                style={{ height: 40 }}
                placeholder={intl.formatMessage({ id: 'mt.agent.zidongshenhezuidajine' })}
              />
            </Form.Item>
          )}
          <Form.Item
            name="minWithdrawAmount"
            required
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                validator(rule, value, callback) {
                  if (!value) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.agent.shuruzuiditixianjine' }))
                  }
                  // 只能输入数字正则校验
                  if (!/^\d+(\.\d+)?$/.test(value)) {
                    return Promise.reject(intl.formatMessage({ id: 'mt.agent.qingshurushuzi' }))
                  }
                  return Promise.resolve()
                }
              }
            ]}
            label={intl.formatMessage({ id: 'mt.agent.zuiditixianjine' })}
          >
            <AutoComplete
              options={[
                {
                  value: '50',
                  label: '50'
                },
                {
                  value: '100',
                  label: '100'
                },
                {
                  value: '500',
                  label: '500'
                }
              ]}
              style={{ height: 40 }}
              placeholder={intl.formatMessage({ id: 'mt.agent.shuruzuiditixianjine' })}
            />
          </Form.Item>
        </div>
        <div className="w-full">
          {levelMode.includes('single') && (
            <>
              <div className="text-primary font-semibold text-base mt-5">
                <FormattedMessage id="mt.agent.dengjimoshi" />
              </div>
              <LevelModeEditTable name="levelConfigVoList" form={form} />
            </>
          )}
          {levelMode.includes('multiple') && (
            <>
              <div className="text-primary font-semibold text-base mt-5">
                <FormattedMessage id="mt.agent.duocengjimoshi" />
                <Tooltip title={<FormattedHTMLMessage id="mt.agent.fanyongshuoming" />} styles={{ body: { width: 650 } }}>
                  <QuestionCircleOutlined style={{ marginLeft: 5, fontSize: 14 }} />
                </Tooltip>
              </div>
              <MulLevelModeEditTable name="commonMultiLevelConfigVOList" form={form} />
            </>
          )}
        </div>
      </div>
    </Form>
  )
})
