import { ProFormTextArea } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import ProFormText from '@/components/Admin/Form/ProFormText'
import Modal from '@/components/Admin/ModalForm'

type IProps = {
  trigger: JSX.Element
  info?: any
}

export default function ModalForm({ trigger, info = {} }: IProps) {
  const isAdd = Object.keys(info).length === 0
  const intl = useIntl()

  return (
    <Modal
      width={600}
      title={isAdd ? <FormattedMessage id="mt.xinzengmoban" /> : <FormattedMessage id="mt.bianjimoban" />}
      onFinish={async (values: any) => {
        console.log('values', values)

        return true
      }}
      trigger={trigger}
    >
      <div className="grid gap-y-4">
        <ProFormText required name="mingcheng" label={intl.formatMessage({ id: 'mt.biaoti' })} />
        <ProFormSelect
          label={intl.formatMessage({ id: 'mt.fasongchangjing' })}
          name="role"
          required
          options={[{ label: <FormattedMessage id="mt.dingshirenwu" />, value: '1' }]}
          // width="lg"
        />
        <ProFormTextArea
          name="content"
          rules={[{ required: true, message: intl.formatMessage({ id: 'mt.shuruneirong' }) }]}
          label={intl.formatMessage({ id: 'mt.shuruneirong' })}
        />
      </div>
    </Modal>
  )
}
