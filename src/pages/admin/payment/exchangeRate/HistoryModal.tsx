import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'

import Modal from '@/components/Admin/ModalForm'
import StandardTable from '@/components/Admin/StandardTable'
import { getExchangeRateLog } from '@/services/api/payment/exchangeRate'

type IProps = {
  reload?: () => void
}

function HistoryModal({ reload }: IProps, ref: any) {
  const [modalInfo, setModalInfo] = useState<any>({})
  const intl = useIntl()
  const [open, setOpen] = useState(false)

  const show = () => setOpen(true)
  const close = () => {
    setOpen(false)
    setModalInfo({})
  }

  useImperativeHandle(ref, () => {
    return {
      show: (info?: any) => {
        setModalInfo(info)
        show()
      },
      close
    }
  })

  const getColumns = useMemo(() => {
    return [
      {
        title: <FormattedMessage id="mt.jizhuihuobi" />,
        dataIndex: 'baseCurrency',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        fieldProps: {
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 80,
        fixed: 'left'
      },
      {
        title: <FormattedMessage id="mt.duihuanhuobibianhao" />,
        dataIndex: 'currencyCode',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        fieldProps: {
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 100
      },
      {
        title: <FormattedMessage id="mt.duihuanbili" />,
        dataIndex: 'exchangeRatio',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        fieldProps: {
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 100
      },
      {
        title: <FormattedMessage id="mt.xiugairen" />,
        dataIndex: 'modifier',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        fieldProps: {
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 100
      },
      {
        title: <FormattedMessage id="mt.xiugaishijian" />,
        dataIndex: 'updateTime',
        hideInSearch: true, // 在 table的查询表单 中隐藏
        ellipsis: false,
        copyable: false,
        fieldProps: {
          placeholder: ''
        },
        formItemProps: {
          label: '' // 去掉form label
        },
        width: 200,
        fixed: 'right',
        align: 'right'
      }
    ] as ProColumns<PaymentExchangeRate.ExchangeRateLogListItem>[]
  }, [intl.locale])

  if (!modalInfo.id) return null

  return (
    <>
      <Modal hiddenSubmitter title={<FormattedMessage id="mt.lishijilu" />} width={850} open={open} onCancel={() => setOpen(false)}>
        <StandardTable
          columns={getColumns}
          // ghost
          action={{
            query: (params) => getExchangeRateLog({ id: modalInfo.id, ...params })
          }}
          scroll={{ x: 400 }}
          hideSearch
          size="small"
        />
      </Modal>
    </>
  )
}

export default forwardRef(HistoryModal)
