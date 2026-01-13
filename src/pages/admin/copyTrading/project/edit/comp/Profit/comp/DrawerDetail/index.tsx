import { FormattedMessage } from '@umijs/max'

import DrawerForm from '@/components/Admin/DrawerForm'

import Table from './Table'

type IProps = {
  trigger: JSX.Element
  info?: any
}

export default function DrawerDetail({ trigger, info }: IProps) {
  return (
    <DrawerForm
      trigger={trigger}
      hiddenSubmitter
      width={1000}
      title={<FormattedMessage id="mt.xiangxiziliao" />}
      onFinish={async (values) => {
        // 不返回不会关闭弹框
        return true
      }}
    >
      <Table id={info?.id} />
    </DrawerForm>
  )
}
