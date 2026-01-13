import { ProColumns } from '@ant-design/pro-components'
import { FormattedMessage, getIntl, useIntl } from '@umijs/max'
import classNames from 'classnames'

import { DEFAULT_PRECISION } from '@/constants'
import { getEnum } from '@/constants/enum'
import { formatNum, get3MonBeforeRange } from '@/utils'
import { sysPush } from '@/utils/navigator'

export const getColumns = (): ProColumns<Order.OrderPageListItem>[] => {
  return [
    {
      title: <FormattedMessage id="mt.yonghuuid" />,
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

      width: 300,
      // // fixed: 'left',
      // renderText(text, record, index, action) {
      //   return <span className="z-[18] relative">{record.id}</span>
      // }

      renderText(text, record, index, action) {
        return (
          <span className="cursor-pointer underline z-[18] relative" onClick={() => sysPush(`/crms/customer/view/${text}`)}>
            {text}
          </span>
        )
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
      width: 200,
      renderText(text, record, index, action) {
        return <span className="z-[18] relative">{record.tradeAccountId}</span>
      }
    },

    {
      title: <FormattedMessage id="mt.jiaoyishijian" />,
      dataIndex: 'createTime2',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        return <span className="z-[18] relative">{record.createTime}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.jiaoyipinzhong" />,
      dataIndex: 'symbol2',
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
        return <span className="z-[18] relative">{record.symbol}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.jiaoyileixing" />,
      dataIndex: 'buySell',
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
        return (
          <span className={classNames('font-medium z-[18] relative', record.buySell === 'BUY' ? 'text-green' : 'text-red')}>
            {getEnum().Enum.TradeBuySell[text]?.text || '‑‑'}
          </span>
        )
      }
    },
    {
      title: <FormattedMessage id="mt.kaicangjia" />,
      dataIndex: 'startPrice',
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
        return <span className="z-[18] relative">{record.tradingVolume || '‑‑'}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.chengjiaojia" />,
      dataIndex: 'tradePrice',
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
        return <span className="z-[18] relative">{formatNum(text, { precision: DEFAULT_PRECISION }) || '‑‑'}</span>
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
      width: 140,
      renderText(text, record, index, action) {
        return <span className="z-[18] relative">{record.orderVolume || '‑‑'}</span>
      }
    },
    {
      title: <FormattedMessage id="mt.chengjiaodanhao" />,
      dataIndex: 'id',
      hideInSearch: true, // 在 table的查询表单 中隐藏
      ellipsis: false,
      fieldProps: {
        placeholder: ''
      },
      formItemProps: {
        label: '' // 去掉form label
      },
      width: 200,
      renderText(text, record, index, action) {
        return <span className="z-[18] relative">{record.id}</span>
      }
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
      width: 140,
      align: 'right',
      fixed: 'right',
      className: `option-column`,
      renderText(text, record, index, action) {
        // @ts-ignore
        const profit = record.profit > 0
        const flag = Number(profit) > 0

        return (
          <span className="relative z-[20]">
            {/* @ts-ignore */}
            {flag ? (
              <span className={classNames(flag ? 'text-green' : 'text-red')}>
                {formatNum(text, { precision: DEFAULT_PRECISION }) || '‑‑'}
              </span>
            ) : (
              '‑‑'
            )}
          </span>
        )
      }
    },

    // 表单搜索项
    {
      dataIndex: 'dateRangeNoTime',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      valueType: 'dateRange', // 值的类型,会生成不同的渲染器
      hideInSearch: false,
      hideInTable: true,
      initialValue: get3MonBeforeRange(),
      fieldProps: {
        placeholder: [useIntl().formatMessage({ id: 'common.startDate' }), useIntl().formatMessage({ id: 'common.endDate' })]
      }
    },
    {
      dataIndex: 'symbol',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyipinzhong' })
      }
    },
    {
      dataIndex: 'accountId',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.jiaoyizhanghu' })
      }
    },
    {
      dataIndex: 'uid',
      filters: true, // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
      onFilter: true, //筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
      hideInSearch: false,
      hideInTable: true,
      fieldProps: {
        placeholder: getIntl().formatMessage({ id: 'mt.yonghuuid' })
      }
    }
  ]
}
