import { FormattedMessage, useIntl } from '@umijs/max'
import { Form } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import Modal from '@/components/Admin/ModalForm'
import { EditDragSortTableRef } from '@/components/Admin/StandardTable/EditDragSortTable'
import Iconfont from '@/components/Base/Iconfont'
import { message } from '@/utils/message'

import GradeRebateConfigTable from './GradeRebateConfigTable'

type IProps = {
  trigger?: JSX.Element
  info?: AgentUser.LevelListItem
  reload?: () => void
  onClose?: () => void
  onFinish?: (values: any) => void
  name: NamePath
}

function ModalForm({ trigger, info, reload, onClose, onFinish, name }: IProps, ref: any) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const tableRef = useRef<EditDragSortTableRef>(null)
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])

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
      // @ts-ignore
      [name]: (info?.rebateConfigVOList || []).sort((a: any, b: any) => a.sortIndex - b.sortIndex)
    })
  }, [info])

  console.log('===回显返佣配置表格内容==', info)

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={<FormattedMessage id="mt.agent.fanyongpeizhi" />}
      renderTitle={() => {
        return (
          <div className="w-full">
            <div className="text-primary font-semibold text-base">
              <FormattedMessage id="mt.agent.fanyongpeizhi" />
            </div>
            <div className="flex items-center justify-center w-full">
              <Iconfont name="peizhiqiehuanguize" className="!size-[60px]" />
            </div>
          </div>
        )
      }}
      form={form}
      showHeaderBg
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async (values: any) => {
        console.log('formData', values)

        if (editableKeys?.length) {
          return message.info(intl.formatMessage({ id: 'common.qingxianbaocunshuju' }))
        }

        const tableData = form.getFieldValue(name)
        if (!tableData || !tableData?.length) {
          return message.info(intl.formatMessage({ id: 'common.zhishaotianjiayitianshuju' }))
        }

        const success = true

        close()
        onFinish?.(values)

        return success // true关闭弹窗
      }}
      // initialValues={initialValues}
      onCancel={close}
      afterClose={() => {
        onClose?.()
      }}
      width={1100}
    >
      <div>
        <Form.Item name={name} noStyle>
          <GradeRebateConfigTable
            name={name}
            form={form}
            getEditableKeys={(keys) => {
              setEditableRowKeys(keys)
            }}
          />
        </Form.Item>
      </div>
    </Modal>
  )
}

export default forwardRef(ModalForm)
