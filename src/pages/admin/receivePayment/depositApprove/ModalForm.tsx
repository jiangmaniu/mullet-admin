import { ProFormTextArea } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'
import Button from '@/components/Base/Button'
import { depositApprove } from '@/services/api/receivePayment/depositApprove'
import { message } from '@/utils/message'

import Upload from './Upload'

type IProps = {
  reload?: () => void
}

function ModalForm({ reload }: IProps, ref: any) {
  const [modalInfo, setModalInfo] = useState({} as DepositApprove.DepositApproveListItem)
  const isAdd = Object.keys(modalInfo || {}).length === 0
  const intl = useIntl()
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const show = () => setOpen(true)
  const close = () => {
    setOpen(false)
    setModalInfo({})
  }

  useImperativeHandle(ref, () => {
    return {
      show: (info?: any) => {
        setModalInfo(info)
        show()
      },
      close
    }
  })

  useEffect(() => {
    if (modalInfo) {
      form.setFieldsValue({
        ...modalInfo,
        calcOrderAmount: '0'
      })
    }
  }, [modalInfo])

  const handleApprove = async (certificateStatus: DepositApprove.ApproveStatus) => {
    const values = await form.validateFields()

    const certificateUrl =
      Array.isArray(values.certificateUrl) && values.certificateUrl.length
        ? values.certificateUrl.map((item: any) => item?.response?.data?.name || item?.name).join(',')
        : values?.certificateUrl

    if (certificateStatus === 'PASS') {
      if (!certificateUrl) {
        message.info(intl.formatMessage({ id: 'mt.qingshangchuanpingzheng' }))
        return
      }
      if (!values.actualAmount) {
        message.info(intl.formatMessage({ id: 'mt.shijizhuanrujinebunengweikong' }))
        return
      }
    }
    if (certificateStatus === 'FAIL') {
      if (!values.remark) {
        message.info(intl.formatMessage({ id: 'mt.beizhuxinxibunengweikong' }))
        return
      }
    }

    const res = await depositApprove({
      id: modalInfo.id,
      actualAmount: values.actualAmount,
      remark: values.remark,
      certificateUrl,
      certificateStatus
    })
    const success = res?.success

    if (success) {
      // 刷新列表
      reload?.()
      // 关闭弹窗
      close()
    }
  }

  const actualAmount = Form.useWatch('actualAmount', form)
  useEffect(() => {
    const exchangeRate = modalInfo.exchangeRate
    const baseOrderAmount = modalInfo.baseOrderAmount
    const receiptAmount = modalInfo.receiptAmount
    const userSingleFixedFee = Number(modalInfo.userSingleFixedFee) // 单笔固定费用
    const userTradePercentageFee = Number(modalInfo.userTradePercentageFee) / 100 // 交易额百分比费用
    const userSingleLeastFee = Number(modalInfo.userSingleLeastFee) // 单笔最低收费

    // 预计到账金额 = 基准货币金额 - 手续费
    const baseAmount = actualAmount && exchangeRate && Number(actualAmount) / Number(exchangeRate)
    // 基准货币金额 = (实际转入金额 / (基准汇率*（1+汇差） )  )
    // 入账金额 = 基准货币金额 -（手续费计算判断公式）
    // 手续费 = Max（单笔+入金金额*单笔%，单笔最低）
    const fee = Math.max(userSingleFixedFee + baseAmount * userTradePercentageFee, userSingleLeastFee)
    // 用户输入实际转入金额等于订单预计支付金额，预计到账金额=订单入金金额
    let amount: any = Number(receiptAmount) === Number(actualAmount) ? baseOrderAmount : baseAmount - fee
    amount = amount < 0 ? 0 : amount
    form.setFieldValue('calcOrderAmount', isNaN(amount) ? '0' : amount.toFixed(2))
  }, [actualAmount, modalInfo])

  return (
    <>
      <Modal
        title={<FormattedMessage id="mt.rujinshenhe" />}
        open={open}
        onCancel={() => {
          setOpen(false)
          close()
        }}
        form={form}
        hiddenSubmitter
      >
        <div className="grid grid-cols-2 gap-4">
          <ProFormText
            maxLength={60}
            name="receiptAmount"
            disabled
            fieldProps={{
              // 法币单位
              suffix: modalInfo?.symbol
            }}
            label={intl.formatMessage({ id: 'mt.dingdanyujizhifujine' })}
          />
          <ProFormDigit
            maxLength={60}
            name="actualAmount"
            fieldProps={{
              controls: false,
              // 法币单位
              suffix: modalInfo?.symbol
            }}
            label={intl.formatMessage({ id: 'mt.shijizhuanrujine' })}
          />
          <ProFormText
            maxLength={60}
            name="baseOrderAmount"
            fieldProps={{
              suffix: 'USD'
            }}
            disabled
            label={intl.formatMessage({ id: 'mt.dingdanrujinjine' })}
          />
          <ProFormDigit maxLength={60} name="exchangeRate" disabled label={intl.formatMessage({ id: 'mt.dingdanhuilv' })} />
          <ProFormTextArea
            name={'remark'}
            label={intl.formatMessage({ id: 'mt.beizhuxinxi' })}
            fieldProps={{ showCount: true, maxLength: 1000, autoSize: { minRows: 4, maxRows: 10 } }}
          />
          <ProFormText
            maxLength={60}
            name="calcOrderAmount"
            fieldProps={{
              suffix: 'USD'
            }}
            disabled
            label={intl.formatMessage({ id: 'mt.yujidaozhangjine' })}
          />
        </div>
        <div className="grid grid-cols-2 my-4 gap-4"></div>
        <Upload name="certificateUrl" initialValues={modalInfo} label={intl.formatMessage({ id: 'mt.kehushangchuanpingzheng' })} />
        <div className="flex justify-end items-center gap-x-3">
          <Button
            className="!text-white !bg-green-700 !w-[150px] !h-10 !border-none group-hover:!text-white"
            onClick={() => {
              handleApprove('PASS')
            }}
            type="primary"
          >
            <FormattedMessage id="mt.shenhetongguo" />
          </Button>
          <Button
            className="!text-white !bg-red-700 !w-[150px] !h-10 !border-none group-hover:!text-white"
            onClick={() => {
              handleApprove('FAIL')
            }}
            type="primary"
          >
            <FormattedMessage id="mt.shenhejujue" />
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default forwardRef(ModalForm)
