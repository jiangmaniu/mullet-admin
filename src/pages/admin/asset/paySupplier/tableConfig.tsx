import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import SymbolViewModal from './comp/SymbolViewModal'

export const getColumns = (): ProColumns<any>[] => {
  return [
    {
      title: <FormattedMessage id="mt.xuhao" />, // 与 antd 中基本相同，但是支持通过传入一个方法
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
      width: 80
    },
    {
      title: <FormattedMessage id="mt.mingcheng" />,
      dataIndex: 'Login',
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
      title: <FormattedMessage id="mt.bizhonghuilv" />,
      dataIndex: 'name',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      renderText(text, record, index, action) {
        return <SymbolViewModal trigger={<span className="text-sm text-primary underline cursor-pointer">USD/CNY/HKD</span>} />
      }
    },
    {
      title: <FormattedMessage id="mt.qudaoleixing" />,
      dataIndex: 'type',
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
      title: <FormattedMessage id="mt.daozhangshijian" />,
      dataIndex: 'dfafda',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.jiesuanfangshi" />,
      dataIndex: 'fdafgd',
      valueEnum: {
        // 值的枚举，会自动转化把值当成 key 来取出要显示的内容
        1: { text: <FormattedMessage id="mt.rijie" /> },
        2: { text: <FormattedMessage id="mt.yuejie" /> }
      },
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
      title: <FormattedMessage id="mt.shuoming" />,
      dataIndex: 'Lot',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 240,
      align: 'right'
    },

    // 表单搜索项
    {
      dataIndex: 'symbol',
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
        placeholder: <FormattedMessage id="mt.xuanzebizhong" />
      }
    },
    {
      dataIndex: 'command',
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
        placeholder: <FormattedMessage id="mt.xuanzequdaoleixing" />
      }
    },
    {
      dataIndex: 'name',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'mt.inputName' })
      },
      colSize: 0.9
    }
  ]
}
