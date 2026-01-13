import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import classNames from 'classnames'

import { getEnum } from '@/constants/enum'
import { formatNum, toFixed } from '@/utils'

export const getColumns = (): ProColumns<Order.BgaOrderPageListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.dengluzhanghao" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'userAccount1',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: true,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 120,
      renderText(text, record, index, action) {
        return <span className="text-primary text-sm">{record.userAccount}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.jiaoyizhanghao" />,
      dataIndex: 'tradeAccountId',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 220
    },
    {
      title: <FormattedMessage id="mt.chicangdanhao" />,
      dataIndex: 'id',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 220
    },
    {
      title: <FormattedMessage id="mt.symbol" />,
      dataIndex: 'symbol',
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
      title: <FormattedMessage id="mt.dingdanleixing" />,
      dataIndex: 'buySell',
      valueEnum: getEnum().Enum.TradeBuySell,
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
      title: <FormattedMessage id="mt.jiaoyiliang" />,
      dataIndex: 'orderVolume',
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
      title: <FormattedMessage id="mt.gangganbeishu" />,
      dataIndex: 'leverageMultiple',
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
        return <span className="text-primary text-sm">{text ? `${text}X` : '‑‑'}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.kaicangjiage" />,
      dataIndex: 'startPrice',
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
        return text ? formatNum(text, { precision: record.symbolDecimal }) : '‑‑'
      }
    },
    {
      title: <FormattedMessage id="common.status" />,
      dataIndex: 'status',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      valueEnum: getEnum().Enum.BGAStatus,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.kaicangshijian" />,
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
      title: (
        <>
          <FormattedMessage id="mt.yingkui" />
          (USD)
        </>
      ),
      dataIndex: 'profit',
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
        let profit: any = 0
        // if (record.status === 'BAG') {
        //   // 计算持仓中的浮动盈亏
        //   profit = covertProfit(record, {
        //     symbol: record.dataSourceSymbol,
        //     dataSourceCode: record.dataSourceCode,
        //     currentQuote: record.currentQuote
        //   })
        // } else {
        //   // 持仓完成不用计算
        //   profit = toFixed(record.profit)
        // }
        profit = toFixed(record.profit)
        const flag = Number(profit) > 0
        return profit ? (
          <span className={classNames('!font-dingpro-medium', flag ? 'text-green' : 'text-red')}>{flag ? `+${profit}` : profit}</span>
        ) : (
          '‑‑'
        )
      },
      align: 'right',
      fixed: 'right'
    },

    // 表单搜索项
    {
      // 根据开仓时间范围
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
      dataIndex: 'buySell',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, // 筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: getEnum().Enum.TradeBuySell,
      fieldProps: {
        className: '!w-[150px]',
        placeholder: <FormattedMessage id="mt.dingdanleixing" />
      },
      colSize: 0.9
    },
    {
      dataIndex: 'status',
      valueType: 'select',
      hideInSearch: false, // 在 table的查询表单 中隐藏
      hideInTable: true,
      ellipsis: false,
      valueEnum: getEnum().Enum.BGAStatus,
      fieldProps: {
        className: '!w-[120px]',
        defaultValue: 'BAG',
        placeholder: getIntl().formatMessage({ id: 'common.status' })
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      colSize: 0.9,
      initialValue: 'BAG'
    },
    {
      dataIndex: 'symbol',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      // valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[120px]',
        placeholder: getIntl().formatMessage({ id: 'mt.shurubizhong' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'bagOrderId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[120px]',
        placeholder: useIntl().formatMessage({ id: 'mt.chicangdanhao' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'accountId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, // 筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[120px]',
        placeholder: useIntl().formatMessage({ id: 'mt.jiaoyizhanghao' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'userAccount',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[120px]',
        placeholder: useIntl().formatMessage({ id: 'mt.dengluzhanghao' })
      },
      colSize: 0.9
    }
  ]
}
