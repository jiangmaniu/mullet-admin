import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'

import { getEnum } from '@/constants/enum'
import { toFixed } from '@/utils'

export const getColumns = (): ProColumns<Order.OrderPageListItem>[] => {
  const intl = useIntl()
  return [
    {
      title: <FormattedMessage id="mt.dengluzhanghao" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'userAccount',
      hideInSearch: false, // 在 table的查询表单 中隐藏
      ellipsis: true,
      copyable: false,
      fieldProps: {
        className: '!w-[150px]',
        placeholder: intl.formatMessage({ id: 'mt.dengluzhanghao' })
      },
      colSize: 0.9,
      formItemProps: {
        label: '' // 去掉form label
      },
      fixed: 'left',
      width: 120
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
    // {
    //   title: <FormattedMessage id="mt.yonghuuid" />,
    //   dataIndex: 'userAccount',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   width: 120
    // },
    {
      title: <FormattedMessage id="mt.dingdanhao" />,
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
      dataIndex: 'type',
      valueEnum: getEnum().Enum.OrderType,
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
      title: <FormattedMessage id="mt.shoushu" />,
      dataIndex: 'orderVolume',
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
        return toFixed(record.orderVolume, record.symbolDecimal)
      }
    },
    {
      title: <FormattedMessage id="mt.qingqiushijian" />,
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
      title: <FormattedMessage id="mt.jiage" />,
      dataIndex: 'limitPrice',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120,
      renderText(text, record, index, action) {
        return toFixed(record.limitPrice, record.symbolDecimal)
      }
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
      title: <FormattedMessage id="mt.dingdanzhuangtai" />,
      dataIndex: 'status',
      valueEnum: getEnum().Enum.OrderStatus,
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 120
    },

    // 表单搜索项
    // {
    //   dataIndex: 'account',
    //   hideInTable: true,
    //   hideInSearch: false,
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   fieldProps: {
    //     className: '!w-[120px]',
    //     placeholder: useIntl().formatMessage({ id: 'mt.yonghuuid' })
    //   },
    //   colSize: 0.9
    // },
    {
      dataIndex: 'symbol',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      // valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[150px]',
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyipinzhong' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'type',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'select', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      valueEnum: {
        LIMIT_BUY_ORDER: { text: intl.formatMessage({ id: 'mt.xianjiamairudan' }) },
        LIMIT_SELL_ORDER: { text: intl.formatMessage({ id: 'mt.xianjiamaichudan' }) },
        STOP_LOSS_LIMIT_BUY_ORDER: { text: intl.formatMessage({ id: 'mt.zhiyunxianjiamairudan' }) },
        STOP_LOSS_LIMIT_SELL_ORDER: { text: intl.formatMessage({ id: 'mt.zhiyunxianjiamaichudan' }) }
      },
      fieldProps: {
        className: '!w-[150px]',
        placeholder: <FormattedMessage id="mt.dingdanleixing" />
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
      valueEnum: getEnum().Enum.OrderStatus,
      fieldProps: {
        className: '!w-[150px]',
        placeholder: <FormattedMessage id="mt.xuanzezhuangtai" />
      },
      colSize: 0.9,
      initialValue: 'ENTRUST'
    },
    {
      dataIndex: 'accountId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[150px]',
        placeholder: intl.formatMessage({ id: 'mt.jiaoyizhanghao' })
      },
      colSize: 0.9
    },
    {
      dataIndex: 'orderId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        className: '!w-[150px]',
        placeholder: intl.formatMessage({ id: 'mt.dingdanhao' })
      },
      colSize: 0.9
    }
  ]
}
