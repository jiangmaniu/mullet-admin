import { ProCard, ProForm } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl, useLocation, useParams } from '@umijs/max'
import { Form } from 'antd'
import { BaseOptionType } from 'antd/es/cascader'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import { SOURCE_CURRENCY } from '@/constants'
import { tradeFollowListLeads } from '@/services/api/tradeFollow/lead'
import { message } from '@/utils/message'

type IProps = {
  leadInfo: TradeFollowLead.TradeFollowLeadInfoItem
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
  icon?: React.ReactNode
  children: React.ReactNode
}

export default forwardRef(({ leadInfo, style, onFieldsChange, onValuesChange, initialValues, icon, children }: IProps, ref) => {
  const { id } = useParams()
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()

  const { pathname } = useLocation()

  const [options, setOptions] = useState<BaseOptionType[]>([])
  useEffect(() => {
    tradeFollowListLeads({ leadId: String(id) })
      .then((res) => {
        if (res.success) {
          const options = res.data
            ?.filter((d: any) => d.leadId !== id)
            ?.map((i: any) => ({ value: i.leadId, label: `${i.projectName} [${i.leadId}]` }))
          setOptions(options)
        }
      })
      .catch((err) => {
        message.info(getIntl().formatMessage({ id: 'mt.qingqiushibai' }))
      })
  }, [id])

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  useEffect(() => {
    form.setFieldValue('maxSupportCountLimit', leadInfo?.maxSupportCountLimit || 0)
    form.setFieldValue('assetRequirementLimit', leadInfo?.assetRequirementLimit || 0)
    form.setFieldValue('profitSharingRatioLimit', leadInfo?.profitSharingRatioLimit || 0)
    form.setFieldValue('assetScaleLimit', leadInfo?.assetScaleLimit || 0)
  }, [leadInfo])

  return (
    <ProCard direction="column">
      <div className="flex items-center justify-between">{children}</div>
      <div className="flex items-start pb-[50px] pt-3">
        <div className="mr-[60px]">{icon}</div>
        <div className="">
          <ProForm form={form} submitter={false}>
            {/* <Form
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
              console.log('values', values)
            }}
            onFieldsChange={(changedFields, allFields) => {
              onFieldsChange?.(changedFields, allFields)
            }}
            initialValues={initialValues}
            form={form}
            layout="vertical"
            style={style}
          > */}
            <div className="flex items-start flex-col w-full">
              <div className="text-primary text-base mb-7 font-semibold">
                <FormattedMessage id="mt.gaojishezhi" />
              </div>
              <div className="w-full grid grid-cols-2 gap-x-[76px] gap-y-5">
                <ProFormDigit
                  name="maxSupportCountLimit"
                  label={intl.formatMessage({ id: 'mt.daidanrenshu' })}
                  fieldProps={{
                    defaultValue: leadInfo?.maxSupportCountLimit,
                    controls: false,
                    suffix: <FormattedMessage id="mt.ren" />,
                    style: {
                      width: 364
                    }
                  }}
                  rules={[
                    {
                      required: true,
                      // @ts-ignore
                      validator(rule, value, callback) {
                        if (!value) {
                          return Promise.reject(intl.formatMessage({ id: 'mt.qingshurushuzi' }))
                        }

                        // 只能输入正整数
                        if (!/^[1-9]\d*$/.test(value)) {
                          return Promise.reject(intl.formatMessage({ id: 'mt.qingshuruzhengzhengshu' }))
                        }

                        return Promise.resolve()
                      }
                    }
                  ]}
                  required
                />
                <ProFormDigit
                  name="assetRequirementLimit"
                  label={intl.formatMessage({ id: 'mt.zichanyaoqiu' })}
                  fieldProps={{
                    controls: false,
                    defaultValue: leadInfo?.assetRequirementLimit,
                    suffix: SOURCE_CURRENCY
                  }}
                  rules={[
                    {
                      required: true,
                      // @ts-ignore
                      validator(rule, value, callback) {
                        if (!value) {
                          return Promise.reject(intl.formatMessage({ id: 'mt.qingshurushuzi' }))
                        }

                        // 只能输入正整数
                        if (!/^[1-9]\d*$/.test(value)) {
                          return Promise.reject(intl.formatMessage({ id: 'mt.qingshuruzhengzhengshu' }))
                        }

                        return Promise.resolve()
                      }
                    }
                  ]}
                  required
                  hiddenPrecision
                />
                <ProFormDigit
                  name="profitSharingRatioLimit"
                  label={intl.formatMessage({ id: 'mt.fenrunbili' })}
                  fieldProps={{
                    controls: false,
                    defaultValue: leadInfo?.profitSharingRatioLimit,
                    precision: 0,
                    suffix: '%',
                    max: 100
                  }}
                  rules={[
                    {
                      required: true,
                      // @ts-ignore
                      validator(rule, value, callback) {
                        if (!value) {
                          return Promise.reject(intl.formatMessage({ id: 'mt.qingshurushuzi' }))
                        }

                        // 只能输入正整数
                        if (!/^[1-9]\d*$/.test(value)) {
                          return Promise.reject(intl.formatMessage({ id: 'mt.qingshuruzhengzhengshu' }))
                        }

                        if (Number(value) < 0 || Number(value) > 100) {
                          return Promise.reject(
                            intl.formatMessage(
                              { id: 'mt.chaochuxianzhifanwei' },
                              {
                                type: '',
                                value: '0 ~ 100'
                              }
                            )
                          )
                        }

                        return Promise.resolve()
                      }
                    }
                  ]}
                  hiddenPrecision
                  required
                />
                <ProFormDigit
                  name="assetScaleLimit"
                  label={intl.formatMessage({ id: 'mt.daidanguimo' })}
                  fieldProps={{
                    controls: false,
                    defaultValue: leadInfo?.assetScaleLimit,
                    suffix: 'USD'
                  }}
                  required
                  rules={[
                    {
                      required: true,
                      // @ts-ignore
                      validator(rule, value, callback) {
                        if (!value) {
                          return Promise.reject(intl.formatMessage({ id: 'mt.qingshurushuzi' }))
                        }

                        // 只能输入正整数
                        if (!/^[1-9]\d*$/.test(value)) {
                          return Promise.reject(intl.formatMessage({ id: 'mt.qingshuruzhengzhengshu' }))
                        }

                        return Promise.resolve()
                      }
                    }
                  ]}
                  hiddenPrecision
                />
              </div>
            </div>
          </ProForm>
          {/* </Form> */}
        </div>
      </div>
    </ProCard>
  )
})
