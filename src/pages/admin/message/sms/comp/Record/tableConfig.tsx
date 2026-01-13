import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

export const getColumns = (): ProColumns<any>[] => {
  return [
    {
      title: <FormattedMessage id="mt.biaoti" />, // 与 antd 中基本相同，但是支持通过传入一个方法
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
      width: 240
    },
    {
      title: <FormattedMessage id="mt.neirong" />,
      dataIndex: 'Login',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
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
      title: <FormattedMessage id="mt.moban" />,
      dataIndex: 'name',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.shoujianren" />,
      dataIndex: 'Command',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.fasongzhuangtai" />,
      dataIndex: 'time',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.fasongshijian" />,
      dataIndex: 'Lot',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },

    // 表单搜索项
    {
      dataIndex: 'time2',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      valueType: 'dateRange',
      fieldProps: {
        className: '!w-[250px]',
        placeholder: [useIntl().formatMessage({ id: 'common.startDate' }), useIntl().formatMessage({ id: 'common.endDate' })]
      },
      colSize: 0.9
    },
    {
      dataIndex: 'muban',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: {
        // 值的枚举，会自动转化把值当成 key 来取出要显示的内容
        OP_BUY: { text: <FormattedMessage id="mt.mairu" /> },
        OP_SELL: { text: <FormattedMessage id="mt.maichu" /> }
      },
      fieldProps: {
        showSearch: true,
        placeholder: <FormattedMessage id="mt.xuanzemuban" />
      }
    },
    {
      dataIndex: 'command',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.shurushoujianren' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'status',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: useIntl().formatMessage({ id: 'common.status' })
      },
      valueType: 'select',
      valueEnum: {
        // 值的枚举，会自动转化把值当成 key 来取出要显示的内容
        OP_BUY: { text: <FormattedMessage id="mt.mairu" /> },
        OP_SELL: { text: <FormattedMessage id="mt.maichu" /> }
      }
    }
  ]
}
