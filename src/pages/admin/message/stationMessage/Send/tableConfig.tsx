import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'

export const getColumns = (): ProColumns<MessageSend.MessageSendListItem>[] => {
  return [
    // {
    //   title: <FormattedMessage id="mt.xuhao" />, // 与 antd 中基本相同，但是支持通过传入一个方法
    //   dataIndex: 'OrderId',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   fixed: 'left',
    //   width: 150,
    //   renderText(text, record, index, action) {
    //     return index + 1
    //   },
    // },
    {
      title: <FormattedMessage id="mt.biaoti" />,
      dataIndex: 'title',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      fixed: 'left'
    },
    {
      title: <FormattedMessage id="mt.zhuangtai" />,
      dataIndex: 'status',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      valueEnum: getEnum().Enum.MessageSendStatus,
      width: 150
    },
    {
      title: <FormattedMessage id="mt.jieshouduixiang" />,
      dataIndex: 'recipientType',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      valueEnum: getEnum().Enum.MessageRecipientType
    },
    {
      title: <FormattedMessage id="mt.fasongshijian" />,
      dataIndex: 'scheduledTime',
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
      title: <FormattedMessage id="mt.caozuoren" />,
      dataIndex: 'account',
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
    // {
    //   title: <FormattedMessage id="mt.chuangjianshijian" />,
    //   dataIndex: 'createTime',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150
    // },

    // 表单搜索项
    {
      dataIndex: 'title',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'mt.biaoti' })
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
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'common.status' })
      },
      valueType: 'select',
      valueEnum: getEnum().Enum.MessageSendStatus,
      colSize: 0.9
    },
    {
      dataIndex: 'dateRange',
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
    }
  ]
}
