import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import classNames from 'classnames'

import { getEnum } from '@/constants/enum'
import { formatNum, toFixed } from '@/utils'

export const getColumns = (): ProColumns<Order.BgaOrderPageListItem>[] => {
  return [
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
      fixed: 'left',
      width: 200
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
      width: 120
    },
    {
      title: <FormattedMessage id="mt.yonghuuid" />,
      dataIndex: 'userAccount',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.shouji" />,
      dataIndex: 'phone',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.youxiang" />,
      dataIndex: 'email',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.zhanghuleixing" />,
      dataIndex: 'mode',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      valueEnum: getEnum().Enum.OrderMode,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    // 客户下单时间
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
      width: 150
    },
    {
      title: <FormattedMessage id="mt.symbol" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'symbol',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.shurubizhong' })
      },
      colSize: 1
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
      width: 140
    },
    {
      title: <FormattedMessage id="mt.jiaoyifangxiang" />,
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
      width: 140
    },
    {
      title: <FormattedMessage id="mt.ganggan" />,
      dataIndex: 'leverageMultiple',
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
        return text ? <span>{text}X</span> : '‑‑'
      }
    },
    {
      title: <FormattedMessage id="mt.baozhengjin" />,
      dataIndex: 'orderMargin',
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
        const orderMargin = Number(record.orderMargin || 0)
        return formatNum(orderMargin, { precision: 2 })
      }
    },
    {
      title: <FormattedMessage id="mt.tp" />,
      dataIndex: 'takeProfit',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.sl" />,
      dataIndex: 'stopLoss',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="common.status" />,
      dataIndex: 'status',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      valueEnum: getEnum().Enum.BGAStatus,
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.xiugaishijian" />,
      dataIndex: 'updateTime',
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
      title: <FormattedMessage id="mt.yingkui" />,
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
      }
    },
    {
      title: <FormattedMessage id="mt.shouxufei" />,
      dataIndex: 'handlingFees',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.kucunfei" />,
      dataIndex: 'interestFees',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        precision: 2,
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 140
    },

    // 表单搜索项
    {
      dataIndex: 'isSimulate',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: {
        true: {
          text: useIntl().formatMessage({ id: 'mt.moni' })
        },
        false: {
          text: useIntl().formatMessage({ id: 'mt.zhenshi' })
        }
      },
      fieldProps: {
        className: '!w-[150px]',
        placeholder: <FormattedMessage id="mt.zhanghuleixing" />
      },
      colSize: 0.9,
      initialValue: 'false'
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
      onFilter: true, // 筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[120px]',
        placeholder: useIntl().formatMessage({ id: 'mt.yonghuuid' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'phoneOrEmail',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[120px]',
        placeholder: useIntl().formatMessage({ id: 'mt.phoneOrEmail' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'symbol',
      hideInSearch: false, // 在 table的查询表单 中隐藏
      hideInTable: true,
      ellipsis: false,
      formItemProps: {
        label: '' // 去掉form label
      },
      fieldProps: {
        className: '!w-[120px]',
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyipinzhong' })
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
        className: '!w-[120px]',
        placeholder: <FormattedMessage id="mt.jiaoyifangxiang" />
      },
      colSize: 0.9
    },
    {
      dataIndex: 'status',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, // 筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: getEnum().Enum.BGAStatus,
      fieldProps: {
        className: '!w-[120px]',
        placeholder: <FormattedMessage id="mt.dingdanzhuangtai" />
      },
      colSize: 0.9
    },
    {
      dataIndex: 'mode',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: getEnum().Enum.OrderMode,
      fieldProps: {
        className: '!w-[120px]',
        placeholder: <FormattedMessage id="mt.zhanghuleixing" />
      },
      colSize: 0.9
    },
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
    }
  ]
}
