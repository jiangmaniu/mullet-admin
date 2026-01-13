import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { getAccountGroupPageList } from '@/services/api/tradeCore/accountGroup'

export const getColumns = (): ProColumns<any>[] => {
  return [
    {
      title: <FormattedMessage id="mt.leixing" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'inOut',
      valueEnum: getEnum().Enum.OrderInOut,
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 100,
      fieldProps: {}
    },
    {
      title: <FormattedMessage id="mt.shijian" />,
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.jine" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.yue" />,
      dataIndex: 'orderVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 300,
      fixed: 'right',
      align: 'right'
    },

    // 表单搜索项
    {
      dataIndex: 'dateRange',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: [useIntl().formatMessage({ id: 'common.startDate' }), useIntl().formatMessage({ id: 'common.endDate' })]
      }
    },
    {
      dataIndex: 'accountGroupId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      request: async () => {
        const res = await getAccountGroupPageList({ current: 1, size: 9999 })
        return (res.data?.records || [])
          .filter((item) => !item.isSimulate)
          .map((item) => ({ ...item, value: item.id, label: item.groupName }))
      },
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.xuanzejiaoyipinzhong' })
      }
    }
  ]
}
