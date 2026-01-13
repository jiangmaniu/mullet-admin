import { ProFormSwitch } from '@ant-design/pro-components'
import { FormattedMessage, useIntl, useLocation } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, FormInstance } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import { getEnum } from '@/constants/enum'
import { useEnv } from '@/context/envProvider'
import { getPaymentChannelType } from '@/services/api/payment/channel'
import { getExchangeRateSymbolTypeList } from '@/services/api/payment/exchangeRate'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: any
  tabList?: any[]
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, tabList }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const { breakPoint } = useEnv()
  const [treeExpandedKeys, setTreeExpandedKeys] = useState<React.Key[]>([])
  const { run: queryPaymentChannelType, data: paymentChannelTypeRes } = useRequest(getPaymentChannelType, { manual: true })
  const paymentChannelTypeData = paymentChannelTypeRes?.data?.filter((item) => item.dictKey !== 'balance') || []

  const { pathname } = useLocation()
  const isDepositChannel = pathname.indexOf('payment/deposit-channel') !== -1

  // 获取交易Tab下的form表单实例
  const tradeForm = tabList?.find((item) => item?.key === 'Trade')?.ref?.current as FormInstance
  // 交易Tab下的表单值 计算类型：FOREIGN_CURRENCY外汇 CFD差价合约
  const calculationType = Form.useWatch('calculationType', tradeForm)
  const isForex = calculationType === 'FOREIGN_CURRENCY' // 外汇

  const channelType = Form.useWatch('channelType', form) || form.getFieldValue('channelType') // 渠道类型

  const channelOptions = (paymentChannelTypeData.find((item) => item.dictKey === channelType)?.children || []).map((item) => {
    return {
      value: item.dictKey,
      label: item.dictValue
    }
  })

  useEffect(() => {
    queryPaymentChannelType()
  }, [])

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

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
        <div className="text-base font-semibold pb-7">
          <div className="flex items-center">
            <ProFormSwitch name="status" />
            <span className="text-primary text-sm pl-2 font-semibold">
              <FormattedMessage id="mt.qudaokaiguan" />
            </span>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 xxl:gap-x-[76px] max-xxl:gap-x-[20px] gap-y-5">
          <ProFormSelect
            name="channelType"
            required
            label={
              <>
                {intl.formatMessage({ id: 'mt.qudaopeizhi' })}({intl.formatMessage({ id: 'mt.jichengzhifu' })})
              </>
            }
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'mt.xuanzequdaopeizhi' })
              }
            ]}
            placeholder={intl.formatMessage({ id: 'mt.qudaopeizhi' })}
            options={paymentChannelTypeData.map((item) => ({ label: item.dictValue, value: item.dictKey }))}
            fieldProps={{
              onChange: (value) => {
                // 重置表单项
                form.resetFields(['channelNoValue'])
              }
            }}
          />
          <ProFormSelect name="channelNoValue" required label={intl.formatMessage({ id: 'mt.tongdaobianhao' })} options={channelOptions} />
          {isDepositChannel && (
            <ProFormSelect
              name="collectionType"
              required
              label={intl.formatMessage({ id: 'mt.shoukuanleixing' })}
              options={getEnum().enumToOptions('PaymentChannelCollectionType')}
            />
          )}
          {/* 保存汇率id，展示币种名称 */}
          <ProFormSelect
            name="exchangeRateId"
            required
            label={isDepositChannel ? intl.formatMessage({ id: 'mt.rujinbizhong' }) : intl.formatMessage({ id: 'mt.chujinbizhong' })}
            request={async () => {
              const res = await getExchangeRateSymbolTypeList()
              return (res?.data || []).map((item) => {
                return {
                  label: item.currencyName,
                  value: String(item.id)
                }
              })
            }}
          />
          <ProFormText
            required
            maxLength={60}
            name="channelSettlementCurrency"
            label={intl.formatMessage({ id: 'mt.qudaojiesuanhuobi' })}
          />
          {/* @TODO 缺少小数位字段 */}
          {/* <ProFormDigit
            required
            maxLength={20}
            min={0}
            name="channelSort"
            label={isDepositChannel ? intl.formatMessage({ id: 'mt.rujinxiaoshuwei' }) : intl.formatMessage({ id: 'mt.chujinxiaoshuwei' })}
          /> */}
          <ProFormText
            required
            maxLength={100}
            name="channelRevealName"
            fieldProps={{ showCount: true }}
            label={intl.formatMessage({ id: 'mt.tongdaomingcheng' })}
          />
          <ProFormDigit required maxLength={20} min={0} name="channelSort" label={intl.formatMessage({ id: 'mt.qudaopaixu' })} />
          {/* <Form.Item className="!mt-6" required label={intl.formatMessage({ id: 'mt.rujinshuoming' })}>
          <WangEditor  />
        </Form.Item> */}
        </div>
      </div>
    </Form>
  )
})
