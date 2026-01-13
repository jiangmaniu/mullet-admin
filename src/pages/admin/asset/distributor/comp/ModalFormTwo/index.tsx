import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'

import Modal from '@/components/Admin/ModalForm'

import EditTable from './EditTable'

type IProps = {
  trigger?: JSX.Element
  info?: any
}

function ModalFormTwo({ trigger, info = {} }: IProps, ref: any) {
  const isAdd = Object.keys(info).length === 0
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      open,
      setOpen
    }
  })

  return (
    <Modal
      title={isAdd ? <FormattedMessage id="common.add" /> : <FormattedMessage id="common.bianji" />}
      onFinish={async (values: any) => {
        console.log('values', values)

        // 手动关闭弹窗
        setOpen(false)

        return true
      }}
      form={form}
      trigger={trigger}
      open={open}
    >
      <div className="flex gap-y-5 gap-x-7 pb-3">
        <div className="text-center w-[200px]">
          <img src="/img/zhifubao.png" width={126} height={126} />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-3 pb-4">
            <div className="flex flex-col">
              <span className="text-secondary text-sm pb-2">
                <FormattedMessage id="mt.qudaomingcheng" />
              </span>
              <span className="text-primary text-sm font-semibold">支付宝</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-secondary text-sm pb-2">
                <FormattedMessage id="mt.shangjiahao" />
              </span>
              <span className="text-primary text-sm font-semibold">yd23332</span>
            </div>
          </div>
          <div className="grid grid-cols-3 pb-4">
            <div className="flex flex-col text-left">
              <span className="text-secondary text-sm pb-2">
                <FormattedMessage id="mt.wangguandizhi" />
              </span>
              <span className="text-primary text-sm font-semibold">支付宝</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-secondary text-sm pb-2">
                <FormattedMessage id="mt.shouxufei" />
              </span>
              <span className="text-primary text-sm font-semibold">yd23332</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-secondary text-sm pb-2">
                <FormattedMessage id="mt.shangjiakey" />
              </span>
              <span className="text-primary text-sm font-semibold">yd23332</span>
            </div>
          </div>
          <div className="grid grid-cols-3 pb-4">
            <div className="flex flex-col">
              <span className="text-secondary text-sm pb-2">
                <FormattedMessage id="mt.beizhu" />
              </span>
              <span className="text-primary text-sm font-semibold">用于中国国内的支付</span>
            </div>
          </div>
        </div>
      </div>
      <EditTable form={form} name="table" />
    </Modal>
  )
}

export default forwardRef(ModalFormTwo)
