import { ProFormTextArea } from '@ant-design/pro-components'
import { useIntl, useLocation } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form } from 'antd'
import Search from 'antd/es/input/Search'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormText from '@/components/Admin/Form/ProFormText'
import { getEnum } from '@/constants/enum'
import { useEnv } from '@/context/envProvider'
import { getDepositOrderByOrderNo } from '@/services/api/payment/deposit'
import { message } from '@/utils/message'

import Upload from './Upload'

type IProps = {
  style?: React.CSSProperties
  onFieldsChange?: (changedFields: any, allFields: any) => void
  onValuesChange?: (values: any) => void
  initialValues?: PaymentDepositFillOrder.DepositFillOrderListItem
  tabList?: any[]
}

export default forwardRef(({ style, onFieldsChange, onValuesChange, initialValues, tabList }: IProps, ref) => {
  const intl = useIntl()
  const [formData, setFormData] = useState<any>({})
  const [form] = Form.useForm()
  const { breakPoint } = useEnv()
  const { pathname } = useLocation()
  const isAdd = pathname.indexOf('/add') !== -1
  const [treeExpandedKeys, setTreeExpandedKeys] = useState<React.Key[]>([])
  const { run: queryOrderByorderNo, data: orderRes } = useRequest(getDepositOrderByOrderNo, { manual: true })
  const orderInfo = orderRes?.data

  useImperativeHandle(ref, () => {
    return form
  })

  const formValues = {
    ...initialValues,
    ...orderInfo
  }

  // 动态回显表单项值，不能通过initialValues回显
  useEffect(() => {
    // 处理不同接口参数不一致
    form.setFieldsValue({
      channelOrderNo: formValues?.channelOrderNo || '-',
      remark: formValues?.remark,
      userOrderNo: orderInfo?.orderNo || initialValues?.userOrderNo || '',
      actualAmount: initialValues?.actualAmount || '',
      receiptAmount: initialValues?.receiptAmount || orderInfo?.receiptAmount || '0',
      baseOrderAmount: formValues?.baseOrderAmount,
      orderAmount: formValues?.orderAmount,
      channelName: formValues?.channelName,
      tradeAccountId: formValues?.tradeAccountId,
      exchangeRate: formValues?.exchangeRate,
      statusName: isAdd
        ? getEnum().Enum.PaymentDepositOrderStatus[orderInfo?.status as string]?.text
        : getEnum().Enum.PaymentDepositSupplementOrderStatus[initialValues?.status as string]?.text
    })
  }, [initialValues, orderInfo])

  const actualAmount = Form.useWatch('actualAmount', form)
  useEffect(() => {
    const exchangeRate = orderInfo?.exchangeRate || 0
    const baseOrderAmount = orderInfo?.baseOrderAmount
    const receiptAmount = orderInfo?.receiptAmount
    const userSingleFixedFee = Number(orderInfo?.userSingleFixedFee || 0) // 单笔固定费用
    const userTradePercentageFee = Number(orderInfo?.userTradePercentageFee || 0) / 100 // 交易额百分比费用
    const userSingleLeastFee = Number(orderInfo?.userSingleLeastFee || 0) // 单笔最低收费
    const exchangeDifferencePercentage = Number(orderInfo?.exchangeDifferencePercentage || 0) / 100 // 汇差百分比

    const baseAmount = actualAmount && exchangeRate && Number(actualAmount) / Number(exchangeRate)
    // 基准货币金额 = (实际转入金额 / (基准汇率*（1+汇差）) )
    // 预计到账金额 = 基准货币金额 - 手续费
    // 手续费 = Max(单笔固定费用 + 基准货币金额 * 交易额百分比费用, 单笔最低收费)
    const fee = Math.max(userSingleFixedFee + baseAmount * userTradePercentageFee, userSingleLeastFee)
    const amount: any = baseAmount - fee
    const calcOrderAmount = isNaN(amount) ? '0' : amount.toFixed(2)
    form.setFieldValue(
      'calcOrderAmount',
      isAdd ? (calcOrderAmount > 0 ? calcOrderAmount : '0') : initialValues?.baseReceiptAmount?.toFixed?.(2)
    )

    // 订单入金金额 = 基准货币金额
    form.setFieldValue(
      'calcBaseOrderAmount',
      isAdd ? (baseAmount > 0 ? baseAmount.toFixed(2) : '0') : initialValues?.orderAmount?.toFixed?.(2)
    )

    // console.log("手续费", fee)
    // console.log("预计到账金额", calcOrderAmount)
    // console.log("汇差百分比", exchangeDifferencePercentage)
    // console.log("单笔最低手续费", userSingleLeastFee)
    // console.log("汇率", exchangeRate)
    // console.log("baseAmount", baseAmount)
  }, [actualAmount, orderInfo, initialValues])

  // 91.30

  const handleSearch = async () => {
    // 需求说明：检索客户入金单号，将订单信息调取并填入表单中。 如订单已入金成功则提示该订单入金成功，如订单查询不到 则提示无此订单
    // 交互规则：查询指定订单并读取数据
    // message.info(intl.formatMessage({id:'mt.budanchaxunsuccess'}))
    // message.info(intl.formatMessage({id:'mt.budanchaxunfail'}))
    const orderNo = form.getFieldValue('userOrderNo')
    if (!orderNo) return message.info(intl.formatMessage({ id: 'mt.qingshurudingdanhao' }))
    queryOrderByorderNo({ orderNo })
  }

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
      <div className="items-start grid grid-cols-2 gap-x-[60px]">
        <div className="w-full grid grid-cols-1 gap-y-5">
          {isAdd ? (
            <Form.Item
              required
              name="userOrderNo"
              rules={[{ required: true, message: intl.formatMessage({ id: 'mt.shurukehurujindingdanhao' }) }]}
              label={intl.formatMessage({ id: 'mt.kehurujindingdanhao' })}
            >
              <Search
                enterButton={intl.formatMessage({ id: 'common.query' })}
                size="large"
                styles={{ input: { height: 40 } }}
                autoComplete="off"
                onSearch={handleSearch}
                placeholder={intl.formatMessage({ id: 'mt.shurukehurujindingdanhao' })}
              />
            </Form.Item>
          ) : (
            <ProFormText disabled maxLength={60} name="userOrderNo" label={intl.formatMessage({ id: 'mt.shurukehurujindingdanhao' })} />
          )}
          {/* 读取查询的填入 */}
          <ProFormText disabled maxLength={60} name="tradeAccountId" label={intl.formatMessage({ id: 'mt.kehurujinjiaoyizhanghao' })} />
          {/* 读取查询的填入 */}
          <ProFormText disabled maxLength={60} name="channelOrderNo" label={intl.formatMessage({ id: 'mt.qudaodingdanhao' })} />
          {/* 读取查询的填入 */}
          <ProFormText disabled name="channelName" label={intl.formatMessage({ id: 'mt.rujinqudao' })} />
          {/* 读取查询的填入  */}
          <ProFormText
            disabled
            maxLength={60}
            // 单位读取查询的记录中的单位，基准货币单位USD
            fieldProps={{ suffix: formValues?.symbol }}
            name="orderAmount"
            label={intl.formatMessage({ id: 'mt.dingdanyujizhifujine' })}
          />
          {/* 读取查询的填入  */}
          <ProFormText
            disabled
            maxLength={60}
            // 单位读取查询的记录中的单位
            fieldProps={{ suffix: 'USD' }}
            name="calcBaseOrderAmount"
            label={intl.formatMessage({ id: 'mt.dingdanrujinjine' })}
          />
          <ProFormText disabled name="statusName" label={intl.formatMessage({ id: 'mt.dingdanzhuangtai' })} />
        </div>
        <div className="w-full grid grid-cols-1 gap-y-5">
          <ProFormDigit
            required={isAdd}
            // 单位读取查询的记录中的单位
            fieldProps={{ controls: false, suffix: formValues?.symbol }}
            maxLength={100}
            name="actualAmount"
            label={intl.formatMessage({ id: 'mt.shijizhuanrujine' })}
            disabled={!isAdd}
          />
          <ProFormDigit maxLength={60} name="exchangeRate" disabled label={intl.formatMessage({ id: 'mt.dingdanhuilv' })} />
          {/* 读取查询的填入  */}
          <ProFormText
            disabled
            maxLength={60}
            fieldProps={{ suffix: 'USD' }}
            name="calcOrderAmount"
            label={intl.formatMessage({ id: 'mt.yujidaozhangjine' })}
          />
          <ProFormTextArea
            name={'remark'}
            rules={[{ required: false, message: intl.formatMessage({ id: 'mt.rujinshuoming' }) }]}
            label={intl.formatMessage({ id: 'mt.budanbeizhu' })}
            fieldProps={{ showCount: isAdd, maxLength: 500 }}
            disabled={!isAdd}
          />
          {/* voucherPicture */}
          <Upload
            disabled={!isAdd}
            required={isAdd}
            name="voucherPicture"
            initialValues={initialValues}
            label={
              isAdd
                ? intl.formatMessage({ id: 'mt.shangchuanzhuanzhangpinzhengtupian' })
                : intl.formatMessage({ id: 'mt.zhuanzhangpinzhengtupian' })
            }
          />
        </div>
      </div>
    </Form>
  )
})
