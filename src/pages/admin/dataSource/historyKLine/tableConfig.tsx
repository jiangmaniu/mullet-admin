import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import dayjs from 'dayjs'
import { useState } from 'react'

import { getEnum, optionsToEnum } from '@/constants/enum'
import { diabledAntdDate, disabledAntdTime } from '@/utils/date'
import { highlightText } from '@/utils/highlight'

export const getColumns = (symbolOptions: any, onSearchPrice: any): ProColumns<DataSource.KlineListItem>[] => {
  const intl = useIntl()
  const [current, setCurrent] = useState({} as Symbol.SymbolListItem)
  const [loading, setLoading] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  return [
    {
      title: <FormattedMessage id="mt.shijian" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'klineTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      colSize: 0.9,
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 200,
      renderText(text, record, index, action) {
        return dayjs(record.klineTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: <FormattedMessage id="mt.kaipan" />,
      dataIndex: 'open',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      render: (text) => highlightText(String(text || ''), searchValue)
    },
    {
      title: <FormattedMessage id="mt.zuigao" />,
      dataIndex: 'high',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      render: (text) => highlightText(String(text || ''), searchValue)
    },
    {
      title: <FormattedMessage id="mt.zuidi" />,
      dataIndex: 'low',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      render: (text) => highlightText(String(text || ''), searchValue)
    },
    {
      title: <FormattedMessage id="mt.shoupan" />,
      dataIndex: 'close',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      fixed: 'right',
      align: 'right',
      render: (text) => highlightText(String(text || ''), searchValue)
    },

    // 表单搜索项
    {
      dataIndex: 'time',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateTimeRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        format: 'YYYY-MM-DD HH:mm',
        allowClear: false,
        className: '!w-[330px]',
        placeholder: [getIntl().formatMessage({ id: 'mt.kaishishijian' }), getIntl().formatMessage({ id: 'mt.jieshushijian' })],
        disabledDate: diabledAntdDate,
        disabledTime: disabledAntdTime,
        onOpenChange: (open: boolean) => {
          setCalendarOpen(open)
        },
        open: calendarOpen,
        // 强制更新组件渲染
        key: calendarOpen ? 'open' : 'closed'
      },
      colSize: 0.9
    },
    {
      dataIndex: 'klineType',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: getEnum().Enum.KlineType,
      fieldProps: {
        allowClear: false,
        className: '!w-[180px]',
        placeholder: getIntl().formatMessage({ id: 'mt.kxianleixing' })
      },
      initialValue: '1min',
      colSize: 0.9
    },
    {
      dataIndex: 'symbol',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      // valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: optionsToEnum(symbolOptions),
      fieldProps: {
        allowClear: false,
        className: '!w-[180px]',
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyidui' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'price',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[200px]',
        placeholder: getIntl().formatMessage({ id: 'mt.bendisousuojiage' }),
        onChange: (e) => {
          onSearchPrice?.(e.target.value)
          setSearchValue(e.target.value)
        }
      },
      colSize: 0.9
    }
  ]
}
