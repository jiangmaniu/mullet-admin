import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { useEffect } from 'react'

import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'

type IProps = {
  title: any
  open: boolean
  info?: any
  onClose: () => void
  onFinish: (values: any) => void
}

export default function ModalForm({ info, open, onClose, onFinish, title }: IProps) {
  const intl = useIntl()
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldValue('title', info?.title)
  }, [info])

  return (
    <Modal
      title={title}
      open={open}
      onFinish={async (values) => {
        onFinish?.(values)
      }}
      form={form}
      width={500}
      afterClose={() => {
        onClose?.()
        form.resetFields(['title'])
      }}
      onCancel={() => {
        onClose?.()
      }}
    >
      <ProFormText name="title" required label={intl.formatMessage({ id: 'mt.mingcheng' })} />
    </Modal>
  )
}
