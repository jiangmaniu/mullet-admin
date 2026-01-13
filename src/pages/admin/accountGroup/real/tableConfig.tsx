import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'

export const getColumns = (): ProColumns<AccountGroup.AccountGroupPageListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.zubie" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'groupCode',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 100
    },
    {
      title: <FormattedMessage id="mt.mingcheng" />,
      dataIndex: 'groupName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
    },
    {
      title: <FormattedMessage id="common.type" />,
      dataIndex: 'orderMode',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      valueEnum: getEnum().Enum.OrderMode,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.yufukuan" />,
      dataIndex: 'usableAdvanceCharge',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      valueEnum: getEnum().Enum.UsableAdvanceCharge,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100,
      renderText(text, record, index, action) {
        return getEnum().Enum.UsableAdvanceCharge[text]?.text || '‑‑'
      }
    },
    {
      title: <FormattedMessage id="mt.huobi" />,
      dataIndex: 'currencyUnit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 100
    },
    {
      title: <FormattedMessage id="mt.beizhu" />,
      dataIndex: 'remark',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },

    // 表单搜索项
    {
      dataIndex: 'orderMode',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: getEnum().Enum.OrderMode,
      fieldProps: {
        showSearch: true,
        className: '!w-[180px]',
        placeholder: <FormattedMessage id="mt.selectType" />
      },
      colSize: 0.9
    },
    {
      dataIndex: 'groupName',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[180px]',
        placeholder: useIntl().formatMessage({ id: 'mt.sousuomingcheng' })
      },
      colSize: 0.9
    }
  ]
}
