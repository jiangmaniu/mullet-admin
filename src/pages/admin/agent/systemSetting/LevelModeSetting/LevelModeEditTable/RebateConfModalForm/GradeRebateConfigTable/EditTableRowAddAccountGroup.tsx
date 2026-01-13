import { FormattedMessage, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, Spin } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

import ProFormSelect from '@/components/Admin/Form/ProFormSelect'
import Modal from '@/components/Admin/ModalForm'
import { accountGroupList } from '@/services/api/agent/settings'

type IProps = {
  trigger?: JSX.Element
  // 可编辑表格自动注入的属性
  value?: any
  // 可编辑表格自动注入的属性，用于触发onChange事件修改value值回填到表格的row中
  onChange?: (value: any) => void
  info?: any
  onClose?: () => void
}

function EditTableRowAddAccountGroup({ trigger, value, onChange, info, onClose }: IProps, ref: any) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { run, data: dataRes, loading } = useRequest(accountGroupList)
  const data = dataRes?.data || []
  const options = useMemo(() => [{ value: '-1', label: <FormattedMessage id="common.all" /> }, ...data], [dataRes])

  const show = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
  }

  const setFormValue = () => {
    // 使用trigger 需要重新调用一次
    form.setFieldValue('accountGroupId', value)
  }

  useImperativeHandle(ref, () => {
    return {
      show,
      close,
      setFormValue
    }
  })

  useEffect(() => {
    setInputValue(value)
    form.setFieldsValue(info)
  }, [value, info])

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={<FormattedMessage id="mt.agent.tianjiazhanghuzu" />}
      form={form}
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async (values: any) => {
        console.log('values', values)

        // 变更到表格记录中
        onChange?.(values?.accountGroupId)

        close()

        return true // true关闭弹窗
      }}
      onCancel={close}
      afterClose={() => {
        onClose?.()
      }}
      width={600}
    >
      <Spin spinning={loading}>
        <ProFormSelect label={intl.formatMessage({ id: 'mt.agent.zhanghuzu' })} name="accountGroupId" required options={options} />
      </Spin>
    </Modal>
  )
}

export default forwardRef(EditTableRowAddAccountGroup)
