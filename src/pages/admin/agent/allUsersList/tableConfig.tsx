import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { formatNum } from '@/utils'
import { cn } from '@/utils/cn'

export const getColumns = (): ProColumns<AgentUser.AgentUserPageListItem>[] => {
  return [
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
      width: 200
    },
    {
      title: <FormattedMessage id="mt.agent.kehuleixing" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'userType',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160,
      valueEnum: getEnum().Enum.AgentUserType
    },
    {
      title: <FormattedMessage id="mt.agent.shangjidaili" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'topAgentName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 160
    },
    {
      title: <FormattedMessage id="mt.agent.shoujihao" />,
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
        return text ? `${record.phoneAreaCode ? '+' + record.phoneAreaCode.replace('+', '') : ''} ${text}` : '--'
      }
    },
    {
      title: <FormattedMessage id="mt.agent.youxiang" />,
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
      width: 150
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
      width: 150
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
      width: 150
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
      width: 150
    },
    {
      title: <FormattedMessage id="mt.agent.zhuceshijian" />,
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
        className: '!w-[250px]',
        placeholder: [
          useIntl().formatMessage({ id: 'mt.agent.tongjikaishishijian' }),
          useIntl().formatMessage({ id: 'mt.agent.tongjijieshushijian' })
        ]
      },
      colSize: 0.9
    },
    {
      dataIndex: 'regTime',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            regStartTime: `${value[0]} 00:00:00`,
            regEndTime: `${value[1]} 23:59:59`
          }
        }
      },
      fieldProps: {
        className: '!w-[250px]',
        placeholder: [
          useIntl().formatMessage({ id: 'mt.agent.zhucekaishishijian' }),
          useIntl().formatMessage({ id: 'mt.agent.zhucejieshushijian' })
        ]
      },
      colSize: 0.9
    },
    {
      dataIndex: 'userType',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      valueType: 'select',
      valueEnum: getEnum().Enum.AgentUserType,
      fieldProps: {
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'mt.agent.kehuleixing' })
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
      dataIndex: 'phone',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'mt.agent.shoujihao' })
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
