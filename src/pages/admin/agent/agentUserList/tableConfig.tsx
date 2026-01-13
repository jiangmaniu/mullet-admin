import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { formatNum } from '@/utils'
import { cn } from '@/utils/cn'

export const getColumns = (
  onShowCommissionRecordModal: (record: AgentUser.AgentUserPageListItem, jumpType?: 'GC') => void
): ProColumns<AgentUser.AgentUserPageListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.agent.xing" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'lastName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 170
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
      align: 'left',
      fixed: 'left',
      width: 100
    },
    {
      title: <FormattedMessage id="mt.agent.kehuuid" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'userUid',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      onCell: (record) => {
        return {
          onClick: (e) => {
            e.stopPropagation()
          }
        }
      }
    },
    {
      title: <FormattedMessage id="mt.agent.dailileixing" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'userType',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      renderText(text, record, index, action) {
        return record.userType === 'AGENT' ? (
          <FormattedMessage id="mt.agent.dailiyonghu" />
        ) : (
          <FormattedMessage id="mt.agent.putongyonghu" />
        )
      }
    },
    // {
    //   title: <FormattedMessage id="mt.agent.shangjidaili" />, // 与 antd 中基本相同，但是支持通过传入一个方法
    //   dataIndex: 'agentId',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 160
    // },
    // {
    //   title: <FormattedMessage id="mt.agent.dailidengji" />,
    //   dataIndex: 'remark',
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
    {
      title: <FormattedMessage id="mt.agent.mingxiakehushuliang" />,
      dataIndex: 'numberOfCustomers',
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
      title: <FormattedMessage id="mt.agent.zongrujin" />,
      dataIndex: 'totalDeposit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 170,
      tooltip: <FormattedMessage id="mt.agent.hanxiadailitips" />
    },
    {
      title: <FormattedMessage id="mt.agent.zongchujin" />,
      dataIndex: 'totalWithdrawal',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 170,
      tooltip: <FormattedMessage id="mt.agent.hanxiadailitips" />
    },
    {
      title: <FormattedMessage id="mt.agent.jingrujin" />,
      dataIndex: 'netDeposit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 170,
      tooltip: <FormattedMessage id="mt.agent.hanxiadailitips" />
    },
    {
      title: <FormattedMessage id="mt.agent.jiaoyishoushu" />,
      dataIndex: 'tradeVolume',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      tooltip: <FormattedMessage id="mt.agent.hanxiadailitips" />
    },
    {
      title: <FormattedMessage id="mt.agent.jiaoyishouxufei" />,
      dataIndex: 'handlingFee',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      tooltip: <FormattedMessage id="mt.agent.hanxiadailitips" />,
      renderText(text, record, index, action) {
        return text ? (
          <span className={cn('font-medium', text > 0 ? 'text-green' : 'text-red')}>
            {text > 0 ? '+' : ''}
            {formatNum(text, { precision: 2 })}
          </span>
        ) : (
          '--'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.agent.yishixianyingkui" />,
      dataIndex: 'realizedProfitLoss',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        const profit = record.realizedProfitLoss
        const flag = Number(profit) > 0
        return profit ? (
          <span className={cn('font-medium', flag ? 'text-green' : 'text-red')}>
            {flag ? '+' : ''}
            {formatNum(profit, { precision: 2 })}
          </span>
        ) : (
          '--'
        )
      },
      tooltip: <FormattedMessage id="mt.agent.hanxiadailitips" />
    },
    {
      title: <FormattedMessage id="mt.agent.gerenchanshengyongjin" />,
      dataIndex: 'generateCommission',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        return text ? (
          <span
            className={cn('font-medium cursor-pointer underline', text > 0 ? 'text-green' : 'text-red')}
            onClick={(e) => {
              e.stopPropagation()
              onShowCommissionRecordModal(record, 'GC')
            }}
          >
            {text > 0 ? '+' : ''}
            {formatNum(text, { precision: 2 })}
          </span>
        ) : (
          '--'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.agent.mingxiakehuleijichanshengyongjin" />,
      dataIndex: 'accumulatedCommission',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      tooltip: <FormattedMessage id="mt.agent.mingxiakehuleijichanshengyongjintips" />,
      width: 200,
      renderText(text, record, index, action) {
        return text ? (
          <span
            className={cn('font-medium cursor-pointer underline', text > 0 ? 'text-green' : 'text-red')}
            onClick={(e) => {
              e.stopPropagation()
              onShowCommissionRecordModal(record)
            }}
          >
            {text > 0 ? '+' : ''}
            {formatNum(text, { precision: 2 })}
          </span>
        ) : (
          '--'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.agent.fanyongqianbaoyue" />,
      dataIndex: 'money',
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
      title: <FormattedMessage id="mt.agent.weijiesuanfanyongyue" />,
      dataIndex: 'unsettledRebateBalance',
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
      title: <FormattedMessage id="mt.agent.shouji" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'phone',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        const phoneAreaCode = record.phoneAreaCode ? '+' + record.phoneAreaCode.replace('+', '') : ''
        return record.phone ? `${phoneAreaCode} ${record.phone}` : '--'
      }
    },
    {
      title: <FormattedMessage id="mt.agent.youxiang" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'email',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.agent.kaihushijian" />,
      dataIndex: 'createTime',
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
      dataIndex: 'dateRange',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[250px]',
        placeholder: [
          useIntl().formatMessage({ id: 'mt.agent.tongjikaishishijian' }),
          useIntl().formatMessage({ id: 'mt.agent.tongjijieshushijian' })
        ]
      },
      colSize: 0.9
    },
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
    // },
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
      dataIndex: 'phone',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'mt.agent.shouji' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'email',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'mt.agent.youxiang' })
      },
      colSize: 0.9
    }
  ]
}
