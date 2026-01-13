import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, FormInstance } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import { useEnv } from '@/context/envProvider'
import { getPaymentTypeList } from '@/services/api/receivePayment/receiveManage'

import Upload from './Upload'

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
  const { run: queryPaymentTypeList, data: paymentTypeRes } = useRequest(getPaymentTypeList, { manual: true })
  const paymentTypeList = paymentTypeRes?.data || []

  // 获取交易Tab下的form表单实例
  const tradeForm = tabList?.find((item) => item?.key === 'Trade')?.ref?.current as FormInstance
  // 交易Tab下的表单值 计算类型：FOREIGN_CURRENCY外汇 CFD差价合约
  const calculationType = Form.useWatch('calculationType', tradeForm)
  const isForex = calculationType === 'FOREIGN_CURRENCY' // 外汇

  const channelNoValue = Form.useWatch('channelNoValue', form)
  const channelItem = paymentTypeList.find((item) => item.channelNoValue === channelNoValue)

  useImperativeHandle(ref, () => {
    return form
  })

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  useEffect(() => {
    queryPaymentTypeList()
  }, [])

  useEffect(() => {
    if (channelItem) {
      form.setFieldsValue({
        channelId: channelItem.channelId,
        channelNo: channelItem.channelNo
      })
    }
  }, [channelItem])

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
        <div className="w-full grid grid-cols-2 xxl:gap-x-[76px] max-xxl:gap-x-[20px] gap-y-5">
          <ProFormSelect
            name="channelNoValue"
            required
            label={intl.formatMessage({ id: 'mt.leixing' })}
            options={paymentTypeList.map((item: any) => {
              return {
                label: item.channelNo,
                value: item.channelNoValue
              }
            })}
          />
          {/* 隐藏提交channelId、channelNo */}
          <ProFormText name="channelId" hidden />
          <ProFormText name="channelNo" hidden />

          <ProFormDigit maxLength={60} name="weight" label={intl.formatMessage({ id: 'mt.quanzhong' })} />
          <ProFormText required maxLength={60} name="account" label={intl.formatMessage({ id: 'mt.kahao' })} />
          <ProFormText maxLength={60} name="name" label={intl.formatMessage({ id: 'mt.xingming' })} />
          <ProFormText maxLength={60} name="bankName" label={intl.formatMessage({ id: 'mt.yinghangmingcheng' })} />
        </div>
        <div className="my-6">
          <Upload name="paymentCode" initialValues={initialValues} label={intl.formatMessage({ id: 'mt.shoukuanma' })} />
        </div>
      </div>
    </Form>
  )
})
