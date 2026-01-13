import { ProFormTextArea } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import ProFormDigit from '@/components/Admin/Form/ProFormDigit'
import Modal from '@/components/Admin/ModalForm'
import { bindAgent } from '@/services/api/agent/user'
import { message } from '@/utils/message'

type IProps = {
  trigger?: JSX.Element
  info?: AgentUser.AgentUserPageListItem
  reload?: () => void
  onClose?: () => void
}

function BindAgentModalForm({ trigger, info, reload, onClose }: IProps, ref: any) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  const show = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
  }

  useImperativeHandle(ref, () => {
    return {
      show,
      close
    }
  })

  useEffect(() => {
    form.setFieldsValue({
      ...info,
      remark: undefined
    })
  }, [info])

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={<FormattedMessage id="mt.agent.bangdingdaili" />}
      form={form}
      showHeaderBg
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async (values: any) => {
        console.log('formData', values)
        const params = {
          ...values,
          userUid: info?.userUid
        } as AgentUser.BindAgentParams
        const res = await bindAgent(params)
        const success = res.success

        if (success) {
          message.info(intl.formatMessage({ id: 'common.saveSuccess' }))
          reload?.()
          close()
        }

        return success // true关闭弹窗
      }}
      // initialValues={initialValues}
      onCancel={close}
      afterClose={() => {
        onClose?.()
      }}
      width={600}
    >
      <div className="w-full grid grid-cols-1 gap-x-[40px] gap-y-5">
        <ProFormDigit
          required
          name="agentUid"
          label={intl.formatMessage({ id: 'mt.agent.dailishanguid' })}
          fieldProps={{
            maxLength: 8,
            precision: undefined,
            controls: false
          }}
        />
        <ProFormTextArea
          required={false}
          name="remark"
          label={intl.formatMessage({ id: 'mt.agent.beizhu' })}
          formItemProps={{
            rules: [
              {
                required: false,
                message: intl.formatMessage({ id: 'mt.agent.shurubeizhu' })
              }
            ]
          }}
        />
      </div>
    </Modal>
  )
}

export default forwardRef(BindAgentModalForm)
