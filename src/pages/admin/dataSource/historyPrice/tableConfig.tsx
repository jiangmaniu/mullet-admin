import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import dayjs from 'dayjs'
import { useState } from 'react'

import { getEnum, optionsToEnum } from '@/constants/enum'
import { diabledAntdDate, disabledAntdTime } from '@/utils/date'
import { highlightText } from '@/utils/highlight'

// 生成数字范围
const range = (start: number, end: number) => {
  const result: number[] = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

export const getColumns = (symbolOptions: any, onSearchPrice: any, onChangeStatus: any): ProColumns<DataSource.SymbolPriceItem>[] => {
  const intl = useIntl()
  const [current, setCurrent] = useState({} as Symbol.SymbolListItem)
  const [loading, setLoading] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  return [
    {
      title: <FormattedMessage id="mt.baojiashijian" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'timestamp',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      colSize: 0.9,
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 120,
      renderText(text, record, index, action) {
        return dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss:SSS')
      }
    },
    // {
    //   title: <FormattedMessage id="mt.hangqingyuan" />,
    //   dataIndex: 'ds',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
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
      title: <FormattedMessage id="mt.jiaoyipinzhong" />,
      dataIndex: 'symbol',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      renderText(text, record, index, action) {
        return `${record.ds}-${record.symbol}`
      }
    },
    {
      title: <FormattedMessage id="mt.maijia1" />,
      dataIndex: 'ask',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      render: (text) => highlightText(String(text || ''), searchValue)
    },
    {
      title: <FormattedMessage id="mt.maijia2" />,
      dataIndex: 'bid',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      render: (text) => highlightText(String(text || ''), searchValue)
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
      valueEnum: getEnum().Enum.KlineHistoryPriceStatus,
      width: 120
    },
    {
      title: <FormattedMessage id="mt.hangqingyuanshijian" />,
      dataIndex: 'timestamp2',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      align: 'right',
      fixed: 'right',
      renderText(text, record, index, action) {
        return dayjs(record.dsTime).format('YYYY-MM-DD HH:mm:ss:SSS')
      }
    },

    // 表单搜索项
    {
      dataIndex: 'queryTime',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateTime', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        format: 'YYYY-MM-DD HH',
        allowClear: false,
        className: '!w-[240px]',
        placeholder: getIntl().formatMessage({ id: 'mt.xuanzeshijian' }),
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
          setSearchValue(e.target.value)
          onSearchPrice?.(e.target.value)
        }
      },
      colSize: 0.9
    },
    {
      dataIndex: 'status',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      // valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueType: 'select',
      valueEnum: getEnum().Enum.KlineHistoryPriceStatus,
      fieldProps: {
        allowClear: true,
        className: '!w-[180px]',
        placeholder: getIntl().formatMessage({ id: 'mt.bendiguolvzhuangtai' }),
        onChange: (value) => {
          onChangeStatus?.(value, [])
        }
      },
      colSize: 0.9
    }
  ]
}
