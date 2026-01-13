import { FormattedMessage, useIntl } from '@umijs/max'
import { FormInstance } from 'antd'

import FeeConfigEditTable from '@/components/Admin/Form/FeeConfigEditTable'
import Modal from '@/components/Admin/ModalForm'

type IProps = {
  trigger: JSX.Element
  info?: any
  onFinish?: (values: any) => void
  onCancel?: () => void
  form: FormInstance
}

// 这里合并到了编辑品种弹窗里面
export default function ModalForm({ trigger, info, form, onFinish, onCancel }: IProps) {
  const intl = useIntl()

  return (
    <Modal
      trigger={trigger}
      title={<FormattedMessage id="mt.bianjijiaoyipinzhong" />}
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async (values: any) => {
        // 表单校验成功
        if (Object.keys(values).length) {
          console.log('checkForm Success', values)

          // 回调
          await onFinish?.({ ...values, id: info?.id })

          return true // 关闭弹窗
        }
        return false
      }}
      layout="horizontal"
      colon={false}
      form={form}
      initialValues={{ ...info.modalFormData }}
    >
      <FeeConfigEditTable form={form} name={['transactionFeeConf', 'table']} />
    </Modal>
  )
}
