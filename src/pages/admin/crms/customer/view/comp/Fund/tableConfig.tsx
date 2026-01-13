import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useParams } from '@umijs/max'
import { useEffect, useMemo, useState } from 'react'

import { DEFAULT_PRECISION } from '@/constants'
import { getEnum } from '@/constants/enum'
import { formatNum } from '@/pages/admin/crms'
import { cn } from '@/utils/cn'

export const getColumns = (
  groups: Record<string, { text: string; color?: string }>,
  accounts: Record<string, { text: string; color?: string; groupId?: number }>
): ProColumns<CrmClient.StatMoneyItem>[] => {
  const { id } = useParams()

  const [group, setGroup] = useState('ALLALL')

  const showAccounts = useMemo(() => {
    const records = Object.keys(accounts).filter(
      (key) => !group || group === 'ALLALL' || String(accounts[key].groupId) === group || key === 'ALLALL'
    )
    return records.reduce((acc, key) => {
      acc[key] = accounts[key]
      return acc
    }, {} as Record<string, { text: string; color?: string }>)
  }, [group])

  const [account, setAccount] = useState('ALLALL')
  useEffect(() => {
    if (group && group !== 'ALLALL') {
      setAccount('ALLALL')
    }
  }, [group])

  return [
    {
      title: <FormattedMessage id="mt.zhanghuleixing" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'accountGroupId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      renderText(text, record, index, action) {
        return text ? groups[text]?.text : ''
      }
    },
    {
      title: <FormattedMessage id="mt.jiaoyizhanghu" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'accountId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      renderText(text, record, index, action) {
        return text ? accounts[text]?.text : ''
      }
    },
    {
      title: <FormattedMessage id="mt.jiaoyizhanghuid" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'accountId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200
    },
    {
      title: <FormattedMessage id="mt.leixing" />,
      dataIndex: 'type',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      valueEnum: getEnum().Enum.CustomerBalanceRecordType,
      align: 'center',
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },

    {
      title: <FormattedMessage id="mt.jine" />,
      dataIndex: 'money',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      align: 'center',
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record, index, action) {
        const num = formatNum(text, { precision: DEFAULT_PRECISION })
        return text ? (
          <span className={cn('!font-dingpro-medium', text > 0 ? 'text-green' : 'text-red')}>{text > 0 ? '+' + num : num}</span>
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
      align: 'center',
      fixed: 'right',
      fieldProps: {
        precision: DEFAULT_PRECISION,
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
      align: 'center',
      fieldProps: {
        precision: DEFAULT_PRECISION,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.shijian" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      fieldProps: {},
      // fixed: 'right',
      align: 'right'
    },
    {
      title: <FormattedMessage id="mt.beizhu" />,
      dataIndex: 'remark',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      // fieldProps: {
      //   precision: 2,
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      width: 200,
      // fixed: 'right',
      align: 'right'
    },

    // 表单搜索项
    {
      dataIndex: 'dateRangeNoTime',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[220px]',
        placeholder: [getIntl().formatMessage({ id: 'common.startDate' }), getIntl().formatMessage({ id: 'common.endDate' })]
      },
      colSize: 0.9
    },

    {
      dataIndex: 'accountGroupId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: groups,
      title: getIntl().formatMessage({ id: 'mt.zhanghuleixing' }),
      fieldProps: {
        onChange: (value) => {
          // @ts-ignore
          setGroup(value)
        },
        value: group,
        style: {
          // width: 280,
          overflow: 'hidden'
        },
        className: '!w-[140px]',
        placeholder: getIntl().formatMessage({ id: 'mt.zhanghuleixing' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'tradeAccountId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      search: true,
      valueEnum: showAccounts,
      title: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' }),
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' }),
        onChange: (value) => {
          // @ts-ignore
          setAccount(value)
        },
        style: {
          // width: 280,
          overflow: 'hidden'
        },
        className: '!w-[140px]',
        value: account
      },
      colSize: 0.9
    },
    // {
    //   dataIndex: 'accountGroupId',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'select', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   request: async () => {
    //     const data = await getAccountGroupPageList({ current: 1, size: 999 })
    //     return (data.data?.records || []).filter((v) => !v.isSimulate).map((item) => ({ label: item.groupName, value: item.id }))
    //   },
    //   fieldProps: {
    //     className: '!w-[180px]',
    //     placeholder: getIntl().formatMessage({ id: 'mt.zhanghuleixing' })
    //   },
    //   colSize: 0.9
    // },
    // {
    //   dataIndex: 'tradeAccountId',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'select', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   request: async () => {
    //     const res = await getClientDetail({ id })
    //     return (res.data?.accountList || []).map((item) => ({ value: item.id, label: item.name }))
    //   },
    //   fieldProps: {
    //     className: '!w-[180px]',
    //     placeholder: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' })
    //   },
    //   colSize: 0.9
    // },
    {
      dataIndex: 'recordsType',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      initialValue: 'ALLALL',
      valueEnum: {
        ALLALL: { text: getIntl().formatMessage({ id: 'mt.quanbu' }) },
        DEPOSIT: getEnum().Enum.CustomerBalanceRecordType.DEPOSIT,
        WITHDRAWAL: getEnum().Enum.CustomerBalanceRecordType.WITHDRAWAL,
        // MARGIN: getEnum().Enum.CustomerBalanceRecordType.MARGIN,
        PROFIT: getEnum().Enum.CustomerBalanceRecordType.PROFIT,
        GIFT: getEnum().Enum.CustomerBalanceRecordType.GIFT,
        // BALANCE: getEnum().Enum.CustomerBalanceRecordType.BALANCE,
        TRANSFER: getEnum().Enum.CustomerBalanceRecordType.TRANSFER,
        ZERO: getEnum().Enum.CustomerBalanceRecordType.ZERO,
        // FOLLOW_PROFIT: getEnum().Enum.CustomerBalanceRecordType.FOLLOW_PROFIT,
        HANDLING_FEES: getEnum().Enum.CustomerBalanceRecordType.HANDLING_FEES,
        INTEREST_FEES: getEnum().Enum.CustomerBalanceRecordType.INTEREST_FEES
      },
      // request: async () => {
      //   const res = await getClientDetail({ id })
      //   return (res.data?.accountList || []).map((item) => ({ value: item.id, label: item.name }))
      // },
      fieldProps: {
        className: '!w-[140px]',
        placeholder: getIntl().formatMessage({ id: 'mt.leixing' })
      },
      colSize: 0.9
    }
  ]
}
