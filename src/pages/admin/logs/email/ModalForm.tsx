import { FormattedMessage, useIntl } from '@umijs/max'
import { Descriptions, DescriptionsProps } from 'antd'
import { forwardRef, useState } from 'react'

import Modal from '@/components/Admin/ModalForm'

type IProps = {
  reload?: () => void
  trigger: JSX.Element
  info: Log.UsualLogListItem
}

function ModalForm({ reload, trigger, info }: IProps, ref: any) {
  const [modalInfo, setModalInfo] = useState<any>({})
  const isAdd = Object.keys(modalInfo || {}).length === 0
  const intl = useIntl()

  const items: DescriptionsProps['items'] = [
    {
      key: info?.serviceId,
      label: intl.formatMessage({ id: 'mt.fuwuhid' }),
      children: info?.serviceId
    },
    {
      key: '2',
      label: intl.formatMessage({ id: 'mt.fuwuhost' }),
      children: info?.serverHost
    },
    {
      key: '3',
      label: intl.formatMessage({ id: 'mt.fuwuip' }),
      children: info?.serverIp
    },
    {
      key: '4',
      label: intl.formatMessage({ id: 'mt.rizhishijian' }),
      children: info?.createTime
    },
    {
      key: '5',
      label: intl.formatMessage({ id: 'mt.rizhishuju' }),
      children: info?.logData,
      span: 2
    }
  ]

  return (
    <>
      <Modal title={<FormattedMessage id="mt.chakan" />} width={1000} trigger={trigger} hiddenSubmitter>
        <Descriptions
          bordered
          contentStyle={{ minWidth: 260 }}
          labelStyle={{ width: 150 }}
          layout="horizontal"
          column={2}
          size="middle"
          items={items}
        />
      </Modal>
    </>
  )
}

export default forwardRef(ModalForm)
