import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import classNames from 'classnames'

import { getEnum } from '@/constants/enum'
import { formatTime, toFixed } from '@/utils'
import { cn } from '@/utils/cn'
import { sysPush } from '@/utils/navigator'
import { covertProfit } from '@/utils/wsUtil'

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
      // fixed: 'left',
      width: 300
    },
    {
      title: <FormattedMessage id="mt.zhuangtai" />,
      dataIndex: 'row_type',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      // fixed: 'left',
      renderText(text, record, index, action) {
        return (
          <span className="z-[1] relative">
            {text === 'order' ? (
              <FormattedMessage id="mt.weituo" />
            ) : text === 'close' ? (
              <FormattedMessage id="mt.chengjiao" />
            ) : (
              <FormattedMessage id="mt.chicang" />
            )}
          </span>
        )
      },
      width: 80
    },
    {
      title: <FormattedMessage id="mt.yonghuuid" />, // 与 antd 中基本相同，但是支持通过传入一个方法
      dataIndex: 'userAccount',
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
        // @ts-ignore
        // return <span className="text-primary text-sm z-[1] relative">{record.accountDetail?.userAccount}</span>

        return (
          <span
            className="cursor-pointer underline  z-[1] relative"
            // @ts-ignore
            onClick={() => sysPush(`/crms/customer/view/${record.accountDetail?.clientId}`)}
          >
            {/* @ts-ignore */}
            {record.accountDetail?.userAccount}
          </span>
        )
      }
    },
    // {
    //   title: <FormattedMessage id="mt.dingdanleixing" />,
    //   dataIndex: 'marginType',
    //   hideInSearch: true, // 在 table的查询表单 中隐藏
    //   ellipsis: false,
    //   copyable: false,
    //   fieldProps: {
    //     placeholder: ''
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   renderText(text, record, index, action) {
    //     return getEnum().Enum.MarginType[text]?.text
    //   },
    //   width: 140
    // },
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
      renderText(text, record, index, action) {
        return <span className="z-[1] relative">{text}</span>
      },
      width: 140
    },
    {
      title: <FormattedMessage id="mt.baozhengjinleixing" />,
      dataIndex: 'marginType',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return <span className="z-[1] relative">{getEnum().Enum.MarginType[text]?.text}</span>
      },
      width: 120
    },
    {
      title: <FormattedMessage id="mt.shijian" />,
      dataIndex: 'createTime',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      render(dom, entity, index, action, schema) {
        return <span className="relative z-[1]">{formatTime(entity.createTime) || '‑‑'}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.dingdanmoshi" />,
      dataIndex: 'mode',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      copyable: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      renderText(text, record, index, action) {
        return <span className="z-[1] relative">{getEnum().Enum.OrderMode[text]?.text}</span>
      },
      width: 120
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
      // fieldProps: {
      //   placeholder: ''
      // },
      // formItemProps: {
      //   label: '' // 去掉form label
      // },
      renderText(text, record, index, action) {
        const mt = record.marginType === 'ISOLATED_MARGIN' ? <FormattedMessage id="mt.zhucang" /> : <FormattedMessage id="mt.quancang" />
        const bs = record.buySell === 'BUY' ? <FormattedMessage id="mt.mairu" /> : <FormattedMessage id="mt.maichu" />

        // @ts-ignore
        if (record.layers === 3) {
          return (
            <span className={cn(record.buySell === 'BUY' ? 'text-green' : 'text-red', 'z-[1] relative')}>
              {record.buySell === 'BUY' ? <FormattedMessage id="mt.jiancang" /> : <FormattedMessage id="mt.pingcang" />}
            </span>
          )
        }

        return (
          <span className={cn(record.buySell === 'BUY' ? 'text-green' : 'text-red', 'z-[1] relative')}>
            {mt}·{bs}
          </span>
        )
      },
      width: 150
    },
    {
      title: <FormattedMessage id="mt.jiage" />,
      dataIndex: 'price',
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
        // return <span className="z-[1] relative">{formatNum(text, { precision: DEFAULT_PRECISION })}</span>

        // @ts-ignore
        const flag = record.row_type !== 'close'
        return <span className="z-[1] relative">{flag && text}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.chengjiaojia" />,
      dataIndex: 'closePrice',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 150,
      renderText(text, record: any, index, action) {
        // return <span className="z-[1] relative">{formatNum(text, { precision: DEFAULT_PRECISION })}</span>
        // @ts-ignore
        const flag = record.row_type === 'close'
        return <span className="z-[1] relative">{flag ? record.price : text}</span>
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
      width: 150
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
        if (record.status === 'BAG') {
          // 计算持仓中的浮动盈亏
          profit = covertProfit(record, {
            symbol: record.dataSourceSymbol,
            dataSourceCode: record.dataSourceCode
          })
        } else {
          // 持仓完成不用计算
          profit = toFixed(record.profit)
        }
        const flag = Number(profit) > 0
        return profit ? (
          <span className={classNames('!font-dingpro-medium z-[1] relative', flag ? 'text-green' : 'text-red')}>
            {flag ? `+${profit}` : profit}
          </span>
        ) : (
          '0'
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
    // {
    //   dataIndex: 'buySell',
    //   filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
    //   onFilter: true, // 筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
    //   valueType: 'select', // 值的类型,会生成不同的渲染器
    //   hideInSearch: false,
    //   hideInTable: true,
    //   valueEnum: getEnum().Enum.TradeBuySell,
    //   fieldProps: {
    //     className: '!w-[150px]',
    //     placeholder: <FormattedMessage id="mt.dingdanleixing" />
    //   },
    //   colSize: 0.9
    // },
    // {
    //   dataIndex: 'status',
    //   valueType: 'select',
    //   hideInSearch: false, // 在 table的查询表单 中隐藏
    //   hideInTable: true,
    //   ellipsis: false,
    //   valueEnum: getEnum().Enum.BGAStatus,
    //   fieldProps: {
    //     className: '!w-[120px]',
    //     defaultValue: 'BAG',
    //     placeholder: getIntl().formatMessage({ id: 'common.status' })
    //   },
    //   formItemProps: {
    //     label: '' // 去掉form label
    //   },
    //   colSize: 0.9,
    //   initialValue: 'BAG'
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
        className: '!w-[160px]',
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
        className: '!w-[150px]',
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
        className: '!w-[150px]',
        placeholder: useIntl().formatMessage({ id: 'mt.dengluzhanghao' })
      },
      colSize: 0.9
    },
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
      colSize: 0.9
    }
  ]
}
