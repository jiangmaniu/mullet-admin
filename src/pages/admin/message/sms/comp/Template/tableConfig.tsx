import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage } from '@umijs/max'

export const getColumns = (): ProColumns<any>[] => {
  return [
    {
      title: <FormattedMessage id="mt.mubanmingcheng" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'OrderId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 150
    },
    {
      title: <FormattedMessage id="mt.neirong" />,
      dataIndex: 'Login',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 300
    }
  ]
}
