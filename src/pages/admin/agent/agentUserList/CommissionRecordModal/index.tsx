import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import ModalForm from '@/components/Admin/ModalForm'
import StandardTable from '@/components/Admin/StandardTable'
import { getColumns } from '@/pages/admin/agent/commissionRecord/list/tableConfig'
import { commissionRecordsPageList } from '@/services/api/agent/commissionRecords'

type IProps = {
  trigger?: JSX.Element
  info?: AgentUser.AgentUserPageListItem & {
    /**跳传类型GC为产生佣金跳传，其它默认不填,可用值:GC */
    jumpType?: 'GC'
  }
  reload?: () => void
  onClose?: () => void
}

// 佣金记录
function CommissionRecordModal({ trigger, info, reload, onClose }: IProps, ref: any) {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const modalRef = useRef<any>(null)
  const agentId = info?.id
  const userName = info?.userName || ''

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

  const title = userName ? `[${userName}]` : ''

  return (
    <ModalForm
      trigger={trigger}
      title={title + intl.formatMessage({ id: 'mt.agent.fanyongjilu' })}
      open={open}
      showHeaderBg
      // 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 destroyOnClose 还会重置表单
      onFinish={async () => {
        return true
      }}
      // initialValues={initialValues}
      onCancel={close}
      afterClose={() => {
        onClose?.()
      }}
      width={1200}
      contentStyle={{ paddingInline: 0, paddingTop: 0 }}
      form={form}
      hiddenSubmitter
    >
      <StandardTable<AgentCommissionRecords.CommissionRecordsListItem, AgentCommissionRecords.CommissionRecordsListParams>
        columns={getColumns()}
        search={{ span: 4 }}
        showOptionColumn={false}
        params={{ agentId, jumpType: info?.jumpType }}
        cardProps={{ bodyStyle: { padding: 12 } }}
        // ghost
        action={{
          query: (params) => {
            return commissionRecordsPageList(params)
          }
        }}
        hideSearch
      />
    </ModalForm>
  )
}

export default forwardRef(CommissionRecordModal)
