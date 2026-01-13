import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'

import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'
import { addDelayUser } from '@/services/api/crm/customer'
import { message } from '@/utils/message'

type IProps = {
  trigger: JSX.Element
  info?: Manager.ListItem
  reload?: () => void
}

export default function ModalForm({ trigger, info, reload }: IProps) {
  const intl = useIntl()
  const [form] = Form.useForm()

  return (
    <Modal
      trigger={trigger}
      title={<FormattedMessage id="common.add" />}
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        // 校验表单
        const values: any = await form.getFieldsValue()
        const res = await addDelayUser(values)
        const success = res?.success

        console.log('values', values)

        if (success) {
          message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
          reload?.()
        }

        return success // true关闭弹窗
      }}
      afterClose={() => {}}
      form={form}
      width={500}
    >
      <ProFormText
        maxLength={20}
        required
        name={'accountEmailPhone'}
        label={intl.formatMessage({ id: 'mt.yonghumingorshoujioryouxiang' })}
      />
    </Modal>
  )
}
