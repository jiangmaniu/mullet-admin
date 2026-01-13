import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, request } from '@umijs/max'

import Modal from '@/components/Admin/Modal'
import StandardTable from '@/components/Admin/StandardTable'

type IProps = {
  trigger: JSX.Element
}

export default function SymbolViewModal({ trigger }: IProps) {
  const columns: ProColumns<any>[] = [
    {
      title: <FormattedMessage id="mt.bizhong" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'OrderId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.bidHuilv" />,
      dataIndex: 'Login',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      // valueType: 'avatar',
      formItemProps: {
        label: '' // 去掉form label
      }
    },
    {
      title: <FormattedMessage id="mt.askHuilv" />,
      dataIndex: 'Login',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      // valueType: 'avatar',
      formItemProps: {
        label: '' // 去掉form label
      }
    },
    {
      title: <FormattedMessage id="mt.shouxufei" />,
      dataIndex: 'Login',
      align: 'right',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      // valueType: 'avatar',
      formItemProps: {
        label: '' // 去掉form label
      }
    }
  ]
  return (
    <Modal footer={null} closable maskClosable title={<FormattedMessage id="mt.zhichibizhong" />} trigger={trigger}>
      <StandardTable
        columns={columns}
        ghost
        cardProps={{ bodyStyle: { padding: 0 } }}
        hideSearch
        scroll={{ x: 600 }}
        action={{
          query: (params) =>
            request<{
              data: any[]
            }>('https://proapi.azurewebsites.net/github/issues', {
              params
            })
        }}
      />
    </Modal>
  )
}
