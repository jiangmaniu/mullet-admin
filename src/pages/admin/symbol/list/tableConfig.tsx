import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'
import { useState } from 'react'

import { getEnum } from '@/constants/enum'
import { getSymbolCategory } from '@/services/api/common'

export const getColumns = (): ProColumns<Symbol.SymbolListItem>[] => {
  const [current, setCurrent] = useState({} as Symbol.SymbolListItem)
  const [loading, setLoading] = useState(false)

  return [
    {
      title: <FormattedMessage id="mt.symbol" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'symbolName',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 150,
      renderText(text, record, index, action) {
        return record.symbol
      }
    },
    {
      title: <FormattedMessage id="mt.shuoming" />,
      dataIndex: 'remark',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 250
    },
    {
      title: <FormattedMessage id="mt.xiaoshuwei" />,
      dataIndex: 'symbolDecimal',
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
      title: <FormattedMessage id="common.status" />,
      dataIndex: 'status',
      valueEnum: getEnum().Enum.Status,
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

    // @TODO 暂时没接口
    // {
    //   title: <FormattedMessage id="common.status" />,
    //   dataIndex: 'status',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 150,
    //   renderText(text, record, index, action) {
    //     const isActive = record.status === 1
    //     return (
    //       <ProFormSwitch
    //         fieldProps={{
    //           value: record.status === 1,
    //           loading: record.id === current?.id && loading,
    //           onChange: (value) => {
    //             setLoading(true)
    //             setCurrent(record)
    //             updateManager({
    //               status: isActive ? 1 : 0,
    //               id: record.id
    //             })
    //               .then((res) => {
    //                 if (res.success) {
    //                   // 刷新表格数据
    //                   action?.reload()
    //                   message.info(getIntl().formatMessage({ id: 'common.opSuccess' }))
    //                 }
    //               })
    //               .finally(() => {
    //                 setTimeout(() => {
    //                   setLoading(false)
    //                 }, 300)
    //               })
    //           }
    //         }}
    //       />
    //     )
    //   }
    // },
    {
      title: <FormattedMessage id="mt.jisuanleixing" />,
      dataIndex: ['symbolConf', 'calculationType'],
      valueEnum: getEnum().Enum.CalculationType,
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
      title: <FormattedMessage id="mt.fenlei" />,
      dataIndex: 'classify',
      valueType: 'select',
      request: async () => {
        const data = await getSymbolCategory()
        return data?.data || []
      },
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
      dataIndex: 'calculationType',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: getEnum().Enum.CalculationType,
      fieldProps: {
        className: '!w-[160px]',
        placeholder: <FormattedMessage id="mt.jisuanleixing" />
      },
      colSize: 0.9
    },
    {
      dataIndex: 'status',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: getEnum().Enum.Status,
      fieldProps: {
        className: '!w-[160px]',
        placeholder: <FormattedMessage id="common.status" />
      },
      colSize: 0.9
    },
    {
      dataIndex: 'symbol',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[160px]',
        placeholder: useIntl().formatMessage({ id: 'mt.inputSymbol' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'remark',
      hideInTable: true,
      hideInSearch: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[160px]',
        placeholder: useIntl().formatMessage({ id: 'mt.inputShuoming' })
      },
      colSize: 0.9
    }
  ]
}
