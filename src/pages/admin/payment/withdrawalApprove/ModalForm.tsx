import { ProFormTextArea } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import Modal from '@/components/Admin/ModalForm'
import { approveWithdrawl } from '@/services/api/payment/withdraw'

type IProps = {
  reload?: () => void
}

function ModalForm({ reload }: IProps, ref: any) {
  const [modalInfo, setModalInfo] = useState<any>({})
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
      form.setFieldsValue(modalInfo)
    }
  }, [modalInfo])

  return (
    <>
      <Modal
        title={<FormattedMessage id="mt.dingdanshenhe" />}
        onFinish={async (values: any) => {
          console.log('values', values)

          const res = await approveWithdrawl({ approvalType: 'FAIL', id: modalInfo.id, ...values })
          const success = res?.success

          if (success) {
            // 刷新列表
            reload?.()
            // 关闭弹窗
            close()
          }

          return success
        }}
        width={600}
        open={open}
        onCancel={() => setOpen(false)}
        form={form}
      >
        <div className="">
          <ProFormTextArea
            name={'remark'}
            rules={[{ required: true, message: intl.formatMessage({ id: 'mt.shurujujueyuanyin' }) }]}
            label={intl.formatMessage({ id: 'mt.jujueyuanyin' })}
            fieldProps={{ showCount: true, maxLength: 1000, autoSize: { minRows: 4, maxRows: 10 } }}
            required
            placeholder={intl.formatMessage({ id: 'mt.shurujujueyuanyin' })}
          />
        </div>
      </Modal>
    </>
  )
}

export default forwardRef(ModalForm)
