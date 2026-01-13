import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import classNames from 'classnames'

import { getEnum } from '@/constants/enum'
import { formatNum } from '@/utils'

export const getColumns = (): ProColumns<Account.MoneyRecordsPageListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.shijian" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'createTime',
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
      title: <FormattedMessage id="common.type" />,
      dataIndex: 'type',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      valueEnum: getEnum().Enum.CustomerBalanceRecordType
    },
    // {
    //   title: <FormattedMessage id="mt.caozuoren" />,
    //   dataIndex: 'name',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 120
    // },
    {
      title: <FormattedMessage id="mt.jine" />,
      dataIndex: 'money',
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
        const num = formatNum(text, { precision: 2 })
        return text ? (
          <span className={classNames('!font-dingpro-medium', text > 0 ? 'text-green' : 'text-red')}>{text > 0 ? '+' + num : num}</span>
        ) : (
          '‑‑'
        )
      }
    },
    {
      title: <FormattedMessage id="mt.yue" />,
      dataIndex: 'newBalance',
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
      title: <FormattedMessage id="mt.biandongqian" />,
      dataIndex: 'oldBalance',
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
      width: 180,
      align: 'right',
      renderText(text, record, index, action) {
        return record.type !== 'TRANSFER' ? record.remark : '‑‑'
      }
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
        placeholder: [useIntl().formatMessage({ id: 'common.startDate' }), useIntl().formatMessage({ id: 'common.endDate' })]
      },
      colSize: 0.9
    },
    {
      dataIndex: 'type',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: getEnum().Enum.CustomerBalanceRecordType,
      fieldProps: {
        placeholder: <FormattedMessage id="mt.xuanzeleixing" />
      }
    }
    // {
    //   dataIndex: 'test',
    //   hideInTable: true,
    //   hideInSearch: false,
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   fieldProps: {
    //     placeholder: useIntl().formatMessage({ id: 'mt.shurucaozuoren' })
    //   }
    // }
  ]
}
