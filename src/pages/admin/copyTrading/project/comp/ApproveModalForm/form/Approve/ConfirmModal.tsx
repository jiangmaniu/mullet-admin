import { FormattedMessage, useIntl } from '@umijs/max'
import { Form, FormInstance } from 'antd'

import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/Modal'
import Button from '@/components/Base/Button'

type IProps = {
  form: FormInstance
  open: boolean
  onFinish: () => void
  close: (val: string) => void
}

export default ({ form, open, onFinish, close }: IProps) => {
  const intl = useIntl()

  const auditReason = Form.useWatch('auditReason', form) // 转出

  return (
    <Modal
      width={517}
      open={open}
      title={
        <div>
          <FormattedMessage id="mt.jujieshenhe" />
        </div>
      }
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        // 校验表单
        form
          .validateFields(['auditReason'])
          .then((res) => {
            return true
          })
          .catch((err) => {
            console.log('checkForm Error', err)
            return false
          })
      }}
      afterClose={() => {
        close?.(auditReason)
      }}
      hiddenSubmitter
    >
      <div className="flex flex-col gap-3.5">
        <span className=" text-sm">
          <FormattedMessage id="mt.qingshurujujueliyou" />
        </span>
        <ProFormText
          name="auditReason"
          initialValue={auditReason}
          placeholder={intl.formatMessage({ id: 'mt.qingshurujujueliyou' })}
          rules={[{ required: true, message: intl.formatMessage({ id: 'mt.qingshurujujueliyou' }) }]}
        />

        <div className=" flex flex-row justify-end  items-end gap-2 mt-8">
          <Button size="large" style={{ width: 118 }} onClick={() => close?.('')}>
            <FormattedMessage id="mt.quxiao" />
          </Button>
          <Button size="large" style={{ width: 118 }} type="primary" onClick={onFinish}>
            <FormattedMessage id="mt.queren" />
          </Button>
        </div>
      </div>
    </Modal>
  )
}
