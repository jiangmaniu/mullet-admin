import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'

export const getColumns = (): ProColumns<AgentWithdrawalRecord.withdrawalRecordPageListItem>[] => {
  return [
    // {
    //   title: <FormattedMessage id="mt.agent.xingming" />,
    //   dataIndex: 'userName',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: true,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   fixed: 'left',
    //   width: 160
    // },
    {
      title: <FormattedMessage id="mt.agent.xing" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'lastName',
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
      title: <FormattedMessage id="mt.agent.ming" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'firstName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
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
      title: <FormattedMessage id="mt.agent.kehuuid" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'userUid',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    // {
    //   title: <FormattedMessage id="mt.agent.dailibianhao" />, // 与 antd 中基本相同，但是支持通过传入一个方法
    //   dataIndex: 'agentId',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: true,
    //   copyable: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 180
    // },
    {
      title: <FormattedMessage id="mt.agent.zhuanrujiaoyizhanghu" />,
      dataIndex: 'tradeAccountId',
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
      title: <FormattedMessage id="mt.agent.jine" />,
      dataIndex: 'amount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.agent.shijian" />,
      dataIndex: 'withdrawalTime',
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
    // {
    //   title: <FormattedMessage id="mt.agent.shengyuqianbaoyue" />,
    //   dataIndex: 'remainingBalance',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     precision: 2,
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150
    // },
    {
      title: <FormattedMessage id="mt.agent.shenhefangshi" />,
      dataIndex: 'reviewMethod',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      valueEnum: getEnum().Enum.AgentWithdrawAuditMode
    },
    {
      title: <FormattedMessage id="mt.agent.zhuangtai" />,
      dataIndex: 'status',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      // valueEnum: getEnum().Enum.AgentWithdrawalStatus,
      width: 150,
      renderText(text, record, index, action) {
        const statusMap = getEnum().Enum.AgentWithdrawalStatus[text]
        return text ? <span style={{ color: statusMap?.color }}>{statusMap.text}</span> : '--'
      }
    },
    {
      title: <FormattedMessage id="mt.agent.beizhu" />,
      dataIndex: 'remark',
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

    // 表单搜索项
    {
      dataIndex: 'dateRange',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[240px]',
        placeholder: [useIntl().formatMessage({ id: 'common.startDate' }), useIntl().formatMessage({ id: 'common.endDate' })]
      },
      colSize: 0.9
    },
    {
      dataIndex: 'userUid',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'mt.agent.kehuuid' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'userName',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'mt.agent.xingming' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'status',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'mt.agent.zhuangtai' })
      },
      colSize: 0.9,
      valueType: 'select',
      valueEnum: getEnum().Enum.AgentWithdrawalStatus
    }
    // {
    //   dataIndex: 'agentId',
    //   hideInTable: true,
    //   hideInSearch: false,
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   fieldProps: {
    //     className: '!w-[150px]',
    //     placeholder: useIntl().formatMessage({ id: 'mt.agent.dailibianhao' })
    //   },
    //   colSize: 0.9
    // }
  ]
}
